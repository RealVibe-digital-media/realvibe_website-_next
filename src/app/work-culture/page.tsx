"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Loader2, Camera, Heart, Users, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";

type CultureImage = {
    id: number;
    image_url: string;
    title: string;
};

export default function WorkCulturePage() {
    const [images, setImages] = useState<CultureImage[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const res = await fetch("/api/admin/culture");
                const data = await res.json();
                setImages(data);
            } catch (error) {
                console.error("Failed to fetch culture images:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchImages();
    }, []);

    const sliderRef = useRef<HTMLDivElement>(null);

    const scrollLeft = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: -600, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: 600, behavior: "smooth" });
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1]
            }
        }
    };

    return (
        <main className="min-h-screen bg-[#080808] text-white selection:bg-purple-500/30">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-purple-500/10 via-transparent to-transparent pointer-events-none" />
                
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6"
                    >
                        <Sparkles size={16} className="text-purple-400" />
                        <span className="text-xs font-bold tracking-widest uppercase text-purple-200">Inside RealVibe</span>
                    </motion.div>
                    
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-5xl md:text-7xl font-bold mb-8 tracking-tight"
                    >
                        Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400">Work Culture</span>
                    </motion.h1>
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="max-w-2xl mx-auto text-gray-400 text-lg leading-relaxed"
                    >
                        More than just a workplace. A collective of creators, innovators, and dreamers building the future of luxury real estate marketing.
                    </motion.p>
                </div>
            </section>

            {/* Gallery Grid */}
            <section className="pb-32 px-6">
                <div className="container mx-auto">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-40 gap-4">
                            <Loader2 className="w-10 h-10 animate-spin text-purple-500" />
                            <p className="text-gray-500 font-medium">Curating moments...</p>
                        </div>
                    ) : images.length === 0 ? (
                        <div className="text-center py-40 border border-white/5 rounded-3xl bg-white/[0.02]">
                            <Camera className="w-16 h-16 text-gray-700 mx-auto mb-6" />
                            <h2 className="text-2xl font-bold mb-2">The Gallery is Quiet</h2>
                            <p className="text-gray-500">We're busy making memories. Check back soon!</p>
                        </div>
                    ) : (
                        <div className="relative group/slider mt-12">
                            {/* Navigation Controls */}
                            {images.length > 2 && (
                                <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex justify-between z-20 pointer-events-none opacity-0 group-hover/slider:opacity-100 transition-opacity duration-300">
                                    <button 
                                        onClick={scrollLeft}
                                        className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white pointer-events-auto hover:bg-white/10 hover:scale-110 transition-all"
                                    >
                                        <ChevronLeft className="w-6 h-6" />
                                    </button>
                                    <button 
                                        onClick={scrollRight}
                                        className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white pointer-events-auto hover:bg-white/10 hover:scale-110 transition-all"
                                    >
                                        <ChevronRight className="w-6 h-6" />
                                    </button>
                                </div>
                            )}

                            <motion.div 
                                ref={sliderRef}
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 hide-scrollbar scroll-smooth"
                                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                            >
                                {images.map((img) => {
                                    const displayTitle = img.title && img.title.toLowerCase().includes('whatsapp') ? 'RealVibe Moments' : img.title;
                                    return (
                                        <motion.div 
                                            key={img.id}
                                            variants={itemVariants}
                                            className="relative group rounded-2xl overflow-hidden bg-white/5 border border-white/10 shrink-0 w-[85vw] md:w-[45vw] lg:w-[30vw] snap-center shadow-2xl aspect-[4/5]"
                                        >
                                            <img 
                                                src={img.image_url} 
                                                alt={displayTitle || "RealVibe Culture"} 
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            
                                            {/* Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
                                                <motion.div
                                                    initial={{ y: 20, opacity: 0 }}
                                                    whileInView={{ y: 0, opacity: 1 }}
                                                    className="space-y-4"
                                                >
                                                    {displayTitle && (
                                                        <h3 className="text-xl font-bold text-white drop-shadow-lg">{displayTitle}</h3>
                                                    )}
                                                    <div className="flex items-center gap-4 text-white/60">
                                                        <div className="flex items-center gap-1.5 backdrop-blur-md bg-white/10 px-3 py-1 rounded-full">
                                                            <Heart size={14} className="text-pink-400" />
                                                            <span className="text-[10px] uppercase font-bold tracking-tighter">Community</span>
                                                        </div>
                                                        <div className="flex items-center gap-1.5 backdrop-blur-md bg-white/10 px-3 py-1 rounded-full">
                                                            <Users size={14} className="text-purple-400" />
                                                            <span className="text-[10px] uppercase font-bold tracking-tighter">Teamwork</span>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            </div>
                                            
                                            {/* Glass Frame Shine */}
                                            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-30 pointer-events-none transition-opacity" />
                                        </motion.div>
                                    );
                                })}
                            </motion.div>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}
