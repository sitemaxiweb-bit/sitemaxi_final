import { ResourcePageTemplate } from './ResourcePageTemplate';
import type { ResourcePageData } from './ResourcePageTemplate';

const data: ResourcePageData = {
  slug: 'landing-page-checklist',
  title: 'Landing Page Conversion Checklist (30 Points)',
  seoTitle: 'Landing Page Conversion Checklist — 30 Elements That Turn Visitors Into Leads',
  description: 'A 30-point landing page checklist covering headlines, social proof, CTAs, and mobile experience to maximize conversion rates.',
  seoDescription: 'Use our 30-point landing page conversion checklist to build pages that convert paid and organic traffic into leads, calls, and bookings.',
  keywords: 'landing page checklist, landing page conversion rate, CRO checklist, conversion optimization, landing page best practices, high converting landing page',
  category: 'Conversion',
  categoryColor: '#059669',
  categoryBg: '#D1FAE5',
  type: 'Checklist',
  readTime: '8 min',
  lastUpdated: 'March 2025',
  heroSubtitle: 'A 30-point checklist for building landing pages that convert paid and organic traffic into real leads, calls, and bookings. Use this before launching any campaign.',
  keyBenefits: [
    'Write headlines that immediately communicate your core value',
    'Structure your page to guide visitors toward conversion',
    'Use social proof elements that build instant trust',
    'Optimize your CTA for maximum click-through',
    'Ensure your form captures leads without friction',
    'Make your page fast, mobile-friendly, and technically sound',
  ],
  sections: [
    {
      heading: 'Why Most Landing Pages Fail',
      content: 'The average landing page converts at just 2.35%. The top 25% of landing pages convert at 5.31% or higher. The difference isn\'t design — it\'s the strategic use of trust signals, clear messaging, and frictionless conversion paths. This checklist identifies the gaps between a mediocre page and one that consistently drives leads.',
    },
    {
      heading: 'Section 1: Headline and Above-the-Fold',
      items: [
        'Headline clearly states what you offer and who it\'s for (within 5 seconds of landing)',
        'Subheadline reinforces the headline with a supporting benefit or detail',
        'Primary CTA button is visible above the fold without scrolling',
        'Hero image or visual supports the offer (real photos outperform stock by 35%)',
        'No navigation menu or distracting links that pull visitors away',
        'Mobile headline reads properly on a 375px screen without truncation',
      ],
    },
    {
      heading: 'Section 2: Value Proposition',
      items: [
        'Clearly answer "What\'s in it for me?" within the first 3 paragraphs',
        'Focus on benefits, not just features (don\'t say "GPS tracking" — say "Know where your driver is at all times")',
        'Use specific numbers and results when possible ("Average customer saves $400/year")',
        'Address the visitor\'s main pain point or frustration directly',
        'Explain why you over the competition (your differentiator)',
      ],
    },
    {
      heading: 'Section 3: Social Proof',
      items: [
        'At least 3 customer testimonials with full name and photo (if possible)',
        'Star ratings displayed prominently (Google reviews widget or manual)',
        'Specific results-oriented testimonials ("We got 14 new leads in the first month")',
        'Client logos if you serve businesses',
        'Case study or before/after example',
        'Trust badges: BBB accreditation, Google Partner, insurance, certifications',
        'Media mentions if applicable ("As seen in...")',
      ],
    },
    {
      heading: 'Section 4: Call to Action (CTA)',
      items: [
        'CTA button uses action-oriented text ("Get My Free Quote" not "Submit")',
        'CTA button color contrasts strongly with the background',
        'CTA is repeated at least 3 times on longer pages',
        'Below the fold CTA matches the above-the-fold CTA',
        'Micro-copy under the CTA reduces risk ("No obligation. Free in 60 seconds.")',
      ],
    },
    {
      heading: 'Section 5: Lead Capture Form',
      items: [
        'Form asks for the minimum fields necessary (every extra field reduces conversions)',
        'Form headline matches the CTA (if CTA says "Get Free Quote," form says "Get Your Free Quote")',
        'Phone number field is optional unless required — mandatory phone fields reduce conversion',
        'Form includes a privacy reassurance ("We never share your info")',
        'Form confirmation page thanks the visitor and sets next-step expectations',
      ],
    },
    {
      heading: 'Section 6: Technical Performance',
      items: [
        'Page loads in under 3 seconds on mobile (test with Google PageSpeed Insights)',
        'All images are compressed and served in WebP format',
        'Page is fully responsive on all screen sizes',
        'Click-to-call button on mobile for immediate phone contact',
        'Conversion tracking installed (Google Ads tag, GA4 event, Meta Pixel)',
        'Page is indexed (or noindexed if it\'s a paid traffic-only page)',
      ],
    },
  ],
  ctaHeading: 'Want us to build a high-converting landing page for you?',
  ctaText: 'Our ClickMaxi service designs and builds conversion-optimized landing pages paired with Google and Meta ad campaigns. Get a free audit to see how your current pages stack up.',
  relatedResources: [
    { title: 'Website Conversion Optimization Tips', link: '/resources/website-conversion-tips', type: 'Guide' },
    { title: 'Google Ads Starter Guide', link: '/resources/google-ads-starter-guide', type: 'Guide' },
    { title: 'Meta Ads Guide for Local Businesses', link: '/resources/meta-ads-guide', type: 'Guide' },
  ],
};

export function LandingPageChecklistPage() {
  return <ResourcePageTemplate data={data} />;
}
