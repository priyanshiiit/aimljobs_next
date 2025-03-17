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
  title: "AI Jobs and ML Jobs at Remote AI Startups",
  description:
    "The leading job board for ai jobs and ml jobs with over 10000 ai jobs posted at over 2000 remote ai startups.",
  manifest: "/manifest.json",
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
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
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
