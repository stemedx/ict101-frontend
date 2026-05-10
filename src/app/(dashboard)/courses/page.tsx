import { createClient } from "@/lib/services/auth/server";
import Courses from "@/components/courses";
import type { Metadata } from "next";
import { BRAND } from "@/lib/constants/brand";

export const metadata: Metadata = {
  title: `Browse Courses – ${BRAND.name}`,
  description: "Explore all ICT101 courses covering programming, networking, cybersecurity, and more. Start your ICT learning journey today.",
  alternates: { canonical: `${BRAND.website}/courses` },
  openGraph: {
    title: `Browse Courses – ${BRAND.name}`,
    description: "Explore all ICT101 courses covering programming, networking, cybersecurity, and more. Start your ICT learning journey today.",
    url: `${BRAND.website}/courses`,
    type: "website",
    images: [{ url: `${BRAND.website}/og-image.png`, width: 1200, height: 630, alt: BRAND.name }],
  },
  twitter: {
    card: "summary_large_image",
    images: [`${BRAND.website}/og-image.png`],
  },
};

export default async function CoursesPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const isAuthenticated = !!data?.claims;

  return <Courses isAuthenticated={isAuthenticated} />;
}
  