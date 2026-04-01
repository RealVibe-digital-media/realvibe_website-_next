import { ServicePageLayout } from "@/components/ServicePageLayout";
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Brand Strategy & Design | Top Digital Marketing Agency in Gurgaon',
    description: 'Transform your business into an unforgettable brand with RealVibe, the leading branding agency in Gurgaon. Expert logo design, visual identity, and brand positioning.',
    alternates: {
        canonical: 'https://realvibe.in/services/branding'
    }
};

export default function BrandingPage() {
    return (
        <ServicePageLayout
            title="Brand Strategy & Design"
            subtitle="Memorable Identities"
            description="Your brand is more than a logo; it's a feeling. We architect striking visual identities and compelling narratives that resonate deeply with your target audience."
            slug="branding"
            techStack={[
                { name: "Figma", icon: "https://cdn.simpleicons.org/figma/F24E1E" },
                { name: "Creative Cloud", icon: "https://cdn.simpleicons.org/adobecreativecloud/DA1F26" },
                { name: "Midjourney", icon: "https://cdn.simpleicons.org/midjourney/white" },
                { name: "Spline 3D", icon: "https://cdn.simpleicons.org/spline/white" },
                { name: "Webflow", icon: "https://cdn.simpleicons.org/webflow/4353FF" }
            ]}
            process={[
                { step: "01", title: "Discovery", desc: "Understanding your core values, vision, and market positioning." },
                { step: "02", title: "Strategy", desc: "Crafting the brand narrative, voice, and unique value proposition." },
                { step: "03", title: "Visual Design", desc: "Designing logos, typography, color palettes, and brand guidelines." },
                { step: "04", title: "Rollout", desc: "Applying the new identity across all physical and digital touchpoints." }
            ]}
        />
    );
}
