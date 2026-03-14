import { Zap, Smartphone, Monitor, Clock } from 'lucide-react';
import type { AuditReportData } from './types';

interface PageSpeedCardProps {
  pageSpeed: AuditReportData['pageSpeed'];
  mobileFriendly: boolean;
}

function SpeedMeter({ score, label, icon }: { score: number; label: string; icon: React.ReactNode }) {
  const color = score >= 75 ? '#16a34a' : score >= 50 ? '#ca8a04' : '#dc2626';
  const bgColor = score >= 75 ? 'bg-emerald-50 border-emerald-200' : score >= 50 ? 'bg-yellow-50 border-yellow-200' : 'bg-red-50 border-red-200';
  const textColor = score >= 75 ? 'text-emerald-700' : score >= 50 ? 'text-yellow-700' : 'text-red-600';
  const statusLabel = score >= 75 ? 'Fast' : score >= 50 ? 'Average' : 'Slow';

  return (
    <div className="flex-1">
      <div className="flex items-center gap-2 mb-3">
        <div className={`w-8 h-8 rounded-lg border flex items-center justify-center ${bgColor} ${textColor}`}>
          {icon}
        </div>
        <span className="text-[#666666] text-sm font-medium">{label}</span>
      </div>
      <div className="flex items-end gap-2 mb-2">
        <span className="text-4xl font-black text-[#111111]">{score}</span>
        <span className="text-[#999999] text-sm pb-1">/100</span>
        <span className={`text-sm font-semibold pb-1 ${textColor}`}>{statusLabel}</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000"
          style={{ width: `${score}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}

export function PageSpeedCard({ pageSpeed, mobileFriendly }: PageSpeedCardProps) {
  const metrics = [
    { label: 'LCP', value: pageSpeed.lcp, desc: 'Largest Contentful Paint' },
    { label: 'FCP', value: pageSpeed.fcp, desc: 'First Contentful Paint' },
    { label: 'CLS', value: pageSpeed.cls, desc: 'Cumulative Layout Shift' },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 bg-yellow-50 border border-yellow-200 rounded-xl flex items-center justify-center">
          <Zap className="w-4 h-4 text-yellow-600" />
        </div>
        <div>
          <h3 className="text-[#111111] font-bold">Page Speed</h3>
          <p className="text-[#999999] text-xs">Google PageSpeed Insights data</p>
        </div>
      </div>

      <div className="flex gap-6 mb-6">
        <SpeedMeter score={pageSpeed.mobileScore} label="Mobile" icon={<Smartphone className="w-4 h-4" />} />
        <div className="w-px bg-gray-100" />
        <SpeedMeter score={pageSpeed.desktopScore} label="Desktop" icon={<Monitor className="w-4 h-4" />} />
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4">
        {metrics.map((m, i) => (
          <div key={i} className="bg-gray-50 rounded-xl p-3 text-center border border-gray-100">
            <div className="flex items-center justify-center gap-1 text-[#999999] mb-1">
              <Clock className="w-3 h-3" />
              <span className="text-xs font-semibold">{m.label}</span>
            </div>
            <div className="text-[#111111] font-bold text-sm">{m.value}</div>
            <div className="text-[#999999] text-xs">{m.desc}</div>
          </div>
        ))}
      </div>

      <div className={`flex items-center justify-between p-3 rounded-xl border ${
        mobileFriendly
          ? 'bg-emerald-50 border-emerald-200'
          : 'bg-red-50 border-red-200'
      }`}>
        <div className="flex items-center gap-2">
          <Smartphone className={`w-4 h-4 ${mobileFriendly ? 'text-emerald-600' : 'text-red-500'}`} />
          <span className="text-sm font-medium text-[#333333]">Mobile Friendly</span>
        </div>
        <span className={`text-sm font-bold ${mobileFriendly ? 'text-emerald-700' : 'text-red-600'}`}>
          {mobileFriendly ? 'Yes' : 'No'}
        </span>
      </div>
    </div>
  );
}
