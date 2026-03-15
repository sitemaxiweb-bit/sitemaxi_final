import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Layers, Plus, X } from 'lucide-react';
import {
  getClusterById, createCluster, updateCluster,
  SERVICES, INDUSTRIES,
  type KeywordCluster,
} from '../lib/keywordApi';

const LOCATIONS = [
  'Vancouver', 'Surrey', 'Burnaby', 'Richmond', 'Coquitlam',
  'Langley', 'Abbotsford', 'Kelowna', 'Victoria', 'Calgary',
  'Edmonton', 'Toronto', 'Ottawa', 'Montreal', 'Canada',
];

export default function AdminClusterEditorPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNew = id === 'new';

  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(!isNew);

  const [form, setForm] = useState<Partial<KeywordCluster>>({
    name: '',
    main_keyword: '',
    supporting_keywords: [],
    service_association: [],
    industry_association: [],
    location_association: [],
    cluster_type: 'supporting',
    title_ideas: [],
    content_angle_ideas: [],
    intent_type: 'informational',
    suggested_cta_type: 'audit',
    notes: '',
  });

  const [kwInput, setKwInput] = useState('');
  const [titleInput, setTitleInput] = useState('');
  const [angleInput, setAngleInput] = useState('');

  useEffect(() => {
    if (!isNew) {
      getClusterById(id!).then((c) => {
        if (c) setForm(c);
        setLoading(false);
      }).catch(() => setLoading(false));
    }
  }, [id]);

  function set(key: keyof KeywordCluster, value: unknown) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function toggleArray(key: 'service_association' | 'industry_association' | 'location_association', val: string) {
    const arr = (form[key] || []) as string[];
    set(key, arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]);
  }

  function addToArray(key: 'supporting_keywords' | 'title_ideas' | 'content_angle_ideas', val: string) {
    if (!val.trim()) return;
    const arr = (form[key] || []) as string[];
    if (!arr.includes(val.trim())) set(key, [...arr, val.trim()]);
  }

  function removeFromArray(key: 'supporting_keywords' | 'title_ideas' | 'content_angle_ideas', val: string) {
    set(key, ((form[key] || []) as string[]).filter((x) => x !== val));
  }

  async function handleSave() {
    if (!form.name?.trim()) return alert('Cluster name is required');
    if (!form.main_keyword?.trim()) return alert('Main keyword is required');
    setSaving(true);
    try {
      if (isNew) {
        await createCluster(form);
      } else {
        await updateCluster(id!, form);
      }
      navigate('/admin/clusters');
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
            <Link to="/admin/clusters" className="text-gray-400 hover:text-gray-600 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="w-px h-5 bg-gray-200" />
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
                <Layers className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-gray-900">{isNew ? 'New Cluster' : 'Edit Cluster'}</span>
            </div>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Saving...' : 'Save Cluster'}
          </button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Core */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-sm font-semibold text-gray-800 mb-4">Cluster Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Cluster Name *</label>
                  <input
                    type="text"
                    value={form.name || ''}
                    onChange={(e) => set('name', e.target.value)}
                    placeholder="e.g. Local SEO for Healthcare"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Main Keyword *</label>
                  <input
                    type="text"
                    value={form.main_keyword || ''}
                    onChange={(e) => set('main_keyword', e.target.value)}
                    placeholder="e.g. local SEO for dentists"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Supporting Keywords */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Supporting Keywords</label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={kwInput}
                      onChange={(e) => setKwInput(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addToArray('supporting_keywords', kwInput); setKwInput(''); } }}
                      placeholder="Type keyword and press Enter"
                      className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => { addToArray('supporting_keywords', kwInput); setKwInput(''); }}
                      className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {(form.supporting_keywords || []).map((kw) => (
                      <span key={kw} className="flex items-center gap-1 text-xs bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full">
                        {kw}
                        <button type="button" onClick={() => removeFromArray('supporting_keywords', kw)} className="text-gray-400 hover:text-red-500">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Title Ideas */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Title Ideas</label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={titleInput}
                      onChange={(e) => setTitleInput(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addToArray('title_ideas', titleInput); setTitleInput(''); } }}
                      placeholder="Add a title idea and press Enter"
                      className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button type="button" onClick={() => { addToArray('title_ideas', titleInput); setTitleInput(''); }} className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-1">
                    {(form.title_ideas || []).map((t) => (
                      <div key={t} className="flex items-center justify-between text-xs bg-gray-50 rounded-lg px-3 py-2 border border-gray-100">
                        <span className="text-gray-700">{t}</span>
                        <button type="button" onClick={() => removeFromArray('title_ideas', t)} className="text-gray-400 hover:text-red-500 ml-2">
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Content Angles */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Content Angle Ideas</label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={angleInput}
                      onChange={(e) => setAngleInput(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addToArray('content_angle_ideas', angleInput); setAngleInput(''); } }}
                      placeholder="e.g. Compare local vs national agencies..."
                      className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button type="button" onClick={() => { addToArray('content_angle_ideas', angleInput); setAngleInput(''); }} className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-1">
                    {(form.content_angle_ideas || []).map((a) => (
                      <div key={a} className="flex items-center justify-between text-xs bg-gray-50 rounded-lg px-3 py-2 border border-gray-100">
                        <span className="text-gray-700">{a}</span>
                        <button type="button" onClick={() => removeFromArray('content_angle_ideas', a)} className="text-gray-400 hover:text-red-500 ml-2">
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Notes</label>
                  <textarea
                    value={form.notes || ''}
                    onChange={(e) => set('notes', e.target.value)}
                    rows={3}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Associations */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-sm font-semibold text-gray-800 mb-4">Associations</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2">Services</label>
                  <div className="flex flex-wrap gap-2">
                    {SERVICES.map((s) => (
                      <button key={s} type="button" onClick={() => toggleArray('service_association', s)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${(form.service_association || []).includes(s) ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300'}`}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2">Industries</label>
                  <div className="flex flex-wrap gap-2">
                    {INDUSTRIES.map((ind) => (
                      <button key={ind} type="button" onClick={() => toggleArray('industry_association', ind)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${(form.industry_association || []).includes(ind) ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300'}`}>
                        {ind}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2">Locations</label>
                  <div className="flex flex-wrap gap-2">
                    {LOCATIONS.map((loc) => (
                      <button key={loc} type="button" onClick={() => toggleArray('location_association', loc)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${(form.location_association || []).includes(loc) ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300'}`}>
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
              <h2 className="text-sm font-semibold text-gray-800 mb-4">Strategy Settings</h2>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Cluster Type</label>
                  <select value={form.cluster_type} onChange={(e) => set('cluster_type', e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="pillar">Pillar Page</option>
                    <option value="supporting">Supporting Page</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Primary Intent</label>
                  <select value={form.intent_type} onChange={(e) => set('intent_type', e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="informational">Informational</option>
                    <option value="commercial">Commercial</option>
                    <option value="mixed">Mixed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Suggested CTA Type</label>
                  <select value={form.suggested_cta_type} onChange={(e) => set('suggested_cta_type', e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="audit">Free SEO Audit</option>
                    <option value="strategy_call">Book Strategy Call</option>
                    <option value="contact">Contact Form</option>
                    <option value="resource">Resource Download</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl border border-blue-100 p-4">
              <p className="text-xs font-semibold text-blue-800 mb-1">How clusters work</p>
              <p className="text-xs text-blue-700 leading-relaxed">
                A <strong>pillar</strong> cluster represents a broad topic. Supporting keywords become blog posts that all link back to the pillar, building topical authority.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
