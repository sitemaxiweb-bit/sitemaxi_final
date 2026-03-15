import { ResourcePageTemplate } from './ResourcePageTemplate';
import type { ResourcePageData } from './ResourcePageTemplate';

const data: ResourcePageData = {
  slug: 'google-business-profile-guide',
  title: 'Google Business Profile Optimization Guide',
  seoTitle: 'Google Business Profile Optimization Guide — Rank Higher on Google Maps',
  description: 'Step-by-step guide to fully optimize your Google Business Profile for maximum local search visibility.',
  seoDescription: 'Learn how to fully optimize your Google Business Profile to rank higher on Google Maps, get more reviews, and turn local searchers into paying customers.',
  keywords: 'Google Business Profile optimization, Google My Business guide, GBP optimization, Google Maps ranking, local SEO Google',
  category: 'Local Business',
  categoryColor: '#1D4ED8',
  categoryBg: '#DBEAFE',
  type: 'Guide',
  readTime: '15 min',
  lastUpdated: 'March 2025',
  heroSubtitle: 'Your Google Business Profile is often the first impression a potential customer has of your business. This guide shows you exactly how to optimize it for maximum local search visibility, more reviews, and higher call volume.',
  keyBenefits: [
    'Understand how Google ranks businesses in the Local Pack',
    'Optimize every section of your GBP for search and conversion',
    'Learn the photo strategy that increases profile views by 42%',
    'Use Google Posts to stay active and boost engagement',
    'Generate and respond to reviews the right way',
    'Track your GBP performance with built-in insights',
  ],
  sections: [
    {
      heading: 'What Is the Google Business Profile Local Pack?',
      content: 'The Local Pack (or "Map Pack") is the block of 3 business listings that appears at the top of Google results for local searches. It shows your business name, rating, address, phone number, hours, and photos. Studies show the Local Pack captures over 44% of all local search clicks — making it the single most valuable piece of real estate for local businesses. Google uses 3 main factors to rank Local Pack results: relevance, distance, and prominence.',
    },
    {
      heading: 'Step 1: Set Up and Verify Your Profile',
      content: 'Before you can optimize, you need to claim and verify your listing. Go to business.google.com and search for your business. If it exists, claim it. If not, create it from scratch.',
      items: [
        'Go to business.google.com and sign in with your business Google account',
        'Search for your business name and address',
        'If found, claim the listing — if not, create a new one',
        'Choose your verification method: postcard (5-7 days), phone, email, or video',
        'Complete verification before making major edits',
      ],
      numbered: true,
    },
    {
      heading: 'Step 2: Choose the Right Business Categories',
      content: 'Your primary category is the single most important ranking factor in your GBP. Choose the category that most specifically describes your core service — not a broad category.',
      items: [
        'Choose a primary category that exactly matches your main service (e.g., "Plumber" not "Home Services Company")',
        'Add secondary categories for additional services you offer',
        'Check competitor GBP profiles to see which categories top-ranking businesses use',
        'Do not add irrelevant categories — Google may penalize category stuffing',
      ],
    },
    {
      heading: 'Step 3: Write a Powerful Business Description',
      content: 'Your business description appears in your knowledge panel and helps Google understand what you do. Write it for humans first, but weave in your core keywords naturally.',
      items: [
        'Use all 750 characters available — longer descriptions rank better',
        'Include your primary service keyword in the first sentence',
        'Mention the cities and areas you serve',
        'Highlight what makes you different (years of experience, certifications, guarantees)',
        'Include a soft call to action ("Call us today for a free estimate")',
        'Avoid keyword stuffing — write naturally',
      ],
    },
    {
      heading: 'Step 4: Add and Optimize Your Services',
      content: 'The Services section is massively underutilized. Adding detailed services helps Google understand exactly what you offer and match you to more search queries.',
      items: [
        'Add every individual service you offer as a separate service entry',
        'Write a 100-200 word description for each service',
        'Include service-specific keywords naturally in descriptions',
        'Add price ranges where possible — this increases click-through rates',
        'Group related services into categories',
      ],
    },
    {
      heading: 'Step 5: Upload the Right Photos',
      content: 'Businesses with photos receive 42% more requests for directions and 35% more website clicks. But random photos won\'t cut it — you need a strategic photo library.',
      items: [
        'Add a high-resolution logo (250x250 pixels minimum)',
        'Set a compelling cover photo that shows your service or premises',
        'Upload exterior photos from all angles (helps customers recognize your location)',
        'Add interior photos showing your workspace, equipment, or store',
        'Include team photos — people trust businesses with visible, real teams',
        'Upload before/after photos of your best work',
        'Add photos regularly — Google rewards active profiles',
        'Use real photos, not stock images',
      ],
    },
    {
      heading: 'Step 6: Generate and Manage Reviews',
      content: 'Reviews are the #1 local ranking factor. A business with 50 genuine 4.8-star reviews will consistently outrank a competitor with 5 reviews, even if the competitor has a better website.',
      items: [
        'Create a short review link using Google\'s share review form',
        'Text the review link to every satisfied customer within 24 hours',
        'Add the review link to your email signature',
        'Respond to every review — thank positive reviewers, address negative ones professionally',
        'Never buy or fake reviews — Google can detect this and penalize your listing',
        'Aim for at least 10 new reviews per month',
      ],
    },
    {
      heading: 'Step 7: Use Google Posts Consistently',
      content: 'Google Posts appear directly on your GBP and in search results. They signal to Google that your profile is active and provide extra content for searchers to engage with.',
      items: [
        'Publish at least 2 Google Posts per month',
        'Use "What\'s New" posts for general updates and tips',
        'Use "Offer" posts for promotions and special deals',
        'Use "Event" posts for upcoming workshops or open houses',
        'Include a clear call-to-action button (Call, Book, Learn More)',
        'Posts expire after 7 days — schedule them in advance',
      ],
    },
  ],
  ctaHeading: 'Want a fully optimized GBP done for you?',
  ctaText: 'Our local SEO team handles complete Google Business Profile setup, optimization, and ongoing management. Get a free audit to see how your current profile stacks up.',
  relatedResources: [
    { title: 'Local SEO Checklist for Service Businesses', link: '/resources/local-seo-checklist', type: 'Checklist' },
    { title: 'Small Business Marketing Playbook', link: '/resources/small-business-playbook', type: 'Playbook' },
    { title: 'DIY Website SEO Audit Checklist', link: '/resources/seo-audit-checklist', type: 'Checklist' },
  ],
};

export function GoogleBusinessProfileGuidePage() {
  return <ResourcePageTemplate data={data} />;
}
