import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, MapPin, CreditCard as Edit2, Trash2, Eye, Search, ChevronDown, Globe, ArrowLeft, X, Save, Check } from 'lucide-react';
import { ScrollAnimateWrapper } from '../components/ScrollAnimateWrapper';
import {
  adminGetAllLocations,
  adminGetAllLocationPages,
  upsertLocation,
  upsertLocationPage,
  deleteLocation,
  deleteLocationPage,
} from './locations/locationApi';
import type { LocationRecord, LocationPageRecord, LocationPageWithLocation } from './locations/types';
import { SERVICE_TYPES } from './locations/types';
import { serviceContentTemplates } from './locations/locationContent';

type Tab = 'locations' | 'pages';

interface LocationFormData {
  city: string;
  province: string;
  province_full: string;
  slug: string;
  region: string;
  population_tier: 'major' | 'mid' | 'small';
  nearby_cities: string;
  active: boolean;
}

interface PageFormData {
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
  faqs: string;
  published: boolean;
}

const PROVINCE_OPTIONS = [
  { value: 'BC', label: 'BC — British Columbia' },
  { value: 'AB', label: 'AB — Alberta' },
  { value: 'SK', label: 'SK — Saskatchewan' },
  { value: 'MB', label: 'MB — Manitoba' },
  { value: 'ON', label: 'ON — Ontario' },
  { value: 'QC', label: 'QC — Quebec' },
  { value: 'NS', label: 'NS — Nova Scotia' },
  { value: 'NB', label: 'NB — New Brunswick' },
  { value: 'NL', label: 'NL — Newfoundland' },
  { value: 'PE', label: 'PE — Prince Edward Island' },
];

const PROVINCE_FULL: Record<string, string> = {
  BC: 'British Columbia', AB: 'Alberta', SK: 'Saskatchewan', MB: 'Manitoba',
  ON: 'Ontario', QC: 'Quebec', NS: 'Nova Scotia', NB: 'New Brunswick',
  NL: 'Newfoundland', PE: 'Prince Edward Island',
};

function emptyLocationForm(): LocationFormData {
  return { city: '', province: 'BC', province_full: 'British Columbia', slug: '', region: '', population_tier: 'mid', nearby_cities: '', active: true };
}

function emptyPageForm(): PageFormData {
  return {
    location_id: '', service_type: 'local-seo', service_label: 'Local SEO',
    slug: '', page_title: '', meta_title: '', meta_description: '',
    hero_headline: '', hero_subheadline: '', intro_copy: '', why_us_copy: '',
    service_copy: '', custom_cta_text: '', faqs: '[]', published: true,
  };
}

