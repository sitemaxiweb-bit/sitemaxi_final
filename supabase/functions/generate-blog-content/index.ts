import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface GenerateRequest {
  mode: "outline" | "draft" | "full_package" | "image_prompts" | "metadata" | "titles" | "generate_image" | "enhance_prompt";
  keyword: string;
  keywords?: string[];
  articleTitle?: string;
  existingOutline?: string;
  existingContent?: string;
  category?: string;
  businessType?: "local" | "ecommerce" | "both";
  targetAudience?: string;
  searchIntent?: string;
  services?: string[];
  industries?: string[];
  locations?: string[];
  ctaType?: string;
  contentType?: string;
  generateImage?: boolean;
  imagePrompt?: string;
  imageType?: "featured" | "content";
}

const SITEMAXI_CONTEXT = `
SiteMaxi is a Canadian digital marketing agency based in the Greater Vancouver area.
They serve two main client types:
1. Local businesses (dentists, lawyers, HVAC, plumbers, roofers, restaurants, med spas, clinics, contractors, etc.)
2. E-commerce brands

Their core services are:
- SiteMaxi: Professional website design and development
- RankMaxi: SEO and local SEO
- AdMaxi: Google Ads management
- ClickMaxi: Conversion rate optimization
- SocialMaxi: Social media marketing
- SearchMaxi: Comprehensive search marketing

Their key CTAs are:
- Free AI Marketing Audit at sitemaxi.com/free-seo-audit
- Book a Strategy Call at their calendar link

Tone: Professional but approachable. Direct. Data-backed. Helpful to business owners who are not marketing experts.
Writing style: Clear, scannable, practical. No fluff. Real value.
`;

function buildSystemPrompt(): string {
  return `You are an expert SEO content strategist and writer for ${SITEMAXI_CONTEXT}

Rules:
- Write for Canadian small business owners and e-commerce brands
- Be practical, clear, and specific — no generic filler
- Always write with search intent in mind
- Use proper heading hierarchy (H2, H3)
- Include real-world examples where relevant
- Never use phrases like "In today's digital landscape" or "In conclusion"
- Do not mention competitors by name
- CTAs should feel natural, not pushy
- Output valid JSON only when asked for structured data
`;
}

function buildKeywordContext(req: GenerateRequest): string {
  if (req.keywords && req.keywords.length > 1) {
    return `Primary keyword: "${req.keyword}"\nAll target keywords: ${req.keywords.map(k => `"${k}"`).join(", ")}`;
  }
  return `Keyword: "${req.keyword}"`;
}

async function callOpenAI(prompt: string, systemPrompt: string, maxTokens = 4000): Promise<string> {
  const apiKey = Deno.env.get("OPENAI_API_KEY");
  if (!apiKey) throw new Error("OpenAI API key not configured");

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      max_tokens: maxTokens,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`OpenAI error: ${err}`);
  }

  const data = await res.json();
  return data.choices[0].message.content;
}

async function generateDALLEImage(prompt: string): Promise<string | null> {
  const apiKey = Deno.env.get("OPENAI_API_KEY");
  if (!apiKey) return null;

  try {
    const res = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "dall-e-3",
        prompt: prompt.slice(0, 1000),
        n: 1,
        size: "1792x1024",
        quality: "standard",
        response_format: "b64_json",
      }),
    });

    if (!res.ok) {
      console.error("DALL-E error:", await res.text());
      return null;
    }

    const data = await res.json();
    return data.data[0]?.b64_json || null;
  } catch (e) {
    console.error("DALL-E generation failed:", e);
    return null;
  }
}

async function uploadImageToStorage(b64Image: string, keyword: string): Promise<string | null> {
  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!supabaseUrl || !serviceKey) return null;

    const supabase = createClient(supabaseUrl, serviceKey);

    const bytes = Uint8Array.from(atob(b64Image), c => c.charCodeAt(0));
    const slug = keyword.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 40);
    const filename = `ai-generated/${slug}-${Date.now()}.png`;

    const { error } = await supabase.storage
      .from("blog-images")
      .upload(filename, bytes, {
        contentType: "image/png",
        upsert: false,
      });

    if (error) {
      console.error("Storage upload error:", error);
      return null;
    }

    const { data: urlData } = supabase.storage
      .from("blog-images")
      .getPublicUrl(filename);

    return urlData.publicUrl;
  } catch (e) {
    console.error("Upload failed:", e);
    return null;
  }
}

