import { IndustryPageTemplate, IndustryPageData } from './IndustryPageTemplate';

const data: IndustryPageData = {
  seo: {
    title: 'Digital Marketing for Real Estate Professionals | SiteMaxi',
    description: 'Generate more buyer and seller leads with local SEO, Google Ads, and a professional real estate website. SiteMaxi helps Canadian realtors and brokerages grow their business.',
    keywords: 'real estate marketing, SEO for realtors, Google Ads real estate, realtor digital marketing Canada, real estate agent website',
  },
  hero: {
    label: 'Real Estate Professionals',
    headline: 'Generate more buyer and seller leads in your market',
    subheadline: 'SiteMaxi helps real estate agents and brokerages dominate local search, attract qualified clients, and build a brand that wins listings.',
  },
  painPoints: {
    title: 'The marketing challenges realtors face',
    items: [
      'Competing against large brokerages and national portals for search visibility',
      'Generating consistent leads without relying entirely on referrals',
      'Building a personal brand that stands out in a crowded market',
      'Ad platforms are expensive and it\'s hard to get qualified buyer/seller leads',
      'Your website doesn\'t differentiate you from thousands of other agents',
      'Market slowdowns hit revenue hard without a diversified lead pipeline',
    ],
  },
  services: [
    {
      name: 'RankMaxi — Local SEO',
      description: 'Rank at the top of Google for real estate searches in your market — "homes for sale in [city]", "realtor near me", and neighbourhood-specific searches.',
      link: '/rankmaxi',
      color: '#1D4ED8',
      bg: '#DBEAFE',
    },
    {
      name: 'SearchMaxi — SEO',
      description: 'Build long-term organic visibility with neighbourhood guides, market reports, and real estate content that attracts buyers and sellers researching their next move.',
      link: '/searchmaxi',
      color: '#0891B2',
      bg: '#CFFAFE',
    },
    {
      name: 'ClickMaxi — Google Ads',
      description: 'Capture buyers and sellers actively searching for real estate help in your market with precision Google Ads campaigns.',
      link: '/clickmaxi',
      color: '#DC2626',
      bg: '#FEE2E2',
    },
    {
      name: 'SiteMaxi — Web Design',
      description: 'A professional real estate website with IDX integration, neighbourhood guides, and compelling agent profiles that build credibility and generate inquiries.',
      link: '/sitemaxi',
      color: '#7C3AED',
      bg: '#EDE9FE',
    },
  ],
  howWeHelp: {
    title: 'How SiteMaxi builds your real estate pipeline',
    description: 'We build a multi-channel lead generation system that attracts both buyers and sellers and positions you as the go-to agent in your market.',
    items: [
      { title: 'Own Neighbourhood-Level Search', description: 'Build hyper-local content and SEO for specific neighbourhoods, subdivisions, and communities where you want to be the go-to agent.' },
      { title: 'Attract Sellers With Market Authority', description: 'Market report content, sold data, and neighbourhood expertise content that positions you as the obvious choice for homeowners considering selling.' },
      { title: 'Capture Buyers Earlier in the Journey', description: 'Blog content, neighbourhood guides, and buyer resources that attract people in the research phase and nurture them to become clients.' },
      { title: 'Build a Personal Brand That Wins Listings', description: 'A professional, personality-driven digital presence that differentiates you from every other agent and makes you memorable.' },
    ],
  },
  approach: {
    seo: 'Neighbourhood and city-level SEO with market reports and local content that positions you as the area expert.',
    ads: 'Google Ads targeting buyer and seller searches with market-specific messaging and compelling offers.',
    website: 'A full-featured real estate website with IDX listings, neighbourhood content, and agent branding.',
    conversion: 'Lead capture forms, home valuation tools, and buyer guides that convert website visitors into qualified prospects.',
  },
  results: {
    stats: [
      { value: '3x', label: 'More qualified inquiries' },
      { value: 'Page 1', label: 'Google rankings in target markets' },
      { value: '40%', label: 'Of leads from organic search' },
      { value: '90 days', label: 'To ranking improvements' },
    ],
  },
  faqs: [
    { question: 'Can I compete with Realtor.ca and Zillow on Google?', answer: 'Yes — with the right strategy. We focus on long-tail, hyperlocal keywords (specific neighbourhoods, property types, price ranges) where you can rank competitively without going head-to-head with portals on broad terms.' },
    { question: 'What\'s the best lead generation approach for a realtor?', answer: 'The best approach combines local SEO for long-term organic leads, Google Ads for immediate volume, and content marketing (neighbourhood guides, market updates) for building authority and attracting seller leads.' },
    { question: 'Do you build IDX websites?', answer: 'Yes — we build real estate websites with MLS/IDX integration so your visitors can search active listings directly on your site, increasing engagement and time on site.' },
    { question: 'How do you target both buyers and sellers?', answer: 'We build separate strategies for each. Buyers are reached through listing searches and neighbourhood guides. Sellers are reached through market report content, home valuation landing pages, and targeted ads.' },
    { question: 'Can you help a team or brokerage?', answer: 'Absolutely. We build brokerage-level marketing systems as well as individual agent strategies, and we\'re experienced working within team structures.' },
  ],
};

export function RealEstatePage() {
  return <IndustryPageTemplate data={data} />;
}
