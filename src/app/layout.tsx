import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "@/components/CustomCursor";
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.variable} ${outfit.variable} antialiased bg-black text-white selection:bg-purple-600/40 selection:text-white relative`}>
        <Preloader />
        <CustomCursor />
        {children}
        
        {/* Floating Let's Talk Button */}
        <Link 
          href="/contact" 
          className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[100] group"
          aria-label="Let's Talk"
        >
          <div className="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
            {/* Pulsing Ripple Effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-pink-500 to-orange-500 rounded-full blur-xl opacity-40 group-hover:opacity-70 animate-pulse transition-opacity" />
            
            {/* Main Button */}
            <div className="relative w-full h-full bg-gradient-to-tr from-pink-500 to-orange-500 rounded-full shadow-[0_0_30px_rgba(236,72,153,0.5)] flex flex-col items-center justify-center text-white transition-transform duration-500 group-hover:scale-110 group-active:scale-95">
              <span className="text-[10px] md:text-[11px] font-black uppercase tracking-widest leading-none">Let's</span>
              <span className="text-[12px] md:text-[14px] font-black uppercase tracking-tighter leading-none">Talk</span>
            </div>
          </div>
        </Link>
      </body>
    </html>
  );
}
