"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

interface ServiceCardProps {
    index: number;
    totalCards: number;
    title: string;
    description: string;
    tags: string[];
    bg: string;
    iconGradient: string;
    glowColor: string;
    iconSvg: React.ReactNode;
    href: string;
}

export function ServiceCard({ index, totalCards, title, description, tags, bg, iconGradient, glowColor, iconSvg, href }: ServiceCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "start start"],
    });

    const { scrollYProgress: stickyScroll } = useScroll({
        target: cardRef,
        offset: ["start start", "end start"],
    });

    // Scale down when scrolling past (gives stack effect)
    const scale = useTransform(stickyScroll, [0, 1], [1, 0.95]);

    const isEven = index % 2 === 1;

    const glowColors: Record<string, string> = {
        purple: "border-purple-500/10",
        pink: "border-pink-500/10",
        orange: "border-orange-500/10",
        blue: "border-blue-500/10",
        fuchsia: "border-fuchsia-500/10",
    };

    return (
        <div
            ref={cardRef}
            className="sticky top-20 md:top-28 pt-4 pb-4 md:pb-8 origin-top"
            style={{ zIndex: index }}
        >
            <motion.div
                style={{ scale, transformOrigin: "top center" }}
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`card-inner ${bg} rounded-[2.5rem] overflow-hidden ${glowColors[glowColor]} border border-white/[0.06] transition-all duration-500`}
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[320px] md:min-h-[460px]">
                    {/* Content Column */}
                    <div className={`p-6 md:p-10 lg:p-16 flex flex-col justify-center ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                        <div className="inline-flex items-center gap-3 mb-6">
                            <span className={`w-8 h-[2px] bg-gradient-to-r ${iconGradient}`}></span>
                            <span className="text-sm font-bold tracking-widest text-gray-400 uppercase">0{index + 1}</span>
                        </div>

                        <h3 className="text-2xl md:text-3xl lg:text-5xl font-black text-white leading-[1.1] mb-4 md:mb-6">
                            {title}
                        </h3>

                        <div className="flex flex-wrap gap-2 mb-6">
                            {tags.map((tag) => (
                                <span key={tag} className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[13px] text-gray-300 font-medium cursor-default">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <p className="text-gray-400 leading-relaxed text-sm md:text-base lg:text-lg max-w-lg mb-6 md:mb-8">
                            {description}
                        </p>

                        <div>
                            <Link href={href} className="group/btn inline-flex items-center gap-2 text-sm font-bold text-white transition-all duration-300 hover:opacity-80 tap-bounce">
                                <span>Explore Service</span>
                                <svg className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                </svg>
                            </Link>
                        </div>
                    </div>

                    <div className={`relative hidden md:flex items-center justify-center p-8 md:p-12 overflow-hidden border-t lg:border-t-0 ${isEven ? 'lg:border-r border-white/[0.04] lg:order-1' : 'lg:border-l border-white/[0.04] lg:order-2'}`}>
                        {/* Large Icon Display */}
                        <div className="relative group">
                            <div className="relative w-40 h-40 md:w-56 md:h-56 rounded-3xl bg-black/80 border border-white/10 flex items-center justify-center transform group-hover:scale-105 transition-transform duration-500">
                                <div className="w-20 h-20 md:w-28 md:h-28 text-white opacity-90 stroke-[1.2]">
                                    {iconSvg}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
