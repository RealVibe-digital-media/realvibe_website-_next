"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Show the brand for a brief minimum, then dismiss as soon as the page has
        // actually loaded — instead of a blind 3s hold that competes with hydration.
        const MIN_MS = 800;
        const MAX_MS = 3200; // hard fallback so we never trap the user
        const start = performance.now();
        let done = false;

        const finish = () => {
            if (done) return;
            done = true;
            const elapsed = performance.now() - start;
            const wait = Math.max(0, MIN_MS - elapsed);
            setTimeout(() => setLoading(false), wait);
        };

        if (document.readyState === "complete") {
            finish();
        } else {
            window.addEventListener("load", finish, { once: true });
        }
        const fallback = setTimeout(finish, MAX_MS);

        return () => {
            window.removeEventListener("load", finish);
            clearTimeout(fallback);
        };
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
                    <div className="relative flex flex-col items-center justify-center gap-8">
                        {/* Custom Animated GIF Loader with Purple/Pink Accent Glow */}
                        <div className="relative flex items-center justify-center">
                            {/* Static ambient glow — no animation: the page is hydrating
                                underneath, so an animated blur here just stutters the loader. */}
                            <div className="absolute inset-0 w-[26rem] h-[26rem] md:w-[32rem] md:h-[32rem] rounded-full bg-gradient-to-tr from-purple-800 to-pink-700 opacity-20 blur-2xl"></div>

                            {/* Looping loader image */}
                            <div className="relative z-10 w-80 h-80 sm:w-96 sm:h-96 md:w-[28rem] md:h-[28rem] flex items-center justify-center">
                                <img
                                    src="/assets/loader.gif"
                                    alt="RealVibe Loader"
                                    className="w-full h-auto object-contain"
                                    fetchPriority="high"
                                />
                            </div>
                        </div>

                        {/* Loading text */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="text-white/70 font-heading font-black tracking-[0.35em] uppercase text-xs mt-4"
                        >
                            RealVibe
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
