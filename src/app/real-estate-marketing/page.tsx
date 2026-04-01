"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, useInView } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { RealEstateLeadForm } from "@/components/RealEstateLeadForm";
import { Phone, CheckCircle2, Play, Rocket, Target, BarChart3, Clock, Zap, Instagram } from "lucide-react";
import Link from "next/link";

import { LeadModal } from "@/components/LeadModal";

// ════════ ANIMATED COUNTER COMPONENT ════════
function AnimatedCounter({ value, duration = 1.5, suffix = "" }: { value: number, duration?: number, suffix?: string }) {
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, { stiffness: 30, damping: 20 });
    const [displayValue, setDisplayValue] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (isInView) {
            motionValue.set(value);
        }
    }, [isInView, value, motionValue]);

    useEffect(() => {
        springValue.on("change", (latest) => {
            setDisplayValue(Math.floor(latest));
        });
    }, [springValue]);

    return <span ref={ref}>{displayValue}{suffix}</span>;
}

export default function RealEstateMarketingPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => setIsModalOpen(!isModalOpen);

    return (
        <main className="min-h-screen bg-black selection:bg-purple-600/40 selection:text-white relative overflow-hidden">
            <Navbar />

            {/* Architectural Backdrop */}
            <BlueprintBackdrop />

            <HeroSection openModal={toggleModal} />
            <ProblemSection openModal={toggleModal} />
            <ResultsSection />
            <EngineSection />
            <ClosingSection openModal={toggleModal} />
            <Footer />

            <LeadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </main>
    );
}

// ════════ ARCHITECTURAL BACKDROP (BLUEPRINT & LINES) ════════
function BlueprintBackdrop() {
    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {/* Vertical Tactical Lines */}
            <div className="absolute inset-0 flex justify-around opacity-20">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="w-[1px] h-full bg-gradient-to-b from-transparent via-white/5 to-transparent shadow-[0_0_10px_rgba(255,255,255,0.05)]" />
                ))}
            </div>

            {/* Horizontal Tactical Lines */}
            <div className="absolute inset-0 flex flex-col justify-around opacity-10">
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                ))}
            </div>

            {/* Specular Data Points (Intersections) */}
            <motion.div
                animate={{ opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute top-[30%] left-[16.6%] w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)]"
            />
            <motion.div
                animate={{ opacity: [0.1, 0.4, 0.1] }}
                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                className="absolute top-[60%] right-[33.3%] w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)]"
            />

            {/* Modern Skyscraper Silhouette (Bottom Right) */}
            <div className="absolute bottom-0 right-[5%] w-[400px] h-[600px] opacity-[0.04] select-none">
                <svg viewBox="0 0 200 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <path d="M40 400V120H60V80H80V40H120V80H140V120H160V400" stroke="white" strokeWidth="1" />
                    <rect x="90" y="50" width="20" height="20" stroke="white" strokeWidth="0.5" />
                    <rect x="70" y="90" width="60" height="20" stroke="white" strokeWidth="0.5" />
                    <rect x="50" y="130" width="100" height="20" stroke="white" strokeWidth="0.5" />
                    <line x1="40" y1="170" x2="160" y2="170" stroke="white" strokeWidth="0.5" />
                    <line x1="40" y1="210" x2="160" y2="210" stroke="white" strokeWidth="0.5" />
                    <line x1="40" y1="250" x2="160" y2="250" stroke="white" strokeWidth="0.5" />
                    <line x1="40" y1="290" x2="160" y2="290" stroke="white" strokeWidth="0.5" />
                    <line x1="40" y1="330" x2="160" y2="330" stroke="white" strokeWidth="0.5" />
                    <line x1="40" y1="370" x2="160" y2="370" stroke="white" strokeWidth="0.5" />
                </svg>
            </div>

            {/* Building 2 (Bottom Left) */}
            <div className="absolute top-[40%] left-[2%] w-[300px] h-[500px] opacity-[0.03] select-none scale-x-[-1] hidden lg:block">
                <svg viewBox="0 0 200 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <path d="M20 400V150H60V100H100V400" stroke="white" strokeWidth="1" />
                    <path d="M120 400V200H180V400" stroke="white" strokeWidth="1" />
                    <rect x="35" y="170" width="10" height="10" stroke="white" strokeWidth="0.5" />
                    <rect x="35" y="200" width="10" height="10" stroke="white" strokeWidth="0.5" />
                </svg>
            </div>
        </div>
    );
}

