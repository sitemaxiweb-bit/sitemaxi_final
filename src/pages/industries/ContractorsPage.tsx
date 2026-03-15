import { IndustryPageTemplate, IndustryPageData } from './IndustryPageTemplate';

const data: IndustryPageData = {
  seo: {
    title: 'Digital Marketing for Contractors & Trades | SiteMaxi',
    description: 'Get more jobs and calls from local homeowners with local SEO, Google Ads, and a professional contractor website. SiteMaxi helps Canadian contractors grow consistently.',
    keywords: 'contractor marketing, SEO for contractors, Google Ads contractors, home services marketing Canada, local SEO trades',
  },
  hero: {
    label: 'Contractors & Trades',
    headline: 'Get found by homeowners ready to hire',
    subheadline: 'SiteMaxi helps general contractors, renovators, and trade professionals dominate local search and generate a steady flow of quality job leads.',
  },
  painPoints: {
    title: 'The marketing challenges contractors face',
    items: [
      'Work dries up seasonally because there\'s no steady pipeline of leads',
      'Competitors are showing up before you on Google and Google Maps',
      'Homeowners can\'t find your business when searching for your services',
      'Word of mouth alone isn\'t enough to keep your crew fully booked',
      'You tried running ads but didn\'t get calls worth the spend',
      'Your website looks unprofessional compared to larger competitors',
    ],
  },
  services: [
    {
      name: 'RankMaxi — Local SEO',
      description: 'Rank on Google Maps and local search results when homeowners search for contractors in your service area. We optimize every local signal to get you to the top.',
      link: '/rankmaxi',
      color: '#1D4ED8',
      bg: '#DBEAFE',
    },
    {
      name: 'ClickMaxi — Google Ads',
      description: 'Targeted Google Ads campaigns for "contractor near me", roofing, renovation, and service-specific searches that deliver ready-to-hire homeowners.',
      link: '/clickmaxi',
      color: '#DC2626',
      bg: '#FEE2E2',
    },
    {
      name: 'SiteMaxi — Web Design',
      description: 'A professional trades website with project galleries, service pages, and easy quote request forms that convert visitors into booked projects.',
      link: '/sitemaxi',
      color: '#7C3AED',
      bg: '#EDE9FE',
    },
  ],
  howWeHelp: {
    title: 'How SiteMaxi keeps your calendar full',
    description: 'We build lead generation systems that consistently bring in homeowners ready to start a project — so you\'re never worried about where the next job is coming from.',
    items: [
      { title: 'Show Up First on Google Maps', description: 'We optimize your Google Business Profile, build local citations, and manage your online presence so you appear at the top when homeowners search nearby.' },
      { title: 'Run Ads That Generate Real Calls', description: 'We build and manage Google Ads campaigns focused on cost-per-lead and lead quality — not just clicks. Every campaign targets homeowners actively looking to hire.' },
      { title: 'Build a Website That Wins Jobs', description: 'Showcase your best work, collect reviews, and make it easy for homeowners to request a quote. Your website becomes your best salesperson.' },
      { title: 'Track Every Lead and Dollar', description: 'Full reporting on where your leads come from, what they cost, and which campaigns are driving the most value — so you can invest with confidence.' },
    ],
  },
  approach: {
    seo: 'Local SEO targeting your service area so you appear on Google Maps and in search results when homeowners look for help.',
    ads: 'Google Ads driving immediate calls and quote requests from homeowners actively searching for your services.',
    website: 'A project-focused website with galleries, reviews, and quote forms that build trust and generate inquiries.',
    conversion: 'Click-to-call buttons, mobile optimization, and quote request forms designed to convert traffic into booked consultations.',
  },
  results: {
    stats: [
      { value: '2x', label: 'More leads monthly' },
      { value: 'Top 3', label: 'Google Maps positions' },
      { value: '50%', label: 'Reduction in slow season dip' },
      { value: '30 days', label: 'To first new leads' },
    ],
    testimonial: {
      quote: 'We used to rely purely on referrals. SiteMaxi set us up with local SEO and ads and now we get consistent calls from homeowners every week. Best investment we\'ve made in the business.',
      author: 'Mike Sanderson',
      company: 'Sanderson Renovations, Mississauga',
    },
  },
  faqs: [
    { question: 'How quickly can I start getting leads?', answer: 'Google Ads can deliver leads within days of launching. Local SEO takes longer — typically 60-90 days to see significant ranking improvements — but provides compounding returns over time. Most clients combine both.' },
    { question: 'What services do you cover for contractors?', answer: 'We work with all types of contractors and trades — general contractors, renovators, roofers, painters, flooring, plumbers, electricians, HVAC, landscapers, and more. Each campaign is tailored to your specific services.' },
    { question: 'Do I need a big marketing budget to get started?', answer: 'No. We can build effective local SEO and ad campaigns at various budget levels. We\'ll recommend the right approach based on your goals and market competitiveness.' },
    { question: 'Can you help me get more Google reviews?', answer: 'Yes — we implement review generation systems that make it easy for happy customers to leave reviews, which is critical for improving your Google Maps ranking and winning trust from new prospects.' },
    { question: 'Do you serve contractors across Canada?', answer: 'Yes. We work with contractors across all major Canadian markets. Every campaign is geo-targeted to your specific service area.' },
  ],
};

export function ContractorsPage() {
  return <IndustryPageTemplate data={data} />;
}
