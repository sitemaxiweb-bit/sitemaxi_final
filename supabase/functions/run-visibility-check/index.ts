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

interface PromptResult {
  prompt: string;
  response: string;
  mentioned: boolean;
  mentionCount: number;
  positionScore: number;
  competitorsFound: string[];
  type: 'discovery' | 'direct';
}

interface PlatformResult {
  platform: 'ChatGPT' | 'Gemini' | 'Claude';
  mentioned: boolean;
  visibilityScore: number;
  responseSnippet: string;
  competitorsMentioned: string[];
  promptsChecked: number;
  mentionRate: number;
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

function buildPromptSet(brandName: string, primaryService: string, city: string, keywords: string[]): Array<{ prompt: string; type: 'discovery' | 'direct' }> {
  return [
    {
      type: 'discovery',
      prompt: `What are the best ${primaryService} companies in ${city}? Please list your top recommendations with brief descriptions.`,
    },
    {
      type: 'discovery',
      prompt: `I'm looking for a ${primaryService} provider in ${city}. Who are the top local options you'd recommend?`,
    },
    {
      type: 'direct',
      prompt: `Do you have any information about a ${primaryService} business called "${brandName}" in ${city}? What do you know about them?`,
    },
    {
      type: 'direct',
      prompt: `Is "${brandName}" a well-known ${primaryService} company in ${city}? Are they reputable?`,
    },
    {
      type: 'direct',
      prompt: `Tell me about ${brandName} — are they a good choice for ${primaryService} in ${city}?`,
    },
  ];
}

function analyzeMentions(response: string, brandName: string): { mentioned: boolean; mentionCount: number; positionScore: number } {
  const lower = response.toLowerCase();
  const brandLower = brandName.toLowerCase();

  const brandWords = brandLower.split(/\s+/).filter(w => w.length > 3);
  let mentionCount = 0;

  if (lower.includes(brandLower)) {
    const regex = new RegExp(brandLower.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    mentionCount = (response.match(regex) || []).length;
  } else if (brandWords.length >= 2) {
    const allPresent = brandWords.every(w => lower.includes(w));
    if (allPresent) mentionCount = 1;
  }

  const mentioned = mentionCount > 0;
  let positionScore = 0;

  if (mentioned) {
    const firstIndex = lower.indexOf(brandLower !== '' ? brandLower : brandWords[0] || '');
    const responseLength = response.length;
    if (firstIndex < responseLength * 0.25) positionScore = 100;
    else if (firstIndex < responseLength * 0.5) positionScore = 70;
    else if (firstIndex < responseLength * 0.75) positionScore = 40;
    else positionScore = 20;
  }

  return { mentioned, mentionCount, positionScore };
}

function extractCompetitors(responses: string[], brandName: string): string[] {
  const competitors = new Set<string>();
  const brandLower = brandName.toLowerCase();

  const patterns = [
    /\b([A-Z][a-zA-Z]+(?:\s+[A-Z][a-zA-Z]+){1,4})\s+(?:is|are|offers?|provides?|specializes?)/g,
    /(?:recommend|suggest|consider|try|check\s+out)\s+([A-Z][a-zA-Z]+(?:\s+[A-Z][a-zA-Z]+){1,3})/g,
    /\d+\.\s+\*?\*?([A-Z][a-zA-Z]+(?:\s+[A-Z][a-zA-Z]+){1,4})\*?\*?/g,
    /[-•]\s+\*?\*?([A-Z][a-zA-Z]+(?:\s+[A-Z][a-zA-Z]+){1,4})\*?\*?/g,
  ];

  const stopWords = new Set(['the', 'and', 'for', 'you', 'your', 'they', 'their', 'this', 'that', 'with',
    'from', 'have', 'will', 'can', 'should', 'when', 'where', 'what', 'how', 'who', 'why',
    'also', 'some', 'many', 'most', 'more', 'here', 'there', 'these', 'those', 'other',
    'both', 'each', 'such', 'been', 'being', 'into', 'through', 'during', 'before', 'after',
    'above', 'below', 'between', 'then', 'once', 'only', 'same', 'than', 'just', 'because',
    'while', 'although', 'however', 'therefore', 'moreover', 'additionally', 'please', 'note',
    'always', 'never', 'often', 'local', 'area', 'city', 'best', 'good', 'great', 'well', 'sure',
    'real', 'true', 'full', 'high', 'wide', 'free', 'open', 'next', 'last', 'long', 'away']);

  for (const response of responses) {
    for (const pattern of patterns) {
      pattern.lastIndex = 0;
      let match;
      while ((match = pattern.exec(response)) !== null) {
        const name = match[1].trim();
        const nameLower = name.toLowerCase();
        const words = nameLower.split(/\s+/);

        if (
          name.length > 3 &&
          name.length < 60 &&
          !nameLower.includes(brandLower) &&
          !brandLower.includes(nameLower) &&
          !stopWords.has(nameLower) &&
          !words.every(w => stopWords.has(w)) &&
          /[a-z]/.test(nameLower) &&
          words.length <= 5
        ) {
          competitors.add(name);
        }
      }
    }
  }

  return Array.from(competitors).slice(0, 8);
}

function calculateVisibilityScore(results: PromptResult[]): number {
  if (results.length === 0) return 10;

  const discoveryResults = results.filter(r => r.type === 'discovery' && r.response.length > 0);
  const directResults = results.filter(r => r.type === 'direct' && r.response.length > 0);

  let score = 0;

  if (discoveryResults.length > 0) {
    const discoveryMentioned = discoveryResults.filter(r => r.mentioned).length;
    const discoveryMentionRate = discoveryMentioned / discoveryResults.length;
    score += discoveryMentionRate * 40;

    const discoveryAvgPos = discoveryResults
      .filter(r => r.mentioned)
      .reduce((s, r) => s + r.positionScore, 0) / Math.max(discoveryMentioned, 1);
    score += (discoveryAvgPos / 100) * 20;
  }

  if (directResults.length > 0) {
    const directMentioned = directResults.filter(r => r.mentioned).length;
    const directMentionRate = directMentioned / directResults.length;
    score += directMentionRate * 30;

    const positiveSignals = directResults.filter(r => {
      const l = r.response.toLowerCase();
      return l.includes('yes') || l.includes('known') || l.includes('reputable') ||
        l.includes('well-regarded') || l.includes('trusted') || l.includes('established') ||
        l.includes('popular') || l.includes('recommend') || l.includes('good choice');
    }).length;
    score += (positiveSignals / directResults.length) * 10;
  }

  return Math.max(5, Math.min(100, Math.round(score)));
}

function buildBestSnippet(results: PromptResult[], brandName: string, primaryService: string, city: string): string {
  const discoveryWithResponse = results.filter(r => r.type === 'discovery' && r.response.length > 50);
  const mentionedResults = results.filter(r => r.mentioned && r.response.length > 0);

  if (mentionedResults.length > 0) {
    const best = mentionedResults.reduce((a, b) => a.positionScore > b.positionScore ? a : b);
    const brandIndex = best.response.toLowerCase().indexOf(brandName.toLowerCase());
    if (brandIndex >= 0) {
      const start = Math.max(0, brandIndex - 60);
      const end = Math.min(best.response.length, brandIndex + 320);
      let snippet = best.response.slice(start, end).trim();
      if (start > 0) snippet = '...' + snippet;
      if (end < best.response.length) snippet = snippet + '...';
      return snippet;
    }
  }

  if (discoveryWithResponse.length > 0) {
    const first = discoveryWithResponse[0];
    const sentences = first.response.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 20);
    const snippet = sentences.slice(0, 3).join(' ').trim();
    return snippet.slice(0, 400) + (snippet.length > 400 ? '...' : '');
  }

  return `When searching for ${primaryService} providers in ${city}, ${brandName} was not found in AI responses. This is an opportunity to build AI visibility.`;
}

async function callGemini(prompt: string): Promise<string> {
  const key = Deno.env.get('GEMINI_API_KEY');
  if (!key) throw new Error('GEMINI_API_KEY not configured');

  const models = ['gemini-2.0-flash', 'gemini-1.5-flash'];

  for (const model of models) {
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            generationConfig: { maxOutputTokens: 600, temperature: 0.7 },
            safetySettings: [
              { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
              { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
              { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
              { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
            ],
          }),
          signal: AbortSignal.timeout(28000),
        }
      );

      const rawText = await res.text();

      if (!res.ok) {
        console.error(`Gemini ${model} HTTP ${res.status}:`, rawText.slice(0, 300));
        continue;
      }

      const data = JSON.parse(rawText);

      const finishReason = data.candidates?.[0]?.finishReason;
      if (finishReason === 'SAFETY' || finishReason === 'RECITATION') {
        console.warn(`Gemini ${model} blocked (${finishReason}), trying next model`);
        continue;
      }

      const text = data.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
      if (text && text.length > 10) {
        console.log(`Gemini ${model} success, length=${text.length}`);
        return text;
      }

      console.warn(`Gemini ${model} empty response, finishReason=${finishReason}`);
    } catch (err) {
      console.error(`Gemini ${model} exception:`, String(err).slice(0, 200));
    }
  }

