import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://cyrilfinancial.com";

  const staticRoutes = [
    { route: "", priority: 1.0, changeFrequency: "daily" as const },
    { route: "/about", priority: 0.9, changeFrequency: "weekly" as const },
    { route: "/contact", priority: 0.9, changeFrequency: "weekly" as const },
    { route: "/rates", priority: 0.9, changeFrequency: "daily" as const },
    { route: "/calculators", priority: 0.9, changeFrequency: "weekly" as const },
    { route: "/calculators/mortgage-calculator", priority: 0.9, changeFrequency: "weekly" as const },
    { route: "/loans", priority: 0.8, changeFrequency: "weekly" as const },
    { route: "/loans/jumbo", priority: 0.8, changeFrequency: "weekly" as const },
    { route: "/loans/bank-statement", priority: 0.8, changeFrequency: "weekly" as const },
    { route: "/loans/dscr", priority: 0.8, changeFrequency: "weekly" as const },
    { route: "/apply", priority: 0.8, changeFrequency: "weekly" as const },
  ].map(({ route, priority, changeFrequency }) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));

  return staticRoutes;
}