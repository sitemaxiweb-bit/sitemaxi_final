import { TrendingUp, ArrowUp, Minus, ArrowDown } from 'lucide-react';
import type { Recommendation } from './types';

interface RecommendationsListProps {
  recommendations: Recommendation[];
}

export function RecommendationsList({ recommendations }: RecommendationsListProps) {
  function getPriorityStyle(priority: Recommendation['priority']) {
    if (priority === 'high') return {
      icon: <ArrowUp className="w-3 h-3" />,
      color: 'text-red-600',
      bg: 'bg-red-50 border-red-200',
      dot: 'bg-red-500',
      label: 'High Priority',
    };
    if (priority === 'medium') return {
      icon: <Minus className="w-3 h-3" />,
      color: 'text-yellow-700',
      bg: 'bg-yellow-50 border-yellow-200',
      dot: 'bg-yellow-600',
      label: 'Medium Priority',
    };
    return {
      icon: <ArrowDown className="w-3 h-3" />,
      color: 'text-[#1D4ED8]',
      bg: 'bg-blue-50 border-blue-100',
      dot: 'bg-[#1D4ED8]',
      label: 'Low Priority',
    };
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-9 h-9 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center">
          <TrendingUp className="w-4 h-4 text-[#1D4ED8]" />
        </div>
        <div>
          <h3 className="text-[#111111] font-bold">Recommendations</h3>
          <p className="text-[#999999] text-xs">{recommendations.length} actionable improvements</p>
        </div>
      </div>

      {recommendations.length === 0 ? (
        <div className="text-center py-8 text-[#999999]">
          <TrendingUp className="w-8 h-8 mx-auto mb-2 opacity-30" />
          <p className="text-sm">No recommendations — great job!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {recommendations.map((rec, i) => {
            const style = getPriorityStyle(rec.priority);
            return (
              <div key={i} className="flex gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors">
                <div className="flex-shrink-0 mt-0.5">
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${style.bg} ${style.color}`}>
                    {style.icon}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[#333333] text-sm font-semibold leading-tight">{rec.title}</span>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border flex-shrink-0 ${style.bg} ${style.color}`}>
                      {rec.priority.charAt(0).toUpperCase() + rec.priority.slice(1)}
                    </span>
                  </div>
                  <p className="text-[#666666] text-xs mt-1 leading-relaxed">{rec.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
