import { ResourcePageTemplate } from './ResourcePageTemplate';
import type { ResourcePageData } from './ResourcePageTemplate';

const data: ResourcePageData = {
  slug: 'ecommerce-seo-checklist',
  title: 'E-commerce SEO Checklist: Rank Your Online Store',
  seoTitle: 'E-commerce SEO Checklist 2025 — Rank Your Online Store on Google',
  description: 'A comprehensive e-commerce SEO checklist for Shopify, WooCommerce, and other platforms to increase organic traffic and sales.',
  seoDescription: 'Use our complete e-commerce SEO checklist to optimize product pages, fix technical issues, build links, and rank higher on Google for high-intent shopping keywords.',
  keywords: 'ecommerce SEO checklist, Shopify SEO, WooCommerce SEO, product page SEO, online store SEO, e-commerce ranking 2025',
  category: 'E-commerce',
  categoryColor: '#059669',
  categoryBg: '#D1FAE5',
  type: 'Checklist',
  readTime: '12 min',
  lastUpdated: 'March 2025',
  heroSubtitle: 'Everything you need to optimize your online store for Google — from product page structure and technical SEO to schema markup and content strategy. Built for Shopify, WooCommerce, and beyond.',
  keyBenefits: [
    'Optimize product pages for high-intent buyer keywords',
    'Fix critical technical SEO issues that block Googlebot',
    'Implement product schema markup to get rich snippets in search results',
    'Build category page authority that drives consistent organic traffic',
    'Create a content strategy that supports product pages',
    'Build links that increase your domain authority',
  ],
  sections: [
    {
      heading: 'Why E-commerce SEO Is Different',
      content: 'E-commerce SEO is uniquely challenging. You might have thousands of product pages, thin content, duplicate content from manufacturer descriptions, and complex technical issues like pagination and faceted navigation. This checklist addresses all of it systematically.',
    },
    {
      heading: 'Part 1: Technical SEO for Online Stores',
      items: [
        'Ensure your site is crawlable — no noindex tags on important pages',
        'Submit an XML sitemap to Google Search Console',
        'Fix crawl errors in Google Search Console',
        'Implement HTTPS across all pages (required for trust and ranking)',
        'Resolve duplicate content from faceted navigation (use canonical tags)',
        'Set canonical tags on paginated pages to the main category page',
        'Ensure proper redirect chains (no 301 redirect chains longer than 2 hops)',
        'Fix broken links across the site',
        'Enable lazy loading for product images',
        'Achieve Largest Contentful Paint (LCP) under 2.5 seconds',
        'Eliminate Cumulative Layout Shift (CLS) below 0.1',
        'Ensure mobile experience is fully optimized',
      ],
    },
    {
      heading: 'Part 2: Product Page Optimization',
      items: [
        'Write unique product descriptions — never use manufacturer copy verbatim',
        'Include the primary keyword in the H1 (product name)',
        'Optimize the URL slug: /product-name (short, descriptive, no stop words)',
        'Write a compelling meta title (under 60 characters): "[Product Name] — [Key Benefit] | [Brand]"',
        'Write a unique meta description with a clear call to action',
        'Add alt text to every product image describing what it shows',
        'Include product FAQs on the page to capture long-tail queries',
        'Add social proof: reviews, ratings, and star counts',
        'Include related products and cross-sell sections',
        'Implement Product schema markup with price, availability, and rating',
      ],
    },
    {
      heading: 'Part 3: Category Page Optimization',
      items: [
        'Write 150-300 words of unique content at the top or bottom of each category page',
        'Include the primary category keyword in the H1',
        'Optimize category URLs: /category-name (no IDs or parameters)',
        'Add breadcrumb navigation and BreadcrumbList schema',
        'Link to subcategories and featured products within category content',
        'Build internal links from blog posts to relevant category pages',
        'Ensure category pages are included in your XML sitemap',
      ],
    },
    {
      heading: 'Part 4: Keyword Research for E-commerce',
      items: [
        'Target transactional keywords: "buy [product]", "[product] price", "[product] near me"',
        'Target comparison keywords: "best [product type]", "[product A] vs [product B]"',
        'Map one primary keyword per product/category page',
        'Use Google\'s "People Also Ask" for FAQ content ideas',
        'Analyze competitor rankings to find keyword gaps',
        'Target long-tail product-specific keywords with lower competition',
      ],
    },
    {
      heading: 'Part 5: Content Marketing for E-commerce SEO',
      items: [
        'Create buying guides for your product categories ("Best Running Shoes for Flat Feet")',
        'Write comparison posts targeting high-intent shoppers',
        'Publish "how to use" content for your products',
        'Create gift guides for seasonal traffic opportunities',
        'Build topical authority around your niche with blog content',
        'Internally link blog content to relevant product and category pages',
      ],
    },
    {
      heading: 'Part 6: E-commerce Link Building',
      items: [
        'Get listed in product review sites and comparison engines',
        'Reach out to bloggers and media for product reviews',
        'Submit to Google Shopping and other product feeds',
        'Build relationships with complementary brands for co-marketing',
        'Reclaim unlinked brand mentions using tools like Ahrefs Alerts',
        'Create linkable assets: original research, infographics, data studies',
      ],
    },
  ],
  ctaHeading: 'Ready to scale your e-commerce traffic?',
  ctaText: 'Our SearchMaxi service provides full-service SEO for online stores — including technical audits, content strategy, and link building. Run a free audit to see your biggest opportunities.',
  relatedResources: [
    { title: 'E-commerce Growth Guide 2025', link: '/resources/ecommerce-growth-guide', type: 'Guide' },
    { title: 'Keyword Research Guide for Service Businesses', link: '/resources/keyword-research-guide', type: 'Guide' },
    { title: 'DIY Website SEO Audit Checklist', link: '/resources/seo-audit-checklist', type: 'Checklist' },
  ],
};

export function EcommerceSEOChecklistPage() {
  return <ResourcePageTemplate data={data} />;
}
