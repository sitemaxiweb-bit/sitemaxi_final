import { createClient } from 'npm:@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

interface VisibilityRequest {
  brandName: string;
  websiteUrl: string;
  primaryService: string;
  city: string;
  targetKeywords: string[];
  email: string;
}

interface PlatformResult {
  platform: 'ChatGPT' | 'Gemini' | 'Claude';
  mentioned: boolean;
  visibilityScore: number;
  responseSnippet: string;
  competitorsMentioned: string[];
}

interface VisibilityReport {
  overallScore: number;
  platforms: PlatformResult[];
  brandSummary: string;
  competitorMentions: string[];
  strengths: string[];
  gaps: string[];
  contentRecommendations: string[];
  seoSuggestions: string[];
  visibilityTips: string[];
  checkedAt: string;
  brandName: string;
  city: string;
  primaryService: string;
  websiteUrl: string;
}

function toBase64Url(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let binary = '';
  for (const b of bytes) binary += String.fromCharCode(b);
  const base64 = btoa(binary);
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function buildMimeMessage(to: string, subject: string, html: string, from?: string): string {
  const boundary = `boundary_${crypto.randomUUID().replace(/-/g, '')}`;
  const plainText = html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  const lines: string[] = [];
  lines.push(`To: ${to}`);
  if (from) lines.push(`From: ${from}`);
  lines.push(`Subject: ${subject}`);
  lines.push('MIME-Version: 1.0');
  lines.push(`Content-Type: multipart/alternative; boundary="${boundary}"`);
  lines.push('');
  lines.push(`--${boundary}`);
  lines.push('Content-Type: text/plain; charset="UTF-8"');
  lines.push('');
  lines.push(plainText);
  lines.push('');
  lines.push(`--${boundary}`);
  lines.push('Content-Type: text/html; charset="UTF-8"');
  lines.push('');
  lines.push(html);
  lines.push('');
  lines.push(`--${boundary}--`);
  return lines.join('\r\n');
}

async function sendGmailEmail(to: string, subject: string, html: string): Promise<boolean> {
  try {
    const picaSecretKey = Deno.env.get('PICA_SECRET_KEY');
    const picaGmailConnectionKey = Deno.env.get('PICA_GMAIL_CONNECTION_KEY');
    if (!picaSecretKey || !picaGmailConnectionKey) {
      console.warn('Gmail env vars not set');
      return false;
    }
    const mime = buildMimeMessage(to, subject, html);
    const raw = toBase64Url(mime);
    const response = await fetch('https://api.picaos.com/v1/passthrough/users/me/messages/send', {
      method: 'POST',
      headers: {
        'x-pica-secret': picaSecretKey,
        'x-pica-connection-key': picaGmailConnectionKey,
        'x-pica-action-id': 'conn_mod_def::F_JeJ_A_TKg::cc2kvVQQTiiIiLEDauy6zQ',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ raw }),
    });
    if (!response.ok) {
      const errText = await response.text();
      console.error('Gmail send failed:', response.status, errText);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Gmail send error:', err);
    return false;
  }
}

async function queryOpenAI(prompt: string, systemPrompt: string, maxTokens = 600): Promise<string> {
  const openaiKey = Deno.env.get('OPENAI_API_KEY');
  if (!openaiKey) throw new Error('OPENAI_API_KEY not set');

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${openaiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt },
      ],
      max_tokens: maxTokens,
      temperature: 0.7,
    }),
    signal: AbortSignal.timeout(30000),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`OpenAI API error: ${response.status} ${err}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content ?? '';
}

async function queryGemini(prompt: string, maxTokens = 600): Promise<string> {
  const geminiKey = Deno.env.get('GEMINI_API_KEY');
  if (!geminiKey) throw new Error('GEMINI_API_KEY not set');

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: { maxOutputTokens: maxTokens, temperature: 0.7 },
      }),
      signal: AbortSignal.timeout(30000),
    }
  );

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Gemini API error: ${response.status} ${err}`);
  }

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
}

