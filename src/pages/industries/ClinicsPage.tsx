import { IndustryPageTemplate, IndustryPageData } from './IndustryPageTemplate';

const data: IndustryPageData = {
  seo: {
    title: 'Digital Marketing for Medical Clinics & Healthcare Providers | SiteMaxi',
    description: 'Grow your medical clinic with local SEO, Google Ads, and a professional healthcare website. SiteMaxi helps Canadian clinics attract more patients and build a trusted online presence.',
    keywords: 'medical clinic marketing, SEO for clinics, healthcare digital marketing Canada, clinic website design, patient acquisition marketing',
  },
  hero: {
    label: 'Medical Clinics & Healthcare',
    headline: 'Attract more patients and build a trusted healthcare brand',
    subheadline: 'SiteMaxi helps medical clinics, walk-in centres, and healthcare providers dominate local search, build patient trust online, and fill their appointment books.',
  },
  painPoints: {
    title: 'The marketing challenges clinics face',
    items: [
      'Patients can\'t find your clinic when searching for healthcare services nearby',
      'Competitors are ranking above you on Google Maps for key medical searches',
      'Your website doesn\'t convey the professionalism and trust patients expect',
      'New patient acquisition relies too heavily on word of mouth and referrals',
      'Managing your online reputation across multiple review platforms is time-consuming',
      'Healthcare advertising restrictions make it harder to run effective digital campaigns',
    ],
  },
  services: [
    {
      name: 'RankMaxi — Local SEO',
      description: 'Rank at the top of Google Maps and local search when patients look for clinics, walk-in centres, and healthcare services in your area.',
      link: '/rankmaxi',
      color: '#1D4ED8',
      bg: '#DBEAFE',
    },
    {
      name: 'SearchMaxi — SEO',
      description: 'Rank for condition-specific and service-specific searches that bring in patients looking for specialized care and treatments.',
      link: '/searchmaxi',
      color: '#0891B2',
      bg: '#CFFAFE',
    },
    {
      name: 'SiteMaxi — Web Design',
      description: 'A professional, patient-centered clinic website that builds trust, provides clear service information, and drives appointment bookings.',
      link: '/sitemaxi',
      color: '#7C3AED',
      bg: '#EDE9FE',
    },
  ],
  howWeHelp: {
    title: 'How SiteMaxi grows your patient base',
    description: 'We build a trusted digital presence that attracts new patients, showcases your expertise, and converts website visits into booked appointments.',
    items: [
      { title: 'Rank for Patient-Focused Searches', description: 'Optimize for how patients actually search — symptoms, conditions, and services — so you\'re found at the exact moment someone needs care.' },
      { title: 'Build Credibility and Trust Online', description: 'Provider profiles, patient reviews, accreditations, and service information that establish your clinic as the trusted, authoritative choice.' },
      { title: 'Simplify Patient Appointment Booking', description: 'Online booking integration, clear service pages, and mobile-optimized design that makes scheduling an appointment effortless.' },
      { title: 'Manage and Grow Your Online Reputation', description: 'Proactive review generation and reputation monitoring across Google, Healthgrades, and other healthcare review platforms.' },
    ],
  },
  approach: {
    seo: 'Local and condition-specific SEO to rank when patients search for healthcare services in your area.',
    ads: 'Compliant Google Ads campaigns targeting patients actively searching for your specific services and specialties.',
    website: 'A trustworthy, professional clinic website with provider bios, service pages, and seamless appointment booking.',
    conversion: 'Online booking integration, patient-friendly forms, and clear CTAs that turn website visitors into scheduled appointments.',
  },
  results: {
    stats: [
      { value: '2x', label: 'Increase in new patient inquiries' },
      { value: 'Top 3', label: 'Google Maps positions' },
      { value: '45%', label: 'More online appointment bookings' },
      { value: '60 days', label: 'To meaningful ranking improvements' },
    ],
  },
  faqs: [
    { question: 'Are there restrictions on healthcare advertising?', answer: 'Yes, healthcare advertising has specific guidelines on Google and Meta platforms. We\'re experienced working within healthcare advertising policies and build campaigns that are both compliant and effective.' },
    { question: 'How do you handle patient privacy in marketing?', answer: 'We never use patient data in marketing campaigns. All tracking and targeting is done through aggregated, anonymized audience signals and platform-level targeting — fully compliant with privacy regulations.' },
    { question: 'Can you help multiple locations?', answer: 'Absolutely. We build location-specific SEO and ads strategies for each clinic location, maximizing visibility for each individual site.' },
    { question: 'What healthcare specialties do you work with?', answer: 'We work with a wide range of healthcare providers including family medicine, walk-in clinics, chiropractic, physiotherapy, mental health, naturopathy, and more.' },
    { question: 'How long before we see more patient inquiries?', answer: 'Google Ads can drive inquiries within days. Local SEO typically shows measurable improvements in 60-90 days, with continued growth over the following months.' },
  ],
};

export function ClinicsPage() {
  return <IndustryPageTemplate data={data} />;
}