async function generateTitles(req: GenerateRequest): Promise<object> {
  const prompt = `Generate 5 compelling blog post title options for:
${buildKeywordContext(req)}

Context:
- Business type: ${req.businessType || "both"}
- Target audience: ${req.targetAudience || "business owners"}
- Search intent: ${req.searchIntent || "informational"}
- Related services: ${(req.services || []).join(", ") || "digital marketing"}
- Location context: ${(req.locations || []).join(", ") || "Canada"}

Requirements:
- Titles should be 50-65 characters
- Mix formats: how-to, list, question, benefit-led
- Make them click-worthy but not clickbait
- Include the primary keyword naturally
${req.keywords && req.keywords.length > 1 ? `- Naturally weave in secondary keywords where relevant` : ""}

Return JSON with this exact structure:
{
  "titles": [
    { "title": "...", "format": "how-to|list|question|benefit", "angle": "brief description of content angle" }
  ]
}`;

  const raw = await callOpenAI(prompt, buildSystemPrompt());
  const clean = raw.replace(/```json\n?|\n?```/g, "").trim();
  return JSON.parse(clean);
}

async function generateOutline(req: GenerateRequest): Promise<object> {
  const prompt = `Create a detailed SEO blog post outline for:

${buildKeywordContext(req)}
${req.articleTitle ? `Title: "${req.articleTitle}"` : ""}
Business type: ${req.businessType || "both"}
Search intent: ${req.searchIntent || "informational"}
Content type: ${req.contentType || "supporting"}
Services: ${(req.services || []).join(", ") || "SEO, web design, digital marketing"}
Industries: ${(req.industries || []).join(", ") || "local business"}
Locations: ${(req.locations || []).join(", ") || "Canada"}

Return JSON with this exact structure:
{
  "recommendedTitle": "...",
  "metaDescription": "...",
  "estimatedWordCount": 1200,
  "sections": [
    {
      "heading": "...",
      "level": 2,
      "keyPoints": ["...", "..."],
      "wordCountTarget": 200
    }
  ],
  "internalLinks": [
    { "anchorText": "...", "targetPage": "...", "url": "..." }
  ],
  "faqQuestions": ["...", "...", "..."]
}

Internal link targets to suggest from:
- /services (Our Services)
- /rankmaxi (RankMaxi - SEO)
- /admaxi (AdMaxi - Google Ads)
- /sitemaxi (SiteMaxi - Web Design)
- /clickmaxi (ClickMaxi - CRO)
- /socialmaxi (SocialMaxi - Social Media)
- /searchmaxi (SearchMaxi - Search Marketing)
- /industries (Industries we serve)
- /free-seo-audit (Free AI Marketing Audit)
- /contact (Contact)
- /locations (Locations)
- /resources-hub (Resources Hub)`;

  const raw = await callOpenAI(prompt, buildSystemPrompt());
  const clean = raw.replace(/```json\n?|\n?```/g, "").trim();
  return JSON.parse(clean);
}