  throw new Error('All Gemini model attempts failed');
}

async function callClaude(prompt: string): Promise<string> {
  const key = Deno.env.get('ANTHROPIC_API_KEY');
  if (!key) throw new Error('ANTHROPIC_API_KEY not configured');

  const models = ['claude-3-5-haiku-20241022', 'claude-3-haiku-20240307'];

  for (const model of models) {
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': key,
          'anthropic-version': '2023-06-01',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model,
          max_tokens: 600,
          messages: [{ role: 'user', content: prompt }],
        }),
        signal: AbortSignal.timeout(28000),
      });

      const rawText = await res.text();

      if (!res.ok) {
        console.error(`Claude ${model} HTTP ${res.status}:`, rawText.slice(0, 300));
        continue;
      }

      const data = JSON.parse(rawText);
      const text = data.content?.[0]?.text ?? '';
      if (text && text.length > 10) {
        console.log(`Claude ${model} success, length=${text.length}`);
        return text;
      }

      console.warn(`Claude ${model} empty response`);
    } catch (err) {
      console.error(`Claude ${model} exception:`, String(err).slice(0, 200));
    }
  }

  throw new Error('All Claude model attempts failed');
}

async function callOpenAI(prompt: string): Promise<string> {
  const key = Deno.env.get('OPENAI_API_KEY');
  if (!key) throw new Error('OPENAI_API_KEY not configured');

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a knowledgeable assistant that answers questions about local businesses based on your training data. Be honest if you do not have specific information about a business.',
        },
        { role: 'user', content: prompt },
      ],
      max_tokens: 600,
      temperature: 0.7,
    }),
    signal: AbortSignal.timeout(28000),
  });

  const rawText = await res.text();

  if (!res.ok) {
    throw new Error(`OpenAI HTTP ${res.status}: ${rawText.slice(0, 200)}`);
  }

  const data = JSON.parse(rawText);
  const text = data.choices?.[0]?.message?.content ?? '';
  console.log(`OpenAI success, length=${text.length}`);
  return text;
}

