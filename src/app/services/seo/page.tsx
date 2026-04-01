import { ServicePageLayout } from "@/components/ServicePageLayout";
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'SEO & Search Marketing | Top Digital Marketing Agency in Gurgaon',
    description: 'Dominate search rankings with RealVibe, the leading SEO agency in Gurgaon. We use AI-driven keyword research and technical SEO to drive organic growth.',
    alternates: {
        canonical: 'https://realvibe.in/services/seo'
    }
};

export default function SEOPage() {
    return (
        <ServicePageLayout
            title="SEO & Search Marketing"
            subtitle="Dominate Search Results"
            description="Achieve sustainable, long-term organic growth. We optimize your digital presence from the ground up to ensure your brand ranks exactly where your customers are looking."
            slug="seo"
            techStack={[
                { name: "SEMrush", icon: "https://cdn.simpleicons.org/semrush/FF642D" },
                { name: "Ahrefs", icon: "https://cdn.simpleicons.org/ahrefs/FF7A59" },
                { name: "Google Analytics", icon: "https://cdn.simpleicons.org/googleanalytics/E37400" },
                { name: "Search Console", icon: "https://cdn.simpleicons.org/googlesearchconsole/4285F4" },
                { name: "Screaming Frog", icon: "https://cdn.simpleicons.org/screamingfrog/white" },
            ]}
            process={[
                { step: "01", title: "Comprehensive Audit", desc: "Deep technical, on-page, and off-page analysis." },
                { step: "02", title: "Keyword Strategy", desc: "Mapping high-intent keywords to user journey stages." },
                { step: "03", title: "Technical Fixes", desc: "Optimizing site speed, architecture, and core web vitals." },
                { step: "04", title: "Content & Links", desc: "Building authority through premium content and high-DR backlinks." }
            ]}
        />
    );
}
