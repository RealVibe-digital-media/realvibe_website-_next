'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import SubProjectCard from '@/components/portfolio/SubProjectCard';
import AnimatedBackground from '@/components/portfolio/AnimatedBackground';
import gsap from 'gsap';

interface ClientPageContentProps {
    client: {
        id: string;
        name: string;
        slug: string;
        logo: string;
    };
    subProjects: {
        id: string;
        name: string;
        slug: string;
        thumbnail: string;
        description?: string;
    }[];
}

export default function ClientPageContent({ client, subProjects }: ClientPageContentProps) {
    const gridRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Header animation
        if (headerRef.current) {
            const ctx = gsap.context(() => {
                gsap.from('.client-header-el', {
                    y: 40,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: 'power3.out',
                    delay: 0.2,
                });
            }, headerRef);
            return () => ctx.revert();
        }
    }, []);

    useEffect(() => {
        // Grid animation
        if (gridRef.current) {
            gsap.fromTo(gridRef.current.children,
                { y: 20, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.5,
                    stagger: 0.08,
                    ease: 'power2.out',
                    delay: 0.5
                }
            );
        }
    }, [subProjects]);

    return (
        <main className="min-h-screen bg-black selection:bg-pink-500 selection:text-white relative">
            <AnimatedBackground />

            {/* Client Header */}
            <section ref={headerRef} className="relative pt-32 pb-16 px-6 max-w-7xl mx-auto">
                <Link
                    href="/portfolio"
                    className="client-header-el inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm mb-10"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Home
                </Link>

                <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
                    {client.logo && (
                        <div className="client-header-el w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden border-2 border-white/10 bg-white/5 flex-shrink-0 shadow-2xl">
                            <img
                                src={client.logo}
                                alt={client.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}

                    <div className="text-center md:text-left">
                        <h1 className="client-header-el text-4xl md:text-6xl font-black tracking-tight text-white mb-3">
                            {client.name}
                        </h1>
                        <p className="client-header-el text-gray-400 text-lg">
                            {subProjects.length} {subProjects.length === 1 ? 'project' : 'projects'} available
                        </p>
                    </div>
                </div>
            </section>

            {/* Projects Grid */}
            <section className="max-w-7xl mx-auto px-6 pb-20">
                <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center mx-auto">
                    {subProjects.map((sp) => (
                        <div key={sp.id} className="w-full">
                            <SubProjectCard subProject={sp} />
                        </div>
                    ))}
                </div>

                {subProjects.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-lg">No projects added for this client yet.</p>
                    </div>
                )}
            </section>

        </main >
    );
}
