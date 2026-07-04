'use client';

import Link from 'next/link';
import { useRef } from 'react';
import gsap from 'gsap';

interface ClientCardProps {
    client: {
        id: string;
        name: string;
        slug: string;
        logo: string;
    };
}

export default function ClientCard({ client }: ClientCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    const handleMouseEnter = () => {
        gsap.to(cardRef.current, { y: -8, duration: 0.3, ease: 'power2.out' });
        gsap.to(imageRef.current, { scale: 1.05, duration: 0.5, ease: 'power2.out' });
    };

    const handleMouseLeave = () => {
        gsap.to(cardRef.current, { y: 0, duration: 0.3, ease: 'power2.out' });
        gsap.to(imageRef.current, { scale: 1, duration: 0.5, ease: 'power2.out' });
    };

    return (
        <Link href={`/portfolio/client/${client.slug}`} className="block group">
            <div
                ref={cardRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="relative overflow-hidden rounded-3xl bg-white/5 border border-white/10 hover:border-pink-500/50 transition-all duration-500 shadow-2xl hover:shadow-pink-500/20 group-hover:bg-white/[0.08]"
            >
                {/* Client Logo Container */}
                <div className="relative aspect-square p-6 flex items-center justify-center bg-gradient-to-br from-white/5 to-transparent overflow-hidden">
                    <img
                        ref={imageRef}
                        src={client.logo}
                        alt={client.name}
                        className="w-full h-full object-contain filter drop-shadow-2xl translate-z-0 transition-transform duration-700 ease-out"
                        loading="lazy"
                    />

                    {/* Subtle Corner Glow */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-pink-500/10 blur-[50px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-pink-500/20 transition-all duration-700" />
                </div>

                {/* Client Info Area (Glassmorphism) */}
                <div className="relative p-4 bg-black/40 backdrop-blur-md border-t border-white/5 group-hover:border-white/10 transition-colors duration-500">
                    <div className="flex items-end justify-between gap-3">
                        <div>
                            <span className="text-[9px] uppercase tracking-[0.2em] text-gray-500 font-bold mb-0.5 block group-hover:text-pink-400 transition-colors">Portfolio</span>
                            <h3 className="text-xl font-black text-white tracking-tight leading-tight group-hover:scale-[1.02] origin-left transition-transform duration-300">
                                {client.name}
                            </h3>
                        </div>
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 border border-white/10 group-hover:bg-pink-500 group-hover:border-transparent group-hover:text-white text-pink-500 transition-all duration-500 shrink-0">
                            <svg className="w-4 h-4 transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </div>
                    </div>

                    {/* Animated Underline */}
                    <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 transition-all duration-700 group-hover:w-full" />
                </div>
            </div>
        </Link>
    );
}
