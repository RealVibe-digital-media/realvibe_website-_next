import { ServicePageLayout } from "@/components/ServicePageLayout";
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Social Media Marketing | Digital Marketing Agency in Gurgaon',
    description: 'Build a loyal community and drive engagement with RealVibe, the premier social media marketing agency in Gurgaon. AI-powered content and community management.',
    alternates: {
        canonical: 'https://realvibe.in/services/social-media'
    }
};

export default function SocialMediaPage() {
    return (
        <ServicePageLayout
            title="Social Media Marketing"
            subtitle="Ignite Your Community"
            description="Stop scrolling, start engaging. We craft scroll-stopping content and authentic community experiences that turn passive followers into active brand advocates."
            slug="social-media"
            techStack={[
                { name: "Instagram", icon: "https://cdn.simpleicons.org/instagram/E4405F" },
                { name: "Meta", icon: "https://cdn.simpleicons.org/meta/0668E1" },
                { name: "LinkedIn", icon: "https://cdn.simpleicons.org/linkedin/0A66C2" },
                { name: "Hootsuite", icon: "https://cdn.simpleicons.org/hootsuite/white" },
                { name: "Canva", icon: "https://cdn.simpleicons.org/canva/00C4CC" },
            ]}
            process={[
                { step: "01", title: "Audience Profiling", desc: "Deep dive into your ideal customer demographics and behavior." },
                { step: "02", title: "Content Calendar", desc: "Strategic planning of diverse, engaging content pillars." },
                { step: "03", title: "Community Management", desc: "Active engagement, responding to comments, and building relationships." },
                { step: "04", title: "Performance Analytics", desc: "Continuous optimization based on engagement and conversion metrics." }
            ]}
        />
    );
}
