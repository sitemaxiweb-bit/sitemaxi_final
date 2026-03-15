import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  MousePointerClick,
  BarChart3,
  Cpu,
  Wrench,
  TrendingUp,
  MapPin,
  Globe,
  Shield,
  Zap,
} from 'lucide-react';
import { cn } from '../lib/cn';

const FEATURES = [
  {
    id: 'seo',
    label: 'SEO Expertise',
    icon: Search,
    image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?q=80&w=1200',
    description: 'Deep technical and content SEO that builds lasting organic visibility for your business.',
  },
  {
    id: 'ads',
    label: 'Paid Advertising',
    icon: MousePointerClick,
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1200',
    description: 'Google Ads and paid social campaigns managed by certified professionals who optimize for ROI.',
  },
  {
    id: 'growth',
    label: 'Growth Strategy',
    icon: BarChart3,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200',
    description: 'A clear roadmap aligned to your business goals, not just vanity metrics.',
  },
  {
    id: 'ai',
    label: 'AI & Automation',
    icon: Cpu,
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1200',
    description: 'We leverage AI tools and marketing automation to move faster and smarter than traditional agencies.',
  },
  {
    id: 'conversion',
    label: 'Conversion Optimization',
    icon: Wrench,
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1200',
    description: 'Every landing page and website we build is designed to turn visitors into paying customers.',
  },
  {
    id: 'longterm',
    label: 'Long-Term Growth',
    icon: TrendingUp,
    image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1200',
    description: 'We build sustainable systems, not short-term tactics. Your marketing compounds over time.',
  },
  {
    id: 'local',
    label: 'Local SEO',
    icon: MapPin,
    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1200',
    description: 'Dominate Google Maps and local search results in every city you serve.',
  },
  {
    id: 'global',
    label: 'Global Reach',
    icon: Globe,
    image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1200',
    description: 'Scale beyond your local market with proven strategies for national growth.',
  },
  {
    id: 'security',
    label: 'Trusted & Transparent',
    icon: Shield,
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200',
    description: 'No hidden fees, no lock-in contracts. Just honest reporting and real results.',
  },
  {
    id: 'speed',
    label: 'Fast Execution',
    icon: Zap,
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200',
    description: 'We move quickly. Most clients see measurable results within the first 30 days.',
  },
];

const AUTO_PLAY_INTERVAL = 3000;
const ITEM_HEIGHT = 65;

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

const BRAND_BLUE = '#1D4ED8';

