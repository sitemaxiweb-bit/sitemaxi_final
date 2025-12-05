export interface ImageSizes {
  mobile: number;
  tablet: number;
  desktop: number;
  large: number;
}

export const defaultImageSizes: ImageSizes = {
  mobile: 640,
  tablet: 768,
  desktop: 1024,
  large: 1920,
};

export function generateSrcSet(
  baseUrl: string,
  sizes: ImageSizes = defaultImageSizes,
  format: 'webp' | 'jpg' | 'png' = 'webp'
): string {
  const srcSetEntries = [
    `${baseUrl}?w=${sizes.mobile}&fm=${format}&q=80 ${sizes.mobile}w`,
    `${baseUrl}?w=${sizes.tablet}&fm=${format}&q=80 ${sizes.tablet}w`,
    `${baseUrl}?w=${sizes.desktop}&fm=${format}&q=85 ${sizes.desktop}w`,
    `${baseUrl}?w=${sizes.large}&fm=${format}&q=85 ${sizes.large}w`,
  ];

  return srcSetEntries.join(', ');
}

export function generateSizesAttribute(
  breakpoints?: { maxWidth: string; size: string }[]
): string {
  if (breakpoints) {
    return breakpoints
      .map(bp => `(max-width: ${bp.maxWidth}) ${bp.size}`)
      .join(', ');
  }

  return '(max-width: 640px) 100vw, (max-width: 768px) 90vw, (max-width: 1024px) 80vw, 1200px';
}

export function getOptimizedImageUrl(
  url: string,
  width: number,
  format: 'webp' | 'jpg' | 'png' = 'webp',
  quality: number = 80
): string {
  if (url.includes('pexels.com')) {
    return url.replace(/w=\d+/, `w=${width}`);
  }

  if (url.includes('supabase.co/storage')) {
    return `${url}?width=${width}&format=${format}&quality=${quality}`;
  }

  return url;
}

export function generateImageFileName(description: string, extension: string = 'webp'): string {
  const slug = description
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  return `${slug}.${extension}`;
}

export function getImageAltText(context: {
  page: string;
  subject: string;
  action?: string;
  location?: string;
}): string {
  const parts = [context.subject];

  if (context.action) {
    parts.push(context.action);
  }

  if (context.location) {
    parts.push(`in ${context.location}`);
  }

  parts.push(`| ${context.page} | SiteMaxi Digital Marketing`);

  return parts.join(' ');
}

export interface ImageMetadata {
  src: string;
  alt: string;
  title?: string;
  width?: number;
  height?: number;
  caption?: string;
  license?: string;
}

export function createImageMetadata(params: {
  filename: string;
  description: string;
  page: string;
  dimensions?: { width: number; height: number };
  caption?: string;
}): ImageMetadata {
  return {
    src: `/${params.filename}`,
    alt: getImageAltText({
      page: params.page,
      subject: params.description,
    }),
    title: params.description,
    width: params.dimensions?.width,
    height: params.dimensions?.height,
    caption: params.caption,
  };
}

export const imageFormats = {
  webp: {
    quality: 80,
    compression: 'lossy',
    supports: 'modern browsers',
  },
  avif: {
    quality: 75,
    compression: 'superior',
    supports: 'Chrome 85+, Firefox 93+',
  },
  jpg: {
    quality: 85,
    compression: 'lossy',
    supports: 'all browsers',
  },
  png: {
    quality: 100,
    compression: 'lossless',
    supports: 'all browsers',
  },
};

export function shouldUseWebP(): boolean {
  if (typeof window === 'undefined') return true;

  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;

  return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
}

export function preloadImage(url: string, type: 'image' | 'fetchpriority' = 'image'): void {
  if (typeof window === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = type;
  link.href = url;

  if (type === 'fetchpriority') {
    link.setAttribute('fetchpriority', 'high');
  }

  document.head.appendChild(link);
}

export function getLowQualityPlaceholder(url: string): string {
  return `${url}?w=20&blur=10&q=30`;
}
