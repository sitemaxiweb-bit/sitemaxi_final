export interface ServiceContent {
  serviceType: string;
  serviceLabel: string;
  getHeroHeadline: (city: string) => string;
  getHeroSubheadline: (city: string) => string;
  getIntroCopy: (city: string, province: string) => string;
  getWhyUsCopy: (city: string, province: string) => string;
  getServiceCopy: (city: string) => string;
  getFaqs: (city: string) => { question: string; answer: string }[];
  relatedServiceLinks: { label: string; path: string }[];
}

export const serviceContentTemplates: Record<string, ServiceContent> = {
  'local-seo': {
    serviceType: 'local-seo',
    serviceLabel: 'Local SEO',
    getHeroHeadline: (city) => `Local SEO that gets your ${city} business found first`,
    getHeroSubheadline: (city) => `We help ${city} businesses dominate Google Maps and local search results — bringing in more calls, more foot traffic, and more customers every month.`,
    getIntroCopy: (city, province) => `If your business is in ${city} and you're not showing up on the first page of Google, you're losing customers to competitors every single day. Our local SEO service puts your business in front of the right people at exactly the right moment — when they're actively searching for what you offer in ${city} and the surrounding ${province} area.`,
    getWhyUsCopy: (city, province) => `${city} businesses choose SiteMaxi because we understand local markets across ${province}. We've helped businesses climb to the top of Google Maps and stay there — not with shortcuts, but with proven strategies built on real local signals. Our team combines technical SEO expertise with deep knowledge of how Canadian consumers search and buy.`,
    getServiceCopy: (city) => `Local SEO for ${city} businesses is about more than keywords. We optimize your Google Business Profile, build authoritative local citations across Canadian directories, manage review generation, create location-specific landing pages, and earn quality backlinks that build your domain authority. Every signal we build tells Google exactly where you operate and who you serve — so you show up when it matters.`,
    getFaqs: (city) => [
      {
        question: `How long does local SEO take to show results in ${city}?`,
        answer: `Most ${city} businesses begin seeing meaningful ranking improvements within 60–90 days. Google Maps rankings can move faster with proper profile optimization. Long-term, consistent SEO compounds — delivering your highest-value leads month after month.`,
      },
      {
        question: `What does your local SEO service include for ${city} businesses?`,
        answer: `Our service includes Google Business Profile optimization, citation building across Canadian directories, on-page SEO, review strategy, local link building, and monthly reporting on your rankings, traffic, and leads.`,
      },
      {
        question: `Can you help me rank on Google Maps in ${city}?`,
        answer: `Google Maps ranking (the local pack) is one of our specialties. We optimize every local signal — your profile completeness, review velocity, citation consistency, and proximity signals — to improve your visibility across ${city}.`,
      },
      {
        question: `Do you work with different types of businesses in ${city}?`,
        answer: `Yes. We serve contractors, dentists, lawyers, clinics, restaurants, auto repair shops, real estate agents, HVAC companies, and many other service-based businesses across ${city} and the surrounding region.`,
      },
      {
        question: `How is local SEO different from regular SEO?`,
        answer: `Local SEO focuses on ranking in your city and surrounding service area — specifically in the Google Maps "local pack" and geo-targeted search results. It uses location-specific signals like your Google Business Profile, local citations, and proximity to searchers, while regular SEO targets broader organic rankings.`,
      },
    ],
    relatedServiceLinks: [
      { label: 'RankMaxi — Local SEO', path: '/rankmaxi' },
      { label: 'SearchMaxi — Organic SEO', path: '/searchmaxi' },
      { label: 'ClickMaxi — Google Ads', path: '/clickmaxi' },
    ],
  },

  'seo': {
    serviceType: 'seo',
    serviceLabel: 'SEO',
    getHeroHeadline: (city) => `SEO services built to grow your ${city} business`,
    getHeroSubheadline: (city) => `We help ${city} businesses earn more organic traffic, better rankings, and consistent leads through strategic SEO that compounds over time.`,
    getIntroCopy: (city, province) => `Organic search is one of the most valuable long-term investments a ${city} business can make. When you rank on page one for the terms your customers are searching, you build a steady, compounding flow of high-intent traffic that doesn't stop when you pause a budget. For businesses across ${province}, SEO is the channel that delivers the best long-term cost-per-lead.`,
    getWhyUsCopy: (city, province) => `Our SEO team has deep experience helping businesses across ${province} climb and hold page-one rankings. We understand the competitive dynamics in ${city} and build strategies that match your goals and timeline — not cookie-cutter templates applied to every client.`,
    getServiceCopy: (city) => `Our SEO service for ${city} businesses includes technical SEO audits, keyword strategy built around what your customers are actually searching, on-page optimization, content development, authority link building, and detailed monthly reporting. Every decision is tied to business outcomes — not just rankings or traffic volume.`,
    getFaqs: (city) => [
      {
        question: `How long does SEO take to work for ${city} businesses?`,
        answer: `SEO is a medium to long-term investment. Most clients begin seeing meaningful organic traffic increases within 3–6 months. Highly competitive terms take longer, but the results compound and continue delivering value for years — unlike paid ads that stop the moment you pause spend.`,
      },
      {
        question: `What makes your SEO approach different for ${city} businesses?`,
        answer: `We don't use template strategies. Every SEO plan is custom-built around your business, your competition in ${city}, and your target customers. We focus on revenue-driving keywords — not just traffic volume — and we're transparent about timelines and results.`,
      },
      {
        question: `Do you provide monthly SEO reports?`,
        answer: `Yes. Every client receives detailed monthly reports covering keyword rankings, organic traffic trends, conversions, and progress toward your goals. You'll always know exactly what's happening and why.`,
      },
      {
        question: `Can you do SEO for a ${city} business that also sells nationally?`,
        answer: `Absolutely. We build strategies that capture both your local ${city} customers and national or e-commerce organic traffic — giving you the best of both worlds with a single integrated SEO strategy.`,
      },
      {
        question: `What's included in a technical SEO audit for my ${city} business?`,
        answer: `Our technical audit covers site speed, crawlability, indexation, mobile-friendliness, URL structure, schema markup, internal linking, duplicate content, and more. We provide a prioritized action plan based on what will move the needle fastest.`,
      },
    ],
    relatedServiceLinks: [
      { label: 'SearchMaxi — Organic SEO', path: '/searchmaxi' },
      { label: 'RankMaxi — Local SEO', path: '/rankmaxi' },
      { label: 'SiteMaxi — Web Design', path: '/sitemaxi' },
    ],
  },

  'google-ads': {
    serviceType: 'google-ads',
    serviceLabel: 'Google Ads',
    getHeroHeadline: (city) => `Google Ads that fill your calendar in ${city}`,
    getHeroSubheadline: (city) => `We build and manage Google Ads campaigns for ${city} businesses that generate quality leads — not just clicks. Pay for results that actually matter.`,
    getIntroCopy: (city, province) => `Google Ads is one of the fastest ways to get in front of customers actively searching for your services in ${city}. Unlike organic SEO, paid search can deliver leads within days. But only when campaigns are built and managed correctly — and that's where most ${province} businesses waste their budget on clicks that never convert.`,
    getWhyUsCopy: (city, province) => `${city} has a competitive advertising landscape. We understand the local search patterns, seasonal trends, and competitor positioning that affect your campaigns in ${province}. Our team builds strategies specific to your market, your budget, and your goals — then manages them daily to maximize your return.`,
    getServiceCopy: (city) => `Our Google Ads management for ${city} businesses covers everything: keyword research and negative keyword strategy, compelling ad copywriting, landing page optimization, smart bid management, conversion tracking, and transparent reporting. We focus relentlessly on cost-per-lead and lead quality — not impressions or click-through rates.`,
    getFaqs: (city) => [
      {
        question: `How much should I budget for Google Ads in ${city}?`,
        answer: `Ad spend varies by industry and competition. Most service businesses in ${city} start effectively with $800–$2,500/month in ad spend. We'll give you a realistic estimate based on your specific market and keywords before you commit to anything.`,
      },
      {
        question: `How quickly will I see leads from Google Ads in ${city}?`,
        answer: `Google Ads can begin generating calls and form fills within days of launch. We typically see meaningful lead volume within the first 1–2 weeks as we optimize targeting, bids, and ad variations.`,
      },
      {
        question: `Do you manage the ads on an ongoing basis or just set them up?`,
        answer: `Full ongoing management is included. We monitor performance daily, test new ad variations, refine keyword targeting, adjust bids, and send monthly reports — so you never have to worry about wasted spend or stale campaigns.`,
      },
      {
        question: `Can you track which calls and leads come from Google Ads?`,
        answer: `Yes. We implement call tracking and full conversion tracking so you can see exactly which keywords, ads, and campaigns are generating real leads in ${city} — not just clicks. This data drives our optimization decisions.`,
      },
      {
        question: `Can you run Google Ads alongside my existing SEO efforts in ${city}?`,
        answer: `Absolutely — and we recommend it. Google Ads delivers immediate leads while your SEO compounds over time. Together, they create a full-funnel strategy that ensures you're visible to customers at every stage of the buying journey.`,
      },
    ],
    relatedServiceLinks: [
      { label: 'ClickMaxi — Google Ads', path: '/clickmaxi' },
      { label: 'AdMaxi — Social Ads', path: '/admaxi' },
      { label: 'RankMaxi — Local SEO', path: '/rankmaxi' },
    ],
  },

  'web-design': {
    serviceType: 'web-design',
    serviceLabel: 'Web Design',
    getHeroHeadline: (city) => `A website your ${city} business deserves`,
    getHeroSubheadline: (city) => `We design and build professional, high-converting websites for ${city} businesses — websites that look great, load fast, and turn visitors into customers.`,
    getIntroCopy: (city, province) => `Your website is your most important marketing asset. For ${city} businesses, a professional website builds trust before a prospect ever calls you, captures leads around the clock, and works as your best salesperson. If your current site is slow, outdated, or not generating inquiries — it's actively costing you customers every day.`,
    getWhyUsCopy: (city, province) => `We've built websites for businesses across ${province} that consistently outperform template-built sites. Our work is custom-designed, built for speed, and engineered from the ground up to convert ${city} visitors into customers. We understand what local buyers expect to see before they trust a business.`,
    getServiceCopy: (city) => `Every website we build for ${city} businesses includes mobile-first responsive design, SEO-ready page structure, fast load speeds (Core Web Vitals optimized), clear calls-to-action, lead capture forms, Google Analytics integration, and schema markup for local business. We don't just design pretty pages — we build growth platforms.`,
    getFaqs: (city) => [
      {
        question: `How long does it take to build a website for a ${city} business?`,
        answer: `Most websites are completed within 3–6 weeks depending on the number of pages and complexity. We work efficiently while ensuring every detail is right — from visual design to copy structure to technical SEO.`,
      },
      {
        question: `Will my new website rank on Google in ${city}?`,
        answer: `Every website we build is structured for SEO from day one — proper URL structure, page speed optimization, schema markup, mobile-first design, and location-specific content. We build the strongest possible foundation for ${city} rankings.`,
      },
      {
        question: `Do you offer website redesigns for existing ${city} businesses?`,
        answer: `Yes. Whether you have an outdated site that needs a complete redesign or an existing site that needs optimization, we assess what you have and build what will best serve your business goals and your ${city} customers.`,
      },
      {
        question: `Will my website work on mobile devices?`,
        answer: `Absolutely. All our websites are built mobile-first. With the majority of ${city} customers searching on their phones, a fast and responsive mobile experience is non-negotiable.`,
      },
      {
        question: `Do you provide ongoing website maintenance?`,
        answer: `Yes. We offer ongoing maintenance plans that cover security updates, performance monitoring, content updates, and technical support — so your website stays fast, secure, and converting long after launch.`,
      },
    ],
    relatedServiceLinks: [
      { label: 'SiteMaxi — Web Design', path: '/sitemaxi' },
      { label: 'RankMaxi — Local SEO', path: '/rankmaxi' },
      { label: 'ClickMaxi — Google Ads', path: '/clickmaxi' },
    ],
  },

  'digital-marketing': {
    serviceType: 'digital-marketing',
    serviceLabel: 'Digital Marketing',
    getHeroHeadline: (city) => `Full-service digital marketing for ${city} businesses`,
    getHeroSubheadline: (city) => `SiteMaxi helps ${city} businesses grow through integrated SEO, paid advertising, social media, and conversion-focused web design — all working together.`,
    getIntroCopy: (city, province) => `Growing a business in ${city} requires more than one marketing channel. The most successful local businesses use an integrated approach — combining organic visibility, paid acquisition, social proof, and a website that converts — to create a sustainable, predictable growth engine. We build that engine for ${province} businesses.`,
    getWhyUsCopy: (city, province) => `We work exclusively with Canadian businesses, which means we understand the ${city} market, local consumer behaviour, and the competitive landscape in ${province}. Our integrated approach means your SEO, ads, and website work together instead of pulling in different directions.`,
    getServiceCopy: (city) => `Our digital marketing service for ${city} businesses brings everything together: local SEO to build organic visibility, Google Ads for immediate lead generation, social media to build brand awareness and trust, and a conversion-optimized website to capture every opportunity. We measure everything — from first click to closed customer — so you always know your return.`,
    getFaqs: (city) => [
      {
        question: `What digital marketing services do you offer in ${city}?`,
        answer: `We offer local SEO, organic SEO, Google Ads, social media management, paid social ads, web design, and conversion optimization — as individual services or as an integrated full-service package tailored to your ${city} business.`,
      },
      {
        question: `How do I know which services are right for my ${city} business?`,
        answer: `We start with a free AI marketing audit that shows you exactly where your gaps and opportunities are. This informs a custom strategy recommendation built around your specific goals, budget, and the ${city} market.`,
      },
      {
        question: `Do you work with small businesses in ${city}?`,
        answer: `Yes. We work with businesses of all sizes across ${city}. Whether you're a solo operator just starting out or a growing team looking to scale, we have service options that fit your stage and budget.`,
      },
      {
        question: `How do you measure results for ${city} marketing campaigns?`,
        answer: `We track what matters: leads generated, calls, form fills, conversions, and revenue. Every client gets monthly reporting with clear metrics tied to business outcomes — not just traffic and impressions.`,
      },
      {
        question: `Is SiteMaxi a local ${city} marketing agency?`,
        answer: `SiteMaxi is a Canadian digital marketing agency. While our team works across the country, we serve ${city} businesses with the same local market knowledge and commitment as a neighbourhood agency — with the resources and expertise of a national team.`,
      },
    ],
    relatedServiceLinks: [
      { label: 'All Services', path: '/services' },
      { label: 'RankMaxi — Local SEO', path: '/rankmaxi' },
      { label: 'ClickMaxi — Google Ads', path: '/clickmaxi' },
    ],
  },
};

export const SUPPORTED_INDUSTRIES = [
  { slug: 'contractors', label: 'Contractors & Trades', path: '/industries/contractors' },
  { slug: 'dentists', label: 'Dentists', path: '/industries/dentists' },
  { slug: 'lawyers', label: 'Lawyers', path: '/industries/lawyers' },
  { slug: 'plumbers', label: 'Plumbers', path: '/industries/plumbers' },
  { slug: 'hvac', label: 'HVAC', path: '/industries/hvac' },
  { slug: 'roofers', label: 'Roofers', path: '/industries/roofers' },
  { slug: 'med-spas', label: 'Med Spas', path: '/industries/med-spas' },
  { slug: 'clinics', label: 'Medical Clinics', path: '/industries/clinics' },
  { slug: 'real-estate', label: 'Real Estate', path: '/industries/real-estate' },
  { slug: 'restaurants', label: 'Restaurants', path: '/industries/restaurants' },
  { slug: 'auto-repair', label: 'Auto Repair', path: '/industries/auto-repair' },
  { slug: 'ecommerce', label: 'E-Commerce', path: '/industries/ecommerce' },
];
