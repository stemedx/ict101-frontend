import { createClient } from "@/lib/services/auth/server";
import Home from "@/components/home";
import type { Metadata } from "next";
import { BRAND } from "@/lib/constants/brand";

export const metadata: Metadata = {
  title: `${BRAND.name} – Master ICT Skills Online`,
  description: "Learn ICT, programming, and digital skills with ICT101's interactive courses. Expert-led lessons, hands-on labs, and structured learning paths.",
  alternates: { canonical: BRAND.website },
  openGraph: {
    title: `${BRAND.name} – Master ICT Skills Online`,
    description: "Learn ICT, programming, and digital skills with ICT101's interactive courses. Expert-led lessons, hands-on labs, and structured learning paths.",
    url: BRAND.website,
    type: "website",
    images: [{ url: `${BRAND.website}/opengraph-image`, width: 1200, height: 630, alt: BRAND.name }],
  },
  twitter: {
    card: "summary_large_image",
    images: [`${BRAND.website}/opengraph-image`],
  },
};

export default async function HomePage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();

  return <Home isAuthenticated={!!data?.claims} />;
}
