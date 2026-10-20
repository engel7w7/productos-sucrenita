import { MetadataRoute } from 'next';
import { getProducts } from '@/lib/api';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sucrenita-web.onrender.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts();

  const productEntries: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${siteUrl}/productos/${product.slug}`,
    lastModified: product.updatedAt ? new Date(product.updatedAt) : new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${siteUrl}/catalogo`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/catalogo?categoria=chocolates-tradicionales`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/catalogo?categoria=alfajores-galletas`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/catalogo?categoria=dulces-tipicos-bombones`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ];

  return [...staticEntries, ...productEntries];
}
