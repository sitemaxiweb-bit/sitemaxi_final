import { CheckCircle, XCircle, TrendingUp, TrendingDown, Users, Lightbulb, ArrowRight, RefreshCw, BookOpen, Search, Eye, MessageSquare, Globe, ExternalLink, Info } from 'lucide-react';
import type { VisibilityReportData, PlatformResult } from './types';

const CALENDAR_URL = 'https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ2m0vspPUrR0-YqZ4woobo35YfltXEIKt__2utprk-3OdzJy3Qk9mCNHtvzlEdxZC0Y34jiLzfF';

function ScoreGauge({ score }: { score: number }) {
  const color = score >= 70 ? '#16a34a' : score >= 40 ? '#ca8a04' : '#dc2626';
  const label = score >= 70 ? 'Strong' : score >= 40 ? 'Moderate' : 'Low';
  const circumference = 2 * Math.PI * 52;
  const dash = (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-40 h-40">
        <svg className="w-40 h-40 -rotate-90" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="52" fill="none" stroke="#e5e7eb" strokeWidth="10" />
          <circle
            cx="60" cy="60" r="52" fill="none"
            stroke={color} strokeWidth="10"
            strokeDasharray={`${dash} ${circumference}`}
            strokeLinecap="round"
            style={{ transition: 'stroke-dasharray 1.2s ease-out' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-black" style={{ color }}>{score}</span>
          <span className="text-sm text-gray-500 font-medium">/100</span>
        </div>
      </div>
      <span className="mt-2 text-sm font-bold" style={{ color }}>{label} Visibility</span>
    </div>
  );
}

function PlatformCard({ platform }: { platform: PlatformResult }) {
  const platformColors: Record<string, { bg: string; border: string; text: string; dot: string }> = {
    Gemini: { bg: 'bg-blue-50', border: 'border-blue-100', text: 'text-blue-700', dot: 'bg-blue-500' },
    Claude: { bg: 'bg-orange-50', border: 'border-orange-100', text: 'text-orange-700', dot: 'bg-orange-500' },
  };
  const c = platformColors[platform.platform] ?? { bg: 'bg-gray-50', border: 'border-gray-100', text: 'text-gray-700', dot: 'bg-gray-500' };
  const scoreColor = platform.visibilityScore >= 60 ? 'text-emerald-600' : platform.visibilityScore >= 35 ? 'text-amber-600' : 'text-red-600';

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className={`${c.bg} ${c.border} border-b px-5 py-4 flex items-center justify-between`}>
        <div className="flex items-center gap-2.5">
          <div className={`w-2.5 h-2.5 rounded-full ${c.dot}`} />
          <span className={`font-bold text-base ${c.text}`}>{platform.platform}</span>
          <span className="text-xs text-gray-400 font-medium">with web search</span>
        </div>
        <div className="flex items-center gap-2">
          {platform.mentioned ? (
            <span className="flex items-center gap-1.5 bg-emerald-100 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-200">
              <CheckCircle className="w-3.5 h-3.5" /> Mentioned
            </span>
          ) : (
            <span className="flex items-center gap-1.5 bg-red-50 text-red-600 text-xs font-bold px-2.5 py-1 rounded-full border border-red-100">
              <XCircle className="w-3.5 h-3.5" /> Not Mentioned
            </span>
          )}
        </div>
      </div>

      <div className="p-5 space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500 font-medium">Visibility Score</span>
            <span className={`text-xl font-black ${scoreColor}`}>{platform.visibilityScore}/100</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${platform.visibilityScore >= 60 ? 'bg-emerald-500' : platform.visibilityScore >= 35 ? 'bg-amber-400' : 'bg-red-400'}`}
              style={{ width: `${platform.visibilityScore}%`, transition: 'width 1s ease-out' }}
            />
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <Globe className={`w-3.5 h-3.5 ${platform.websiteFound ? 'text-emerald-500' : 'text-gray-300'}`} />
            <span className={platform.websiteFound ? 'text-emerald-600 font-semibold' : 'text-gray-400'}>
              {platform.websiteFound ? 'Website cited in sources' : 'Website not in sources'}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-400">
            <Search className="w-3.5 h-3.5" />
            <span>{platform.promptsChecked} prompts run</span>
          </div>
        </div>

        {platform.responseSnippet && (
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            <div className="flex items-center gap-1.5 mb-2">
              <MessageSquare className="w-3.5 h-3.5 text-gray-400" />
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">AI Response Sample</span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed italic">"{platform.responseSnippet}"</p>
          </div>
        )}

        {platform.sources.length > 0 && (
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Cited Sources ({platform.sources.length})</span>
            </div>
            <ul className="space-y-1">
              {platform.sources.slice(0, 4).map((s, i) => (
                <li key={i}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-800 hover:underline truncate"
                    title={s.title}
                  >
                    <ExternalLink className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate">{s.title || s.url}</span>
                  </a>
                </li>
              ))}
              {platform.sources.length > 4 && (
                <li className="text-xs text-gray-400">+{platform.sources.length - 4} more sources</li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

interface VisibilityResultsProps {
  report: VisibilityReportData;
  onRunAnother: () => void;
}

export function VisibilityResults({ report, onRunAnother }: VisibilityResultsProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-b from-[#0f172a] to-[#1e293b] pt-16 pb-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-blue-300 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-4">
              AI Visibility Benchmark Report
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white mb-2">
              {report.brandName}
            </h1>
            <p className="text-slate-400">{report.primaryService} &mdash; {report.city}</p>
          </div>

          <div className="bg-white/5 backdrop-blur border border-white/10 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-10">
            <div className="flex-shrink-0">
              <ScoreGauge score={report.overallScore} />
            </div>
            <div className="flex-1">
              <h2 className="text-white font-bold text-xl mb-3">Overall AI Visibility Score</h2>
              <p className="text-slate-300 leading-relaxed text-sm mb-5">{report.brandSummary}</p>
              <div className="flex flex-wrap gap-3">
                {report.platforms.map(p => (
                  <div key={p.platform} className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full ${p.mentioned ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-red-500/20 text-red-300 border border-red-500/30'}`}>
                    {p.mentioned ? <CheckCircle className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                    {p.platform}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 -mt-12 pb-24 space-y-8">

        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex items-start gap-3">
          <Info className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-blue-700 leading-relaxed">
            This benchmark runs <strong>5 live prompts per platform</strong> (3 discovery + 2 direct brand queries) against <strong>Gemini with Google Search grounding</strong> and <strong>Claude with web search</strong>. Scores reflect real-time AI behavior — not simulated or cached results. Results may vary between runs as AI responses evolve.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-[#111111] mb-4">Platform Breakdown</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {report.platforms.map(p => <PlatformCard key={p.platform} platform={p} />)}
          </div>
        </div>

        {report.competitorMentions.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center">
                <Users className="w-4 h-4 text-amber-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#111111]">Competitor Mentions</h2>
                <p className="text-xs text-gray-400">Businesses appearing in AI responses for your target keywords</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {report.competitorMentions.map(c => (
                <span key={c} className="text-sm bg-amber-50 border border-amber-100 text-amber-800 px-3 py-1.5 rounded-full font-medium">{c}</span>
              ))}
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-lg font-bold text-[#111111] mb-5">Key Insights</h2>
          <div className="grid md:grid-cols-2 gap-5">
            <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                <h3 className="font-bold text-emerald-800 text-sm">Strengths</h3>
              </div>
              <ul className="space-y-2">
                {report.strengths.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-emerald-700">
                    <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-red-50 border border-red-100 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <TrendingDown className="w-4 h-4 text-red-600" />
                <h3 className="font-bold text-red-800 text-sm">Gaps to Address</h3>
              </div>
              <ul className="space-y-2">
                {report.gaps.map((g, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-red-700">
                    <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                    {g}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-lg font-bold text-[#111111] mb-5">Recommendations</h2>
          <div className="grid md:grid-cols-3 gap-5">
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <h3 className="font-bold text-blue-800 text-sm">Content Improvements</h3>
              </div>
              <ul className="space-y-2.5">
                {report.contentRecommendations.map((r, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-blue-700">
                    <ArrowRight className="w-3.5 h-3.5 text-blue-400 flex-shrink-0 mt-0.5" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Search className="w-4 h-4 text-slate-600" />
                <h3 className="font-bold text-slate-800 text-sm">SEO Suggestions</h3>
              </div>
              <ul className="space-y-2.5">
                {report.seoSuggestions.map((r, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-teal-50 border border-teal-100 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Eye className="w-4 h-4 text-teal-600" />
                <h3 className="font-bold text-teal-800 text-sm">AI Visibility Tips</h3>
              </div>
              <ul className="space-y-2.5">
                {report.visibilityTips.map((r, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-teal-700">
                    <Lightbulb className="w-3.5 h-3.5 text-teal-400 flex-shrink-0 mt-0.5" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#0f172a] to-[#1e3a8a] rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-black text-white mb-2">Ready to improve your AI visibility?</h2>
          <p className="text-slate-300 mb-6 text-sm max-w-md mx-auto">
            Our team of AI visibility experts can help you get found across Gemini, Claude, and ChatGPT — consistently.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={CALENDAR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#1D4ED8] hover:bg-[#1E40AF] text-white font-bold px-8 py-4 rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-blue-900/30"
            >
              Book a Free Strategy Call
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={onRunAnother}
              className="border border-white/20 text-white hover:bg-white/10 font-semibold px-6 py-4 rounded-xl transition-all flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Check Another Brand
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400">
          Results are benchmark estimates based on live AI platform responses using grounded web search. Brand visibility may vary by query, geography, and platform version. Not an exact universal ranking.
        </p>
      </div>
    </div>
  );
}