export function FeatureCarousel() {
  const [step, setStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const currentIndex = ((step % FEATURES.length) + FEATURES.length) % FEATURES.length;

  const nextStep = useCallback(() => {
    setStep((prev) => prev + 1);
  }, []);

  const handleChipClick = (index: number) => {
    const diff = (index - currentIndex + FEATURES.length) % FEATURES.length;
    if (diff > 0) setStep((s) => s + diff);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextStep, AUTO_PLAY_INTERVAL);
    return () => clearInterval(interval);
  }, [nextStep, isPaused]);

  const getCardStatus = (index: number) => {
    const diff = index - currentIndex;
    const len = FEATURES.length;
    let normalizedDiff = diff;
    if (diff > len / 2) normalizedDiff -= len;
    if (diff < -len / 2) normalizedDiff += len;
    if (normalizedDiff === 0) return 'active';
    if (normalizedDiff === -1) return 'prev';
    if (normalizedDiff === 1) return 'next';
    return 'hidden';
  };

  return (
    <div className="w-full max-w-7xl mx-auto md:p-4">
      <div className="relative overflow-hidden rounded-[2.5rem] lg:rounded-[4rem] flex flex-col lg:flex-row min-h-[600px] lg:aspect-video border border-gray-200">
        <div
          className="w-full lg:w-[40%] min-h-[350px] md:min-h-[450px] lg:h-full relative z-30 flex flex-col items-start justify-center overflow-hidden px-8 md:px-16 lg:pl-16"
          style={{ backgroundColor: BRAND_BLUE }}
        >
          <div
            className="absolute inset-x-0 top-0 h-12 md:h-20 lg:h-16 z-40"
            style={{ background: `linear-gradient(to bottom, ${BRAND_BLUE}, transparent)` }}
          />
          <div
            className="absolute inset-x-0 bottom-0 h-12 md:h-20 lg:h-16 z-40"
            style={{ background: `linear-gradient(to top, ${BRAND_BLUE}, transparent)` }}
          />

          <div className="relative w-full h-full flex items-center justify-center lg:justify-start z-20">
            {FEATURES.map((feature, index) => {
              const isActive = index === currentIndex;
              const distance = index - currentIndex;
              const wrappedDistance = wrap(-(FEATURES.length / 2), FEATURES.length / 2, distance);
              const Icon = feature.icon;

              return (
                <motion.div
                  key={feature.id}
                  style={{ height: ITEM_HEIGHT, width: 'fit-content' }}
                  animate={{
                    y: wrappedDistance * ITEM_HEIGHT,
                    opacity: 1 - Math.abs(wrappedDistance) * 0.25,
                  }}
                  transition={{ type: 'spring', stiffness: 90, damping: 22, mass: 1 }}
                  className="absolute flex items-center justify-start"
                >
                  <button
                    onClick={() => handleChipClick(index)}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    className={cn(
                      'relative flex items-center gap-4 px-6 md:px-10 lg:px-8 py-3.5 md:py-5 lg:py-4 rounded-full transition-all duration-700 text-left group border',
                      isActive
                        ? 'bg-white border-white z-10'
                        : 'bg-transparent text-white/60 border-white/20 hover:border-white/40 hover:text-white'
                    )}
                  >
                    <div
                      className={cn(
                        'flex items-center justify-center transition-colors duration-500',
                        isActive ? '' : 'text-white/40'
                      )}
                      style={isActive ? { color: BRAND_BLUE } : {}}
                    >
                      <Icon size={18} strokeWidth={2} />
                    </div>
                    <span
                      className={cn(
                        'font-normal text-sm md:text-[15px] tracking-tight whitespace-nowrap uppercase',
                        isActive ? '' : 'text-white/70'
                      )}
                      style={isActive ? { color: BRAND_BLUE } : {}}
                    >
                      {feature.label}
                    </span>
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="flex-1 min-h-[500px] md:min-h-[600px] lg:h-full relative bg-gray-50 flex items-center justify-center py-16 md:py-24 lg:py-16 px-6 md:px-12 lg:px-10 overflow-hidden border-t lg:border-t-0 lg:border-l border-gray-200">
          <div className="relative w-full max-w-[420px] aspect-[4/5] flex items-center justify-center">
            {FEATURES.map((feature, index) => {
              const status = getCardStatus(index);
              const isActive = status === 'active';
              const isPrev = status === 'prev';
              const isNext = status === 'next';
              const Icon = feature.icon;

              return (
                <motion.div
                  key={feature.id}
                  initial={false}
                  animate={{
                    x: isActive ? 0 : isPrev ? -100 : isNext ? 100 : 0,
                    scale: isActive ? 1 : isPrev || isNext ? 0.85 : 0.7,
                    opacity: isActive ? 1 : isPrev || isNext ? 0.4 : 0,
                    rotate: isPrev ? -3 : isNext ? 3 : 0,
                    zIndex: isActive ? 20 : isPrev || isNext ? 10 : 0,
                    pointerEvents: isActive ? 'auto' : 'none',
                  }}
                  transition={{ type: 'spring', stiffness: 260, damping: 25, mass: 0.8 }}
                  className="absolute inset-0 rounded-[2rem] md:rounded-[2.8rem] overflow-hidden border-4 md:border-8 border-white bg-white origin-center shadow-xl"
                >
                  <img
                    src={feature.image}
                    alt={feature.label}
                    className={cn(
                      'w-full h-full object-cover transition-all duration-700',
                      isActive ? 'grayscale-0 blur-0' : 'grayscale blur-[2px] brightness-75'
                    )}
                  />

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute inset-x-0 bottom-0 p-10 pt-32 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end pointer-events-none"
                      >
                        <div className="bg-white text-[#111111] px-4 py-1.5 rounded-full text-[11px] font-normal uppercase tracking-[0.2em] w-fit shadow-lg mb-3 border border-gray-200">
                          {index + 1} &bull; {feature.label}
                        </div>
                        <p className="text-white font-normal text-xl md:text-2xl leading-tight drop-shadow-md tracking-tight">
                          {feature.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div
                    className={cn(
                      'absolute top-8 left-8 flex items-center gap-3 transition-opacity duration-300',
                      isActive ? 'opacity-100' : 'opacity-0'
                    )}
                  >
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                      <Icon size={14} className="text-white" strokeWidth={2} />
                    </div>
                    <span className="text-white/80 text-[10px] font-normal uppercase tracking-[0.3em] font-mono">
                      SiteMaxi
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
