import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "@/components/CustomCursor";
import { Preloader } from "@/components/Preloader";

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
      </body>
    </html>
  );
}
