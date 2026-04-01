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
    techIcons?: string[];
    bg: string;
    iconGradient: string;
    glowColor: string;
    iconSvg: React.ReactNode;
    href: string;
}

export function ServiceCard({ index, totalCards, title, description, tags, techIcons, bg, iconGradient, glowColor, iconSvg, href }: ServiceCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress: stickyScroll } = useScroll({
        target: cardRef,
        offset: ["start start", "end start"],
    });

    // Scale down when scrolling past (gives stack effect)
    // On mobile, we keep it subtle
    const scale = useTransform(stickyScroll, [0, 1], [1, 0.96]);
    const opacity = useTransform(stickyScroll, [0, 0.8, 1], [1, 1, 0.7]);

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
            className="sticky top-20 md:top-28 pt-4 pb-12 md:pb-16 origin-top"
            style={{ zIndex: index }}
        >
            <motion.div
                style={{ scale, opacity, transformOrigin: "top center" }}
                initial={{ y: 60, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-5%" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className={`card-inner ${bg} rounded-[2.5rem] md:rounded-[3rem] overflow-hidden ${glowColors[glowColor]} border border-white/[0.08] shadow-2xl transition-all duration-500 relative`}
            >
                {/* Background Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.02] to-transparent pointer-events-none" />

                <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[360px] md:min-h-[500px]">
                    {/* Content Column */}
                    <div className={`p-8 md:p-12 lg:p-20 flex flex-col justify-center relative z-10 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                        <div className="inline-flex items-center gap-3 mb-8">
                            <span className={`w-10 h-[2px] bg-gradient-to-r ${iconGradient} rounded-full`}></span>
                            <span className="text-xs font-black tracking-[0.3em] text-white/40 uppercase">Service 0{index + 1}</span>
                        </div>

                        <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-[1.1] mb-6 tracking-tight">
                            {title}
                        </h3>

                        <div className="flex flex-wrap gap-2 mb-8">
                            {tags.map((tag) => (
                                <span key={tag} className="px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-[11px] md:text-[13px] text-gray-300 font-bold uppercase tracking-wider cursor-default hover:bg-white/10 transition-colors">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <p className="text-gray-400 leading-relaxed text-base md:text-lg max-w-xl mb-10">
                            {description}
                        </p>

                        {/* Tech Stack Upgrade */}
                        {techIcons && (
                            <div className="mb-10 p-5 rounded-2xl bg-black/20 border border-white/5 backdrop-blur-sm">
                                <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse"></div>
                                    Technologies We Use
                                </div>
                                <div className="flex flex-wrap gap-4 md:gap-6">
                                    {techIcons.map((tech) => (
                                        <div key={tech} className="flex flex-col items-center gap-2 group/icon">
                                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center group-hover/icon:bg-white/10 group-hover/icon:border-purple-500/50 transition-all duration-300">
                                                <span className="text-[10px] font-black text-white/40 group-hover/icon:text-white transition-colors">{tech.substring(0, 2).toUpperCase()}</span>
                                            </div>
                                            <span className="text-[9px] font-bold text-gray-500 group-hover/icon:text-gray-300 transition-colors uppercase tracking-tighter">{tech}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="mt-2">
                            <Link href={href} className="group/btn relative inline-flex items-center gap-4 px-8 py-4 rounded-full bg-white text-black font-black text-sm overflow-hidden transition-all duration-500 hover:scale-[1.05] active:scale-95 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] tap-bounce">
                                <span className="relative z-10 flex items-center gap-2">
                                    Consult our Experts
                                    <svg className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                    </svg>
                                </span>
                            </Link>
                        </div>
                    </div>

                    {/* Right Decoration Column - Hidden on mobile, but tech icons show in content above */}
                    <div className={`relative hidden lg:flex items-center justify-center p-12 lg:p-20 overflow-hidden ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                        <div className="absolute inset-x-0 h-px bg-white/5 top-1/2 -translate-y-1/2"></div>
                        <div className="absolute inset-y-0 w-px bg-white/5 left-1/2 -translate-x-1/2"></div>
                        
                        <div className="relative group">
                            {/* Outer Glow Ring */}
                            <div className={`absolute inset-0 bg-gradient-to-r ${iconGradient} opacity-20 blur-[100px] group-hover:opacity-40 transition-opacity duration-700`}></div>
                            
                            <div className="relative w-64 h-64 rounded-[3rem] bg-black/60 backdrop-blur-2xl border border-white/10 flex items-center justify-center shadow-3xl transform group-hover:scale-105 group-hover:rotate-3 transition-all duration-700">
                                <div className="w-32 h-32 text-white opacity-80 stroke-[1] drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                                    {iconSvg}
                                </div>
                            </div>

                            {/* Floating decorative tech labels for desktop only */}
                            {techIcons?.slice(0, 3).map((tech, i) => (
                                <motion.div
                                    key={tech}
                                    animate={{ 
                                        y: [0, -10, 0],
                                        rotate: [0, i % 2 === 0 ? 5 : -5, 0]
                                    }}
                                    transition={{ 
                                        duration: 4, 
                                        repeat: Infinity, 
                                        delay: i * 0.5,
                                        ease: "easeInOut"
                                    }}
                                    className={`absolute ${i === 0 ? '-top-10 -right-4' : i === 1 ? '-bottom-8 -left-6' : 'top-10 -left-12'} px-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-md hidden xl:block`}
                                >
                                    <span className="text-[10px] font-black text-white/50 uppercase tracking-widest">{tech}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
