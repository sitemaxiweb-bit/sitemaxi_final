import { createClient } from 'npm:@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

interface AuditRequest {
  websiteUrl?: string;
  fullName: string;
  email: string;
  recaptchaToken?: string;
  sendEmail?: boolean;
  emailOnly?: boolean;
  leadId?: string;
}

interface SEOIssue {
  type: 'error' | 'warning' | 'info';
  title: string;
  description: string;
}

interface Recommendation {
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
}

interface AuditReport {
  seoScore: number;
  technicalSEO: {
    titleTag: { present: boolean; content: string; length: number; status: 'good' | 'warning' | 'error' };
    metaDescription: { present: boolean; content: string; length: number; status: 'good' | 'warning' | 'error' };
    h1Tag: { present: boolean; count: number; status: 'good' | 'warning' | 'error' };
    httpsEnabled: boolean;
    canonicalTag: boolean;
    viewportMeta: boolean;
  };
  pageSpeed: {
    mobileScore: number;
    desktopScore: number;
    lcp: string;
    fcp: string;
    cls: string;
    status: 'good' | 'warning' | 'error';
  };
  mobileFriendly: boolean;
  onPageIssues: SEOIssue[];
  recommendations: Recommendation[];
  aiInsights: string;
  auditedUrl: string;
  auditDate: string;
}

async function verifyRecaptcha(token: string): Promise<boolean> {
  const secretKey = Deno.env.get('RECAPTCHA_SECRET_KEY');
  if (!secretKey) {
    console.warn('RECAPTCHA_SECRET_KEY not set — skipping verification');
    return true;
  }
  if (!token) return false;

  try {
    const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${encodeURIComponent(secretKey)}&response=${encodeURIComponent(token)}`,
      signal: AbortSignal.timeout(5000),
    });
    const data = await res.json();
    return data.success === true && (data.score ?? 1) >= 0.5;
  } catch (err) {
    console.error('reCAPTCHA verification error:', err);
    return false;
  }
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
      console.warn('Gmail env vars not set: PICA_SECRET_KEY or PICA_GMAIL_CONNECTION_KEY');
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

async function fetchPageData(url: string): Promise<{ html: string; finalUrl: string }> {
  const normalizedUrl = url.startsWith('http') ? url : `https://${url}`;
  const response = await fetch(normalizedUrl, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; SEOAuditBot/1.0)',
    },
    redirect: 'follow',
    signal: AbortSignal.timeout(10000),
  });
  const html = await response.text();
  return { html, finalUrl: response.url };
}

