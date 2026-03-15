import { ResourcePageTemplate } from './ResourcePageTemplate';
import type { ResourcePageData } from './ResourcePageTemplate';

const data: ResourcePageData = {
  slug: 'small-business-playbook',
  title: 'Small Business Marketing Playbook: 90-Day Growth Plan',
  seoTitle: 'Small Business Marketing Playbook — 90-Day Growth Plan for Local Service Businesses',
  description: 'A complete 90-day marketing playbook for local service businesses covering SEO, Google Ads, social media, and reputation management.',
  seoDescription: 'Get the complete 90-day small business marketing playbook. A structured plan covering local SEO, Google Ads, social media, and review generation for service businesses in Canada.',
  keywords: 'small business marketing playbook, 90-day marketing plan, local business marketing strategy, marketing plan for service businesses, Canadian small business marketing',
  category: 'Local Business',
  categoryColor: '#1D4ED8',
  categoryBg: '#DBEAFE',
  type: 'Playbook',
  readTime: '30 min',
  lastUpdated: 'March 2025',
  heroSubtitle: 'A complete 90-day marketing playbook for local service businesses in Canada. Follow this structured plan to build a lead generation system that runs on all channels — SEO, paid ads, social media, and reputation management.',
  keyBenefits: [
    'Build a complete digital marketing foundation in the first 30 days',
    'Launch targeted Google Ads and Local SEO campaigns in days 31-60',
    'Scale and optimize what\'s working in the final 30 days',
    'Understand which channels drive the highest ROI for your service type',
    'Build a review and reputation system that works on autopilot',
    'Create a content strategy that generates leads for years',
  ],
  sections: [
    {
      heading: 'How to Use This Playbook',
      content: 'This playbook is designed to be executed over 90 days, starting from scratch or from an existing foundation. Each phase builds on the previous one. If you already have some elements in place (like a website), skip ahead and focus on what\'s missing. The goal is a complete, diversified lead generation system by day 90.',
    },
    {
      heading: 'Phase 1 (Days 1-30): Build the Foundation',
      content: 'You can\'t advertise your way out of a broken foundation. Phase 1 is about getting your core digital presence right.',
      items: [
        'Audit your current website: speed, mobile experience, conversion rate, and SEO',
        'Set up Google Analytics 4 and Google Search Console',
        'Claim and fully optimize your Google Business Profile',
        'Install call tracking software to attribute calls to marketing channels',
        'Identify your 10 most important service + location keyword combinations',
        'Create or improve service pages for each core service',
        'Set up review generation: create a review link, text past customers',
        'Create a simple email follow-up sequence for leads who don\'t convert immediately',
        'Build or fix your presence on the top 5 directories: Yelp, Yellow Pages, Bing, Apple Maps, BBB',
        'Define your target customer: who they are, what they search, why they choose you',
      ],
    },
    {
      heading: 'Phase 2 (Days 31-60): Launch Campaigns',
      content: 'With a solid foundation, you\'re ready to drive targeted traffic. This phase focuses on launching your first paid campaigns and expanding SEO.',
      items: [
        'Launch a Google Search campaign targeting your 10 highest-intent keywords',
        'Set up conversion tracking for calls and form fills',
        'Add negative keywords to prevent irrelevant clicks',
        'Create 2 blog posts per week targeting informational keywords in your niche',
        'Launch a Facebook/Instagram campaign targeting local homeowners or your target demographic',
        'Start a Google Posts schedule — 2 posts per week on your GBP',
        'Reach out to 5 complementary local businesses about referral partnerships',
        'Install a live chat or chatbot widget on your website for off-hours lead capture',
        'Build 10 new local citations on niche-relevant directories',
        'Send a "how we can help" email to your existing customer list',
      ],
    },
    {
      heading: 'Phase 3 (Days 61-90): Optimize and Scale',
      content: 'By day 60, you have data. Phase 3 is about using that data to double down on what works and cut what doesn\'t.',
      items: [
        'Review Google Ads performance: pause non-converting keywords, increase bids on winners',
        'Analyze your top organic landing pages — create supporting content to boost rankings',
        'Request reviews from all customers served during Phase 2',
        'Create a monthly reporting dashboard with KPIs: leads, cost per lead, revenue',
        'Test a new ad creative or landing page to improve conversion rate',
        'Expand Google Ads with new ad groups based on search term data',
        'Build 3-5 local backlinks from community sites, press, or partnerships',
        'Launch a referral program offering an incentive for customer referrals',
        'Plan next 90 days: which channels need more investment?',
        'Document what\'s working and create standard operating procedures for ongoing marketing',
      ],
    },
    {
      heading: 'Key Performance Indicators to Track',
      items: [
        'Monthly leads (calls + form fills + live chat inquiries)',
        'Cost per lead by channel (Google Ads vs. SEO vs. Social)',
        'Google Business Profile views and calls',
        'Organic search impressions and clicks (Google Search Console)',
        'Google Ads click-through rate and conversion rate',
        'Average Google review rating and total review count',
        'Website conversion rate (leads / visitors)',
        'Revenue attributed to each marketing channel',
      ],
    },
    {
      heading: 'Budget Allocation for Small Service Businesses',
      content: 'As a general guideline for a service business with a $2,000-$3,000/month marketing budget:',
      items: [
        '40% to Google Ads (immediate lead generation)',
        '25% to SEO services (long-term organic growth)',
        '20% to social media ads (brand awareness and remarketing)',
        '10% to website/conversion improvements',
        '5% to content creation and tools',
      ],
    },
  ],
  ctaHeading: 'Want our team to execute this playbook for you?',
  ctaText: 'SiteMaxi provides full-service marketing for local businesses in Canada — handling everything from Local SEO and Google Ads to social media and conversion optimization. Book a free strategy call to build your custom plan.',
  relatedResources: [
    { title: 'Local SEO Checklist for Service Businesses', link: '/resources/local-seo-checklist', type: 'Checklist' },
    { title: 'Google Ads Starter Guide', link: '/resources/google-ads-starter-guide', type: 'Guide' },
    { title: 'Meta Ads Guide for Local Businesses', link: '/resources/meta-ads-guide', type: 'Guide' },
  ],
};

export function SmallBusinessPlaybookPage() {
  return <ResourcePageTemplate data={data} />;
}
