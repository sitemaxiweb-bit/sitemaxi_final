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
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-lg text-center">
        <div className="flex flex-col items-center mb-8">
          <div className="generating-loader-wrapper">
            <div className="generating-loader-text">
              <span className="generating-loader-letter">G</span>
              <span className="generating-loader-letter">e</span>
              <span className="generating-loader-letter">n</span>
              <span className="generating-loader-letter">e</span>
              <span className="generating-loader-letter">r</span>
              <span className="generating-loader-letter">a</span>
              <span className="generating-loader-letter">t</span>
              <span className="generating-loader-letter">i</span>
              <span className="generating-loader-letter">n</span>
              <span className="generating-loader-letter">g</span>
            </div>
            <div className="generating-loader-bar"></div>
          </div>
        </div>

        <h2 className="text-3xl font-black text-[#111111] mb-3">
          Analyzing Your Website{dots}
        </h2>
        <p className="text-[#666666] mb-10">This usually takes 30-60 seconds. Please don't close this page.</p>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 text-left space-y-3 shadow-sm">
          {steps.map((step, index) => {
            const isCompleted = completedSteps.includes(index);
            const isCurrent = currentStep === index && !isCompleted;

            return (
              <div
                key={index}
                className={`flex items-center gap-4 p-3 rounded-xl transition-all duration-300 ${
                  isCurrent ? 'bg-blue-50 border border-blue-100' :
                  isCompleted ? 'opacity-60' : 'opacity-30'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  isCompleted ? 'bg-blue-50 text-[#1D4ED8]' :
                  isCurrent ? 'bg-blue-50 text-[#1D4ED8]' :
                  'bg-gray-100 text-gray-400'
                }`}>
                  {isCompleted ? <CheckCircle className="w-4 h-4" /> : step.icon}
                </div>
                <span className={`text-sm font-medium ${
                  isCompleted ? 'text-[#666666] line-through' :
                  isCurrent ? 'text-[#111111]' : 'text-gray-400'
                }`}>
                  {step.label}
                </span>
                {isCurrent && (
                  <div className="ml-auto flex gap-1">
                    {[0, 1, 2].map(i => (
                      <div
                        key={i}
                        className="w-1.5 h-1.5 bg-[#1D4ED8] rounded-full animate-bounce"
                        style={{ animationDelay: `${i * 150}ms` }}
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-6 w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#1D4ED8] to-[#2563EB] rounded-full transition-all duration-1000"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
