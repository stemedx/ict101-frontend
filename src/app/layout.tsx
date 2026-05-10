import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { CustomScrollbar } from "@/components/ui/scrollbar";
import { EmailVerificationBanner } from "@/components/ui/email-verification-banner";
import { LanguageProvider } from "@/context/language-context";
import { getServerLanguage } from "@/locales";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { BRAND } from "@/lib/constants/brand";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: BRAND.metaTitle,
    template: `%s`,
  },
  description: BRAND.metaDescription,
  verification: {
    google: "1efzqvn0YB_Cg604jV20hT7r5-qB1L7awmkiKbVGijM",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    title: BRAND.metaTitle,
    description: BRAND.metaDescription,
    url: BRAND.website,
    siteName: BRAND.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: BRAND.metaTitle,
    description: BRAND.metaDescription,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialLanguage = await getServerLanguage();
  return (
    <html lang="en" className="h-full">
      <head />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full flex flex-col bg-black`}
      >
          <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "name": BRAND.name,
                  "url": BRAND.website,
                },
                {
                  "@type": "Organization",
                  "name": BRAND.name,
                  "url": BRAND.website,
                  "logo": `${BRAND.website}/opengraph-image`,
                  "email": BRAND.supportEmail,
                  "sameAs": Object.values(BRAND.social),
                },
              ],
            }),
          }}
        />
          <CustomScrollbar />
          <EmailVerificationBanner />
          <LanguageProvider initialLanguage={initialLanguage}>
            {children}
          </LanguageProvider>
          <SpeedInsights />
      </body>
    </html>
  );
}