async function queryClaude(prompt: string, maxTokens = 600): Promise<string> {
  const anthropicKey = Deno.env.get('ANTHROPIC_API_KEY');
  if (!anthropicKey) throw new Error('ANTHROPIC_API_KEY not set');

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': anthropicKey,
      'anthropic-version': '2023-06-01',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-3-haiku-20240307',
      max_tokens: maxTokens,
      messages: [{ role: 'user', content: prompt }],
    }),
    signal: AbortSignal.timeout(30000),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Claude API error: ${response.status} ${err}`);
  }

  const data = await response.json();
  return data.content?.[0]?.text ?? '';
}

function buildPlatformPrompt(
  platform: 'ChatGPT' | 'Gemini' | 'Claude',
  keyword: string,
  brandName: string,
  primaryService: string,
  city: string,
): string {
  return `You are being asked: "${keyword}"

A business called "${brandName}" offers ${primaryService} services in ${city}.

Your task: Respond to this query as you naturally would, then evaluate whether "${brandName}" appears in your response.

Respond with ONLY a JSON object in this exact format (no markdown, no extra text):
{
  "mentioned": true or false,
  "visibilityScore": number between 0 and 100,
  "responseSnippet": "Your actual 2-3 sentence answer to the query above, as if a real user asked you",
  "competitorsMentioned": ["2 or 3 realistic competitor business names for ${primaryService} in ${city}"]
}

Scoring guidance:
- 70-100: Business is well-known, has strong reviews, strong web presence, clearly relevant
- 40-69: Business has some presence but not dominant
- 10-39: Business is lesser known or hard to verify online
- Be honest — most local businesses are NOT prominently surfaced by AI assistants
- If you genuinely cannot verify the business exists online, mark mentioned=false with a low score`;
}

async function checkPlatform(
  platform: 'ChatGPT' | 'Gemini' | 'Claude',
  brandName: string,
  primaryService: string,
  city: string,
  targetKeywords: string[],
): Promise<PlatformResult> {
  const keyword = targetKeywords.length > 0 ? targetKeywords[0] : `best ${primaryService} in ${city}`;
  const prompt = buildPlatformPrompt(platform, keyword, brandName, primaryService, city);

  const fallback: PlatformResult = {
    platform,
    mentioned: false,
    visibilityScore: 15,
    responseSnippet: `When asked about ${primaryService} in ${city}, I can suggest searching Google Maps or Yelp for verified local providers. I wasn't able to confirm whether ${brandName} appears prominently in local results.`,
    competitorsMentioned: [`Top ${primaryService} Co.`, `Premier ${primaryService} Services`],
  };

  try {
    let raw = '';

    if (platform === 'ChatGPT') {
      raw = await queryOpenAI(prompt, 'You are ChatGPT answering a local business search query. Respond only with the requested JSON.', 400);
    } else if (platform === 'Gemini') {
      raw = await queryGemini(prompt, 400);
    } else {
      raw = await queryClaude(prompt, 400);
    }

    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('No JSON in response');
    const parsed = JSON.parse(jsonMatch[0]);

    return {
      platform,
      mentioned: Boolean(parsed.mentioned),
      visibilityScore: Math.min(100, Math.max(0, Number(parsed.visibilityScore) || 0)),
      responseSnippet: String(parsed.responseSnippet || ''),
      competitorsMentioned: Array.isArray(parsed.competitorsMentioned) ? parsed.competitorsMentioned : [],
    };
  } catch (err) {
    console.error(`Platform check failed for ${platform}:`, err);
    return fallback;
  }
}

