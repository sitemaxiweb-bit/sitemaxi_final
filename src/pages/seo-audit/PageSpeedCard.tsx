import { Zap, Smartphone, Monitor, Clock } from 'lucide-react';
import type { AuditReportData } from './types';

interface PageSpeedCardProps {
  pageSpeed: AuditReportData['pageSpeed'];
  mobileFriendly: boolean;
}

function SpeedMeter({ score, label, icon }: { score: number; label: string; icon: React.ReactNode }) {
  const color = score >= 75 ? '#10b981' : score >= 50 ? '#eab308' : '#ef4444';
  const bgColor = score >= 75 ? 'bg-emerald-500/10 border-emerald-500/20' : score >= 50 ? 'bg-yellow-500/10 border-yellow-500/20' : 'bg-red-500/10 border-red-500/20';
  const textColor = score >= 75 ? 'text-emerald-400' : score >= 50 ? 'text-yellow-400' : 'text-red-400';
  const statusLabel = score >= 75 ? 'Fast' : score >= 50 ? 'Average' : 'Slow';

  return (
    <div className="flex-1">
      <div className="flex items-center gap-2 mb-3">
        <div className={`w-8 h-8 rounded-lg border flex items-center justify-center ${bgColor} ${textColor}`}>
          {icon}
        </div>
        <span className="text-gray-400 text-sm font-medium">{label}</span>
      </div>
      <div className="flex items-end gap-2 mb-2">
        <span className="text-4xl font-black text-white">{score}</span>
        <span className="text-gray-500 text-sm pb-1">/100</span>
        <span className={`text-sm font-semibold pb-1 ${textColor}`}>{statusLabel}</span>
      </div>
      <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
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
    <div className="bg-gray-900/80 border border-gray-700/50 rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 bg-yellow-500/10 border border-yellow-500/20 rounded-xl flex items-center justify-center">
          <Zap className="w-4 h-4 text-yellow-400" />
        </div>
        <div>
          <h3 className="text-white font-bold">Page Speed</h3>
          <p className="text-gray-500 text-xs">Google PageSpeed Insights data</p>
        </div>
      </div>

      <div className="flex gap-6 mb-6">
        <SpeedMeter score={pageSpeed.mobileScore} label="Mobile" icon={<Smartphone className="w-4 h-4" />} />
        <div className="w-px bg-gray-700/50" />
        <SpeedMeter score={pageSpeed.desktopScore} label="Desktop" icon={<Monitor className="w-4 h-4" />} />
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4">
        {metrics.map((m, i) => (
          <div key={i} className="bg-gray-800/60 rounded-xl p-3 text-center">
            <div className="flex items-center justify-center gap-1 text-gray-500 mb-1">
              <Clock className="w-3 h-3" />
              <span className="text-xs font-semibold">{m.label}</span>
            </div>
            <div className="text-white font-bold text-sm">{m.value}</div>
            <div className="text-gray-600 text-xs">{m.desc}</div>
          </div>
        ))}
      </div>

      <div className={`flex items-center justify-between p-3 rounded-xl border ${
        mobileFriendly
          ? 'bg-emerald-500/5 border-emerald-500/20'
          : 'bg-red-500/5 border-red-500/20'
      }`}>
        <div className="flex items-center gap-2">
          <Smartphone className={`w-4 h-4 ${mobileFriendly ? 'text-emerald-400' : 'text-red-400'}`} />
          <span className="text-sm font-medium text-gray-300">Mobile Friendly</span>
        </div>
        <span className={`text-sm font-bold ${mobileFriendly ? 'text-emerald-400' : 'text-red-400'}`}>
          {mobileFriendly ? 'Yes' : 'No'}
        </span>
      </div>
    </div>
  );
}
