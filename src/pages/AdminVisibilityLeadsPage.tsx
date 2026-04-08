import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Search, Globe, Mail, Building2, MapPin, RefreshCw,
  ChevronDown, ChevronUp, Calendar, BarChart3, Eye, Filter,
  CheckCircle, XCircle, TrendingUp, Briefcase, Tag,
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { VisibilityReportData } from './ai-visibility/types';

interface VisibilityLead {
  id: string;
  brand_name: string;
  website_url: string;
  primary_service: string;
  city: string;
  target_keywords: string[];
  email: string;
  visibility_report: VisibilityReportData | null;
  report_emailed: boolean;
  created_at: string;
}

function ScoreBadge({ score }: { score: number }) {
  const color = score >= 70
    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
    : score >= 40
    ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
    : 'bg-red-500/10 text-red-400 border-red-500/20';
  return (
    <span className={`inline-flex items-center gap-1 text-sm font-bold px-3 py-1 rounded-full border ${color}`}>
      <BarChart3 className="w-3 h-3" />
      {score}/100
    </span>
  );
}

export function AdminVisibilityLeadsPage() {
  const navigate = useNavigate();
  const [leads, setLeads] = useState<VisibilityLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCity, setFilterCity] = useState('');
  const [filterService, setFilterService] = useState('');
  const [filterDateRange, setFilterDateRange] = useState<'all' | '7d' | '30d' | '90d'>('all');
  const [expandedLead, setExpandedLead] = useState<string | null>(null);

  useEffect(() => {
    loadLeads();
  }, []);

  async function loadLeads() {
    setLoading(true);
    const { data, error } = await supabase
      .from('ai_visibility_leads')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data) setLeads(data);
    setLoading(false);
  }

  const uniqueCities = [...new Set(leads.map(l => l.city).filter(Boolean))].sort();
  const uniqueServices = [...new Set(leads.map(l => l.primary_service).filter(Boolean))].sort();

  const filtered = leads.filter(l => {
    const query = searchQuery.toLowerCase();
    const matchesSearch = !query ||
      l.brand_name.toLowerCase().includes(query) ||
      l.email.toLowerCase().includes(query) ||
      l.website_url.toLowerCase().includes(query) ||
      l.city.toLowerCase().includes(query);
    const matchesCity = !filterCity || l.city === filterCity;
    const matchesService = !filterService || l.primary_service === filterService;
    const matchesDate = filterDateRange === 'all' || (() => {
      const days = filterDateRange === '7d' ? 7 : filterDateRange === '30d' ? 30 : 90;
      return new Date(l.created_at) > new Date(Date.now() - days * 24 * 60 * 60 * 1000);
    })();
    return matchesSearch && matchesCity && matchesService && matchesDate;
  });

  const avgScore = leads.length > 0
    ? Math.round(leads.filter(l => l.visibility_report).reduce((sum, l) => sum + (l.visibility_report?.overallScore ?? 0), 0) / Math.max(1, leads.filter(l => l.visibility_report).length))
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F3F4F6] to-[#F9FAFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate('/admin')} className="flex items-center gap-2 text-[#666666] hover:text-[#111111] transition-colors">
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </button>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#111111]">AI Visibility Leads</h1>
            <p className="text-[#666666] mt-1">Submissions from the AI Brand Visibility Checker tool</p>
          </div>
          <button
            onClick={loadLeads}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-[#666666] hover:text-[#111111] hover:border-gray-300 transition-all"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Leads', value: leads.length, icon: <Building2 className="w-5 h-5" />, color: 'text-blue-600 bg-blue-50 border-blue-100' },
            { label: 'Avg Visibility Score', value: avgScore ? `${avgScore}/100` : 'N/A', icon: <TrendingUp className="w-5 h-5" />, color: 'text-emerald-600 bg-emerald-50 border-emerald-100' },
            { label: 'Reports Emailed', value: leads.filter(l => l.report_emailed).length, icon: <Mail className="w-5 h-5" />, color: 'text-orange-600 bg-orange-50 border-orange-100' },
            { label: 'This Week', value: leads.filter(l => new Date(l.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length, icon: <Calendar className="w-5 h-5" />, color: 'text-rose-600 bg-rose-50 border-rose-100' },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
              <div className={`inline-flex p-2.5 rounded-xl border mb-3 ${stat.color}`}>{stat.icon}</div>
              <div className="text-2xl font-black text-[#111111]">{stat.value}</div>
              <div className="text-sm text-[#666666]">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search brand, email, URL..."
                className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-sm text-[#111111] placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400/20"
              />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <select
                value={filterCity}
                onChange={e => setFilterCity(e.target.value)}
                className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-[#374151] focus:outline-none focus:border-blue-400"
              >
                <option value="">All Cities</option>
                {uniqueCities.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <select
                value={filterService}
                onChange={e => setFilterService(e.target.value)}
                className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-[#374151] focus:outline-none focus:border-blue-400"
              >
                <option value="">All Services</option>
                {uniqueServices.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <select
                value={filterDateRange}
                onChange={e => setFilterDateRange(e.target.value as typeof filterDateRange)}
                className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-[#374151] focus:outline-none focus:border-blue-400"
              >
                <option value="all">All Time</option>
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              <Eye className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="font-medium">No leads found</p>
              <p className="text-sm mt-1">Leads will appear here when users complete the visibility check</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filtered.map(lead => (
                <div key={lead.id}>
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4 p-5">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1 flex-wrap">
                        <span className="font-bold text-[#111111] text-lg">{lead.brand_name}</span>
                        {lead.report_emailed && (
                          <span className="flex items-center gap-1 text-xs text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-semibold">
                            <Mail className="w-3 h-3" /> Emailed
                          </span>
                        )}
                        {lead.visibility_report && <ScoreBadge score={lead.visibility_report.overallScore} />}
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-[#666666] mb-2">
                        <span className="flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5" />{lead.email}
                        </span>
                        <a href={lead.website_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-blue-600 hover:underline">
                          <Globe className="w-3.5 h-3.5" />
                          {lead.website_url.replace(/^https?:\/\//, '').slice(0, 40)}
                        </a>
                        <span className="flex items-center gap-1.5">
                          <Briefcase className="w-3.5 h-3.5" />{lead.primary_service}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5" />{lead.city}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(lead.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                        </span>
                      </div>

                      {lead.target_keywords.length > 0 && (
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <Tag className="w-3.5 h-3.5 text-gray-400" />
                          {lead.target_keywords.map(kw => (
                            <span key={kw} className="text-xs bg-blue-50 border border-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{kw}</span>
                          ))}
                        </div>
                      )}

                      {lead.visibility_report && (
                        <div className="flex items-center gap-3 mt-2 flex-wrap">
                          {lead.visibility_report.platforms.map(p => (
                            <span key={p.platform} className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border ${p.mentioned ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-red-50 text-red-600 border-red-100'}`}>
                              {p.mentioned ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                              {p.platform}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => setExpandedLead(expandedLead === lead.id ? null : lead.id)}
                      className="flex items-center gap-2 text-sm font-semibold text-[#666666] hover:text-[#111111] border border-gray-200 hover:border-gray-300 px-4 py-2 rounded-xl transition-all flex-shrink-0"
                    >
                      {expandedLead === lead.id ? (
                        <><ChevronUp className="w-4 h-4" /> Hide Report</>
                      ) : (
                        <><ChevronDown className="w-4 h-4" /> View Report</>
                      )}
                    </button>
                  </div>

                  {expandedLead === lead.id && lead.visibility_report && (
                    <div className="bg-gray-950 text-white px-5 pb-5 pt-3 space-y-4">
                      <div className="bg-gray-900 border border-blue-500/20 rounded-xl p-4">
                        <h4 className="text-blue-400 font-semibold text-sm mb-2">Brand Summary</h4>
                        <p className="text-gray-300 text-sm leading-relaxed">{lead.visibility_report.brandSummary}</p>
                      </div>

                      <div className="grid sm:grid-cols-3 gap-3">
                        {lead.visibility_report.platforms.map(p => (
                          <div key={p.platform} className="bg-gray-900 rounded-xl p-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-bold text-white text-sm">{p.platform}</span>
                              <span className={`text-xs font-bold ${p.mentioned ? 'text-emerald-400' : 'text-red-400'}`}>
                                {p.mentioned ? 'Mentioned' : 'Not Found'}
                              </span>
                            </div>
                            <div className="text-2xl font-black mb-1" style={{ color: p.visibilityScore >= 60 ? '#4ade80' : p.visibilityScore >= 35 ? '#fbbf24' : '#f87171' }}>
                              {p.visibilityScore}/100
                            </div>
                            <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                              <div className={`h-full rounded-full ${p.visibilityScore >= 60 ? 'bg-emerald-500' : p.visibilityScore >= 35 ? 'bg-amber-400' : 'bg-red-400'}`} style={{ width: `${p.visibilityScore}%` }} />
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="grid sm:grid-cols-2 gap-3">
                        <div className="bg-gray-900 rounded-xl p-4">
                          <h4 className="text-emerald-400 font-semibold text-sm mb-2">Strengths</h4>
                          <ul className="space-y-1">
                            {lead.visibility_report.strengths.map((s, i) => (
                              <li key={i} className="text-gray-400 text-xs flex gap-2"><span className="text-emerald-500">+</span>{s}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="bg-gray-900 rounded-xl p-4">
                          <h4 className="text-red-400 font-semibold text-sm mb-2">Gaps</h4>
                          <ul className="space-y-1">
                            {lead.visibility_report.gaps.map((g, i) => (
                              <li key={i} className="text-gray-400 text-xs flex gap-2"><span className="text-red-500">-</span>{g}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {lead.visibility_report.competitorMentions.length > 0 && (
                        <div className="bg-gray-900 rounded-xl p-4">
                          <h4 className="text-yellow-400 font-semibold text-sm mb-2">Competitors Mentioned Instead</h4>
                          <div className="flex flex-wrap gap-2">
                            {lead.visibility_report.competitorMentions.map(c => (
                              <span key={c} className="text-xs bg-yellow-500/10 border border-yellow-500/20 text-yellow-300 px-2.5 py-1 rounded-full">{c}</span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
