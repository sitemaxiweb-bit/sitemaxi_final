import { CheckCircle, XCircle, AlertTriangle, Shield } from 'lucide-react';
import type { AuditReportData } from './types';

interface TechnicalSEOCardProps {
  technical: AuditReportData['technicalSEO'];
}

function StatusIcon({ status }: { status: 'good' | 'warning' | 'error' | boolean }) {
  if (status === true || status === 'good') return <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />;
  if (status === 'warning') return <AlertTriangle className="w-4 h-4 text-yellow-400 flex-shrink-0" />;
  return <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />;
}

function StatusBadge({ status, label }: { status: 'good' | 'warning' | 'error' | boolean; label: string }) {
  const color = (status === true || status === 'good')
    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
    : status === 'warning'
    ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
    : 'bg-red-500/10 text-red-400 border-red-500/20';
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
    <div className="bg-gray-900/80 border border-gray-700/50 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center">
            <Shield className="w-4 h-4 text-blue-400" />
          </div>
          <div>
            <h3 className="text-white font-bold">Technical SEO</h3>
            <p className="text-gray-500 text-xs">{passCount}/{items.length} checks passed</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-black text-white">{Math.round((passCount / items.length) * 100)}%</div>
          <div className="text-gray-500 text-xs">Pass rate</div>
        </div>
      </div>

      <div className="w-full bg-gray-800 rounded-full h-1.5 mb-5 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-1000"
          style={{ width: `${Math.round((passCount / items.length) * 100)}%` }}
        />
      </div>

      <div className="space-y-3">
        {items.map((item, i) => (
          <div key={i} className="flex items-center justify-between py-2 border-b border-gray-800/80 last:border-0">
            <div className="flex items-center gap-2.5 min-w-0">
              <StatusIcon status={item.status} />
              <span className="text-gray-300 text-sm font-medium">{item.label}</span>
            </div>
            <div className="flex items-center gap-2 ml-2 flex-shrink-0">
              <span className="text-gray-500 text-xs hidden sm:block truncate max-w-[140px]">{item.detail}</span>
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
