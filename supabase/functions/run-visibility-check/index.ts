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

interface SourceCitation {
  title: string;
  url: string;
}

interface ParsedPromptResult {
  brandMentioned: boolean;
  brandContext: string;
  competitors: string[];
  summary: string;
  websiteFound: boolean;
  sources: SourceCitation[];
  confidence: 'high' | 'medium' | 'low' | 'unknown';
}

interface RawPromptResult {
  prompt: string;
  promptType: 'discovery' | 'direct_brand';
  rawResponse: string;
  parsed: ParsedPromptResult;
  error?: string;
}

interface PlatformResult {
  platform: 'Gemini' | 'Claude';
  mentioned: boolean;
  visibilityScore: number;
  responseSnippet: string;
  competitorsMentioned: string[];
  promptsChecked: number;
  mentionRate: number;
  websiteFound: boolean;
  sources: SourceCitation[];
  rawResults: RawPromptResult[];
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

function buildPrompts(brandName: string, primaryService: string, city: string, keywords: string[]): Array<{ prompt: string; promptType: 'discovery' | 'direct_brand' }> {
  const kw = keywords.length > 0 ? keywords.slice(0, 2).join(', ') : primaryService;
  return [
    {
      promptType: 'discovery',
      prompt: `What are the top ${primaryService} businesses in ${city}? List the most well-known providers with a brief description of each.`,
    },
    {
      promptType: 'discovery',
      prompt: `Someone in ${city} is looking for a reliable ${primaryService} provider. Which local businesses would you recommend and why?`,
    },
    {
      promptType: 'discovery',
      prompt: `Search for: best ${kw} in ${city}. List the businesses that come up and describe what makes each one notable.`,
    },
    {
      promptType: 'direct_brand',
      prompt: `What do you know about a ${primaryService} business called "${brandName}" based in ${city}? Is it a known, reputable company?`,
    },
    {
      promptType: 'direct_brand',
      prompt: `Is "${brandName}" mentioned or recommended online as a ${primaryService} provider in ${city}? What information can you find about them?`,
    },
  ];
}

function buildStructuredOutputInstruction(brandName: string, websiteUrl: string): string {
  const normalizedUrl = websiteUrl.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '').toLowerCase();
  return `
After answering the question above, you MUST append a JSON block at the very end of your response using this exact format. Do not include any text after the JSON block.

\`\`\`json
{
  "brandMentioned": true or false,
  "brandContext": "one sentence about what was said about ${brandName}, or empty string if not mentioned",
  "competitors": ["list of competitor business names mentioned in your response, not including ${brandName}"],
  "summary": "2-3 sentence summary of what AI search results show for this query",
  "websiteFound": true or false (true only if you cited or linked to ${normalizedUrl} or any page on that domain),
  "confidence": "high if you found specific web sources, medium if based on general knowledge, low if uncertain"
}
\`\`\``;
}

function parseStructuredOutput(raw: string, brandName: string): ParsedPromptResult {
  const defaultResult: ParsedPromptResult = {
    brandMentioned: false,
    brandContext: '',
    competitors: [],
    summary: '',
    websiteFound: false,
    sources: [],
    confidence: 'unknown',
  };

  try {
    const jsonMatch = raw.match(/```(?:json)?\s*([\s\S]*?)```\s*$/);
    if (!jsonMatch) {
      const fallbackMatch = raw.match(/\{[\s\S]*"brandMentioned"[\s\S]*\}/);
      if (!fallbackMatch) return defaultResult;
      const parsed = JSON.parse(fallbackMatch[0]);
      return mergeWithDefaults(parsed, brandName, raw);
    }
    const parsed = JSON.parse(jsonMatch[1].trim());
    return mergeWithDefaults(parsed, brandName, raw);
  } catch {
    const lower = raw.toLowerCase();
    const brandLower = brandName.toLowerCase();
    const mentioned = lower.includes(brandLower);
    return {
      ...defaultResult,
      brandMentioned: mentioned,
      summary: raw.slice(0, 300).trim(),
    };
  }
}

