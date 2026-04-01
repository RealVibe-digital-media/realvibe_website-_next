"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Home, ArrowRight, Instagram, Phone } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function ThankYouPage() {
    return (
        <main className="min-h-screen bg-black selection:bg-purple-600/40 selection:text-white relative overflow-hidden">
            <Navbar />
            
            {/* Architectural Backdrop (Matching Landing Page) */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute inset-0 flex justify-around opacity-10">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="w-[1px] h-full bg-gradient-to-b from-transparent via-white/5 to-transparent" />
                    ))}
                </div>
                <div className="absolute top-[30%] left-[16.6%] w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)] opacity-20" />
            </div>

            <section className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-6 pt-32 pb-20 text-center">
                {/* Visual Success Indicator */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="relative mb-12"
                >
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-[0_0_80px_rgba(168,85,247,0.4)]">
                        <CheckCircle2 className="w-16 h-16 md:w-20 md:h-20 text-white" />
                    </div>
                    {/* Pulsing Outer Ring */}
                    <div className="absolute inset-0 rounded-full border border-purple-500/30 animate-ping opacity-20" />
                </motion.div>

                {/* Main Message */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="max-w-2xl"
                >
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
                        Strategy Session <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500">Confirmed!</span>
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl font-medium mb-12">
                        Your real estate growth plan is being synthesized. <br />
                        Our experts will reach out to you within <span className="text-white font-bold underline decoration-purple-500/50">24 hours</span>.
                    </p>

                    {/* Action Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg mx-auto">
                        <Link 
                            href="/real-estate-marketing"
                            className="flex items-center justify-center gap-3 px-8 py-5 rounded-2xl bg-white/[0.05] border border-white/10 text-white font-black hover:bg-white/[0.1] hover:scale-[1.02] active:scale-95 transition-all"
                        >
                            <Home className="w-5 h-5 text-gray-500" />
                            Back to Page
                        </Link>
                        <Link 
                            href="https://www.instagram.com/realvibe.in/"
                            target="_blank"
                            className="flex items-center justify-center gap-3 px-8 py-5 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-black hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-purple-900/20"
                        >
                            <Instagram className="w-5 h-5" />
                            See Our Work
                        </Link>
                    </div>
                </motion.div>

                {/* Support Contact */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4 }}
                    transition={{ delay: 0.8 }}
                    className="mt-20 flex items-center gap-2 text-white text-xs uppercase font-black tracking-widest"
                >
                    <Phone className="w-3 h-3" />
                    Need immediate help? Call +91 9718428801
                </motion.div>
            </section>

            <Footer />
        </main>
    );
}
