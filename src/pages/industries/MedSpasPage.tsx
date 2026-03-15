import { IndustryPageTemplate, IndustryPageData } from './IndustryPageTemplate';

const data: IndustryPageData = {
  seo: {
    title: 'Digital Marketing for Med Spas & Aesthetic Clinics | SiteMaxi',
    description: 'Attract high-value aesthetic clients with local SEO, social ads, and a premium website. SiteMaxi helps Canadian med spas grow their client base and increase booking value.',
    keywords: 'med spa marketing, SEO for medical spas, aesthetic clinic marketing, botox marketing Canada, med spa digital marketing',
  },
  hero: {
    label: 'Med Spas & Aesthetic Clinics',
    headline: 'Attract premium clients and fill your treatment calendar',
    subheadline: 'SiteMaxi helps med spas and aesthetic clinics build a premium digital presence, attract the right clientele, and grow recurring revenue.',
  },
  painPoints: {
    title: 'The marketing challenges med spas face',
    items: [
      'Attracting the right high-value clients instead of bargain hunters',
      'Struggling to stand out in a competitive and growing aesthetic market',
      'Social media isn\'t converting followers into booked appointments',
      'Competitors with larger ad budgets are dominating Instagram and Google',
      'Your website doesn\'t reflect the premium quality of your services',
      'Building recurring client relationships beyond single visit bookings',
    ],
  },
  services: [
    {
      name: 'RankMaxi — Local SEO',
      description: 'Rank at the top of Google when potential clients search for Botox, fillers, laser treatments, and other aesthetic services in your area.',
      link: '/rankmaxi',
      color: '#1D4ED8',
      bg: '#DBEAFE',
    },
    {
      name: 'AdMaxi — Social Ads',
      description: 'Instagram and Facebook ad campaigns targeting your ideal aesthetic client demographic with stunning creative that showcases your results.',
      link: '/admaxi',
      color: '#D97706',
      bg: '#FEF3C7',
    },
    {
      name: 'SiteMaxi — Web Design',
      description: 'A luxurious, conversion-focused med spa website that reflects your brand\'s premium positioning and drives online bookings.',
      link: '/sitemaxi',
      color: '#7C3AED',
      bg: '#EDE9FE',
    },
    {
      name: 'SocialMaxi — Social Media',
      description: 'Strategic social media management that builds your aesthetic brand, showcases results, and drives a loyal following of potential clients.',
      link: '/socialmaxi',
      color: '#059669',
      bg: '#D1FAE5',
    },
  ],
  howWeHelp: {
    title: 'How we grow your med spa client base',
    description: 'We build a premium digital presence that attracts the right clients, builds trust, and converts interest into booked appointments.',
    items: [
      { title: 'Target High-Value Aesthetic Clients', description: 'Precise demographic and interest targeting on Meta platforms reaches clients with the income, interest, and intent to book premium aesthetic treatments.' },
      { title: 'Showcase Results That Convert', description: 'Before and after content, treatment spotlights, and client testimonials that demonstrate your expertise and convert curious browsers into committed clients.' },
      { title: 'Build a Premium Brand Online', description: 'Cohesive visual branding, luxury-aligned website design, and content strategy that positions your clinic above the competition.' },
      { title: 'Maximize Client Lifetime Value', description: 'Email marketing, loyalty programs, and treatment upsell campaigns that keep clients coming back and increase the value of every relationship.' },
    ],
  },
  approach: {
    seo: 'Local SEO targeting specific treatment searches — Botox, filler, laser, and more — in your city and surrounding areas.',
    ads: 'Meta and Google ad campaigns targeting high-value clients with visually stunning creative designed to inspire booking.',
    website: 'A premium, visually rich website that reflects your luxury positioning and drives seamless online booking.',
    conversion: 'Online booking integration, treatment-specific landing pages, and follow-up sequences that maximize booking conversions.',
  },
  results: {
    stats: [
      { value: '4x', label: 'Return on ad spend' },
      { value: '60%', label: 'Increase in new client bookings' },
      { value: '35%', label: 'Increase in avg. booking value' },
      { value: '30 days', label: 'To first measurable results' },
    ],
    testimonial: {
      quote: 'SiteMaxi transformed our digital presence. Our Instagram campaigns now consistently bring in high-value clients and our website finally matches the quality of our treatments.',
      author: 'Dr. Sophie Laurent',
      company: 'Éclat Aesthetic Studio, Montreal',
    },
  },
  faqs: [
    { question: 'What social platforms work best for med spas?', answer: 'Instagram is typically the highest-performing channel for med spas due to its visual nature and the high concentration of your target demographic. We often pair it with Facebook for broader reach and retargeting, plus Google for capturing search intent.' },
    { question: 'How do you ensure ad content meets platform guidelines?', answer: 'We\'re well-versed in Meta\'s advertising policies for medical and aesthetic content. We create compliant ad creative that still drives strong performance within the platform guidelines.' },
    { question: 'Can you help with before-and-after content strategy?', answer: 'Yes — we advise on best practices for before-and-after content across different platforms and help you build a content library that demonstrates results while staying compliant with advertising standards.' },
    { question: 'How do you attract premium clients vs. bargain hunters?', answer: 'We target by demographics, interests, and behaviors that indicate higher purchasing intent. The messaging, creative, and landing pages are designed to attract clients who value quality — not just the lowest price.' },
    { question: 'Do you help with online booking systems?', answer: 'We integrate with booking systems like Jane App, Mindbody, or others you already use, ensuring the path from ad click to booked appointment is completely seamless.' },
  ],
};

export function MedSpasPage() {
  return <IndustryPageTemplate data={data} />;
}
