import { MetadataRoute } from "next";
import { BRAND } from "@/lib/constants/brand";
import { coursesServerApi } from "@/lib/services/api/courses-server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = BRAND.website;

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/courses`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/reachus`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  try {
    const courses = await coursesServerApi.getAll();
    const courseRoutes: MetadataRoute.Sitemap = courses.map((course) => ({
      url: `${baseUrl}/courses/${course.id}`,
      lastModified: course.updated_at ? new Date(course.updated_at) : new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
    return [...staticRoutes, ...courseRoutes];
  } catch {
    return staticRoutes;
  }
}
