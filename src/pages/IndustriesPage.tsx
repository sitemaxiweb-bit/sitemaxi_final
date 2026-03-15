import {
  Hammer, Stethoscope, Scale, Scissors, Truck, Home, Leaf,
  ShoppingBag, Cpu, Users, ArrowRight, Search, CheckCircle,
  Wrench, Heart, Building, Car, Utensils, GraduationCap,
  Camera, Dumbbell
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { ScrollAnimateWrapper } from '../components/ScrollAnimateWrapper';
import { SEOHead } from '../components/SEOHead';

const CALENDAR_URL = "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ2m0vspPUrR0-YqZ4woobo35YfltXEIKt__2utprk-3OdzJy3Qk9mCNHtvzlEdxZC0Y34jiLzfF";

const localIndustries = [
  {
    icon: Hammer,
    name: 'Contractors & Trades',
    description: 'Plumbers, electricians, HVAC, roofers — we get you found when locals need you most.',
    services: ['RankMaxi', 'ClickMaxi', 'SiteMaxi'],
    link: '/industries/contractors',
  },
  {
    icon: Stethoscope,
    name: 'Dental & Medical',
    description: 'Clinics, dentists, chiropractors — build trust and fill your appointment book.',
    services: ['RankMaxi', 'SearchMaxi', 'SiteMaxi'],
    link: '/industries/dentists',
  },
  {
    icon: Scale,
    name: 'Law & Legal',
    description: 'Law firms and legal professionals ready to rank for high-value search terms.',
    services: ['SearchMaxi', 'ClickMaxi', 'SiteMaxi'],
    link: '/industries/lawyers',
  },
  {
    icon: Scissors,
    name: 'Salons & Med Spas',
    description: 'Beauty and aesthetic businesses that want steady bookings and a standout local presence.',
    services: ['RankMaxi', 'SocialMaxi', 'AdMaxi'],
    link: '/industries/med-spas',
  },
  {
    icon: Home,
    name: 'Real Estate',
    description: 'Agents and brokerages looking to dominate local search and generate quality leads.',
    services: ['RankMaxi', 'SearchMaxi', 'ClickMaxi'],
    link: '/industries/real-estate',
  },
  {
    icon: Truck,
    name: 'Moving & Logistics',
    description: 'Moving companies and logistics providers that need calls from local customers.',
    services: ['RankMaxi', 'ClickMaxi', 'SiteMaxi'],
    link: '/industries',
  },
  {
    icon: Utensils,
    name: 'Restaurants & Catering',
    description: 'Food businesses wanting more foot traffic, reservations, and online orders.',
    services: ['RankMaxi', 'SocialMaxi', 'AdMaxi'],
    link: '/industries/restaurants',
  },
  {
    icon: Dumbbell,
    name: 'Gyms & Fitness',
    description: 'Fitness studios, gyms, and personal trainers ready to grow their member base.',
    services: ['RankMaxi', 'SocialMaxi', 'AdMaxi'],
    link: '/industries',
  },
  {
    icon: Car,
    name: 'Auto Repair Shops',
    description: 'Dealerships, repair shops, and detailers looking to dominate local search.',
    services: ['RankMaxi', 'ClickMaxi', 'SiteMaxi'],
    link: '/industries/auto-repair',
  },
  {
    icon: Stethoscope,
    name: 'Clinics & Healthcare',
    description: 'Medical clinics, walk-in centres, and healthcare providers growing their patient base.',
    services: ['RankMaxi', 'SearchMaxi', 'SiteMaxi'],
    link: '/industries/clinics',
  },
  {
    icon: Wrench,
    name: 'HVAC & Plumbing',
    description: 'Heating, cooling, and plumbing businesses dominating emergency and planned service searches.',
    services: ['RankMaxi', 'ClickMaxi', 'SiteMaxi'],
    link: '/industries/hvac',
  },
  {
    icon: Home,
    name: 'Funeral Homes',
    description: 'Funeral homes building a trusted, compassionate online presence for families in need.',
    services: ['RankMaxi', 'SearchMaxi', 'SiteMaxi'],
    link: '/industries/funeral-homes',
  },
];

const ecommerceIndustries = [
  {
    icon: Leaf,
    name: 'Health & Wellness',
    description: 'Supplements, wellness products, and health brands growing online sales.',
    services: ['SearchMaxi', 'AdMaxi', 'ClickMaxi'],
    link: '/industries/ecommerce',
  },
  {
    icon: ShoppingBag,
    name: 'Fashion & Apparel',
    description: 'Clothing and accessories brands building an audience and driving purchases.',
    services: ['SocialMaxi', 'AdMaxi', 'SearchMaxi'],
    link: '/industries/ecommerce',
  },
  {
    icon: Cpu,
    name: 'Electronics & Tech',
    description: 'Consumer electronics and tech products competing in a high-intent search landscape.',
    services: ['ClickMaxi', 'SearchMaxi', 'SiteMaxi'],
    link: '/industries/ecommerce',
  },
  {
    icon: Home,
    name: 'Home & Garden',
    description: 'Home decor, furniture, and garden products driving revenue through SEO and ads.',
    services: ['SearchMaxi', 'AdMaxi', 'ClickMaxi'],
    link: '/industries/ecommerce',
  },
  {
    icon: Heart,
    name: 'Beauty & Skincare',
    description: 'Skincare, cosmetics, and beauty brands growing through content and paid social.',
    services: ['SocialMaxi', 'AdMaxi', 'SearchMaxi'],
    link: '/industries/ecommerce',
  },
  {
    icon: Utensils,
    name: 'Food & Beverage',
    description: 'Specialty food, beverage, and DTC brands scaling with e-commerce marketing.',
    services: ['AdMaxi', 'SearchMaxi', 'SocialMaxi'],
    link: '/industries/ecommerce',
  },
  {
    icon: Dumbbell,
    name: 'Sports & Fitness',
    description: 'Fitness equipment, activewear, and sports brands growing online revenue.',
    services: ['AdMaxi', 'SearchMaxi', 'ClickMaxi'],
    link: '/industries/ecommerce',
  },
  {
    icon: Building,
    name: 'B2B Products',
    description: 'B2B e-commerce and supply brands targeting business buyers online.',
    services: ['SearchMaxi', 'ClickMaxi', 'SiteMaxi'],
    link: '/industries/ecommerce',
  },
];

const serviceColors: Record<string, { color: string; bg: string }> = {
  RankMaxi: { color: '#1D4ED8', bg: '#DBEAFE' },
  SearchMaxi: { color: '#0891B2', bg: '#CFFAFE' },
  SocialMaxi: { color: '#059669', bg: '#D1FAE5' },
  AdMaxi: { color: '#D97706', bg: '#FEF3C7' },
  ClickMaxi: { color: '#DC2626', bg: '#FEE2E2' },
  SiteMaxi: { color: '#7C3AED', bg: '#EDE9FE' },
};

export function IndustriesPage() {
  return (
    <>
      <SEOHead
        title="Industries We Serve — Local Businesses & E-commerce | SiteMaxi"
        description="SiteMaxi serves local service businesses and e-commerce brands across Canada. Explore the industries we specialize in and how we drive growth for each."
        keywords="digital marketing for local businesses, e-commerce marketing agency, SEO for contractors, marketing for dental clinics, Shopify marketing agency"
      />

      <section className="bg-white py-20 md:py-24 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <ScrollAnimateWrapper animation="fade-up">
            <span className="text-[#1D4ED8] font-semibold text-sm uppercase tracking-widest">Industries</span>
            <h1 className="text-4xl md:text-6xl font-bold text-[#111111] mt-4 mb-6 leading-tight">
              We know your industry
            </h1>
            <p className="text-xl text-[#6B7280] max-w-3xl mx-auto mb-10">
              Generic marketing rarely works. We focus on two markets — local service businesses and e-commerce brands — and we go deep on both.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/free-seo-audit"
                className="bg-[#1D4ED8] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#1E40AF] transition-colors flex items-center gap-2"
              >
                <Search className="w-5 h-5" />
                Get Free AI Marketing Audit
              </Link>
              <a
                href={CALENDAR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-gray-200 text-[#374151] px-8 py-4 rounded-xl font-semibold hover:border-[#1D4ED8] hover:text-[#1D4ED8] transition-colors"
              >
                Book Strategy Call
              </a>
            </div>
          </ScrollAnimateWrapper>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollAnimateWrapper animation="fade-up">
            <div className="flex items-center gap-4 mb-12">
              <div className="w-14 h-14 bg-[#DBEAFE] rounded-2xl flex items-center justify-center">
                <Users className="w-7 h-7 text-[#1D4ED8]" />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#111111]">Local Service Businesses</h2>
                <p className="text-[#6B7280] mt-1">Dominate your city with local SEO, ads, and a website that converts</p>
              </div>
            </div>
          </ScrollAnimateWrapper>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {localIndustries.map((industry, index) => (
              <ScrollAnimateWrapper key={index} animation="fade-up" delay={index % 3 === 1 ? 100 : index % 3 === 2 ? 200 : 0}>
                <Link to={industry.link} className="block bg-white rounded-2xl p-7 border border-gray-100 hover:shadow-lg hover:border-blue-100 transition-all duration-300 h-full flex flex-col group">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
                    <industry.icon className="w-6 h-6 text-[#1D4ED8]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#111111] mb-2 group-hover:text-[#1D4ED8] transition-colors">{industry.name}</h3>
                  <p className="text-[#6B7280] text-sm leading-relaxed mb-5 flex-1">{industry.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {industry.services.map((s) => (
                      <span
                        key={s}
                        className="text-xs font-semibold px-2.5 py-1 rounded-full"
                        style={{ backgroundColor: serviceColors[s].bg, color: serviceColors[s].color }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <span className="text-[#1D4ED8] text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                    View strategy <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </ScrollAnimateWrapper>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollAnimateWrapper animation="fade-up">
            <div className="flex items-center gap-4 mb-12">
              <div className="w-14 h-14 bg-[#D1FAE5] rounded-2xl flex items-center justify-center">
                <ShoppingBag className="w-7 h-7 text-[#059669]" />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#111111]">E-commerce Brands</h2>
                <p className="text-[#6B7280] mt-1">Scale your online store with SEO, paid ads, and conversion optimization</p>
              </div>
            </div>
          </ScrollAnimateWrapper>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ecommerceIndustries.map((industry, index) => (
              <ScrollAnimateWrapper key={index} animation="fade-up" delay={index % 4 === 1 ? 100 : index % 4 === 2 ? 150 : index % 4 === 3 ? 200 : 0}>
                <Link to={industry.link} className="block bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg hover:border-green-100 transition-all duration-300 h-full flex flex-col group">
                  <div className="w-11 h-11 bg-green-50 rounded-xl flex items-center justify-center mb-4">
                    <industry.icon className="w-5 h-5 text-[#059669]" />
                  </div>
                  <h3 className="text-base font-bold text-[#111111] mb-2 group-hover:text-[#059669] transition-colors">{industry.name}</h3>
                  <p className="text-[#6B7280] text-xs leading-relaxed mb-4 flex-1">{industry.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {industry.services.map((s) => (
                      <span
                        key={s}
                        className="text-xs font-semibold px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: serviceColors[s].bg, color: serviceColors[s].color }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <span className="text-[#059669] text-xs font-semibold flex items-center gap-1">
                    View strategy <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              </ScrollAnimateWrapper>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollAnimateWrapper animation="fade-up">
            <div className="bg-white rounded-3xl p-10 md:p-14 border border-gray-100 shadow-sm">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <span className="text-[#1D4ED8] font-semibold text-sm uppercase tracking-widest">Our Approach</span>
                  <h2 className="text-3xl md:text-4xl font-bold text-[#111111] mt-3 mb-5 leading-tight">
                    Industry-specific strategy, not cookie-cutter marketing
                  </h2>
                  <p className="text-[#6B7280] leading-relaxed mb-6">
                    Every industry has different buying cycles, customer intent, and competitive dynamics. We build strategies that account for those differences — so your marketing actually resonates with the right audience.
                  </p>
                  <ul className="space-y-3">
                    {[
                      'Competitor analysis in your specific vertical',
                      'Keyword research tailored to your industry',
                      'Ad creative that speaks to your customer',
                      'Conversion flows designed for your buying journey',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-[#374151]">
                        <CheckCircle className="w-5 h-5 text-[#1D4ED8] mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-4">
                  <div className="bg-[#F0F9FF] rounded-2xl p-6 border border-blue-100">
                    <h3 className="font-bold text-[#111111] mb-2">Not sure which services fit your industry?</h3>
                    <p className="text-[#6B7280] text-sm mb-4">
                      Start with our free AI audit. It scans your site and tells you exactly what's holding you back and where to invest first.
                    </p>
                    <Link
                      to="/free-seo-audit"
                      className="inline-flex items-center gap-2 bg-[#1D4ED8] text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-[#1E40AF] transition-colors"
                    >
                      <Search className="w-4 h-4" />
                      Run Free Audit
                    </Link>
                  </div>
                  <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                    <h3 className="font-bold text-[#111111] mb-2">Prefer to talk first?</h3>
                    <p className="text-[#6B7280] text-sm mb-4">
                      Book a free 30-minute strategy call and we'll walk through your industry, competitors, and a custom growth plan.
                    </p>
                    <a
                      href={CALENDAR_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 border-2 border-[#1D4ED8] text-[#1D4ED8] px-6 py-3 rounded-xl font-semibold text-sm hover:bg-blue-50 transition-colors"
                    >
                      Book Strategy Call
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </ScrollAnimateWrapper>
        </div>
      </section>
    </>
  );
}
