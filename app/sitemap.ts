import type { MetadataRoute } from 'next';
import { BRAND } from '@/lib/site';

export const dynamic = 'force-static';

/** One page, one entry. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${BRAND.url}/`, changeFrequency: 'monthly', priority: 1 }];
}
