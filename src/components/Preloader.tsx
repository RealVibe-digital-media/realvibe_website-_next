"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Keep the preloader visible for the duration of the animation (e.g., 2.5 seconds)
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    key="preloader"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: "-100%" }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-black overflow-hidden"
                >
                    <div className="relative flex flex-col items-center gap-6">
                        {/* Animated Infinity SVG */}
                        <div className="relative flex items-center justify-center">
                            <svg width="240" height="120" viewBox="0 0 240 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="overflow-visible drop-shadow-[0_0_20px_rgba(236,72,153,0.3)]">
                                {/* Main Infinity Loop with Arrow */}
                                <motion.path
                                    d="M120 60 C80 120, 20 120, 20 60 C20 0, 80 0, 120 60 C160 120, 220 120, 220 60 C220 10, 160 10, 125 50"
                                    stroke="url(#preloader-gradient)"
                                    strokeWidth="16"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    fill="none"
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={{ pathLength: 1, opacity: 1 }}
                                    transition={{ duration: 1.5, ease: "easeInOut" }}
                                />

                                {/* Arrow Head */}
                                <motion.path
                                    d="M110 35 L125 50 L110 65"
                                    stroke="url(#preloader-gradient)"
                                    strokeWidth="16"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    fill="none"
                                    initial={{ opacity: 0, pathLength: 0 }}
                                    animate={{ opacity: 1, pathLength: 1 }}
                                    transition={{ duration: 0.5, delay: 1.3, ease: "easeOut" }}
                                />

                                {/* Floating Particles (Right side) */}
                                <motion.circle cx="210" cy="20" r="6" fill="#ec4899" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.5, duration: 0.5 }} />
                                <motion.circle cx="230" cy="15" r="8" fill="#c026d3" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.6, duration: 0.5 }} />
                                <motion.circle cx="225" cy="35" r="5" fill="#f97316" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.7, duration: 0.5 }} />
                                <motion.circle cx="205" cy="45" r="4" fill="#ec4899" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.8, duration: 0.5 }} />

                                <defs>
                                    <linearGradient id="preloader-gradient" x1="0" y1="0" x2="240" y2="120" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#818cf8" /> {/* Indigo/Blue start */}
                                        <stop offset="0.3" stopColor="#c026d3" /> {/* Purple curve */}
                                        <stop offset="0.7" stopColor="#ec4899" /> {/* Pink right side */}
                                        <stop offset="1" stopColor="#fb923c" /> {/* Orange bottom right */}
                                    </linearGradient>
                                </defs>
                            </svg>
                            {/* Central Glow Pulse */}
                            <motion.div
                                className="absolute inset-0 bg-pink-500/10 blur-3xl rounded-full scale-150"
                                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            />
                        </div>

                        {/* Loading text */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="text-white/80 font-heading font-medium tracking-[0.3em] uppercase text-sm"
                        >
                            RealVibe
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