function extractSEOData(html: string) {
  const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : '';

  const metaDescMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/i)
    || html.match(/<meta[^>]*content=["']([^"']*)["'][^>]*name=["']description["'][^>]*>/i);
  const metaDescription = metaDescMatch ? metaDescMatch[1].trim() : '';

  const h1Matches = html.match(/<h1[^>]*>/gi) || [];
  const h1Count = h1Matches.length;

  const canonicalMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*>/i);
  const hasCanonical = !!canonicalMatch;

  const viewportMatch = html.match(/<meta[^>]*name=["']viewport["'][^>]*>/i);
  const hasViewport = !!viewportMatch;

  const robotsMatch = html.match(/<meta[^>]*name=["']robots["'][^>]*content=["']([^"']*)["'][^>]*>/i);
  const robotsContent = robotsMatch ? robotsMatch[1].toLowerCase() : '';
  const isNoindex = robotsContent.includes('noindex');

  const ogTitleMatch = html.match(/<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']*)["'][^>]*>/i);
  const hasOgTags = !!ogTitleMatch;

  const imgTagsWithoutAlt = (html.match(/<img(?![^>]*\balt\s*=)[^>]*>/gi) || []).length;
  const totalImgTags = (html.match(/<img[^>]*>/gi) || []).length;

  const internalLinksWithoutText = (html.match(/<a[^>]*href[^>]*>\s*<\/a>/gi) || []).length;

  const schemaMatch = html.match(/application\/ld\+json/gi);
  const hasSchema = !!schemaMatch;

  return {
    title,
    metaDescription,
    h1Count,
    hasCanonical,
    hasViewport,
    isNoindex,
    hasOgTags,
    imgTagsWithoutAlt,
    totalImgTags,
    internalLinksWithoutText,
    hasSchema,
  };
}

async function fetchPageSpeed(url: string): Promise<{ mobile: number; desktop: number; lcp: string; fcp: string; cls: string }> {
  try {
    const apiKey = Deno.env.get('PAGESPEED_API_KEY') || '';
    const keyParam = apiKey ? `&key=${apiKey}` : '';

    const [mobileRes, desktopRes] = await Promise.all([
      fetch(`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=mobile${keyParam}`, {
        signal: AbortSignal.timeout(20000),
      }),
      fetch(`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=desktop${keyParam}`, {
        signal: AbortSignal.timeout(20000),
      }),
    ]);

    const mobileData = await mobileRes.json();
    const desktopData = await desktopRes.json();

    const mobileScore = Math.round((mobileData?.lighthouseResult?.categories?.performance?.score ?? 0.5) * 100);
    const desktopScore = Math.round((desktopData?.lighthouseResult?.categories?.performance?.score ?? 0.6) * 100);

    const mobileLCP = mobileData?.lighthouseResult?.audits?.['largest-contentful-paint']?.displayValue ?? 'N/A';
    const mobileFCP = mobileData?.lighthouseResult?.audits?.['first-contentful-paint']?.displayValue ?? 'N/A';
    const mobileCLS = mobileData?.lighthouseResult?.audits?.['cumulative-layout-shift']?.displayValue ?? 'N/A';

    return { mobile: mobileScore, desktop: desktopScore, lcp: mobileLCP, fcp: mobileFCP, cls: mobileCLS };
  } catch {
    return { mobile: 50, desktop: 65, lcp: 'N/A', fcp: 'N/A', cls: 'N/A' };
  }
}

async function generateAIInsights(seoData: ReturnType<typeof extractSEOData>, pageSpeed: Awaited<ReturnType<typeof fetchPageSpeed>>, url: string, fullName: string): Promise<string> {
  const openaiKey = Deno.env.get('OPENAI_API_KEY');
  if (!openaiKey) {
    return `Based on the analysis of ${fullName}'s website (${url}), we identified several key areas for improvement. Your site has foundational SEO elements in place, but there are opportunities to enhance your visibility in search results. Focus on optimizing page speed, ensuring all images have descriptive alt text, and strengthening your on-page content with targeted keywords. Implementing structured data markup and building quality backlinks will further strengthen your online presence.`;
  }

  const prompt = `You are an expert SEO analyst. Analyze this website SEO data and provide a concise, actionable 3-paragraph summary for a business owner.

Name: ${fullName}
Website: ${url}
Title Tag: ${seoData.title || 'Missing'}
Meta Description: ${seoData.metaDescription || 'Missing'}
H1 Tags: ${seoData.h1Count}
Has Canonical: ${seoData.hasCanonical}
Has Viewport Meta: ${seoData.hasViewport}
Has OG Tags: ${seoData.hasOgTags}
Has Schema: ${seoData.hasSchema}
Images without alt: ${seoData.imgTagsWithoutAlt} of ${seoData.totalImgTags}
Mobile Page Speed: ${pageSpeed.mobile}/100
Desktop Page Speed: ${pageSpeed.desktop}/100
LCP: ${pageSpeed.lcp}

Write 3 short paragraphs (2-3 sentences each):
1. Overall assessment and key strengths
2. Most critical issues to fix immediately
3. Long-term recommendations for growth

Be specific, professional, and actionable. Do not use bullet points or headers.`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${openaiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 400,
      temperature: 0.7,
    }),
    signal: AbortSignal.timeout(30000),
  });

  if (!response.ok) {
    return `Based on the technical analysis of ${fullName}'s website, we've identified both strengths and opportunities for improvement. Your site shows foundational SEO elements, but optimizing page speed and content structure will significantly boost search rankings. Prioritize the high-priority recommendations in this report to see measurable results within 60-90 days.`;
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || '';
}

function buildReport(seoData: ReturnType<typeof extractSEOData>, pageSpeed: Awaited<ReturnType<typeof fetchPageSpeed>>, url: string, aiInsights: string): AuditReport {
  const issues: SEOIssue[] = [];
  const recommendations: Recommendation[] = [];
  let scoreDeductions = 0;

  const titleStatus = !seoData.title
    ? 'error'
    : seoData.title.length < 30 || seoData.title.length > 60
    ? 'warning'
    : 'good';
  if (!seoData.title) { scoreDeductions += 15; issues.push({ type: 'error', title: 'Missing Title Tag', description: 'Your page has no title tag. This is critical for SEO and click-through rates.' }); recommendations.push({ priority: 'high', title: 'Add a Title Tag', description: 'Create a descriptive, keyword-rich title tag between 50-60 characters.' }); }
  else if (titleStatus === 'warning') { scoreDeductions += 5; issues.push({ type: 'warning', title: `Title Tag Length (${seoData.title.length} chars)`, description: seoData.title.length < 30 ? 'Title is too short. Aim for 50-60 characters to maximize search visibility.' : 'Title may be truncated in search results. Shorten to under 60 characters.' }); }

  const metaStatus = !seoData.metaDescription
    ? 'error'
    : seoData.metaDescription.length < 120 || seoData.metaDescription.length > 160
    ? 'warning'
    : 'good';
  if (!seoData.metaDescription) { scoreDeductions += 12; issues.push({ type: 'error', title: 'Missing Meta Description', description: 'No meta description found. This affects click-through rates from search results.' }); recommendations.push({ priority: 'high', title: 'Add Meta Descriptions', description: 'Write unique meta descriptions (150-160 chars) for every page to improve CTR.' }); }
  else if (metaStatus === 'warning') { scoreDeductions += 4; issues.push({ type: 'warning', title: `Meta Description Length (${seoData.metaDescription.length} chars)`, description: 'Meta description length is not optimal. Ideal length is 150-160 characters.' }); }

  const h1Status = seoData.h1Count === 0 ? 'error' : seoData.h1Count > 1 ? 'warning' : 'good';
  if (seoData.h1Count === 0) { scoreDeductions += 10; issues.push({ type: 'error', title: 'Missing H1 Heading', description: 'No H1 tag found on the page. H1 is essential for page structure and SEO.' }); recommendations.push({ priority: 'high', title: 'Add an H1 Heading', description: 'Each page should have exactly one H1 tag containing your primary keyword.' }); }
  else if (seoData.h1Count > 1) { scoreDeductions += 5; issues.push({ type: 'warning', title: `Multiple H1 Tags (${seoData.h1Count} found)`, description: 'Multiple H1 tags can confuse search engines about the primary topic.' }); }

  if (!seoData.hasCanonical) { scoreDeductions += 5; issues.push({ type: 'warning', title: 'No Canonical Tag', description: 'Missing canonical tag can lead to duplicate content issues.' }); recommendations.push({ priority: 'medium', title: 'Implement Canonical Tags', description: 'Add canonical tags to indicate the preferred URL for each page.' }); }

  if (!seoData.hasViewport) { scoreDeductions += 8; issues.push({ type: 'error', title: 'Missing Viewport Meta Tag', description: 'No viewport meta tag detected. This is required for mobile responsiveness.' }); recommendations.push({ priority: 'high', title: 'Add Viewport Meta Tag', description: 'Add <meta name="viewport" content="width=device-width, initial-scale=1"> for mobile optimization.' }); }

  if (!seoData.hasOgTags) { scoreDeductions += 4; issues.push({ type: 'info', title: 'Missing Open Graph Tags', description: 'No OG tags found. These improve appearance when shared on social media.' }); recommendations.push({ priority: 'medium', title: 'Add Open Graph Tags', description: 'Implement og:title, og:description, and og:image for better social sharing.' }); }

  if (!seoData.hasSchema) { scoreDeductions += 5; issues.push({ type: 'info', title: 'No Structured Data', description: 'No schema markup detected. Structured data can unlock rich snippets in search results.' }); recommendations.push({ priority: 'medium', title: 'Implement Schema Markup', description: 'Add JSON-LD structured data for your business type to earn rich snippets.' }); }

  if (seoData.isNoindex) { scoreDeductions += 20; issues.push({ type: 'error', title: 'Page Blocked from Indexing', description: 'A noindex directive was found. Search engines cannot index this page.' }); recommendations.push({ priority: 'high', title: 'Remove noindex Tag', description: 'Remove the noindex meta tag to allow search engines to index your page.' }); }

  if (seoData.imgTagsWithoutAlt > 0) { scoreDeductions += Math.min(8, seoData.imgTagsWithoutAlt * 2); issues.push({ type: 'warning', title: `${seoData.imgTagsWithoutAlt} Image(s) Missing Alt Text`, description: `${seoData.imgTagsWithoutAlt} of ${seoData.totalImgTags} images lack alt attributes, hurting accessibility and image SEO.` }); recommendations.push({ priority: 'medium', title: 'Add Alt Text to All Images', description: 'Describe each image with relevant keywords to improve image search visibility.' }); }

  if (pageSpeed.mobile < 50) { scoreDeductions += 10; issues.push({ type: 'error', title: `Poor Mobile Page Speed (${pageSpeed.mobile}/100)`, description: 'Your mobile page speed is critically slow, likely causing high bounce rates.' }); recommendations.push({ priority: 'high', title: 'Improve Mobile Page Speed', description: 'Compress images, enable caching, and minimize render-blocking resources to speed up your site.' }); }
  else if (pageSpeed.mobile < 75) { scoreDeductions += 5; issues.push({ type: 'warning', title: `Moderate Mobile Page Speed (${pageSpeed.mobile}/100)`, description: 'Page speed could be improved. Faster pages rank higher and convert better.' }); }

  if (pageSpeed.desktop < 70) { scoreDeductions += 5; issues.push({ type: 'warning', title: `Desktop Speed Needs Improvement (${pageSpeed.desktop}/100)`, description: 'Desktop performance score indicates optimization opportunities.' }); }

  const seoScore = Math.max(0, 100 - scoreDeductions);
  const pageSpeedStatus = pageSpeed.mobile >= 75 ? 'good' : pageSpeed.mobile >= 50 ? 'warning' : 'error';

  return {
    seoScore,
    technicalSEO: {
      titleTag: { present: !!seoData.title, content: seoData.title, length: seoData.title.length, status: titleStatus },
      metaDescription: { present: !!seoData.metaDescription, content: seoData.metaDescription, length: seoData.metaDescription.length, status: metaStatus },
      h1Tag: { present: seoData.h1Count > 0, count: seoData.h1Count, status: h1Status },
      httpsEnabled: url.startsWith('https://'),
      canonicalTag: seoData.hasCanonical,
      viewportMeta: seoData.hasViewport,
    },
    pageSpeed: {
      mobileScore: pageSpeed.mobile,
      desktopScore: pageSpeed.desktop,
      lcp: pageSpeed.lcp,
      fcp: pageSpeed.fcp,
      cls: pageSpeed.cls,
      status: pageSpeedStatus,
    },
    mobileFriendly: seoData.hasViewport,
    onPageIssues: issues,
    recommendations: recommendations.sort((a, b) => {
      const order = { high: 0, medium: 1, low: 2 };
      return order[a.priority] - order[b.priority];
    }),
    aiInsights,
    auditedUrl: url,
    auditDate: new Date().toISOString(),
  };
}

async function sendTeamNotification(fullName: string, email: string, websiteUrl: string, seoScore: number) {
  try {
    const scoreColor = seoScore >= 75 ? '#16a34a' : seoScore >= 50 ? '#ca8a04' : '#dc2626';
    const emailContent = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #0f172a; color: white; padding: 24px; border-radius: 8px 8px 0 0; }
    .content { background-color: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; border-top: none; }
    .score-badge { display: inline-block; background: ${scoreColor}; color: white; font-size: 28px; font-weight: bold; padding: 12px 24px; border-radius: 50px; margin: 10px 0; }
    .field { margin-bottom: 16px; }
    .label { font-weight: bold; color: #374151; }
    .cta { display: inline-block; background: #2563eb; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold; margin-top: 16px; }
    .footer { background-color: #f3f4f6; padding: 15px; text-align: center; font-size: 12px; color: #6b7280; border-radius: 0 0 8px 8px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin:0; font-size:22px;">New SEO Audit Lead</h1>
      <p style="margin:4px 0 0; opacity:0.85;">A new lead has been captured from the Free AI Marketing Audit tool</p>
    </div>
    <div class="content">
      <div class="field"><span class="label">Full Name:</span><br/><span style="font-size:18px; font-weight:600;">${fullName}</span></div>
      <div class="field"><span class="label">Email:</span><br/><span>${email}</span></div>
      <div class="field"><span class="label">Website Audited:</span><br/><a href="${websiteUrl}">${websiteUrl}</a></div>
      <div class="field"><span class="label">SEO Score:</span><br/><span class="score-badge">${seoScore}/100</span></div>
      <p style="color:#374151; margin-top:20px;">Follow up within 24 hours for best conversion results.</p>
      <a href="https://sitemaxi.com/admin" class="cta">View in Admin Panel</a>
    </div>
    <div class="footer"><p>Sent from SiteMaxi Free AI Marketing Audit tool</p></div>
  </div>
</body>
</html>`;

    await sendGmailEmail(
      'operations@sitemaxi.com',
      `New SEO Audit Lead: ${fullName} (Score: ${seoScore}/100)`,
      emailContent
    );
  } catch (err) {
    console.error('Team notification failed:', err);
  }
}

async function sendReportEmail(fullName: string, email: string, report: AuditReport): Promise<boolean> {
  try {
    const scoreColor = report.seoScore >= 75 ? '#16a34a' : report.seoScore >= 50 ? '#ca8a04' : '#dc2626';
    const highPriorityRecs = report.recommendations.filter(r => r.priority === 'high');

    const emailContent = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; background: #f9fafb; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
    .header { background: #111827; color: white; padding: 32px; text-align: center; }
    .score-section { background: ${scoreColor}; padding: 32px; text-align: center; color: white; }
    .score-number { font-size: 72px; font-weight: 800; line-height: 1; }
    .content { padding: 32px; }
    .section-title { font-size: 18px; font-weight: 700; color: #111; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px; margin: 24px 0 16px; }
    .issue { padding: 12px; border-radius: 8px; margin-bottom: 10px; }
    .issue-error { background: #fef2f2; border-left: 4px solid #dc2626; }
    .issue-warning { background: #fffbeb; border-left: 4px solid #f59e0b; }
    .issue-info { background: #eff6ff; border-left: 4px solid #3b82f6; }
    .rec { padding: 12px 16px; background: #f0fdf4; border-left: 4px solid #16a34a; border-radius: 8px; margin-bottom: 10px; }
    .cta { display: block; background: #2563eb; color: white; padding: 16px; border-radius: 8px; text-decoration: none; text-align: center; font-weight: 700; font-size: 16px; margin: 24px 0; }
    .footer { background: #f3f4f6; padding: 20px; text-align: center; font-size: 12px; color: #6b7280; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin:0; font-size:24px;">Your Free SEO Audit Report</h1>
      <p style="margin:8px 0 0; opacity:0.8;">${report.auditedUrl}</p>
    </div>
    <div class="score-section">
      <p style="margin:0 0 8px; font-size:14px; text-transform:uppercase; letter-spacing:2px; opacity:0.9;">Overall SEO Score</p>
      <div class="score-number">${report.seoScore}</div>
      <p style="margin:4px 0 0; font-size:20px; opacity:0.9;">/100</p>
    </div>
    <div class="content">
      <p>Hi ${fullName},</p>
      <p>Here is your personalized SEO audit report. We found ${report.onPageIssues.filter(i => i.type === 'error').length} critical issues and ${report.onPageIssues.filter(i => i.type === 'warning').length} warnings that need attention.</p>

      <div class="section-title">AI-Powered Insights</div>
      <p style="color:#374151; line-height:1.8;">${report.aiInsights}</p>

      ${highPriorityRecs.length > 0 ? `
      <div class="section-title">Top Priorities</div>
      ${highPriorityRecs.map(r => `
      <div class="rec">
        <strong style="color:#166534;">${r.title}</strong>
        <p style="margin:4px 0 0; font-size:14px; color:#374151;">${r.description}</p>
      </div>`).join('')}` : ''}

      <div class="section-title">Issues Found</div>
      ${report.onPageIssues.slice(0, 5).map(issue => `
      <div class="issue issue-${issue.type}">
        <strong>${issue.title}</strong>
        <p style="margin:4px 0 0; font-size:14px;">${issue.description}</p>
      </div>`).join('')}

      <a href="https://sitemaxi.com/contact" class="cta">Get a Free Consultation to Fix These Issues</a>
    </div>
    <div class="footer">
      <p>This report was generated by SiteMaxi AI Marketing Audit</p>
      <p><a href="https://sitemaxi.com">sitemaxi.com</a></p>
    </div>
  </div>
</body>
</html>`;

    return await sendGmailEmail(
      email,
      `Your SEO Audit Report - ${fullName} (Score: ${report.seoScore}/100)`,
      emailContent
    );
  } catch (err) {
    console.error('Report email failed:', err);
    return false;
  }
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

    const body: AuditRequest = await req.json();
    const { websiteUrl, fullName, email, recaptchaToken, sendEmail = false, emailOnly = false, leadId } = body;

    if (!email || !fullName) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (!emailOnly) {
      const captchaValid = await verifyRecaptcha(recaptchaToken ?? '');
      if (!captchaValid) {
        return new Response(JSON.stringify({ error: 'Bot verification failed. Please try again.' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    if (emailOnly && leadId) {
      const { data: lead, error: leadErr } = await supabase
        .from('seo_audit_leads')
        .select('audit_report')
        .eq('id', leadId)
        .maybeSingle();

      if (leadErr || !lead?.audit_report) {
        return new Response(JSON.stringify({ error: 'Lead not found' }), {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      const emailed = await sendReportEmail(fullName, email, lead.audit_report as AuditReport);
      if (emailed) {
        await supabase.from('seo_audit_leads').update({ report_emailed: true }).eq('id', leadId);
      }

      return new Response(JSON.stringify({ success: true, reportEmailed: emailed }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (!websiteUrl) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const normalizedUrl = websiteUrl.startsWith('http') ? websiteUrl : `https://${websiteUrl}`;

    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const { data: cachedLead } = await supabase
      .from('seo_audit_leads')
      .select('id, audit_report')
      .eq('website_url', normalizedUrl)
      .not('audit_report', 'is', null)
      .gte('created_at', oneDayAgo)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (cachedLead?.audit_report) {
      const cachedReport = cachedLead.audit_report as AuditReport;

      const { data: newLead } = await supabase
        .from('seo_audit_leads')
        .insert({
          full_name: fullName,
          email,
          website_url: normalizedUrl,
          audit_report: cachedReport,
          report_emailed: false,
        })
        .select()
        .single();

      EdgeRuntime.waitUntil(sendTeamNotification(fullName, email, normalizedUrl, cachedReport.seoScore));

      let reportEmailed = false;
      if (sendEmail && newLead) {
        reportEmailed = await sendReportEmail(fullName, email, cachedReport);
        if (reportEmailed) {
          await supabase.from('seo_audit_leads').update({ report_emailed: true }).eq('id', newLead.id);
        }
      }

      return new Response(JSON.stringify({ success: true, report: cachedReport, leadId: newLead?.id, reportEmailed }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    let html = '';
    let finalUrl = normalizedUrl;
    try {
      const pageData = await fetchPageData(normalizedUrl);
      html = pageData.html;
      finalUrl = pageData.finalUrl;
    } catch (err) {
      console.warn('Could not fetch page:', err);
    }

    const seoData = html ? extractSEOData(html) : {
      title: '', metaDescription: '', h1Count: 0, hasCanonical: false,
      hasViewport: false, isNoindex: false, hasOgTags: false,
      imgTagsWithoutAlt: 0, totalImgTags: 0, internalLinksWithoutText: 0, hasSchema: false,
    };

    const pageSpeed = await fetchPageSpeed(finalUrl);
    const aiInsights = await generateAIInsights(seoData, pageSpeed, finalUrl, fullName);
    const report = buildReport(seoData, pageSpeed, finalUrl, aiInsights);

    const { data: lead, error: dbError } = await supabase
      .from('seo_audit_leads')
      .insert({
        full_name: fullName,
        email,
        website_url: normalizedUrl,
        audit_report: report,
        report_emailed: false,
      })
      .select()
      .single();

    if (dbError) {
      console.error('DB error:', dbError);
    }

    EdgeRuntime.waitUntil(sendTeamNotification(fullName, email, normalizedUrl, report.seoScore));

    let reportEmailed = false;
    if (sendEmail && lead) {
      reportEmailed = await sendReportEmail(fullName, email, report);
      if (reportEmailed) {
        await supabase.from('seo_audit_leads').update({ report_emailed: true }).eq('id', lead.id);
      }
    }

    return new Response(JSON.stringify({ success: true, report, leadId: lead?.id, reportEmailed }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(JSON.stringify({ error: 'Audit failed. Please try again.', details: String(error) }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
