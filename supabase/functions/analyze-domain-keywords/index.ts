import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface AnalyzeRequest {
  domains: string[];
}

interface KeywordSuggestion {
  keyword: string;
  category: string;
  search_intent: string;
  competition?: string;
}

interface DomainResult {
  domain: string;
  keywords?: KeywordSuggestion[];
  error?: string;
}

async function fetchDomainContent(url: string): Promise<string> {
  const normalizedUrl = url.startsWith("http") ? url : `https://${url}`;

  const res = await fetch(normalizedUrl, {
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; SiteMaxi-Analyzer/1.0; +https://sitemaxi.com)",
      "Accept": "text/html,application/xhtml+xml",
    },
    signal: AbortSignal.timeout(10000),
  });

  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const html = await res.text();
  return extractTextFromHtml(html);
}

function extractTextFromHtml(html: string): string {
  const noScripts = html.replace(/<script[\s\S]*?<\/script>/gi, "");
  const noStyles = noScripts.replace(/<style[\s\S]*?<\/style>/gi, "");

  const title = (noStyles.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || "";
  const metaDesc = (noStyles.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i) || [])[1] || "";
  const metaKw = (noStyles.match(/<meta[^>]*name=["']keywords["'][^>]*content=["']([^"']*)["']/i) || [])[1] || "";

  const headings: string[] = [];
  const hMatches = noStyles.matchAll(/<h[1-4][^>]*>([\s\S]*?)<\/h[1-4]>/gi);
  for (const m of hMatches) {
    const text = m[1].replace(/<[^>]+>/g, "").trim();
    if (text) headings.push(text);
  }

  const navLinks: string[] = [];
  const navMatches = noStyles.matchAll(/<a[^>]*href[^>]*>([\s\S]*?)<\/a>/gi);
  for (const m of navMatches) {
    const text = m[1].replace(/<[^>]+>/g, "").trim();
    if (text && text.length < 60) navLinks.push(text);
  }

  const paragraphs: string[] = [];
  const pMatches = noStyles.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi);
  for (const m of pMatches) {
    const text = m[1].replace(/<[^>]+>/g, "").trim();
    if (text && text.length > 20) paragraphs.push(text);
    if (paragraphs.length >= 10) break;
  }

  const parts = [
    title ? `Title: ${title}` : "",
    metaDesc ? `Meta description: ${metaDesc}` : "",
    metaKw ? `Meta keywords: ${metaKw}` : "",
    headings.length ? `Headings: ${headings.slice(0, 20).join(" | ")}` : "",
    navLinks.length ? `Navigation: ${navLinks.slice(0, 20).join(" | ")}` : "",
    paragraphs.length ? `Content: ${paragraphs.join(" ").slice(0, 1000)}` : "",
  ].filter(Boolean);

  return parts.join("\n");
}

async function analyzeWithAI(domain: string, pageContent: string): Promise<KeywordSuggestion[]> {
  const apiKey = Deno.env.get("OPENAI_API_KEY");
  if (!apiKey) throw new Error("OpenAI API key not configured");

  const prompt = `You are an SEO expert. Analyze the following website content from "${domain}" and extract the keywords this business appears to be targeting in search engines.

Website content:
${pageContent}

Return ONLY a JSON array of keyword objects. Extract 15-30 keywords based on what you see. For each keyword:
- "keyword": the actual search keyword phrase (1-5 words)
- "category": one of: seo, local-seo, web-design, ppc, social-media, content-marketing, analytics, ecommerce, general
- "search_intent": one of: informational, commercial, navigational, transactional
- "competition": estimate: Low, Medium, or High

Focus on keywords that:
1. The business likely wants to rank for
2. Match services/products/locations mentioned
3. Are realistic search queries people would use

Return ONLY valid JSON array, no other text:
[{"keyword": "...", "category": "...", "search_intent": "...", "competition": "..."}]`;

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
      max_tokens: 2000,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`OpenAI error: ${err}`);
  }

  const data = await res.json();
  const raw = data.choices[0].message.content.trim();
  const clean = raw.replace(/```json\n?|\n?```/g, "").trim();
  return JSON.parse(clean);
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { domains }: AnalyzeRequest = await req.json();

    if (!domains || domains.length === 0) {
      return new Response(JSON.stringify({ error: "domains array is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const results: DomainResult[] = await Promise.all(
      domains.map(async (domain): Promise<DomainResult> => {
        try {
          const content = await fetchDomainContent(domain);
          const keywords = await analyzeWithAI(domain, content);
          return { domain, keywords };
        } catch (e: unknown) {
          const message = e instanceof Error ? e.message : "Analysis failed";
          return { domain, error: message, keywords: [] };
        }
      })
    );

    return new Response(JSON.stringify({ results }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
