import { createClient } from 'npm:@supabase/supabase-js@2.57.4';

interface CCAuthFormData {
  authorizationName: string;
  companyName: string;
  billingAddress: string;
  cityState: string;
  postalCode: string;
  phone: string;
  email: string;
  accountType: 'Visa' | 'MasterCard' | 'AMEX' | 'Discover';
  cardholderName: string;
  accountNumber: string;
  expirationDate: string;
  cvv: string;
  signatureData: string;
  signatureType: 'drawn' | 'typed';
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

function generateConfirmationNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `CC-${timestamp}-${random}`;
}

function simpleEncrypt(text: string, key: string): string {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i) ^ key.charCodeAt(i % key.length);
    result += String.fromCharCode(charCode);
  }
  return btoa(result);
}

function getCardLast4(cardNumber: string): string {
  return cardNumber.slice(-4);
}

async function sendEmailNotification(
  formData: CCAuthFormData,
  confirmationNumber: string,
  resendApiKey: string
): Promise<boolean> {
  try {
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #2563eb, #1d4ed8); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; border-radius: 0 0 8px 8px; }
          .info-section { background: white; padding: 20px; margin: 15px 0; border-radius: 8px; border: 1px solid #e5e7eb; }
          .label { font-weight: bold; color: #4b5563; }
          .value { color: #111827; margin-bottom: 10px; }
          .highlight { background: #dbeafe; padding: 15px; border-radius: 8px; margin: 15px 0; text-align: center; }
          .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Credit Card Authorization</h1>
            <p>A new credit card authorization has been submitted</p>
          </div>
          <div class="content">
            <div class="highlight">
              <div class="label">Confirmation Number</div>
              <div style="font-size: 24px; font-weight: bold; color: #1d4ed8; font-family: monospace;">${confirmationNumber}</div>
            </div>
            
            <div class="info-section">
              <h3 style="margin-top: 0; color: #1d4ed8;">Cardholder Information</h3>
              <div class="value"><span class="label">Name:</span> ${formData.authorizationName}</div>
              <div class="value"><span class="label">Company:</span> ${formData.companyName || 'N/A'}</div>
              <div class="value"><span class="label">Email:</span> ${formData.email}</div>
              <div class="value"><span class="label">Phone:</span> ${formData.phone}</div>
            </div>
            
            <div class="info-section">
              <h3 style="margin-top: 0; color: #1d4ed8;">Billing Address</h3>
              <div class="value">${formData.billingAddress}</div>
              <div class="value">${formData.cityState}</div>
              <div class="value">${formData.postalCode}</div>
            </div>
            
            <div class="info-section">
              <h3 style="margin-top: 0; color: #1d4ed8;">Card Information</h3>
              <div class="value"><span class="label">Card Type:</span> ${formData.accountType}</div>
              <div class="value"><span class="label">Cardholder Name:</span> ${formData.cardholderName}</div>
              <div class="value"><span class="label">Card Number:</span> **** **** **** ${getCardLast4(formData.accountNumber)}</div>
              <div class="value"><span class="label">Expiration:</span> ${formData.expirationDate}</div>
              <div class="value"><span class="label">Signature Type:</span> ${formData.signatureType === 'drawn' ? 'Hand-drawn' : 'Typed'}</div>
            </div>
            
            <div style="background: #fef3c7; padding: 15px; border-radius: 8px; border: 1px solid #fbbf24; margin: 15px 0;">
              <p style="margin: 0; color: #92400e;"><strong>⚠️ Security Note:</strong> For security reasons, full card details and signature are not included in this email. Please access the admin panel to view complete information.</p>
            </div>
            
            <div style="text-align: center; margin-top: 20px;">
              <p>Submitted on: ${new Date().toLocaleString('en-US', { dateStyle: 'long', timeStyle: 'short' })}</p>
            </div>
          </div>
          
          <div class="footer">
            <p>This is an automated notification from SiteMaxi Credit Card Authorization System</p>
            <p>7398 Yonge St, Unit 619, Vaughan, ON, CA L4J 2J2</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'SiteMaxi <noreply@sitemaxi.com>',
        to: ['operations@sitemaxi.com'],
        subject: `New Credit Card Authorization - ${confirmationNumber}`,
        html: emailHtml,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Resend API error:', errorData);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Email sending error:', error);
    return false;
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      {
        status: 405,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const formData: CCAuthFormData = await req.json();

    const requiredFields = [
      'authorizationName', 'billingAddress', 'cityState', 'postalCode',
      'phone', 'email', 'accountType', 'cardholderName', 'accountNumber',
      'expirationDate', 'cvv', 'signatureData', 'signatureType'
    ];

    for (const field of requiredFields) {
      if (!formData[field as keyof CCAuthFormData]) {
        return new Response(
          JSON.stringify({ error: `Missing required field: ${field}` }),
          {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }
    }

    const confirmationNumber = generateConfirmationNumber();
    const encryptionKey = Deno.env.get('CC_ENCRYPTION_KEY') || 'default-encryption-key-change-in-production';

    const encryptedCardNumber = simpleEncrypt(formData.accountNumber, encryptionKey);
    const encryptedCVV = simpleEncrypt(formData.cvv, encryptionKey);
    const cardLast4 = getCardLast4(formData.accountNumber);

    const clientIp = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '';

    const { data: submission, error: dbError } = await supabase
      .from('credit_card_authorizations')
      .insert({
        confirmation_number: confirmationNumber,
        authorization_name: formData.authorizationName,
        company_name: formData.companyName || '',
        billing_address: formData.billingAddress,
        city_state: formData.cityState,
        postal_code: formData.postalCode,
        phone: formData.phone,
        email: formData.email,
        account_type: formData.accountType,
        cardholder_name: formData.cardholderName,
        account_number_encrypted: encryptedCardNumber,
        account_number_last4: cardLast4,
        expiration_date: formData.expirationDate,
        cvv_encrypted: encryptedCVV,
        signature_data: formData.signatureData,
        signature_type: formData.signatureType,
        ip_address: clientIp,
        email_sent: false,
      })
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      return new Response(
        JSON.stringify({ error: 'Failed to save authorization' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const { data: resendKeyData, error: keyError } = await supabase
      .from('api_config')
      .select('key_value')
      .eq('key_name', 'resend_api_key')
      .maybeSingle();

    if (resendKeyData?.key_value) {
      const emailSent = await sendEmailNotification(
        formData,
        confirmationNumber,
        resendKeyData.key_value
      );

      if (emailSent) {
        await supabase
          .from('credit_card_authorizations')
          .update({
            email_sent: true,
            email_sent_at: new Date().toISOString(),
          })
          .eq('id', submission.id);
      }
    } else {
      console.warn('Resend API key not configured, email notification skipped');
    }

    return new Response(
      JSON.stringify({
        success: true,
        confirmationNumber,
        message: 'Authorization submitted successfully',
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(
      JSON.stringify({
        error: 'An unexpected error occurred',
        details: String(error),
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});