import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, ArrowRight, Search, ChevronRight } from 'lucide-react';
import { ScrollAnimateWrapper } from '../../components/ScrollAnimateWrapper';
import { SEOHead } from '../../components/SEOHead';
import { getLocationBySlug, getLocationPages } from './locationApi';
import type { LocationRecord, LocationPageRecord } from './types';
import { SERVICE_TYPES } from './types';

const CALENDAR_URL = 'https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ2m0vspPUrR0-YqZ4woobo35YfltXEIKt__2utprk-3OdzJy3Qk9mCNHtvzlEdxZC0Y34jiLzfF';

export function CityPage() {
  const { city } = useParams<{ city: string }>();
  const [location, setLocation] = useState<LocationRecord | null>(null);
  const [pages, setPages] = useState<LocationPageRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!city) return;
    Promise.all([
      getLocationBySlug(city),
    ]).then(([loc]) => {
      setLocation(loc);
      if (loc) {
        getLocationPages(loc.id).then(setPages);
      }
    }).finally(() => setLoading(false));
  }, [city]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#1D4ED8] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!location) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <h1 className="text-3xl font-bold text-[#111111] mb-4">City not found</h1>
        <p className="text-[#6B7280] mb-8">We couldn't find a page for this location.</p>
        <Link to="/locations" className="bg-[#1D4ED8] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#1E40AF] transition-colors">
          View All Locations
        </Link>
      </div>
    );
  }

  const allServiceTypes = Object.entries(SERVICE_TYPES);

  return (
    <>
      <SEOHead
        title={`Digital Marketing ${location.city}, ${location.province} | SiteMaxi`}
        description={`SiteMaxi provides local SEO, Google Ads, web design, and full-service digital marketing for businesses in ${location.city}, ${location.province_full}. Grow your ${location.city} business today.`}
        keywords={`digital marketing ${location.city}, SEO ${location.city}, Google Ads ${location.city}, web design ${location.city}, marketing agency ${location.province}`}
      />

      <section className="relative bg-white py-20 md:py-28 border-b border-gray-100 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#EFF6FF] via-white to-white pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6">
          <ScrollAnimateWrapper animation="fade-up">
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-flex items-center gap-1.5 bg-gray-100 text-[#374151] font-medium text-sm px-4 py-1.5 rounded-full mb-6">
                <MapPin className="w-3.5 h-3.5 text-[#1D4ED8]" />
                {location.city}, {location.province_full}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#111111] leading-tight mb-6">
                Digital marketing services in {location.city}
              </h1>
              <p className="text-xl text-[#6B7280] mb-10 max-w-2xl mx-auto leading-relaxed">
                SiteMaxi helps {location.city} businesses grow through local SEO, Google Ads, professional web design, and full-service digital marketing strategies that deliver real results.
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
            </div>
          </ScrollAnimateWrapper>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollAnimateWrapper animation="fade-up">
            <div className="text-center mb-12">
              <span className="text-[#1D4ED8] font-semibold text-sm uppercase tracking-widest">Services in {location.city}</span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#111111] mt-3 mb-4">
                What we do for {location.city} businesses
              </h2>
              <p className="text-[#6B7280] max-w-xl mx-auto">
                Every service is designed to help {location.city} businesses get found, get leads, and grow consistently.
              </p>
            </div>
          </ScrollAnimateWrapper>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allServiceTypes.map(([key, svc], i) => {
              const hasPage = pages.some((p) => p.service_type === key);
              return (
                <ScrollAnimateWrapper key={key} animation="fade-up" delay={i * 60}>
                  <Link
                    to={`/locations/${location.slug}/${key}`}
                    className="rounded-2xl p-7 border border-gray-100 hover:shadow-lg transition-all duration-300 flex flex-col group bg-white"
                  >
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                      style={{ backgroundColor: svc.bg }}
                    >
                      <MapPin className="w-5 h-5" style={{ color: svc.color }} />
                    </div>
                    <h3 className="text-lg font-bold text-[#111111] mb-2 group-hover:text-[#1D4ED8] transition-colors">
                      {svc.label} in {location.city}
                    </h3>
                    <p className="text-[#6B7280] text-sm leading-relaxed flex-1 mb-4">{svc.description}</p>
                    <div className="flex items-center gap-1.5 text-sm font-semibold transition-colors group-hover:gap-2.5" style={{ color: svc.color }}>
                      {hasPage ? 'View service page' : 'Learn more'}
                      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </Link>
                </ScrollAnimateWrapper>
              );
            })}
          </div>
        </div>
      </section>

      {location.nearby_cities.length > 0 && (
        <section className="py-16 bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-6">
            <ScrollAnimateWrapper animation="fade-up">
              <h2 className="text-2xl font-bold text-[#111111] mb-6">
                Nearby cities we also serve
              </h2>
            </ScrollAnimateWrapper>
            <div className="flex flex-wrap gap-3">
              {location.nearby_cities.map((citySlug, i) => (
                <ScrollAnimateWrapper key={citySlug} animation="fade-up" delay={i * 30}>
                  <Link
                    to={`/locations/${citySlug}`}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-100 hover:border-blue-200 hover:bg-blue-50 text-sm font-medium text-[#374151] hover:text-[#1D4ED8] transition-all"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    {citySlug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                  </Link>
                </ScrollAnimateWrapper>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-20 md:py-24 bg-[#0F172A]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <ScrollAnimateWrapper animation="fade-up">
            <span className="text-blue-400 font-semibold text-sm uppercase tracking-widest">Ready to Grow?</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-4 mb-6 leading-tight">
              Let's grow your {location.city} business
            </h2>
            <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
              Start with a free AI marketing audit to see exactly where your biggest opportunities are.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/free-seo-audit"
                className="bg-[#1D4ED8] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#2563EB] transition-colors flex items-center gap-2"
              >
                <Search className="w-5 h-5" />
                Get Free AI Marketing Audit
              </Link>
              <a
                href={CALENDAR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/20 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-colors flex items-center gap-2"
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
