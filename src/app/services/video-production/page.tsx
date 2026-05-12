import { ServicePageLayout } from "@/components/ServicePageLayout";
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Best Video Production Agency in Gurgaon | RealVibe Digital Media',
    description: 'Professional video production services in Gurgaon. Corporate videos, real estate walkthroughs, social media content, drone shoots, and cinematic brand films by RealVibe.',
    alternates: {
        canonical: 'https://realvibe.in/services/video-production'
    }
};

export default function VideoProductionPage() {
    return (
        <ServicePageLayout
            title="Video Production"
            subtitle="Cinematic Storytelling"
            description="From concept to final cut, we produce stunning video content that captivates audiences and drives results. Whether it's a real estate walkthrough, corporate brand film, or social media reel — we bring your vision to life with cinematic quality."
            slug="video-production"
            techStack={[
                { name: "Premiere Pro", icon: "https://cdn.simpleicons.org/adobepremierepro/9999FF" },
                { name: "After Effects", icon: "https://cdn.simpleicons.org/adobeaftereffects/9999FF" },
                { name: "DaVinci Resolve", icon: "https://cdn.simpleicons.org/davinciresolve/white" },
                { name: "Drone (DJI)", icon: "https://cdn.simpleicons.org/dji/white" },
                { name: "Cinema 4D", icon: "https://cdn.simpleicons.org/cinema4d/011A6A" }
            ]}
            process={[
                { step: "01", title: "Pre-Production", desc: "Concept development, scripting, storyboarding, location scouting, and talent coordination." },
                { step: "02", title: "Production", desc: "Professional multi-camera shoots with cinematic lighting, drone aerials, and on-site direction." },
                { step: "03", title: "Post-Production", desc: "Expert editing, color grading, motion graphics, sound design, and music scoring." },
                { step: "04", title: "Delivery & Distribution", desc: "Optimized exports for all platforms — YouTube, Instagram, LinkedIn, and website embeds." }
            ]}
        />
    );
}
