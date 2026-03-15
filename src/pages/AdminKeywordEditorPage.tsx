import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, TrendingUp, Plus, X } from 'lucide-react';
import {
  getKeywordById, createKeyword, updateKeyword, getClusters,
  KEYWORD_CATEGORIES, SERVICES, INDUSTRIES, CTA_TYPES,
  type Keyword, type KeywordCluster,
} from '../lib/keywordApi';

const STATUSES = [
  { value: 'new', label: 'New' },
  { value: 'queued', label: 'Queued' },
  { value: 'outline_ready', label: 'Outline Ready' },
  { value: 'draft_ready', label: 'Draft Ready' },
  { value: 'review_needed', label: 'Review Needed' },
  { value: 'approved', label: 'Approved' },
  { value: 'published', label: 'Published' },
];

const INTENTS = [
  { value: 'informational', label: 'Informational' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'navigational', label: 'Navigational' },
  { value: 'transactional', label: 'Transactional' },
];

const LOCATIONS = [
  'Vancouver', 'Surrey', 'Burnaby', 'Richmond', 'Coquitlam',
  'Langley', 'Abbotsford', 'Kelowna', 'Victoria', 'Calgary',
  'Edmonton', 'Toronto', 'Ottawa', 'Montreal', 'Canada',
];

export default function AdminKeywordEditorPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNew = id === 'new';

  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(!isNew);
  const [clusters, setClusters] = useState<KeywordCluster[]>([]);

  const [form, setForm] = useState<Partial<Keyword>>({
    keyword: '',
    category: 'seo',
    target_audience: 'local_business',
    search_intent: 'informational',
    service_relevance: [],
    industry_relevance: [],
    location_relevance: [],
    priority_score: 5,
    status: 'new',
    notes: '',
    assigned_article_title: '',
    cluster_id: null,
    business_type: 'both',
    monthly_search_volume: null,
    keyword_difficulty: null,
    source: 'manual',
  });

  useEffect(() => {
    getClusters().then(setClusters).catch(console.error);
    if (!isNew) {
      getKeywordById(id!).then((kw) => {
        if (kw) setForm(kw);
        setLoading(false);
      }).catch(() => setLoading(false));
    }
  }, [id]);

  function set(key: keyof Keyword, value: unknown) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function toggleArray(key: 'service_relevance' | 'industry_relevance' | 'location_relevance', val: string) {
    const arr = (form[key] || []) as string[];
    set(key, arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]);
  }

  async function handleSave() {
    if (!form.keyword?.trim()) return alert('Keyword is required');
    setSaving(true);
    try {
      if (isNew) {
        await createKeyword(form);
      } else {
        await updateKeyword(id!, form);
      }
      navigate('/admin/keywords');
    } catch (e: unknown) {
      alert((e as Error).message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/admin/keywords" className="text-gray-400 hover:text-gray-600 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="w-px h-5 bg-gray-200" />
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-gray-900">{isNew ? 'Add Keyword' : 'Edit Keyword'}</span>
            </div>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Saving...' : 'Save Keyword'}
          </button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-sm font-semibold text-gray-800 mb-4">Keyword Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Keyword *</label>
                  <input
                    type="text"
                    value={form.keyword || ''}
                    onChange={(e) => set('keyword', e.target.value)}
                    placeholder="e.g. local seo for dentists in Surrey"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">Monthly Searches</label>
                    <input
                      type="number"
                      value={form.monthly_search_volume ?? ''}
                      onChange={(e) => set('monthly_search_volume', e.target.value ? parseInt(e.target.value) : null)}
                      placeholder="e.g. 320"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">Keyword Difficulty (0-100)</label>
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={form.keyword_difficulty ?? ''}
                      onChange={(e) => set('keyword_difficulty', e.target.value ? parseInt(e.target.value) : null)}
                      placeholder="e.g. 42"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Assigned Article Title</label>
                  <input
                    type="text"
                    value={form.assigned_article_title || ''}
                    onChange={(e) => set('assigned_article_title', e.target.value)}
                    placeholder="e.g. 7 Local SEO Tips for Dental Practices in 2025"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Notes</label>
                  <textarea
                    value={form.notes || ''}
                    onChange={(e) => set('notes', e.target.value)}
                    rows={3}
                    placeholder="Research notes, content angle ideas, competitive insights..."
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Service / Industry / Location Tags */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-sm font-semibold text-gray-800 mb-4">Relevance Tags</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2">Services</label>
                  <div className="flex flex-wrap gap-2">
                    {SERVICES.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => toggleArray('service_relevance', s)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${(form.service_relevance || []).includes(s) ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300'}`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2">Industries</label>
                  <div className="flex flex-wrap gap-2">
                    {INDUSTRIES.map((ind) => (
                      <button
                        key={ind}
                        type="button"
                        onClick={() => toggleArray('industry_relevance', ind)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${(form.industry_relevance || []).includes(ind) ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300'}`}
                      >
                        {ind}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2">Locations</label>
                  <div className="flex flex-wrap gap-2">
                    {LOCATIONS.map((loc) => (
                      <button
                        key={loc}
                        type="button"
                        onClick={() => toggleArray('location_relevance', loc)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${(form.location_relevance || []).includes(loc) ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300'}`}
                      >
                        {loc}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h2 className="text-sm font-semibold text-gray-800 mb-4">Classification</h2>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Status</label>
                  <select value={form.status} onChange={(e) => set('status', e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    {STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Category</label>
                  <select value={form.category} onChange={(e) => set('category', e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    {KEYWORD_CATEGORIES.map((c) => <option key={c} value={c}>{c.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Search Intent</label>
                  <select value={form.search_intent} onChange={(e) => set('search_intent', e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    {INTENTS.map((i) => <option key={i.value} value={i.value}>{i.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Business Type</label>
                  <select value={form.business_type} onChange={(e) => set('business_type', e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="local">Local Business</option>
                    <option value="ecommerce">E-Commerce</option>
                    <option value="both">Both</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Target Audience</label>
                  <select value={form.target_audience} onChange={(e) => set('target_audience', e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="local_business">Local Business Owner</option>
                    <option value="ecommerce_owner">E-Commerce Owner</option>
                    <option value="marketing_manager">Marketing Manager</option>
                    <option value="general">General</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Priority Score (1-10)</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min={1}
                      max={10}
                      value={form.priority_score ?? 5}
                      onChange={(e) => set('priority_score', parseInt(e.target.value))}
                      className="flex-1"
                    />
                    <span className="w-6 text-center text-sm font-bold text-blue-600">{form.priority_score}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Cluster</label>
                  <select value={form.cluster_id || ''} onChange={(e) => set('cluster_id', e.target.value || null)} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">No cluster</option>
                    {clusters.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Source</label>
                  <select value={form.source} onChange={(e) => set('source', e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="manual">Manual Entry</option>
                    <option value="google_search_console">Google Search Console</option>
                    <option value="ahrefs">Ahrefs</option>
                    <option value="semrush">SEMrush</option>
                    <option value="google_keyword_planner">Google Keyword Planner</option>
                    <option value="client_brief">Client Brief</option>
                    <option value="competitor_analysis">Competitor Analysis</option>
                    <option value="api">API Import</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
