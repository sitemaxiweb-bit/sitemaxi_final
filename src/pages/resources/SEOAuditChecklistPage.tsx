import { ResourcePageTemplate } from './ResourcePageTemplate';
import type { ResourcePageData } from './ResourcePageTemplate';

const data: ResourcePageData = {
  slug: 'seo-audit-checklist',
  title: 'DIY Website SEO Audit Checklist',
  seoTitle: 'DIY Website SEO Audit Checklist — Find and Fix What\'s Hurting Your Rankings',
  description: 'A step-by-step checklist to audit your own website\'s SEO — covering technical issues, on-page optimization, content gaps, and link building.',
  seoDescription: 'Use our DIY website SEO audit checklist to find and fix the SEO issues hurting your Google rankings. Covers technical SEO, on-page optimization, content, and links.',
  keywords: 'SEO audit checklist, website SEO audit, DIY SEO audit, how to audit SEO, technical SEO checklist, on-page SEO checklist, SEO health check',
  category: 'SEO',
  categoryColor: '#0891B2',
  categoryBg: '#CFFAFE',
  type: 'Checklist',
  readTime: '12 min',
  lastUpdated: 'March 2025',
  heroSubtitle: 'Before investing in SEO, you need to know what\'s actually broken. This DIY SEO audit checklist walks you through every critical area — from technical issues and on-page optimization to content gaps and backlink health.',
  keyBenefits: [
    'Identify technical SEO issues blocking your rankings',
    'Audit your on-page optimization for every key page',
    'Find content gaps your competitors are exploiting',
    'Check your backlink profile for toxic links',
    'Measure your site speed and Core Web Vitals',
    'Create a prioritized list of fixes ranked by impact',
  ],
  sections: [
    {
      heading: 'What Is an SEO Audit and Why Does It Matter?',
      content: 'An SEO audit is a comprehensive analysis of your website\'s health from a search engine perspective. It identifies the specific technical, content, and authority factors preventing your site from ranking where it should. Without an audit, you\'re guessing what to fix. With one, you have a clear, prioritized action list. This checklist guides you through performing one yourself using mostly free tools.',
    },
    {
      heading: 'Tools You Need (All Free)',
      items: [
        'Google Search Console (free) — essential for crawl errors, indexing, and keyword data',
        'Google Analytics 4 (free) — traffic, behavior, and conversion data',
        'Google PageSpeed Insights (free) — page speed and Core Web Vitals',
        'Bing Webmaster Tools (free) — complementary data to Search Console',
        'Screaming Frog SEO Spider (free for up to 500 URLs) — technical crawl',
        'Ahrefs Webmaster Tools (free) — backlink data and basic keyword rankings',
        'Google Mobile-Friendly Test (free) — mobile usability check',
      ],
    },
    {
      heading: 'Part 1: Technical SEO Audit',
      items: [
        'Check Google Search Console for crawl errors — fix all 404 errors with proper redirects',
        'Ensure your site is verified in both Google Search Console and Bing Webmaster Tools',
        'Confirm your XML sitemap is submitted and has no errors',
        'Check that important pages are indexed (search "site:yourdomain.com" in Google)',
        'Verify no important pages are accidentally blocked by robots.txt',
        'Check for HTTPS: every page should load on https:// with no mixed content warnings',
        'Identify redirect chains longer than 2 hops and fix them',
        'Check for duplicate content: www vs non-www, trailing slashes, HTTP vs HTTPS',
        'Ensure canonical tags are implemented correctly',
        'Test your site\'s mobile-friendliness using Google\'s Mobile-Friendly Test',
      ],
    },
    {
      heading: 'Part 2: Page Speed and Core Web Vitals',
      items: [
        'Test your homepage and top 5 pages with Google PageSpeed Insights',
        'Target a mobile score of 70+ and desktop score of 85+',
        'Largest Contentful Paint (LCP) should be under 2.5 seconds',
        'Cumulative Layout Shift (CLS) should be below 0.1',
        'First Input Delay (FID) should be under 100ms',
        'Compress all images and serve in WebP format where possible',
        'Enable lazy loading for images below the fold',
        'Minimize JavaScript and CSS that blocks rendering',
      ],
    },
    {
      heading: 'Part 3: On-Page SEO Audit',
      items: [
        'Every page has a unique, keyword-optimized title tag under 60 characters',
        'Every page has a unique meta description between 150-160 characters',
        'Each page has one H1 tag that includes the primary keyword',
        'H2 and H3 tags are used to structure content and include secondary keywords',
        'Images have descriptive alt text (not "image1.jpg")',
        'Internal links connect related pages logically',
        'URLs are short, descriptive, and include the primary keyword',
        'No keyword stuffing — content reads naturally',
        'Service and location pages have at least 500 words of unique content',
      ],
    },
    {
      heading: 'Part 4: Content Audit',
      items: [
        'Identify pages with thin content (under 300 words) — improve or consolidate',
        'Find pages with duplicate or near-duplicate content — add canonical tags or rewrite',
        'Identify your top 10 organic landing pages (Google Analytics) — are they optimized?',
        'Check for keyword cannibalization: multiple pages targeting the same keyword',
        'Find content gaps: keywords competitors rank for that you don\'t have pages for',
        'Review blog content: update outdated posts with current information and publish dates',
        'Check all internal links — fix or remove any broken internal links',
      ],
    },
    {
      heading: 'Part 5: Backlink Audit',
      items: [
        'Use Ahrefs Webmaster Tools to review your backlink profile',
        'Check your Domain Rating (DR) and compare to top competitors',
        'Identify toxic or spammy backlinks — disavow if there are many low-quality links',
        'Find broken backlinks (links pointing to 404 pages) — redirect those URLs',
        'Compare your backlink count to competitors to estimate the gap',
        'Identify your best competitors\' linking domains as link-building targets',
      ],
    },
    {
      heading: 'How to Prioritize Your Audit Findings',
      content: 'After completing your audit, you\'ll have a list of issues. Prioritize them using this framework:',
      items: [
        'Critical (fix immediately): indexing errors, HTTPS issues, major crawl blocks, broken canonical tags',
        'High priority: page speed below 50, missing title/H1 tags, thin content on key pages',
        'Medium priority: missing meta descriptions, image alt text, content optimization',
        'Low priority: minor content improvements, additional internal links, schema markup',
        'Work through critical and high-priority items before moving to medium and low',
      ],
      numbered: true,
    },
  ],
  ctaHeading: 'Want a professional SEO audit done for you?',
  ctaText: 'Our team provides comprehensive SEO audits that go deeper than any checklist — including competitor analysis, keyword gap analysis, and a fully prioritized action plan. Run a free instant audit to get started.',
  relatedResources: [
    { title: 'Keyword Research Guide for Service Businesses', link: '/resources/keyword-research-guide', type: 'Guide' },
    { title: 'Local SEO Checklist for Service Businesses', link: '/resources/local-seo-checklist', type: 'Checklist' },
    { title: 'E-commerce SEO Checklist', link: '/resources/ecommerce-seo-checklist', type: 'Checklist' },
  ],
};

export function SEOAuditChecklistPage() {
  return <ResourcePageTemplate data={data} />;
}