async function runPlatformChecks(
  caller: (prompt: string) => Promise<string>,
  platform: string,
  prompts: Array<{ prompt: string; type: 'discovery' | 'direct' }>,
  brandName: string,
): Promise<PromptResult[]> {
  const results: PromptResult[] = [];

  for (let i = 0; i < prompts.length; i++) {
    const { prompt, type } = prompts[i];
    try {
      console.log(`${platform} [${type}] prompt ${i + 1}/${prompts.length}`);
      const response = await caller(prompt);
      const { mentioned, mentionCount, positionScore } = analyzeMentions(response, brandName);
      const competitorsFound = type === 'discovery' ? extractCompetitors([response], brandName) : [];

      results.push({ prompt, response, mentioned, mentionCount, positionScore, competitorsFound, type });
      console.log(`${platform} [${type}] done. mentioned=${mentioned}, len=${response.length}`);
    } catch (err) {
      console.error(`${platform} [${type}] prompt ${i + 1} failed:`, String(err).slice(0, 150));
      results.push({ prompt, response: '', mentioned: false, mentionCount: 0, positionScore: 0, competitorsFound: [], type });
    }

    if (i < prompts.length - 1) {
      await new Promise(r => setTimeout(r, 400));
    }
  }

  return results;
}

async function checkPlatform(
  platform: 'ChatGPT' | 'Gemini' | 'Claude',
  brandName: string,
  primaryService: string,
  city: string,
  targetKeywords: string[],
): Promise<PlatformResult> {
  const prompts = buildPromptSet(brandName, primaryService, city, targetKeywords);

  const callerMap = {
    ChatGPT: callOpenAI,
    Gemini: callGemini,
    Claude: callClaude,
  };

  const fallback: PlatformResult = {
    platform,
    mentioned: false,
    visibilityScore: 15,
    responseSnippet: `${brandName} was not found in AI searches for ${primaryService} providers in ${city}. Building AI visibility is a key growth opportunity.`,
    competitorsMentioned: [],
    promptsChecked: prompts.length,
    mentionRate: 0,
  };

  try {
    const results = await runPlatformChecks(callerMap[platform], platform, prompts, brandName);

    const validResults = results.filter(r => r.response.length > 0);
    if (validResults.length === 0) {
      console.warn(`${platform}: No valid responses received`);
      return fallback;
    }

    const score = calculateVisibilityScore(validResults);
    const mentionedResults = validResults.filter(r => r.mentioned);
    const mentioned = mentionedResults.length > 0;
    const mentionRate = validResults.length > 0 ? mentionedResults.length / validResults.length : 0;

    const discoveryResponses = validResults.filter(r => r.type === 'discovery').map(r => r.response);
    const competitors = extractCompetitors(discoveryResponses, brandName);
    const snippet = buildBestSnippet(validResults, brandName, primaryService, city);

    console.log(`${platform} final: score=${score}, mentioned=${mentioned}, mentionRate=${mentionRate}, validPrompts=${validResults.length}`);

    return {
      platform,
      mentioned,
      visibilityScore: score,
      responseSnippet: snippet,
      competitorsMentioned: competitors,
      promptsChecked: validResults.length,
      mentionRate,
    };
  } catch (err) {
    console.error(`${platform} platform check failed:`, String(err).slice(0, 200));
    return fallback;
  }
}

