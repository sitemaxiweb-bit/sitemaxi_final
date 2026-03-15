import { IndustryPageTemplate, IndustryPageData } from './IndustryPageTemplate';

const data: IndustryPageData = {
  seo: {
    title: 'Digital Marketing for Funeral Homes | SiteMaxi',
    description: 'Build a trusted online presence for your funeral home with compassionate digital marketing. SiteMaxi helps Canadian funeral homes attract families and grow their business with dignity.',
    keywords: 'funeral home marketing, SEO for funeral homes, funeral home website, funeral services marketing Canada, funeral director digital marketing',
  },
  hero: {
    label: 'Funeral Homes',
    headline: 'Be there for families when they need you most',
    subheadline: 'SiteMaxi helps funeral homes build a compassionate, trusted online presence that connects with families at their most difficult moments and supports your business growth.',
  },
  painPoints: {
    title: 'The marketing challenges funeral homes face',
    items: [
      'Families searching for funeral services can\'t find you in their moment of need',
      'Larger funeral home chains have significant marketing advantages',
      'Pre-planning leads are going to competitors with a stronger digital presence',
      'Your website doesn\'t convey the warmth and trust families need to feel',
      'Changing family expectations require new digital communication approaches',
      'Online reviews and reputation management feel sensitive to navigate',
    ],
  },
  services: [
    {
      name: 'RankMaxi — Local SEO',
      description: 'Rank at the top of Google when families search for funeral homes in your area — capturing both immediate need and pre-planning searches.',
      link: '/rankmaxi',
      color: '#1D4ED8',
      bg: '#DBEAFE',
    },
    {
      name: 'SiteMaxi — Web Design',
      description: 'A dignified, compassionate website that reflects your values, showcases your services, and provides clear information for families in need.',
      link: '/sitemaxi',
      color: '#7C3AED',
      bg: '#EDE9FE',
    },
    {
      name: 'SearchMaxi — SEO',
      description: 'Content strategy targeting pre-planning searches and helpful resources that connect with families before they\'re in immediate need.',
      link: '/searchmaxi',
      color: '#0891B2',
      bg: '#CFFAFE',
    },
  ],
  howWeHelp: {
    title: 'How we support your funeral home\'s growth',
    description: 'We build a respectful, compassionate digital presence that meets families where they are and helps your funeral home grow with dignity.',
    items: [
      { title: 'Be Found in Moments of Need', description: 'Families searching urgently for funeral services need to find you immediately. We ensure you\'re at the top of Google Maps and search for all relevant searches in your area.' },
      { title: 'Build Pre-Planning Visibility', description: 'Capture families planning ahead with content and SEO targeting pre-arrangement, funeral pre-planning, and legacy planning searches.' },
      { title: 'Convey Compassion and Trust Online', description: 'A website and digital presence that immediately communicates your warmth, experience, and commitment to serving families with care.' },
      { title: 'Grow Your Reputation Thoughtfully', description: 'Sensitive reputation management and review generation that builds a track record of compassionate service without feeling inappropriate.' },
    ],
  },
  approach: {
    seo: 'Local SEO targeting immediate need and pre-planning funeral searches in your service area.',
    ads: 'Compassionate Google Ads for families searching for funeral services, pre-planning, and grief resources.',
    website: 'A dignified website with clear service information, pricing transparency, and easy contact options for families.',
    conversion: 'Gentle, respectful contact forms and clear service information that makes reaching out easy for families in difficult moments.',
  },
  results: {
    stats: [
      { value: '2x', label: 'Increase in pre-planning inquiries' },
      { value: 'Top 3', label: 'Local Google Maps positions' },
      { value: '50%', label: 'Increase in website contact form submissions' },
      { value: '60 days', label: 'To meaningful results' },
    ],
  },
  faqs: [
    { question: 'How do you approach marketing for such a sensitive industry?', answer: 'We approach funeral home marketing with deep respect and care. All content, ads, and messaging are crafted to be compassionate and dignified — never pushy or transactional. We understand the unique emotional context of this industry.' },
    { question: 'Can you help with pre-planning marketing?', answer: 'Yes — pre-planning is a major growth area for funeral homes. We build dedicated content and landing pages targeting families who want to plan ahead, which captures leads earlier and at a lower cost than immediate-need marketing.' },
    { question: 'How do you handle online reviews for funeral homes?', answer: 'We implement a gentle, permission-based review generation process that encourages families who\'ve had a positive experience to share their thoughts — helping you build a credible online reputation over time.' },
    { question: 'Can you compete with large funeral home chains?', answer: 'Absolutely. Local SEO favors local businesses when properly optimized. We\'ve helped independent funeral homes rank above large chains by focusing on local relevance and genuine community connection.' },
    { question: 'What does a funeral home website need to include?', answer: 'Clear service descriptions, pricing information (increasingly expected by families), staff bios, online arrangement initiation, grief resources, and testimonials. We ensure your website provides everything families need during a difficult time.' },
  ],
};

export function FuneralHomesPage() {
  return <IndustryPageTemplate data={data} />;
}
