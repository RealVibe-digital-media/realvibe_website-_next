"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface ServiceCardProps {
    index: number;
    totalCards: number;
    title: string;
    description: string;
    tags: string[];
    techIcons?: { name: string; url: string }[];
    bg: string;
    iconGradient: string;
    glowColor: string;
    iconSvg: React.ReactNode;
    href: string;
}

export function ServiceCard({ index, totalCards, title, description, tags, techIcons, bg, iconGradient, glowColor, iconSvg, href }: ServiceCardProps) {
    const isEven = index % 2 === 1;
    const isLast = index === totalCards - 1;

    const glowColors: Record<string, string> = {
        purple: "border-purple-500/10",
        pink: "border-pink-500/10",
        orange: "border-orange-500/10",
        blue: "border-blue-500/10",
        fuchsia: "border-fuchsia-500/10",
    };

    return (
        <div
            className={`sticky top-10 md:top-14 pt-2 ${isLast ? 'pb-12 md:pb-20' : 'pb-[15vh] md:pb-[20vh]'} origin-top overflow-visible transform-gpu will-change-transform`}
            style={{ zIndex: index }}
        >
            <motion.div
                initial={{ y: 40, opacity: 0, scale: 0.97 }}
                whileInView={{ y: 0, opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-5%" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={`card-inner ${bg} rounded-[2.5rem] md:rounded-[3rem] overflow-hidden ${glowColors[glowColor]} border border-white/[0.08] shadow-2xl transition-shadow duration-500 hover:shadow-pink-900/10 relative lg:h-[490px] flex flex-col`}
            >
                {/* Background Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.02] to-transparent pointer-events-none" />

                <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
                    {/* Content Column */}
                    <div className={`p-4 md:p-8 lg:p-10 flex flex-col justify-start lg:justify-center relative z-10 h-full ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                        <div className="inline-flex items-center gap-3 mb-3">
                            <span className={`w-10 h-[2px] bg-gradient-to-r ${iconGradient} rounded-full`}></span>
                            <span className="text-xs font-black tracking-[0.3em] text-white/40 uppercase">Service 0{index + 1}</span>
                        </div>

                        <h3 className="text-2xl md:text-3xl lg:text-3xl font-black text-white leading-[1.1] mb-2 tracking-tight">
                            {title}
                        </h3>

                        <div className="flex flex-wrap gap-2 mb-4">
                            {tags.map((tag) => (
                                <span key={tag} className="px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-[10px] md:text-[12px] text-gray-300 font-bold uppercase tracking-wider cursor-default hover:bg-white/10 transition-colors">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <p className="text-gray-400 leading-relaxed text-xs md:text-sm max-w-xl mb-4">
                            {description}
                        </p>

                        {/* Tech Stack Upgrade with Real Logos */}
                        {techIcons && (
                            <div className="mb-4 p-3 rounded-2xl bg-black/30 border border-white/5">
                                <div className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                                    <div className="w-1 h-1 rounded-full bg-purple-500 animate-pulse"></div>
                                    Technologies We Use
                                </div>
                                <div className="flex flex-wrap gap-3 md:gap-5">
                                    {techIcons.map((tech) => (
                                        <div key={tech.name} className="flex flex-col items-center gap-1.5 group/icon">
                                            <div className="w-7 h-7 md:w-9 md:h-9 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center p-1.5 group-hover/icon:bg-white/10 group-hover/icon:border-purple-500/50 transition-all duration-300">
                                                <img 
                                                    src={tech.url} 
                                                    alt={tech.name} 
                                                    className="w-full h-full object-contain grayscale opacity-60 group-hover/icon:grayscale-0 group-hover/icon:opacity-100 transition-all duration-300"
                                                    onError={(e) => {
                                                        const target = e.currentTarget;
                                                        target.style.display = 'none';
                                                        if (target.parentElement) {
                                                            const span = document.createElement('span');
                                                            span.className = "text-[9px] font-black text-white/40";
                                                            span.textContent = tech.name.substring(0, 2).toUpperCase();
                                                            target.parentElement.appendChild(span);
                                                        }
                                                    }}
                                                />
                                            </div>
                                            <span className="text-[8px] font-bold text-gray-500 group-hover/icon:text-gray-300 transition-colors uppercase tracking-widest">{tech.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="mt-auto">
                            <Link href={href} className="group/btn relative inline-flex items-center gap-4 px-8 py-3 rounded-full bg-white text-black font-black text-xs overflow-hidden transition-all duration-500 hover:scale-[1.05] active:scale-95 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] tap-bounce">
                                <span className="relative z-10 flex items-center gap-2">
                                    Consult our Experts
                                    <svg className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
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
                            
                            <div className="relative w-64 h-64 rounded-[3rem] bg-black/80 border border-white/10 flex items-center justify-center shadow-3xl transform group-hover:scale-105 group-hover:rotate-3 transition-all duration-700">
                                <div className="w-32 h-32 text-white opacity-80 stroke-[1] drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                                    {iconSvg}
                                </div>
                            </div>

                            {/* Floating decorative tech labels for desktop only */}
                            {techIcons?.slice(0, 3).map((tech, i) => (
                                <motion.div
                                    key={tech.name}
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
                                    <span className="text-[10px] font-black text-white/50 uppercase tracking-widest">{tech.name}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