// ════════ HERO SECTION ════════
function HeroSection({ openModal }: { openModal: () => void }) {
    return (
        <section id="hero-section" className="relative min-h-[100vh] flex flex-col overflow-hidden bg-transparent pt-32 md:pt-48 pb-32">
            {/* Theme Glows */}
            <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-magenta-600/10 rounded-full blur-[100px] pointer-events-none" />

            {/* Tiny Box Particles */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[20%] left-[15%] w-1 h-1 bg-white/10"></div>
                <div className="absolute top-[30%] left-[25%] w-1.5 h-1.5 bg-white/20"></div>
                <div className="absolute top-[50%] right-[10%] w-1 h-1 bg-white/10"></div>
            </div>

            <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-32 items-start z-10 px-6 flex-grow">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="relative z-10"
                >
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6 text-white">
                        High-Intent, <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500">Qualified Leads.</span><br />
                        Delivered Daily.
                    </h1>

                    <p className="text-sm md:text-base font-bold text-white mb-10 tracking-tight max-w-xl opacity-90">
                        Real Estate Marketing Engineered to Outperform Every Industry Benchmark.
                    </p>

                    {/* Stats Card - Dark Glass */}
                    <div className="bg-white/[0.03] p-6 md:p-8 rounded-[2.5rem] border border-white/10 backdrop-blur-md mb-12 max-w-xl shadow-2xl">
                        <div className="grid grid-cols-3 gap-4 md:gap-6 text-center md:text-left">
                            <div className="flex flex-col items-center md:items-start text-center md:text-left">
                                <div className="text-xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 mb-1">
                                    +<AnimatedCounter value={47} suffix="%" />
                                </div>
                                <div className="text-[10px] md:text-[11px] font-bold text-gray-400 uppercase leading-tight tracking-tighter">Increased Qualified <br className="hidden md:block" />Leads</div>
                            </div>
                            <div className="flex flex-col items-center md:items-start text-center md:text-left border-x border-white/5 md:px-0">
                                <div className="text-xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 mb-1">
                                    <AnimatedCounter value={100} suffix="%" />
                                </div>
                                <div className="text-[10px] md:text-[11px] font-bold text-gray-400 uppercase leading-tight tracking-tighter">Real-Estate-Only <br className="hidden md:block" />Focus</div>
                            </div>
                            <div className="flex flex-col items-center md:items-start text-center md:text-left">
                                <div className="text-xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 mb-1">
                                    <AnimatedCounter value={500} suffix="+" />
                                </div>
                                <div className="text-[10px] md:text-[11px] font-bold text-gray-400 uppercase leading-tight tracking-tighter">Real-Estate Campaigns <br className="hidden md:block" />Delivered</div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link href="tel:+919718428801" className="group flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#BE185D] to-[#9D174D] text-white font-bold text-sm hover:scale-[1.05] hover:shadow-[0_0_20px_rgba(190,24,93,0.3)] active:scale-95 transition-all shadow-xl shadow-pink-900/20">
                            <Phone className="w-5 h-5 fill-white" />
                            Call Us Now
                        </Link>
                        <button
                            onClick={openModal}
                            className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/[0.05] border border-white/10 text-white font-bold text-sm hover:bg-white/[0.1] hover:scale-[1.05] active:scale-95 transition-all shadow-xl group"
                        >
                            <Clock className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" />
                            Book Your Session
                        </button>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                    className="lg:mt-0 mt-12 hidden lg:block"
                >
                    <RealEstateLeadForm variant="dark" />
                </motion.div>
            </div>

        </section>
    );
}

// ════════ PROBLEM SECTION (DARK GLASS) ════════
function ProblemSection({ openModal }: { openModal: () => void }) {
    return (
        <section className="relative bg-transparent py-24 md:py-32 overflow-hidden">
            {/* Subtle Grid Theme */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#FFF 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 md:gap-20 items-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative text-center md:text-left"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-500 mb-12 md:mb-16 leading-tight tracking-tight">
                        Tired of Leads That Go <br />
                        <span className="text-white">Nowhere?</span>
                    </h2>
                    <img src="/assets/real-estate/problem.png" alt="Frustrated real estate professional" className="w-full max-w-xs md:max-w-sm mx-auto drop-shadow-[0_0_50px_rgba(168,85,247,0.2)]" />
                </motion.div>

                <div className="bg-white/[0.03] p-8 md:p-16 rounded-[2.5rem] md:rounded-[3rem] border border-white/10 backdrop-blur-md shadow-2xl">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-8 tracking-tight">You're spending lakhs on ads and getting:</h3>
                    <ul className="space-y-4 mb-10 md:mb-12">
                        {['Low-quality contacts', 'No follow-ups', 'No clear funnel', 'No sales traction'].map((item, i) => (
                            <li key={i} className="flex items-center gap-4 text-gray-400 py-3 border-b border-white/5 last:border-0">
                                <div className="w-6 h-6 rounded-full bg-red-900/20 flex items-center justify-center">
                                    <CheckCircle2 className="w-4 h-4 text-red-500 rotate-180" />
                                </div>
                                <span className="font-semibold text-[14px] md:text-[15px]">{item}</span>
                            </li>
                        ))}
                    </ul>

                    <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 tracking-tight leading-snug">
                        It’s not a traffic problem. <br />
                        <span className="text-purple-500">it's an intent problem.</span>
                    </h2>
                    <p className="text-gray-500 font-bold mb-8 italic">— We build that system</p>
                    <p className="text-gray-400 leading-relaxed max-w-md text-[16px] md:text-[17px] mb-10">
                        From targeting to <span className="text-white font-bold">messaging to automation</span> — everything works together to bring you <span className="text-white font-bold">sales-ready conversations</span>.
                    </p>

                    <button
                        onClick={openModal}
                        className="group flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold hover:scale-[1.05] hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] transition-all w-full md:w-auto"
                    >
                        Fix My Intent Problem
                        <Rocket className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                </div>
            </div>

            {/* Simple Divider */}
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
        </section>
    );
}

// ════════ RESULTS SECTION ════════
function ResultsSection() {
    const clients = [
        { name: "Central Park", logo: "/assets/real-estate/CENTRAL-PARK-LOGO_Mother-Logo-scaled-e1762848235731-1015x1024.webp", val: 37, suffix: "%", sub: "Qualified Leads for Bignonia" },
        { name: "Signature Global", logo: "/assets/real-estate/imgi_1_SG-GLOBAL-NEW-LOGO-1024x373.webp", val: 47, suffix: "%", sub: "Sales-ready Inquiries for Park Extension 1" },
        { name: "Trevoc", logo: "/assets/real-estate/logo-2.webp", val: 33, suffix: "%", sub: "High-intent Conversions for Royal Residences" },
        { name: "Emaar", logo: "/assets/real-estate/8571fdf7-emaar-dxb-logo-en.svg", val: 31, suffix: "%", sub: "Qualified Leads for Elva" },
        { name: "Omaxe", logo: "/assets/real-estate/omaxe-logo-1.webp", val: 33, suffix: "%", sub: "Sales-ready Inquiries for Chandni Chowk" },
        { name: "Sobha", logo: "/assets/real-estate/sobha-logo-e1762941031469.webp", val: 37, suffix: "%", sub: "High-intent Conversions for Orbis" },
    ];

    return (
        <section className="py-24 md:py-32 px-6 bg-transparent relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-purple-500/40 blur-[2px]" />

            <div className="max-w-7xl mx-auto text-center mb-16 md:mb-20">
                <h2 className="text-3xl md:text-6xl font-black text-white mb-6 md:mb-8">
                    Real <span className="text-gradient-primary">Results</span> from Real Estate <span className="text-[#FF7A59]">Clients</span>
                </h2>
                <p className="text-gray-400 text-base md:text-xl font-medium max-w-2xl mx-auto italic px-4">
                    " We don't just generate leads. We drive <span className="text-pink-500">qualified</span>, high-intent prospects that result in <span className="text-[#FF7A59]">actual sales</span>. "
                </p>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {clients.map((client, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] bg-[#0A0A0A] border border-white/5 hover:bg-white/[0.05] transition-all group flex flex-col items-center text-center"
                    >
                        <div className="h-12 md:h-16 flex items-center justify-center mb-6 md:mb-8 px-4 opacity-80 group-hover:opacity-100 transition-opacity">
                            <img src={client.logo} alt={client.name} className="max-w-full max-h-full object-contain" />
                        </div>
                        <div className="text-3xl md:text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500 mb-2">
                            +<AnimatedCounter value={client.val} suffix={client.suffix} />
                        </div>
                        <div className="text-[12px] md:text-[13px] font-bold text-gray-400 uppercase tracking-tight leading-tight">{client.sub}</div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

// ════════ ENGINE STEP SUB-COMPONENT ════════
function EngineStep({ step, index, isEven, scrollYProgress }: { step: any, index: number, isEven: boolean, scrollYProgress: any }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { margin: "-40% 0% -40% 0%" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0.3, y: 30 }}
            animate={{
                opacity: isInView ? 1 : 0.3,
                y: 0,
                scale: isInView ? 1 : 0.98
            }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            className="relative group pl-12 md:pl-16 lg:pl-0"
        >
            {/* Connector Dot */}
            <div className="absolute left-[-10px] md:left-[-15px] lg:left-1/2 lg:-translate-x-1/2 top-10 flex items-center justify-center z-20">
                <motion.div
                    animate={{
                        scale: isInView ? [1, 1.4, 1.2] : 1,
                        backgroundColor: isInView ? "#fff" : "#000",
                        borderColor: isInView ? "#A855F7" : "rgba(255,255,255,0.2)"
                    }}
                    className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-black border-2 shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all duration-500"
                />
            </div>

            <div className={`relative w-full lg:w-[46%] ${isEven ? 'lg:ml-auto' : 'lg:mr-auto'}`}>
                {/* Unified Premium Box */}
                <div className={`relative p-[1px] rounded-[2rem] md:rounded-[2.5rem] transition-all duration-700 overflow-hidden shadow-2xl ${isInView ? "bg-gradient-to-br from-purple-500/50 via-white/20 to-pink-500/50 scale-[1.02]" : "bg-white/5"
                    }`}>
                    {/* Subtle Glow Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-pink-500/10 transition-opacity duration-700 ${isInView ? "opacity-100" : "opacity-0"}`} />

                    <div className="relative bg-[#080808] rounded-[1.9rem] md:rounded-[2.4rem] p-6 md:p-8 overflow-hidden">
                        {/* Image Showcase */}
                        <div className="aspect-video rounded-2xl md:rounded-3xl overflow-hidden mb-6 md:mb-8 border border-white/5 relative group/img">
                            <img src={step.img} alt={step.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover/img:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-40" />
                        </div>

                        {/* Content */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] uppercase font-black tracking-[0.2em]">Step 0{index + 1}</div>
                                {isInView && (
                                    <motion.div initial={{ width: 0 }} animate={{ width: 24 }} className="h-[1px] bg-purple-500" />
                                )}
                            </div>
                            <h3 className="text-xl md:text-3xl font-black text-white tracking-tight leading-tight">{step.title}</h3>
                            <p className="text-gray-400 text-sm md:text-base leading-relaxed">{step.desc}</p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

// ════════ ENGINE SECTION (Z-PATTERN) ════════
function EngineSection() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const steps = [
        {
            title: "Full-Funnel Ad Strategy",
            desc: "The architecture of growth. From ad-click to closing, we design a journey tailored for real estate decision-making cycles.",
            img: "/assets/real-estate/1ST STEP.webp"
        },
        {
            title: "Market Intelligence + Buyer Mapping",
            desc: "Finding the 1% that buys. We run deep research to match your project type with serious, high-intent prospects.",
            img: "/assets/real-estate/2ND STEP.webp"
        },
        {
            title: "High-End Ad Creatives",
            desc: "Thumb-stopping luxury visuals. We create copy and design that triggers emotional buy-in from your target audience.",
            img: "/assets/real-estate/3RD STEP.webp"
        },
        {
            title: "Instant Lead Response That Closes the Gap",
            desc: "Instant response is non-negotiable. Our system messages leads instantly, keeping them warm and moving toward a site visit.",
            img: "/assets/real-estate/4RTH STEP.webp"
        }
    ];

    return (
        <section ref={containerRef} className="py-16 md:py-24 px-4 md:px-6 bg-transparent relative">
            <div className="max-w-7xl mx-auto text-center mb-20 md:mb-32 relative z-10 px-4">
                <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/40 text-[10px] font-black uppercase tracking-[0.3em] mb-8">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
                    Proprietary lead pipeline
                </div>
                <h2 className="text-4xl md:text-8xl font-black text-white leading-[1.1] tracking-tighter">
                    THE LEAD <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500">ENGINE</span>
                </h2>
                <div className="mt-8 flex justify-center">
                    <div className="w-[1px] h-12 md:h-16 bg-gradient-to-b from-purple-500 to-transparent" />
                </div>
            </div>

            <div className="max-w-6xl mx-auto relative px-2 md:px-4">
                {/* Connecting Vertical Line (Laser Core) */}
                <div className="absolute left-[34px] md:left-[30px] lg:left-1/2 top-0 bottom-0 w-[1px] md:w-[3px] bg-white/5 lg:-translate-x-1/2 overflow-hidden">
                    {/* Glowing Progress Base */}
                    <motion.div
                        className="w-full bg-gradient-to-b from-purple-500 via-pink-500 to-orange-500 shadow-[0_0_20px_rgba(168,85,247,0.5)]"
                        style={{
                            scaleY,
                            transformOrigin: "top"
                        }}
                    />
                    {/* Laser Core - Shimmering White Line */}
                    <motion.div
                        className="absolute inset-0 w-[1px] mx-auto bg-white/50 blur-[1px]"
                        style={{ scaleY, transformOrigin: "top" }}
                    />
                </div>

                {/* Liquid Tip Glow (Tracking Dot) */}
                <motion.div
                    style={{
                        top: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]),
                        left: "34.5px", // Match mobile line pos
                        x: "-50%",
                        y: "-50%"
                    }}
                    className="absolute w-3.5 h-3.5 rounded-full bg-white shadow-[0_0_40px_rgba(168,85,247,1),0_0_20px_rgba(255,255,255,1)] z-30 lg:hidden"
                />
                <motion.div
                    style={{
                        top: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]),
                        left: "50%", // Desktop center
                        x: "-50%",
                        y: "-50%"
                    }}
                    className="absolute w-6 h-6 rounded-full bg-white shadow-[0_0_50px_rgba(168,85,247,1),0_0_20px_rgba(255,255,255,1)] z-30 hidden lg:block"
                />

                <div className="space-y-16 md:space-y-24">
                    {steps.map((step, i) => (
                        <EngineStep
                            key={i}
                            step={step}
                            index={i}
                            isEven={i % 2 === 1}
                            scrollYProgress={scrollYProgress}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

// ════════ CLOSING SECTION (3-COLUMN LAYOUT) ════════
function ClosingSection({ openModal }: { openModal: () => void }) {
    return (
        <section className="py-24 md:py-32 px-6 bg-transparent relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-pink-600/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr_1.4fr] gap-16 lg:gap-16 items-center relative z-10">

                {/* Column 1: Video/Watch */}
                <div className="flex flex-col h-full mb-8 lg:mb-0">
                    <h3 className="text-xl md:text-3xl font-black text-white mb-8 tracking-tight leading-tight">
                        Watch our <span className="text-pink-500">Performance</span> <br />
                        Lead break down
                    </h3>
                    <Link
                        href="https://www.instagram.com/reel/DQ4SwYLibJe/"
                        target="_blank"
                        className="relative group block aspect-square lg:aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl bg-black/40"
                    >
                        <img src="/assets/automation.png" alt="Smart Automation Video" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100" />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/10 backdrop-blur-3xl flex items-center justify-center hover:scale-110 hover:bg-purple-600 transition-all duration-500 group/play border border-white/20">
                                <Play className="w-8 h-8 md:w-10 md:h-10 text-white fill-current ml-1" />
                            </div>
                        </div>
                        {/* Instagram Branding Badge */}
                        <div className="absolute bottom-6 left-6 flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
                            <Instagram className="w-4 h-4 text-pink-500" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-white">Watch on Instagram</span>
                        </div>
                    </Link>
                </div>

                {/* Column 2: Quick Form Benefits/Text */}
                <div className="flex flex-col h-full lg:px-4 mb-8 lg:mb-0">
                    <h3 className="text-xl md:text-3xl font-black text-white mb-8 md:mb-10 tracking-tight leading-tight">
                        Fill out one quick form <br />
                        <span className="relative inline-block mt-2">
                            and Get
                            <span className="absolute -bottom-2 left-0 w-full h-1 bg-yellow-400 rounded-full"></span>
                        </span>
                    </h3>
                    <ul className="space-y-5 md:space-y-6 mb-10">
                        {[
                            { title: 'Your Custom Ad Strategy Plan', icon: CheckCircle2 },
                            { title: 'WhatsApp Follow-Up Setup', icon: CheckCircle2 },
                            { title: 'Full Funnel Blueprint', icon: CheckCircle2 },
                        ].map((item, i) => (
                            <li key={i} className="flex items-start gap-4">
                                <item.icon className="w-6 h-6 text-pink-500 flex-shrink-0" />
                                <span className="text-[16px] md:text-[17px] font-bold text-white leading-tight">{item.title}</span>
                            </li>
                        ))}
                        <li className="flex items-start gap-4 pl-1">
                            <Phone className="w-5 h-5 text-gray-500 flex-shrink-0 mt-1" />
                            <span className="text-[16px] md:text-[17px] font-bold text-gray-300">WhatsApp-enabled</span>
                        </li>
                        <li className="flex items-start gap-4 pl-1">
                            <BarChart3 className="w-5 h-5 text-gray-500 flex-shrink-0 mt-1" />
                            <span className="text-[16px] md:text-[17px] font-bold text-gray-300">CRM-ready</span>
                        </li>
                    </ul>

                    {/* Moved CTA Button here */}
                    <button
                        onClick={openModal}
                        className="group flex items-center justify-center gap-3 px-8 py-5 rounded-2xl bg-gradient-to-r from-gray-200 to-white text-black font-black hover:scale-[1.05] hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] transition-all mb-8 w-fit mx-auto md:mx-0"
                    >
                        <Clock className="w-5 h-5 text-gray-400 group-hover:text-black" />
                        Get Your Free Ad Strategy Plan
                    </button>
                </div>

                {/* Column 3: Ready to Start / Form Component */}
                <div className="flex flex-col h-full min-w-0">
                    <div className="mb-8 pl-4 text-center md:text-left">
                        <h3 className="text-xl md:text-3xl font-black text-white mb-2 tracking-tight">
                            🚀 Ready to Start?
                        </h3>
                        <h4 className="inline-block relative">
                            <span className="text-[13px] md:text-[15px] font-black uppercase text-gray-400 tracking-[0.2em]">Let's Build Your Lead Engine</span>
                            <span className="absolute -bottom-1.5 left-0 w-full h-[3px] bg-yellow-400 rounded-full"></span>
                        </h4>
                    </div>

                    <div className="bg-[#0A0A0A]/80 backdrop-blur-2xl p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-white/10 shadow-3xl h-full flex flex-col justify-center w-full">
                        <RealEstateLeadForm variant="dark" />
                    </div>
                </div>

            </div>
        </section>
    );
}
