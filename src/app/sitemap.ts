import { MetadataRoute } from "next";
import { BRAND } from "@/lib/constants/brand";
import { API_CONFIG } from "@/lib/constants/api";
import type { Course } from "@/lib/types/courses";

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
    const res = await fetch(`${process.env.API_BASE_URL}${API_CONFIG.ENDPOINTS.COURSES}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return staticRoutes;
    const courses: Course[] = await res.json();
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
