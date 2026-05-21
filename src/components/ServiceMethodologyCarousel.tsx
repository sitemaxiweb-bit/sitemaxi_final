import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '../lib/cn';
import { supabase } from '../lib/supabase';

export interface MethodologyStep {
  id: string;
  label: string;
  icon: LucideIcon;
  description: string;
  /** Fallback image used when no DB record exists for this step */
  fallbackImage: string;
}

interface Props {
  serviceSlug: string;
  steps: MethodologyStep[];
  heading?: string;
  label?: string;
}

const AUTO_PLAY_INTERVAL = 5500;
const ITEM_HEIGHT = 65;
const BRAND_BLUE = '#1D4ED8';

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

export function ServiceMethodologyCarousel({
  serviceSlug,
  steps,
  heading = 'A Clear Process, Not a Black Box',
  label = 'Our Methodology',
}: Props) {
  const [step, setStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [images, setImages] = useState<Record<number, string>>({});

  const currentIndex = ((step % steps.length) + steps.length) % steps.length;

  // Load images from Supabase; fall back to each step's fallbackImage
  useEffect(() => {
    async function loadImages() {
      const { data } = await supabase
        .from('service_page_images')
        .select('step_index, image_url')
        .eq('service_slug', serviceSlug);

      if (data && data.length > 0) {
        const map: Record<number, string> = {};
        data.forEach((row) => {
          if (row.image_url) map[row.step_index] = row.image_url;
        });
        setImages(map);
      }
    }
    loadImages();
  }, [serviceSlug]);

  const getImage = (index: number) =>
    images[index] || steps[index]?.fallbackImage || '';

  const nextStep = useCallback(() => {
    setStep((prev) => prev + 1);
  }, []);

  const handleChipClick = (index: number) => {
    const diff = (index - currentIndex + steps.length) % steps.length;
    if (diff > 0) setStep((s) => s + diff);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextStep, AUTO_PLAY_INTERVAL);
    return () => clearInterval(interval);
  }, [nextStep, isPaused]);

  const getCardStatus = (index: number) => {
    const diff = index - currentIndex;
    const len = steps.length;
    let normalizedDiff = diff;
    if (diff > len / 2) normalizedDiff -= len;
    if (diff < -len / 2) normalizedDiff += len;
    if (normalizedDiff === 0) return 'active';
    if (normalizedDiff === -1) return 'prev';
    if (normalizedDiff === 1) return 'next';
    return 'hidden';
  };

  return (
    <section id="how-it-works" className="py-24 px-4 md:px-12 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-14">
          <span
            className="text-[#0058BE] text-xs font-medium tracking-widest uppercase mb-3 block"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            {label}
          </span>
          <h2
            className="text-3xl md:text-5xl font-bold text-[#111111] leading-tight"
            style={{ fontFamily: "'Hanken Grotesk', sans-serif", letterSpacing: '-0.02em' }}
          >
            {heading}
          </h2>
        </div>

        {/* Carousel — matches FeatureCarousel structure exactly */}
        <div className="w-full max-w-7xl mx-auto md:p-4">
          <div className="relative overflow-hidden rounded-[2.5rem] lg:rounded-[4rem] flex flex-col lg:flex-row min-h-[600px] lg:aspect-video border border-gray-200">

            {/* Left — step pills */}
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
                {steps.map((s, index) => {
                  const isActive = index === currentIndex;
                  const distance = index - currentIndex;
                  const wrappedDistance = wrap(-(steps.length / 2), steps.length / 2, distance);
                  const Icon = s.icon;

                  return (
                    <motion.div
                      key={s.id}
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
                          {s.label}
                        </span>
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Right — animated image cards */}
            <div className="flex-1 min-h-[500px] md:min-h-[600px] lg:h-full relative bg-gray-50 flex items-center justify-center py-16 md:py-24 lg:py-16 px-6 md:px-12 lg:px-10 overflow-hidden border-t lg:border-t-0 lg:border-l border-gray-200">
              <div className="relative w-full max-w-[420px] aspect-[4/5] flex items-center justify-center">
                {steps.map((s, index) => {
                  const status = getCardStatus(index);
                  const isActive = status === 'active';
                  const isPrev = status === 'prev';
                  const isNext = status === 'next';
                  const Icon = s.icon;

                  return (
                    <motion.div
                      key={s.id}
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
                        src={getImage(index)}
                        alt={s.label}
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
                              {index + 1} &bull; {s.label}
                            </div>
                            <p className="text-white font-normal text-xl md:text-2xl leading-tight drop-shadow-md tracking-tight">
                              {s.description}
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
      </div>
    </section>
  );
}
