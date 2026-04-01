"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
// Lenis removed — causes scroll jank in Chrome

export default function AboutPage() {
    return (
        <main className="min-h-screen relative bg-black">
            <Navbar />

            {/* About Hero */}
            <section className="relative pt-40 pb-20 px-6 overflow-hidden">
                <div className="absolute top-[-20%] left-1/4 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-3xl pointer-events-none"></div>

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-white text-xs font-bold uppercase tracking-widest mb-6">
                            About RealVibe
                        </span>
                        <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white leading-[1.1] mb-8">
                            The Best Digital Marketing<br />
                            <span className="text-gradient-primary">Agency in Gurgaon</span>
                        </h1>
                        <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                            RealVibe is a premier digital marketing powerhouse based in Gurgaon, dedicated to transforming brands through data-driven strategies, innovative design, and relentless execution. We specialize in SEO, performance marketing, social media, and brand identity, empowering businesses to outpace the competition and achieve exponential growth in the digital landscape.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Vision/Mission */}
            <section className="py-20 px-6 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <motion.div
                        initial={{ x: -30, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        className="p-10 rounded-[2rem] bg-gradient-to-br from-purple-900/20 to-black border border-purple-500/20"
                    >
                        <h3 className="text-3xl font-black text-white mb-4">Our Vision</h3>
                        <p className="text-gray-400 leading-relaxed">To be globally recognized as the most innovative and results-driven digital marketing agency in Gurgaon. We strive to empower brands to dominate their industries through creative excellence, strategic foresight, and unparalleled execution.</p>
                    </motion.div>
                    <motion.div
                        initial={{ x: 30, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        className="p-10 rounded-[2rem] bg-gradient-to-br from-pink-900/20 to-black border border-pink-500/20"
                    >
                        <h3 className="text-3xl font-black text-white mb-4">Our Mission</h3>
                        <p className="text-gray-400 leading-relaxed">Our mission is to deliver exceptional, measurable ROI for our clients by blending cutting-edge technology with human-centric marketing. We aim to build sustainable brand equity and foster long-term partnerships that drive ultimate business success.</p>
                    </motion.div>
                </div>
            </section>

            <LeadershipSection />
            <TeamSection />
            <WorkCultureSection />

            <Footer />
        </main>
    );
}

// ════════ LEADERSHIP ════════
function LeadershipSection() {
    return (
        <section className="relative py-24 px-6 z-10 w-full overflow-hidden bg-black">
            <div className="max-w-7xl mx-auto relative">
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
                        Meet the Executor Fueling<br />
                        <span className="text-gradient-primary">Real Vibe's Journey</span>
                    </h2>
                </motion.div>

                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                    <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex-1"
                    >
                        <h3 className="text-3xl md:text-4xl font-black text-white mb-2">Ashutosh Tiwari</h3>
                        <p className="text-xl md:text-2xl font-bold text-pink-400 mb-8">(Chief Operating Officer)</p>

                        <div className="text-gray-300 text-lg leading-relaxed space-y-6">
                            <p>
                                A seasoned marketing professional with <span className="font-bold text-white">18 years of experience</span> in
                                promotions, events, branding, outdoor advertising, BTL activations,
                                marketing budgets, strategic planning, and implementation.
                            </p>
                            <p>
                                Played a pivotal role in driving sustainable growth for organizations such as Census Consultant,
                                Hero Realty, IMG, SRL Diagnostics, Fortis Healthcare, Spacetrans, Shekhar Hospital,
                                Apex Group of Hospitals, and others.
                            </p>
                            <p>
                                Committed to strengthening Real Vibe's market presence, fostering a culture of innovation,
                                and ensuring customer satisfaction remains at the heart of the company's operations.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-full max-w-md lg:w-1/3"
                    >
                        <div className="relative rounded-3xl overflow-hidden aspect-[4/5] border border-white/10 shadow-2xl shadow-purple-900/20 bg-white/[0.02]">
                            <img
                                src="/assets/ashutosh.jpg"
                                alt="Ashutosh Tiwari - COO"
                                className="w-full h-full object-cover object-top filter contrast-125 saturate-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

// ════════ TEAM ════════
function TeamSection() {
    const [team, setTeam] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTeam = async () => {
            try {
                const res = await fetch('/api/admin/team');
                if (res.ok) {
                    const data = await res.json();
                    setTeam(data);
                }
            } catch (err) {
                console.error("Failed to load team", err);
            } finally {
                setLoading(false);
            }
        };
        fetchTeam();
    }, []);

    if (!loading && team.length === 0) return null; // Don't show section if no team

    return (
        <section id="team" className="relative py-20 px-6 z-10 w-full overflow-hidden bg-black">
            <div className="max-w-7xl mx-auto relative">
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-widest mb-4">
                        Our People
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-white">
                        Meet the <span className="text-gradient-primary">Experts</span>
                    </h2>
                </motion.div>

                {loading ? (
                    <div className="flex justify-center py-10 opacity-50">
                        <div className="animate-pulse flex space-x-4">
                            <div className="rounded-full bg-slate-700 h-20 w-20"></div>
                            <div className="rounded-full bg-slate-700 h-20 w-20"></div>
                            <div className="rounded-full bg-slate-700 h-20 w-20"></div>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {team.map((member, i) => {
                            const socials = member.social_links ? JSON.parse(member.social_links) : {};
                            return (
                                <motion.div
                                    key={member.id}
                                    initial={{ y: 30, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="group relative rounded-2xl overflow-hidden bg-white/[0.02] border border-white/5 p-6 hover:bg-white/[0.05] transition-colors duration-500 flex flex-col items-center text-center"
                                >
                                    <div className="w-32 h-32 mb-6 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-purple-500/50 transition-colors duration-500">
                                        {member.image_url ? (
                                            <img src={member.image_url} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center text-3xl font-bold text-white/50">
                                                {member.name.charAt(0)}
                                            </div>
                                        )}
                                    </div>

                                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-purple-300 transition-colors">{member.name}</h3>
                                    <p className="text-sm font-medium text-pink-400 mb-4">{member.role}</p>

                                    {member.bio && (
                                        <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">{member.bio}</p>
                                    )}

                                    <div className="flex items-center gap-4 mt-auto opacity-50 group-hover:opacity-100 transition-opacity">
                                        {socials.linkedin && (
                                            <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors">
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                                            </a>
                                        )}
                                        {socials.twitter && (
                                            <a href={socials.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors">
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
                                            </a>
                                        )}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
}

// ════════ WORK CULTURE ════════
function WorkCultureSection() {
    const [images, setImages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCultureImages = async () => {
            try {
                const res = await fetch('/api/admin/culture');
                if (res.ok) {
                    const data = await res.json();
                    setImages(data);
                }
            } catch (err) {
                console.error("Failed to load culture images", err);
            } finally {
                setLoading(false);
            }
        };
        fetchCultureImages();
    }, []);

    if (!loading && images.length === 0) return null;

    return (
        <section id="work-culture" className="relative py-20 px-6 z-10 w-full overflow-hidden bg-black">
            <div className="max-w-7xl mx-auto relative">
                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-bold uppercase tracking-widest mb-4">
                        Life at RealVibe
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-white">
                        Our Work <span className="text-gradient-primary">Culture</span>
                    </h2>
                </motion.div>

                {loading ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 opacity-50">
                        <div className="animate-pulse bg-slate-800 aspect-video rounded-2xl"></div>
                        <div className="animate-pulse bg-slate-800 aspect-square rounded-2xl"></div>
                        <div className="animate-pulse bg-slate-800 aspect-video rounded-2xl"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 auto-rows-[250px] md:auto-rows-[350px]">
                        {images.map((img, i) => {
                            // creating a masonry-like staggered layout automatically
                            const isLarge = i % 5 === 0 || i % 5 === 3;
                            return (
                                <motion.div
                                    key={img.id}
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                                    className={`relative rounded-3xl overflow-hidden group ${isLarge ? 'md:col-span-2' : ''}`}
                                >
                                    <img src={img.image_url} alt={img.title || "RealVibe Culture"} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    {img.title && (
                                        <div className="absolute bottom-6 left-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0 text-white font-bold text-lg leading-tight">
                                            {img.title}
                                        </div>
                                    )}
                                </motion.div>
                            )
                        })}
                    </div>
                )}
            </div>
        </section>
    );
}
