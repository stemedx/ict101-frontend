import { ReachUsClient } from "@/components/reachus-client";
import type { Metadata } from "next";
import { BRAND } from "@/lib/constants/brand";

export const metadata: Metadata = {
  title: `Contact Us – ${BRAND.name}`,
  description: "Get in touch with the ICT101 team. We're here to help with questions about courses, payments, and technical support.",
  alternates: { canonical: `${BRAND.website}/reachus` },
  openGraph: {
    title: `Contact Us – ${BRAND.name}`,
    description: "Get in touch with the ICT101 team. We're here to help with questions about courses, payments, and technical support.",
    url: `${BRAND.website}/reachus`,
    type: "website",
  },
};

export default function ReachUs() {
  return <ReachUsClient />;
}