async function generateInsights(
  brandName: string,
  websiteUrl: string,
  primaryService: string,
  city: string,
  targetKeywords: string[],
  platforms: PlatformResult[],
): Promise<Pick<VisibilityReport, 'brandSummary' | 'strengths' | 'gaps' | 'contentRecommendations' | 'seoSuggestions' | 'visibilityTips'>> {
  const mentionedCount = platforms.filter(p => p.mentioned).length;
  const avgScore = Math.round(platforms.reduce((s, p) => s + p.visibilityScore, 0) / platforms.length);
  const allCompetitors = [...new Set(platforms.flatMap(p => p.competitorsMentioned))].slice(0, 5);

  const platformSummary = platforms.map(p =>
    `${p.platform}: score=${p.visibilityScore}/100, mentioned=${p.mentioned}, mentionRate=${Math.round(p.mentionRate * 100)}%`
  ).join('\n');

  const insightsPrompt = `You are a senior digital marketing consultant specializing in AI search visibility (also called GEO - Generative Engine Optimization).

Analyze this local business's AI visibility data and provide strategic, specific insights:

Business: ${brandName}
Website: ${websiteUrl}
Primary Service: ${primaryService}
City: ${city}
Target Keywords: ${targetKeywords.join(', ') || `${primaryService}, ${city} ${primaryService}`}

AI Platform Results (5 prompts checked per platform — mix of discovery + direct brand queries):
${platformSummary}

Appeared on ${mentionedCount}/3 AI platforms
Average visibility score: ${avgScore}/100
Competitors seen in AI results: ${allCompetitors.join(', ') || 'various local providers'}

Respond with ONLY a valid JSON object, no markdown:
{
  "brandSummary": "2-3 sentences about AI visibility status and what this means for the business",
  "strengths": ["3 specific strengths based on the data"],
  "gaps": ["3 specific gaps to address"],
  "contentRecommendations": ["3 specific content actions for this service/city"],
  "seoSuggestions": ["3 specific SEO/local SEO actions"],
  "visibilityTips": ["3 specific AI/GEO visibility tips"]
}`;

  try {
    const raw = await callOpenAI(insightsPrompt);
    const cleaned = raw.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/i, '');
    const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('No JSON object found');
    const parsed = JSON.parse(jsonMatch[0]) as Record<string, unknown>;

    return {
      brandSummary: String(parsed.brandSummary || ''),
      strengths: Array.isArray(parsed.strengths) ? parsed.strengths.map(String) : [],
      gaps: Array.isArray(parsed.gaps) ? parsed.gaps.map(String) : [],
      contentRecommendations: Array.isArray(parsed.contentRecommendations) ? parsed.contentRecommendations.map(String) : [],
      seoSuggestions: Array.isArray(parsed.seoSuggestions) ? parsed.seoSuggestions.map(String) : [],
      visibilityTips: Array.isArray(parsed.visibilityTips) ? parsed.visibilityTips.map(String) : [],
    };
  } catch (err) {
    console.error('Insights generation failed:', err);
    return buildFallbackInsights(brandName, primaryService, city, mentionedCount, avgScore, allCompetitors);
  }
}