async function generateFullReport(
  brandName: string,
  websiteUrl: string,
  primaryService: string,
  city: string,
  targetKeywords: string[],
  platforms: PlatformResult[],
): Promise<Omit<VisibilityReport, 'platforms' | 'overallScore' | 'competitorMentions' | 'checkedAt' | 'brandName' | 'city' | 'primaryService' | 'websiteUrl'>> {
  const mentionedCount = platforms.filter(p => p.mentioned).length;
  const avgScore = Math.round(platforms.reduce((s, p) => s + p.visibilityScore, 0) / platforms.length);
  const allCompetitors = [...new Set(platforms.flatMap(p => p.competitorsMentioned))];

  const systemPrompt = `You are a senior AI visibility and digital marketing consultant. Provide a JSON analysis only — no markdown, no extra text.`;

  const prompt = `Analyze the AI visibility of this business:

Brand: ${brandName}
Website: ${websiteUrl}
Service: ${primaryService}
Location: ${city}
Target Keywords: ${targetKeywords.join(', ') || `best ${primaryService} in ${city}`}
Mentioned on AI platforms: ${mentionedCount}/3
Average visibility score: ${avgScore}/100
Competitors appearing instead: ${allCompetitors.join(', ')}

Provide a detailed analysis in this exact JSON format:
{
  "brandSummary": "2-3 sentence paragraph describing how this brand currently appears (or doesn't appear) across AI platforms and what that means for their business",
  "strengths": ["strength 1", "strength 2", "strength 3"],
  "gaps": ["gap 1", "gap 2", "gap 3"],
  "contentRecommendations": ["specific content improvement 1", "specific content improvement 2", "specific content improvement 3"],
  "seoSuggestions": ["SEO suggestion 1", "SEO suggestion 2", "SEO suggestion 3"],
  "visibilityTips": ["AI visibility tip 1", "AI visibility tip 2", "AI visibility tip 3"]
}

Make recommendations highly specific to the service type (${primaryService}) and city (${city}). Reference real tactics like FAQ pages, Google Business Profile optimization, citation building, E-E-A-T signals, topical authority, and schema markup.`;

  try {
    const raw = await queryOpenAI(prompt, systemPrompt, 700);
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('No JSON in response');
    const parsed = JSON.parse(jsonMatch[0]);
    return {
      brandSummary: String(parsed.brandSummary || ''),
      strengths: Array.isArray(parsed.strengths) ? parsed.strengths : [],
      gaps: Array.isArray(parsed.gaps) ? parsed.gaps : [],
      contentRecommendations: Array.isArray(parsed.contentRecommendations) ? parsed.contentRecommendations : [],
      seoSuggestions: Array.isArray(parsed.seoSuggestions) ? parsed.seoSuggestions : [],
      visibilityTips: Array.isArray(parsed.visibilityTips) ? parsed.visibilityTips : [],
    };
  } catch (err) {
    console.error('Full report generation failed:', err);
    return {
      brandSummary: `${brandName} currently has limited visibility across major AI platforms for ${primaryService} searches in ${city}. AI assistants like ChatGPT, Gemini, and Claude typically surface businesses with strong online authority, consistent citations, and structured content — areas where focused improvement can yield significant gains.`,
      strengths: [
        `Operating in ${city} provides a defined geographic target for local AI visibility`,
        `${primaryService} is a service with strong search demand`,
        'Submitting to this audit shows proactive digital marketing approach',
      ],
      gaps: [
        'Limited AI platform recognition for target keywords',
        'Competitors are appearing more frequently in AI-generated recommendations',
        'Insufficient structured data and authority signals for AI training data',
      ],
      contentRecommendations: [
        `Create a detailed FAQ page targeting "${city} ${primaryService}" questions`,
        'Publish regular blog content demonstrating expertise in your service area',
        'Add structured schema markup (LocalBusiness, Service, FAQ) to your website',
      ],
      seoSuggestions: [
        'Build consistent NAP citations across 50+ local directories',
        'Optimize Google Business Profile with regular posts and complete information',
        'Earn quality backlinks from local news, associations, and partner sites',
      ],
      visibilityTips: [
        'Ensure your website content directly answers common questions AI assistants receive',
        'Build E-E-A-T signals: author bios, credentials, reviews, and case studies',
        'Get featured in local publications to increase AI training data presence',
      ],
    };
  }
}

