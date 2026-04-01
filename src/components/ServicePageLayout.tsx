"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MoveRight, CheckCircle2, ChevronRight, Zap } from "lucide-react";

interface ServicePageProps {
    title: string;
    subtitle: string;
    description: string;
    slug: string;
    techStack: { name: string; icon: string }[];
    process: { step: string; title: string; desc: string }[];
}

export function ServicePageLayout({
    title,
    subtitle,
    description,
    slug,
    techStack,
    process
}: ServicePageProps) {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: null, message: '' });

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get("name"),
            email: formData.get("email"),
            phone: formData.get("phone"),
            company: formData.get("company"),
            service: slug,
            message: formData.get("message"),
        };

        try {
            const res = await fetch("/api/leads", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            if (res.ok) {
                setStatus({ type: 'success', message: 'Message sent successfully! Our experts will contact you shortly.' });
                (e.target as HTMLFormElement).reset();
            } else {
                throw new Error("Failed to send");
            }
        } catch (error) {
            setStatus({ type: 'error', message: 'Failed to send message. Please try again or call us directly.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen relative bg-black selection:bg-purple-600/40 selection:text-white">
            <Navbar />

            {/* ════════ HERO ════════ */}
            <section className="relative pt-40 pb-16 md:pt-48 md:pb-24 px-6 overflow-hidden">
                <div className="absolute top-[-20%] left-1/4 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-3xl pointer-events-none"></div>

                <div className="max-w-7xl mx-auto relative z-10 w-full text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-white text-xs font-bold uppercase tracking-widest mb-6">
                            {subtitle}
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-black mb-6 leading-[1.1] text-white max-w-5xl mx-auto">
                            {title.split(' ').map((word, i, arr) => (
                                i === arr.length - 1 ? <span key={i} className="text-gradient-primary">{word}</span> : <span key={i}>{word} </span>
                            ))}
                        </h1>
                        <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
                            {description}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ════════ MAIN SPLIT CONTENT (Left: Story/Tech/Process | Right: Sticky Form) ════════ */}
            <section className="relative py-12 px-6 z-10 max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">

                    {/* LEFT COLUMN: Content */}
                    <div className="lg:col-span-7 xl:col-span-8 space-y-20 pb-20">

                        {/* Process Section */}
                        <div>
                            <div className="flex items-center gap-3 mb-8">
                                <Zap className="w-6 h-6 text-purple-400" />
                                <h2 className="text-3xl font-black text-white">How We Do It</h2>
                            </div>
                            <div className="space-y-6">
                                {process.map((p, i) => (
                                    <div key={i} className="group flex gap-6 p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors relative overflow-hidden">
                                        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-white/[0.06] flex items-center justify-center text-lg font-black text-purple-300">
                                            {p.step}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold mb-2 text-white group-hover:text-pink-400 transition-colors">{p.title}</h3>
                                            <p className="text-gray-400 leading-relaxed text-sm md:text-base">{p.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Tech Stack Section (with Icons) */}
                        <div>
                            <div className="flex items-center gap-3 mb-8">
                                <CheckCircle2 className="w-6 h-6 text-pink-400" />
                                <h2 className="text-3xl font-black text-white">Technologies & Tools</h2>
                            </div>
                            <p className="text-gray-400 mb-8 max-w-2xl">
                                We utilize industry-leading platforms to ensure performance, scale, and
                                measurable growth for your business.
                            </p>

                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {techStack.map((tech, i) => (
                                    <div key={i} className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-all hover:-translate-y-1">
                                        <img src={tech.icon} alt={tech.name} className="h-10 w-auto mb-4 opacity-80" />
                                        <span className="text-sm font-semibold text-gray-300 group-hover:text-white transition-colors">{tech.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Sticky Lead Form */}
                    <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-32 relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-pink-600/10 to-orange-600/20 rounded-[2rem] blur-2xl opacity-50"></div>
                        <div className="relative bg-[#050505] border border-white/10 rounded-[2rem] p-8 shadow-2xl">
                            <h3 className="text-2xl font-black text-white mb-2">Request Proposal</h3>
                            <p className="text-gray-400 text-sm mb-8">Fill this form and our experts will call you in 24 hours.</p>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="space-y-1.5 flex flex-col">
                                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest pl-1">Name</label>
                                    <input required type="text" name="name" className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500 focus:bg-white/[0.05] transition-colors" placeholder="John Doe" />
                                </div>
                                <div className="space-y-1.5 flex flex-col">
                                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest pl-1">Email</label>
                                    <input required type="email" name="email" className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500 focus:bg-white/[0.05] transition-colors" placeholder="john@company.com" />
                                </div>
                                <div className="space-y-1.5 flex flex-col">
                                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest pl-1">Phone</label>
                                    <input required type="tel" name="phone" className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500 focus:bg-white/[0.05] transition-colors" placeholder="+91 99999 99999" />
                                </div>
                                <div className="space-y-1.5 flex flex-col">
                                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest pl-1">Company / Website</label>
                                    <input type="text" name="company" className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500 focus:bg-white/[0.05] transition-colors" placeholder="yourcompany.com" />
                                </div>
                                <div className="space-y-1.5 flex flex-col">
                                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest pl-1">How can we help?</label>
                                    <textarea name="message" rows={3} className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500 focus:bg-white/[0.05] transition-colors resize-none" placeholder={`Details about your ${title.toLowerCase()} goals...`}></textarea>
                                </div>

                                {status.message && (
                                    <div className={`p-3 rounded-xl text-xs font-semibold ${status.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                                        {status.message}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold hover:opacity-90 transition-opacity active:scale-[0.98] disabled:opacity-50 flex justify-center items-center gap-2 mt-2 tap-bounce"
                                >
                                    {loading ? "Sending..." : "Submit Request"}
                                    {!loading && <ChevronRight className="w-4 h-4" />}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
