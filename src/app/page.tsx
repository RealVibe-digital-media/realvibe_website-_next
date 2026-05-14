import type { Metadata } from "next";
import HomePageClient from "./HomePageClient";

export const metadata: Metadata = {
  title: "Best Digital Marketing Agency in Gurgaon & Delhi NCR | RealVibe",
  description:
    "RealVibe is a leading digital marketing agency in Gurgaon & Delhi NCR specialising in real estate marketing. We offer SEO, performance ads, social media & branding services that generate high-intent buyer leads.",
  keywords:
    "digital marketing agency in delhi ncr, digital marketing agency in gurgaon, best digital marketing agency in gurgaon, marketing agencies in gurgaon, best digital marketing agency in delhi ncr, digital marketing services in gurgaon, marketing agency for real estate, real estate marketing agency, real estate digital marketing agency, real estate marketing firms",
  metadataBase: new URL("https://www.realvibe.in"),
  alternates: {
    canonical: "https://www.realvibe.in/",
  },
  openGraph: {
    title: "Best Digital Marketing Agency in Gurgaon & Delhi NCR | RealVibe",
    description:
      "RealVibe is a leading real estate digital marketing agency in Gurgaon & Delhi NCR. We generate high-intent buyer leads through SEO, paid ads, social media & branding.",
    url: "https://www.realvibe.in/",
    siteName: "RealVibe Digital Media",
    images: [
      {
        url: "https://www.realvibe.in/assets/logo.png",
        width: 1200,
        height: 630,
        alt: "RealVibe - Digital Marketing Agency in Gurgaon",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export default function HomePage() {
  return (
    <>
      {/* JSON-LD: LocalBusiness Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "RealVibe Digital Media",
            image: "https://www.realvibe.in/assets/logo.png",
            "@id": "https://www.realvibe.in/",
            url: "https://www.realvibe.in/",
            telephone: "+919811238092",
            email: "care@realvibe.in",
            address: {
              "@type": "PostalAddress",
              streetAddress: "303, 3rd Floor, JMD Galleria, Sector-48",
              addressLocality: "Gurugram",
              postalCode: "122018",
              addressCountry: "IN",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: 28.4195,
              longitude: 77.0366,
            },
            openingHoursSpecification: {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
              ],
              opens: "10:00",
              closes: "19:00",
            },
            priceRange: "₹₹",
            description:
              "RealVibe is a top digital marketing agency in Gurgaon & Delhi NCR specialising in real estate marketing, SEO, paid ads, social media, branding and web development.",
            sameAs: [
              "https://www.facebook.com/realvibe.in",
              "https://www.instagram.com/realvibe.in/",
              "https://www.linkedin.com/company/realvibe/",
            ],
          }),
        }}
      />

      {/* JSON-LD: Organization Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "RealVibe Digital Media",
            alternateName: "RealVibe",
            url: "https://www.realvibe.in/",
            logo: "https://www.realvibe.in/assets/logo.png",
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+919811238092",
              contactType: "customer service",
              areaServed: "IN",
              availableLanguage: ["English", "Hindi"],
            },
          }),
        }}
      />

      {/* Client-side interactive homepage */}
      <HomePageClient />
    </>
  );
}
