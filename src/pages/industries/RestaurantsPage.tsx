import { IndustryPageTemplate, IndustryPageData } from './IndustryPageTemplate';

const data: IndustryPageData = {
  seo: {
    title: 'Digital Marketing for Restaurants & Food Businesses | SiteMaxi',
    description: 'Drive more foot traffic, reservations, and online orders with restaurant digital marketing. SiteMaxi helps Canadian restaurants grow with local SEO and social media.',
    keywords: 'restaurant marketing, SEO for restaurants, restaurant social media marketing, food business marketing Canada, local SEO restaurant',
  },
  hero: {
    label: 'Restaurants & Food Businesses',
    headline: 'Fill more tables and drive more orders',
    subheadline: 'SiteMaxi helps restaurants, cafes, and food businesses attract more hungry customers through local SEO, social media marketing, and a mouth-watering online presence.',
  },
  painPoints: {
    title: 'The marketing challenges restaurants face',
    items: [
      'New customers can\'t find you when searching for restaurants in your area',
      'Competitors are showing up first on Google Maps and food discovery apps',
      'Social media takes too much time and isn\'t converting into actual reservations',
      'Online reviews on Google and Yelp are mixed and hurting your reputation',
      'You\'re not capturing the lunch and dinner rush from nearby customers',
      'Your website is outdated and doesn\'t showcase your food and atmosphere',
    ],
  },
  services: [
    {
      name: 'RankMaxi — Local SEO',
      description: 'Rank at the top of Google Maps for "restaurants near me", cuisine-specific searches, and neighbourhood dining queries that bring in hungry locals.',
      link: '/rankmaxi',
      color: '#1D4ED8',
      bg: '#DBEAFE',
    },
    {
      name: 'SocialMaxi — Social Media',
      description: 'Engaging social media content that showcases your dishes, atmosphere, and events — building a loyal following that drives reservations and visits.',
      link: '/socialmaxi',
      color: '#059669',
      bg: '#D1FAE5',
    },
    {
      name: 'AdMaxi — Social Ads',
      description: 'Targeted Instagram and Facebook ad campaigns featuring your best dishes that reach hungry customers near your location at the right time.',
      link: '/admaxi',
      color: '#D97706',
      bg: '#FEF3C7',
    },
    {
      name: 'SiteMaxi — Web Design',
      description: 'A beautiful restaurant website with menus, online reservation booking, event information, and appetizing food photography.',
      link: '/sitemaxi',
      color: '#7C3AED',
      bg: '#EDE9FE',
    },
  ],
  howWeHelp: {
    title: 'How we fill your restaurant',
    description: 'We build a full digital presence that attracts new customers, builds a loyal following, and drives reservations and orders consistently.',
    items: [
      { title: 'Own Local Food Searches', description: 'Optimize your Google Business Profile and local SEO so you appear at the top of every relevant local food search — by cuisine, neighborhood, and occasion.' },
      { title: 'Make Food Look Irresistible Online', description: 'Social media content and website design that showcases your menu and ambiance in a way that makes people want to visit immediately.' },
      { title: 'Drive Reservations and Orders Directly', description: 'Reservation booking integration, online ordering links, and event promotion that converts social and search traffic directly into revenue.' },
      { title: 'Build a Loyal Customer Community', description: 'Consistent social media presence and email marketing that keeps your regulars engaged and encourages repeat visits and referrals.' },
    ],
  },
  approach: {
    seo: 'Local SEO targeting cuisine types, dining occasions, and neighbourhood searches to capture hungry nearby customers.',
    ads: 'Instagram and Facebook ads featuring appetizing food content targeted at local food lovers at meal times.',
    website: 'A visually stunning restaurant website with menus, reservation booking, and gallery that drives visits.',
    conversion: 'Reservation CTAs, online ordering integration, and event promotion designed to convert digital interest into physical visits.',
  },
  results: {
    stats: [
      { value: '3x', label: 'More Google Maps views' },
      { value: '45%', label: 'Increase in online reservations' },
      { value: '2x', label: 'Social media engagement growth' },
      { value: '30 days', label: 'To first measurable results' },
    ],
  },
  faqs: [
    { question: 'What\'s the most important marketing channel for a restaurant?', answer: 'Google Maps and local SEO are critical — most diners search "restaurants near me" before deciding where to eat. Paired with an active Instagram presence, these two channels drive the most consistent new customer acquisition.' },
    { question: 'How do you handle negative reviews?', answer: 'We can\'t remove negative reviews, but we help you respond professionally and generate a consistent stream of positive reviews that dilute negative ones. Reputation management is a key part of restaurant marketing.' },
    { question: 'Can you help promote special events and seasonal menus?', answer: 'Absolutely. We build event promotion campaigns, seasonal menu launches, and holiday reservation campaigns using social ads, Google Ads, and email marketing.' },
    { question: 'Do you help with delivery/takeout marketing?', answer: 'Yes — we build online ordering landing pages and ads specifically targeting takeout and delivery searches, capturing revenue from customers who want your food but can\'t dine in.' },
    { question: 'How important is food photography for social media?', answer: 'Extremely important. Great food photography is the foundation of restaurant social media marketing. We advise on photography requirements and can recommend photographers who specialize in food and restaurant content.' },
  ],
};

export function RestaurantsPage() {
  return <IndustryPageTemplate data={data} />;
}
