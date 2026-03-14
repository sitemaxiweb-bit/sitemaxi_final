import { useState } from 'react';
import { CheckCircle, XCircle, AlertTriangle, Info, Zap, Shield, Smartphone, Search, ArrowRight, Mail, RotateCcw, TrendingUp, Clock } from 'lucide-react';
import type { AuditReportData } from './types';
import { ScoreGauge } from './ScoreGauge';
import { TechnicalSEOCard } from './TechnicalSEOCard';
import { PageSpeedCard } from './PageSpeedCard';
import { IssuesList } from './IssuesList';
import { RecommendationsList } from './RecommendationsList';

interface AuditReportProps {
  report: AuditReportData;
  businessName: string;
  email: string;
  leadId: string;
  onEmailReport: () => Promise<void>;
  onRunAnother: () => void;
}

export function AuditReport({ report, businessName, email, onEmailReport, onRunAnother }: AuditReportProps) {
  const [emailSent, setEmailSent] = useState(false);
  const [emailSending, setEmailSending] = useState(false);

  async function handleEmailReport() {
    setEmailSending(true);
    await onEmailReport();
    setEmailSending(false);
    setEmailSent(true);
  }

  const errorCount = report.onPageIssues.filter(i => i.type === 'error').length;
  const warningCount = report.onPageIssues.filter(i => i.type === 'warning').length;
  const infoCount = report.onPageIssues.filter(i => i.type === 'info').length;

  const scoreLabel = report.seoScore >= 80 ? 'Excellent' : report.seoScore >= 60 ? 'Good' : report.seoScore >= 40 ? 'Needs Work' : 'Poor';
  const scoreColor = report.seoScore >= 80 ? 'text-emerald-400' : report.seoScore >= 60 ? 'text-yellow-400' : report.seoScore >= 40 ? 'text-orange-400' : 'text-red-400';

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold mb-1">
              <CheckCircle className="w-4 h-4" />
              Audit Complete
            </div>
            <h1 className="text-3xl font-black text-white">{businessName} — SEO Report</h1>
            <p className="text-gray-500 text-sm mt-1">{report.auditedUrl}</p>
          </div>
          <div className="flex items-center gap-3">
            {!emailSent ? (
              <button
                onClick={handleEmailReport}
                disabled={emailSending}
                className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 border border-gray-600 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all disabled:opacity-60"
              >
                <Mail className="w-4 h-4" />
                {emailSending ? 'Sending...' : `Email to ${email}`}
              </button>
            ) : (
              <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-semibold px-4 py-2.5 rounded-xl">
                <CheckCircle className="w-4 h-4" />
                Report Sent!
              </div>
            )}
            <button
              onClick={onRunAnother}
              className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 border border-gray-600 text-gray-300 text-sm font-semibold px-4 py-2.5 rounded-xl transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              New Audit
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-900/80 border border-gray-700/50 rounded-2xl p-5 col-span-2 md:col-span-1 flex flex-col items-center justify-center">
            <ScoreGauge score={report.seoScore} />
            <p className={`text-lg font-bold mt-2 ${scoreColor}`}>{scoreLabel}</p>
            <p className="text-gray-500 text-xs">Overall SEO Score</p>
          </div>
          <div className="bg-gray-900/80 border border-gray-700/50 rounded-2xl p-5 flex flex-col justify-between">
            <div className="w-10 h-10 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center justify-center text-red-400 mb-3">
              <XCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="text-3xl font-black text-white">{errorCount}</div>
              <div className="text-gray-500 text-sm">Critical Issues</div>
            </div>
          </div>
          <div className="bg-gray-900/80 border border-gray-700/50 rounded-2xl p-5 flex flex-col justify-between">
            <div className="w-10 h-10 bg-yellow-500/10 border border-yellow-500/20 rounded-xl flex items-center justify-center text-yellow-400 mb-3">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <div className="text-3xl font-black text-white">{warningCount}</div>
              <div className="text-gray-500 text-sm">Warnings</div>
            </div>
          </div>
          <div className="bg-gray-900/80 border border-gray-700/50 rounded-2xl p-5 flex flex-col justify-between">
            <div className="w-10 h-10 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center text-blue-400 mb-3">
              <Info className="w-5 h-5" />
            </div>
            <div>
              <div className="text-3xl font-black text-white">{infoCount}</div>
              <div className="text-gray-500 text-sm">Opportunities</div>
            </div>
          </div>
        </div>

        {report.aiInsights && (
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-emerald-500/20 rounded-2xl p-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center justify-center">
                <Zap className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-white font-bold">AI-Powered Insights</h3>
                <p className="text-gray-500 text-xs">Generated by OpenAI for {businessName}</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed text-sm whitespace-pre-line">{report.aiInsights}</p>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <TechnicalSEOCard technical={report.technicalSEO} />
          <PageSpeedCard pageSpeed={report.pageSpeed} mobileFriendly={report.mobileFriendly} />
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <IssuesList issues={report.onPageIssues} />
          <RecommendationsList recommendations={report.recommendations} />
        </div>

        <div className="bg-gradient-to-br from-emerald-900/30 to-teal-900/20 border border-emerald-500/20 rounded-2xl p-8 text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 text-sm font-semibold px-3 py-1.5 rounded-full border border-emerald-500/20 mb-4">
            <TrendingUp className="w-4 h-4" />
            Ready to Improve Your Score?
          </div>
          <h3 className="text-2xl font-black text-white mb-3">
            Let Our Experts Fix These Issues For You
          </h3>
          <p className="text-gray-400 mb-6 max-w-lg mx-auto text-sm leading-relaxed">
            Our SEO team specializes in turning audits like this into real results. Book a free consultation and we'll create a custom plan to improve your rankings.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-bold px-6 py-3 rounded-xl transition-all hover:shadow-lg hover:shadow-emerald-500/25"
            >
              Get Free Consultation
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="/rankmaxi"
              className="inline-flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 border border-gray-600 text-white font-semibold px-6 py-3 rounded-xl transition-all"
            >
              <Search className="w-4 h-4" />
              View SEO Services
            </a>
          </div>
          <div className="flex items-center justify-center gap-2 mt-4 text-gray-600 text-xs">
            <Clock className="w-3 h-3" />
            Audited on {new Date(report.auditDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </div>
      </div>
    </div>
  );
}