function mergeWithDefaults(parsed: Record<string, unknown>, brandName: string, rawText: string): ParsedPromptResult {
  const brandLower = brandName.toLowerCase();
  const rawLower = rawText.toLowerCase();

  const brandMentioned = typeof parsed.brandMentioned === 'boolean'
    ? parsed.brandMentioned
    : rawLower.includes(brandLower);

  const competitors: string[] = Array.isArray(parsed.competitors)
    ? parsed.competitors.filter((c): c is string => typeof c === 'string' && c.trim().length > 0).slice(0, 6)
    : [];

  return {
    brandMentioned,
    brandContext: typeof parsed.brandContext === 'string' ? parsed.brandContext : '',
    competitors,
    summary: typeof parsed.summary === 'string' ? parsed.summary : rawText.slice(0, 250),
    websiteFound: typeof parsed.websiteFound === 'boolean' ? parsed.websiteFound : false,
    sources: [],
    confidence: (['high', 'medium', 'low', 'unknown'].includes(parsed.confidence as string))
      ? (parsed.confidence as 'high' | 'medium' | 'low' | 'unknown')
      : 'unknown',
  };
}

async function callGeminiWithGrounding(prompt: string, brandName: string, websiteUrl: string): Promise<{ text: string; sources: SourceCitation[] }> {
  const key = Deno.env.get('GEMINI_API_KEY');
  if (!key) throw new Error('GEMINI_API_KEY not set');

  const fullPrompt = prompt + buildStructuredOutputInstruction(brandName, websiteUrl);

  const models = ['gemini-2.0-flash', 'gemini-1.5-flash'];

  for (const model of models) {
    try {
      const body: Record<string, unknown> = {
        contents: [{ role: 'user', parts: [{ text: fullPrompt }] }],
        generationConfig: { maxOutputTokens: 900, temperature: 0.5 },
        tools: [{ googleSearch: {} }],
      };

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
          signal: AbortSignal.timeout(30000),
        }
      );

      const rawText = await res.text();

      if (!res.ok) {
        console.error(`Gemini ${model} HTTP ${res.status}:`, rawText.slice(0, 300));
        continue;
      }

      const data = JSON.parse(rawText);
      const candidate = data.candidates?.[0];

      if (!candidate) {
        console.warn(`Gemini ${model}: no candidate returned`);
        continue;
      }

      const finishReason = candidate.finishReason;
      if (finishReason === 'SAFETY' || finishReason === 'RECITATION') {
        console.warn(`Gemini ${model} blocked: ${finishReason}`);
        continue;
      }

      const text = candidate.content?.parts?.map((p: Record<string, string>) => p.text || '').join('') ?? '';
      if (!text || text.length < 20) {
        console.warn(`Gemini ${model}: empty text, finishReason=${finishReason}`);
        continue;
      }

      const sources: SourceCitation[] = [];
      const groundingMetadata = candidate.groundingMetadata;
      if (groundingMetadata?.groundingChunks) {
        for (const chunk of groundingMetadata.groundingChunks) {
          if (chunk.web?.uri && chunk.web?.title) {
            sources.push({ title: chunk.web.title, url: chunk.web.uri });
          }
        }
      }
      if (groundingMetadata?.searchEntryPoint?.renderedContent) {
        console.log(`Gemini ${model}: grounding search used`);
      }

      console.log(`Gemini ${model} success: len=${text.length}, sources=${sources.length}`);
      return { text, sources };
    } catch (err) {
      console.error(`Gemini ${model} error:`, String(err).slice(0, 200));
    }
  }

  throw new Error('All Gemini attempts failed');
}

