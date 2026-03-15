import { ResourcePageTemplate } from './ResourcePageTemplate';
import type { ResourcePageData } from './ResourcePageTemplate';

const data: ResourcePageData = {
  slug: 'local-seo-checklist',
  title: 'Local SEO Checklist for Service Businesses (47 Steps)',
  seoTitle: 'Local SEO Checklist for Service Businesses — 47-Point Guide',
  description: 'A comprehensive 47-point local SEO checklist for service businesses to dominate local search in Canada.',
  seoDescription: 'Use our free 47-point local SEO checklist to optimize your Google Business Profile, build citations, generate reviews, and rank higher in local search results.',
  keywords: 'local SEO checklist, Google Business Profile optimization, local search ranking, local citations, review generation, local SEO Canada',
  category: 'Local Business',
  categoryColor: '#1D4ED8',
  categoryBg: '#DBEAFE',
  type: 'Checklist',
  readTime: '10 min',
  lastUpdated: 'March 2025',
  heroSubtitle: 'A step-by-step 47-point checklist covering everything a local service business needs to rank higher in Google local search, Google Maps, and the Local Pack.',
  keyBenefits: [
    'Fully optimize your Google Business Profile for maximum visibility',
    'Build consistent citations across the top 50+ Canadian directories',
    'Generate more 5-star reviews with proven request strategies',
    'Implement on-page SEO for every service and location page',
    'Fix technical SEO issues that hurt local rankings',
    'Build local backlinks that actually move the needle',
  ],
  sections: [
    {
      heading: 'Why Local SEO Matters for Service Businesses',
      content: 'Over 46% of all Google searches have local intent. When someone searches "plumber near me" or "dentist in Surrey BC," Google shows the Local Pack — the top 3 map results — before any organic listings. If your business isn\'t in that Local Pack, you\'re invisible to the majority of high-intent buyers in your area. This checklist gives you the complete roadmap to get there.',
    },
    {
      heading: 'Part 1: Google Business Profile Optimization',
      items: [
        'Claim and verify your Google Business Profile (GBP) with a postcard or video verification',
        'Choose the most accurate primary category for your business (this is critical)',
        'Add all relevant secondary categories your business qualifies for',
        'Write a complete, keyword-rich business description (750 characters max)',
        'Add your exact NAP (Name, Address, Phone) — must match your website exactly',
        'Set accurate business hours including holiday hours',
        'Add all services with detailed descriptions and pricing ranges',
        'Upload 20+ high-quality photos: exterior, interior, team, work samples',
        'Enable messaging and respond to all messages within 24 hours',
        'Add your website URL and booking link',
        'Set up Google Posts — publish at least 2 posts per month',
        'Answer questions in the Q&A section proactively',
      ],
    },
    {
      heading: 'Part 2: Local Citations and Directory Listings',
      items: [
        'Audit your existing citations for NAP inconsistencies using a tool like BrightLocal',
        'Claim and optimize your Yelp business listing',
        'Submit to Yellow Pages Canada (yellowpages.ca)',
        'List on Canada411 and 411.ca',
        'Submit to Bing Places for Business',
        'List on Apple Maps via Apple Business Connect',
        'Add your business to BBB (Better Business Bureau)',
        'Submit to industry-specific directories relevant to your niche',
        'List on local Chamber of Commerce website',
        'Ensure all citations use exactly the same NAP format',
      ],
    },
    {
      heading: 'Part 3: Review Generation Strategy',
      items: [
        'Set a goal of getting at least 10 new reviews per month',
        'Create a simple review request link using Google\'s Place ID finder',
        'Ask for reviews via SMS within 24 hours of job completion',
        'Add review request to your email follow-up sequence',
        'Train staff to ask every satisfied customer for a Google review',
        'Respond to every single review — both positive and negative',
        'Never buy fake reviews (Google penalizes this severely)',
        'Showcase reviews on your website using embedded schema markup',
      ],
    },
    {
      heading: 'Part 4: On-Page Local SEO',
      items: [
        'Create individual service pages for each service you offer',
        'Create location pages for every city/area you serve',
        'Include city + service in H1 tags (e.g., "Plumbing Services in Vancouver")',
        'Add LocalBusiness schema markup to your homepage',
        'Embed a Google Map on your contact page',
        'Add your full NAP in the footer of every page',
        'Include local keywords naturally in page copy',
        'Optimize title tags with city + service keyword combinations',
        'Write unique meta descriptions for every page',
        'Ensure mobile page speed is under 3 seconds',
      ],
    },
    {
      heading: 'Part 5: Local Link Building',
      items: [
        'Sponsor a local event or community organization for a backlink',
        'Guest post on local news sites and community blogs',
        'Partner with complementary local businesses for cross-promotion links',
        'Get listed in local business association directories',
        'Issue press releases for significant business milestones',
        'Create locally-focused content that earns natural links',
        'Reach out to local bloggers for mention opportunities',
      ],
    },
  ],
  ctaHeading: 'Want us to do this for you?',
  ctaText: 'Our RankMaxi service handles everything on this checklist — and more. We\'ve helped 100+ Canadian service businesses dominate their local market. Get a free audit to see exactly where you stand.',
  relatedResources: [
    { title: 'Google Business Profile Optimization Guide', link: '/resources/google-business-profile-guide', type: 'Guide' },
    { title: 'Small Business Marketing Playbook', link: '/resources/small-business-playbook', type: 'Playbook' },
    { title: 'Keyword Research Guide for Service Businesses', link: '/resources/keyword-research-guide', type: 'Guide' },
  ],
};

export function LocalSEOChecklistPage() {
  return <ResourcePageTemplate data={data} />;
}
