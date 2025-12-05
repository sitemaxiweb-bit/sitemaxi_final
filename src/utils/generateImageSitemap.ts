export interface SitemapImage {
  loc: string;
  caption?: string;
  geoLocation?: string;
  title?: string;
  license?: string;
}

export interface SitemapPage {
  url: string;
  images: SitemapImage[];
}

export function generateImageSitemap(pages: SitemapPage[]): string {
  const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>';
  const urlsetOpen = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">';
  const urlsetClose = '</urlset>';

  const urlEntries = pages.map(page => {
    const imageEntries = page.images.map(image => {
      let imageXml = `    <image:image>
      <image:loc>${escapeXml(image.loc)}</image:loc>`;

      if (image.caption) {
        imageXml += `\n      <image:caption>${escapeXml(image.caption)}</image:caption>`;
      }

      if (image.geoLocation) {
        imageXml += `\n      <image:geo_location>${escapeXml(image.geoLocation)}</image:geo_location>`;
      }

      if (image.title) {
        imageXml += `\n      <image:title>${escapeXml(image.title)}</image:title>`;
      }

      if (image.license) {
        imageXml += `\n      <image:license>${escapeXml(image.license)}</image:license>`;
      }

      imageXml += '\n    </image:image>';
      return imageXml;
    }).join('\n');

    return `  <url>
    <loc>${escapeXml(page.url)}</loc>
${imageEntries}
  </url>`;
  }).join('\n');

  return `${xmlHeader}\n${urlsetOpen}\n${urlEntries}\n${urlsetClose}`;
}

function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function collectWebsiteImages(): SitemapPage[] {
  const baseUrl = 'https://sitemaxi.com';

  return [
    {
      url: `${baseUrl}/`,
      images: [
        {
          loc: `${baseUrl}/team-collaboration-hero-image.png`,
          title: 'Team Collaboration - Digital Marketing Strategy',
          caption: 'Professional team collaborating on digital marketing strategies and campaigns',
        },
        {
          loc: `${baseUrl}/sitemaxi-professional-websites.png`,
          title: 'SiteMaxi Logo - Professional Website Design & Digital Marketing',
          caption: 'SiteMaxi brand logo for web design and digital marketing services',
        },
        {
          loc: `${baseUrl}/mywelcare-healthcare-client-logo.webp`,
          title: 'MyWelcare Healthcare Solutions Client Success',
          caption: 'Healthcare digital marketing client - MyWelcare Solutions',
        },
        {
          loc: `${baseUrl}/care-made-home-care-client-logo.webp`,
          title: 'Care Made Home Care Services Marketing Success',
          caption: 'Home care services digital marketing client success story',
        },
        {
          loc: `${baseUrl}/salon-chez-pierre-beauty-client-logo.png`,
          title: 'Salon Chez Pierre Beauty Salon Brand Development',
          caption: 'Beauty salon branding and digital marketing client',
        },
        {
          loc: `${baseUrl}/adly-travel-agency-client-logo.png`,
          title: 'ADLY Travel Agency Digital Marketing Success',
          caption: 'Travel agency content marketing and SEO client',
        },
        {
          loc: `${baseUrl}/south-surrey-client-logo.png`,
          title: 'South Surrey Business Digital Marketing Client',
          caption: 'Local business digital marketing success in South Surrey',
        },
        {
          loc: `${baseUrl}/therapy-supply-client-logo.png`,
          title: 'Therapy Supply Healthcare Marketing Client',
          caption: 'Healthcare supply company digital marketing solutions',
        },
      ],
    },
    {
      url: `${baseUrl}/rankmaxi`,
      images: [
        {
          loc: `${baseUrl}/sitemaxi-rankmaxi-image.png`,
          title: 'RankMaxi Local SEO Services',
          caption: 'Local SEO optimization services to improve Google Maps rankings and local search visibility',
        },
      ],
    },
    {
      url: `${baseUrl}/searchmaxi`,
      images: [
        {
          loc: `${baseUrl}/sitemaxi-searchmaxi-image.png`,
          title: 'SearchMaxi SEO Services',
          caption: 'Comprehensive SEO services to improve organic search rankings and website traffic',
        },
      ],
    },
    {
      url: `${baseUrl}/socialmaxi`,
      images: [
        {
          loc: `${baseUrl}/sitemaxi-socialmaxi-image.png`,
          title: 'SocialMaxi Social Media Marketing Services',
          caption: 'Social media marketing and management services for business growth',
        },
      ],
    },
    {
      url: `${baseUrl}/admaxi`,
      images: [
        {
          loc: `${baseUrl}/sitemaxi-admaxi-image.png`,
          title: 'AdMaxi Social Media Advertising Services',
          caption: 'Social media advertising campaigns on Facebook, Instagram, and LinkedIn',
        },
      ],
    },
    {
      url: `${baseUrl}/clickmaxi`,
      images: [
        {
          loc: `${baseUrl}/sitemaxi-clickmaxi-image.png`,
          title: 'ClickMaxi Google Ads Management Services',
          caption: 'Google Ads PPC campaign management for maximum ROI and conversions',
        },
      ],
    },
    {
      url: `${baseUrl}/sitemaxi`,
      images: [
        {
          loc: `${baseUrl}/sitemaxi-sitemaxi-image.png`,
          title: 'SiteMaxi Web Design Services',
          caption: 'Professional website design and development services for modern businesses',
        },
      ],
    },
  ];
}

export function saveImageSitemap(outputPath: string = './public/image-sitemap.xml'): void {
  const pages = collectWebsiteImages();
  const sitemap = generateImageSitemap(pages);

  if (typeof window === 'undefined') {
    const fs = require('fs');
    fs.writeFileSync(outputPath, sitemap, 'utf-8');
    console.log(`Image sitemap generated at ${outputPath}`);
  }
}
