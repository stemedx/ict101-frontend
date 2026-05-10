import { MetadataRoute } from "next";
import { BRAND } from "@/lib/constants/brand";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: ["facebookexternalhit", "Twitterbot", "LinkedInBot", "WhatsApp"],
        allow: "/",
      },
      {
        userAgent: "*",
        allow: ["/", "/courses", "/pricing", "/reachus"],
        disallow: [
          "/api/",
          "/login",
          "/register",
          "/forgot-password",
          "/reset-password",
          "/confirm-email",
          "/profile",
          "/checkout",
          "/payment",
        ],
      },
    ],
    sitemap: `${BRAND.website}/sitemap.xml`,
  };
}
