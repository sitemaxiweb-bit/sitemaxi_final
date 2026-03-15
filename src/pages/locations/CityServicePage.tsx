import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getLocationPage, getLocations } from './locationApi';
import { LocationPageTemplate } from './LocationPageTemplate';
import type { LocationPageWithLocation, LocationRecord } from './types';
import { serviceContentTemplates } from './locationContent';
import { SEOHead } from '../../components/SEOHead';
import { Search, ArrowRight } from 'lucide-react';

const CALENDAR_URL = 'https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ2m0vspPUrR0-YqZ4woobo35YfltXEIKt__2utprk-3OdzJy3Qk9mCNHtvzlEdxZC0Y34jiLzfF';

export function CityServicePage() {
  const { city, service } = useParams<{ city: string; service: string }>();
  const [pageData, setPageData] = useState<LocationPageWithLocation | null>(null);
  const [allLocations, setAllLocations] = useState<LocationRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!city || !service) return;
    Promise.all([
      getLocationPage(city, service),
      getLocations(),
    ]).then(([page, locs]) => {
      setPageData(page);
      setAllLocations(locs);
    }).finally(() => setLoading(false));
  }, [city, service]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#1D4ED8] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (pageData) {
    const location = pageData.location;
    const nearbyCityPages = location.nearby_cities
      .map((nearbySlug) => {
        const nearbyLoc = allLocations.find((l) => l.slug === nearbySlug);
        if (!nearbyLoc) return null;
        return {
          city: nearbyLoc.city,
          slug: nearbyLoc.slug,
          serviceType: pageData.service_type,
          serviceLabel: pageData.service_label,
        };
      })
      .filter(Boolean) as { city: string; slug: string; serviceType: string; serviceLabel: string }[];

    return (
      <LocationPageTemplate
        location={location}
        page={pageData}
        nearbyCityPages={nearbyCityPages}
      />
    );
  }

  if (city && service && serviceContentTemplates[service]) {
    const template = serviceContentTemplates[service];
    const cityName = city.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    const province = 'Canada';

    const syntheticPage = {
      id: '',
      location_id: '',
      service_type: service,
      service_label: template.serviceLabel,
      slug: `${city}/${service}`,
      page_title: `${template.serviceLabel} ${cityName} | SiteMaxi`,
      meta_title: `${template.serviceLabel} Services in ${cityName} | SiteMaxi`,
      meta_description: `Expert ${template.serviceLabel.toLowerCase()} services for ${cityName} businesses. SiteMaxi helps local businesses grow with proven strategies.`,
      hero_headline: template.getHeroHeadline(cityName),
      hero_subheadline: template.getHeroSubheadline(cityName),
      intro_copy: template.getIntroCopy(cityName, province),
      why_us_copy: template.getWhyUsCopy(cityName, province),
      service_copy: template.getServiceCopy(cityName),
      custom_cta_text: '',
      faqs: template.getFaqs(cityName),
      related_industries: [],
      related_blog_posts: [],
      published: true,
      created_at: '',
      updated_at: '',
    };

    const syntheticLocation: LocationRecord = {
      id: '',
      city: cityName,
      province: 'CA',
      province_full: 'Canada',
      slug: city,
      region: null,
      population_tier: 'mid',
      nearby_cities: [],
      active: true,
    };

    return (
      <LocationPageTemplate
        location={syntheticLocation}
        page={syntheticPage}
        nearbyCityPages={[]}
      />
    );
  }

  return (
    <>
      <SEOHead
        title="Page Not Found | SiteMaxi"
        description="This location page could not be found."
        keywords=""
      />
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center py-28">
        <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Search className="w-8 h-8 text-[#1D4ED8]" />
        </div>
        <h1 className="text-3xl font-bold text-[#111111] mb-4">Location page not found</h1>
        <p className="text-[#6B7280] mb-8 max-w-md">
          We don't have a specific page for this location yet, but we do serve businesses across Canada. Start with a free audit to get started.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/free-seo-audit"
            className="bg-[#1D4ED8] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#1E40AF] transition-colors flex items-center gap-2"
          >
            <Search className="w-4 h-4" />
            Get Free AI Marketing Audit
          </Link>
          <Link
            to="/locations"
            className="border border-gray-200 text-[#374151] px-6 py-3 rounded-xl font-semibold hover:border-[#1D4ED8] hover:text-[#1D4ED8] transition-colors flex items-center gap-2"
          >
            View All Locations
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </>
  );
}
