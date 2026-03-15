import { IndustryPageTemplate, IndustryPageData } from './IndustryPageTemplate';

const data: IndustryPageData = {
  seo: {
    title: 'Digital Marketing for Lawyers & Law Firms | SiteMaxi',
    description: 'Attract high-value legal clients with local SEO, Google Ads, and a professional law firm website. SiteMaxi helps Canadian lawyers rank higher and convert more leads.',
    keywords: 'law firm marketing, SEO for lawyers, Google Ads for law firms, legal marketing Canada, lawyer digital marketing',
  },
  hero: {
    label: 'Lawyers & Law Firms',
    headline: 'Rank for high-value legal searches and win more clients',
    subheadline: 'SiteMaxi helps law firms and solo practitioners dominate search results, attract qualified prospects, and convert them into paying clients.',
  },
  painPoints: {
    title: 'The marketing challenges law firms face',
    items: [
      'Competitors with bigger budgets are dominating Google and Google Ads',
      'Your website doesn\'t rank for practice area keywords in your city',
      'Potential clients can\'t find credible information about your firm online',
      'You\'re paying for leads that aren\'t qualified or relevant to your practice',
      'Your website looks outdated compared to top-ranked competitors',
      'You have no clear strategy to generate consistent client inquiries',
    ],
  },
  services: [
    {
      name: 'SearchMaxi — SEO',
      description: 'Rank for high-intent legal keywords like "personal injury lawyer Toronto" or "divorce attorney Vancouver" that bring in qualified client inquiries.',
      link: '/searchmaxi',
      color: '#0891B2',
      bg: '#CFFAFE',
    },
    {
      name: 'ClickMaxi — Google Ads',
      description: 'Capture clients actively searching for legal help with precision Google Ads campaigns targeting your practice areas and geography.',
      link: '/clickmaxi',
      color: '#DC2626',
      bg: '#FEE2E2',
    },
    {
      name: 'SiteMaxi — Web Design',
      description: 'A credibility-first law firm website that demonstrates expertise, showcases results, and drives consultation bookings.',
      link: '/sitemaxi',
      color: '#7C3AED',
      bg: '#EDE9FE',
    },
    {
      name: 'RankMaxi — Local SEO',
      description: 'Dominate local Google Maps results for your practice area so nearby clients choose you over competing firms.',
      link: '/rankmaxi',
      color: '#1D4ED8',
      bg: '#DBEAFE',
    },
  ],
  howWeHelp: {
    title: 'How SiteMaxi grows your law practice',
    description: 'We build legal marketing strategies that attract high-value cases and position your firm as the clear authority in your practice area.',
    items: [
      { title: 'Rank for High-Value Practice Areas', description: 'We target the most profitable keywords for your firm — practice area + city combinations that bring in qualified, high-intent inquiries.' },
      { title: 'Build Authority and Credibility Online', description: 'Content strategy, attorney bio optimization, and case result showcases that establish your firm as the go-to choice in your market.' },
      { title: 'Capture Urgent Legal Needs', description: 'Google Ads campaigns built for people who need legal help now — criminal defence, family law, accident claims — with rapid response landing pages.' },
      { title: 'Convert Inquiries Into Retained Clients', description: 'Consultation request forms, call tracking, and landing pages optimized to turn website visitors into booked consultations.' },
    ],
  },
  approach: {
    seo: 'Practice area and local SEO to rank for "lawyer near me" and specific legal service searches in your city.',
    ads: 'Google Ads targeting people actively searching for legal representation, with campaigns optimized for consultation bookings.',
    website: 'A professional law firm website that builds trust, showcases your expertise, and drives consultation requests.',
    conversion: 'Optimized contact forms, live chat integration, and clear CTAs designed to convert visitors into client inquiries.',
  },
  results: {
    stats: [
      { value: '4x', label: 'Increase in qualified inquiries' },
      { value: 'Page 1', label: 'Google rankings for practice areas' },
      { value: '45%', label: 'Lower cost-per-consultation' },
      { value: '30 days', label: 'To first measurable results' },
    ],
    testimonial: {
      quote: 'SiteMaxi helped us rank on the first page for our key practice areas. The quality of leads improved dramatically and we\'ve seen a significant increase in retained clients.',
      author: 'James Whitmore',
      company: 'Whitmore Family Law, Calgary',
    },
  },
  faqs: [
    { question: 'How competitive is legal SEO?', answer: 'Legal SEO is competitive, especially in major cities, but highly rewarding. We focus on targeted strategies — long-tail practice area keywords, local SEO, and content authority — that provide a clear path to page one rankings even in competitive markets.' },
    { question: 'What Google Ads budget works for a law firm?', answer: 'Legal is one of the higher CPC verticals on Google Ads. Effective campaigns typically start at $3,000-$5,000/month in ad spend. We focus on maximizing cost-per-consultation rather than volume of clicks.' },
    { question: 'How do you measure success for a law firm?', answer: 'We track consultation bookings, phone calls, and contact form submissions attributed to your marketing channels. We report on cost-per-lead and give you full visibility into what\'s working.' },
    { question: 'Can you help multiple practice areas?', answer: 'Absolutely. We build separate landing pages and ad campaigns for each practice area, ensuring each one is properly optimized to attract the right type of client.' },
    { question: 'Do you understand legal industry compliance?', answer: 'Yes — we\'re familiar with the advertising guidelines for legal professionals in Canada and ensure all marketing materials are appropriate and compliant.' },
  ],
};

export function LawyersPage() {
  return <IndustryPageTemplate data={data} />;
}