async function generateDraft(req: GenerateRequest): Promise<object> {
  const keywordsInstruction = req.keywords && req.keywords.length > 1
    ? `\nNaturally incorporate ALL of these keywords throughout the article: ${req.keywords.map(k => `"${k}"`).join(", ")}`
    : "";

  const prompt = `Write a complete, high-quality SEO blog post.

${buildKeywordContext(req)}
${req.articleTitle ? `Title: "${req.articleTitle}"` : ""}
${req.existingOutline ? `Follow this outline:\n${req.existingOutline}` : ""}
Business type: ${req.businessType || "both"}
Target audience: ${req.targetAudience || "business owners"}
Services to reference: ${(req.services || []).join(", ") || "digital marketing services"}
Industries: ${(req.industries || []).join(", ") || "local business"}
Location context: ${(req.locations || []).join(", ") || "Canada"}
CTA type: ${req.ctaType || "audit"}
${keywordsInstruction}

Writing requirements:
- 1200-1800 words for comprehensive coverage
- H2 and H3 headings
- Short paragraphs (2-4 sentences max)
- Bullet points for lists
- Include real actionable advice
- End with a CTA paragraph relevant to SiteMaxi services
- Include at least one practical example or case study reference

${req.ctaType === "audit" ? 'CTA: Encourage readers to get their free AI Marketing Audit at sitemaxi.com' : ''}
${req.ctaType === "strategy_call" ? 'CTA: Encourage readers to book a free strategy call with SiteMaxi' : ''}
${req.ctaType === "contact" ? 'CTA: Encourage readers to reach out via the contact page' : ''}

Return JSON with this exact structure:
{
  "title": "...",
  "content": "HTML content here with proper h2, h3, p, ul, li, strong tags",
  "excerpt": "150-160 character excerpt",
  "readTimeMinutes": 6
}`;

  const raw = await callOpenAI(prompt, buildSystemPrompt(), 6000);
  const clean = raw.replace(/```json\n?|\n?```/g, "").trim();
  return JSON.parse(clean);
}

async function generateMetadata(req: GenerateRequest): Promise<object> {
  const prompt = `Generate complete SEO metadata for a blog post.

${buildKeywordContext(req)}
${req.articleTitle ? `Title: "${req.articleTitle}"` : ""}
${req.existingContent ? `Content summary: ${req.existingContent.slice(0, 500)}` : ""}

Return JSON with this exact structure:
{
  "metaTitle": "...",
  "metaDescription": "...",
  "ogTitle": "...",
  "ogDescription": "...",
  "slug": "url-friendly-slug",
  "tags": ["tag1", "tag2", "tag3"],
  "category": "seo|web-design|ppc|social-media|content-marketing|analytics|general"
}

Rules:
- metaTitle: 50-60 characters, includes primary keyword
- metaDescription: 150-160 characters, compelling, includes primary keyword
- ogTitle: can be slightly longer and more engaging
- ogDescription: 1-2 sentence social share description
- slug: lowercase, hyphens only, 3-6 words
- tags: 4-6 relevant tags`;

  const raw = await callOpenAI(prompt, buildSystemPrompt());
  const clean = raw.replace(/```json\n?|\n?```/g, "").trim();
  return JSON.parse(clean);
}

async function generateFAQ(req: GenerateRequest): Promise<object> {
  const prompt = `Generate a comprehensive FAQ section for a blog post.

${buildKeywordContext(req)}
${req.articleTitle ? `Article title: "${req.articleTitle}"` : ""}
Business type: ${req.businessType || "both"}
Target audience: ${req.targetAudience || "business owners"}

Return JSON with this exact structure:
{
  "faqs": [
    { "question": "...", "answer": "2-4 sentence answer that is helpful and specific" }
  ]
}

Generate 5-7 FAQs. Focus on real questions business owners ask. Include questions about cost, time, results, and how-to.`;

  const raw = await callOpenAI(prompt, buildSystemPrompt());
  const clean = raw.replace(/```json\n?|\n?```/g, "").trim();
  return JSON.parse(clean);
}

async function generateImagePrompts(req: GenerateRequest): Promise<object> {
  const prompt = `Generate professional image prompts for a blog post.

${buildKeywordContext(req)}
${req.articleTitle ? `Title: "${req.articleTitle}"` : ""}
Business type: ${req.businessType || "both"}
Industries: ${(req.industries || []).join(", ") || "local business"}

Return JSON with this exact structure:
{
  "featuredImagePrompt": "Detailed prompt for hero/featured image (photorealistic, professional)",
  "featuredImageAlt": "Alt text for the featured image, includes keyword naturally",
  "socialImagePrompt": "Prompt for social media share image (1200x630, with text overlay space)",
  "inlineImagePrompts": [
    { "placement": "after intro", "prompt": "...", "altText": "..." },
    { "placement": "mid article", "prompt": "...", "altText": "..." }
  ]
}

Style guidelines:
- Canadian business context
- Professional, modern, clean aesthetics
- No generic stock photo clichés
- Include specific details (lighting, setting, mood)
- Featured image should work as blog hero (16:9 ratio)
- Make prompts DALL-E 3 compatible: detailed, specific, photorealistic`;

  const raw = await callOpenAI(prompt, buildSystemPrompt());
  const clean = raw.replace(/```json\n?|\n?```/g, "").trim();
  return JSON.parse(clean);
}

