import type { APIRoute } from 'astro';
import { siteConfig, services, cities } from '../data/siteConfig';

export const GET: APIRoute = async () => {
  const domain = siteConfig.domain;
  const today = new Date().toISOString().split('T')[0];

  const pages = [
    { url: '/', priority: '1.0', changefreq: 'weekly' },
    { url: '/locations/', priority: '0.9', changefreq: 'monthly' },
    { url: '/services/', priority: '0.9', changefreq: 'monthly' },
    { url: '/about-us/', priority: '0.7', changefreq: 'monthly' },
    { url: '/contact-us/', priority: '0.7', changefreq: 'monthly' },
    { url: '/blog/', priority: '0.8', changefreq: 'weekly' },
  ];

  services.forEach(service => {
    pages.push({ url: `/services/${service.slug}/`, priority: '0.9', changefreq: 'monthly' });
  });

  cities.forEach(city => {
    pages.push({ url: `/locations/${city.slug}/`, priority: '0.8', changefreq: 'monthly' });
  });

  const urlsXml = pages
    .map(
      page => `  <url>
    <loc>${domain}${page.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
    )
    .join('\n');

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsXml}
</urlset>`;

  return new Response(sitemapXml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