async function callClaudeWithWebSearch(prompt: string, brandName: string, websiteUrl: string): Promise<{ text: string; sources: SourceCitation[] }> {
  const key = Deno.env.get('ANTHROPIC_API_KEY');
  if (!key) throw new Error('ANTHROPIC_API_KEY not set');

  const fullPrompt = prompt + buildStructuredOutputInstruction(brandName, websiteUrl);

  const models = ['claude-3-5-haiku-20241022', 'claude-3-haiku-20240307'];

  for (const model of models) {
    try {
      const bodyWithSearch = {
        model,
        max_tokens: 1200,
        tools: [
          {
            type: 'web_search_20250305',
            name: 'web_search',
            max_uses: 3,
          },
        ],
        messages: [{ role: 'user', content: fullPrompt }],
      };

      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': key,
          'anthropic-version': '2023-06-01',
          'anthropic-beta': 'web-search-2025-03-05',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyWithSearch),
        signal: AbortSignal.timeout(35000),
      });

      const rawText = await res.text();

      if (!res.ok) {
        console.error(`Claude ${model} HTTP ${res.status}:`, rawText.slice(0, 300));

        if (res.status === 400 || res.status === 404) {
          console.log(`Claude ${model}: web search not available, trying without tools`);
          const bodyPlain = {
            model,
            max_tokens: 900,
            messages: [{ role: 'user', content: fullPrompt }],
          };
          const res2 = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
              'x-api-key': key,
              'anthropic-version': '2023-06-01',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(bodyPlain),
            signal: AbortSignal.timeout(30000),
          });
          const raw2 = await res2.text();
          if (!res2.ok) {
            console.error(`Claude ${model} plain HTTP ${res2.status}:`, raw2.slice(0, 200));
            continue;
          }
          const data2 = JSON.parse(raw2);
          const text2 = data2.content?.find((b: Record<string, string>) => b.type === 'text')?.text ?? '';
          if (text2.length > 20) {
            console.log(`Claude ${model} plain success: len=${text2.length}`);
            return { text: text2, sources: [] };
          }
        }
        continue;
      }

      const data = JSON.parse(rawText);

      let textOutput = '';
      const sources: SourceCitation[] = [];

      for (const block of (data.content || [])) {
        if (block.type === 'text') {
          textOutput += block.text;
        } else if (block.type === 'tool_result' || block.type === 'web_search_tool_result') {
          if (Array.isArray(block.content)) {
            for (const item of block.content) {
              if (item.type === 'web_search_result' && item.url) {
                sources.push({ title: item.title || item.url, url: item.url });
              }
            }
          }
        }
      }

      if (!textOutput || textOutput.length < 20) {
        console.warn(`Claude ${model}: empty output`);
        continue;
      }

      console.log(`Claude ${model} success: len=${textOutput.length}, sources=${sources.length}`);
      return { text: textOutput, sources };
    } catch (err) {
      console.error(`Claude ${model} error:`, String(err).slice(0, 200));
    }
  }

  throw new Error('All Claude attempts failed');
}

function checkWebsiteInSources(sources: SourceCitation[], websiteUrl: string): boolean {
  if (sources.length === 0) return false;
  const normalizedTarget = websiteUrl.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '').toLowerCase();
  return sources.some(s => {
    const normalizedSource = s.url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '').toLowerCase();
    return normalizedSource.startsWith(normalizedTarget) || normalizedTarget.startsWith(normalizedSource.split('/')[0]);
  });
}

async function runPlatformChecks(
  platform: 'Gemini' | 'Claude',
  caller: (prompt: string, brandName: string, websiteUrl: string) => Promise<{ text: string; sources: SourceCitation[] }>,
  prompts: Array<{ prompt: string; promptType: 'discovery' | 'direct_brand' }>,
  brandName: string,
  websiteUrl: string,
): Promise<RawPromptResult[]> {
  const results: RawPromptResult[] = [];

  for (let i = 0; i < prompts.length; i++) {
    const { prompt, promptType } = prompts[i];
    console.log(`${platform} [${promptType}] prompt ${i + 1}/${prompts.length}`);

    try {
      const { text, sources } = await caller(prompt, brandName, websiteUrl);
      const parsed = parseStructuredOutput(text, brandName);
      parsed.sources = sources;

      if (!parsed.websiteFound && sources.length > 0) {
        parsed.websiteFound = checkWebsiteInSources(sources, websiteUrl);
      }

      results.push({ prompt, promptType, rawResponse: text, parsed });
      console.log(`${platform} [${promptType}] done: brandMentioned=${parsed.brandMentioned}, sources=${sources.length}`);
    } catch (err) {
      console.error(`${platform} prompt ${i + 1} failed:`, String(err).slice(0, 150));
      results.push({
        prompt,
        promptType,
        rawResponse: '',
        parsed: {
          brandMentioned: false,
          brandContext: '',
          competitors: [],
          summary: '',
          websiteFound: false,
          sources: [],
          confidence: 'unknown',
        },
        error: String(err).slice(0, 150),
      });
    }

    if (i < prompts.length - 1) {
      await new Promise(r => setTimeout(r, 600));
    }
  }

  return results;
}

