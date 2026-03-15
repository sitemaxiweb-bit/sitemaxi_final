import { ResourcePageTemplate } from './ResourcePageTemplate';
import type { ResourcePageData } from './ResourcePageTemplate';

const data: ResourcePageData = {
  slug: 'ecommerce-growth-guide',
  title: 'E-commerce Growth Guide 2025: Scale Your Online Store',
  seoTitle: 'E-commerce Growth Guide 2025 — Scale Your Online Store with SEO, Ads & Retention',
  description: 'A complete framework for scaling your online store covering organic SEO, paid ads, email marketing, CRO, and retention strategies.',
  seoDescription: 'Learn how to scale your e-commerce store in 2025. This guide covers organic SEO, Google and Meta Ads, email marketing, conversion rate optimization, and customer retention.',
  keywords: 'ecommerce growth guide 2025, scale online store, ecommerce marketing strategy, Shopify growth, WooCommerce marketing, ecommerce SEO and ads Canada',
  category: 'E-commerce',
  categoryColor: '#059669',
  categoryBg: '#D1FAE5',
  type: 'Guide',
  readTime: '25 min',
  lastUpdated: 'March 2025',
  heroSubtitle: 'Scaling an online store in 2025 requires more than just running ads. This guide covers the complete e-commerce growth framework — from organic search and paid advertising to email retention and conversion optimization.',
  keyBenefits: [
    'Build a sustainable traffic foundation with organic SEO',
    'Scale paid acquisition profitably with Google Shopping and Meta Ads',
    'Use email marketing to maximize revenue from existing customers',
    'Improve conversion rates to get more from every visitor',
    'Build a retention strategy that increases customer lifetime value',
    'Understand e-commerce metrics that actually predict growth',
  ],
  sections: [
    {
      heading: 'The E-commerce Growth Framework',
      content: 'Sustainable e-commerce growth comes from stacking multiple channels rather than relying on one. The growth framework has 5 pillars: Organic Traffic (SEO), Paid Acquisition (Google & Meta Ads), Conversion Optimization (CRO), Email & Retention, and Analytics & Attribution. Building all 5 creates a compounding system where each pillar supports the others.',
    },
    {
      heading: 'Pillar 1: Organic SEO for E-commerce',
      items: [
        'Target transactional keywords on product and category pages',
        'Write unique, benefit-focused product descriptions (not manufacturer copy)',
        'Build topical authority with buying guides and comparison content',
        'Implement Product and BreadcrumbList schema markup',
        'Earn backlinks through digital PR, influencer mentions, and industry publications',
        'Optimize for Google Shopping by maintaining an accurate, rich product feed',
        'Fix technical issues: page speed, crawlability, duplicate content from faceted navigation',
      ],
    },
    {
      heading: 'Pillar 2: Paid Acquisition',
      items: [
        'Start with Google Shopping campaigns — they show product images and prices and capture high intent',
        'Layer Google Search campaigns for brand and high-value product keywords',
        'Use Meta Ads for upper-funnel awareness and retargeting',
        'Create product-specific retargeting campaigns for cart abandoners',
        'Use Dynamic Product Ads (DPA) to automatically retarget with the exact product viewed',
        'Allocate budget based on return on ad spend (ROAS) by campaign',
        'Set up cross-channel attribution to understand true performance',
      ],
    },
    {
      heading: 'Pillar 3: Conversion Rate Optimization',
      items: [
        'A/B test your product page layout, images, and CTA button copy',
        'Reduce checkout steps to 2-3 maximum — every step loses 10-20% of shoppers',
        'Offer guest checkout — don\'t force account creation',
        'Display trust badges at checkout: secure payment icons, return policy, customer reviews',
        'Add product videos — stores with product videos see 85% higher add-to-cart rates',
        'Use exit-intent popups with a small discount to recover abandoning visitors',
        'Ensure your site loads in under 3 seconds — 1 second delay = 7% conversion loss',
      ],
    },
    {
      heading: 'Pillar 4: Email Marketing and Retention',
      content: 'Email consistently delivers the highest ROI of any e-commerce marketing channel — up to $42 return for every $1 spent. The key is automation.',
      items: [
        'Set up an abandoned cart email sequence (3 emails: 1 hour, 24 hours, 72 hours)',
        'Create a welcome series for new subscribers with a first-order discount',
        'Build a post-purchase sequence that encourages reviews and cross-sells',
        'Send a win-back campaign to customers who haven\'t ordered in 90+ days',
        'Segment your list by purchase history and send product-specific campaigns',
        'Clean your list every 6 months to maintain deliverability',
      ],
    },
    {
      heading: 'Pillar 5: Key Metrics and Analytics',
      items: [
        'Customer Acquisition Cost (CAC): total marketing spend / new customers acquired',
        'Customer Lifetime Value (CLV): average order value × purchase frequency × customer lifespan',
        'Return on Ad Spend (ROAS): revenue from ads / ad spend (aim for 3x+ minimum)',
        'Conversion Rate: orders / sessions × 100 (industry average: 1-4%)',
        'Cart Abandonment Rate: industry average is 70% — targeting sub-60% is excellent',
        'Email Revenue Per Recipient: track this monthly to optimize email frequency',
        'Organic traffic growth month-over-month in Google Search Console',
      ],
    },
    {
      heading: 'E-commerce Trends to Watch in 2025',
      items: [
        'AI-powered product recommendations increasing average order value',
        'Google Search Generative Experience changing how product searches appear',
        'Short-form video (TikTok, Instagram Reels) as a direct-to-purchase channel',
        'First-party data becoming critical as third-party cookies phase out',
        'Subscription and bundle models increasing customer lifetime value',
        'Social proof through user-generated content outperforming professional photography',
      ],
    },
  ],
  ctaHeading: 'Want to scale your online store with a proven system?',
  ctaText: 'SiteMaxi provides full-service e-commerce marketing — from technical SEO and Google Shopping to Meta Ads and email automation. Run a free audit to see your biggest growth opportunities.',
  relatedResources: [
    { title: 'E-commerce SEO Checklist', link: '/resources/ecommerce-seo-checklist', type: 'Checklist' },
    { title: 'Google Ads Starter Guide', link: '/resources/google-ads-starter-guide', type: 'Guide' },
    { title: 'Landing Page Conversion Checklist', link: '/resources/landing-page-checklist', type: 'Checklist' },
  ],
};

export function EcommerceGrowthGuidePage() {
  return <ResourcePageTemplate data={data} />;
}
