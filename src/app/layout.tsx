import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SubscriptionDialog } from "@/components/SubscriptionDialog";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Find Remote AI Jobs at Top AI Startups",
  description:
    "The leading job board for remote AI jobs with over 10000 AI jobs posted at over 2000 remote AI startups.",
  manifest: "/manifest.json",
  metadataBase: new URL("https://aimljobs.fyi"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Find Remote AI Jobs at Top AI Startups | AI/ML Jobs",
    description:
      "Discover high-paying remote AI jobs, ML engineering positions, and data science careers at innovative AI startups. AI/ML Jobs is the leading job board with over 10,000 opportunities at 2,000+ companies.",
    url: "https://aimljobs.fyi",
    siteName: "AI/ML Jobs",
    images: [
      {
        url: "/logo512.png",
        width: 512,
        height: 512,
        alt: "AI/ML Jobs Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Find Remote AI Jobs at Top AI Startups | AI/ML Jobs",
    description:
      "Discover high-paying remote jobs at innovative AI startups. Updated daily with new AI jobs.",
    creator: "@aimljobs",
    images: ["/logo512.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/logo192.png", sizes: "192x192", type: "image/png" },
      { url: "/logo512.png", sizes: "512x512", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Organization schema for improved business representation in search
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "AI/ML Jobs",
    url: "https://aimljobs.fyi",
    logo: "https://aimljobs.fyi/logo512.png",
    sameAs: [
      "https://x.com/aimljobs",
      "https://www.linkedin.com/company/ai-ml-data-jobs",
    ],
    description:
      "The leading job board for remote AI jobs with over 10,000 AI jobs posted at over 2,000 remote AI startups.",
  };

  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Script id="organization-schema" type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </Script>
        <Header />
        <Toaster position="top-center" />
        {children}
        <Footer />
        <SubscriptionDialog />
        <Analytics />
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-D6VRBSWCSM" />
        <SpeedInsights />
      </body>
    </html>
  );
}