function scorePlatform(results: RawPromptResult[], websiteUrl: string): number {
  const valid = results.filter(r => r.rawResponse.length > 0);
  if (valid.length === 0) return 10;

  const discovery = valid.filter(r => r.promptType === 'discovery');
  const direct = valid.filter(r => r.promptType === 'direct_brand');

  let score = 0;

  if (discovery.length > 0) {
    const discoveryMentions = discovery.filter(r => r.parsed.brandMentioned).length;
    score += (discoveryMentions / discovery.length) * 40;

    const highConf = discovery.filter(r => r.parsed.confidence === 'high').length;
    score += (highConf / discovery.length) * 10;
  }

  if (direct.length > 0) {
    const directMentions = direct.filter(r => r.parsed.brandMentioned).length;
    score += (directMentions / direct.length) * 30;

    const directPositive = direct.filter(r => {
      const ctx = r.parsed.brandContext.toLowerCase();
      return ctx.includes('known') || ctx.includes('reputable') || ctx.includes('established') ||
        ctx.includes('trusted') || ctx.includes('popular') || ctx.includes('well') ||
        ctx.includes('recommend') || ctx.includes('good') || r.parsed.brandMentioned;
    }).length;
    score += (directPositive / direct.length) * 10;
  }

  const anyWebsiteFound = valid.some(r => r.parsed.websiteFound || checkWebsiteInSources(r.parsed.sources, websiteUrl));
  if (anyWebsiteFound) score += 10;

  return Math.max(5, Math.min(100, Math.round(score)));
}

function buildSnippet(results: RawPromptResult[], brandName: string, primaryService: string, city: string): string {
  const withBrand = results.filter(r => r.parsed.brandMentioned && r.parsed.brandContext.length > 0);
  if (withBrand.length > 0) {
    return withBrand[0].parsed.brandContext || withBrand[0].parsed.summary;
  }
  const withSummary = results.filter(r => r.parsed.summary.length > 0);
  if (withSummary.length > 0) {
    return withSummary[0].parsed.summary.slice(0, 400);
  }
  return `${brandName} was not found in AI responses for ${primaryService} searches in ${city}.`;
}

