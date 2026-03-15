import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Layers, CreditCard as Edit2, Trash2, ArrowLeft, Tag, Zap } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { getClusters, deleteCluster, type KeywordCluster } from '../lib/keywordApi';

const CLUSTER_TYPE_CONFIG = {
  pillar: { label: 'Pillar Page', color: 'text-blue-700', bg: 'bg-blue-50' },
  supporting: { label: 'Supporting Page', color: 'text-gray-600', bg: 'bg-gray-100' },
};

const INTENT_CONFIG = {
  informational: { label: 'Informational', color: 'text-sky-600', bg: 'bg-sky-50' },
  commercial: { label: 'Commercial', color: 'text-emerald-600', bg: 'bg-emerald-50' },
  mixed: { label: 'Mixed', color: 'text-amber-600', bg: 'bg-amber-50' },
};

export default function AdminClustersPage() {
  const navigate = useNavigate();
  const [clusters, setClusters] = useState<KeywordCluster[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => { loadClusters(); }, []);

  async function loadClusters() {
    setLoading(true);
    try {
      const data = await getClusters();
      setClusters(data);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this cluster? Keywords assigned to it will be unassigned.')) return;
    setDeleting(id);
    try {
      await deleteCluster(id);
      setClusters((prev) => prev.filter((c) => c.id !== id));
    } finally {
      setDeleting(null);
    }
  }

  function handleSignOut() {
    supabase.auth.signOut().then(() => navigate('/admin/login'));
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/admin/keywords" className="text-gray-400 hover:text-gray-600 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="w-px h-5 bg-gray-200" />
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
                <Layers className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-gray-900">Keyword Clusters</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/admin/clusters/new"
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              New Cluster
            </Link>
            <button onClick={handleSignOut} className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
          <p className="text-sm text-gray-600">
            Topic clusters group related keywords into a content strategy. Each cluster has a <strong>main pillar keyword</strong> and supporting keywords that feed into it.
            Articles generated from supporting keywords link back to the pillar page, creating topical authority.
          </p>
        </div>

        {loading ? (
          <div className="py-16 text-center">
            <div className="inline-block w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : clusters.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 py-16 text-center">
            <Layers className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No clusters yet</p>
            <p className="text-sm text-gray-400 mt-1">Group your keywords into topic clusters for better content strategy</p>
            <Link
              to="/admin/clusters/new"
              className="inline-flex items-center gap-2 mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" /> Create First Cluster
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {clusters.map((cluster) => {
              const typeCfg = CLUSTER_TYPE_CONFIG[cluster.cluster_type as keyof typeof CLUSTER_TYPE_CONFIG] || CLUSTER_TYPE_CONFIG.supporting;
              const intentCfg = INTENT_CONFIG[cluster.intent_type as keyof typeof INTENT_CONFIG] || INTENT_CONFIG.informational;
              return (
                <div key={cluster.id} className="bg-white rounded-xl border border-gray-200 p-5 hover:border-blue-200 transition-colors">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${typeCfg.bg} ${typeCfg.color}`}>
                          {typeCfg.label}
                        </span>
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${intentCfg.bg} ${intentCfg.color}`}>
                          {intentCfg.label}
                        </span>
                      </div>
                      <h3 className="font-semibold text-gray-900 text-sm leading-tight">{cluster.name}</h3>
                      <p className="text-xs text-blue-600 mt-0.5 font-medium">{cluster.main_keyword}</p>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <Link
                        to={`/admin/clusters/${cluster.id}`}
                        className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        onClick={() => handleDelete(cluster.id)}
                        disabled={deleting === cluster.id}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {(cluster.supporting_keywords || []).length > 0 && (
                    <div className="mb-3">
                      <p className="text-xs text-gray-500 mb-1.5 font-medium">Supporting Keywords</p>
                      <div className="flex flex-wrap gap-1.5">
                        {cluster.supporting_keywords.slice(0, 5).map((kw, i) => (
                          <span key={i} className="text-xs bg-gray-50 text-gray-600 px-2 py-0.5 rounded border border-gray-100">
                            {kw}
                          </span>
                        ))}
                        {cluster.supporting_keywords.length > 5 && (
                          <span className="text-xs text-gray-400">+{cluster.supporting_keywords.length - 5} more</span>
                        )}
                      </div>
                    </div>
                  )}

                  {((cluster.service_association || []).length > 0 || (cluster.industry_association || []).length > 0) && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {(cluster.service_association || []).map((s) => (
                        <span key={s} className="flex items-center gap-1 text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">
                          <Zap className="w-2.5 h-2.5" />{s}
                        </span>
                      ))}
                      {(cluster.industry_association || []).map((ind) => (
                        <span key={ind} className="flex items-center gap-1 text-xs bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full">
                          <Tag className="w-2.5 h-2.5" />{ind}
                        </span>
                      ))}
                    </div>
                  )}

                  {(cluster.title_ideas || []).length > 0 && (
                    <div>
                      <p className="text-xs text-gray-500 mb-1 font-medium">Title Ideas</p>
                      <ul className="space-y-0.5">
                        {cluster.title_ideas.slice(0, 2).map((t, i) => (
                          <li key={i} className="text-xs text-gray-600 truncate">{t}</li>
                        ))}
                        {cluster.title_ideas.length > 2 && (
                          <li className="text-xs text-gray-400">+{cluster.title_ideas.length - 2} more ideas</li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
