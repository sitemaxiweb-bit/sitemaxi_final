import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

// Simple XOR decryption (reverse of encryption)
function simpleDecrypt(encryptedBase64: string, key: string): string {
  try {
    const encrypted = atob(encryptedBase64);
    let result = '';
    for (let i = 0; i < encrypted.length; i++) {
      const charCode = encrypted.charCodeAt(i) ^ key.charCodeAt(i % key.length);
      result += String.fromCharCode(charCode);
    }
    return result;
  } catch (error) {
    console.error('Decryption error:', error);
    throw new Error('Failed to decrypt data');
  }
}

interface DecryptRequest {
  authorizationId: string;
  encryptedCardNumber: string;
  encryptedCVV: string;
}

Deno.serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    // Get the authorization header
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Missing authorization header" }),
        {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Create Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Verify the user is authenticated
    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);

    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Check if user is admin
    const { data: roleData, error: roleError } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .single();

    if (roleError || !roleData || roleData.role !== 'admin') {
      return new Response(
        JSON.stringify({ error: "Forbidden: Admin access required" }),
        {
          status: 403,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Parse request body
    const body: DecryptRequest = await req.json();
    const { authorizationId, encryptedCardNumber, encryptedCVV } = body;

    if (!authorizationId || !encryptedCardNumber || !encryptedCVV) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Get encryption key from environment (with same default as submit function)
    const encryptionKey = Deno.env.get("CC_ENCRYPTION_KEY") || 'default-encryption-key-change-in-production';

    // Decrypt the data
    const decryptedCardNumber = simpleDecrypt(encryptedCardNumber, encryptionKey);
    const decryptedCVV = simpleDecrypt(encryptedCVV, encryptionKey);

    // Log the access for audit purposes
    const { error: logError } = await supabase
      .from('cc_access_audit_log')
      .insert({
        authorization_id: authorizationId,
        user_id: user.id,
        user_email: user.email,
        action: 'view_full_card_number',
        ip_address: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown'
      });

    if (logError) {
      console.error('Failed to log access:', logError);
      // Continue anyway - logging failure shouldn't block the operation
    }

    // Return decrypted data
    return new Response(
      JSON.stringify({
        cardNumber: decryptedCardNumber,
        cvv: decryptedCVV
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );

  } catch (error) {
    console.error('Error in decrypt-cc-data function:', error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal server error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});