import { IndustryPageTemplate, IndustryPageData } from './IndustryPageTemplate';

const data: IndustryPageData = {
  seo: {
    title: 'Digital Marketing for E-commerce Brands | SiteMaxi',
    description: 'Scale your online store with e-commerce SEO, Google Shopping ads, and Meta ads. SiteMaxi helps Canadian e-commerce brands grow traffic, increase conversions, and maximize ROAS.',
    keywords: 'ecommerce marketing, SEO for online stores, Google Shopping ads, Shopify marketing Canada, ecommerce growth agency',
  },
  hero: {
    label: 'E-commerce Brands',
    headline: 'Scale your online store with data-driven marketing',
    subheadline: 'SiteMaxi helps e-commerce brands grow organic traffic, maximize return on ad spend, and optimize their conversion funnel to turn visitors into loyal customers.',
  },
  painPoints: {
    title: 'The growth challenges e-commerce brands face',
    items: [
      'Ad costs keep rising while return on ad spend keeps declining',
      'SEO traffic is inconsistent and hard to scale without the right strategy',
      'Customer acquisition costs are making profitable growth difficult',
      'Cart abandonment rates are high with no systematic recovery in place',
      'You\'re dependent on one channel — too much risk from algorithm changes',
      'Growing paid traffic but the website isn\'t converting visitors into buyers',
    ],
  },
  services: [
    {
      name: 'SearchMaxi — SEO',
      description: 'Build scalable organic traffic with e-commerce SEO — product page optimization, category SEO, and content marketing that drives sustainable, low-cost revenue.',
      link: '/searchmaxi',
      color: '#0891B2',
      bg: '#CFFAFE',
    },
    {
      name: 'ClickMaxi — Google Ads',
      description: 'Google Shopping and Search campaigns that capture high-intent buyers with maximized ROAS through expert campaign structure and ongoing optimization.',
      link: '/clickmaxi',
      color: '#DC2626',
      bg: '#FEE2E2',
    },
    {
      name: 'AdMaxi — Meta Ads',
      description: 'Facebook and Instagram ad campaigns that build product awareness, retarget abandoners, and drive profitable purchases with creative-led strategies.',
      link: '/admaxi',
      color: '#D97706',
      bg: '#FEF3C7',
    },
    {
      name: 'SiteMaxi — CRO',
      description: 'Conversion rate optimization to increase the percentage of visitors who buy — improving product pages, checkout flow, and user experience.',
      link: '/sitemaxi',
      color: '#7C3AED',
      bg: '#EDE9FE',
    },
  ],
  howWeHelp: {
    title: 'How we scale your e-commerce revenue',
    description: 'We build a full-funnel growth strategy that acquires new customers efficiently, maximizes AOV, and builds long-term customer loyalty.',
    items: [
      { title: 'Build Scalable Organic Traffic', description: 'E-commerce SEO that targets buyer-intent keywords, optimizes product and category pages, and builds a content ecosystem that drives consistent organic revenue.' },
      { title: 'Maximize Return on Ad Spend', description: 'Expert Google Shopping and Meta ads management with continuous optimization to improve ROAS as you scale, not decrease it.' },
      { title: 'Recover Abandoned Revenue', description: 'Dynamic retargeting campaigns, cart abandonment email sequences, and browse abandonment flows that recover revenue you\'re currently leaving on the table.' },
      { title: 'Increase Average Order Value', description: 'Product bundling strategies, cross-sell and upsell campaigns, and email marketing that increase how much each customer spends per order.' },
    ],
  },
  approach: {
    seo: 'Product and category page SEO, content marketing, and link building to drive organic traffic that converts.',
    ads: 'Google Shopping, search, and Meta campaigns optimized for ROAS across your full product catalogue.',
    website: 'Conversion rate optimization — improving product pages, checkout flow, and UX to increase the percentage of visitors who buy.',
    conversion: 'Full-funnel optimization: landing pages, product pages, cart, and checkout all designed to maximize revenue per visitor.',
  },
  results: {
    stats: [
      { value: '4.2x', label: 'Average return on ad spend' },
      { value: '60%', label: 'Increase in organic traffic' },
      { value: '35%', label: 'Improvement in conversion rate' },
      { value: '90 days', label: 'To significant revenue growth' },
    ],
    testimonial: {
      quote: 'SiteMaxi took our Google Shopping ROAS from 2.1x to 5.8x in 4 months while we scaled budget. Their team actually understands e-commerce, not just digital marketing in general.',
      author: 'Marcus Chen',
      company: 'Naturix Supplements, Vancouver',
    },
  },
  faqs: [
    { question: 'What e-commerce platforms do you work with?', answer: 'We work primarily with Shopify and WooCommerce, but have experience with all major e-commerce platforms. Our SEO and ad strategies are platform-agnostic and can be applied to any store.' },
    { question: 'How do you approach e-commerce SEO differently?', answer: 'E-commerce SEO requires deep product and category page optimization, faceted navigation management, structured data for rich results, and content marketing that captures the full buyer journey from awareness to purchase.' },
    { question: 'What\'s a realistic ROAS target for Meta and Google Ads?', answer: 'It varies by product category, margins, and competition. We typically target a minimum of 3x blended ROAS to start, with optimization strategies to improve it over time as we gather data and refine campaigns.' },
    { question: 'How do you handle a large product catalogue?', answer: 'We prioritize based on margin, search volume, and conversion potential. We use dynamic shopping campaigns, programmatic SEO for large catalogues, and systematic optimization that scales across thousands of products.' },
    { question: 'Can you help with email marketing and retention?', answer: 'Yes — email marketing is one of the highest-ROI channels for e-commerce. We build welcome series, abandoned cart flows, post-purchase sequences, and promotional campaigns that maximize lifetime customer value.' },
  ],
};

export function EcommercePage() {
  return <IndustryPageTemplate data={data} />;
}
