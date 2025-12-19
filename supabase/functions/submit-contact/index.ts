import { createClient } from 'npm:@supabase/supabase-js@2.57.4';

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  service: string;
  message: string;
}

interface HefflLeadPayload {
  name: string;
  mobile?: string;
  secondaryMobile?: string;
  email: string;
  title?: string;
  value?: number;
  source: string;
  website?: string | null;
  cf_services: string;
  cf_messages: string;
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

async function sendEmailNotification(formData: ContactFormData) {
  try {
    const picaSecretKey = Deno.env.get('PICA_SECRET_KEY');
    const picaConnectionKey = Deno.env.get('PICA_OUTLOOK_MAIL_CONNECTION_KEY');

    if (!picaSecretKey || !picaConnectionKey) {
      console.warn('Email credentials not configured. Skipping email notification.');
      return { success: false, error: 'Email credentials not configured' };
    }

    const emailContent = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #2563eb; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
    .content { background-color: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; border-top: none; }
    .field { margin-bottom: 20px; }
    .label { font-weight: bold; color: #374151; display: block; margin-bottom: 5px; }
    .value { background-color: white; padding: 12px; border-radius: 4px; border: 1px solid #e5e7eb; }
    .footer { background-color: #f3f4f6; padding: 15px; text-align: center; font-size: 12px; color: #6b7280; border-radius: 0 0 8px 8px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0;">New Contact Form Submission</h1>
    </div>
    <div class="content">
      <div class="field">
        <span class="label">Name:</span>
        <div class="value">${formData.firstName} ${formData.lastName}</div>
      </div>
      <div class="field">
        <span class="label">Email:</span>
        <div class="value">${formData.email}</div>
      </div>
      ${formData.phone ? `
      <div class="field">
        <span class="label">Phone:</span>
        <div class="value">${formData.phone}</div>
      </div>
      ` : ''}
      <div class="field">
        <span class="label">Service Interested In:</span>
        <div class="value">${formData.service}</div>
      </div>
      <div class="field">
        <span class="label">Message:</span>
        <div class="value" style="white-space: pre-wrap;">${formData.message}</div>
      </div>
    </div>
    <div class="footer">
      <p>This notification was sent from your website contact form.</p>
      <p>Please respond to the customer within 24 hours.</p>
    </div>
  </div>
</body>
</html>
    `;

    const message = {
      subject: 'New Contact Form Submission - SiteMaxi',
      body: {
        contentType: 'HTML',
        content: emailContent,
      },
      toRecipients: [
        {
          emailAddress: {
            address: 'operations@sitemaxi.com',
          },
        },
      ],
    };

    const response = await fetch('https://api.picaos.com/v1/passthrough/me/sendMail', {
      method: 'POST',
      headers: {
        'x-pica-secret': picaSecretKey,
        'x-pica-connection-key': picaConnectionKey,
        'x-pica-action-id': 'conn_mod_def::GCwA84KBXNw::h9iYXKQMQY-nKxeNMrZwng',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, saveToSentItems: true }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Email sending failed:', errorText);
      return { success: false, error: errorText };
    }

    console.log('Email sent successfully via Outlook');
    return { success: true };
  } catch (error) {
    console.error('Error sending email notification:', error);
    return { success: false, error: String(error) };
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

    const formData: ContactFormData = await req.json();

    const { firstName, lastName, email, phone, service, message } = formData;

    if (!firstName || !lastName || !email || !service || !message) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const submissionData = {
      first_name: firstName,
      last_name: lastName,
      email,
      phone: phone || null,
      service,
      message,
      status: 'pending',
      lead_source: 'Website',
      lead_stage: 'New',
    };

    const { data: submission, error: dbError } = await supabase
      .from('contact_submissions')
      .insert(submissionData)
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      return new Response(
        JSON.stringify({ error: 'Failed to save submission' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    sendEmailNotification(formData).catch(err => {
      console.error('Failed to send email notification (non-blocking):', err);
    });

    const { data: apiKeyData, error: keyError } = await supabase
      .from('api_config')
      .select('key_value')
      .eq('key_name', 'heffl_api_key')
      .maybeSingle();

    if (keyError || !apiKeyData) {
      console.error('API key not found:', keyError);
      await supabase
        .from('contact_submissions')
        .update({
          status: 'failed',
          api_response: { error: 'API key not configured' },
        })
        .eq('id', submission.id);

      return new Response(
        JSON.stringify({
          success: true,
          message: 'Your message has been saved and we will contact you shortly',
          submissionId: submission.id,
        }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const hefflPayload: HefflLeadPayload = {
      name: `${firstName} ${lastName}`,
      email,
      source: 'Website',
      website: null,
      cf_services: service,
      cf_messages: message,
      ...(phone && { mobile: phone }),
    };

    console.log('Sending payload to Heffl:', JSON.stringify(hefflPayload, null, 2));

    try {
      const hefflResponse = await fetch('https://api.heffl.com/api/v1/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKeyData.key_value,
        },
        body: JSON.stringify(hefflPayload),
      });

      const hefflData = await hefflResponse.json();

      if (!hefflResponse.ok) {
        console.error('Heffl API error:', hefflData);
        console.error('Failed payload was:', JSON.stringify(hefflPayload, null, 2));
        await supabase
          .from('contact_submissions')
          .update({
            status: 'failed',
            api_response: {
              error: hefflData,
              sentPayload: hefflPayload
            },
          })
          .eq('id', submission.id);

        return new Response(
          JSON.stringify({
            success: true,
            message: "We're experiencing technical difficulties. Your message has been saved and we'll contact you shortly",
            submissionId: submission.id,
          }),
          {
            status: 200,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      console.log('Heffl API success:', hefflData);
      await supabase
        .from('contact_submissions')
        .update({
          status: 'success',
          heffl_lead_id: hefflData.id || null,
          lead_stage: hefflData.stage || 'New',
          api_response: {
            response: hefflData,
            sentPayload: hefflPayload
          },
        })
        .eq('id', submission.id);

      return new Response(
        JSON.stringify({
          success: true,
          message: "Thank you for the message. We'll get back to you within 24 hours",
          submissionId: submission.id,
          hefflLeadId: hefflData.id,
        }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    } catch (apiError) {
      console.error('Heffl API request failed:', apiError);
      console.error('Failed payload was:', JSON.stringify(hefflPayload, null, 2));
      await supabase
        .from('contact_submissions')
        .update({
          status: 'failed',
          api_response: {
            error: String(apiError),
            sentPayload: hefflPayload
          },
        })
        .eq('id', submission.id);

      return new Response(
        JSON.stringify({
          success: true,
          message: "We're experiencing technical difficulties. Your message has been saved and we'll contact you shortly",
          submissionId: submission.id,
        }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }
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