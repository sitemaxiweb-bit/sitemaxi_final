import { useState } from 'react';
import { CheckCircle, XCircle, AlertTriangle, Info, Zap, Search, ArrowRight, Mail, RotateCcw, TrendingUp, Clock, Download } from 'lucide-react';
import type { AuditReportData } from './types';
import { ScoreGauge } from './ScoreGauge';
import { TechnicalSEOCard } from './TechnicalSEOCard';
import { PageSpeedCard } from './PageSpeedCard';
import { IssuesList } from './IssuesList';
import { RecommendationsList } from './RecommendationsList';
import { downloadAuditPDF } from './pdfExport';

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

  function handleDownloadPDF() {
    downloadAuditPDF(report, businessName);
  }

  const errorCount = report.onPageIssues.filter(i => i.type === 'error').length;
  const warningCount = report.onPageIssues.filter(i => i.type === 'warning').length;
  const infoCount = report.onPageIssues.filter(i => i.type === 'info').length;

  const scoreLabel = report.seoScore >= 80 ? 'Excellent' : report.seoScore >= 60 ? 'Good' : report.seoScore >= 40 ? 'Needs Work' : 'Poor';
  const scoreColor = report.seoScore >= 80 ? 'text-emerald-600' : report.seoScore >= 60 ? 'text-yellow-600' : report.seoScore >= 40 ? 'text-orange-600' : 'text-red-600';

  return (
    <div className="min-h-screen bg-white px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-[#1D4ED8] text-sm font-semibold mb-1">
              <CheckCircle className="w-4 h-4" />
              Audit Complete
            </div>
            <h1 className="text-3xl font-black text-[#111111]">{businessName} — SEO Report</h1>
            <p className="text-[#999999] text-sm mt-1">{report.auditedUrl}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleDownloadPDF}
              className="flex items-center gap-2 bg-[#1D4ED8] hover:bg-[#1E40AF] text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all shadow-sm"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </button>
            {!emailSent ? (
              <button
                onClick={handleEmailReport}
                disabled={emailSending}
                className="flex items-center gap-2 bg-white hover:bg-gray-50 border border-gray-200 text-[#333333] text-sm font-semibold px-4 py-2.5 rounded-xl transition-all disabled:opacity-60 shadow-sm"
              >
                <Mail className="w-4 h-4" />
                {emailSending ? 'Sending...' : `Email to ${email}`}
              </button>
            ) : (
              <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-semibold px-4 py-2.5 rounded-xl">
                <CheckCircle className="w-4 h-4" />
                Report Sent!
              </div>
            )}
            <button
              onClick={onRunAnother}
              className="flex items-center gap-2 bg-white hover:bg-gray-50 border border-gray-200 text-[#666666] text-sm font-semibold px-4 py-2.5 rounded-xl transition-all shadow-sm"
            >
              <RotateCcw className="w-4 h-4" />
              New Audit
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white border border-gray-200 rounded-2xl p-5 col-span-2 md:col-span-1 flex flex-col items-center justify-center shadow-sm">
            <ScoreGauge score={report.seoScore} />
            <p className={`text-lg font-bold mt-2 ${scoreColor}`}>{scoreLabel}</p>
            <p className="text-[#999999] text-xs">Overall SEO Score</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col justify-between shadow-sm">
            <div className="w-10 h-10 bg-red-50 border border-red-100 rounded-xl flex items-center justify-center text-red-500 mb-3">
              <XCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="text-3xl font-black text-[#111111]">{errorCount}</div>
              <div className="text-[#999999] text-sm">Critical Issues</div>
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col justify-between shadow-sm">
            <div className="w-10 h-10 bg-yellow-50 border border-yellow-100 rounded-xl flex items-center justify-center text-yellow-600 mb-3">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <div className="text-3xl font-black text-[#111111]">{warningCount}</div>
              <div className="text-[#999999] text-sm">Warnings</div>
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col justify-between shadow-sm">
            <div className="w-10 h-10 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center text-[#1D4ED8] mb-3">
              <Info className="w-5 h-5" />
            </div>
            <div>
              <div className="text-3xl font-black text-[#111111]">{infoCount}</div>
              <div className="text-[#999999] text-sm">Opportunities</div>
            </div>
          </div>
        </div>

        {report.aiInsights && (
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 bg-white border border-blue-200 rounded-xl flex items-center justify-center shadow-sm">
                <Zap className="w-4 h-4 text-[#1D4ED8]" />
              </div>
              <div>
                <h3 className="text-[#111111] font-bold">AI-Powered Insights</h3>
                <p className="text-[#666666] text-xs">Generated by OpenAI for {businessName}</p>
              </div>
            </div>
            <p className="text-[#444444] leading-relaxed text-sm whitespace-pre-line">{report.aiInsights}</p>
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

        <div className="bg-gradient-to-br from-[#1D4ED8] to-[#2563EB] rounded-2xl p-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 text-white text-sm font-semibold px-3 py-1.5 rounded-full border border-white/30 mb-4">
            <TrendingUp className="w-4 h-4" />
            Ready to Improve Your Score?
          </div>
          <h3 className="text-2xl font-black text-white mb-3">
            Let Our Experts Fix These Issues For You
          </h3>
          <p className="text-blue-100 mb-6 max-w-lg mx-auto text-sm leading-relaxed">
            Our SEO team specializes in turning audits like this into real results. Book a free consultation and we'll create a custom plan to improve your rankings.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-[#1D4ED8] font-bold px-6 py-3 rounded-xl transition-all hover:shadow-lg"
            >
              Get Free Consultation
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="/rankmaxi"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold px-6 py-3 rounded-xl transition-all"
            >
              <Search className="w-4 h-4" />
              View SEO Services
            </a>
          </div>
          <div className="flex items-center justify-center gap-2 mt-4 text-blue-200 text-xs">
            <Clock className="w-3 h-3" />
            Audited on {new Date(report.auditDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </div>
      </div>
    </div>
  );
}
