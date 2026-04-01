"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MoveRight, TrendingUp, MonitorSmartphone, Target, Search, Palette } from "lucide-react";

export default function ServicesIndexPage() {
    // Requirements: PPC must appear first.
    const services = [
        {
            title: "PPC & Performance Ads",
            slug: "ppc",
            desc: "Precision-targeted campaigns designed to maximize ROI and scale your growth predictably.",
            icon: Target,
            color: "from-orange-500 to-amber-500",
            bg: "bg-orange-500/10",
            border: "group-hover:border-orange-500/30",
            delay: 0.1
        },
        {
            title: "SEO & Search Marketing",
            slug: "seo",
            desc: "Dominate search rankings with data-driven technical, on-page, and authority optimization.",
            icon: Search,
            color: "from-purple-500 to-fuchsia-500",
            bg: "bg-purple-500/10",
            border: "group-hover:border-purple-500/30",
            delay: 0.2
        },
        {
            title: "Social Media Marketing",
            slug: "social-media",
            desc: "Ignite your community with viral formats, influencer campaigns, and active management.",
            icon: TrendingUp,
            color: "from-pink-500 to-rose-500",
            bg: "bg-pink-500/10",
            border: "group-hover:border-pink-500/30",
            delay: 0.3
        },
        {
            title: "Web Development",
            slug: "web-development",
            desc: "Blazing-fast, conversion-optimized applications built on modern tech stacks.",
            icon: MonitorSmartphone,
            color: "from-blue-500 to-cyan-500",
            bg: "bg-blue-500/10",
            border: "group-hover:border-blue-500/30",
            delay: 0.4
        },
        {
            title: "Brand Strategy & Design",
            slug: "branding",
            desc: "Craft memorable visual identities and compelling narratives that resonate deeply.",
            icon: Palette,
            color: "from-violet-500 to-purple-500",
            bg: "bg-violet-500/10",
            border: "group-hover:border-violet-500/30",
            delay: 0.5
        }
    ];

    return (
        <main className="min-h-screen bg-black selection:bg-purple-600/40 selection:text-white">
            <Navbar />

            {/* HERO */}
            <section className="relative pt-40 md:pt-48 pb-16 px-6 overflow-hidden">
                <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-purple-900/10 rounded-full blur-[100px] pointer-events-none"></div>

                <div className="max-w-7xl mx-auto relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.span
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="inline-block px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-white text-xs font-bold uppercase tracking-widest mb-6"
                        >
                            Our Expertise
                        </motion.span>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-[1.05] text-white max-w-4xl mx-auto">
                            Transforming businesses through <span className="text-gradient-primary">Digital Excellence</span>
                        </h1>
                        <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
                            Comprehensive strategies spanning across all digital touchpoints. We build, market, and scale brands that dominate.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* SERVICES GRID */}
            <section className="relative pb-32 px-6 z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.map((service, i) => {
                            const Icon = service.icon;

                            // Make the first card (PPC) span two columns on large screens for emphasis
                            const isFeatured = i === 0;

                            return (
                                <motion.div
                                    key={service.slug}
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.7, delay: service.delay, ease: "easeOut" }}
                                    className={`group ${isFeatured ? 'lg:col-span-2' : ''}`}
                                >
                                    <Link href={`/services/${service.slug}`} className="block h-full">
                                        <div className={`relative h-full bg-[#050505] border border-white/5 rounded-3xl p-8 md:p-10 overflow-hidden transition-all duration-500 hover:-translate-y-2 ${service.border} hover:shadow-2xl hover:shadow-${service.color.split('-')[1]}/10`}>

                                            {/* Glow Effect */}
                                            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br opacity-0 group-hover:opacity-20 blur-3xl rounded-full transition-opacity duration-700 pointer-events-none -translate-y-1/2 translate-x-1/2" style={{ backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))` }} >
                                                <div className={`absolute inset-0 bg-gradient-to-br ${service.color}`}></div>
                                            </div>

                                            <div className="relative z-10 flex flex-col h-full items-start">
                                                <div className={`w-14 h-14 rounded-2xl ${service.bg} flex items-center justify-center mb-8 border border-white/5 group-hover:scale-110 transition-transform duration-500 ease-out`}>
                                                    <div className={`bg-gradient-to-br ${service.color} bg-clip-text text-transparent`}>
                                                        <Icon className="w-7 h-7 text-white shadow-sm" />
                                                    </div>
                                                </div>

                                                <h3 className={`text-2xl font-black text-white mb-4 ${isFeatured ? 'md:text-4xl' : ''}`}>{service.title}</h3>
                                                <p className="text-gray-400 leading-relaxed mb-8 flex-1">{service.desc}</p>

                                                <div className="mt-auto flex items-center gap-2 text-sm font-bold text-white opacity-60 group-hover:opacity-100 transition-opacity">
                                                    Explore Service
                                                    <MoveRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
