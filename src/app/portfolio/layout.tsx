import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import "./portfolio.css";

export const metadata: Metadata = {
  title: "Portfolio | RealVibe Digital Media",
  description: "A curated showcase of campaigns, creatives and experiences by RealVibe Digital Media.",
};

export default function PortfolioLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {/* Site-wide header/footer — same as the rest of RealVibe */}
      <Navbar />
      <div className="portfolio-scope">{children}</div>
      <Footer />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#18181b",
            color: "#fff",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          },
          success: {
            iconTheme: { primary: "#f97316", secondary: "#fff" },
          },
        }}
      />
    </>
  );
}
