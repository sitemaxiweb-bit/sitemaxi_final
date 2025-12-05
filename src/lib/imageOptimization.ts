export interface ImageSize {
  width: number;
  height: number;
  suffix: string;
}

export const IMAGE_SIZES = {
  avatar: {
    thumbnail: { width: 40, height: 40, suffix: 'thumb' },
    small: { width: 80, height: 80, suffix: 'sm' },
    medium: { width: 150, height: 150, suffix: 'md' },
    large: { width: 400, height: 400, suffix: 'lg' },
  },
  featured: {
    thumbnail: { width: 400, height: 225, suffix: 'thumb' },
    small: { width: 640, height: 360, suffix: 'sm' },
    medium: { width: 960, height: 540, suffix: 'md' },
    large: { width: 1200, height: 630, suffix: 'lg' },
    xlarge: { width: 1920, height: 1080, suffix: 'xl' },
  }
};

export interface ProcessedImage {
  original: string;
  thumbnail?: string;
  small?: string;
  medium?: string;
  large?: string;
  xlarge?: string;
}

export async function resizeImage(
  file: File,
  maxWidth: number,
  maxHeight: number,
  quality: number = 0.85
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      reject(new Error('Could not get canvas context'));
      return;
    }

    img.onload = () => {
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to create blob'));
          }
        },
        'image/jpeg',
        quality
      );
    };

    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };

    img.src = URL.createObjectURL(file);
  });
}

export async function cropToSquare(file: File, size: number, quality: number = 0.9): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      reject(new Error('Could not get canvas context'));
      return;
    }

    img.onload = () => {
      const minDim = Math.min(img.width, img.height);
      const xOffset = (img.width - minDim) / 2;
      const yOffset = (img.height - minDim) / 2;

      canvas.width = size;
      canvas.height = size;

      ctx.drawImage(
        img,
        xOffset,
        yOffset,
        minDim,
        minDim,
        0,
        0,
        size,
        size
      );

      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to create blob'));
          }
        },
        'image/jpeg',
        quality
      );
    };

    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };

    img.src = URL.createObjectURL(file);
  });
}

export async function cropToAspectRatio(
  file: File,
  targetWidth: number,
  targetHeight: number,
  quality: number = 0.85
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      reject(new Error('Could not get canvas context'));
      return;
    }

    img.onload = () => {
      const targetRatio = targetWidth / targetHeight;
      const imgRatio = img.width / img.height;

      let sourceWidth = img.width;
      let sourceHeight = img.height;
      let sourceX = 0;
      let sourceY = 0;

      if (imgRatio > targetRatio) {
        sourceWidth = img.height * targetRatio;
        sourceX = (img.width - sourceWidth) / 2;
      } else {
        sourceHeight = img.width / targetRatio;
        sourceY = (img.height - sourceHeight) / 2;
      }

      canvas.width = targetWidth;
      canvas.height = targetHeight;

      ctx.drawImage(
        img,
        sourceX,
        sourceY,
        sourceWidth,
        sourceHeight,
        0,
        0,
        targetWidth,
        targetHeight
      );

      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to create blob'));
          }
        },
        'image/jpeg',
        quality
      );
    };

    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };

    img.src = URL.createObjectURL(file);
  });
}

export function getOptimalQuality(fileSize: number): number {
  if (fileSize < 500 * 1024) return 0.9;
  if (fileSize < 1024 * 1024) return 0.85;
  if (fileSize < 2 * 1024 * 1024) return 0.8;
  return 0.75;
}

export function generateFileName(originalName: string, suffix?: string): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(7);
  const extension = originalName.split('.').pop()?.toLowerCase() || 'jpg';
  const baseName = suffix ? `${timestamp}-${random}-${suffix}` : `${timestamp}-${random}`;
  return `${baseName}.${extension}`;
}
