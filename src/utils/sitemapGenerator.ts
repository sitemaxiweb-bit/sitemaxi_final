import { supabase } from '../lib/supabase';

export interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

const SITE_URL = 'https://sitemaxi.com';

const staticRoutes: SitemapUrl[] = [
  {
    loc: '/',
    changefreq: 'weekly',
    priority: 1.0,
  },
  {
    loc: '/about',
    changefreq: 'monthly',
    priority: 0.8,
  },
  {
    loc: '/team',
    changefreq: 'monthly',
    priority: 0.7,
  },
  {
    loc: '/contact',
    changefreq: 'monthly',
    priority: 0.8,
  },
  {
    loc: '/rankmaxi',
    changefreq: 'monthly',
    priority: 0.9,
  },
  {
    loc: '/searchmaxi',
    changefreq: 'monthly',
    priority: 0.9,
  },
  {
    loc: '/socialmaxi',
    changefreq: 'monthly',
    priority: 0.9,
  },
  {
    loc: '/admaxi',
    changefreq: 'monthly',
    priority: 0.9,
  },
  {
    loc: '/clickmaxi',
    changefreq: 'monthly',
    priority: 0.9,
  },
  {
    loc: '/sitemaxi',
    changefreq: 'monthly',
    priority: 0.9,
  },
  {
    loc: '/blog',
    changefreq: 'weekly',
    priority: 0.8,
  },
  {
    loc: '/privacy-policy',
    changefreq: 'yearly',
    priority: 0.3,
  },
  {
    loc: '/terms-of-service',
    changefreq: 'yearly',
    priority: 0.3,
  },
  {
    loc: '/cookie-policy',
    changefreq: 'yearly',
    priority: 0.3,
  },
];

export async function generateSitemap(): Promise<string> {
  const urls: SitemapUrl[] = [...staticRoutes];

  try {
    const { data: blogPosts } = await supabase
      .from('blog_posts')
      .select('slug, updated_at, published_at')
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    if (blogPosts) {
      blogPosts.forEach((post) => {
        urls.push({
          loc: `/blog/${post.slug}`,
          lastmod: new Date(post.updated_at || post.published_at).toISOString(),
          changefreq: 'monthly',
          priority: 0.7,
        });
      });
    }
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error);
  }

  return generateSitemapXML(urls);
}

function generateSitemapXML(urls: SitemapUrl[]): string {
  const urlEntries = urls
    .map((url) => {
      const lastmod = url.lastmod || new Date().toISOString();
      return `  <url>
    <loc>${SITE_URL}${url.loc}</loc>
    <lastmod>${lastmod}</lastmod>
    ${url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ''}
    ${url.priority !== undefined ? `<priority>${url.priority}</priority>` : ''}
  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
}

export async function saveSitemap(): Promise<void> {
  const sitemapXML = await generateSitemap();
  const blob = new Blob([sitemapXML], { type: 'application/xml' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'sitemap.xml';
  a.click();

  URL.revokeObjectURL(url);
}
