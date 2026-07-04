'use client';

import { useEffect, useRef } from 'react';
import ClientCard from '@/components/portfolio/ClientCard';
import AnimatedBackground from '@/components/portfolio/AnimatedBackground';
import gsap from 'gsap';

interface ClientItem {
    id: string;
    name: string;
    slug: string;
    logo: string;
    type: 'Developer' | 'Broker';
}

interface HomeContentProps {
    clients: ClientItem[];
}

export default function HomeContent({ clients }: HomeContentProps) {
    const heroRef = useRef<HTMLDivElement>(null);
    const devsRef = useRef<HTMLDivElement>(null);
    const brokersRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Hero Animation
        const ctx = gsap.context(() => {
            gsap.from('.hero-text', {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: 'power3.out',
                delay: 0.2
            });
        }, heroRef);

        return () => ctx.revert();
    }, []);

    useEffect(() => {
        // Section Animations
        const refs = [devsRef, brokersRef];
        refs.forEach(ref => {
            if (ref.current) {
                gsap.fromTo(ref.current.children,
                    { y: 30, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.6,
                        stagger: 0.1,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: ref.current,
                            start: 'top 80%',
                        }
                    }
                );
            }
        });
    }, [clients]);

    const developers = clients.filter(c => c.type === 'Developer');
    const brokers = clients.filter(c => c.type === 'Broker');

    return (
        <main className="min-h-screen bg-black selection:bg-[var(--accent)] selection:text-white relative">
            <AnimatedBackground />

            {/* Hero Section */}
            <section ref={heroRef} className="relative pt-24 pb-12 px-6 max-w-7xl mx-auto min-h-[60vh] flex flex-col justify-center items-center text-center overflow-hidden">
                <h1 className="hero-text text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-6 leading-[0.9] px-4">
                    Crafting Digital <br />
                    <span className="text-gradient-primary glow-effect">Masterpieces</span>
                </h1>
                <p className="hero-text text-lg md:text-xl text-gray-400 max-w-2xl font-light mb-10 leading-relaxed">
                    We transform ideas into exceptional digital experiences. <br />
                    Explore our curated portfolio of work.
                </p>

                {/* Scroll Indicator */}
                <div className="scroll-indicator">
                    <svg className="w-6 h-6 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </div>
            </section>

            {/* Developers Section */}
            <section className="max-w-7xl mx-auto px-6 pb-20">
                <div className="text-center md:text-left mb-12">
                    <h2 className="text-3xl md:text-5xl font-black mb-4">
                        Our <span className="text-gradient-primary uppercase tracking-tighter">Developers</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-xl">
                        Leading developers we've collaborated with.
                    </p>
                </div>

                {developers.length > 0 ? (
                    <div ref={devsRef} className="flex flex-wrap justify-center gap-6">
                        {developers.map((client) => (
                            <div key={client.id} className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.33%-1rem)] xl:w-[calc(25%-1.125rem)] 2xl:w-[calc(20%-1.2rem)]">
                                <ClientCard client={client} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 bg-white/5 rounded-3xl border border-white/10">
                        <p className="text-gray-500 text-lg">No developers added yet.</p>
                    </div>
                )}
            </section>

            {/* Brokers Section */}
            <section className="max-w-7xl mx-auto px-6 pb-32">
                <div className="text-center md:text-left mb-12">
                    <h2 className="text-3xl md:text-5xl font-black mb-4">
                        Real Estate <span className="text-gradient-primary uppercase tracking-tighter">Consultancy</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-xl">
                        Strategic broker partners in our network.
                    </p>
                </div>

                {brokers.length > 0 ? (
                    <div ref={brokersRef} className="flex flex-wrap justify-center gap-6">
                        {brokers.map((client) => (
                            <div key={client.id} className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.33%-1rem)] xl:w-[calc(25%-1.125rem)] 2xl:w-[calc(20%-1.2rem)]">
                                <ClientCard client={client} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 bg-white/5 rounded-3xl border border-white/10 border-dashed">
                        <p className="text-gray-400 font-bold mb-2">No Brokers</p>
                        <p className="text-gray-600 text-sm">New broker partnerships coming soon.</p>
                    </div>
                )}
            </section>

        </main>
    );
}
