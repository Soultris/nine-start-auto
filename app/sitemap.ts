import { MetadataRoute } from 'next';
import { sanityFetch } from '@/sanity/lib/live';

interface SanitySitemapDeal {
  _id: string;
  _updatedAt?: string;
}

const ALL_DEALS_QUERY = `*[_type == "hotDeals"] { _id, _updatedAt }`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://nine-star-auto.com';

  // Static routes
  const staticRoutes = [
    '',
    '/gallery',
    '/hot-deals',
    '/applications/business',
    '/applications/credit',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Dynamic routes from Sanity
  try {
    const { data: deals } = await sanityFetch({ query: ALL_DEALS_QUERY });
    const dynamicRoutes = (deals as SanitySitemapDeal[] || []).map((deal) => ({
      url: `${baseUrl}/hot-deals/${deal._id}`,
      lastModified: deal._updatedAt ? new Date(deal._updatedAt) : new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }));

    return [...staticRoutes, ...dynamicRoutes];
  } catch (error) {
    console.error('Error fetching deals for sitemap:', error);
    return staticRoutes;
  }
}
