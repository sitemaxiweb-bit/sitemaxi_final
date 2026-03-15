import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Search, Filter, Tag, TrendingUp, CreditCard as Edit2, Trash2, ChevronDown, X, ArrowLeft, BarChart2, Star } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { getKeywords, deleteKeyword, updateKeyword, getKeywordStats, KEYWORD_CATEGORIES, type Keyword, type KeywordStatus } from '../lib/keywordApi';

const STATUS_CONFIG: Record<KeywordStatus, { label: string; color: string; bg: string }> = {
  new: { label: 'New', color: 'text-slate-600', bg: 'bg-slate-100' },
  queued: { label: 'Queued', color: 'text-blue-600', bg: 'bg-blue-50' },
  outline_ready: { label: 'Outline Ready', color: 'text-amber-600', bg: 'bg-amber-50' },
  draft_ready: { label: 'Draft Ready', color: 'text-orange-600', bg: 'bg-orange-50' },
  review_needed: { label: 'Review Needed', color: 'text-rose-600', bg: 'bg-rose-50' },
  approved: { label: 'Approved', color: 'text-emerald-600', bg: 'bg-emerald-50' },
  published: { label: 'Published', color: 'text-green-700', bg: 'bg-green-100' },
};

export default function AdminKeywordsPage() {
  const navigate = useNavigate();
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<{ total: number; byStatus: Record<string, number>; byCategory: Record<string, number> } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterBusiness, setFilterBusiness] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, [filterStatus, filterCategory, filterBusiness]);

  async function loadData() {
    setLoading(true);
    try {
      const [kws, s] = await Promise.all([
        getKeywords({ status: filterStatus || undefined, category: filterCategory || undefined, business_type: filterBusiness || undefined }),
        getKeywordStats(),
      ]);
      setKeywords(kws);
      setStats(s);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this keyword?')) return;
    setDeleting(id);
    try {
      await deleteKeyword(id);
      setKeywords((prev) => prev.filter((k) => k.id !== id));
      if (stats) setStats({ ...stats, total: stats.total - 1 });
    } finally {
      setDeleting(null);
    }
  }

  async function handleStatusChange(id: string, status: KeywordStatus) {
    await updateKeyword(id, { status });
    setKeywords((prev) => prev.map((k) => (k.id === id ? { ...k, status } : k)));
  }

  const filtered = keywords.filter((k) =>
    !searchQuery || k.keyword.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (k.assigned_article_title || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  function handleSignOut() {
    supabase.auth.signOut().then(() => navigate('/admin/login'));
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/admin" className="text-gray-400 hover:text-gray-600 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="w-px h-5 bg-gray-200" />
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-gray-900">Keyword Manager</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/admin/keywords/import"
              className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 hover:border-blue-300 transition-colors"
            >
              <BarChart2 className="w-4 h-4" />
              Import Keywords
            </Link>
            <Link
              to="/admin/keywords/new"
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Keyword
            </Link>
            <button onClick={handleSignOut} className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-8">
            {Object.entries(STATUS_CONFIG).map(([s, cfg]) => (
              <button
                key={s}
                onClick={() => setFilterStatus(filterStatus === s ? '' : s)}
                className={`rounded-xl p-3 text-left border transition-all ${filterStatus === s ? 'ring-2 ring-blue-500 border-transparent' : 'border-gray-200 bg-white hover:border-blue-200'}`}
              >
                <div className={`text-2xl font-bold ${cfg.color}`}>{stats.byStatus[s] || 0}</div>
                <div className="text-xs text-gray-500 mt-0.5">{cfg.label}</div>
              </button>
            ))}
          </div>
        )}

        {/* Search + Filters */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search keywords or article titles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium transition-colors ${showFilters ? 'bg-blue-50 border-blue-200 text-blue-700' : 'border-gray-200 text-gray-600 hover:border-blue-200'}`}
            >
              <Filter className="w-4 h-4" />
              Filters
              {(filterStatus || filterCategory || filterBusiness) && (
                <span className="bg-blue-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {[filterStatus, filterCategory, filterBusiness].filter(Boolean).length}
                </span>
              )}
            </button>
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3 pt-3 border-t border-gray-100">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Statuses</option>
                {Object.entries(STATUS_CONFIG).map(([s, cfg]) => (
                  <option key={s} value={s}>{cfg.label}</option>
                ))}
              </select>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Categories</option>
                {KEYWORD_CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}</option>
                ))}
              </select>
              <select
                value={filterBusiness}
                onChange={(e) => setFilterBusiness(e.target.value)}
                className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Business Types</option>
                <option value="local">Local Business</option>
                <option value="ecommerce">E-Commerce</option>
                <option value="both">Both</option>
              </select>
              {(filterStatus || filterCategory || filterBusiness) && (
                <button
                  onClick={() => { setFilterStatus(''); setFilterCategory(''); setFilterBusiness(''); }}
                  className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700"
                >
                  <X className="w-4 h-4" /> Clear Filters
                </button>
              )}
            </div>
          )}
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">
              {filtered.length} keyword{filtered.length !== 1 ? 's' : ''}
            </span>
            <div className="flex gap-2">
              <Link to="/admin/clusters" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                Manage Clusters →
              </Link>
            </div>
          </div>

          {loading ? (
            <div className="py-16 text-center">
              <div className="inline-block w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
              <p className="text-sm text-gray-500 mt-3">Loading keywords...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-16 text-center">
              <Tag className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 font-medium">No keywords found</p>
              <p className="text-sm text-gray-400 mt-1">Add your first keyword to get started</p>
              <Link to="/admin/keywords/new" className="inline-flex items-center gap-2 mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                <Plus className="w-4 h-4" /> Add Keyword
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Keyword</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Intent</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Priority</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Article</th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filtered.map((kw) => {
                    const cfg = STATUS_CONFIG[kw.status];
                    return (
                      <tr key={kw.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-5 py-4">
                          <span className="font-medium text-gray-900 text-sm">{kw.keyword}</span>
                          {kw.monthly_search_volume != null && (
                            <span className="ml-2 text-xs text-gray-400">~{kw.monthly_search_volume.toLocaleString()}/mo</span>
                          )}
                        </td>
                        <td className="px-4 py-4">
                          <span className="text-xs text-gray-600 capitalize">{kw.category?.replace(/-/g, ' ')}</span>
                        </td>
                        <td className="px-4 py-4">
                          <span className="text-xs text-gray-600 capitalize">{kw.search_intent}</span>
                        </td>
                        <td className="px-4 py-4">
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${kw.business_type === 'local' ? 'bg-sky-50 text-sky-600' : kw.business_type === 'ecommerce' ? 'bg-violet-50 text-violet-600' : 'bg-gray-100 text-gray-600'}`}>
                            {kw.business_type === 'local' ? 'Local' : kw.business_type === 'ecommerce' ? 'E-Com' : 'Both'}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-1">
                            <Star className={`w-3 h-3 ${kw.priority_score >= 7 ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`} />
                            <span className="text-xs font-medium text-gray-700">{kw.priority_score}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <select
                            value={kw.status}
                            onChange={(e) => handleStatusChange(kw.id, e.target.value as KeywordStatus)}
                            className={`text-xs font-medium px-2 py-1 rounded-full border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 ${cfg.bg} ${cfg.color}`}
                          >
                            {Object.entries(STATUS_CONFIG).map(([s, c]) => (
                              <option key={s} value={s}>{c.label}</option>
                            ))}
                          </select>
                        </td>
                        <td className="px-4 py-4 max-w-xs">
                          {kw.assigned_article_title ? (
                            <span className="text-xs text-gray-600 line-clamp-1">{kw.assigned_article_title}</span>
                          ) : (
                            <span className="text-xs text-gray-300 italic">No article assigned</span>
                          )}
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-1 justify-end">
                            <Link
                              to={`/admin/keywords/${kw.id}`}
                              className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Edit"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </Link>
                            <button
                              onClick={() => handleDelete(kw.id)}
                              disabled={deleting === kw.id}
                              className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