function buildFallbackInsights(
  brandName: string,
  primaryService: string,
  city: string,
  mentionedCount: number,
  avgScore: number,
  allCompetitors: string[],
) {
  return {
    brandSummary: `${brandName} currently achieves an estimated AI visibility score of ${avgScore}/100 and appears on ${mentionedCount} out of 3 major AI platforms for ${primaryService} searches in ${city}. ${mentionedCount === 0 ? 'The brand is not yet being recommended by AI assistants, representing a significant growth opportunity through targeted GEO strategies.' : 'There is clear room to strengthen presence and appear more consistently across all AI platforms.'}`,
    strengths: [
      `Operating in the ${primaryService} market in ${city} — a sector with strong AI search demand`,
      mentionedCount > 0 ? `Already appearing on ${mentionedCount} AI platform${mentionedCount > 1 ? 's' : ''} — a foundation to build from` : 'Early mover advantage: most local competitors haven\'t yet optimized for AI visibility',
      'Proactive approach to AI visibility positions the brand ahead of the competition',
    ],
    gaps: [
      `${brandName} is not consistently appearing in AI recommendations for "${primaryService} in ${city}" queries`,
      allCompetitors.length > 0 ? `Competitors (${allCompetitors.slice(0, 2).join(', ')}) are appearing in AI results ahead of this brand` : 'Other local providers are capturing AI visibility in this market',
      'Insufficient E-E-A-T signals (expertise, experience, authoritativeness, trustworthiness) for AI systems to confidently recommend the brand',
    ],
    contentRecommendations: [
      `Create a detailed FAQ page targeting questions like "best ${primaryService} in ${city}" and "top ${primaryService} near me" — exactly what AI assistants are asked`,
      `Publish local case studies and success stories from ${city} clients to build topical authority in your market`,
      'Add structured data markup (LocalBusiness, Service, FAQ schema) so AI systems can clearly identify and describe your business',
    ],
    seoSuggestions: [
      `Build consistent NAP citations across 50+ local directories targeting the ${city} market`,
      'Optimize and actively manage your Google Business Profile — a primary data source for AI recommendation engines',
      'Earn authoritative backlinks from local news sites, industry associations, and the local chamber of commerce',
    ],
    visibilityTips: [
      'Structure your website content to directly answer questions that people ask AI assistants about your service category',
      'Build credibility signals: author bios, staff credentials, awards, certifications, and verified client reviews',
      `Get your business mentioned in ${city}-area publications and industry roundup articles — these feed AI training data`,
    ],
  };
}

