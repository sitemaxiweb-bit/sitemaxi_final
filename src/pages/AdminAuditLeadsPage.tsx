import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Globe, Mail, Building2, TrendingUp, RefreshCw, ChevronDown, ChevronUp, Calendar, BarChart3, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { AuditReportData } from './seo-audit/types';

interface AuditLead {
  id: string;
  full_name: string;
  email: string;
  website_url: string;
  audit_report: AuditReportData | null;
  report_emailed: boolean;
  created_at: string;
}

function ScoreBadge({ score }: { score: number }) {
  const color = score >= 75 ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
    : score >= 50 ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
    : 'bg-red-500/10 text-red-400 border-red-500/20';
  return (
    <span className={`inline-flex items-center gap-1 text-sm font-bold px-3 py-1 rounded-full border ${color}`}>
      <BarChart3 className="w-3 h-3" />
      {score}/100
    </span>
  );
}

function IssuesSummary({ report }: { report: AuditReportData }) {
  const errors = report.onPageIssues.filter(i => i.type === 'error').length;
  const warnings = report.onPageIssues.filter(i => i.type === 'warning').length;
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {errors > 0 && (
        <span className="flex items-center gap-1 text-xs text-red-400 bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded-full font-semibold">
          <XCircle className="w-3 h-3" />
          {errors} Critical
        </span>
      )}
      {warnings > 0 && (
        <span className="flex items-center gap-1 text-xs text-yellow-400 bg-yellow-500/10 border border-yellow-500/20 px-2 py-0.5 rounded-full font-semibold">
          <AlertTriangle className="w-3 h-3" />
          {warnings} Warnings
        </span>
      )}
      {errors === 0 && warnings === 0 && (
        <span className="flex items-center gap-1 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full font-semibold">
          <CheckCircle className="w-3 h-3" />
          No Issues
        </span>
      )}
    </div>
  );
}

