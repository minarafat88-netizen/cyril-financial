import { MetadataRoute } from 'next';
import { db } from '@/lib/firebase-admin';

// Define interface for the loan data we need
interface LoanProgram {
  slug: string;
  // You can add a field for last modification date if it exists in the database
  // lastModified?: admin.firestore.Timestamp;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://cyrilfinancial.com'; // يجب أن يكون هذا هو النطاق الأساسي لموقعك

  // 1. جلب الروابط الديناميكية (برامج القروض) من Firestore
  const programsRef = db.collection('loanPrograms'); // 1. Fetch dynamic links (loan programs) from Firestore
  const snapshot = await programsRef.get();
  const loanProgramsUrls = snapshot.docs.map((doc) => {
    const data = doc.data() as LoanProgram;
    return {
      url: `${baseUrl}/loans/${data.slug}`,
      lastModified: new Date(), // You can use the last modification date from the database if available
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    };
  });

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