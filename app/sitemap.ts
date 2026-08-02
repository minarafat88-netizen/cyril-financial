import { MetadataRoute } from 'next';
import { db } from '@/lib/db';
import { loanPrograms } from '@/lib/schema';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://cyrilfinancial.com';

  // 1. Fetch dynamic links (loan programs) from Vercel Postgres
  let loanProgramsUrls: MetadataRoute.Sitemap = [];
  try {
    const programs = await db
      .select({ slug: loanPrograms.slug })
      .from(loanPrograms);
    loanProgramsUrls = programs.map((program) => ({
      url: `${baseUrl}/loans/${program.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));
  } catch (error) {
    console.error('Failed to fetch loan programs for sitemap:', error);
  }

  // 2. Define static links on the website
  const staticRoutes = [
    '/',
    '/about',
    '/loans',
    '/purchase',
    '/refinance',
    '/resources',
    '/contact',
    '/apply',
    '/login',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '/' ? 1.0 : 0.7,
  }));

  // 3. Merge all links and return them
  return [
    ...staticRoutes,
    ...loanProgramsUrls,
  ];
}