async function buildVisibilityReport(
  brandName: string,
  websiteUrl: string,
  primaryService: string,
  city: string,
  targetKeywords: string[],
): Promise<VisibilityReport> {
  console.log(`Starting visibility check: "${brandName}" | "${primaryService}" | "${city}"`);

  const [chatgptResult, geminiResult, claudeResult] = await Promise.all([
    checkPlatform('ChatGPT', brandName, primaryService, city, targetKeywords),
    checkPlatform('Gemini', brandName, primaryService, city, targetKeywords),
    checkPlatform('Claude', brandName, primaryService, city, targetKeywords),
  ]);

  const platforms = [chatgptResult, geminiResult, claudeResult];
  const overallScore = Math.round(platforms.reduce((s, p) => s + p.visibilityScore, 0) / 3);
  const allCompetitors = [...new Set(platforms.flatMap(p => p.competitorsMentioned))];

  console.log(`Scores — ChatGPT:${chatgptResult.visibilityScore} Gemini:${geminiResult.visibilityScore} Claude:${claudeResult.visibilityScore} Overall:${overallScore}`);

  const insights = await generateInsights(brandName, websiteUrl, primaryService, city, targetKeywords, platforms);

  return {
    overallScore,
    platforms,
    brandSummary: insights.brandSummary,
    competitorMentions: allCompetitors,
    strengths: insights.strengths,
    gaps: insights.gaps,
    contentRecommendations: insights.contentRecommendations,
    seoSuggestions: insights.seoSuggestions,
    visibilityTips: insights.visibilityTips,
    checkedAt: new Date().toISOString(),
    brandName,
    city,
    primaryService,
    websiteUrl,
  };
}

