import { useState, useEffect, useRef } from 'react';
import { generateSrcSet, generateSizesAttribute, getLowQualityPlaceholder } from '../utils/imageOptimization';

export interface OptimizedImageProps {
  src: string;
  alt: string;
  title?: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  aspectRatio?: string;
  lazy?: boolean;
  blur?: boolean;
  sizes?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export function OptimizedImage({
  src,
  alt,
  title,
  width,
  height,
  className = '',
  priority = false,
  objectFit = 'cover',
  aspectRatio,
  lazy = true,
  blur = true,
  sizes,
  onLoad,
  onError,
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(!lazy || priority);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!lazy || priority) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px',
        threshold: 0.01,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [lazy, priority]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  const isExternalImage = src.startsWith('http');
  const shouldGenerateSrcSet = isExternalImage && (src.includes('pexels.com') || src.includes('supabase.co'));

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    aspectRatio: aspectRatio,
    overflow: 'hidden',
  };

  const imageStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit,
    transition: blur ? 'opacity 0.3s ease-in-out, filter 0.3s ease-in-out' : 'opacity 0.3s ease-in-out',
    opacity: isLoaded ? 1 : 0,
    filter: blur && !isLoaded ? 'blur(10px)' : 'none',
  };

  const placeholderStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit,
    filter: 'blur(10px)',
    transform: 'scale(1.1)',
    opacity: isLoaded ? 0 : 1,
    transition: 'opacity 0.3s ease-in-out',
  };

  if (hasError) {
    return (
      <div className={className} style={containerStyle}>
        <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-500">
          <span className="text-sm">Image not available</span>
        </div>
      </div>
    );
  }

  return (
    <div className={className} style={containerStyle}>
      {blur && !isLoaded && isInView && (
        <img
          src={getLowQualityPlaceholder(src)}
          alt=""
          style={placeholderStyle}
          aria-hidden="true"
        />
      )}

      {isInView && (
        <picture>
          {shouldGenerateSrcSet && (
            <>
              <source
                type="image/webp"
                srcSet={generateSrcSet(src, undefined, 'webp')}
                sizes={sizes || generateSizesAttribute()}
              />
              <source
                type="image/jpeg"
                srcSet={generateSrcSet(src, undefined, 'jpg')}
                sizes={sizes || generateSizesAttribute()}
              />
            </>
          )}
          <img
            ref={imgRef}
            src={src}
            alt={alt}
            title={title}
            width={width}
            height={height}
            loading={priority ? 'eager' : 'lazy'}
            decoding={priority ? 'sync' : 'async'}
            fetchpriority={priority ? 'high' : 'auto'}
            onLoad={handleLoad}
            onError={handleError}
            style={imageStyle}
          />
        </picture>
      )}
    </div>
  );
}

interface BackgroundImageProps {
  src: string;
  alt: string;
  children?: React.ReactNode;
  className?: string;
  overlay?: boolean;
  overlayColor?: string;
  overlayOpacity?: number;
  lazy?: boolean;
  priority?: boolean;
}

export function BackgroundImage({
  src,
  alt,
  children,
  className = '',
  overlay = false,
  overlayColor = 'black',
  overlayOpacity = 0.5,
  lazy = true,
  priority = false,
}: BackgroundImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(!lazy || priority);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!lazy || priority) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '100px',
        threshold: 0.01,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [lazy, priority]);

  useEffect(() => {
    if (!isInView) return;

    const img = new Image();
    img.src = src;
    img.onload = () => setIsLoaded(true);
  }, [isInView, src]);

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      role="img"
      aria-label={alt}
    >
      {isInView && (
        <div
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-500"
          style={{
            backgroundImage: `url(${src})`,
            opacity: isLoaded ? 1 : 0,
          }}
        />
      )}

      {overlay && (
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: overlayColor,
            opacity: overlayOpacity,
          }}
        />
      )}

      <div className="relative z-10">{children}</div>
    </div>
  );
}
