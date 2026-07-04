'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import ProjectCard from '@/components/portfolio/ProjectCard';
import AnimatedBackground from '@/components/portfolio/AnimatedBackground';
import { PortfolioItem } from '@/data/projects';
import gsap from 'gsap';

interface ProjectPageContentProps {
    subProject: {
        id: string;
        name: string;
        slug: string;
        thumbnail: string;
        description?: string;
        client: {
            name: string;
            slug: string;
        } | null;
    };
    initialAssets: PortfolioItem[];
    categories: string[];
}

export default function ProjectPageContent({ subProject, initialAssets, categories }: ProjectPageContentProps) {
    const [activeCategory, setActiveCategory] = useState(categories[0] || '');
    const [filteredAssets, setFilteredAssets] = useState<PortfolioItem[]>([]);
    const gridRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Header animation
        if (headerRef.current) {
            const ctx = gsap.context(() => {
                gsap.from('.project-header-el', {
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
        const filtered = initialAssets.filter(p => p.category === activeCategory);
        setFilteredAssets(filtered);

        // Grid animation on filter change
        if (gridRef.current) {
            gsap.fromTo(gridRef.current.children,
                { y: 20, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.5,
                    stagger: 0.08,
                    ease: 'power2.out'
                }
            );
        }
    }, [activeCategory, initialAssets]);

    return (
        <main className="min-h-screen bg-black selection:bg-pink-500 selection:text-white relative">
            <AnimatedBackground />

            {/* Project Header */}
            <section ref={headerRef} className="relative pt-32 pb-16 px-6 max-w-7xl mx-auto">
                {/* Breadcrumbs */}
                <div className="project-header-el flex items-center gap-2 text-white/50 text-sm mb-10">
                    <Link href="/portfolio" className="hover:text-white transition-colors">Home</Link>
                    <span>/</span>
                    {subProject.client && (
                        <>
                            <Link href={`/portfolio/client/${subProject.client.slug}`} className="hover:text-white transition-colors">{subProject.client.name}</Link>
                            <span>/</span>
                        </>
                    )}
                    <span className="text-white font-medium">{subProject.name}</span>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
                    {/* Project Thumbnail */}
                    {subProject.thumbnail && (
                        <div className="project-header-el w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden border-2 border-white/10 bg-white/5 flex-shrink-0 shadow-2xl">
                            <img
                                src={subProject.thumbnail}
                                alt={subProject.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}

                    {/* Project Info */}
                    <div className="text-center md:text-left">
                        <h1 className="project-header-el text-4xl md:text-6xl font-black tracking-tight text-white mb-3">
                            {subProject.name}
                        </h1>
                        <p className="project-header-el text-gray-400 text-lg max-w-2xl">
                            {subProject.description || `Viewing work for ${subProject.name}`}
                        </p>
                    </div>
                </div>

                {/* Category Tabs */}
                {categories.length > 1 && (
                    <div className="project-header-el flex flex-wrap gap-3 justify-center md:justify-start">
                        {categories.map((category) => {
                            const count = initialAssets.filter(p => p.category === category).length;
                            return (
                                <button
                                    key={category}
                                    onClick={() => setActiveCategory(category)}
                                    className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 border-2 ${activeCategory === category
                                        ? 'bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-white border-transparent shadow-xl shadow-pink-500/30'
                                        : 'bg-black/40 text-gray-300 border-white/20 hover:border-pink-500/60 hover:text-white hover:bg-black/60'
                                        }`}
                                >
                                    {category}
                                    <span className="ml-2 text-xs opacity-70">({count})</span>
                                </button>
                            );
                        })}
                    </div>
                )}
            </section>

            {/* Assets Grid */}
            <section className="max-w-7xl mx-auto px-6 pb-20">
                {activeCategory === 'Creatives' ? (
                    <div ref={gridRef} className="columns-1 sm:columns-2 lg:columns-4 gap-6 space-y-6 mx-auto">
                        {filteredAssets.map((asset) => (
                            <div key={asset.id} className="break-inside-avoid">
                                <ProjectCard project={asset} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center mx-auto max-w-6xl">
                        {filteredAssets.map((asset) => (
                            <div key={asset.id} className="w-full">
                                <ProjectCard project={asset} />
                            </div>
                        ))}
                    </div>
                )}

                {filteredAssets.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-lg">No assets in this category yet.</p>
                    </div>
                )}
            </section>

        </main >
    );
}
