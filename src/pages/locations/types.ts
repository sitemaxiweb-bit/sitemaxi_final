export interface LocationRecord {
  id: string;
  city: string;
  province: string;
  province_full: string;
  slug: string;
  region: string | null;
  population_tier: 'major' | 'mid' | 'small';
  nearby_cities: string[];
  active: boolean;
}

export interface LocationPageRecord {
  id: string;
  location_id: string;
  service_type: string;
  service_label: string;
  slug: string;
  page_title: string;
  meta_title: string;
  meta_description: string;
  hero_headline: string;
  hero_subheadline: string;
  intro_copy: string;
  why_us_copy: string;
  service_copy: string;
  custom_cta_text: string;
  faqs: { question: string; answer: string }[];
  related_industries: string[];
  related_blog_posts: string[];
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface LocationPageWithLocation extends LocationPageRecord {
  location: LocationRecord;
}

export const SERVICE_TYPES: Record<string, { label: string; color: string; bg: string; link: string; description: string }> = {
  'local-seo': {
    label: 'Local SEO',
    color: '#1D4ED8',
    bg: '#DBEAFE',
    link: '/rankmaxi',
    description: 'Rank higher on Google Maps and in local search results',
  },
  'seo': {
    label: 'SEO',
    color: '#0891B2',
    bg: '#CFFAFE',
    link: '/searchmaxi',
    description: 'Grow organic traffic that converts into customers',
  },
  'google-ads': {
    label: 'Google Ads',
    color: '#DC2626',
    bg: '#FEE2E2',
    link: '/clickmaxi',
    description: 'Capture high-intent buyers with targeted paid search',
  },
  'web-design': {
    label: 'Web Design',
    color: '#7C3AED',
    bg: '#EDE9FE',
    link: '/sitemaxi',
    description: 'High-converting websites built for local businesses',
  },
  'digital-marketing': {
    label: 'Digital Marketing',
    color: '#059669',
    bg: '#D1FAE5',
    link: '/services',
    description: 'Full-service integrated marketing for consistent growth',
  },
  'social-media': {
    label: 'Social Media',
    color: '#D97706',
    bg: '#FEF3C7',
    link: '/socialmaxi',
    description: 'Social content, strategy and engagement that builds trust',
  },
};

export const PROVINCE_ORDER = ['BC', 'AB', 'SK', 'MB', 'ON', 'QC', 'NS', 'NB', 'NL', 'PE'];

export const INDUSTRY_LINKS: Record<string, string> = {
  contractors: '/industries/contractors',
  dentists: '/industries/dentists',
  lawyers: '/industries/lawyers',
  plumbers: '/industries/plumbers',
  hvac: '/industries/hvac',
  roofers: '/industries/roofers',
  'med-spas': '/industries/med-spas',
  clinics: '/industries/clinics',
  'real-estate': '/industries/real-estate',
  restaurants: '/industries/restaurants',
  'auto-repair': '/industries/auto-repair',
  ecommerce: '/industries/ecommerce',
};
