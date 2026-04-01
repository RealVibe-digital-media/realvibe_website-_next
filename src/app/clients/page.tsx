"use client";

import { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
// Lenis removed — causes scroll jank in Chrome
import { motion } from "framer-motion";
import { MoveUpRight } from "lucide-react";

export default function ClientsPage() {
    return (
        <main className="min-h-screen bg-black selection:bg-purple-600/40 selection:text-white relative">
            {/* Animated Background */}
            {/* Minimal Background Glow */}
            <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-purple-900/20 rounded-full blur-3xl pointer-events-none z-0"></div>

            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-12 px-6 max-w-7xl mx-auto min-h-[60vh] flex flex-col justify-center items-center text-center overflow-hidden z-10">
                <motion.h1
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                    className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-6 leading-[0.9] px-4"
                >
                    Crafting Digital <br />
                    <span className="text-gradient-primary glow-effect">Masterpieces</span>
                </motion.h1>
                <motion.p
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                    className="text-lg md:text-xl text-gray-400 max-w-2xl font-light mb-10 leading-relaxed"
                >
                    We transform ideas into exceptional digital experiences. <br />
                    Explore our curated portfolio of work.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="animate-bounce-slow" style={{ transformOrigin: "center" }}
                >
                    <svg className="w-6 h-6 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </motion.div>
            </section>

            {/* Developers Section */}
            <section className="max-w-7xl mx-auto px-6 pb-20 relative z-10">
                <div className="text-center md:text-left mb-12">
                    <h2 className="text-3xl md:text-5xl font-black mb-4 text-white">
                        Our <span className="text-gradient-primary uppercase tracking-tighter">Developers</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-xl">
                        Leading developers we've collaborated with.
                    </p>
                </div>

                <div className="flex flex-wrap justify-center gap-6">
                    {developers.map((client, i) => (
                        <ClientCard key={i} client={client} index={i} />
                    ))}
                </div>
            </section>

            {/* Brokers Section */}
            <section className="max-w-7xl mx-auto px-6 pb-32 relative z-10">
                <div className="text-center md:text-left mb-12">
                    <h2 className="text-3xl md:text-5xl font-black mb-4 text-white">
                        Real Estate <span className="text-gradient-primary uppercase tracking-tighter">Consultancy</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-xl">
                        Strategic broker partners in our network.
                    </p>
                </div>

                <div className="flex flex-wrap justify-center gap-6">
                    {brokers.map((client, i) => (
                        <ClientCard key={i} client={client} index={i} />
                    ))}
                    {brokers.length === 0 && (
                        <div className="text-center py-12 bg-white/5 rounded-3xl border border-white/10 border-dashed w-full">
                            <p className="text-gray-400 font-bold mb-2">No Brokers</p>
                            <p className="text-gray-600 text-sm">New broker partnerships coming soon.</p>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}

function ClientCard({ client, index }: { client: any; index: number }) {
    return (
        <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.33%-1rem)] xl:w-[calc(25%-1.125rem)] 2xl:w-[calc(20%-1.2rem)]"
        >
            <div className="group block">
                <div className="relative overflow-hidden rounded-3xl bg-white/5 border border-white/10 hover:border-pink-500/50 transition-all duration-500 shadow-2xl hover:shadow-pink-500/20 group-hover:bg-white/[0.08] hover:-translate-y-2">
                    {/* Client Logo */}
                    <div className="relative aspect-square p-6 flex items-center justify-center bg-gradient-to-br from-white/5 to-transparent overflow-hidden">
                        <img src={client.logo} alt={client.name} className="w-full h-full object-contain filter drop-shadow-2xl transition-transform duration-700 ease-out group-hover:scale-105" loading="lazy" />
                        <div className="absolute top-0 right-0 w-24 h-24 bg-pink-500/10 blur-[50px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-pink-500/20 transition-all duration-700"></div>
                    </div>

                    {/* Client Info */}
                    <div className="relative p-4 bg-black/40 backdrop-blur-md border-t border-white/5 group-hover:border-white/10 transition-colors duration-500">
                        <div className="flex items-end justify-between gap-3">
                            <div>
                                <span className="text-[9px] uppercase tracking-[0.2em] text-gray-500 font-bold mb-0.5 block group-hover:text-pink-400 transition-colors">Portfolio</span>
                                <h3 className="text-xl font-black text-white tracking-tight leading-tight group-hover:scale-[1.02] origin-left transition-transform duration-300">
                                    {client.name}
                                </h3>
                            </div>
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 border border-white/10 group-hover:bg-pink-500 group-hover:border-transparent group-hover:text-white text-pink-500 transition-all duration-500 shrink-0">
                                <MoveUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 -group-hover:translate-y-0.5 transition-transform" />
                            </div>
                        </div>
                        <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 transition-all duration-700 group-hover:w-full"></div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

const developers = [
    { name: 'Skyline Developers', logo: 'https://via.placeholder.com/300x300/1a1a2e/c026d3?text=SD' },
    { name: 'Metro Builders', logo: 'https://via.placeholder.com/300x300/1a1a2e/ec4899?text=MB' },
    { name: 'Apex Group', logo: 'https://via.placeholder.com/300x300/1a1a2e/f97316?text=AG' },
    { name: 'Prime Constructions', logo: 'https://via.placeholder.com/300x300/1a1a2e/8b5cf6?text=PC' },
];

const brokers = [
    { name: 'Urban Realty', logo: 'https://via.placeholder.com/300x300/1a1a2e/c026d3?text=UR' },
    { name: 'PropStar', logo: 'https://via.placeholder.com/300x300/1a1a2e/ec4899?text=PS' },
];
