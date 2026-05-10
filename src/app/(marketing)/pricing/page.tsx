import PricingClient from "@/components/pricing-client";
import type { Metadata } from "next";
import { BRAND } from "@/lib/constants/brand";

export const metadata: Metadata = {
  title: `Pricing – ${BRAND.name}`,
  description: "Affordable ICT course pricing with lifetime access. Choose the plan that fits your learning goals on ICT101.",
  alternates: { canonical: `${BRAND.website}/pricing` },
  openGraph: {
    title: `Pricing – ${BRAND.name}`,
    description: "Affordable ICT course pricing with lifetime access. Choose the plan that fits your learning goals on ICT101.",
    url: `${BRAND.website}/pricing`,
    type: "website",
    images: [{ url: `${BRAND.website}/opengraph-image`, width: 1200, height: 630, alt: BRAND.name }],
  },
  twitter: {
    card: "summary_large_image",
    images: [`${BRAND.website}/opengraph-image`],
  },
};

export default function PricingPage() {
  return <PricingClient />;
}