async function checkPlatform(
  platform: 'Gemini' | 'Claude',
  brandName: string,
  websiteUrl: string,
  primaryService: string,
  city: string,
  targetKeywords: string[],
): Promise<PlatformResult> {
  const prompts = buildPrompts(brandName, primaryService, city, targetKeywords);

  const callerMap = {
    Gemini: callGeminiWithGrounding,
    Claude: callClaudeWithWebSearch,
  };

  const fallback: PlatformResult = {
    platform,
    mentioned: false,
    visibilityScore: 10,
    responseSnippet: `${brandName} was not found in ${platform} AI searches for ${primaryService} providers in ${city}.`,
    competitorsMentioned: [],
    promptsChecked: prompts.length,
    mentionRate: 0,
    websiteFound: false,
    sources: [],
    rawResults: [],
  };

  try {
    const rawResults = await runPlatformChecks(platform, callerMap[platform], prompts, brandName, websiteUrl);

    const valid = rawResults.filter(r => r.rawResponse.length > 0);
    if (valid.length === 0) {
      console.warn(`${platform}: no valid responses`);
      return fallback;
    }

    const score = scorePlatform(rawResults, websiteUrl);
    const mentionedResults = valid.filter(r => r.parsed.brandMentioned);
    const mentioned = mentionedResults.length > 0;
    const mentionRate = valid.length > 0 ? mentionedResults.length / valid.length : 0;

    const allCompetitors = [...new Set(valid.flatMap(r => r.parsed.competitors))].slice(0, 8);
    const allSources = [...new Map(valid.flatMap(r => r.parsed.sources).map(s => [s.url, s])).values()].slice(0, 10);
    const websiteFound = valid.some(r => r.parsed.websiteFound || checkWebsiteInSources(r.parsed.sources, websiteUrl));
    const snippet = buildSnippet(valid, brandName, primaryService, city);

    console.log(`${platform} final: score=${score}, mentioned=${mentioned}, mentionRate=${Math.round(mentionRate * 100)}%, websiteFound=${websiteFound}`);

    return {
      platform,
      mentioned,
      visibilityScore: score,
      responseSnippet: snippet,
      competitorsMentioned: allCompetitors,
      promptsChecked: valid.length,
      mentionRate,
      websiteFound,
      sources: allSources,
      rawResults,
    };
  } catch (err) {
    console.error(`${platform} platform check failed:`, String(err));
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
  const websiteFoundCount = platforms.filter(p => p.websiteFound).length;

  const platformSummary = platforms.map(p => {
    const directMentions = p.rawResults.filter(r => r.promptType === 'direct_brand' && r.parsed.brandMentioned).length;
    const discoveryMentions = p.rawResults.filter(r => r.promptType === 'discovery' && r.parsed.brandMentioned).length;
    return `${p.platform}: score=${p.visibilityScore}/100, mentioned=${p.mentioned}, discoveryMentions=${discoveryMentions}/3, directMentions=${directMentions}/2, websiteFound=${p.websiteFound}, sources=${p.sources.length}`;
  }).join('\n');

  const key = Deno.env.get('OPENAI_API_KEY');
  if (!key) return buildFallbackInsights(brandName, primaryService, city, mentionedCount, avgScore, allCompetitors);

  const insightsPrompt = `You are a digital marketing consultant specializing in AI Search Visibility (GEO - Generative Engine Optimization).

Analyze this local business's AI visibility benchmark data and produce specific, actionable insights.

Business: ${brandName}
Website: ${websiteUrl}
Primary Service: ${primaryService}
City: ${city}
Target Keywords: ${targetKeywords.join(', ') || `${primaryService}, ${city} ${primaryService}`}

Results from live AI platform checks (5 prompts per platform: 3 discovery + 2 direct brand queries):
${platformSummary}

Appeared on ${mentionedCount}/2 AI platforms
Average score: ${avgScore}/100
Website found in cited sources on ${websiteFoundCount}/2 platforms
Competitors appearing in AI results: ${allCompetitors.join(', ') || 'various local providers'}

Respond ONLY with a valid JSON object, no markdown wrapping:
{
  "brandSummary": "2-3 sentences describing current AI visibility status and business impact",
  "strengths": ["3 specific strengths based on the actual data"],
  "gaps": ["3 specific gaps to address based on the actual data"],
  "contentRecommendations": ["3 specific content actions tailored to this service and city"],
  "seoSuggestions": ["3 specific local SEO and citation actions"],
  "visibilityTips": ["3 specific GEO/AI visibility tactics for this business type"]
}`;

  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are a GEO (Generative Engine Optimization) expert. Always respond with valid JSON only.' },
          { role: 'user', content: insightsPrompt },
        ],
        max_tokens: 800,
        temperature: 0.6,
        response_format: { type: 'json_object' },
      }),
      signal: AbortSignal.timeout(25000),
    });

    if (!res.ok) throw new Error(`OpenAI ${res.status}`);
    const data = await res.json();
    const parsed = JSON.parse(data.choices[0].message.content) as Record<string, unknown>;

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
    brandSummary: `${brandName} currently scores ${avgScore}/100 for AI visibility across Gemini and Claude for ${primaryService} searches in ${city}. ${mentionedCount === 0 ? 'The brand is not yet appearing in AI-generated recommendations, which represents a significant growth opportunity through targeted GEO strategies.' : `The brand appears on ${mentionedCount} out of 2 AI platforms — there is room to strengthen consistency across all AI search engines.`}`,
    strengths: [
      `Active in the ${primaryService} market in ${city}, a category with growing AI search demand`,
      mentionedCount > 0 ? `Already being recognized on ${mentionedCount} AI platform${mentionedCount > 1 ? 's' : ''} — a foundation to scale from` : `Early-mover opportunity: most local ${primaryService} businesses have not optimized for AI visibility`,
      'Taking a proactive approach to AI brand visibility positions this business ahead of competitors',
    ],
    gaps: [
      `${brandName} is not consistently appearing in AI-generated recommendations for "${primaryService} in ${city}"`,
      allCompetitors.length > 0 ? `Other providers (${allCompetitors.slice(0, 2).join(', ')}) are appearing ahead of ${brandName} in AI results` : `Competing businesses are capturing AI visibility share in the ${city} ${primaryService} market`,
      `The business website may not be cited as a source in AI-grounded search responses, reducing credibility signals`,
    ],
    contentRecommendations: [
      `Create a comprehensive FAQ page answering "best ${primaryService} in ${city}", "top-rated ${primaryService} near me", and similar queries that AI assistants receive`,
      `Publish local case studies and client success stories from ${city} to build topical authority`,
      'Add structured data markup (LocalBusiness, Service, FAQ schema) to help AI systems identify and describe the business accurately',
    ],
    seoSuggestions: [
      `Build consistent NAP (Name, Address, Phone) citations on 50+ local directories with ${city} targeting`,
      'Actively manage and regularly update Google Business Profile — a primary training source for AI recommendation engines',
      'Earn mentions and backlinks from local ${city}-area publications, industry associations, and directories',
    ],
    visibilityTips: [
      'Structure website content to directly answer the types of questions people ask AI assistants about your service category',
      'Build authority signals: publish expert articles, earn press mentions, collect verified reviews on trusted platforms',
      `Get the business included in ${city}-area "best of" roundups, local blog posts, and industry guides that AI models use as training sources`,
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
  console.log(`Starting AI visibility benchmark: "${brandName}" | "${primaryService}" | "${city}"`);

  const [geminiResult, claudeResult] = await Promise.all([
    checkPlatform('Gemini', brandName, websiteUrl, primaryService, city, targetKeywords),
    checkPlatform('Claude', brandName, websiteUrl, primaryService, city, targetKeywords),
  ]);

  const platforms = [geminiResult, claudeResult];
  const overallScore = Math.round(platforms.reduce((s, p) => s + p.visibilityScore, 0) / platforms.length);
  const allCompetitors = [...new Set(platforms.flatMap(p => p.competitorsMentioned))];

  console.log(`Final scores — Gemini:${geminiResult.visibilityScore} Claude:${claudeResult.visibilityScore} Overall:${overallScore}`);

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
    if (!picaSecretKey || !picaGmailConnectionKey) { console.warn('Gmail env vars not set'); return false; }
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
    if (!response.ok) { console.error('Gmail send failed:', response.status); return false; }
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
      <td style="padding:12px 16px;border-bottom:1px solid #f3f4f6;font-weight:600;color:#111;">${p.platform}</td>
      <td style="padding:12px 16px;border-bottom:1px solid #f3f4f6;">
        <span style="display:inline-block;padding:3px 10px;border-radius:20px;font-size:12px;font-weight:700;background:${p.mentioned ? '#d1fae5' : '#fee2e2'};color:${p.mentioned ? '#065f46' : '#991b1b'};">
          ${p.mentioned ? 'Mentioned' : 'Not Mentioned'}
        </span>
      </td>
      <td style="padding:12px 16px;border-bottom:1px solid #f3f4f6;font-weight:700;color:${p.visibilityScore >= 60 ? '#16a34a' : p.visibilityScore >= 35 ? '#ca8a04' : '#dc2626'};">${p.visibilityScore}/100</td>
      <td style="padding:12px 16px;border-bottom:1px solid #f3f4f6;font-size:12px;color:${p.websiteFound ? '#16a34a' : '#9ca3af'};">${p.websiteFound ? 'Website cited' : 'Website not cited'}</td>
    </tr>`).join('');

  return `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:20px;background:#f9fafb;font-family:Arial,sans-serif;color:#333;">
  <div style="max-width:620px;margin:0 auto;background:white;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
    <div style="background:#0f172a;padding:36px 32px;text-align:center;">
      <p style="margin:0 0 8px;font-size:13px;text-transform:uppercase;letter-spacing:2px;color:#94a3b8;">SiteMaxi AI Visibility Benchmark</p>
      <h1 style="margin:0;font-size:26px;color:white;font-weight:800;">Your AI Brand Visibility Report</h1>
      <p style="margin:10px 0 0;color:#94a3b8;font-size:15px;">${report.brandName} &mdash; ${report.city}</p>
    </div>
    <div style="background:${scoreColor};padding:36px 32px;text-align:center;color:white;">
      <p style="margin:0 0 6px;font-size:12px;text-transform:uppercase;letter-spacing:2px;opacity:0.85;">Overall AI Visibility Score</p>
      <div style="font-size:80px;font-weight:900;line-height:1;">${report.overallScore}</div>
      <p style="margin:4px 0 0;font-size:22px;opacity:0.85;">/100</p>
      <p style="margin:12px 0 0;font-size:14px;opacity:0.9;">${report.overallScore >= 70 ? 'Strong visibility' : report.overallScore >= 40 ? 'Moderate visibility' : 'Low visibility — major growth opportunity'}</p>
    </div>
    <div style="padding:32px;">
      <p style="font-size:12px;color:#9ca3af;border:1px solid #f3f4f6;border-radius:8px;padding:10px 14px;margin:0 0 24px;">
        This benchmark checks your brand across Gemini and Claude using grounded/web-search enabled queries — 5 prompts per platform (3 discovery + 2 direct). Results reflect what AI assistants say today, not guaranteed universal rankings.
      </p>
      <h2 style="font-size:18px;font-weight:700;color:#111;margin:0 0 16px;border-bottom:2px solid #f3f4f6;padding-bottom:10px;">Platform Breakdown</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <thead><tr style="background:#f9fafb;">
          <th style="padding:10px 16px;text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#6b7280;">Platform</th>
          <th style="padding:10px 16px;text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#6b7280;">Mentioned</th>
          <th style="padding:10px 16px;text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#6b7280;">Score</th>
          <th style="padding:10px 16px;text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#6b7280;">Website</th>
        </tr></thead>
        <tbody>${platformRows}</tbody>
      </table>
      <h2 style="font-size:18px;font-weight:700;color:#111;margin:28px 0 12px;border-bottom:2px solid #f3f4f6;padding-bottom:10px;">Summary</h2>
      <p style="color:#374151;line-height:1.75;font-size:14px;margin:0;">${report.brandSummary}</p>
      <h2 style="font-size:18px;font-weight:700;color:#111;margin:28px 0 12px;border-bottom:2px solid #f3f4f6;padding-bottom:10px;">Key Insights</h2>
      <div style="background:#f0fdf4;border-left:4px solid #16a34a;border-radius:8px;padding:14px 16px;margin-bottom:12px;">
        <p style="margin:0 0 8px;font-size:12px;font-weight:700;color:#166534;text-transform:uppercase;letter-spacing:1px;">Strengths</p>
        <ul style="margin:0;padding:0 0 0 18px;color:#374151;font-size:14px;line-height:1.7;">${report.strengths.map(s => `<li>${s}</li>`).join('')}</ul>
      </div>
      <div style="background:#fef2f2;border-left:4px solid #dc2626;border-radius:8px;padding:14px 16px;">
        <p style="margin:0 0 8px;font-size:12px;font-weight:700;color:#991b1b;text-transform:uppercase;letter-spacing:1px;">Gaps to Address</p>
        <ul style="margin:0;padding:0 0 0 18px;color:#374151;font-size:14px;line-height:1.7;">${report.gaps.map(g => `<li>${g}</li>`).join('')}</ul>
      </div>
      <a href="${CALENDAR_URL}" style="display:block;background:#1d4ed8;color:white;text-align:center;padding:18px;border-radius:10px;text-decoration:none;font-weight:700;font-size:16px;margin:28px 0 0;">
        Book a Free Strategy Call to Improve Your Score
      </a>
    </div>
    <div style="background:#f9fafb;padding:20px 32px;text-align:center;border-top:1px solid #f3f4f6;">
      <p style="margin:0;font-size:12px;color:#9ca3af;">SiteMaxi AI Brand Visibility Benchmark &mdash; <a href="https://sitemaxi.com" style="color:#1d4ed8;">sitemaxi.com</a></p>
    </div>
  </div>
</body></html>`;
}

function buildTeamNotificationEmail(report: VisibilityReport, email: string): string {
  return `<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;color:#333;background:#f9fafb;padding:20px;">
  <div style="max-width:600px;margin:0 auto;background:white;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">
    <div style="background:#0f172a;color:white;padding:24px 32px;">
      <h1 style="margin:0;font-size:20px;">New AI Visibility Lead</h1>
    </div>
    <div style="padding:28px 32px;">
      <table style="width:100%;font-size:14px;border-collapse:collapse;">
        <tr><td style="padding:8px 0;color:#6b7280;width:140px;">Brand</td><td style="padding:8px 0;font-weight:700;">${report.brandName}</td></tr>
        <tr><td style="padding:8px 0;color:#6b7280;">Website</td><td style="padding:8px 0;"><a href="${report.websiteUrl}" style="color:#2563eb;">${report.websiteUrl}</a></td></tr>
        <tr><td style="padding:8px 0;color:#6b7280;">Email</td><td style="padding:8px 0;">${email}</td></tr>
        <tr><td style="padding:8px 0;color:#6b7280;">Service</td><td style="padding:8px 0;">${report.primaryService}</td></tr>
        <tr><td style="padding:8px 0;color:#6b7280;">City</td><td style="padding:8px 0;">${report.city}</td></tr>
        <tr><td style="padding:8px 0;color:#6b7280;">Score</td><td style="padding:8px 0;font-weight:800;font-size:20px;color:${report.overallScore >= 70 ? '#16a34a' : report.overallScore >= 40 ? '#ca8a04' : '#dc2626'};">${report.overallScore}/100</td></tr>
      </table>
      <a href="https://sitemaxi.com/admin/visibility-leads" style="display:inline-block;margin-top:16px;background:#2563eb;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:700;">View in Admin</a>
    </div>
  </div>
</body></html>`;
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response(null, { status: 200, headers: corsHeaders });
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
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
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
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
        const sent = await sendGmailEmail(email, `Your AI Brand Visibility Report — ${report.brandName}`, userHtml);
        if (sent && lead) {
          await supabase.from('ai_visibility_leads').update({ report_emailed: true }).eq('id', lead.id);
        }
        const teamHtml = buildTeamNotificationEmail(report, email);
        await sendGmailEmail('operations@sitemaxi.com', `New Visibility Lead: ${report.brandName} (${report.overallScore}/100)`, teamHtml);
      } catch (emailErr) {
        console.error('Email send error:', emailErr);
      }
    })());

    return new Response(JSON.stringify({ success: true, report, leadId: lead?.id }), {
      status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Unexpected error:', String(error));
    return new Response(
      JSON.stringify({ error: 'Visibility check failed. Please try again.' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
