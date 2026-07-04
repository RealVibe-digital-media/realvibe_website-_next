'use client';

import Link from 'next/link';
import { useRef } from 'react';
import gsap from 'gsap';

interface SubProjectCardProps {
    subProject: {
        id: string;
        name: string;
        slug: string;
        thumbnail?: string;
        description?: string;
    };
}

export default function SubProjectCard({ subProject }: SubProjectCardProps) {
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
        <Link href={`/portfolio/project/${subProject.slug}`} className="block group">
            <div
                ref={cardRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={`relative overflow-hidden rounded-3xl bg-white/5 border border-white/10 hover:border-pink-500/50 transition-all duration-500 shadow-2xl hover:shadow-pink-500/20 ${!subProject.thumbnail ? 'py-4' : ''}`}
            >
                {subProject.thumbnail ? (
                    <>
                        {/* Thumbnail View */}
                        <div className="relative aspect-[4/3] overflow-hidden">
                            <img
                                ref={imageRef}
                                src={subProject.thumbnail}
                                alt={subProject.name}
                                className="w-full h-full object-cover transition-transform duration-700 ease-out"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                        </div>

                        {/* Info Overlay for Thumbnail View */}
                        <div className="p-4 bg-black/40 backdrop-blur-md border-t border-white/5 relative">
                            <div className="pr-10">
                                <h3 className="text-lg font-black text-white tracking-tight leading-tight group-hover:text-pink-500 transition-colors duration-300">
                                    {subProject.name}
                                </h3>
                                {subProject.description && (
                                    <p className="text-gray-400 text-[11px] mt-1 line-clamp-2 leading-relaxed">{subProject.description}</p>
                                )}
                            </div>

                            {/* Arrow */}
                            <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-pink-500 group-hover:bg-pink-500 group-hover:border-transparent group-hover:text-white transition-all duration-500 shadow-lg shrink-0">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </div>
                        </div>
                    </>
                ) : (
                    /* Minimal View (No Thumbnail) */
                    <div className="px-6 py-3 flex items-center justify-between group-hover:bg-white/[0.02] transition-colors">
                        <div className="flex-1">
                            <h3 className="text-lg font-black text-white tracking-tight group-hover:text-pink-500 transition-all duration-300 transform group-hover:translate-x-1">
                                {subProject.name}
                            </h3>
                            {subProject.description && (
                                <p className="text-gray-500 text-[10px] mt-0.5 line-clamp-1 max-w-[80%] uppercase tracking-[0.2em] font-medium">
                                    {subProject.description}
                                </p>
                            )}
                        </div>

                        {/* Compact Arrow */}
                        <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-pink-500 group-hover:bg-pink-500 group-hover:border-transparent group-hover:text-white transition-all duration-500 shadow-lg shrink-0">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </div>
                    </div>
                )}

                {/* Underline Decoration */}
                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 transition-all duration-700 group-hover:w-full" />
            </div>
        </Link>
    );
}