export function AdminLocationsPage() {
  const [tab, setTab] = useState<Tab>('locations');
  const [locations, setLocations] = useState<LocationRecord[]>([]);
  const [pages, setPages] = useState<LocationPageWithLocation[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterProvince, setFilterProvince] = useState('');
  const [filterService, setFilterService] = useState('');

  const [showLocationForm, setShowLocationForm] = useState(false);
  const [showPageForm, setShowPageForm] = useState(false);
  const [editingLocation, setEditingLocation] = useState<LocationRecord | null>(null);
  const [editingPage, setEditingPage] = useState<LocationPageWithLocation | null>(null);
  const [locationForm, setLocationForm] = useState<LocationFormData>(emptyLocationForm());
  const [pageForm, setPageForm] = useState<PageFormData>(emptyPageForm());
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    try {
      const [locs, pgs] = await Promise.all([adminGetAllLocations(), adminGetAllLocationPages()]);
      setLocations(locs);
      setPages(pgs);
    } finally {
      setLoading(false);
    }
  }

  function openNewLocation() {
    setEditingLocation(null);
    setLocationForm(emptyLocationForm());
    setShowLocationForm(true);
    setError('');
  }

  function openEditLocation(loc: LocationRecord) {
    setEditingLocation(loc);
    setLocationForm({
      city: loc.city,
      province: loc.province,
      province_full: loc.province_full,
      slug: loc.slug,
      region: loc.region ?? '',
      population_tier: loc.population_tier,
      nearby_cities: loc.nearby_cities.join(', '),
      active: loc.active,
    });
    setShowLocationForm(true);
    setError('');
  }

  function openNewPage(locationId?: string) {
    setEditingPage(null);
    const form = emptyPageForm();
    if (locationId) form.location_id = locationId;
    setPageForm(form);
    setShowPageForm(true);
    setError('');
  }

  function openEditPage(page: LocationPageWithLocation) {
    setEditingPage(page);
    setPageForm({
      location_id: page.location_id,
      service_type: page.service_type,
      service_label: page.service_label,
      slug: page.slug,
      page_title: page.page_title,
      meta_title: page.meta_title,
      meta_description: page.meta_description,
      hero_headline: page.hero_headline,
      hero_subheadline: page.hero_subheadline,
      intro_copy: page.intro_copy,
      why_us_copy: page.why_us_copy,
      service_copy: page.service_copy,
      custom_cta_text: page.custom_cta_text,
      faqs: JSON.stringify(page.faqs, null, 2),
      published: page.published,
    });
    setShowPageForm(true);
    setError('');
  }

  function prefillPageFromTemplate() {
    const loc = locations.find((l) => l.id === pageForm.location_id);
    const tmpl = serviceContentTemplates[pageForm.service_type];
    if (!loc || !tmpl) return;
    const svcInfo = SERVICE_TYPES[pageForm.service_type];
    setPageForm((prev) => ({
      ...prev,
      service_label: svcInfo?.label ?? tmpl.serviceLabel,
      slug: `${loc.slug}/${pageForm.service_type}`,
      page_title: `${tmpl.serviceLabel} ${loc.city} | SiteMaxi`,
      meta_title: `${tmpl.serviceLabel} Services in ${loc.city}, ${loc.province} | SiteMaxi`,
      meta_description: `Expert ${tmpl.serviceLabel.toLowerCase()} services for ${loc.city} businesses. SiteMaxi helps local businesses grow with proven strategies that deliver real results.`,
      hero_headline: tmpl.getHeroHeadline(loc.city),
      hero_subheadline: tmpl.getHeroSubheadline(loc.city),
      intro_copy: tmpl.getIntroCopy(loc.city, loc.province_full),
      why_us_copy: tmpl.getWhyUsCopy(loc.city, loc.province_full),
      service_copy: tmpl.getServiceCopy(loc.city),
      faqs: JSON.stringify(tmpl.getFaqs(loc.city), null, 2),
    }));
  }

  async function saveLocation() {
    setError('');
    setSaving(true);
    try {
      const payload = {
        ...(editingLocation ? { id: editingLocation.id } : {}),
        city: locationForm.city,
        province: locationForm.province,
        province_full: PROVINCE_FULL[locationForm.province] || locationForm.province_full,
        slug: locationForm.slug || locationForm.city.toLowerCase().replace(/\s+/g, '-'),
        region: locationForm.region || null,
        population_tier: locationForm.population_tier,
        nearby_cities: locationForm.nearby_cities ? locationForm.nearby_cities.split(',').map((s) => s.trim()).filter(Boolean) : [],
        active: locationForm.active,
      };
      await upsertLocation(payload);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
      setShowLocationForm(false);
      loadData();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to save location');
    } finally {
      setSaving(false);
    }
  }

  async function savePage() {
    setError('');
    setSaving(true);
    try {
      let parsedFaqs = [];
      try {
        parsedFaqs = JSON.parse(pageForm.faqs);
      } catch {
        setError('FAQs must be valid JSON');
        setSaving(false);
        return;
      }
      const svcInfo = SERVICE_TYPES[pageForm.service_type];
      const payload = {
        ...(editingPage ? { id: editingPage.id } : {}),
        location_id: pageForm.location_id,
        service_type: pageForm.service_type,
        service_label: svcInfo?.label ?? pageForm.service_label,
        slug: pageForm.slug,
        page_title: pageForm.page_title,
        meta_title: pageForm.meta_title,
        meta_description: pageForm.meta_description,
        hero_headline: pageForm.hero_headline,
        hero_subheadline: pageForm.hero_subheadline,
        intro_copy: pageForm.intro_copy,
        why_us_copy: pageForm.why_us_copy,
        service_copy: pageForm.service_copy,
        custom_cta_text: pageForm.custom_cta_text,
        faqs: parsedFaqs,
        published: pageForm.published,
      };
      await upsertLocationPage(payload);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
      setShowPageForm(false);
      loadData();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to save page');
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteLocation(id: string) {
    await deleteLocation(id);
    setConfirmDelete(null);
    loadData();
  }

  async function handleDeletePage(id: string) {
    await deleteLocationPage(id);
    setConfirmDelete(null);
    loadData();
  }

  const filteredLocations = locations.filter((l) => {
    const q = search.toLowerCase();
    return (
      (!q || l.city.toLowerCase().includes(q) || l.province.toLowerCase().includes(q)) &&
      (!filterProvince || l.province === filterProvince)
    );
  });

  const filteredPages = pages.filter((p) => {
    const q = search.toLowerCase();
    return (
      (!q || p.location.city.toLowerCase().includes(q) || p.service_label.toLowerCase().includes(q)) &&
      (!filterProvince || p.location.province === filterProvince) &&
      (!filterService || p.service_type === filterService)
    );
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <ScrollAnimateWrapper animation="fade-up">
          <div className="flex items-center gap-4 mb-8">
            <Link to="/admin" className="p-2 rounded-lg hover:bg-gray-200 transition-colors">
              <ArrowLeft className="w-5 h-5 text-[#374151]" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-[#111111]">Location Pages</h1>
              <p className="text-[#6B7280] text-sm mt-0.5">Manage city-based local SEO landing pages</p>
            </div>
          </div>
        </ScrollAnimateWrapper>

        <div className="flex gap-1 mb-8 bg-white border border-gray-100 rounded-xl p-1 w-fit">
          <button
            onClick={() => setTab('locations')}
            className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-colors ${tab === 'locations' ? 'bg-[#1D4ED8] text-white' : 'text-[#374151] hover:bg-gray-100'}`}
          >
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Locations ({locations.length})
            </span>
          </button>
          <button
            onClick={() => setTab('pages')}
            className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-colors ${tab === 'pages' ? 'bg-[#1D4ED8] text-white' : 'text-[#374151] hover:bg-gray-100'}`}
          >
            <span className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Pages ({pages.length})
            </span>
          </button>
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          <div className="relative flex-1 min-w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
            <input
              type="text"
              placeholder={tab === 'locations' ? 'Search cities...' : 'Search pages...'}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#1D4ED8] bg-white"
            />
          </div>
          <div className="relative">
            <select
              value={filterProvince}
              onChange={(e) => setFilterProvince(e.target.value)}
              className="appearance-none pl-4 pr-9 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:border-[#1D4ED8] text-[#374151]"
            >
              <option value="">All Provinces</option>
              {PROVINCE_OPTIONS.map((p) => (
                <option key={p.value} value={p.value}>{p.value}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF] pointer-events-none" />
          </div>
          {tab === 'pages' && (
            <div className="relative">
              <select
                value={filterService}
                onChange={(e) => setFilterService(e.target.value)}
                className="appearance-none pl-4 pr-9 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:border-[#1D4ED8] text-[#374151]"
              >
                <option value="">All Services</option>
                {Object.entries(SERVICE_TYPES).map(([key, svc]) => (
                  <option key={key} value={key}>{svc.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF] pointer-events-none" />
            </div>
          )}
          <button
            onClick={tab === 'locations' ? openNewLocation : () => openNewPage()}
            className="flex items-center gap-2 bg-[#1D4ED8] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#1E40AF] transition-colors"
          >
            <Plus className="w-4 h-4" />
            {tab === 'locations' ? 'Add Location' : 'Add Page'}
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-8 h-8 border-2 border-[#1D4ED8] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : tab === 'locations' ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredLocations.map((loc) => {
              const cityPages = pages.filter((p) => p.location_id === loc.id);
              return (
                <div key={loc.id} className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-[#111111]">{loc.city}</h3>
                        {loc.population_tier === 'major' && (
                          <span className="text-xs bg-blue-50 text-[#1D4ED8] font-medium px-2 py-0.5 rounded-full">Major</span>
                        )}
                        {!loc.active && (
                          <span className="text-xs bg-gray-100 text-[#6B7280] font-medium px-2 py-0.5 rounded-full">Inactive</span>
                        )}
                      </div>
                      <p className="text-sm text-[#6B7280] mt-0.5">{loc.province_full}{loc.region ? ` · ${loc.region}` : ''}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Link
                        to={`/locations/${loc.slug}`}
                        target="_blank"
                        className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                        title="View city page"
                      >
                        <Eye className="w-4 h-4 text-[#6B7280]" />
                      </Link>
                      <button
                        onClick={() => openEditLocation(loc)}
                        className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <Edit2 className="w-4 h-4 text-[#6B7280]" />
                      </button>
                      <button
                        onClick={() => setConfirmDelete(`loc-${loc.id}`)}
                        className="p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-[#EF4444]" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[#9CA3AF] mb-3">
                    <span>/locations/{loc.slug}</span>
                    <span>·</span>
                    <span>{cityPages.length} pages</span>
                  </div>
                  <button
                    onClick={() => { setTab('pages'); setFilterProvince(loc.province); setSearch(loc.city); }}
                    className="text-xs text-[#1D4ED8] font-medium hover:underline flex items-center gap-1"
                  >
                    View {cityPages.length} service page{cityPages.length !== 1 ? 's' : ''}
                  </button>
                  <button
                    onClick={() => openNewPage(loc.id)}
                    className="ml-4 text-xs text-[#059669] font-medium hover:underline flex items-center gap-1 inline-flex"
                  >
                    <Plus className="w-3 h-3" /> Add page
                  </button>

                  {confirmDelete === `loc-${loc.id}` && (
                    <div className="mt-3 p-3 bg-red-50 rounded-xl border border-red-100">
                      <p className="text-xs text-[#DC2626] font-medium mb-2">Delete {loc.city} and all its pages?</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleDeleteLocation(loc.id)}
                          className="text-xs bg-[#DC2626] text-white px-3 py-1.5 rounded-lg font-medium"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => setConfirmDelete(null)}
                          className="text-xs bg-white border border-gray-200 text-[#374151] px-3 py-1.5 rounded-lg font-medium"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredPages.map((page) => {
              const svcInfo = SERVICE_TYPES[page.service_type];
              return (
                <div key={page.id} className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: svcInfo?.bg ?? '#F3F4F6' }}
                      >
                        <Globe className="w-4 h-4" style={{ color: svcInfo?.color ?? '#6B7280' }} />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-[#111111] truncate">
                            {page.service_label} {page.location.city}
                          </h3>
                          <span
                            className="text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0"
                            style={{ backgroundColor: svcInfo?.bg ?? '#F3F4F6', color: svcInfo?.color ?? '#6B7280' }}
                          >
                            {page.service_label}
                          </span>
                          {!page.published && (
                            <span className="text-xs bg-gray-100 text-[#6B7280] font-medium px-2 py-0.5 rounded-full">Draft</span>
                          )}
                        </div>
                        <p className="text-xs text-[#9CA3AF] truncate">/locations/{page.slug}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0 ml-4">
                      <Link
                        to={`/locations/${page.slug}`}
                        target="_blank"
                        className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                        title="View page"
                      >
                        <Eye className="w-4 h-4 text-[#6B7280]" />
                      </Link>
                      <button
                        onClick={() => openEditPage(page)}
                        className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <Edit2 className="w-4 h-4 text-[#6B7280]" />
                      </button>
                      <button
                        onClick={() => setConfirmDelete(`page-${page.id}`)}
                        className="p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-[#EF4444]" />
                      </button>
                    </div>
                  </div>
                  {confirmDelete === `page-${page.id}` && (
                    <div className="mt-3 p-3 bg-red-50 rounded-xl border border-red-100">
                      <p className="text-xs text-[#DC2626] font-medium mb-2">Delete this page?</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleDeletePage(page.id)}
                          className="text-xs bg-[#DC2626] text-white px-3 py-1.5 rounded-lg font-medium"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => setConfirmDelete(null)}
                          className="text-xs bg-white border border-gray-200 text-[#374151] px-3 py-1.5 rounded-lg font-medium"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {showLocationForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-end">
          <div className="bg-white w-full max-w-lg h-full overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
              <h2 className="font-bold text-[#111111]">{editingLocation ? 'Edit Location' : 'Add Location'}</h2>
              <button onClick={() => setShowLocationForm(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-5">
              {error && <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl px-4 py-3">{error}</div>}
              <div>
                <label className="block text-sm font-semibold text-[#111111] mb-1.5">City *</label>
                <input
                  type="text"
                  value={locationForm.city}
                  onChange={(e) => setLocationForm((p) => ({
                    ...p,
                    city: e.target.value,
                    slug: p.slug || e.target.value.toLowerCase().replace(/\s+/g, '-'),
                  }))}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1D4ED8]"
                  placeholder="e.g. Vancouver"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#111111] mb-1.5">Province *</label>
                  <select
                    value={locationForm.province}
                    onChange={(e) => setLocationForm((p) => ({ ...p, province: e.target.value, province_full: PROVINCE_FULL[e.target.value] ?? '' }))}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1D4ED8] bg-white"
                  >
                    {PROVINCE_OPTIONS.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#111111] mb-1.5">Tier</label>
                  <select
                    value={locationForm.population_tier}
                    onChange={(e) => setLocationForm((p) => ({ ...p, population_tier: e.target.value as 'major' | 'mid' | 'small' }))}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1D4ED8] bg-white"
                  >
                    <option value="major">Major</option>
                    <option value="mid">Mid</option>
                    <option value="small">Small</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#111111] mb-1.5">URL Slug *</label>
                <input
                  type="text"
                  value={locationForm.slug}
                  onChange={(e) => setLocationForm((p) => ({ ...p, slug: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1D4ED8] font-mono"
                  placeholder="e.g. vancouver"
                />
                <p className="text-xs text-[#9CA3AF] mt-1">/locations/{locationForm.slug || 'slug'}</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#111111] mb-1.5">Region</label>
                <input
                  type="text"
                  value={locationForm.region}
                  onChange={(e) => setLocationForm((p) => ({ ...p, region: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1D4ED8]"
                  placeholder="e.g. Lower Mainland, GTA"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#111111] mb-1.5">Nearby Cities</label>
                <input
                  type="text"
                  value={locationForm.nearby_cities}
                  onChange={(e) => setLocationForm((p) => ({ ...p, nearby_cities: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1D4ED8]"
                  placeholder="burnaby, surrey, richmond (comma-separated slugs)"
                />
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="active"
                  checked={locationForm.active}
                  onChange={(e) => setLocationForm((p) => ({ ...p, active: e.target.checked }))}
                  className="w-4 h-4 text-[#1D4ED8] rounded"
                />
                <label htmlFor="active" className="text-sm font-medium text-[#374151]">Active (visible on site)</label>
              </div>
              <button
                onClick={saveLocation}
                disabled={saving}
                className="w-full bg-[#1D4ED8] text-white py-3.5 rounded-xl font-semibold hover:bg-[#1E40AF] transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {saving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : saveSuccess ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                {saving ? 'Saving...' : 'Save Location'}
              </button>
            </div>
          </div>
        </div>
      )}

      {showPageForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-end">
          <div className="bg-white w-full max-w-2xl h-full overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
              <h2 className="font-bold text-[#111111]">{editingPage ? 'Edit Location Page' : 'Add Location Page'}</h2>
              <button onClick={() => setShowPageForm(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-5">
              {error && <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl px-4 py-3">{error}</div>}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#111111] mb-1.5">City *</label>
                  <select
                    value={pageForm.location_id}
                    onChange={(e) => setPageForm((p) => ({ ...p, location_id: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1D4ED8] bg-white"
                  >
                    <option value="">Select city...</option>
                    {locations.map((l) => <option key={l.id} value={l.id}>{l.city}, {l.province}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#111111] mb-1.5">Service *</label>
                  <select
                    value={pageForm.service_type}
                    onChange={(e) => setPageForm((p) => ({ ...p, service_type: e.target.value, service_label: SERVICE_TYPES[e.target.value]?.label ?? e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1D4ED8] bg-white"
                  >
                    {Object.entries(SERVICE_TYPES).map(([key, svc]) => <option key={key} value={key}>{svc.label}</option>)}
                  </select>
                </div>
              </div>

              {pageForm.location_id && pageForm.service_type && (
                <button
                  type="button"
                  onClick={prefillPageFromTemplate}
                  className="w-full border-2 border-dashed border-[#1D4ED8] text-[#1D4ED8] py-3 rounded-xl text-sm font-semibold hover:bg-blue-50 transition-colors"
                >
                  Auto-fill from template
                </button>
              )}

              <div>
                <label className="block text-sm font-semibold text-[#111111] mb-1.5">URL Slug *</label>
                <input
                  type="text"
                  value={pageForm.slug}
                  onChange={(e) => setPageForm((p) => ({ ...p, slug: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1D4ED8] font-mono"
                  placeholder="e.g. vancouver/local-seo"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#111111] mb-1.5">Page Title *</label>
                <input type="text" value={pageForm.page_title} onChange={(e) => setPageForm((p) => ({ ...p, page_title: e.target.value }))} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1D4ED8]" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#111111] mb-1.5">Meta Title</label>
                <input type="text" value={pageForm.meta_title} onChange={(e) => setPageForm((p) => ({ ...p, meta_title: e.target.value }))} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1D4ED8]" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#111111] mb-1.5">Meta Description</label>
                <textarea value={pageForm.meta_description} onChange={(e) => setPageForm((p) => ({ ...p, meta_description: e.target.value }))} rows={2} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1D4ED8] resize-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#111111] mb-1.5">Hero Headline *</label>
                <input type="text" value={pageForm.hero_headline} onChange={(e) => setPageForm((p) => ({ ...p, hero_headline: e.target.value }))} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1D4ED8]" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#111111] mb-1.5">Hero Subheadline</label>
                <textarea value={pageForm.hero_subheadline} onChange={(e) => setPageForm((p) => ({ ...p, hero_subheadline: e.target.value }))} rows={2} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1D4ED8] resize-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#111111] mb-1.5">Intro Copy</label>
                <textarea value={pageForm.intro_copy} onChange={(e) => setPageForm((p) => ({ ...p, intro_copy: e.target.value }))} rows={4} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1D4ED8] resize-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#111111] mb-1.5">Why Us Copy</label>
                <textarea value={pageForm.why_us_copy} onChange={(e) => setPageForm((p) => ({ ...p, why_us_copy: e.target.value }))} rows={3} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1D4ED8] resize-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#111111] mb-1.5">Service Copy</label>
                <textarea value={pageForm.service_copy} onChange={(e) => setPageForm((p) => ({ ...p, service_copy: e.target.value }))} rows={3} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1D4ED8] resize-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#111111] mb-1.5">Custom CTA Text</label>
                <input type="text" value={pageForm.custom_cta_text} onChange={(e) => setPageForm((p) => ({ ...p, custom_cta_text: e.target.value }))} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1D4ED8]" placeholder="Leave blank for default" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#111111] mb-1.5">FAQs (JSON)</label>
                <textarea value={pageForm.faqs} onChange={(e) => setPageForm((p) => ({ ...p, faqs: e.target.value }))} rows={8} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-xs font-mono focus:outline-none focus:border-[#1D4ED8] resize-none" />
                <p className="text-xs text-[#9CA3AF] mt-1">Format: {`[{"question": "...", "answer": "..."}, ...]`}</p>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="published"
                  checked={pageForm.published}
                  onChange={(e) => setPageForm((p) => ({ ...p, published: e.target.checked }))}
                  className="w-4 h-4 text-[#1D4ED8] rounded"
                />
                <label htmlFor="published" className="text-sm font-medium text-[#374151]">Published (live on site)</label>
              </div>
              <button
                onClick={savePage}
                disabled={saving}
                className="w-full bg-[#1D4ED8] text-white py-3.5 rounded-xl font-semibold hover:bg-[#1E40AF] transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {saving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : saveSuccess ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                {saving ? 'Saving...' : 'Save Page'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
