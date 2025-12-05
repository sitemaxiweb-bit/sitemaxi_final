import { ReactNode } from 'react';
import { useScrollAnimation } from '../utils/scrollAnimation';

interface ScrollAnimateWrapperProps {
  children: ReactNode;
  animation?: 'fade-up' | 'slide-left' | 'slide-right' | 'scale';
  delay?: number;
  className?: string;
}

export function ScrollAnimateWrapper({
  children,
  animation = 'fade-up',
  delay = 0,
  className = ''
}: ScrollAnimateWrapperProps) {
  const { ref, isVisible } = useScrollAnimation();

  const animationClass = {
    'fade-up': 'scroll-animate',
    'slide-left': 'scroll-animate-left',
    'slide-right': 'scroll-animate-right',
    'scale': 'scroll-animate-scale'
  }[animation];

  const delayClass = delay > 0 ? `delay-${delay}` : '';

  return (
    <div
      ref={ref}
      className={`${animationClass} ${isVisible ? 'visible' : ''} ${delayClass} ${className}`}
    >
      {children}
    </div>
  );
}