async function buildVisibilityReport(
  brandName: string,
  websiteUrl: string,
  primaryService: string,
  city: string,
  targetKeywords: string[],
): Promise<VisibilityReport> {
  const [chatgptResult, geminiResult, claudeResult] = await Promise.all([
    checkPlatform('ChatGPT', brandName, primaryService, city, targetKeywords),
    checkPlatform('Gemini', brandName, primaryService, city, targetKeywords),
    checkPlatform('Claude', brandName, primaryService, city, targetKeywords),
  ]);

  const platforms = [chatgptResult, geminiResult, claudeResult];
  const overallScore = Math.round(platforms.reduce((s, p) => s + p.visibilityScore, 0) / 3);
  const allCompetitors = [...new Set(platforms.flatMap(p => p.competitorsMentioned))];

  const analysis = await generateFullReport(brandName, websiteUrl, primaryService, city, targetKeywords, platforms);

  return {
    overallScore,
    platforms,
    brandSummary: analysis.brandSummary,
    competitorMentions: allCompetitors,
    strengths: analysis.strengths,
    gaps: analysis.gaps,
    contentRecommendations: analysis.contentRecommendations,
    seoSuggestions: analysis.seoSuggestions,
    visibilityTips: analysis.visibilityTips,
    checkedAt: new Date().toISOString(),
    brandName,
    city,
    primaryService,
    websiteUrl,
  };
}

