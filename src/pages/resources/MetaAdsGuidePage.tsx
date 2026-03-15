import { ResourcePageTemplate } from './ResourcePageTemplate';
import type { ResourcePageData } from './ResourcePageTemplate';

const data: ResourcePageData = {
  slug: 'meta-ads-guide',
  title: 'Meta Ads Guide for Local Businesses',
  seoTitle: 'Meta Ads Guide for Local Businesses — Facebook & Instagram Ads That Convert',
  description: 'How to run profitable Facebook and Instagram ad campaigns as a local business — audience targeting, creative best practices, and budget optimization.',
  seoDescription: 'Learn how to run profitable Meta (Facebook & Instagram) ad campaigns for your local business. Covers audience targeting, ad creative, budgeting, and conversion tracking.',
  keywords: 'Meta Ads for local businesses, Facebook Ads for small business, Instagram Ads guide, social media advertising Canada, Meta Ads strategy, Facebook Ads targeting',
  category: 'Paid Ads',
  categoryColor: '#D97706',
  categoryBg: '#FEF3C7',
  type: 'Guide',
  readTime: '22 min',
  lastUpdated: 'March 2025',
  heroSubtitle: 'Meta Ads (Facebook and Instagram) are one of the most powerful tools for local businesses to build awareness, generate leads, and retarget website visitors. This guide shows you how to use them profitably.',
  keyBenefits: [
    'Choose the right Meta Ads campaign objective for your goal',
    'Build laser-targeted audiences based on location, demographics, and interests',
    'Create scroll-stopping ad creative that drives action',
    'Set up retargeting campaigns to convert warm prospects',
    'Track and optimize for real conversions — not just clicks',
    'Avoid the most common Meta Ads mistakes that waste budget',
  ],
  sections: [
    {
      heading: 'Meta Ads vs. Google Ads: Which Is Right for You?',
      content: 'Google Ads captures existing demand — people searching for your service right now. Meta Ads create demand — they put your business in front of people who match your ideal customer profile, even if they weren\'t actively searching. For local service businesses, both work best together: Google Ads for immediate high-intent leads, Meta Ads for brand awareness, retargeting, and lower-cost lead generation.',
    },
    {
      heading: 'Step 1: Choose Your Campaign Objective',
      content: 'Meta\'s campaign objectives tell the algorithm who to show your ads to. Choosing the wrong objective is the #1 reason local businesses waste money on Meta Ads.',
      items: [
        'Leads: best for capturing lead forms directly on Facebook/Instagram — low friction',
        'Traffic: drives people to your website — use only if your website converts well',
        'Awareness: brand awareness only — not for direct response or lead generation',
        'Conversions: optimizes for website form fills or purchases — requires Meta Pixel',
        'Messages: drives people to message your business on WhatsApp or Messenger',
        'For most local service businesses, start with the Leads objective',
      ],
    },
    {
      heading: 'Step 2: Build the Right Audience',
      content: 'Meta\'s targeting capabilities are unmatched for reaching specific types of people in your local area.',
      items: [
        'Location targeting: set a radius around your business address (5-25km depending on your service area)',
        'Age targeting: match your actual customer demographics (most services skew 30-65)',
        'Interest targeting: homeowners, home improvement, gardening (for relevant services)',
        'Lookalike audiences: upload your customer email list and Meta finds similar people',
        'Website visitors: retarget people who visited your website in the last 30-180 days',
        'Video viewers: retarget people who watched 50%+ of your video ads',
        'Avoid over-narrowing — Meta\'s algorithm needs a large enough audience to optimize',
      ],
    },
    {
      heading: 'Step 3: Create High-Performing Ad Creative',
      content: 'Creative is the single biggest lever in Meta Ads. The algorithm can find the right people — but only if your ad makes them stop scrolling.',
      items: [
        'Use real photos over stock images — authentic visuals build trust',
        'Video ads outperform static images — even a simple 15-second before/after clip',
        'Lead with the problem or pain point in your first sentence',
        'Show social proof immediately: "500+ happy customers in Surrey & Langley"',
        'Use a clear, specific offer: "Free estimate + $50 off your first service"',
        'Create separate creatives for Facebook feed, Instagram feed, and Stories',
        'Test 3-4 different creatives per campaign and cut the losers weekly',
        'Include captions on video — 85% of videos are watched on mute',
      ],
    },
    {
      heading: 'Step 4: Set Up Meta Pixel and Conversion Tracking',
      content: 'The Meta Pixel is a code snippet that tracks what visitors do on your website after clicking your ad. Without it, you can\'t optimize for conversions.',
      items: [
        'Install the Meta Pixel via your website\'s header code or Google Tag Manager',
        'Set up standard events: PageView, Lead (form submission), Contact (call click)',
        'Test your Pixel using the Meta Pixel Helper Chrome extension',
        'Once you have 50+ pixel events, switch your campaign to Conversions objective',
        'Create Custom Conversions for specific thank-you pages',
        'Connect your pixel to your WhatsApp or Facebook Messenger for messaging campaigns',
      ],
    },
    {
      heading: 'Step 5: Retargeting — Your Highest-ROI Campaign',
      content: 'Website visitors who don\'t convert are your warmest prospects. Retargeting ads to these people typically convert 3-5x better than cold audiences.',
      items: [
        'Create a retargeting audience of website visitors from the last 30 days',
        'Show retargeting ads with a specific offer or testimonial',
        'Create a separate retargeting ad set with a higher bid',
        'Limit retargeting frequency to 3-5 impressions per week to avoid ad fatigue',
        'Set an ad frequency cap of 3 per week',
        'Use carousel ads to show multiple services or testimonials in one ad',
      ],
    },
    {
      heading: 'Step 6: Budget and Bidding Strategy',
      items: [
        'Start with a minimum of $20-30/day per ad set to give Meta enough data',
        'Use Campaign Budget Optimization (CBO) once you have multiple ad sets',
        'Don\'t make budget changes more than once every 3-5 days — it restarts the learning phase',
        'Scale winning ad sets by increasing budget by no more than 20% at a time',
        'Monitor cost per lead weekly — a good CPL varies by industry ($15-50 for most local services)',
        'Pause underperforming ad sets after 7 days if cost per lead is 2x your target',
      ],
    },
  ],
  ctaHeading: 'Want expert Meta Ads management for your business?',
  ctaText: 'Our AdMaxi service handles Facebook and Instagram ad campaigns for local businesses — from creative to targeting to daily optimization. Get a free audit to see your paid ad opportunities.',
  relatedResources: [
    { title: 'Google Ads Starter Guide', link: '/resources/google-ads-starter-guide', type: 'Guide' },
    { title: 'Landing Page Conversion Checklist', link: '/resources/landing-page-checklist', type: 'Checklist' },
    { title: 'Small Business Marketing Playbook', link: '/resources/small-business-playbook', type: 'Playbook' },
  ],
};

export function MetaAdsGuidePage() {
  return <ResourcePageTemplate data={data} />;
}
