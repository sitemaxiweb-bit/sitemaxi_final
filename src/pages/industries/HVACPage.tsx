import { IndustryPageTemplate, IndustryPageData } from './IndustryPageTemplate';

const data: IndustryPageData = {
  seo: {
    title: 'Digital Marketing for HVAC Companies | SiteMaxi',
    description: 'Grow your HVAC business with local SEO, Google Ads, and a converting website. SiteMaxi helps Canadian HVAC companies rank higher, get more calls, and fill their schedules.',
    keywords: 'HVAC marketing, SEO for HVAC companies, Google Ads HVAC, heating cooling marketing Canada, local SEO HVAC',
  },
  hero: {
    label: 'HVAC Companies',
    headline: 'Dominate local search and keep your trucks running',
    subheadline: 'SiteMaxi helps HVAC companies rank at the top of Google, capture seasonal demand peaks, and generate steady leads year-round.',
  },
  painPoints: {
    title: 'The challenges HVAC businesses face online',
    items: [
      'You\'re missing out on emergency calls because competitors rank higher on Google',
      'Seasonal demand spikes are hard to capture without a strong online presence',
      'Leads from ads aren\'t quality — too many tire kickers and price shoppers',
      'Your website isn\'t appearing for "AC repair near me" or "furnace installation" searches',
      'The off-season slows business significantly without a consistent lead pipeline',
      'Customers choose competitors based on reviews, not just price',
    ],
  },
  services: [
    {
      name: 'RankMaxi — Local SEO',
      description: 'Rank at the top of Google Maps for HVAC searches in your service area — capturing both planned installations and emergency repair calls.',
      link: '/rankmaxi',
      color: '#1D4ED8',
      bg: '#DBEAFE',
    },
    {
      name: 'ClickMaxi — Google Ads',
      description: 'Targeted campaigns for heating and cooling emergencies, seasonal maintenance, and installation projects that fill your schedule with high-value jobs.',
      link: '/clickmaxi',
      color: '#DC2626',
      bg: '#FEE2E2',
    },
    {
      name: 'SiteMaxi — Web Design',
      description: 'An HVAC website with service area coverage, financing information, and prominent calls-to-action that converts visitors into booked calls.',
      link: '/sitemaxi',
      color: '#7C3AED',
      bg: '#EDE9FE',
    },
  ],
  howWeHelp: {
    title: 'How we keep your HVAC business fully booked',
    description: 'We build systems that maximize visibility during peak seasons and maintain a steady lead flow during slower periods.',
    items: [
      { title: 'Capture Seasonal Demand Peaks', description: 'We ramp up your visibility before summer AC season and winter heating season so you capture the wave of demand at its peak.' },
      { title: 'Win Emergency HVAC Searches', description: 'When a furnace breaks down on a cold night, customers call whoever they find first. We make sure that\'s you.' },
      { title: 'Build Service Area Dominance', description: 'Location-specific pages for every city and neighbourhood you serve, creating a web of local SEO coverage across your full service area.' },
      { title: 'Maintenance Plan Lead Generation', description: 'Target homeowners looking for seasonal tune-ups and maintenance contracts — the most valuable long-term HVAC customers.' },
    ],
  },
  approach: {
    seo: 'Seasonal local SEO strategy covering emergency, installation, and maintenance keywords for your full service area.',
    ads: 'Google Ads campaigns segmented by season and service type — emergency, installation, and tune-up — for maximum efficiency.',
    website: 'A service-area-focused HVAC website with financing options, service pages, and seamless booking integration.',
    conversion: 'Seasonal landing pages, call extensions, and urgent CTAs designed to capture high-intent HVAC customers at peak moments.',
  },
  results: {
    stats: [
      { value: '2.5x', label: 'More calls during peak season' },
      { value: 'Top 3', label: 'Local pack rankings' },
      { value: '35%', label: 'Lower cost-per-lead' },
      { value: 'Year-round', label: 'Consistent lead flow' },
    ],
  },
  faqs: [
    { question: 'How do you handle seasonal peaks in HVAC marketing?', answer: 'We plan campaigns around your seasonal calendar — increasing ad spend before summer and winter peaks, launching seasonal content in advance, and ensuring your website is fully optimized for seasonal keywords before demand spikes.' },
    { question: 'Can you help me reduce reliance on slow seasons?', answer: 'Yes — we build maintenance plan campaigns, spring and fall tune-up promotions, and email/remarketing strategies that generate revenue during traditionally slower months.' },
    { question: 'How do you measure HVAC marketing ROI?', answer: 'We track phone calls, form submissions, and booked jobs attributed to each marketing channel. We provide full reports on cost-per-lead and campaign performance so you always know your return.' },
    { question: 'Can you target both residential and commercial HVAC?', answer: 'Absolutely. We build separate campaigns and landing pages for residential and commercial HVAC clients, each optimized for the specific needs of those buyers.' },
    { question: 'What geographic areas do you cover?', answer: 'We work with HVAC companies across all major Canadian cities and markets. Campaigns are geo-targeted precisely to your service territory.' },
  ],
};

export function HVACPage() {
  return <IndustryPageTemplate data={data} />;
}
