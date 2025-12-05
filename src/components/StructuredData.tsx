import { useEffect } from 'react';

interface OrganizationData {
  name: string;
  url: string;
  logo: string;
  description?: string;
  address?: {
    streetAddress?: string;
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry?: string;
  };
  contactPoint?: {
    telephone?: string;
    contactType?: string;
    email?: string;
  };
  sameAs?: string[];
}

interface WebsiteData {
  name: string;
  url: string;
  description?: string;
  potentialAction?: {
    target: string;
    queryInput: string;
  };
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface ArticleData {
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author: {
    name: string;
  };
  publisher: {
    name: string;
    logo: string;
  };
}

interface StructuredDataProps {
  type: 'organization' | 'website' | 'breadcrumb' | 'article';
  data: OrganizationData | WebsiteData | BreadcrumbItem[] | ArticleData;
}

export function StructuredData({ type, data }: StructuredDataProps) {
  useEffect(() => {
    let structuredData: any = {};

    switch (type) {
      case 'organization':
        structuredData = {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          ...(data as OrganizationData),
        };
        break;

      case 'website':
        const websiteData = data as WebsiteData;
        structuredData = {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: websiteData.name,
          url: websiteData.url,
          description: websiteData.description,
        };
        if (websiteData.potentialAction) {
          structuredData.potentialAction = {
            '@type': 'SearchAction',
            target: websiteData.potentialAction.target,
            'query-input': websiteData.potentialAction.queryInput,
          };
        }
        break;

      case 'breadcrumb':
        const breadcrumbItems = data as BreadcrumbItem[];
        structuredData = {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: breadcrumbItems.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url,
          })),
        };
        break;

      case 'article':
        structuredData = {
          '@context': 'https://schema.org',
          '@type': 'Article',
          ...(data as ArticleData),
        };
        break;

      default:
        return;
    }

    const scriptId = `structured-data-${type}`;
    let script = document.getElementById(scriptId);

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }

    script.textContent = JSON.stringify(structuredData);

    return () => {
      const existingScript = document.getElementById(scriptId);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [type, data]);

  return null;
}

const SITE_URL = 'https://sitemaxi.com';

export function OrganizationStructuredData() {
  const organizationData: OrganizationData = {
    name: 'SiteMaxi',
    url: SITE_URL,
    logo: `${SITE_URL}/SiteMaxi Professional Websites.png`,
    description:
      'Digital marketing agency specializing in Local SEO, SEO, social media management, and paid advertising services to help businesses grow online.',
    sameAs: [
      'https://www.facebook.com/sitemaxi',
      'https://www.instagram.com/sitemaxi',
      'https://www.linkedin.com/company/sitemaxi',
      'https://twitter.com/sitemaxi',
    ],
  };

  return <StructuredData type="organization" data={organizationData} />;
}

export function WebsiteStructuredData() {
  const websiteData: WebsiteData = {
    name: 'SiteMaxi',
    url: SITE_URL,
    description:
      'Grow your business with SiteMaxi\'s Local SEO, SEO, social media, and paid ads services. We help businesses show up on Google, attract more leads, and turn online traffic into real customers.',
    potentialAction: {
      target: `${SITE_URL}/blog?search={search_term_string}`,
      queryInput: 'required name=search_term_string',
    },
  };

  return <StructuredData type="website" data={websiteData} />;
}
