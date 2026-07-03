import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Preloader } from "@/components/Preloader";
import Link from "next/link";
import { MessageCircle } from "lucide-react";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RealVibe Digital Media | #1 Digital Marketing Agency",
  description: "We build brands that dominate digital. From SEO & social media to PPC & branding — RealVibe delivers data-driven digital marketing.",
  verification: {
    google: "qRr6OPuX0WDRUby3BuUSOu4WRPj2zWPdEu5W4pTSVSQ",
  },
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    other: [
      { rel: "icon", url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { rel: "icon", url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${outfit.variable} antialiased bg-black text-white selection:bg-purple-600/40 selection:text-white relative`}>
        {/* Pre-paint: flag weak devices so heavy GPU effects are disabled before first paint (no flash) */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var n=navigator;var lp=(n.hardwareConcurrency&&n.hardwareConcurrency<=4)||(n.deviceMemory&&n.deviceMemory<=4)||(window.matchMedia&&window.matchMedia('(pointer:coarse)').matches);if(lp){document.documentElement.setAttribute('data-low-power','');}}catch(e){}})();",
          }}
        />
        <Preloader />
        {/* Native scrolling — Lenis (SmoothScroll) removed: it hijacked the scroll
            thread with JS and was the main cause of scroll jank on heavy pages. */}
        {children}
      </body>
    </html>
  );
}
