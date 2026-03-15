import { SEOHead } from '../../components/SEOHead';
import { IndustryPageTemplate, IndustryPageData } from './IndustryPageTemplate';

const data: IndustryPageData = {
  seo: {
    title: 'Digital Marketing for Dentists & Dental Clinics | SiteMaxi',
    description: 'Grow your dental practice with local SEO, Google Ads, and a high-converting website. SiteMaxi helps Canadian dentists attract more patients and fill appointment books.',
    keywords: 'dental marketing, SEO for dentists, Google Ads for dental clinics, dental practice marketing Canada, local SEO dentist',
  },
  hero: {
    label: 'Dentists & Dental Clinics',
    headline: 'Fill your appointment book with the right patients',
    subheadline: 'SiteMaxi helps dental practices dominate local search, run high-converting ads, and turn website visitors into booked appointments.',
  },
  painPoints: {
    title: 'The marketing challenges dental practices face',
    items: [
      'New patients can\'t find you when searching "dentist near me" on Google',
      'Competitors are outranking your clinic on Google Maps and local search',
      'Your website looks outdated and doesn\'t inspire patient trust',
      'You\'re spending on ads but not sure if they\'re actually bringing patients in',
      'Reviews are inconsistent and your online reputation needs work',
      'Staff spend too much time answering calls for basic scheduling questions',
    ],
  },
  services: [
    {
      name: 'RankMaxi — Local SEO',
      description: 'Rank at the top of Google when locals search for a dentist. We optimize your Google Business Profile, local citations, and on-page SEO to drive organic bookings.',
      link: '/rankmaxi',
      color: '#1D4ED8',
      bg: '#DBEAFE',
    },
    {
      name: 'ClickMaxi — Google Ads',
      description: 'Run targeted Google Ads campaigns for high-intent searches like "emergency dentist" or "dental implants near me" and capture patients ready to book.',
      link: '/clickmaxi',
      color: '#DC2626',
      bg: '#FEE2E2',
    },
    {
      name: 'SiteMaxi — Web Design',
      description: 'A professional, conversion-focused dental website that builds trust, showcases your services, and makes booking an appointment effortless.',
      link: '/sitemaxi',
      color: '#7C3AED',
      bg: '#EDE9FE',
    },
    {
      name: 'SearchMaxi — SEO',
      description: 'Rank for high-value terms like "dental implants", "invisalign", and "teeth whitening" to attract patients searching for premium treatments.',
      link: '/searchmaxi',
      color: '#0891B2',
      bg: '#CFFAFE',
    },
  ],
  howWeHelp: {
    title: 'How SiteMaxi grows your dental practice',
    description: 'We combine local SEO, paid search, and conversion optimization to fill your chair and grow your practice sustainably.',
    items: [
      { title: 'Dominate "Near Me" Searches', description: 'We optimize every local signal — Google Business Profile, NAP consistency, local citations — so you appear first when patients search for a dentist nearby.' },
      { title: 'Capture High-Intent Patients', description: 'Target patients actively searching for specific treatments like implants, orthodontics, or emergency care with precision Google Ads campaigns.' },
      { title: 'Build Instant Trust Online', description: 'A premium website with patient reviews, before/after galleries, and clear service pages positions you as the top choice in your city.' },
      { title: 'Convert Visitors Into Bookings', description: 'Strategic CTAs, online booking integration, and mobile-first design ensure every visitor has a frictionless path to becoming a patient.' },
    ],
  },
  approach: {
    seo: 'Local SEO to rank on Google Maps and organic results for dentist-related searches in your city.',
    ads: 'Google Ads targeting high-intent dental searches with campaigns optimized for cost-per-patient acquisition.',
    website: 'A professional dental website built to build trust and convert visitors into booked appointments.',
    conversion: 'Booking integrations, click-to-call buttons, and landing pages designed to maximize patient acquisition.',
  },
  results: {
    stats: [
      { value: '3x', label: 'Avg. increase in website leads' },
      { value: '#1', label: 'Google Maps rankings achieved' },
      { value: '60%', label: 'Reduction in cost-per-lead' },
      { value: '30 days', label: 'To see first results' },
    ],
    testimonial: {
      quote: 'Within 3 months we went from page 2 to the top of Google Maps. Our new patient inquiries nearly doubled and the quality of patients improved significantly.',
      author: 'Dr. Mehta',
      company: 'Family Dental Clinic, Toronto',
    },
  },
  faqs: [
    { question: 'How long does it take to rank on Google Maps?', answer: 'Most dental practices start seeing meaningful improvements in their Google Maps ranking within 60-90 days of starting local SEO. Initial momentum often comes from Google Business Profile optimizations, which can show results within the first 2-4 weeks.' },
    { question: 'What budget do I need for Google Ads?', answer: 'Dental Google Ads campaigns typically perform well starting at $1,500-$3,000/month in ad spend. We help you maximize every dollar by targeting high-intent searches and continuously optimizing your campaigns.' },
    { question: 'Can you help with patient reviews?', answer: 'Yes — we implement review generation systems that make it easy for satisfied patients to leave Google reviews, helping you build a strong online reputation over time.' },
    { question: 'Do you work with dental clinics across Canada?', answer: 'Absolutely. We work with dental practices in all major Canadian cities and markets. Our local SEO strategies are tailored to your specific city and competitive landscape.' },
    { question: 'What makes your dental marketing different?', answer: 'We specialize in service-based local businesses, so we understand the patient journey deeply. We don\'t offer cookie-cutter campaigns — every strategy is built around your specific practice, services, and growth goals.' },
  ],
};

export function DentistsPage() {
  return <IndustryPageTemplate data={data} />;
}
