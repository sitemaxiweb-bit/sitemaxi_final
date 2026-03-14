import { TrendingUp, ArrowUp, Minus, ArrowDown } from 'lucide-react';
import type { Recommendation } from './types';

interface RecommendationsListProps {
  recommendations: Recommendation[];
}

export function RecommendationsList({ recommendations }: RecommendationsListProps) {
  function getPriorityStyle(priority: Recommendation['priority']) {
    if (priority === 'high') return {
      icon: <ArrowUp className="w-3 h-3" />,
      color: 'text-red-400',
      bg: 'bg-red-500/10 border-red-500/20',
      dot: 'bg-red-400',
      label: 'High Priority',
    };
    if (priority === 'medium') return {
      icon: <Minus className="w-3 h-3" />,
      color: 'text-yellow-400',
      bg: 'bg-yellow-500/10 border-yellow-500/20',
      dot: 'bg-yellow-400',
      label: 'Medium Priority',
    };
    return {
      icon: <ArrowDown className="w-3 h-3" />,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10 border-blue-500/20',
      dot: 'bg-blue-400',
      label: 'Low Priority',
    };
  }

  return (
    <div className="bg-gray-900/80 border border-gray-700/50 rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-9 h-9 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center">
          <TrendingUp className="w-4 h-4 text-emerald-400" />
        </div>
        <div>
          <h3 className="text-white font-bold">Recommendations</h3>
          <p className="text-gray-500 text-xs">{recommendations.length} actionable improvements</p>
        </div>
      </div>

      {recommendations.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <TrendingUp className="w-8 h-8 mx-auto mb-2 opacity-30" />
          <p className="text-sm">No recommendations — great job!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {recommendations.map((rec, i) => {
            const style = getPriorityStyle(rec.priority);
            return (
              <div key={i} className="flex gap-3 p-3 bg-gray-800/50 rounded-xl border border-gray-700/30 hover:border-gray-600/50 transition-colors">
                <div className="flex-shrink-0 mt-0.5">
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${style.bg} ${style.color}`}>
                    {style.icon}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-gray-200 text-sm font-semibold leading-tight">{rec.title}</span>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border flex-shrink-0 ${style.bg} ${style.color}`}>
                      {rec.priority.charAt(0).toUpperCase() + rec.priority.slice(1)}
                    </span>
                  </div>
                  <p className="text-gray-500 text-xs mt-1 leading-relaxed">{rec.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
