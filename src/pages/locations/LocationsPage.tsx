import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, Search, ChevronRight } from 'lucide-react';
import { ScrollAnimateWrapper } from '../../components/ScrollAnimateWrapper';
import { SEOHead } from '../../components/SEOHead';
import { getLocations } from './locationApi';
import type { LocationRecord } from './types';
import { SERVICE_TYPES, PROVINCE_ORDER } from './types';

const CALENDAR_URL = 'https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ2m0vspPUrR0-YqZ4woobo35YfltXEIKt__2utprk-3OdzJy3Qk9mCNHtvzlEdxZC0Y34jiLzfF';

const PROVINCE_NAMES: Record<string, string> = {
  BC: 'British Columbia',
  AB: 'Alberta',
  SK: 'Saskatchewan',
  MB: 'Manitoba',
  ON: 'Ontario',
  QC: 'Quebec',
  NS: 'Nova Scotia',
  NB: 'New Brunswick',
  NL: 'Newfoundland',
  PE: 'Prince Edward Island',
};

export function LocationsPage() {
  const [locations, setLocations] = useState<LocationRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeProvince, setActiveProvince] = useState<string>('ALL');

  useEffect(() => {
    getLocations()
      .then(setLocations)
      .finally(() => setLoading(false));
  }, []);

  const provinces = ['ALL', ...PROVINCE_ORDER.filter((p) =>
    locations.some((l) => l.province === p)
  )];

  const filtered = activeProvince === 'ALL'
    ? locations
    : locations.filter((l) => l.province === activeProvince);

  const byProvince: Record<string, LocationRecord[]> = {};
  filtered.forEach((loc) => {
    if (!byProvince[loc.province]) byProvince[loc.province] = [];
    byProvince[loc.province].push(loc);
  });

  const featuredServices = Object.entries(SERVICE_TYPES).slice(0, 4);

  return (
    <>
      <SEOHead
        title="Cities We Serve Across Canada | SiteMaxi Digital Marketing"
        description="SiteMaxi provides local SEO, Google Ads, web design, and digital marketing services to businesses across Canada. Find your city and start growing today."
        keywords="digital marketing Canada, local SEO Canada, Canadian marketing agency, SEO services BC Ontario Alberta, digital marketing Vancouver Toronto Calgary"
      />

      <section className="relative bg-white py-20 md:py-28 border-b border-gray-100 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#EFF6FF] via-white to-white pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <ScrollAnimateWrapper animation="fade-up">
            <span className="inline-block bg-[#DBEAFE] text-[#1D4ED8] font-semibold text-sm uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
              Serving Canada
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#111111] leading-tight mb-6">
              Digital marketing for Canadian businesses — everywhere
            </h1>
            <p className="text-xl text-[#6B7280] mb-10 max-w-2xl mx-auto leading-relaxed">
              From Vancouver to Halifax, SiteMaxi helps local businesses grow with local SEO, Google Ads, web design, and full-service digital marketing.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/free-seo-audit"
                className="bg-[#1D4ED8] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#1E40AF] transition-colors flex items-center gap-2 shadow-lg shadow-blue-100"
              >
                <Search className="w-5 h-5" />
                Get Free AI Marketing Audit
              </Link>
              <a
                href={CALENDAR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-gray-200 text-[#374151] px-8 py-4 rounded-xl font-semibold hover:border-[#1D4ED8] hover:text-[#1D4ED8] transition-colors flex items-center gap-2"
              >
                Book Strategy Call
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </ScrollAnimateWrapper>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollAnimateWrapper animation="fade-up">
            <div className="text-center mb-10">
              <span className="text-[#1D4ED8] font-semibold text-sm uppercase tracking-widest">Services Available</span>
              <h2 className="text-2xl md:text-3xl font-bold text-[#111111] mt-3 mb-2">
                Every service, every city
              </h2>
              <p className="text-[#6B7280]">Choose a service type to find city-specific landing pages</p>
            </div>
          </ScrollAnimateWrapper>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {Object.entries(SERVICE_TYPES).map(([key, svc], i) => (
              <ScrollAnimateWrapper key={key} animation="fade-up" delay={i * 50}>
                <Link
                  to={`/locations?service=${key}`}
                  className="rounded-xl p-5 border border-gray-100 hover:shadow-md transition-all duration-300 text-center group block bg-white"
                >
                  <div
                    className="w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center"
                    style={{ backgroundColor: svc.bg }}
                  >
                    <MapPin className="w-4 h-4" style={{ color: svc.color }} />
                  </div>
                  <div className="font-semibold text-sm text-[#111111] group-hover:text-[#1D4ED8] transition-colors">
                    {svc.label}
                  </div>
                  <div className="text-xs text-[#9CA3AF] mt-1">All cities</div>
                </Link>
              </ScrollAnimateWrapper>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollAnimateWrapper animation="fade-up">
            <div className="text-center mb-10">
              <span className="text-[#1D4ED8] font-semibold text-sm uppercase tracking-widest">Locations</span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#111111] mt-3 mb-2">
                Cities we serve across Canada
              </h2>
              <p className="text-[#6B7280] max-w-xl mx-auto">
                Click any city to see available services, or filter by province.
              </p>
            </div>
          </ScrollAnimateWrapper>

          <ScrollAnimateWrapper animation="fade-up" delay={50}>
            <div className="flex flex-wrap gap-2 justify-center mb-10">
              {provinces.map((p) => (
                <button
                  key={p}
                  onClick={() => setActiveProvince(p)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeProvince === p
                      ? 'bg-[#1D4ED8] text-white'
                      : 'bg-gray-100 text-[#374151] hover:bg-gray-200'
                  }`}
                >
                  {p === 'ALL' ? 'All Provinces' : p}
                </button>
              ))}
            </div>
          </ScrollAnimateWrapper>

          {loading ? (
            <div className="text-center py-16">
              <div className="inline-block w-8 h-8 border-2 border-[#1D4ED8] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="space-y-12">
              {PROVINCE_ORDER.filter((p) => byProvince[p]).map((province) => (
                <div key={province}>
                  <ScrollAnimateWrapper animation="fade-up">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-8 h-8 bg-[#DBEAFE] rounded-lg flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-[#1D4ED8]" />
                      </div>
                      <h3 className="text-xl font-bold text-[#111111]">
                        {PROVINCE_NAMES[province] || province}
                      </h3>
                      <span className="text-sm text-[#9CA3AF]">
                        {byProvince[province].length} {byProvince[province].length === 1 ? 'city' : 'cities'}
                      </span>
                    </div>
                  </ScrollAnimateWrapper>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {byProvince[province].map((loc, i) => (
                      <ScrollAnimateWrapper key={loc.id} animation="fade-up" delay={i * 40}>
                        <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 hover:shadow-md hover:border-blue-100 transition-all duration-300 group">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h4 className="font-bold text-[#111111] group-hover:text-[#1D4ED8] transition-colors">
                                {loc.city}
                              </h4>
                              <p className="text-xs text-[#9CA3AF] mt-0.5">{loc.province}{loc.region ? ` · ${loc.region}` : ''}</p>
                            </div>
                            {loc.population_tier === 'major' && (
                              <span className="text-xs bg-blue-50 text-[#1D4ED8] font-medium px-2 py-0.5 rounded-full">
                                Major
                              </span>
                            )}
                          </div>
                          <div className="space-y-1.5">
                            {featuredServices.map(([key, svc]) => (
                              <Link
                                key={key}
                                to={`/locations/${loc.slug}/${key}`}
                                className="flex items-center justify-between text-xs rounded-lg px-3 py-2 transition-colors hover:text-white group/item"
                                style={{
                                  backgroundColor: svc.bg,
                                  color: svc.color,
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.backgroundColor = svc.color;
                                  e.currentTarget.style.color = 'white';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.backgroundColor = svc.bg;
                                  e.currentTarget.style.color = svc.color;
                                }}
                              >
                                <span className="font-medium">{svc.label} {loc.city}</span>
                                <ChevronRight className="w-3 h-3" />
                              </Link>
                            ))}
                            <Link
                              to={`/locations/${loc.slug}`}
                              className="flex items-center justify-between text-xs rounded-lg px-3 py-2 bg-gray-100 text-[#374151] hover:bg-gray-200 transition-colors"
                            >
                              <span className="font-medium">All services in {loc.city}</span>
                              <ChevronRight className="w-3 h-3" />
                            </Link>
                          </div>
                        </div>
                      </ScrollAnimateWrapper>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-20 bg-[#0F172A]">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollAnimateWrapper animation="fade-up">
            <div className="text-center mb-14">
              <span className="text-blue-400 font-semibold text-sm uppercase tracking-widest">Why SiteMaxi</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-4">
                A Canadian agency built for Canadian businesses
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                We understand the way Canadians search, buy, and make decisions — and we build marketing strategies that reflect that.
              </p>
            </div>
          </ScrollAnimateWrapper>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Local market knowledge',
                desc: 'We know the competitive landscape, seasonal trends, and consumer behaviour in Canadian cities — not just the generic tactics that work anywhere.',
                color: '#1D4ED8',
                bg: '#1E3A8A',
              },
              {
                title: 'Full-service under one roof',
                desc: 'SEO, Google Ads, social media, and web design — all coordinated by one team, working together toward your growth goals.',
                color: '#059669',
                bg: '#064E3B',
              },
              {
                title: 'Transparent reporting',
                desc: 'Monthly reports show your rankings, leads, and ROI. No vanity metrics. No guesswork. Just clear data tied to business outcomes.',
                color: '#D97706',
                bg: '#78350F',
              },
            ].map((item, i) => (
              <ScrollAnimateWrapper key={i} animation="fade-up" delay={i * 100}>
                <div className="rounded-2xl p-8 border border-white/10 h-full"
                  style={{ backgroundColor: `${item.bg}33` }}>
                  <h3 className="text-white font-bold text-lg mb-3">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </ScrollAnimateWrapper>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <ScrollAnimateWrapper animation="fade-up">
            <span className="text-[#1D4ED8] font-semibold text-sm uppercase tracking-widest">Get Started</span>
            <h2 className="text-3xl md:text-5xl font-bold text-[#111111] mt-4 mb-6 leading-tight">
              Ready to grow your Canadian business?
            </h2>
            <p className="text-xl text-[#6B7280] mb-10 max-w-2xl mx-auto">
              Start with a free AI marketing audit. We'll show you exactly where your biggest opportunities are — no obligation.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/free-seo-audit"
                className="bg-[#1D4ED8] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#1E40AF] transition-colors flex items-center gap-2 shadow-lg shadow-blue-100"
              >
                <Search className="w-5 h-5" />
                Get Free AI Marketing Audit
              </Link>
              <a
                href={CALENDAR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-gray-200 text-[#374151] px-8 py-4 rounded-xl font-semibold hover:border-[#1D4ED8] hover:text-[#1D4ED8] transition-colors flex items-center gap-2"
              >
                Book Strategy Call
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </ScrollAnimateWrapper>
        </div>
      </section>
    </>
  );
}
