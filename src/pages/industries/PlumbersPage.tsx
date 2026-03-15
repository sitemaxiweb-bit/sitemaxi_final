import { IndustryPageTemplate, IndustryPageData } from './IndustryPageTemplate';

const data: IndustryPageData = {
  seo: {
    title: 'Digital Marketing for Plumbers | SiteMaxi',
    description: 'Get more emergency calls and plumbing jobs with local SEO and Google Ads. SiteMaxi helps Canadian plumbers rank higher and grow their business consistently.',
    keywords: 'plumber marketing, SEO for plumbers, Google Ads plumbing, plumbing company marketing Canada, local SEO plumber',
  },
  hero: {
    label: 'Plumbers',
    headline: 'Be the first plumber customers call in a crisis',
    subheadline: 'SiteMaxi helps plumbing companies rank at the top of Google when homeowners need emergency repairs or scheduled plumbing work.',
  },
  painPoints: {
    title: 'What\'s holding your plumbing business back',
    items: [
      'Emergency calls go to competitors who show up higher on Google Maps',
      'You\'re not ranking for "plumber near me" or "emergency plumber" searches',
      'Seasonal slow periods leave crews without enough work',
      'Your website isn\'t mobile-optimized for urgent calls from phones',
      'Ad spend isn\'t generating enough quality leads to justify the cost',
      'Competitors with more reviews are consistently winning new customers',
    ],
  },
  services: [
    {
      name: 'RankMaxi — Local SEO',
      description: 'Rank at the top of Google Maps and local search so you capture emergency calls and scheduled jobs in your service area before competitors.',
      link: '/rankmaxi',
      color: '#1D4ED8',
      bg: '#DBEAFE',
    },
    {
      name: 'ClickMaxi — Google Ads',
      description: 'Instant visibility for high-intent searches like "emergency plumber" and "plumbing repair near me" — capturing customers at the moment they need help.',
      link: '/clickmaxi',
      color: '#DC2626',
      bg: '#FEE2E2',
    },
    {
      name: 'SiteMaxi — Web Design',
      description: 'A fast, mobile-first plumbing website with prominent phone numbers, service area pages, and easy booking forms.',
      link: '/sitemaxi',
      color: '#7C3AED',
      bg: '#EDE9FE',
    },
  ],
  howWeHelp: {
    title: 'How we generate consistent calls for plumbers',
    description: 'We build a multi-channel local presence that captures both emergency calls and planned plumbing projects year-round.',
    items: [
      { title: 'Win Emergency Searches', description: 'Emergency plumbing is the highest-value traffic. We ensure you rank at the top of Google Maps and search when people need urgent help.' },
      { title: 'Expand Your Service Area Coverage', description: 'We build location-specific landing pages for every neighbourhood and city you serve, multiplying your local search visibility.' },
      { title: 'Drive Immediate Calls', description: 'Google Ads with call-only campaigns and mobile-first landing pages deliver phone calls directly from people who need a plumber right now.' },
      { title: 'Build a Reputation That Wins Bids', description: 'Review generation, before/after project galleries, and trust signals that make you the obvious choice over competitors.' },
    ],
  },
  approach: {
    seo: 'Local SEO covering your full service area — including emergency, residential, and commercial plumbing keyword targets.',
    ads: 'Google Ads with call extensions and call-only campaigns targeted at emergency and high-intent plumbing searches.',
    website: 'A mobile-first website with click-to-call functionality, service pages, and fast load times for urgent visitors.',
    conversion: 'Every page is optimized to make calling or booking as easy as possible — especially for mobile users in an emergency.',
  },
  results: {
    stats: [
      { value: '3x', label: 'Increase in monthly calls' },
      { value: 'Top 3', label: 'Google Maps positions' },
      { value: '40%', label: 'Lower cost-per-call' },
      { value: '7 days', label: 'To first ad leads' },
    ],
  },
  faqs: [
    { question: 'How important are Google reviews for plumbers?', answer: 'Extremely important. Google Maps rankings are heavily influenced by review count and quality. We implement systems to consistently generate reviews from happy customers, which improves both your ranking and your conversion rate.' },
    { question: 'Should I focus on emergency plumbing or planned services in my ads?', answer: 'Both. Emergency plumbing captures the highest urgency, highest-value calls. We typically run separate campaigns for emergency and non-emergency to optimize for each type of customer.' },
    { question: 'How do you handle seasonal fluctuations?', answer: 'We adjust ad budgets seasonally, ramp up local SEO content ahead of peak periods, and build service area coverage so you\'re visible year-round, even during slower months.' },
    { question: 'What areas of Canada do you serve?', answer: 'We work with plumbing companies across all major Canadian cities and markets. Every campaign is geo-targeted to your specific service area.' },
    { question: 'Can you help me compete with larger plumbing companies?', answer: 'Absolutely. Local SEO is an equalizer — a well-optimized listing with strong reviews can outrank a large company with a generic strategy. We\'ve helped small plumbing companies beat bigger competitors consistently.' },
  ],
};

export function PlumbersPage() {
  return <IndustryPageTemplate data={data} />;
}
