import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Preloader } from "@/components/Preloader";
import { SmoothScroll } from "@/components/SmoothScroll";
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
        <Preloader />
        <SmoothScroll>
          {children}
        </SmoothScroll>
        
        {/* Floating Let's Talk Button */}
        <Link 
          href="/contact" 
          className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[100] group"
          aria-label="Let's Talk"
        >
          <div className="relative w-14 h-14 md:w-16 md:h-16 flex items-center justify-center">
            {/* Subtle border ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-500/60 to-pink-500/60 p-[1.5px]">
              <div className="w-full h-full rounded-full bg-black/90" />
            </div>
            
            {/* Main Button */}
            <div className="relative w-full h-full rounded-full bg-white/[0.05] backdrop-blur-md border border-white/10 flex flex-col items-center justify-center text-white transition-all duration-500 group-hover:bg-white/[0.1] group-hover:border-white/20 group-active:scale-95">
              <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest leading-none text-gray-300 group-hover:text-white transition-colors">Let's</span>
              <span className="text-[11px] md:text-[13px] font-black uppercase tracking-tight leading-none text-gradient-primary">Talk</span>
            </div>
          </div>
        </Link>
      </body>
    </html>
  );
}
