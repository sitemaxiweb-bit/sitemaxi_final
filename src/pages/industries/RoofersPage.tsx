import { IndustryPageTemplate, IndustryPageData } from './IndustryPageTemplate';

const data: IndustryPageData = {
  seo: {
    title: 'Digital Marketing for Roofers & Roofing Companies | SiteMaxi',
    description: 'Generate more roofing leads with local SEO and Google Ads. SiteMaxi helps Canadian roofing companies rank higher, get more calls, and win more bids.',
    keywords: 'roofing marketing, SEO for roofers, Google Ads roofing, roofing company marketing Canada, local SEO roofer',
  },
  hero: {
    label: 'Roofers & Roofing Companies',
    headline: 'Win more roofing jobs from homeowners in your area',
    subheadline: 'SiteMaxi helps roofing contractors rank at the top of Google, capture storm season demand, and generate a consistent pipeline of high-value jobs.',
  },
  painPoints: {
    title: 'What\'s holding your roofing business back',
    items: [
      'You\'re not showing up when homeowners search for roofers after a storm',
      'Competitors are capturing the storm damage surge before you can respond',
      'Estimating jobs but losing bids to competitors with a stronger online presence',
      'Seasonal dependence means revenue gaps during slow months',
      'Leads from ad services are shared with multiple competitors and overpriced',
      'Your website doesn\'t showcase your work or build enough trust to win premium jobs',
    ],
  },
  services: [
    {
      name: 'RankMaxi — Local SEO',
      description: 'Rank at the top of Google Maps and local search for roofing keywords so homeowners find you first — especially after weather events.',
      link: '/rankmaxi',
      color: '#1D4ED8',
      bg: '#DBEAFE',
    },
    {
      name: 'ClickMaxi — Google Ads',
      description: 'Rapid-response Google Ads campaigns that capture roofing demand during storm season and high-intent searches for roof replacement and repair.',
      link: '/clickmaxi',
      color: '#DC2626',
      bg: '#FEE2E2',
    },
    {
      name: 'SiteMaxi — Web Design',
      description: 'A professional roofing website with project galleries, financing information, and fast quote request forms that win homeowner trust immediately.',
      link: '/sitemaxi',
      color: '#7C3AED',
      bg: '#EDE9FE',
    },
  ],
  howWeHelp: {
    title: 'How SiteMaxi fills your roofing pipeline',
    description: 'We build a local digital presence that captures both urgent storm damage leads and planned roof replacement projects throughout the year.',
    items: [
      { title: 'Dominate Storm Season Searches', description: 'When weather strikes, homeowners search urgently. We build and activate your presence so you capture storm damage leads at the moment of highest intent.' },
      { title: 'Build a Premium Brand That Wins Bids', description: 'A portfolio-driven website with reviews, certifications, and clear service details positions you as the premium choice — not just the cheapest option.' },
      { title: 'Expand Your Service Area Coverage', description: 'City and neighbourhood-specific pages that extend your local SEO reach across your entire operating territory.' },
      { title: 'Generate Year-Round Maintenance Leads', description: 'Target homeowners interested in roof inspections, maintenance, and gutter cleaning to build revenue during the off-season.' },
    ],
  },
  approach: {
    seo: 'Local SEO for roofing keywords — repair, replacement, and inspection — across your full service territory.',
    ads: 'Google Ads optimized for seasonal demand surges and year-round roofing searches, scaled by weather events when needed.',
    website: 'A portfolio-focused roofing website with project photos, reviews, and clear service offerings that convert visitors into quote requests.',
    conversion: 'Fast quote forms, click-to-call buttons, and trust signals designed to convert urgent homeowners into booked inspections.',
  },
  results: {
    stats: [
      { value: '3x', label: 'More qualified leads' },
      { value: 'Top 3', label: 'Google Maps rankings' },
      { value: '60%', label: 'Of leads from organic search' },
      { value: '30 days', label: 'To first results' },
    ],
  },
  faqs: [
    { question: 'How do you capture storm damage leads quickly?', answer: 'We set up rapid-deployment ad campaigns that can be activated within hours of a weather event, combined with location-specific landing pages for storm damage that rank organically over time.' },
    { question: 'Can SEO compete with door-to-door sales after storms?', answer: 'Yes, and it builds longer lasting results. Many homeowners research online before calling anyone — even after speaking with a door-to-door representative. Having strong SEO means you\'re the name they find when they search.' },
    { question: 'How do you differentiate my roofing company from competitors online?', answer: 'We highlight your certifications, warranties, project portfolio, and customer reviews to position you as the premium, trustworthy choice. We don\'t compete on price — we compete on credibility.' },
    { question: 'What geographic territory can you cover?', answer: 'We create location-specific pages for every city, town, and neighbourhood within your service area, maximizing your local search footprint across your full territory.' },
    { question: 'How do you handle winter slowdowns?', answer: 'We build off-season campaigns targeting roof inspections, insurance claims follow-up, and spring preparation bookings that generate leads during traditionally slower months.' },
  ],
};

export function RoofersPage() {
  return <IndustryPageTemplate data={data} />;
}
