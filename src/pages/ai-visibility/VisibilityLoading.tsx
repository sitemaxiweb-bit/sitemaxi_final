import { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

const STEPS = [
  { label: 'Connecting to AI platforms...', platform: null, progress: 15 },
  { label: 'Querying ChatGPT for brand mentions...', platform: 'ChatGPT', progress: 35 },
  { label: 'Querying Gemini for brand mentions...', platform: 'Gemini', progress: 55 },
  { label: 'Querying Claude for brand mentions...', platform: 'Claude', progress: 72 },
  { label: 'Analyzing competitor visibility...', platform: null, progress: 85 },
  { label: 'Generating insights and recommendations...', platform: null, progress: 95 },
];

interface VisibilityLoadingProps {
  brandName: string;
}

export function VisibilityLoading({ brandName }: VisibilityLoadingProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [completedPlatforms, setCompletedPlatforms] = useState<string[]>([]);

  useEffect(() => {
    let step = 0;
    function advance() {
      if (step >= STEPS.length) return;
      setStepIndex(step);
      setProgress(STEPS[step].progress);
      if (STEPS[step].platform) {
        setCompletedPlatforms(prev => [...prev, STEPS[step].platform!]);
      }
      step++;
      const delay = step === 1 ? 800 : step <= 4 ? 2200 : 1400;
      if (step < STEPS.length) setTimeout(advance, delay);
    }
    const t = setTimeout(advance, 400);
    return () => clearTimeout(t);
  }, []);

  const platforms = [
    { name: 'ChatGPT', color: 'bg-emerald-500' },
    { name: 'Gemini', color: 'bg-blue-500' },
    { name: 'Claude', color: 'bg-orange-500' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1e293b] flex items-center justify-center px-6 py-20">
      <div className="max-w-lg w-full text-center">
        <div className="relative w-24 h-24 mx-auto mb-8">
          <div className="absolute inset-0 rounded-full bg-[#1D4ED8]/20 animate-ping" />
          <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-[#1D4ED8] to-[#0891B2] flex items-center justify-center shadow-2xl shadow-blue-500/30">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
        </div>

        <h2 className="text-3xl font-black text-white mb-3">
          Analyzing your brand visibility<br />across AI platforms...
        </h2>
        <p className="text-slate-400 text-sm mb-10">
          Checking how <span className="text-white font-semibold">{brandName}</span> appears in ChatGPT, Gemini, and Claude responses
        </p>

        <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-white/70 text-sm font-medium">Analysis Progress</span>
            <span className="text-white font-bold text-sm">{progress}%</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-6">
            <div
              className="h-full bg-gradient-to-r from-[#1D4ED8] to-[#0891B2] rounded-full transition-all duration-700 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex justify-around">
            {platforms.map(p => {
              const active = STEPS[stepIndex]?.platform === p.name;
              const done = completedPlatforms.includes(p.name);
              return (
                <div key={p.name} className="flex flex-col items-center gap-2">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 ${done ? p.color + ' shadow-lg' : active ? 'bg-white/20 animate-pulse' : 'bg-white/5'}`}>
                    <span className={`text-xs font-bold transition-colors ${done || active ? 'text-white' : 'text-white/30'}`}>
                      {p.name[0]}
                    </span>
                  </div>
                  <span className={`text-xs font-medium transition-colors ${done ? 'text-white' : active ? 'text-white/70' : 'text-white/30'}`}>
                    {p.name}
                  </span>
                  {done && (
                    <span className="text-xs text-emerald-400 font-semibold">Done</span>
                  )}
                  {active && !done && (
                    <span className="text-xs text-blue-300 animate-pulse">Checking...</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <p className="text-slate-500 text-sm animate-pulse">
          {STEPS[stepIndex]?.label ?? 'Finalizing report...'}
        </p>
      </div>
    </div>
  );
}
