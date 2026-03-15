import { IndustryPageTemplate, IndustryPageData } from './IndustryPageTemplate';

const data: IndustryPageData = {
  seo: {
    title: 'Digital Marketing for Auto Repair Shops | SiteMaxi',
    description: 'Get more car repair bookings with local SEO and Google Ads. SiteMaxi helps Canadian auto repair shops rank higher, build trust, and generate consistent service bookings.',
    keywords: 'auto repair marketing, SEO for auto shops, Google Ads auto repair, car repair shop marketing Canada, local SEO mechanic',
  },
  hero: {
    label: 'Auto Repair Shops',
    headline: 'Be the first shop customers find when their car breaks down',
    subheadline: 'SiteMaxi helps auto repair shops, mechanics, and dealerships dominate local search and generate consistent bookings from drivers in your area.',
  },
  painPoints: {
    title: 'What\'s holding your auto shop back',
    items: [
      'Customers search "mechanic near me" and find your competitors instead',
      'Not showing up in Google Maps for oil changes, brakes, and other routine services',
      'Generating new customers beyond your existing loyal base is inconsistent',
      'Customers don\'t know the quality of your work until after their first visit',
      'Your shop lacks the online presence to compete with larger chains',
      'You have no way to market preventive services to existing customers',
    ],
  },
  services: [
    {
      name: 'RankMaxi — Local SEO',
      description: 'Rank at the top of Google Maps when drivers search for auto repair, oil changes, brakes, and more in your area.',
      link: '/rankmaxi',
      color: '#1D4ED8',
      bg: '#DBEAFE',
    },
    {
      name: 'ClickMaxi — Google Ads',
      description: 'Capture drivers actively searching for specific auto services — oil change, transmission, tires — with targeted Google Ads campaigns.',
      link: '/clickmaxi',
      color: '#DC2626',
      bg: '#FEE2E2',
    },
    {
      name: 'SiteMaxi — Web Design',
      description: 'A professional auto shop website with service listings, online booking, reviews, and trust signals that convert visitors into customers.',
      link: '/sitemaxi',
      color: '#7C3AED',
      bg: '#EDE9FE',
    },
  ],
  howWeHelp: {
    title: 'How we build a consistent booking pipeline',
    description: 'We build a local digital presence that keeps your bays full with new and returning customers throughout the year.',
    items: [
      { title: 'Dominate Service-Specific Searches', description: 'Rank for every service you offer — oil changes, brakes, tires, diagnostics — with dedicated service pages and local SEO optimized for each.' },
      { title: 'Build the Credibility to Win New Customers', description: 'Reviews, certifications, technician profiles, and service guarantees that give new customers confidence to choose your shop.' },
      { title: 'Capture Emergency Repair Searches', description: 'Be the first shop that appears when a driver has a breakdown or check engine light — the highest-urgency, highest-conversion scenario.' },
      { title: 'Market to Your Existing Customer Base', description: 'Email campaigns for maintenance reminders, seasonal services, and loyalty programs that keep customers coming back regularly.' },
    ],
  },
  approach: {
    seo: 'Local SEO for every auto service you offer, with service-specific pages and Google Maps optimization.',
    ads: 'Google Ads for both emergency and routine service searches, maximizing both immediate and planned service bookings.',
    website: 'A trust-building auto shop website with online booking, service menu, and customer reviews prominently featured.',
    conversion: 'Online booking integration, service estimate requests, and seasonal promotion campaigns that drive consistent bookings.',
  },
  results: {
    stats: [
      { value: '2.5x', label: 'More service bookings' },
      { value: 'Top 3', label: 'Google Maps rankings' },
      { value: '40%', label: 'More repeat customer visits' },
      { value: '30 days', label: 'To first results' },
    ],
  },
  faqs: [
    { question: 'What services should I prioritize in my local SEO?', answer: 'Start with high-volume service searches in your area — typically oil change, brakes, tires, and "mechanic near me." Then expand to cover your full service menu. We identify the highest-opportunity keywords for your specific market.' },
    { question: 'How do online reviews affect auto shop marketing?', answer: 'Reviews are critical. Drivers look at Google ratings before choosing a shop. We implement a systematic review generation process that builds your rating over time, improving both your Google Maps ranking and your conversion rate.' },
    { question: 'Can you help me compete with dealership service centres?', answer: 'Absolutely. Independent shops have advantages over dealerships — better prices, personal service, and faster turnaround. We help you communicate these advantages effectively to attract customers who are tired of dealership upsells.' },
    { question: 'How do I reach customers when their service is due?', answer: 'We help build email marketing systems that send service reminders based on last service date, mileage estimates, and seasonal timing — keeping your existing customers coming back.' },
    { question: 'Can I target specific vehicle makes and models?', answer: 'Yes — we can build targeted campaigns for specific makes or models if you specialize in certain vehicles, or target owners of high-maintenance vehicles that represent your best customers.' },
  ],
};

export function AutoRepairPage() {
  return <IndustryPageTemplate data={data} />;
}