async function enhancePrompt(req: GenerateRequest): Promise<object> {
  if (!req.imagePrompt) throw new Error("imagePrompt is required for enhance_prompt mode");

  const typeContext = req.imageType === "featured"
    ? "16:9 landscape hero/featured blog image (1792x1024)"
    : "16:9 landscape inline content image (1200x800)";

  const prompt = `You are a professional AI image prompt engineer specializing in DALL-E 3.

Enhance the following rough image idea into a highly detailed, photorealistic DALL-E 3 prompt for a ${typeContext}.

Rough idea: "${req.imagePrompt}"

Rules:
- Keep it under 900 characters
- Be very specific about: lighting, composition, mood, setting, style
- Use photorealistic language: "professional photography", "natural lighting", "sharp focus", etc.
- Canadian business context where relevant
- No text overlays or words in the image
- No people with identifiable faces unless essential
- Output ONLY the enhanced prompt text, nothing else, no quotes, no explanation`;

  const enhanced = await callOpenAI(prompt, "You are a professional DALL-E 3 prompt engineer. Output only the enhanced prompt text.", 400);
  return { enhancedPrompt: enhanced.trim() };
}

async function generateFullPackage(req: GenerateRequest): Promise<object> {
  const [titles, outline, metadata, faq, imagePrompts] = await Promise.all([
    generateTitles(req),
    generateOutline(req),
    generateMetadata(req),
    generateFAQ(req),
    generateImagePrompts(req),
  ]);

  const draftReq = {
    ...req,
    articleTitle: req.articleTitle || (titles as { titles: Array<{ title: string }> }).titles[0]?.title,
    existingOutline: JSON.stringify(outline),
  };
  const draft = await generateDraft(draftReq);

  let generatedImageUrl: string | null = null;
  if (req.generateImage) {
    const imgPromptsData = imagePrompts as { featuredImagePrompt?: string };
    if (imgPromptsData.featuredImagePrompt) {
      const b64 = await generateDALLEImage(imgPromptsData.featuredImagePrompt);
      if (b64) {
        generatedImageUrl = await uploadImageToStorage(b64, req.keyword);
      }
    }
  }

  return { titles, outline, metadata, faq, imagePrompts, draft, generatedImageUrl };
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const body: GenerateRequest = await req.json();

    if (body.mode === "enhance_prompt") {
      if (!body.imagePrompt) {
        return new Response(JSON.stringify({ error: "imagePrompt is required for enhance_prompt mode" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const result = await enhancePrompt(body);
      return new Response(JSON.stringify(result), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (body.mode === "generate_image") {
      if (!body.imagePrompt) {
        return new Response(JSON.stringify({ error: "imagePrompt is required for generate_image mode" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const b64 = await generateDALLEImage(body.imagePrompt);
      if (!b64) {
        return new Response(JSON.stringify({ error: "Image generation failed" }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const imageUrl = await uploadImageToStorage(b64, body.keyword || "blog-image");
      return new Response(JSON.stringify({ imageUrl }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!body.keyword) {
      return new Response(JSON.stringify({ error: "keyword is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let result: object;

    switch (body.mode) {
      case "titles":
        result = await generateTitles(body);
        break;
      case "outline":
        result = await generateOutline(body);
        break;
      case "draft":
        result = await generateDraft(body);
        break;
      case "metadata":
        result = await generateMetadata(body);
        break;
      case "image_prompts":
        result = await generateImagePrompts(body);
        break;
      case "full_package":
        result = await generateFullPackage(body);
        break;
      default:
        return new Response(JSON.stringify({ error: "Invalid mode" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    }

    return new Response(JSON.stringify(result), {
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
