import { ResourcePageTemplate } from './ResourcePageTemplate';
import type { ResourcePageData } from './ResourcePageTemplate';

const data: ResourcePageData = {
  slug: 'keyword-research-guide',
  title: 'Keyword Research Guide for Service Businesses',
  seoTitle: 'Keyword Research Guide for Service Businesses — Find Keywords That Bring Customers',
  description: 'How to find the keywords your customers actually use, including local intent keywords, service modifiers, and long-tail opportunities.',
  seoDescription: 'Learn how to do keyword research for a local service business. Find the exact keywords your customers search, target local intent terms, and build a content strategy around them.',
  keywords: 'keyword research guide, local SEO keywords, service business keywords, keyword research for service businesses, local intent keywords, SEO keyword strategy',
  category: 'SEO',
  categoryColor: '#0891B2',
  categoryBg: '#CFFAFE',
  type: 'Guide',
  readTime: '18 min',
  lastUpdated: 'March 2025',
  heroSubtitle: 'Keyword research is the foundation of every successful SEO strategy. This guide shows you exactly how to find the keywords your customers type into Google — from high-intent service terms to local modifiers and long-tail opportunities your competitors miss.',
  keyBenefits: [
    'Understand buyer intent and why it matters more than search volume',
    'Find the exact local keywords that drive calls and leads in your city',
    'Use free and paid tools to build a complete keyword list',
    'Map keywords to specific pages on your website',
    'Find long-tail opportunities your competitors are ignoring',
    'Build a prioritized list of keywords to target first',
  ],
  sections: [
    {
      heading: 'Why Keyword Research Matters',
      content: 'Bad keyword research means you rank for terms that never convert. Great keyword research means every page you create targets terms that your best customers actually use when they\'re ready to buy. For a local plumber, ranking #1 for "how pipes work" is useless. Ranking #1 for "emergency plumber Vancouver BC" is everything. This guide helps you find the latter.',
    },
    {
      heading: 'Step 1: Understand Keyword Intent',
      content: 'Every keyword has an intent — the reason behind the search. For service businesses, intent breaks into 4 types:',
      items: [
        'Transactional ("plumber near me", "HVAC installation cost Vancouver") — highest priority, these are ready-to-buy searches',
        'Commercial ("best plumber Surrey", "plumbing company reviews") — comparing options, close to buying',
        'Informational ("how to fix a leaky faucet", "what causes low water pressure") — research phase, good for blog content',
        'Navigational ("ABC Plumbing login") — searching for a specific business, lower value for new customers',
        'Focus 70% of your effort on transactional and commercial keywords first',
      ],
    },
    {
      heading: 'Step 2: Brainstorm Your Core Service Keywords',
      content: 'Start by listing every service you offer, then expand with modifiers.',
      items: [
        'List every service you offer (e.g., drain cleaning, water heater installation, pipe repair)',
        'Add location modifiers: city name, neighbourhood, "near me", "in [city]"',
        'Add urgency modifiers: "emergency", "same-day", "24-hour"',
        'Add qualifier modifiers: "licensed", "affordable", "best", "local"',
        'Add intent modifiers: "cost", "price", "quotes", "company", "services"',
        'Example: "emergency drain cleaning Vancouver" = service + urgency + location',
      ],
    },
    {
      heading: 'Step 3: Use Free Keyword Research Tools',
      content: 'You don\'t need expensive tools to do solid keyword research. Here are the best free options:',
      items: [
        'Google Search Autocomplete: type your service keyword and note the autocomplete suggestions',
        'Google "People Also Ask" boxes: scroll the search results for question-based keyword ideas',
        'Google Search Console: see what keywords your site already ranks for',
        'Google Keyword Planner (free with Google Ads account): get search volume estimates',
        'Ubersuggest free tier: keyword suggestions and basic competition data',
        'Answer The Public: visualize questions people ask around your topic',
        'Google Trends: compare keyword popularity over time and by region',
      ],
    },
    {
      heading: 'Step 4: Analyze Competitor Keywords',
      content: 'Your top-ranking competitors have already done keyword research. Use their rankings as a shortcut.',
      items: [
        'Search your most important keyword and note the top 3 ranking competitors',
        'Use Ubersuggest or Semrush free trial to see which keywords they rank for',
        'Look at their page titles and H1 tags — these reveal their target keywords',
        'Check their content structure for keyword ideas you haven\'t considered',
        'Find keywords they rank for that you don\'t — these are your gap opportunities',
      ],
    },
    {
      heading: 'Step 5: Evaluate Keywords by Priority',
      content: 'Not all keywords are equal. Prioritize based on these factors:',
      items: [
        'Intent: transactional > commercial > informational',
        'Search volume: higher volume = more potential traffic (but also more competition)',
        'Competition: new sites should target lower competition keywords first',
        'Local relevance: keywords with your city name are usually easier to rank for',
        'Business relevance: only target keywords for services you actually offer',
        'Use a scoring system: rate each keyword 1-5 on intent, volume, and competition',
      ],
    },
    {
      heading: 'Step 6: Map Keywords to Pages',
      content: 'Each page on your website should target one primary keyword and 3-5 related secondary keywords.',
      items: [
        'Homepage: your brand name + main service (e.g., "Vancouver Plumbing Company")',
        'Service pages: one page per service targeting specific service keywords',
        'Location pages: one page per city/area you serve targeting "[city] + [service]" keywords',
        'Blog posts: informational and long-tail keywords that support your service pages',
        'Never target the same keyword on multiple pages — this creates cannibalization',
        'Build an internal linking structure that passes authority from blogs to service pages',
      ],
    },
    {
      heading: 'Step 7: Build Your Target Keyword List',
      items: [
        'Create a spreadsheet with columns: Keyword, Intent, Monthly Search Volume, Competition, Priority, Target Page',
        'Start with 20-30 high-priority keywords for your core service pages',
        'Add 50+ long-tail keywords for blog content',
        'Review and update your keyword list every 3 months',
        'Track your rankings monthly using Google Search Console or a rank tracking tool',
        'Celebrate incremental wins — moving from page 3 to page 1 takes time but compounds',
      ],
    },
  ],
  ctaHeading: 'Want us to build your keyword strategy?',
  ctaText: 'Our RankMaxi SEO service includes complete keyword research, competitor analysis, and a content strategy mapped to your target keywords. Get a free audit to see your biggest ranking opportunities.',
  relatedResources: [
    { title: 'Local SEO Checklist for Service Businesses', link: '/resources/local-seo-checklist', type: 'Checklist' },
    { title: 'DIY Website SEO Audit Checklist', link: '/resources/seo-audit-checklist', type: 'Checklist' },
    { title: 'E-commerce SEO Checklist', link: '/resources/ecommerce-seo-checklist', type: 'Checklist' },
  ],
};

export function KeywordResearchGuidePage() {
  return <ResourcePageTemplate data={data} />;
}
