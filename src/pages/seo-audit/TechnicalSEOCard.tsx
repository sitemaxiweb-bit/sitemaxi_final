import { CheckCircle, XCircle, AlertTriangle, Shield } from 'lucide-react';
import type { AuditReportData } from './types';

interface TechnicalSEOCardProps {
  technical: AuditReportData['technicalSEO'];
}

function StatusIcon({ status }: { status: 'good' | 'warning' | 'error' | boolean }) {
  if (status === true || status === 'good') return <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />;
  if (status === 'warning') return <AlertTriangle className="w-4 h-4 text-yellow-600 flex-shrink-0" />;
  return <XCircle className="w-4 h-4 text-red-500 flex-shrink-0" />;
}

function StatusBadge({ status, label }: { status: 'good' | 'warning' | 'error' | boolean; label: string }) {
  const color = (status === true || status === 'good')
    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
    : status === 'warning'
    ? 'bg-yellow-50 text-yellow-700 border-yellow-200'
    : 'bg-red-50 text-red-600 border-red-200';
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${color}`}>{label}</span>
  );
}

export function TechnicalSEOCard({ technical }: TechnicalSEOCardProps) {
  const items = [
    {
      label: 'Title Tag',
      status: technical.titleTag.status,
      detail: technical.titleTag.present
        ? `${technical.titleTag.length} chars — "${technical.titleTag.content.slice(0, 40)}${technical.titleTag.content.length > 40 ? '...' : ''}"`
        : 'Not found',
    },
    {
      label: 'Meta Description',
      status: technical.metaDescription.status,
      detail: technical.metaDescription.present
        ? `${technical.metaDescription.length} chars`
        : 'Not found',
    },
    {
      label: 'H1 Heading',
      status: technical.h1Tag.status,
      detail: technical.h1Tag.present
        ? `${technical.h1Tag.count} tag${technical.h1Tag.count !== 1 ? 's' : ''} found`
        : 'Not found',
    },
    {
      label: 'HTTPS / SSL',
      status: technical.httpsEnabled,
      detail: technical.httpsEnabled ? 'Secure connection' : 'No HTTPS detected',
    },
    {
      label: 'Canonical Tag',
      status: technical.canonicalTag,
      detail: technical.canonicalTag ? 'Present' : 'Missing',
    },
    {
      label: 'Viewport Meta',
      status: technical.viewportMeta,
      detail: technical.viewportMeta ? 'Mobile ready' : 'Missing',
    },
  ];

  const passCount = items.filter(i => i.status === true || i.status === 'good').length;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center">
            <Shield className="w-4 h-4 text-[#1D4ED8]" />
          </div>
          <div>
            <h3 className="text-[#111111] font-bold">Technical SEO</h3>
            <p className="text-[#999999] text-xs">{passCount}/{items.length} checks passed</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-black text-[#111111]">{Math.round((passCount / items.length) * 100)}%</div>
          <div className="text-[#999999] text-xs">Pass rate</div>
        </div>
      </div>

      <div className="w-full bg-gray-100 rounded-full h-1.5 mb-5 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#1D4ED8] to-[#2563EB] rounded-full transition-all duration-1000"
          style={{ width: `${Math.round((passCount / items.length) * 100)}%` }}
        />
      </div>

      <div className="space-y-3">
        {items.map((item, i) => (
          <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
            <div className="flex items-center gap-2.5 min-w-0">
              <StatusIcon status={item.status} />
              <span className="text-[#333333] text-sm font-medium">{item.label}</span>
            </div>
            <div className="flex items-center gap-2 ml-2 flex-shrink-0">
              <span className="text-[#999999] text-xs hidden sm:block truncate max-w-[140px]">{item.detail}</span>
              <StatusBadge
                status={item.status}
                label={(item.status === true || item.status === 'good') ? 'Pass' : item.status === 'warning' ? 'Warn' : 'Fail'}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
