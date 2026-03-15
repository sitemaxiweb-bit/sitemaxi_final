import { ResourcePageTemplate } from './ResourcePageTemplate';
import type { ResourcePageData } from './ResourcePageTemplate';

const data: ResourcePageData = {
  slug: 'google-ads-starter-guide',
  title: 'Google Ads Starter Guide for Small Businesses',
  seoTitle: 'Google Ads Starter Guide for Small Businesses — Get More Calls & Leads',
  description: 'Learn how to set up, structure, and optimize your first Google Ads campaign to get more calls and customers without wasting your budget.',
  seoDescription: 'A beginner-friendly Google Ads guide for small businesses. Learn campaign structure, keyword targeting, ad copy, bidding strategy, and how to track real ROI.',
  keywords: 'Google Ads for small business, Google Ads starter guide, Google Ads setup, Google Ads campaign structure, PPC for small business, Google Ads Canada',
  category: 'Google Ads',
  categoryColor: '#DC2626',
  categoryBg: '#FEE2E2',
  type: 'Guide',
  readTime: '20 min',
  lastUpdated: 'March 2025',
  heroSubtitle: 'Google Ads can generate immediate leads and calls for your business — but only if set up correctly. This guide walks you through everything from account structure to bidding strategy so you stop burning budget and start getting real results.',
  keyBenefits: [
    'Understand how Google Ads works and which campaign type to start with',
    'Structure your campaigns for maximum relevance and quality score',
    'Choose keywords that bring buyers — not browsers',
    'Write ad copy that gets clicks and calls',
    'Set up conversion tracking to know exactly what\'s working',
    'Manage bids and budget to maximize ROI',
  ],
  sections: [
    {
      heading: 'Why Google Ads Works (When Done Right)',
      content: 'Google Ads puts your business in front of people actively searching for what you sell. Unlike social ads where you interrupt people, Google Ads captures demand that already exists. A plumber running Google Ads shows up when someone searches "emergency plumber Vancouver" — that\'s intent you can\'t buy on Facebook. The challenge is that without proper setup, you can burn through thousands of dollars with no results. This guide prevents that.',
    },
    {
      heading: 'Step 1: Choose the Right Campaign Type',
      content: 'For most local service businesses, Search campaigns are the best starting point. They show text ads to people actively searching for your services.',
      items: [
        'Search Campaigns: Text ads that appear when users search for your keywords — best for lead generation',
        'Performance Max: AI-driven campaigns across all Google channels — good after you have data',
        'Display Campaigns: Banner ads across websites — better for brand awareness than lead gen',
        'Local Service Ads (LSAs): Pay-per-lead ads for verified service businesses — highly recommended for trades',
        'Start with Search campaigns and expand once you have proven results',
      ],
    },
    {
      heading: 'Step 2: Structure Your Account Correctly',
      content: 'The most common Google Ads mistake is dumping all keywords into one ad group. Proper structure is: Account → Campaign → Ad Groups → Keywords → Ads.',
      items: [
        'Create one campaign per service or location (e.g., "Plumbing - Vancouver" and "Plumbing - Surrey")',
        'Within each campaign, create themed ad groups (e.g., "Emergency Plumbing", "Drain Cleaning", "Water Heater")',
        'Each ad group should have 5-15 tightly related keywords',
        'Write ad copy specific to each ad group\'s theme',
        'This structure improves Quality Score, which lowers your cost per click',
      ],
    },
    {
      heading: 'Step 3: Keyword Research and Match Types',
      content: 'Keyword match types control how closely a search query must match your keyword before triggering your ad.',
      items: [
        'Broad Match: widest reach, often triggers irrelevant searches — use cautiously',
        'Phrase Match: shows ads for searches containing your phrase — good balance',
        'Exact Match: only shows for very specific searches — highest intent, lowest volume',
        'Start with Phrase and Exact Match keywords to control quality',
        'Add negative keywords immediately: competitor names, "free", "DIY", "jobs", "reviews"',
        'Review the Search Terms report weekly and add new negatives',
      ],
    },
    {
      heading: 'Step 4: Write High-Converting Ad Copy',
      content: 'Your ad copy needs to match the searcher\'s intent and stand out from competitors. Include your keyword, a key benefit, and a strong call to action.',
      items: [
        'Include the main keyword in the headline — Google bolds matched terms',
        'Lead with your biggest differentiator: "Licensed & Insured", "Same-Day Service", "Free Estimates"',
        'Use numbers when possible: "20+ Years Experience", "Over 500 5-Star Reviews"',
        'Add a strong call to action: "Call Now", "Get a Free Quote", "Book Today"',
        'Use all available ad extensions: callouts, sitelinks, call extension, location extension',
        'Write at least 3 responsive search ad headlines and 2 descriptions',
        'Test different value propositions across ad variations',
      ],
    },
    {
      heading: 'Step 5: Set Up Conversion Tracking',
      content: 'Without conversion tracking, you\'re flying blind. You need to know which keywords and ads are driving actual phone calls, form fills, and bookings.',
      items: [
        'Install the Google Ads conversion tag on your website via Google Tag Manager',
        'Track form submissions as conversions',
        'Set up call tracking — enable "Calls from ads" conversion in Google Ads',
        'Track website calls using a Google forwarding number',
        'Connect Google Ads to Google Analytics 4 for deeper insights',
        'Set a value for each conversion type (e.g., a form lead = $50)',
      ],
    },
    {
      heading: 'Step 6: Bidding Strategy and Budget',
      content: 'Your bidding strategy tells Google how to spend your budget. The right strategy depends on whether you have conversion data yet.',
      items: [
        'Start with Manual CPC or Maximize Clicks to gather initial data',
        'Once you have 30+ conversions, switch to Target CPA (cost per acquisition)',
        'Set a daily budget you\'re comfortable spending — Google may spend up to 2x on high-volume days',
        'Avoid Smart campaigns (limited control and visibility)',
        'Monitor search impression share to see if budget is limiting your visibility',
        'Increase budget for campaigns with strong conversion rates',
      ],
    },
    {
      heading: 'Step 7: Ongoing Optimization Checklist',
      items: [
        'Review search terms report weekly and add negative keywords',
        'Pause keywords with high spend and zero conversions',
        'A/B test ad headlines and descriptions monthly',
        'Adjust bids by device — mobile often converts better for local service calls',
        'Review and expand sitelink extensions quarterly',
        'Analyze geographic performance and add bid adjustments by location',
        'Check Quality Score for each keyword — improve low QS keywords or pause them',
      ],
    },
  ],
  ctaHeading: 'Want experts managing your Google Ads?',
  ctaText: 'Our AdMaxi service handles complete Google Ads management — from setup and structure to daily optimization. We\'ve managed millions in ad spend for Canadian businesses. Get a free audit to see if Google Ads is right for you.',
  relatedResources: [
    { title: 'Meta Ads Guide for Local Businesses', link: '/resources/meta-ads-guide', type: 'Guide' },
    { title: 'Landing Page Conversion Checklist', link: '/resources/landing-page-checklist', type: 'Checklist' },
    { title: 'Website Conversion Optimization Tips', link: '/resources/website-conversion-tips', type: 'Guide' },
  ],
};

export function GoogleAdsStarterGuidePage() {
  return <ResourcePageTemplate data={data} />;
}
