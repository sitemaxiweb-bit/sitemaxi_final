import { useState } from 'react';
import { XCircle, AlertTriangle, Info, ChevronDown, ChevronUp } from 'lucide-react';
import type { SEOIssue } from './types';

interface IssuesListProps {
  issues: SEOIssue[];
}

export function IssuesList({ issues }: IssuesListProps) {
  const [expanded, setExpanded] = useState<number[]>([]);

  function toggle(index: number) {
    setExpanded(prev => prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]);
  }

  const typeOrder = { error: 0, warning: 1, info: 2 };
  const sorted = [...issues].sort((a, b) => typeOrder[a.type] - typeOrder[b.type]);

  function getIconAndColor(type: SEOIssue['type']) {
    if (type === 'error') return { icon: <XCircle className="w-4 h-4" />, color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20', badge: 'bg-red-500/10 text-red-400 border-red-500/20', label: 'Critical' };
    if (type === 'warning') return { icon: <AlertTriangle className="w-4 h-4" />, color: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/20', badge: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20', label: 'Warning' };
    return { icon: <Info className="w-4 h-4" />, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20', badge: 'bg-blue-500/10 text-blue-400 border-blue-500/20', label: 'Info' };
  }

  return (
    <div className="bg-gray-900/80 border border-gray-700/50 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-white font-bold">Issues Found</h3>
        <div className="flex items-center gap-2 text-xs">
          <span className="bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-0.5 rounded-full font-semibold">
            {issues.filter(i => i.type === 'error').length} Critical
          </span>
          <span className="bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 px-2 py-0.5 rounded-full font-semibold">
            {issues.filter(i => i.type === 'warning').length} Warnings
          </span>
        </div>
      </div>

      {sorted.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <XCircle className="w-8 h-8 mx-auto mb-2 opacity-30" />
          <p className="text-sm">No issues found!</p>
        </div>
      ) : (
        <div className="space-y-2">
          {sorted.map((issue, i) => {
            const { icon, color, bg, badge, label } = getIconAndColor(issue.type);
            const isExpanded = expanded.includes(i);
            return (
              <div key={i} className={`border rounded-xl overflow-hidden ${bg}`}>
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center gap-3 p-3 text-left"
                >
                  <div className={`flex-shrink-0 ${color}`}>{icon}</div>
                  <span className="flex-1 text-gray-200 text-sm font-medium leading-tight">{issue.title}</span>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border flex-shrink-0 ${badge}`}>{label}</span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-500 flex-shrink-0" />
                  )}
                </button>
                {isExpanded && (
                  <div className="px-3 pb-3">
                    <p className="text-gray-400 text-xs leading-relaxed pl-7">{issue.description}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
