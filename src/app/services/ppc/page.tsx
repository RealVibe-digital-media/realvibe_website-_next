import { ServicePageLayout } from "@/components/ServicePageLayout";
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'PPC & Performance Ads | Best Digital Marketing Agency in Gurgaon',
    description: 'Maximize ROI with precision-targeted PPC and paid advertising campaigns by RealVibe. Expert media buying in Gurgaon driven by AI optimization.',
    alternates: {
        canonical: 'https://realvibe.in/services/ppc'
    }
};

export default function PPCPage() {
    return (
        <ServicePageLayout
            title="PPC & Performance Ads"
            subtitle="Precision Lead Generation"
            description="Every click matters. We engineer highly targeted, data-driven ad campaigns designed to minimize wasted spend and exponentially maximize your Return on Ad Spend (ROAS)."
            slug="ppc"
            techStack={[
                { name: "Google Ads", icon: "https://cdn.simpleicons.org/googleads/F4B400" },
                { name: "Meta Ads", icon: "https://cdn.simpleicons.org/meta/0668E1" },
                { name: "LinkedIn Ads", icon: "https://cdn.simpleicons.org/linkedin/0A66C2" },
                { name: "Google Analytics", icon: "https://cdn.simpleicons.org/googleanalytics/E37400" },
                { name: "Looker Studio", icon: "https://cdn.simpleicons.org/looker/4285F4" }
            ]}
            process={[
                { step: "01", title: "Platform Strategy", desc: "Selecting the right mix of search, social, and display networks." },
                { step: "02", title: "Audience & Targeting", desc: "Laser-focused segmentation to reach high-intent prospects." },
                { step: "03", title: "Ad Creation & Setup", desc: "Compelling copy, striking visuals, and flawless tracking setup." },
                { step: "04", title: "Ongoing Optimization", desc: "Continuous bid adjustments and A/B testing to lower CPA." }
            ]}
        />
    );
}
