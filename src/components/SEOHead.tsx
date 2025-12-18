import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  ogTitle?: string;
  ogDescription?: string;
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    tags?: string[];
  };
}

const SITE_NAME = 'SiteMaxi';
const SITE_URL = 'https://sitemaxi.com';
const DEFAULT_DESCRIPTION =
  'Grow your business with SiteMaxi\'s Local SEO, SEO, social media, and paid ads services. We help businesses show up on Google, attract more leads, and turn online traffic into real customers.';
const DEFAULT_IMAGE = `${SITE_URL}/SiteMaxi Professional Websites.png`;

export function SEOHead({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords,
  ogImage = DEFAULT_IMAGE,
  ogType = 'website',
  ogTitle,
  ogDescription,
  article,
}: SEOHeadProps) {
  const location = useLocation();
  const currentUrl = `${SITE_URL}${location.pathname}`;
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} - Digital Marketing Agency | Local SEO, SEO & Paid Ads`;
  const ogTitleFinal = ogTitle || fullTitle;
  const ogDescriptionFinal = ogDescription || description;

  useEffect(() => {
    document.title = fullTitle;

    const updateMetaTag = (property: string, content: string, isName = false) => {
      const attribute = isName ? 'name' : 'property';
      let element = document.querySelector(`meta[${attribute}="${property}"]`);

      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, property);
        document.head.appendChild(element);
      }

      element.setAttribute('content', content);
    };

    updateMetaTag('description', description, true);
    if (keywords) {
      updateMetaTag('keywords', keywords, true);
    }

    updateMetaTag('og:title', ogTitleFinal);
    updateMetaTag('og:description', ogDescriptionFinal);
    updateMetaTag('og:image', ogImage);
    updateMetaTag('og:url', currentUrl);
    updateMetaTag('og:type', ogType);
    updateMetaTag('og:site_name', SITE_NAME);

    updateMetaTag('twitter:card', 'summary_large_image', true);
    updateMetaTag('twitter:title', fullTitle, true);
    updateMetaTag('twitter:description', description, true);
    updateMetaTag('twitter:image', ogImage, true);

    if (article) {
      if (article.publishedTime) {
        updateMetaTag('article:published_time', article.publishedTime);
      }
      if (article.modifiedTime) {
        updateMetaTag('article:modified_time', article.modifiedTime);
      }
      if (article.author) {
        updateMetaTag('article:author', article.author);
      }
      if (article.tags && article.tags.length > 0) {
        article.tags.forEach((tag) => {
          const tagElement = document.createElement('meta');
          tagElement.setAttribute('property', 'article:tag');
          tagElement.setAttribute('content', tag);
          document.head.appendChild(tagElement);
        });
      }
    }

    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = currentUrl;
  }, [fullTitle, description, keywords, ogImage, currentUrl, ogType, ogTitleFinal, ogDescriptionFinal, article]);

  return null;
}
