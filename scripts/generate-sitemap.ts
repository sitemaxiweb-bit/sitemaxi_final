import { createClient } from '@supabase/supabase-js';
import { writeFileSync } from 'fs';
import { join } from 'path';

const SITE_URL = 'https://sitemaxi.com';

interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

const staticRoutes: SitemapUrl[] = [
  { loc: '/', changefreq: 'weekly', priority: 1.0 },
  { loc: '/about', changefreq: 'monthly', priority: 0.8 },
  { loc: '/team', changefreq: 'monthly', priority: 0.7 },
  { loc: '/contact', changefreq: 'monthly', priority: 0.8 },
  { loc: '/services', changefreq: 'monthly', priority: 0.9 },
  { loc: '/rankmaxi', changefreq: 'monthly', priority: 0.9 },
  { loc: '/searchmaxi', changefreq: 'monthly', priority: 0.9 },
  { loc: '/socialmaxi', changefreq: 'monthly', priority: 0.9 },
  { loc: '/admaxi', changefreq: 'monthly', priority: 0.9 },
  { loc: '/clickmaxi', changefreq: 'monthly', priority: 0.9 },
  { loc: '/sitemaxi', changefreq: 'monthly', priority: 0.9 },
  { loc: '/blog', changefreq: 'weekly', priority: 0.8 },
  { loc: '/industries', changefreq: 'monthly', priority: 0.8 },
  { loc: '/industries/auto-repair', changefreq: 'monthly', priority: 0.7 },
  { loc: '/industries/clinics', changefreq: 'monthly', priority: 0.7 },
  { loc: '/industries/contractors', changefreq: 'monthly', priority: 0.7 },
  { loc: '/industries/dentists', changefreq: 'monthly', priority: 0.7 },
  { loc: '/industries/ecommerce', changefreq: 'monthly', priority: 0.7 },
  { loc: '/industries/funeral-homes', changefreq: 'monthly', priority: 0.7 },
  { loc: '/industries/hvac', changefreq: 'monthly', priority: 0.7 },
  { loc: '/industries/lawyers', changefreq: 'monthly', priority: 0.7 },
  { loc: '/industries/med-spas', changefreq: 'monthly', priority: 0.7 },
  { loc: '/industries/plumbers', changefreq: 'monthly', priority: 0.7 },
  { loc: '/industries/real-estate', changefreq: 'monthly', priority: 0.7 },
  { loc: '/industries/restaurants', changefreq: 'monthly', priority: 0.7 },
  { loc: '/industries/roofers', changefreq: 'monthly', priority: 0.7 },
  { loc: '/locations', changefreq: 'monthly', priority: 0.8 },
  { loc: '/resources', changefreq: 'monthly', priority: 0.7 },
  { loc: '/resources/local-seo-checklist', changefreq: 'monthly', priority: 0.6 },
  { loc: '/resources/seo-audit-checklist', changefreq: 'monthly', priority: 0.6 },
  { loc: '/resources/keyword-research-guide', changefreq: 'monthly', priority: 0.6 },
  { loc: '/resources/google-ads-starter-guide', changefreq: 'monthly', priority: 0.6 },
  { loc: '/resources/meta-ads-guide', changefreq: 'monthly', priority: 0.6 },
  { loc: '/resources/google-business-profile-guide', changefreq: 'monthly', priority: 0.6 },
  { loc: '/resources/website-conversion-tips', changefreq: 'monthly', priority: 0.6 },
  { loc: '/resources/content-calendar-template', changefreq: 'monthly', priority: 0.6 },
  { loc: '/resources/small-business-playbook', changefreq: 'monthly', priority: 0.6 },
  { loc: '/resources/landing-page-checklist', changefreq: 'monthly', priority: 0.6 },
  { loc: '/resources/ecommerce-seo-checklist', changefreq: 'monthly', priority: 0.6 },
  { loc: '/resources/ecommerce-growth-guide', changefreq: 'monthly', priority: 0.6 },
  { loc: '/ai-blueprint', changefreq: 'monthly', priority: 0.8 },
  { loc: '/free-seo-audit', changefreq: 'monthly', priority: 0.8 },
  { loc: '/privacy-policy', changefreq: 'yearly', priority: 0.3 },
  { loc: '/terms-of-service', changefreq: 'yearly', priority: 0.3 },
  { loc: '/cookie-policy', changefreq: 'yearly', priority: 0.3 },
];

async function generateSitemap() {
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase credentials not found. Generating sitemap with static routes only.');
    return generateSitemapXML(staticRoutes);
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  const urls: SitemapUrl[] = [...staticRoutes];

  try {
    const { data: blogPosts, error } = await supabase
      .from('blog_posts')
      .select('slug, updated_at, published_at')
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    if (error) {
      console.error('Error fetching blog posts:', error);
    } else if (blogPosts) {
      blogPosts.forEach((post) => {
        urls.push({
          loc: `/blog/${post.slug}`,
          lastmod: new Date(post.updated_at || post.published_at).toISOString(),
          changefreq: 'monthly',
          priority: 0.7,
        });
      });
      console.log(`Added ${blogPosts.length} blog posts to sitemap`);
    }

    try {
      const { data: locations } = await supabase
        .from('locations')
        .select('slug, updated_at')
        .eq('is_active', true);

      if (locations) {
        locations.forEach((loc) => {
          urls.push({
            loc: `/locations/${loc.slug}`,
            lastmod: loc.updated_at ? new Date(loc.updated_at).toISOString() : undefined,
            changefreq: 'monthly',
            priority: 0.7,
          });
        });
        console.log(`Added ${locations.length} location pages to sitemap`);
      }
    } catch {
      console.warn('Could not fetch locations for sitemap');
    }
  } catch (error) {
    console.error('Error generating sitemap:', error);
  }

  return generateSitemapXML(urls);
}

function generateSitemapXML(urls: SitemapUrl[]): string {
  const currentDate = new Date().toISOString();
  const urlEntries = urls
    .map((url) => {
      const lastmod = url.lastmod || currentDate;
      return `  <url>
    <loc>${SITE_URL}${url.loc}</loc>
    <lastmod>${lastmod}</lastmod>${url.changefreq ? `
    <changefreq>${url.changefreq}</changefreq>` : ''}${url.priority !== undefined ? `
    <priority>${url.priority}</priority>` : ''}
  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
}

async function main() {
  console.log('Generating sitemap...');
  const sitemapXML = await generateSitemap();

  const outputPath = join(process.cwd(), 'public', 'sitemap.xml');
  writeFileSync(outputPath, sitemapXML, 'utf-8');

  console.log(`Sitemap generated successfully at ${outputPath}`);
}

main().catch(console.error);
