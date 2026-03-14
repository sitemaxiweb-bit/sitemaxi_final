import { useEffect, useState } from 'react';
import { Search, Zap, BarChart3, Shield, Globe, CheckCircle } from 'lucide-react';

interface AuditLoadingProps {
  websiteUrl: string;
}

const steps = [
  { icon: <Globe className="w-5 h-5" />, label: 'Fetching website data...', duration: 3000 },
  { icon: <Search className="w-5 h-5" />, label: 'Analyzing title tags & meta data...', duration: 5000 },
  { icon: <Shield className="w-5 h-5" />, label: 'Checking technical SEO factors...', duration: 7000 },
  { icon: <Zap className="w-5 h-5" />, label: 'Running page speed tests...', duration: 20000 },
  { icon: <BarChart3 className="w-5 h-5" />, label: 'Generating AI recommendations...', duration: 30000 },
];

export function AuditLoading({ websiteUrl: _ }: AuditLoadingProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [dots, setDots] = useState('');

  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDots(d => d.length >= 3 ? '' : d + '.');
    }, 400);
    return () => clearInterval(dotInterval);
  }, []);

  useEffect(() => {
    let elapsed = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];

    steps.forEach((step, index) => {
      elapsed += step.duration / steps.length;
      const t = setTimeout(() => {
        setCompletedSteps(prev => [...prev, index]);
        if (index < steps.length - 1) setCurrentStep(index + 1);
      }, elapsed);
      timers.push(t);
    });

    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  const progress = Math.round(((completedSteps.length) / steps.length) * 100);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-lg text-center">
        <div className="relative w-24 h-24 mx-auto mb-8">
          <div className="absolute inset-0 border-4 border-gray-700 rounded-full" />
          <div
            className="absolute inset-0 border-4 border-emerald-500 rounded-full transition-all duration-1000"
            style={{
              clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.sin(2 * Math.PI * progress / 100)}% ${50 - 50 * Math.cos(2 * Math.PI * progress / 100)}%, 50% 50%)`,
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-black text-white">{progress}%</span>
          </div>
        </div>

        <h2 className="text-3xl font-black text-white mb-3">
          Analyzing Your Website{dots}
        </h2>
        <p className="text-gray-400 mb-10">This usually takes 30-60 seconds. Please don't close this page.</p>

        <div className="bg-gray-900/80 border border-gray-700/50 rounded-2xl p-6 text-left space-y-3">
          {steps.map((step, index) => {
            const isCompleted = completedSteps.includes(index);
            const isCurrent = currentStep === index && !isCompleted;

            return (
              <div
                key={index}
                className={`flex items-center gap-4 p-3 rounded-xl transition-all duration-300 ${
                  isCurrent ? 'bg-emerald-500/10 border border-emerald-500/20' :
                  isCompleted ? 'opacity-60' : 'opacity-30'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  isCompleted ? 'bg-emerald-500/20 text-emerald-400' :
                  isCurrent ? 'bg-emerald-500/10 text-emerald-400' :
                  'bg-gray-800 text-gray-600'
                }`}>
                  {isCompleted ? <CheckCircle className="w-4 h-4" /> : step.icon}
                </div>
                <span className={`text-sm font-medium ${
                  isCompleted ? 'text-gray-400 line-through' :
                  isCurrent ? 'text-white' : 'text-gray-600'
                }`}>
                  {step.label}
                </span>
                {isCurrent && (
                  <div className="ml-auto flex gap-1">
                    {[0, 1, 2].map(i => (
                      <div
                        key={i}
                        className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce"
                        style={{ animationDelay: `${i * 150}ms` }}
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-6 w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-1000"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