function toBase64Url(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let binary = '';
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function buildMimeMessage(to: string, subject: string, html: string): string {
  const boundary = `boundary_${crypto.randomUUID().replace(/-/g, '')}`;
  const plainText = html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  return [
    `To: ${to}`, `Subject: ${subject}`, 'MIME-Version: 1.0',
    `Content-Type: multipart/alternative; boundary="${boundary}"`, '',
    `--${boundary}`, 'Content-Type: text/plain; charset="UTF-8"', '', plainText, '',
    `--${boundary}`, 'Content-Type: text/html; charset="UTF-8"', '', html, '',
    `--${boundary}--`,
  ].join('\r\n');
}

async function sendGmailEmail(to: string, subject: string, html: string): Promise<boolean> {
  try {
    const picaSecretKey = Deno.env.get('PICA_SECRET_KEY');
    const picaGmailConnectionKey = Deno.env.get('PICA_GMAIL_CONNECTION_KEY');
    if (!picaSecretKey || !picaGmailConnectionKey) {
      console.warn('Gmail env vars not set');
      return false;
    }
    const raw = toBase64Url(buildMimeMessage(to, subject, html));
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
      console.error('Gmail send failed:', response.status, await response.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error('Gmail send error:', err);
    return false;
  }
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
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:20px;background:#f9fafb;font-family:Arial,sans-serif;color:#333;">
  <div style="max-width:620px;margin:0 auto;background:white;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
    <div style="background:#0f172a;padding:36px 32px;text-align:center;">
      <p style="margin:0 0 8px;font-size:13px;text-transform:uppercase;letter-spacing:2px;color:#94a3b8;">SiteMaxi AI Tools</p>
      <h1 style="margin:0;font-size:26px;color:white;font-weight:800;">Your AI Brand Visibility Report</h1>
      <p style="margin:10px 0 0;color:#94a3b8;font-size:15px;">${report.brandName} &mdash; ${report.city}</p>
    </div>
    <div style="background:${scoreColor};padding:36px 32px;text-align:center;color:white;">
      <p style="margin:0 0 6px;font-size:12px;text-transform:uppercase;letter-spacing:2px;opacity:0.85;">Overall AI Visibility Score</p>
      <div style="font-size:80px;font-weight:900;line-height:1;">${report.overallScore}</div>
      <p style="margin:4px 0 0;font-size:22px;opacity:0.85;">/100</p>
      <p style="margin:12px 0 0;font-size:14px;opacity:0.9;">${report.overallScore >= 70 ? 'Strong visibility — keep building momentum' : report.overallScore >= 40 ? 'Moderate visibility — clear room to grow' : 'Low visibility — significant opportunity to improve'}</p>
    </div>
    <div style="padding:32px;">
      <h2 style="font-size:18px;font-weight:700;color:#111;margin:0 0 16px;border-bottom:2px solid #f3f4f6;padding-bottom:10px;">Platform Breakdown</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <thead><tr style="background:#f9fafb;">
          <th style="padding:10px 16px;text-align:left;font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#6b7280;">Platform</th>
          <th style="padding:10px 16px;text-align:left;font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#6b7280;">Status</th>
          <th style="padding:10px 16px;text-align:left;font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#6b7280;">Score</th>
        </tr></thead>
        <tbody>${platformRows}</tbody>
      </table>
      <h2 style="font-size:18px;font-weight:700;color:#111;margin:28px 0 12px;border-bottom:2px solid #f3f4f6;padding-bottom:10px;">Brand Summary</h2>
      <p style="color:#374151;line-height:1.75;font-size:14px;margin:0;">${report.brandSummary}</p>
      <h2 style="font-size:18px;font-weight:700;color:#111;margin:28px 0 12px;border-bottom:2px solid #f3f4f6;padding-bottom:10px;">Key Insights</h2>
      <div>
        <div style="background:#f0fdf4;border-left:4px solid #16a34a;border-radius:8px;padding:14px 16px;margin-bottom:12px;">
          <p style="margin:0 0 8px;font-size:13px;font-weight:700;color:#166534;text-transform:uppercase;letter-spacing:1px;">Strengths</p>
          <ul style="margin:0;padding:0 0 0 18px;color:#374151;font-size:14px;line-height:1.7;">${report.strengths.map(s => `<li>${s}</li>`).join('')}</ul>
        </div>
        <div style="background:#fef2f2;border-left:4px solid #dc2626;border-radius:8px;padding:14px 16px;">
          <p style="margin:0 0 8px;font-size:13px;font-weight:700;color:#991b1b;text-transform:uppercase;letter-spacing:1px;">Gaps to Address</p>
          <ul style="margin:0;padding:0 0 0 18px;color:#374151;font-size:14px;line-height:1.7;">${report.gaps.map(g => `<li>${g}</li>`).join('')}</ul>
        </div>
      </div>
      <h2 style="font-size:18px;font-weight:700;color:#111;margin:28px 0 12px;border-bottom:2px solid #f3f4f6;padding-bottom:10px;">Top Recommendations</h2>
      <table style="width:100%;border-collapse:collapse;">
        ${report.visibilityTips.map((tip, i) => `
        <tr>
          <td style="padding:10px 12px 10px 0;border-bottom:1px solid #f3f4f6;vertical-align:top;width:32px;">
            <span style="display:inline-block;background:#1d4ed8;color:white;width:26px;height:26px;border-radius:50%;font-size:12px;font-weight:700;line-height:26px;text-align:center;">${i + 1}</span>
          </td>
          <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;vertical-align:top;">
            <p style="margin:0;color:#374151;font-size:14px;line-height:1.6;">${tip}</p>
          </td>
        </tr>`).join('')}
      </table>
      <a href="${CALENDAR_URL}" style="display:block;background:#1d4ed8;color:white;text-align:center;padding:18px;border-radius:10px;text-decoration:none;font-weight:700;font-size:16px;margin:28px 0 0;">
        Book a Free Strategy Call to Improve Your Score
      </a>
    </div>
    <div style="background:#f9fafb;padding:20px 32px;text-align:center;border-top:1px solid #f3f4f6;">
      <p style="margin:0;font-size:12px;color:#9ca3af;">Report generated by SiteMaxi AI Brand Visibility Checker</p>
      <p style="margin:4px 0 0;font-size:12px;color:#9ca3af;">Results are estimated insights based on live AI responses, not exact rankings.</p>
      <p style="margin:8px 0 0;font-size:12px;"><a href="https://sitemaxi.com" style="color:#1d4ed8;text-decoration:none;">sitemaxi.com</a></p>
    </div>
  </div>
</body>
</html>`;
}

function buildTeamNotificationEmail(report: VisibilityReport, email: string): string {
  return `<!DOCTYPE html>
<html>
<body style="font-family:Arial,sans-serif;color:#333;background:#f9fafb;padding:20px;">
  <div style="max-width:600px;margin:0 auto;background:white;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">
    <div style="background:#0f172a;color:white;padding:24px 32px;">
      <h1 style="margin:0;font-size:20px;">New AI Visibility Lead</h1>
      <p style="margin:6px 0 0;opacity:0.75;font-size:14px;">Submitted via AI Brand Visibility Checker</p>
    </div>
    <div style="padding:28px 32px;">
      <table style="width:100%;font-size:14px;border-collapse:collapse;">
        <tr><td style="padding:8px 0;color:#6b7280;width:140px;">Brand</td><td style="padding:8px 0;font-weight:700;color:#111;">${report.brandName}</td></tr>
        <tr><td style="padding:8px 0;color:#6b7280;">Website</td><td style="padding:8px 0;"><a href="${report.websiteUrl}" style="color:#2563eb;">${report.websiteUrl}</a></td></tr>
        <tr><td style="padding:8px 0;color:#6b7280;">Email</td><td style="padding:8px 0;">${email}</td></tr>
        <tr><td style="padding:8px 0;color:#6b7280;">Service</td><td style="padding:8px 0;">${report.primaryService}</td></tr>
        <tr><td style="padding:8px 0;color:#6b7280;">City</td><td style="padding:8px 0;">${report.city}</td></tr>
        <tr><td style="padding:8px 0;color:#6b7280;">Score</td><td style="padding:8px 0;font-weight:800;font-size:20px;color:${report.overallScore >= 70 ? '#16a34a' : report.overallScore >= 40 ? '#ca8a04' : '#dc2626'};">${report.overallScore}/100</td></tr>
      </table>
      <a href="https://sitemaxi.com/admin/visibility-leads" style="display:inline-block;margin-top:16px;background:#2563eb;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:700;">View in Admin Panel</a>
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
      .maybeSingle();

    if (dbError) console.error('DB insert error:', dbError);

    EdgeRuntime.waitUntil((async () => {
      try {
        const userHtml = buildReportEmail(email, report);
        const sent = await sendGmailEmail(email, `Your AI Brand Visibility Report - ${report.brandName}`, userHtml);
        if (sent && lead) {
          await supabase.from('ai_visibility_leads').update({ report_emailed: true }).eq('id', lead.id);
        }
        const teamHtml = buildTeamNotificationEmail(report, email);
        await sendGmailEmail('operations@sitemaxi.com', `New Visibility Lead: ${report.brandName} (Score: ${report.overallScore}/100)`, teamHtml);
      } catch (emailErr) {
        console.error('Email send error:', emailErr);
      }
    })());

    return new Response(JSON.stringify({ success: true, report, leadId: lead?.id }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Unexpected error:', String(error));
    return new Response(
      JSON.stringify({ error: 'Visibility check failed. Please try again.', details: String(error) }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
