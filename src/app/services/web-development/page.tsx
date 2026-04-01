import { ServicePageLayout } from "@/components/ServicePageLayout";
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Web Development | Top Digital Marketing Agency in Gurgaon',
    description: 'High-performance, modern web development services in Gurgaon. RealVibe builds ultra-fast, responsive, and conversion-optimized websites using Next.js and React.',
    alternates: {
        canonical: 'https://realvibe.in/services/web-development'
    }
};

export default function WebDevelopmentPage() {
    return (
        <ServicePageLayout
            title="Web Development"
            subtitle="High-Performance Experiences"
            description="Your website is your ultimate digital salesperson. We build blazing-fast, visually stunning, and conversion-engineered web applications that leave a lasting impression."
            slug="web-development"
            techStack={[
                { name: "Next.js", icon: "https://cdn.simpleicons.org/nextdotjs/white" },
                { name: "React", icon: "https://cdn.simpleicons.org/react/61DAFB" },
                { name: "TypeScript", icon: "https://cdn.simpleicons.org/typescript/3178C6" },
                { name: "Tailwind CSS", icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
                { name: "Framer Motion", icon: "https://cdn.simpleicons.org/framer/0055FF" },
                { name: "Node.js", icon: "https://cdn.simpleicons.org/nodedotjs/339933" }
            ]}
            process={[
                { step: "01", title: "UX/UI Design", desc: "Wireframing and crafting intuitive, beautiful interfaces." },
                { step: "02", title: "Frontend Engineering", desc: "Building responsive, animated, and lightning-fast client experiences." },
                { step: "03", title: "Backend Systems", desc: "Robust database design, robust API creation, and CMS integration." },
                { step: "04", title: "Testing & Launch", desc: "Rigorous QA, security checks, and seamless deployment." }
            ]}
        />
    );
}