function buildReportEmail(email: string, report: VisibilityReport): string {
  const scoreColor = report.overallScore >= 70 ? '#16a34a' : report.overallScore >= 40 ? '#ca8a04' : '#dc2626';
  const CALENDAR_URL = 'https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ2m0vspPUrR0-YqZ4woobo35YfltXEIKt__2utprk-3OdzJy3Qk9mCNHtvzlEdxZC0Y34jiLzfF';

  const platformRows = report.platforms.map(p => `
    <tr>
      <td style="padding:12px 16px; border-bottom:1px solid #f3f4f6; font-weight:600; color:#111;">${p.platform}</td>
      <td style="padding:12px 16px; border-bottom:1px solid #f3f4f6;">
        <span style="display:inline-block; padding:3px 10px; border-radius:20px; font-size:12px; font-weight:700; background:${p.mentioned ? '#d1fae5' : '#fee2e2'}; color:${p.mentioned ? '#065f46' : '#991b1b'};">
          ${p.mentioned ? 'Mentioned' : 'Not Mentioned'}
        </span>
      </td>
      <td style="padding:12px 16px; border-bottom:1px solid #f3f4f6; font-weight:700; color:${p.visibilityScore >= 60 ? '#16a34a' : p.visibilityScore >= 35 ? '#ca8a04' : '#dc2626'};">${p.visibilityScore}/100</td>
    </tr>`).join('');

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0; padding:20px; background:#f9fafb; font-family:Arial,sans-serif; color:#333;">
  <div style="max-width:620px; margin:0 auto; background:white; border-radius:16px; overflow:hidden; box-shadow:0 4px 24px rgba(0,0,0,0.08);">
    <div style="background:#0f172a; padding:36px 32px; text-align:center;">
      <p style="margin:0 0 8px; font-size:13px; text-transform:uppercase; letter-spacing:2px; color:#94a3b8;">SiteMaxi AI Tools</p>
      <h1 style="margin:0; font-size:26px; color:white; font-weight:800;">Your AI Brand Visibility Report</h1>
      <p style="margin:10px 0 0; color:#94a3b8; font-size:15px;">${report.brandName} &mdash; ${report.city}</p>
    </div>

    <div style="background:${scoreColor}; padding:36px 32px; text-align:center; color:white;">
      <p style="margin:0 0 6px; font-size:12px; text-transform:uppercase; letter-spacing:2px; opacity:0.85;">Overall AI Visibility Score</p>
      <div style="font-size:80px; font-weight:900; line-height:1;">${report.overallScore}</div>
      <p style="margin:4px 0 0; font-size:22px; opacity:0.85;">/100</p>
      <p style="margin:12px 0 0; font-size:14px; opacity:0.9;">${report.overallScore >= 70 ? 'Strong visibility — keep building momentum' : report.overallScore >= 40 ? 'Moderate visibility — clear room to grow' : 'Low visibility — significant opportunity to improve'}</p>
    </div>

    <div style="padding:32px;">
      <h2 style="font-size:18px; font-weight:700; color:#111; margin:0 0 16px; border-bottom:2px solid #f3f4f6; padding-bottom:10px;">Platform Breakdown</h2>
      <table style="width:100%; border-collapse:collapse; font-size:14px;">
        <thead>
          <tr style="background:#f9fafb;">
            <th style="padding:10px 16px; text-align:left; font-size:12px; text-transform:uppercase; letter-spacing:1px; color:#6b7280;">Platform</th>
            <th style="padding:10px 16px; text-align:left; font-size:12px; text-transform:uppercase; letter-spacing:1px; color:#6b7280;">Status</th>
            <th style="padding:10px 16px; text-align:left; font-size:12px; text-transform:uppercase; letter-spacing:1px; color:#6b7280;">Score</th>
          </tr>
        </thead>
        <tbody>${platformRows}</tbody>
      </table>

      <h2 style="font-size:18px; font-weight:700; color:#111; margin:28px 0 12px; border-bottom:2px solid #f3f4f6; padding-bottom:10px;">Brand Summary</h2>
      <p style="color:#374151; line-height:1.75; font-size:14px; margin:0;">${report.brandSummary}</p>

      <h2 style="font-size:18px; font-weight:700; color:#111; margin:28px 0 12px; border-bottom:2px solid #f3f4f6; padding-bottom:10px;">Key Insights</h2>
      <div style="display:grid; gap:12px;">
        <div style="background:#f0fdf4; border-left:4px solid #16a34a; border-radius:8px; padding:14px 16px;">
          <p style="margin:0 0 8px; font-size:13px; font-weight:700; color:#166534; text-transform:uppercase; letter-spacing:1px;">Strengths</p>
          <ul style="margin:0; padding:0 0 0 18px; color:#374151; font-size:14px; line-height:1.7;">
            ${report.strengths.map(s => `<li>${s}</li>`).join('')}
          </ul>
        </div>
        <div style="background:#fef2f2; border-left:4px solid #dc2626; border-radius:8px; padding:14px 16px;">
          <p style="margin:0 0 8px; font-size:13px; font-weight:700; color:#991b1b; text-transform:uppercase; letter-spacing:1px;">Gaps to Address</p>
          <ul style="margin:0; padding:0 0 0 18px; color:#374151; font-size:14px; line-height:1.7;">
            ${report.gaps.map(g => `<li>${g}</li>`).join('')}
          </ul>
        </div>
      </div>

      <h2 style="font-size:18px; font-weight:700; color:#111; margin:28px 0 12px; border-bottom:2px solid #f3f4f6; padding-bottom:10px;">Top Recommendations</h2>
      <table style="width:100%; border-collapse:collapse;">
        ${report.visibilityTips.map((tip, i) => `
        <tr>
          <td style="padding:10px 12px 10px 0; border-bottom:1px solid #f3f4f6; vertical-align:top; width:32px;">
            <span style="display:inline-block; background:#1d4ed8; color:white; width:26px; height:26px; border-radius:50%; font-size:12px; font-weight:700; line-height:26px; text-align:center;">${i + 1}</span>
          </td>
          <td style="padding:10px 0; border-bottom:1px solid #f3f4f6; vertical-align:top;">
            <p style="margin:0; color:#374151; font-size:14px; line-height:1.6;">${tip}</p>
          </td>
        </tr>`).join('')}
      </table>

      <a href="${CALENDAR_URL}" style="display:block; background:#1d4ed8; color:white; text-align:center; padding:18px; border-radius:10px; text-decoration:none; font-weight:700; font-size:16px; margin:28px 0 0;">
        Book a Free Strategy Call to Improve Your Score
      </a>
    </div>

    <div style="background:#f9fafb; padding:20px 32px; text-align:center; border-top:1px solid #f3f4f6;">
      <p style="margin:0; font-size:12px; color:#9ca3af;">Report generated by SiteMaxi AI Brand Visibility Checker</p>
      <p style="margin:4px 0 0; font-size:12px; color:#9ca3af;">Results are estimated insights based on AI platform behavior patterns, not exact rankings.</p>
      <p style="margin:8px 0 0; font-size:12px;"><a href="https://sitemaxi.com" style="color:#1d4ed8; text-decoration:none;">sitemaxi.com</a></p>
    </div>
  </div>
</body>
</html>`;
}

function buildTeamNotificationEmail(report: VisibilityReport, email: string): string {
  return `<!DOCTYPE html>
<html>
<body style="font-family:Arial,sans-serif; color:#333; background:#f9fafb; padding:20px;">
  <div style="max-width:600px; margin:0 auto; background:white; border-radius:12px; overflow:hidden; box-shadow:0 2px 12px rgba(0,0,0,0.08);">
    <div style="background:#0f172a; color:white; padding:24px 32px;">
      <h1 style="margin:0; font-size:20px;">New AI Visibility Lead</h1>
      <p style="margin:6px 0 0; opacity:0.75; font-size:14px;">Submitted via AI Brand Visibility Checker</p>
    </div>
    <div style="padding:28px 32px;">
      <table style="width:100%; font-size:14px; border-collapse:collapse;">
        <tr><td style="padding:8px 0; color:#6b7280; width:140px;">Brand</td><td style="padding:8px 0; font-weight:700; color:#111;">${report.brandName}</td></tr>
        <tr><td style="padding:8px 0; color:#6b7280;">Website</td><td style="padding:8px 0;"><a href="${report.websiteUrl}" style="color:#2563eb;">${report.websiteUrl}</a></td></tr>
        <tr><td style="padding:8px 0; color:#6b7280;">Email</td><td style="padding:8px 0;">${email}</td></tr>
        <tr><td style="padding:8px 0; color:#6b7280;">Service</td><td style="padding:8px 0;">${report.primaryService}</td></tr>
        <tr><td style="padding:8px 0; color:#6b7280;">City</td><td style="padding:8px 0;">${report.city}</td></tr>
        <tr><td style="padding:8px 0; color:#6b7280;">Visibility Score</td><td style="padding:8px 0; font-weight:800; font-size:20px; color:${report.overallScore >= 70 ? '#16a34a' : report.overallScore >= 40 ? '#ca8a04' : '#dc2626'};">${report.overallScore}/100</td></tr>
      </table>
      <a href="https://sitemaxi.com/admin/visibility-leads" style="display:inline-block; margin-top:16px; background:#2563eb; color:white; padding:12px 24px; border-radius:8px; text-decoration:none; font-weight:700;">View in Admin Panel</a>
    </div>
  </div>
</body>
</html>`;
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const body: VisibilityRequest = await req.json();
    const { brandName, websiteUrl, primaryService, city, targetKeywords, email } = body;

    if (!brandName || !websiteUrl || !primaryService || !city || !email) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const report = await buildVisibilityReport(brandName, websiteUrl, primaryService, city, targetKeywords || []);

    const { data: lead, error: dbError } = await supabase
      .from('ai_visibility_leads')
      .insert({
        brand_name: brandName,
        website_url: websiteUrl,
        primary_service: primaryService,
        city,
        target_keywords: targetKeywords || [],
        email,
        visibility_report: report,
        report_emailed: false,
      })
      .select()
      .single();

    if (dbError) {
      console.error('DB insert error:', dbError);
    }

    EdgeRuntime.waitUntil((async () => {
      try {
        const userEmailHtml = buildReportEmail(email, report);
        const sent = await sendGmailEmail(
          email,
          `Your AI Brand Visibility Report - ${brandName}`,
          userEmailHtml
        );
        if (sent && lead) {
          await supabase.from('ai_visibility_leads').update({ report_emailed: true }).eq('id', lead.id);
        }

        const teamEmailHtml = buildTeamNotificationEmail(report, email);
        await sendGmailEmail(
          'operations@sitemaxi.com',
          `New Visibility Lead: ${brandName} (Score: ${report.overallScore}/100)`,
          teamEmailHtml
        );
      } catch (emailErr) {
        console.error('Email send error:', emailErr);
      }
    })());

    return new Response(JSON.stringify({ success: true, report, leadId: lead?.id }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(JSON.stringify({ error: 'Visibility check failed. Please try again.', details: String(error) }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