export function AdminAuditLeadsPage() {
  const navigate = useNavigate();
  const [leads, setLeads] = useState<AuditLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedLead, setExpandedLead] = useState<string | null>(null);

  useEffect(() => {
    loadLeads();
  }, []);

  async function loadLeads() {
    setLoading(true);
    const { data, error } = await supabase
      .from('seo_audit_leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) setLeads(data);
    setLoading(false);
  }

  const filtered = leads.filter(l =>
    l.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.website_url.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const avgScore = leads.length > 0
    ? Math.round(leads.filter(l => l.audit_report).reduce((sum, l) => sum + (l.audit_report?.seoScore ?? 0), 0) / leads.filter(l => l.audit_report).length)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F3F4F6] to-[#F9FAFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate('/admin')}
            className="flex items-center gap-2 text-[#666666] hover:text-[#111111] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </button>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#111111]">SEO Audit Sales</h1>
            <p className="text-[#666666] mt-1">Sales captured from the Free AI Marketing Audit tool</p>
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
            { label: 'Total Sales', value: leads.length, icon: <Building2 className="w-5 h-5" />, color: 'text-blue-600 bg-blue-50 border-blue-100' },
            { label: 'Avg SEO Score', value: avgScore ? `${avgScore}/100` : 'N/A', icon: <TrendingUp className="w-5 h-5" />, color: 'text-emerald-600 bg-emerald-50 border-emerald-100' },
            { label: 'Reports Emailed', value: leads.filter(l => l.report_emailed).length, icon: <Mail className="w-5 h-5" />, color: 'text-orange-600 bg-orange-50 border-orange-100' },
            { label: 'This Week', value: leads.filter(l => new Date(l.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length, icon: <Calendar className="w-5 h-5" />, color: 'text-rose-600 bg-rose-50 border-rose-100' },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
              <div className={`inline-flex p-2.5 rounded-xl border mb-3 ${stat.color}`}>
                {stat.icon}
              </div>
              <div className="text-2xl font-black text-[#111111]">{stat.value}</div>
              <div className="text-sm text-[#666666]">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-100">
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search by name, email, or URL..."
                className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-sm text-[#111111] placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400/20"
              />
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              <BarChart3 className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="font-medium">No sales found</p>
              <p className="text-sm mt-1">Sales will appear here when users complete the free audit</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filtered.map(lead => (
                <div key={lead.id}>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-5">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-bold text-[#111111] text-lg">{lead.full_name}</span>
                        {lead.report_emailed && (
                          <span className="flex items-center gap-1 text-xs text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-semibold">
                            <Mail className="w-3 h-3" />
                            Emailed
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-[#666666]">
                        <span className="flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5" />
                          {lead.email}
                        </span>
                        <a href={lead.website_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-blue-600 hover:underline">
                          <Globe className="w-3.5 h-3.5" />
                          {lead.website_url.replace(/^https?:\/\//, '').slice(0, 40)}
                        </a>
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(lead.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                        </span>
                      </div>
                      {lead.audit_report && (
                        <div className="flex items-center gap-3 mt-2">
                          <ScoreBadge score={lead.audit_report.seoScore} />
                          <IssuesSummary report={lead.audit_report} />
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

                  {expandedLead === lead.id && lead.audit_report && (
                    <div className="bg-gray-950 text-white px-5 pb-5 pt-3 space-y-4">
                      {lead.audit_report.aiInsights && (
                        <div className="bg-gray-900 border border-emerald-500/20 rounded-xl p-4">
                          <h4 className="text-emerald-400 font-semibold text-sm mb-2">AI Insights</h4>
                          <p className="text-gray-300 text-sm leading-relaxed">{lead.audit_report.aiInsights}</p>
                        </div>
                      )}

                      <div className="grid sm:grid-cols-2 gap-3">
                        <div className="bg-gray-900 rounded-xl p-4">
                          <h4 className="text-white font-semibold text-sm mb-3">Technical SEO</h4>
                          {[
                            { label: 'Title Tag', status: lead.audit_report.technicalSEO.titleTag.status, detail: lead.audit_report.technicalSEO.titleTag.content.slice(0, 50) || 'Missing' },
                            { label: 'Meta Description', status: lead.audit_report.technicalSEO.metaDescription.status, detail: `${lead.audit_report.technicalSEO.metaDescription.length} chars` },
                            { label: 'H1 Tags', status: lead.audit_report.technicalSEO.h1Tag.status, detail: `${lead.audit_report.technicalSEO.h1Tag.count} found` },
                            { label: 'HTTPS', status: lead.audit_report.technicalSEO.httpsEnabled, detail: lead.audit_report.technicalSEO.httpsEnabled ? 'Enabled' : 'Disabled' },
                          ].map((item, i) => (
                            <div key={i} className="flex items-center justify-between py-1.5 border-b border-gray-800 last:border-0">
                              <span className="text-gray-400 text-xs">{item.label}</span>
                              <div className="flex items-center gap-2">
                                <span className="text-gray-500 text-xs">{item.detail}</span>
                                {(item.status === true || item.status === 'good')
                                  ? <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                                  : item.status === 'warning'
                                  ? <AlertTriangle className="w-3.5 h-3.5 text-yellow-400" />
                                  : <XCircle className="w-3.5 h-3.5 text-red-400" />}
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="bg-gray-900 rounded-xl p-4">
                          <h4 className="text-white font-semibold text-sm mb-3">Page Speed</h4>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-gray-400 text-xs">Mobile</span>
                              <span className={`text-sm font-bold ${lead.audit_report.pageSpeed.mobileScore >= 75 ? 'text-emerald-400' : lead.audit_report.pageSpeed.mobileScore >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>
                                {lead.audit_report.pageSpeed.mobileScore}/100
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-400 text-xs">Desktop</span>
                              <span className={`text-sm font-bold ${lead.audit_report.pageSpeed.desktopScore >= 75 ? 'text-emerald-400' : lead.audit_report.pageSpeed.desktopScore >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>
                                {lead.audit_report.pageSpeed.desktopScore}/100
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-400 text-xs">LCP</span>
                              <span className="text-gray-300 text-xs font-medium">{lead.audit_report.pageSpeed.lcp}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-400 text-xs">Mobile Friendly</span>
                              <span className={`text-xs font-bold ${lead.audit_report.mobileFriendly ? 'text-emerald-400' : 'text-red-400'}`}>
                                {lead.audit_report.mobileFriendly ? 'Yes' : 'No'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {lead.audit_report.recommendations.filter(r => r.priority === 'high').length > 0 && (
                        <div className="bg-gray-900 rounded-xl p-4">
                          <h4 className="text-white font-semibold text-sm mb-3">Top Recommendations</h4>
                          <div className="space-y-2">
                            {lead.audit_report.recommendations.filter(r => r.priority === 'high').map((rec, i) => (
                              <div key={i} className="flex gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 flex-shrink-0" />
                                <div>
                                  <span className="text-gray-200 text-xs font-semibold">{rec.title}</span>
                                  <p className="text-gray-500 text-xs mt-0.5">{rec.description}</p>
                                </div>
                              </div>
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
