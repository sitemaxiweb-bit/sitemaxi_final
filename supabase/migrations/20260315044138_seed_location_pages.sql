/*
  # Seed Location Pages

  Inserts SEO landing pages for all seeded locations across 5 service types:
  - local-seo
  - seo
  - google-ads
  - web-design
  - digital-marketing

  Each page is generated with city-specific copy using PL/pgSQL string interpolation.
  FAQs are inserted as static JSON arrays (no city interpolation to avoid JSON issues).
*/

DO $$
DECLARE
  loc RECORD;
  service_slug text;
  service_label_val text;
  page_slug text;
  faq_json jsonb;
BEGIN
  FOR loc IN SELECT * FROM locations LOOP

    -- local-seo
    service_slug := 'local-seo';
    service_label_val := 'Local SEO';
    page_slug := loc.slug || '/' || service_slug;
    faq_json := '[
      {"question": "How long does local SEO take to show results?", "answer": "Most businesses begin seeing meaningful ranking improvements within 60-90 days. Google Maps rankings can move faster with proper profile optimization. Long-term, consistent SEO compounds and delivers your highest-value leads month after month."},
      {"question": "What does your local SEO service include?", "answer": "Our service includes Google Business Profile optimization, citation building across Canadian directories, on-page SEO, review strategy, local link building, and monthly reporting on your rankings, traffic, and leads."},
      {"question": "Can you help me rank on Google Maps?", "answer": "Google Maps ranking is one of our specialties. We optimize every local signal — your profile completeness, review velocity, citation consistency, and proximity signals — to improve your local pack visibility."},
      {"question": "Do you work with different types of businesses?", "answer": "Yes. We serve contractors, dentists, lawyers, clinics, restaurants, auto repair shops, real estate agents, HVAC companies, and many other service-based businesses across Canada."},
      {"question": "How is local SEO different from regular SEO?", "answer": "Local SEO focuses on ranking in your city and surrounding service area — specifically in the Google Maps local pack and geo-targeted results. It uses location-specific signals like your Google Business Profile, citations, and proximity to searchers."}
    ]'::jsonb;
    INSERT INTO location_pages (location_id, service_type, service_label, slug, page_title, meta_title, meta_description, hero_headline, hero_subheadline, intro_copy, why_us_copy, service_copy, faqs)
    VALUES (
      loc.id, service_slug, service_label_val, page_slug,
      'Local SEO ' || loc.city || ' | SiteMaxi',
      'Local SEO Services in ' || loc.city || ', ' || loc.province || ' | SiteMaxi',
      'Rank higher on Google Maps and local search in ' || loc.city || '. SiteMaxi delivers proven local SEO strategies for ' || loc.city || ' businesses ready to grow.',
      'Local SEO that gets your ' || loc.city || ' business found first',
      'We help ' || loc.city || ' businesses dominate Google Maps and local search results — bringing in more calls, more foot traffic, and more customers every month.',
      'If your business is in ' || loc.city || ' and you''re not showing up on the first page of Google, you''re losing customers to competitors every single day. Our local SEO service puts your business in front of the right people at exactly the right moment — when they''re actively searching for what you offer.',
      loc.city || ' businesses choose SiteMaxi because we understand local markets across ' || loc.province_full || '. We''ve helped businesses climb to the top of Google Maps and stay there — not with shortcuts, but with proven strategies built on real local signals. Our team combines technical SEO expertise with deep knowledge of how Canadian consumers search and buy.',
      'Local SEO for ' || loc.city || ' businesses is about more than keywords. We optimize your Google Business Profile, build authoritative local citations across Canadian directories, manage review generation, create location-specific landing pages, and earn quality backlinks that build your domain authority.',
      faq_json
    )
    ON CONFLICT (slug) DO NOTHING;

    -- seo
    service_slug := 'seo';
    service_label_val := 'SEO';
    page_slug := loc.slug || '/' || service_slug;
    faq_json := '[
      {"question": "How long does SEO take to work?", "answer": "SEO is a medium to long-term investment. Most clients begin seeing meaningful organic traffic increases within 3-6 months. Highly competitive terms take longer, but the results compound and continue delivering value for years — unlike paid ads that stop the moment you pause spend."},
      {"question": "What makes your SEO approach different?", "answer": "We do not use template strategies. Every SEO plan is custom-built around your business, your competition, and your target customers. We focus on revenue-driving keywords — not just traffic volume — and we are transparent about timelines and results."},
      {"question": "Do you provide monthly SEO reports?", "answer": "Yes. Every client receives detailed monthly reports covering keyword rankings, organic traffic trends, conversions, and progress toward your goals. You will always know exactly what is happening and why."},
      {"question": "Can you do SEO for a business that also sells nationally?", "answer": "Absolutely. We build strategies that capture both your local customers and national or e-commerce organic traffic — giving you the best of both worlds with a single integrated SEO strategy."},
      {"question": "What is included in a technical SEO audit?", "answer": "Our technical audit covers site speed, crawlability, indexation, mobile-friendliness, URL structure, schema markup, internal linking, duplicate content, and more. We provide a prioritized action plan based on what will move the needle fastest."}
    ]'::jsonb;
    INSERT INTO location_pages (location_id, service_type, service_label, slug, page_title, meta_title, meta_description, hero_headline, hero_subheadline, intro_copy, why_us_copy, service_copy, faqs)
    VALUES (
      loc.id, service_slug, service_label_val, page_slug,
      'SEO Services ' || loc.city || ' | SiteMaxi',
      'SEO Services in ' || loc.city || ', ' || loc.province || ' | SiteMaxi',
      'Grow organic traffic and leads with expert SEO services in ' || loc.city || '. SiteMaxi delivers long-term SEO strategies that compound and scale.',
      'SEO services built to grow your ' || loc.city || ' business',
      'We help ' || loc.city || ' businesses earn more organic traffic, better rankings, and consistent leads through strategic SEO that compounds over time.',
      'Organic search is one of the most valuable long-term investments a ' || loc.city || ' business can make. When you rank on page one for the terms your customers are searching, you build a steady, compounding flow of high-intent traffic that does not stop when you pause a budget.',
      'Our SEO team has deep experience helping businesses across ' || loc.province_full || ' climb and hold page-one rankings. We understand the competitive dynamics in ' || loc.city || ' and build strategies that match your goals and timeline — not cookie-cutter templates.',
      'Our SEO service for ' || loc.city || ' businesses includes technical SEO audits, keyword strategy, on-page optimization, content development, authority link building, and detailed monthly reporting. Every decision is tied to business outcomes — not just rankings.',
      faq_json
    )
    ON CONFLICT (slug) DO NOTHING;

    -- google-ads
    service_slug := 'google-ads';
    service_label_val := 'Google Ads';
    page_slug := loc.slug || '/' || service_slug;
    faq_json := '[
      {"question": "How much should I budget for Google Ads?", "answer": "Ad spend varies by industry and competition. Most service businesses start effectively with $800-$2,500 per month in ad spend. We will give you a realistic estimate based on your specific market and keywords before you commit to anything."},
      {"question": "How quickly will I see leads from Google Ads?", "answer": "Google Ads can begin generating calls and form fills within days of launch. We typically see meaningful lead volume within the first 1-2 weeks as we optimize targeting, bids, and ad variations."},
      {"question": "Do you manage the ads on an ongoing basis?", "answer": "Full ongoing management is included. We monitor performance daily, test new ad variations, refine keyword targeting, adjust bids, and send monthly reports — so you never have to worry about wasted spend or stale campaigns."},
      {"question": "Can you track which calls and leads come from Google Ads?", "answer": "Yes. We implement call tracking and full conversion tracking so you can see exactly which keywords, ads, and campaigns are generating real leads — not just clicks."},
      {"question": "Can you run Google Ads alongside my existing SEO efforts?", "answer": "Absolutely — and we recommend it. Google Ads delivers immediate leads while your SEO compounds over time. Together, they create a full-funnel strategy that ensures you are visible at every stage of the buying journey."}
    ]'::jsonb;
    INSERT INTO location_pages (location_id, service_type, service_label, slug, page_title, meta_title, meta_description, hero_headline, hero_subheadline, intro_copy, why_us_copy, service_copy, faqs)
    VALUES (
      loc.id, service_slug, service_label_val, page_slug,
      'Google Ads ' || loc.city || ' | SiteMaxi',
      'Google Ads Management in ' || loc.city || ', ' || loc.province || ' | SiteMaxi',
      'Drive high-intent leads with expert Google Ads management in ' || loc.city || '. SiteMaxi builds and manages campaigns that deliver real calls and conversions.',
      'Google Ads that fill your calendar in ' || loc.city,
      'We build and manage Google Ads campaigns for ' || loc.city || ' businesses that generate quality leads — not just clicks. Pay for results that actually matter.',
      'Google Ads is one of the fastest ways to get in front of customers actively searching for your services in ' || loc.city || '. Unlike organic SEO, paid search can deliver leads within days. But only when campaigns are built and managed correctly — and that is where most businesses waste their budget.',
      loc.city || ' has a competitive advertising landscape. We understand the local search patterns, seasonal trends, and competitor positioning. Our team builds strategies specific to your market, your budget, and your goals in ' || loc.province_full || '.',
      'Our Google Ads management for ' || loc.city || ' businesses covers everything: keyword research, ad copywriting, landing page optimization, bid management, conversion tracking, and transparent reporting. We focus relentlessly on cost-per-lead and lead quality — not impressions or click-through rates.',
      faq_json
    )
    ON CONFLICT (slug) DO NOTHING;

    -- web-design
    service_slug := 'web-design';
    service_label_val := 'Web Design';
    page_slug := loc.slug || '/' || service_slug;
    faq_json := '[
      {"question": "How long does it take to build a website?", "answer": "Most websites are completed within 3-6 weeks depending on the number of pages and complexity. We work efficiently while ensuring every detail is right — from visual design to copy structure to technical SEO."},
      {"question": "Will my new website rank on Google?", "answer": "Every website we build is structured for SEO from day one — proper URL structure, page speed optimization, schema markup, mobile-first design, and location-specific content. We build the strongest possible foundation for local rankings."},
      {"question": "Do you offer website redesigns for existing businesses?", "answer": "Yes. Whether you have an outdated site that needs a complete redesign or an existing site that needs optimization, we assess what you have and build what will best serve your business goals."},
      {"question": "Will my website work on mobile devices?", "answer": "Absolutely. All our websites are built mobile-first. With the majority of customers searching on their phones, a fast and responsive mobile experience is non-negotiable."},
      {"question": "Do you provide ongoing website maintenance?", "answer": "Yes. We offer ongoing maintenance plans that cover security updates, performance monitoring, content updates, and technical support — so your website stays fast, secure, and converting long after launch."}
    ]'::jsonb;
    INSERT INTO location_pages (location_id, service_type, service_label, slug, page_title, meta_title, meta_description, hero_headline, hero_subheadline, intro_copy, why_us_copy, service_copy, faqs)
    VALUES (
      loc.id, service_slug, service_label_val, page_slug,
      'Web Design ' || loc.city || ' | SiteMaxi',
      'Professional Web Design in ' || loc.city || ', ' || loc.province || ' | SiteMaxi',
      'Get a high-converting professional website built for your ' || loc.city || ' business. SiteMaxi designs websites that generate real leads and grow with your business.',
      'A website your ' || loc.city || ' business deserves',
      'We design and build professional, high-converting websites for ' || loc.city || ' businesses — websites that look great, load fast, and turn visitors into customers.',
      'Your website is your most important marketing asset. For ' || loc.city || ' businesses, a professional website builds trust before a prospect ever calls you, captures leads around the clock, and works as your best salesperson. If your current site is slow, outdated, or not generating inquiries — it is actively costing you customers.',
      'We have built websites for businesses across ' || loc.province_full || ' that consistently outperform template-built sites. Our work is custom-designed, built for speed, and engineered from the ground up to convert ' || loc.city || ' visitors into customers.',
      'Every website we build for ' || loc.city || ' businesses includes mobile-first responsive design, SEO-ready page structure, fast load speeds, clear calls-to-action, lead capture forms, Google Analytics integration, and schema markup for local business.',
      faq_json
    )
    ON CONFLICT (slug) DO NOTHING;

    -- digital-marketing
    service_slug := 'digital-marketing';
    service_label_val := 'Digital Marketing';
    page_slug := loc.slug || '/' || service_slug;
    faq_json := '[
      {"question": "What digital marketing services do you offer?", "answer": "We offer local SEO, organic SEO, Google Ads, social media management, paid social ads, web design, and conversion optimization — as individual services or as an integrated full-service package tailored to your business."},
      {"question": "How do I know which services are right for my business?", "answer": "We start with a free AI marketing audit that shows you exactly where your gaps and opportunities are. This informs a custom strategy recommendation built around your specific goals, budget, and market."},
      {"question": "Do you work with small businesses?", "answer": "Yes. We work with businesses of all sizes. Whether you are a solo operator just starting out or a growing team looking to scale, we have service options that fit your stage and budget."},
      {"question": "How do you measure results for digital marketing campaigns?", "answer": "We track what matters: leads generated, calls, form fills, conversions, and revenue. Every client gets monthly reporting with clear metrics tied to business outcomes — not just traffic and impressions."},
      {"question": "Is SiteMaxi a Canadian marketing agency?", "answer": "Yes. SiteMaxi is a Canadian digital marketing agency. We serve businesses across Canada with local market knowledge and national resources — delivering the same commitment as a neighbourhood agency with broader expertise."}
    ]'::jsonb;
    INSERT INTO location_pages (location_id, service_type, service_label, slug, page_title, meta_title, meta_description, hero_headline, hero_subheadline, intro_copy, why_us_copy, service_copy, faqs)
    VALUES (
      loc.id, service_slug, service_label_val, page_slug,
      'Digital Marketing ' || loc.city || ' | SiteMaxi',
      'Digital Marketing Agency in ' || loc.city || ', ' || loc.province || ' | SiteMaxi',
      'Full-service digital marketing for ' || loc.city || ' businesses. SiteMaxi combines SEO, Google Ads, social media, and web design into an integrated growth strategy.',
      'Full-service digital marketing for ' || loc.city || ' businesses',
      'SiteMaxi helps ' || loc.city || ' businesses grow through integrated SEO, paid advertising, social media, and conversion-focused web design — all working together.',
      'Growing a business in ' || loc.city || ' requires more than one marketing channel. The most successful local businesses use an integrated approach — combining organic visibility, paid acquisition, social proof, and a website that converts — to create a sustainable, predictable growth engine.',
      'We work with Canadian businesses across ' || loc.province_full || ', which means we understand the ' || loc.city || ' market, local consumer behaviour, and the competitive landscape. Our integrated approach means your SEO, ads, and website work together instead of pulling in different directions.',
      'Our digital marketing service for ' || loc.city || ' businesses brings everything together: local SEO to build organic visibility, Google Ads for immediate lead generation, social media to build brand awareness and trust, and a conversion-optimized website to capture every opportunity.',
      faq_json
    )
    ON CONFLICT (slug) DO NOTHING;

  END LOOP;
END $$;
