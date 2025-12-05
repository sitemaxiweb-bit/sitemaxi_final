interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
  type: 'avatar' | 'featured';
}

export function ResponsiveImage({ src, alt, className = '', type }: ResponsiveImageProps) {
  const baseUrl = src.replace(/-lg\.(jpg|jpeg|png|webp)$/i, '');
  const extension = src.split('.').pop()?.toLowerCase() || 'jpg';

  const getSrcSet = () => {
    if (type === 'avatar') {
      return `
        ${baseUrl}-sm.${extension} 80w,
        ${baseUrl}-md.${extension} 150w,
        ${baseUrl}-lg.${extension} 400w
      `.trim();
    } else {
      return `
        ${baseUrl}-sm.${extension} 640w,
        ${baseUrl}-md.${extension} 960w,
        ${baseUrl}-lg.${extension} 1200w,
        ${baseUrl}-xl.${extension} 1920w
      `.trim();
    }
  };

  const getSizes = () => {
    if (type === 'avatar') {
      return '(max-width: 640px) 40px, (max-width: 768px) 80px, 150px';
    } else {
      return '(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px';
    }
  };

  if (!src.match(/-lg\.(jpg|jpeg|png|webp)$/i)) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        loading="lazy"
      />
    );
  }

  return (
    <img
      src={src}
      srcSet={getSrcSet()}
      sizes={getSizes()}
      alt={alt}
      className={className}
      loading="lazy"
    />
  );
}
