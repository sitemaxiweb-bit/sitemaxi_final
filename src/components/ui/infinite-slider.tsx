import { cn } from '../../lib/cn';
import { useMotionValue, animate, motion } from 'framer-motion';
import { useState, useEffect, useRef, useCallback } from 'react';

type InfiniteSliderProps = {
  children: React.ReactNode;
  gap?: number;
  duration?: number;
  durationOnHover?: number;
  speed?: number;
  speedOnHover?: number;
  direction?: 'horizontal' | 'vertical';
  reverse?: boolean;
  className?: string;
};

export function InfiniteSlider({
  children,
  gap = 16,
  duration = 25,
  durationOnHover,
  speed,
  speedOnHover,
  direction = 'horizontal',
  reverse = false,
  className,
}: InfiniteSliderProps) {
  const effectiveDuration = speed ? speed : duration;
  const effectiveDurationOnHover = speedOnHover ? speedOnHover : durationOnHover;

  const [currentDuration, setCurrentDuration] = useState(effectiveDuration);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const innerRef = useRef<HTMLDivElement>(null);
  const translation = useMotionValue(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [key, setKey] = useState(0);

  const measureRef = useCallback((node: HTMLDivElement | null) => {
    if (!node) return;
    (innerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setSize({ width: entry.contentRect.width, height: entry.contentRect.height });
      }
    });
    ro.observe(node);
  }, []);

  const { width, height } = size;

  useEffect(() => {
    let controls: { stop: () => void } | undefined;
    const s = direction === 'horizontal' ? width : height;
    const contentSize = s + gap;
    const from = reverse ? -contentSize / 2 : 0;
    const to = reverse ? 0 : -contentSize / 2;

    if (contentSize <= gap) return;

    if (isTransitioning) {
      controls = animate(translation, [translation.get(), to], {
        ease: 'linear',
        duration: currentDuration * Math.abs((translation.get() - to) / contentSize),
        onComplete: () => {
          setIsTransitioning(false);
          setKey((prevKey) => prevKey + 1);
        },
      });
    } else {
      controls = animate(translation, [from, to], {
        ease: 'linear',
        duration: currentDuration,
        repeat: Infinity,
        repeatType: 'loop',
        repeatDelay: 0,
        onRepeat: () => {
          translation.set(from);
        },
      });
    }

    return controls?.stop;
  }, [key, translation, currentDuration, width, height, gap, isTransitioning, direction, reverse]);

  const hoverProps = effectiveDurationOnHover
    ? {
        onHoverStart: () => {
          setIsTransitioning(true);
          setCurrentDuration(effectiveDurationOnHover);
        },
        onHoverEnd: () => {
          setIsTransitioning(true);
          setCurrentDuration(effectiveDuration);
        },
      }
    : {};

  return (
    <div className={cn('overflow-hidden', className)}>
      <motion.div
        className="flex w-max"
        style={{
          ...(direction === 'horizontal' ? { x: translation } : { y: translation }),
          gap: `${gap}px`,
          flexDirection: direction === 'horizontal' ? 'row' : 'column',
        }}
        ref={measureRef}
        {...hoverProps}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}
