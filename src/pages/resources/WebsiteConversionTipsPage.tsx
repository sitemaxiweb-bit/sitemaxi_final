import { ResourcePageTemplate } from './ResourcePageTemplate';
import type { ResourcePageData } from './ResourcePageTemplate';

const data: ResourcePageData = {
  slug: 'website-conversion-tips',
  title: 'Website Conversion Optimization: 25 Proven Tactics',
  seoTitle: 'Website Conversion Optimization — 25 Proven Tactics to Get More Leads',
  description: '25 proven tactics to increase the percentage of website visitors who call, book, or buy — without spending more on traffic.',
  seoDescription: 'Increase your website conversion rate with these 25 proven CRO tactics. Turn more visitors into leads without increasing your ad budget.',
  keywords: 'website conversion optimization, CRO tactics, increase website conversion rate, website leads, conversion rate optimization tips, local business website conversion',
  category: 'Conversion',
  categoryColor: '#059669',
  categoryBg: '#D1FAE5',
  type: 'Guide',
  readTime: '14 min',
  lastUpdated: 'March 2025',
  heroSubtitle: 'The fastest way to grow your revenue isn\'t more traffic — it\'s converting more of the traffic you already have. These 25 tactics help you turn passive visitors into active leads, calls, and bookings.',
  keyBenefits: [
    'Identify the conversion killers hurting your current website',
    'Implement trust signals that make visitors feel safe contacting you',
    'Optimize your CTAs for maximum click-through rate',
    'Use social proof strategically across all key pages',
    'Reduce friction in your contact forms and booking flow',
    'Speed up your site to prevent visitors from leaving before converting',
  ],
  sections: [
    {
      heading: 'Why Conversion Rate Is Your Most Valuable Metric',
      content: 'Most businesses focus entirely on getting more traffic. But if your website converts at 1% and you increase it to 2%, you\'ve doubled your leads without spending an extra dollar on ads or SEO. For a site getting 500 visitors/month, that\'s the difference between 5 leads and 10 leads every single month, compounding over time. These 25 tactics focus on that multiplier.',
    },
    {
      heading: 'Section 1: Trust and Credibility (Tactics 1-7)',
      items: [
        'Display your phone number prominently in the header — make it click-to-call on mobile',
        'Add a physical address and Google Map embed to your contact page',
        'Show your team\'s real photos and names — faceless businesses get fewer calls',
        'Display Google reviews with your star rating on every key page',
        'Add trust badges: BBB, Google Partner, insurance certificates, certifications',
        'Show a "Licensed & Insured" statement near your CTA buttons',
        'Feature a customer count or years in business prominently ("500+ jobs completed since 2008")',
      ],
    },
    {
      heading: 'Section 2: Headlines and Messaging (Tactics 8-12)',
      items: [
        'Your homepage headline should say what you do + where + for whom in one sentence',
        'Add your #1 value differentiator in the subheadline (fast response, free estimates, satisfaction guarantee)',
        'Use "You" language — every sentence that says "we" should probably say "you get"',
        'Replace vague claims ("quality service") with specific proof ("average response in 47 minutes")',
        'Add an FAQ section on each service page that answers price, process, and timeline questions',
      ],
    },
    {
      heading: 'Section 3: CTAs and Lead Capture (Tactics 13-18)',
      items: [
        'Have one primary CTA on every page — don\'t split attention with multiple competing buttons',
        'Use specific CTA text: "Get My Free Estimate" beats "Contact Us" every time',
        'Place a CTA above the fold — don\'t make visitors scroll to take action',
        'Reduce form fields to the bare minimum — name, phone, and one question is often enough',
        'Add a text saying what happens after form submission ("We\'ll call you within 1 hour")',
        'Add an emergency or urgent option for high-intent visitors ("Call Now for Same-Day Service")',
      ],
    },
    {
      heading: 'Section 4: Social Proof and Testimonials (Tactics 19-21)',
      items: [
        'Place a testimonial directly above or beside every CTA button',
        'Use video testimonials — a 30-second clip from a happy customer converts 3x better than text',
        'Show before/after photos for trades and home services — tangible proof of results works',
      ],
    },
    {
      heading: 'Section 5: Technical Performance (Tactics 22-25)',
      items: [
        'Improve mobile page speed to under 3 seconds — every second of delay costs 7% in conversions',
        'Use a sticky header with your phone number and CTA button on mobile',
        'Add a live chat or chatbot widget for visitors who aren\'t ready to call',
        'Install heatmap and session recording software (Hotjar or Microsoft Clarity — both free) to see exactly where visitors drop off',
      ],
    },
    {
      heading: 'How to Prioritize These Tactics',
      content: 'Don\'t try to implement all 25 at once. Use this prioritization framework:',
      items: [
        'Start with speed: slow sites lose visitors before they can convert',
        'Fix your headline: if visitors don\'t understand what you do in 5 seconds, nothing else matters',
        'Add social proof: reviews and testimonials have the highest impact per hour of effort',
        'Optimize your CTAs: small wording changes can lift conversion rates by 20-30%',
        'Then work through trust signals, form optimization, and advanced tactics',
      ],
      numbered: true,
    },
  ],
  ctaHeading: 'Want a professional conversion audit?',
  ctaText: 'Our team provides full conversion rate audits and implements changes proven to increase lead volume. Run a free marketing audit to get a snapshot of your current conversion opportunities.',
  relatedResources: [
    { title: 'Landing Page Conversion Checklist', link: '/resources/landing-page-checklist', type: 'Checklist' },
    { title: 'Google Ads Starter Guide', link: '/resources/google-ads-starter-guide', type: 'Guide' },
    { title: 'Small Business Marketing Playbook', link: '/resources/small-business-playbook', type: 'Playbook' },
  ],
};

export function WebsiteConversionTipsPage() {
  return <ResourcePageTemplate data={data} />;
}
