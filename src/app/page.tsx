"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ServiceCard } from "@/components/ServiceCard";
import { TeamSection } from "@/components/TeamSection";
import { BlogSection } from "@/components/BlogSection";
import { AnimatedButton } from "@/components/AnimatedButton";
// Lenis removed — causes scroll jank in Chrome
import { MoveRight, ArrowRight, Play, CheckCircle2, Clapperboard, Video, Smartphone, Monitor, Rocket, Target, Megaphone, Mic, Palette, Brain, TrendingUp, PenTool, BarChart3, Mail, Settings, Newspaper, Search, Map, Zap, LineChart } from "lucide-react";

// ════════ GLOBAL CSS FOR MOVING BORDER ════════
const GlobalStyles = () => (
  <style jsx global>{`
    @keyframes moveBorder {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    .animate-moving-border {
      animation: moveBorder 4s linear infinite;
    }
    @keyframes marquee {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    .animate-marquee {
      animation: marquee 30s linear infinite;
    }
    @keyframes scroll-left {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    @keyframes scroll-right {
      0% { transform: translateX(-50%); }
      100% { transform: translateX(0); }
    }
    .marquee-left {
      animation: scroll-left 35s linear infinite;
      will-change: transform;
    }
    .marquee-right {
      animation: scroll-right 35s linear infinite;
      will-change: transform;
    }
    .marquee-track:hover .marquee-left,
    .marquee-track:hover .marquee-right {
      animation-play-state: paused;
    }
    .text-stroke {
      -webkit-text-stroke: 1px rgba(255, 255, 255, 0.1);
      color: transparent;
    }
    .bg-noise {
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    }
  `}</style>
);

// ════════ CINEMATIC BACKGROUND — Pure CSS (no JS animation loops) ════════
const BackgroundDecor = () => (
  <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
    {/* Base Grid */}
    <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)]" style={{ backgroundSize: '40px 40px' }} />

    {/* Animated Orbs — Optimised CSS keyframes */}
    {/* Swapped heavy custom blur-[120px] filters to standard blur-3xl with will-change to avoid compositor jitter */}
    <div className="orb-1 gpu-layer absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-purple-900/10 rounded-full blur-3xl opacity-60 will-change-transform" />
    <div className="orb-2 gpu-layer absolute bottom-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-pink-900/10 rounded-full blur-3xl opacity-60 will-change-transform" />

    {/* Static light wash */}
    <div className="absolute top-[20%] left-[-5%] w-[40vw] h-[40vw] bg-blue-900/5 rounded-full blur-3xl opacity-50" />
  </div>
);

// ════════ CINEMATIC MARQUEE ════════
const MarqueeSection = () => (
  <section className="py-12 md:py-24 bg-black overflow-hidden border-y border-white/5 relative z-10">
    <div className="flex whitespace-nowrap animate-marquee">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex items-center gap-10 md:gap-20 pr-10 md:pr-20">
          <span className="text-[6vw] md:text-[3vw] font-bold uppercase tracking-widest text-white leading-none">
            Real Estate <span className="text-gradient-primary">Marketing</span>
          </span>
          <div className="w-2 h-2 md:w-4 md:h-4 rounded-full bg-pink-500 shadow-[0_0_20px_rgba(236,72,153,0.4)]" />
          <span className="text-[6vw] md:text-[3vw] font-bold uppercase tracking-widest text-stroke leading-none">
            Real Vibe
          </span>
          <div className="w-2 h-2 md:w-4 md:h-4 rounded-full bg-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.4)]" />
        </div>
      ))}
    </div>
  </section>
);


// ════════ MOUSE FOLLOWER (PREMIUM UX) — OPTIMIZED ════════
const MouseFollower = () => {
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  // Tighten the spring but keep restDelta tight for snappiness
  const springX = useSpring(mouseX, { stiffness: 400, damping: 40, restDelta: 0.001 });
  const springY = useSpring(mouseY, { stiffness: 400, damping: 40, restDelta: 0.001 });

  // Center the gradient perfectly to the mouse (we use 600px width/height, so offset by 300)
  const x = useTransform(springX, v => v - 300);
  const y = useTransform(springY, v => v - 300);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden hidden md:block">
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full will-change-transform"
        style={{ 
          x, 
          y,
          background: "radial-gradient(circle, rgba(236, 72, 153, 0.04), transparent 70%)"
        }}
      />
    </div>
  );
};

export default function Home() {
  return (
    <main className="bg-black min-h-screen selection:bg-pink-500 selection:text-white relative">
      <BackgroundDecor />
      <MouseFollower />
      <GlobalStyles />
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <DoubleScrollMarquee />
      <AboutSection />
      <OurApproachSection />
      <PortfolioSection />
      <TestimonialsSection />
      <TeamSection />
      <BlogSection />
      <CTASection />
      <Footer />
    </main>
  );
}

// ════════ HERO ════════
function HeroSection() {
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await fetch('/api/admin/clients');
        if (res.ok) {
          const data = await res.json();
          setClients(data || []);
        }
      } catch (err) {
        console.error("Failed to fetch clients", err);
      } finally {
        setLoading(false);
      }
    };
    fetchClients();
  }, []);

  return (
    <section id="hero-section" className="relative h-screen flex flex-col justify-center overflow-hidden bg-black">


      {/* Top subtle light ray — responsive width to prevent overflow */}
      <div className="absolute top-[-20%] md:top-[-40%] left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[400px] md:h-[800px] bg-white/[0.03] rounded-full blur-3xl pointer-events-none transform -rotate-45 will-change-transform"></div>

      {/* Tiny Box Particles (Drifting for lively feel) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="animate-drift absolute top-[20%] left-[15%] w-1 h-1 bg-white/20"></div>
        <div className="animate-drift absolute top-[30%] left-[25%] w-1.5 h-1.5 bg-white/30" style={{ animationDelay: '-2s' }}></div>
        <div className="animate-drift absolute top-[15%] right-[20%] w-1 h-1 bg-white/20" style={{ animationDelay: '-5s' }}></div>
        <div className="animate-drift absolute top-[40%] right-[30%] w-2 h-2 bg-white/10" style={{ animationDelay: '-1s' }}></div>
        <div className="animate-drift absolute top-[60%] left-[10%] w-1.5 h-1.5 bg-white/20" style={{ animationDelay: '-7s' }}></div>
        <div className="animate-drift absolute top-[70%] left-[30%] w-1 h-1 bg-white/10" style={{ animationDelay: '-3s' }}></div>
        <div className="animate-drift absolute top-[50%] right-[15%] w-1 h-1 bg-white/30" style={{ animationDelay: '-9s' }}></div>
        <div className="animate-drift absolute top-[80%] right-[25%] w-1.5 h-1.5 bg-white/20" style={{ animationDelay: '-4s' }}></div>
        <div className="animate-drift absolute top-[45%] left-[45%] w-1 h-1 bg-white/40" style={{ animationDelay: '-6s' }}></div>
        <div className="animate-drift absolute top-[25%] left-[60%] w-1.5 h-1.5 bg-white/20" style={{ animationDelay: '-8s' }}></div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center max-w-4xl mx-auto px-6 mt-[-10vh]"
      >

        {/* Title */}
        <motion.h1
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tighter leading-[1.1] mb-6 md:mb-8 font-heading overflow-visible"
        >
          <span className="text-gradient-metallic pr-[0.1em]">We Deliver</span> <span className="text-gradient-primary pr-[0.1em]">Leads</span>
          <br />
          <span className="text-gradient-metallic pr-[0.1em]">That</span> <span className="text-gradient-primary pr-[0.1em]">Sell</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="text-[15px] md:text-[17px] text-gray-400 max-w-xl mx-auto leading-relaxed mb-8 md:mb-12 px-2"
        >
          India's #1 real estate digital marketing agency. We generate
          high-intent buyer leads that convert into site visits and sales.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <AnimatedButton href="/contact" variant="primary">
            Start Your Project
          </AnimatedButton>
          <AnimatedButton href="#portfolio" variant="outline">
            View Our Work
          </AnimatedButton>
        </motion.div>
      </motion.div>

      {/* ═══ THEY TRUSTED US — Infinite Marquee (CSS-based for performance) ═══ */}
      <div className="absolute bottom-6 md:bottom-10 left-0 right-0 z-10">
        <div className="flex justify-center mb-4 md:mb-8">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">Builders who trust us</span>
        </div>
        <div className="trusted-marquee-wrapper relative overflow-hidden">
          <div className="trusted-marquee flex items-center gap-8 md:gap-12 whitespace-nowrap w-max">
            {/* Repeat twice for continuous CSS marquee */}
            {[1, 2].map((loop) => (
              <div key={loop} className="flex gap-8 md:gap-12">
                {(!loading && clients.length > 0) ? (
                  clients.map((client, i) => (
                    <div key={`client-${loop}-${i}`} className="flex-shrink-0 w-20 md:w-32 h-10 md:h-12 flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity duration-300" title={client.name}>
                      <img src={client.logo_url} alt={client.name || "Client"} className="max-w-full max-h-full object-contain transition-all duration-300" loading="eager" />
                    </div>
                  ))
                ) : (
                  [
                    { name: 'Skyline', initials: 'SK' },
                    { name: 'Metro', initials: 'MB' },
                    { name: 'Apex', initials: 'AG' },
                    { name: 'Prime', initials: 'PC' },
                    { name: 'Urban', initials: 'UR' },
                    { name: 'TechNova', initials: 'TN' },
                    { name: 'GreenLeaf', initials: 'GL' },
                    { name: 'PropStar', initials: 'PS' },
                    { name: 'Horizon', initials: 'HH' },
                    { name: 'NexGen', initials: 'NG' },
                    { name: 'BluePeak', initials: 'BP' },
                    { name: 'Zenith', initials: 'ZR' },
                  ].map((client, i) => (
                    <div key={`fb-${loop}-${i}`} className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center hover:bg-white/[0.08] hover:border-white/[0.15] transition-all duration-300 cursor-default" title={client.name}>
                      <span className="text-[10px] md:text-[11px] font-black text-gray-400 tracking-tight">{client.initials}</span>
                    </div>
                  ))
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ════════ SERVICES ════════
function ServicesSection() {
  const servicesData = [
    {
      title: 'Performance Ads',
      description: 'Generate high-intent leads through precision-targeted Google Ads, Meta Ads, and programmatic campaigns. Every budget optimized for maximum conversions and measurable ROI.',
      tags: ['Google Ads', 'Meta Ads', 'Lead Gen', 'Retargeting', 'CPL Optimization'],
      bg: 'bg-gradient-to-br from-[#2e1a0a] to-[#4e2d1b]',
      iconGradient: 'from-orange-400 via-amber-400 to-yellow-400',
      glowColor: 'orange',
      iconSvg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" /></svg>,
      href: '/services/ppc',
    },
    {
      title: 'Social Media',
      description: 'Build brand trust and audience engagement on Instagram, Facebook, and YouTube. We create scroll-stopping content — reels, stories, and campaigns that drive real enquiries.',
      tags: ['Reels & Content', 'Community Building', 'Influencer Tie-ups', 'Paid Social', 'Brand Storytelling'],
      bg: 'bg-gradient-to-br from-[#2e0a1a] to-[#4e1b2d]',
      iconGradient: 'from-pink-400 via-rose-400 to-red-400',
      glowColor: 'pink',
      iconSvg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" /></svg>,
      href: '/services/social-media',
    },
    {
      title: 'Websites & Landing Pages',
      description: 'High-converting websites and lead-capture landing pages built for speed and results. From interactive showcases to integrated CRM forms — designed to turn visitors into customers.',
      tags: ['Custom Websites', 'Landing Pages', 'CRM Integration', 'Speed Optimized', 'Conversion Design'],
      bg: 'bg-gradient-to-br from-[#0a1a2e] to-[#1b2d4e]',
      iconGradient: 'from-blue-400 via-cyan-400 to-teal-400',
      glowColor: 'blue',
      iconSvg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" /></svg>,
      href: '/services/web-development',
    },
    {
      title: 'Branding & Positioning',
      description: 'Craft a brand identity that commands premium perception. From logo systems and naming to launch collaterals — we position you as the undisputed leader in your market.',
      tags: ['Brand Identity', 'Visual Systems', 'Launch Collaterals', 'Pitch Decks', 'Naming Strategy'],
      bg: 'bg-gradient-to-br from-[#1a0a20] to-[#3d1b4e]',
      iconGradient: 'from-fuchsia-400 via-purple-400 to-violet-400',
      glowColor: 'fuchsia',
      iconSvg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" /></svg>,
      href: '/services/branding',
    },
    {
      title: 'Search Engine Optimisation',
      description: 'Dominate search results with hyper-targeted SEO. We build organic pipelines that deliver consistent, high-intent traffic to your pages — month after month, without paying per click.',
      tags: ['Local SEO', 'Keyword Strategy', 'Google My Business', 'Technical SEO', 'Content Strategy'],
      bg: 'bg-gradient-to-br from-[#1a0a2e] to-[#2d1b4e]',
      iconGradient: 'from-purple-400 via-fuchsia-400 to-pink-400',
      glowColor: 'purple',
      iconSvg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>,
      href: '/services/seo',
    },
    {
      title: 'Video Production',
      description: 'Cinematic video content that tells your brand story — real estate walkthroughs, corporate brand films, social media reels, drone aerials, and post-production excellence.',
      tags: ['Brand Films', 'Property Walkthroughs', 'Drone Shoots', 'Reels & Shorts', 'Motion Graphics'],
      bg: 'bg-gradient-to-br from-[#2e0a0a] to-[#4e1b1b]',
      iconGradient: 'from-red-400 via-orange-400 to-amber-400',
      glowColor: 'orange',
      iconSvg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>,
      href: '/services/video-production',
    },
  ];

  return (
    <section id="services" className="relative py-24 md:py-32 overflow-visible min-h-screen">
      {/* Section Header */}
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-6 mb-16"
      >
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-bold uppercase tracking-widest mb-6">
              What We Do
            </span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold font-heading leading-[1.05] tracking-tight">
              <span className="text-gray-500">Turning</span><br />
              <span className="text-gradient-metallic">projects into</span> <span className="text-gradient-primary">sold-out</span>
            </h2>
          </div>
          <AnimatedButton href="/contact" variant="outline">
            Our services
          </AnimatedButton>
        </div>
      </motion.div>

      {/* Stacking Cards Container */}
      <div className="max-w-7xl mx-auto px-6 relative z-0">
        {servicesData.map((service, index) => (
          <ServiceCard
            key={index}
            index={index}
            totalCards={servicesData.length}
            {...service}
          />
        ))}
      </div>
    </section>
  );
}

// ════════ SHAPE DIVIDER ════════
function ShapeDivider() {
  return (
    <div className="relative h-24 md:h-32 w-full overflow-hidden bg-black -mt-16 md:-mt-24 pointer-events-none z-20">
      <svg className="absolute bottom-0 left-0 w-[200%] md:w-full h-full fill-black" viewBox="0 0 1000 100" preserveAspectRatio="none">
        <path d="M0,0 c200,80 400,20 600,80 s400,0 400,0 V100 H0 Z" />
      </svg>
    </div>
  );
}

// ════════ STATS ════════
function StatsSection() {
  const stats = [
    { value: 500, suffix: '+', label: 'Projects Marketed', color: 'from-purple-500/20 to-transparent' },
    { value: 150, suffix: '+', label: 'Builder Partners', color: 'from-pink-500/20 to-transparent' },
    { value: 10, suffix: '+', label: 'Years in Real Estate', color: 'from-orange-500/20 to-transparent' },
    { value: 98, suffix: '%', label: 'Client Retention', color: 'from-blue-500/20 to-transparent' },
  ];

  return (
    <section id="stats-section" className="relative py-28 px-6 z-10 overflow-visible bg-black">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(128,90,213,0.05),transparent_70%)] pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

      <div className="max-w-7xl mx-auto relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 relative z-10">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className={`relative p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 overflow-hidden group hover:bg-white/[0.04] transition-all duration-500 ${i % 2 === 1 ? 'md:translate-y-8' : ''}`}
            >
              {/* Inner Glow */}
              <div className={`absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br ${stat.color} blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700`}></div>

              <StatItem stat={stat} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatItem({ stat }: { stat: { value: number; suffix: string; label: string } }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let startTimestamp: number | null = null;
      const duration = 1500; // Reduced from 2500ms — less concurrent rAF time
      const finalValue = stat.value;

      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(easeProgress * finalValue));
        if (progress < 1) window.requestAnimationFrame(step);
      };
      window.requestAnimationFrame(step);
    }
  }, [isInView, stat.value]);

  return (
    <div ref={ref} className="relative z-10">
      <div className="text-4xl md:text-5xl lg:text-6xl font-black mb-3 bg-gradient-to-b from-white via-white to-white/40 bg-clip-text text-transparent tracking-tighter">
        <span>{count}</span><span className="text-gradient-primary">{stat.suffix}</span>
      </div>
      <div className="text-gray-400 font-bold text-[10px] uppercase tracking-[0.3em] ml-1">{stat.label}</div>
    </div>
  );
}

// ════════ ABOUT (EDITORIAL REDESIGN) ════════
function AboutSection() {
  const features = [
    { title: 'Lead Quality Over Volume', desc: 'We deliver sales-ready, high-intent buyer leads — not junk enquiries.' },
    { title: 'Real Estate DNA', desc: 'We understand launch cycles, inventory pressure, and buyer psychology.' },
    { title: 'Absolute Transparency', desc: 'Live dashboards, daily lead reports, and honest CPL metrics. You see everything.' },
    { title: 'Builder-Level Partnership', desc: 'Direct access to senior strategists who have marketed 500+ projects.' },
  ];

  return (
    <section id="about" className="relative py-28 md:py-40 px-6 z-10 bg-black overflow-hidden border-t border-white/5">
      {/* Theme Background Gradients */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-pink-500/10 blur-[120px] rounded-full mix-blend-screen pointer-events-none opacity-60" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-700/10 blur-[120px] rounded-full mix-blend-screen pointer-events-none opacity-60" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* Left Content - Editorial Vibe */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="order-2 lg:order-1 col-span-1 lg:col-span-6"
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="w-12 h-px bg-pink-500/50"></span>
              <span className="text-[10px] sm:text-[11px] font-black text-pink-400 uppercase tracking-[0.4em]">The RealVibe Standard</span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6 leading-[1.1] tracking-tight py-2">
              <span className="text-gradient-metallic inline-block pb-1">We Sell</span> <span className="text-gradient-primary italic inline-block pb-1 pr-2">Properties</span><br />
              <span className="text-gradient-metallic inline-block pb-1 mt-2">Not Just Clicks.</span>
            </h2>

            <div className="w-full h-px bg-white/5 mb-6" />

            <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-8 max-w-xl font-normal">
              For over a decade, we've been the growth engine behind India's top builders. We blend performance marketing with deep real estate insight — generating qualified leads that convert into site visits, bookings, and closed sales.
            </p>

            <div className="space-y-8">
              {features.map((item, i) => (
                <div key={i} className="group relative pl-6 border-l-[2px] border-white/5 hover:border-transparent transition-colors duration-500">
                  <div className="absolute -left-[2px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <h4 className="font-bold text-white text-base md:text-lg tracking-tight mb-1.5 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-gray-400 text-sm md:text-base leading-relaxed font-normal">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <Link href="/about" className="inline-flex items-center gap-3 text-[10px] font-bold text-pink-400 uppercase tracking-[0.2em] hover:text-pink-300 transition-colors group">
                Discover Our Approach
                <MoveRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
              </Link>
            </div>
          </motion.div>

          {/* Right Image - Authentic Focus */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="order-1 lg:order-2 col-span-1 lg:col-span-6 relative aspect-[3/4] md:aspect-[4/5] w-full rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/5"
          >
            <img 
              src="https://res.cloudinary.com/dd4dl6cu9/image/upload/WhatsApp_Image_2026-04-16_at_2.42.04_PM_1_r1iugs.jpg" 
              alt="RealVibe Production" 
              className="w-full h-full object-cover grayscale transition-all duration-1000 hover:grayscale-0 scale-105 hover:scale-100"
              loading="lazy" 
            />
            
            {/* Theme light leak for warmth */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 blur-[80px] pointer-events-none mix-blend-screen" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 blur-[80px] pointer-events-none mix-blend-screen" />
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}

// ════════ OUR APPROACH — 4-Step Process ════════
function OurApproachSection() {
  const steps = [
    {
      title: 'Market Intelligence',
      description: 'We analyze micro-market trends, competitor inventory, and buyer behavior to identify your project\'s winning edge.',
      icon: <Search className="w-8 h-8" />,
      iconColor: 'text-amber-400',
      gradient: 'from-amber-500 to-orange-500',
      glowColor: 'rgba(245,158,11,0.25)',
      bgGradient: 'from-amber-900/30 to-orange-900/20',
      borderColor: 'border-amber-500/30',
    },
    {
      title: 'Lead Engine Blueprint',
      description: 'We design high-converting project microsites and targeted sales funnels mapped to the buyer\'s journey.',
      icon: <Map className="w-8 h-8" />,
      iconColor: 'text-pink-400',
      gradient: 'from-pink-500 to-rose-500',
      glowColor: 'rgba(236,72,153,0.25)',
      bgGradient: 'from-pink-900/30 to-rose-900/20',
      borderColor: 'border-pink-500/30',
    },
    {
      title: 'Performance Launch',
      description: 'Aggressive multi-channel campaigns go live across Google & Meta, optimized daily for site-visit intent.',
      icon: <Zap className="w-8 h-8" />,
      iconColor: 'text-purple-400',
      gradient: 'from-purple-500 to-violet-500',
      glowColor: 'rgba(168,85,247,0.25)',
      bgGradient: 'from-purple-900/30 to-violet-900/20',
      borderColor: 'border-purple-500/30',
    },
    {
      title: 'Sales ROI Nurturing',
      description: 'We track every lead from enquiry to booking, refining the engine for the lowest cost-per-sale (CPS).',
      icon: <LineChart className="w-8 h-8" />,
      iconColor: 'text-blue-400',
      gradient: 'from-blue-500 to-indigo-500',
      glowColor: 'rgba(59,130,246,0.25)',
      bgGradient: 'from-blue-900/30 to-indigo-900/20',
      borderColor: 'border-blue-500/30',
    },
  ];

  return (
    <section id="our-approach" className="relative py-24 md:py-36 px-4 md:px-6 z-10 bg-black overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 md:mb-24"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-pink-500 shadow-[0_0_8px_rgba(236,72,153,0.8)]" />
            <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.3em] text-pink-400">How We Work</span>
            <div className="w-1.5 h-1.5 rounded-full bg-pink-500 shadow-[0_0_8px_rgba(236,72,153,0.8)]" />
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold font-heading tracking-tight leading-[1.05]">
            <span className="text-gradient-metallic">Our</span>{' '}
            <span className="text-gradient-primary">Approach</span>
          </h2>

        </motion.div>

        {/* Steps Grid */}
        <div className="relative">

          {/* Desktop Connector Line with Animated Arrows */}
          <div className="hidden lg:block absolute top-[72px] left-[10%] right-[10%] z-0">
            <div className="relative w-full h-[2px]">


              {/* Continuous Glowing Base Line */}
              <div className="absolute inset-0 h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent shadow-[0_0_8px_rgba(255,255,255,0.05)]" />

              {/* Traveling "Bullet-Arrow" Glow */}
              <motion.div
                animate={{ 
                  left: ['0%', '100%'],
                  opacity: [0, 1, 1, 0]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
                className="absolute top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center -ml-4 z-10"
              >
                {/* The Arrow Head */}
                <div className="relative">
                  <div className="absolute inset-0 bg-pink-500 blur-md opacity-60 scale-150 animate-pulse" />
                  <MoveRight className="w-5 h-5 text-white drop-shadow-[0_0_8px_rgba(236,72,153,1)]" />
                </div>
              </motion.div>


            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 relative z-10">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="group relative flex flex-col items-center text-center"
              >
                {/* Step Number Circle */}
                <div className="relative mb-6">

                  {/* White ring */}
                  <div className="relative w-[88px] h-[88px] rounded-full bg-black border-2 border-white/10 flex items-center justify-center group-hover:border-white/20 transition-colors duration-500">
                    {/* Inner gradient circle with Icon */}
                    <div className={`w-[68px] h-[68px] rounded-full bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-lg text-white`}>
                      {step.icon}
                    </div>
                  </div>
                  {/* Small connecting triangle arrow (below circle) */}
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-r-[8px] border-t-[10px] border-transparent border-t-white/20" />
                </div>

                {/* Card - Vertically Rectangular */}
                <div className={`relative w-full flex-1 min-h-[340px] md:min-h-[380px] rounded-[2rem] border ${step.borderColor} bg-gradient-to-b ${step.bgGradient} p-8 md:p-10 transition-all duration-500 group-hover:scale-[1.03] group-hover:shadow-2xl overflow-hidden flex flex-col items-center justify-center`}>




                  <h3 className="text-lg md:text-xl font-bold text-white mb-3 font-heading tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ════════ PORTFOLIO ════════
function PortfolioSection() {
  const [successStories, setSuccessStories] = useState<any[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await fetch('/api/admin/portfolio');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) setSuccessStories(data);
        }
      } catch (err) {
        console.error("Failed to load success stories", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStories();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const length = successStories.length > 0 ? successStories.length : 1;
      setActiveIndex((prev) => (prev + 1) % length);
    }, 6000);
    return () => clearInterval(timer);
  }, [successStories.length]);

  const fallbackStories = [
    {
      client_name: "Central Park",
      client_logo: "/assets/real-estate/CENTRAL-PARK-LOGO_Mother-Logo-scaled-e1762848235731-1015x1024.webp",
      title: "Qualified Leads for Bignonia",
      description: "Central Park transformed their luxury residential positioning. Our performance-led strategy delivered a surge in high-intent buyer engagement.",
      slug: "central-park",
      metrics: JSON.stringify([
        { label: "Increase in qualified leads", value: 37 },
        { label: "Rise in site visits", value: 25 }
      ])
    }
  ];

  const currentStories = successStories.length > 0 ? successStories : fallbackStories;
  const activeStory = currentStories[activeIndex];

  const [wallImages, setWallImages] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/admin/portfolio-wall')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setWallImages(data);
      })
      .catch(err => console.error("Failed to load wall images", err));
  }, []);

  const placeholderImages = [
    '/assets/real-estate/portfolio-1.webp',
    '/assets/real-estate/portfolio-2.webp',
    '/assets/real-estate/portfolio-3.webp',
    '/assets/real-estate/portfolio-1.webp',
    '/assets/real-estate/portfolio-2.webp',
    '/assets/real-estate/portfolio-3.webp',
  ];

  const displayImages = wallImages.length > 0 ? wallImages.map(img => img.image_url) : placeholderImages;
  
  // Helper to ensure column has enough items for a dense look
  const fillColumn = (arr: string[], min: number) => {
    if (arr.length === 0) return [];
    let result = [...arr];
    while (result.length < min) result = [...result, ...arr];
    return result;
  };

  // Split and Fill
  const col1 = fillColumn(displayImages.filter((_, i) => i % 3 === 0), 6);
  const col2 = fillColumn(displayImages.filter((_, i) => i % 3 === 1), 6);
  const col3 = fillColumn(displayImages.filter((_, i) => i % 3 === 2), 6);

  return (
    <section id="portfolio" className="relative py-24 md:py-32 px-4 md:px-6 z-10 w-full overflow-hidden bg-[#0F0F0F]">
      {/* Background Stylistic Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-[-10%] w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-pink-600/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 md:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-7xl font-bold font-heading tracking-tighter"
          >
            <span className="text-gradient-metallic">Unlocking</span> <span className="text-gradient-primary">Success Stories</span>
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 items-center">
          {/* Left Side: Active Story & Metrics */}
          <div className="relative z-20 space-y-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="space-y-8"
              >
                {/* Active Client Logo Container */}
                <div className="flex items-center justify-between gap-6 flex-wrap md:flex-nowrap">
                  <div className="h-16 md:h-20 px-8 py-4 bg-zinc-900/40 backdrop-blur-xl rounded-2xl flex items-center justify-center group/logo relative overflow-hidden border border-white/10 shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover/logo:opacity-100 transition-opacity" />
                    <img
                      src={activeStory.client_logo}
                      alt={activeStory.client_name}
                      className="max-w-[140px] max-h-full object-contain transition-transform duration-500 group-hover/logo:scale-105 filter drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]"
                    />
                  </div>
                  <Link 
                    href={`/case-studies/${activeStory.slug}`}
                    className="px-6 py-3 bg-pink-500 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl hover:bg-white hover:text-black transition-all duration-300 shadow-xl shadow-pink-500/20 flex items-center gap-3 group"
                  >
                    View Case Study
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                    {activeStory.title}
                  </h3>
                  <p className="text-gray-400 text-base md:text-lg leading-relaxed italic border-l-2 border-pink-500/30 pl-6">
                    "{activeStory.description}"
                  </p>
                </div>

                {/* Big Metrics */}
                <div className="grid grid-cols-2 gap-8 pt-4">
                  {(() => {
                    let parsedMetrics = [];
                    try {
                      parsedMetrics = typeof activeStory.metrics === 'string' 
                        ? JSON.parse(activeStory.metrics) 
                        : (activeStory.metrics || []);
                    } catch (e) {
                      console.error("Failed to parse metrics", e);
                    }
                    return Array.isArray(parsedMetrics) ? parsedMetrics.map((metric: any, idx: number) => (
                      <div key={idx} className="group">
                        <div className="text-4xl md:text-5xl font-black text-white group-hover:text-pink-500 transition-colors duration-300">
                          +{metric.value}%
                        </div>
                        <div className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mt-2 group-hover:text-gray-400 transition-colors leading-tight">
                          {metric.label}
                        </div>
                      </div>
                    )) : null;
                  })()}
                </div>

                {/* Client Logo Strip (Highlights) */}
                <div className="pt-8 border-t border-white/5">
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">Trusted By Industry Leaders</p>
                  <div className="flex flex-wrap gap-4 opacity-70 hover:opacity-100 transition-opacity">
                    {currentStories.map((s, i) => (
                      <div key={i} className={`h-10 px-4 py-2 bg-zinc-900/60 backdrop-blur-md rounded-xl flex items-center justify-center transition-all duration-300 border border-white/5 ${i === activeIndex ? 'ring-2 ring-pink-500 opacity-100 scale-110 bg-zinc-800/80' : 'grayscale opacity-40 hover:opacity-100 hover:grayscale-0'}`}>
                        <img src={s.client_logo} className="h-full object-contain" alt={s.client_name} />
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Side: The Wall of Fame Vertical Scrolling Masonry */}
          <div className="relative h-[450px] md:h-[750px] w-full perspective-[1200px] mt-12 lg:mt-0 overflow-hidden rounded-[2rem]">
            {/* Expanded Transparency Gradient Overlay */}
            <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-[#0F0F0F] via-transparent via-transparent to-[#0F0F0F] [gradient-stops:0%,15%,85%,100%] opacity-100" 
                 style={{ background: 'linear-gradient(to bottom, #0F0F0F 0%, transparent 15%, transparent 85%, #0F0F0F 100%)' }} />
            <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-[#0F0F0F] via-transparent via-transparent to-[#0F0F0F] lg:hidden"
                 style={{ background: 'linear-gradient(to right, #0F0F0F 0%, transparent 10%, transparent 90%, #0F0F0F 100%)' }} />
            
            <motion.div 
              style={{ rotateY: -8, rotateX: 2 }}
              className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 h-full w-full origin-center"
            >
              {/* Column 1 - Down */}
              <div className="relative h-full overflow-hidden">
                <motion.div 
                  animate={{ y: ["0%", "-50%"] }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  className="flex flex-col gap-4"
                >
                  {col1.map((url, i) => (
                    <div key={i} className={`w-full rounded-2xl overflow-hidden bg-zinc-900 border border-white/5 shadow-2xl ${i % 2 === 0 ? 'h-64' : 'h-48'}`}>
                      <img src={url} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" alt="Portfolio" />
                    </div>
                  ))}
                  {/* Duplicate for seamless loop */}
                  {col1.map((url, i) => (
                    <div key={`d1-${i}`} className={`w-full rounded-2xl overflow-hidden bg-zinc-900 border border-white/5 shadow-2xl ${i % 2 === 0 ? 'h-64' : 'h-48'}`}>
                      <img src={url} className="w-full h-full object-cover opacity-60" alt="Portfolio" />
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Column 2 - Up */}
              <div className="relative h-full overflow-hidden pt-12">
                <motion.div 
                  animate={{ y: ["-50%", "0%"] }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="flex flex-col gap-4"
                >
                  {col2.map((url, i) => (
                    <div key={i} className={`w-full rounded-2xl overflow-hidden bg-zinc-900 border border-white/5 shadow-2xl ${i % 3 === 0 ? 'h-80' : 'h-56'}`}>
                      <img src={url} className="w-full h-full object-cover opacity-60" alt="Portfolio" />
                    </div>
                  ))}
                  {/* Duplicate */}
                  {col2.map((url, i) => (
                    <div key={`d2-${i}`} className={`w-full rounded-2xl overflow-hidden bg-zinc-900 border border-white/5 shadow-2xl ${i % 3 === 0 ? 'h-80' : 'h-56'}`}>
                      <img src={url} className="w-full h-full object-cover opacity-60" alt="Portfolio" />
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Column 3 - Down (Hidden on mobile for better performance) */}
              <div className="relative h-full overflow-hidden hidden md:block">
                <motion.div 
                  animate={{ y: ["0%", "-50%"] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="flex flex-col gap-4"
                >
                  {col3.map((url, i) => (
                    <div key={i} className={`w-full rounded-2xl overflow-hidden bg-zinc-900 border border-white/5 shadow-2xl ${i % 2 !== 0 ? 'h-72' : 'h-44'}`}>
                      <img src={url} className="w-full h-full object-cover opacity-60" alt="Portfolio" />
                    </div>
                  ))}
                  {/* Duplicate */}
                  {col3.map((url, i) => (
                    <div key={`d3-${i}`} className={`w-full rounded-2xl overflow-hidden bg-zinc-900 border border-white/5 shadow-2xl ${i % 2 !== 0 ? 'h-72' : 'h-44'}`}>
                      <img src={url} className="w-full h-full object-cover opacity-60" alt="Portfolio" />
                    </div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}





// ════════ TESTIMONIALS ════════
function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch('/api/admin/testimonials');
        if (res.ok) {
          const data = await res.json();
          setTestimonials(data);
        }
      } catch (err) {
        console.error("Failed to load testimonials", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  return (
    <section id="testimonials" className="relative pt-24 pb-12 md:pt-40 md:pb-16 bg-black overflow-hidden z-10">
      {/* Large Decorative Glows — Hardware Accelerated */}
      <div className="gpu-layer absolute top-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
      <div className="gpu-layer absolute bottom-0 right-0 w-[500px] h-[500px] bg-pink-600/10 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-violet-900/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Top border gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Label */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-pink-500 shadow-[0_0_8px_rgba(236,72,153,0.8)]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-pink-400">Client Stories</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold font-heading leading-[0.9] tracking-tight uppercase">
              <span className="text-gray-500">Our Clients</span><br />
              <span className="text-gradient-metallic">Love</span> <span className="text-gradient-primary">Us</span>
            </h2>
            <div className="h-px w-32 bg-gradient-to-r from-pink-500 via-purple-500 to-transparent mt-6" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-right"
          >
            <p className="text-gray-400 text-sm md:text-base max-w-xs leading-relaxed font-light mb-4 text-left md:text-right">
              Real results, real relationships. Hear from the brands we've helped grow.
            </p>
            {/* Star rating display */}
            <div className="flex items-center gap-1 justify-start md:justify-end">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="text-xs text-gray-500 ml-2 font-medium">5.0 avg rating</span>
            </div>
          </motion.div>
        </div>

        {/* Cards */}
        <div className="relative -mx-4 md:-mx-6">
          {loading ? (
            <div className="flex px-6 gap-5 overflow-hidden">
              {[1, 2, 3].map(i => (
                <div key={i} className="min-w-[300px] h-[360px] bg-white/[0.03] rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : (
            <motion.div
              drag="x"
              dragConstraints={{ right: 0, left: -((testimonials.length * 400) - (typeof window !== 'undefined' ? window.innerWidth : 800) + 200) }}
              dragElastic={0.05}
              className="flex cursor-grab active:cursor-grabbing gap-4 md:gap-6 px-4 md:px-6 pb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              {testimonials.map((t, i) => (
                <motion.div
                  key={t.id || i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -6 }}
                  className="min-w-[85vw] md:min-w-[380px] group relative rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-7 md:p-9 flex flex-col justify-between overflow-hidden transition-all duration-500 hover:border-purple-500/30"
                >
                  {/* Card corner glow on hover */}
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-600/20 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                  <div>
                    {/* Top row: company initial + quote icon */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-white/10 flex items-center justify-center">
                        <span className="text-sm font-black text-white/70 uppercase">{t.company?.charAt(0) ?? "?"}</span>
                      </div>
                      {/* Vivid gradient quote mark */}
                      <svg className="w-8 h-8 flex-shrink-0" viewBox="0 0 24 24" fill="none">
                        <defs>
                          <linearGradient id={`qg-${i}`} x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.6" />
                            <stop offset="100%" stopColor="#ec4899" stopOpacity="0.6" />
                          </linearGradient>
                        </defs>
                        <path fill={`url(#qg-${i})`} d="M14.017 21v-3c0-1.105.895-2 2-2h3c.552 0 1-.448 1-1V9c0-.552-.448-1-1-1h-3c-.552 0-1 .448-1 1v3c0 .552-.448 1-1 1h-3v9h3zm-9 0v-3c0-1.105.895-2 2-2h3c.552 0 1-.448 1-1V9c0-.552-.448-1-1-1H7c-.552 0-1 .448-1 1v3c0 .552-.448 1-1 1H2v9h3z" />
                      </svg>
                    </div>

                    {/* Stars */}
                    <div className="flex gap-0.5 mb-4">
                      {[...Array(5)].map((_, si) => (
                        <svg key={si} className="w-3.5 h-3.5 text-yellow-400/80" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>

                    {/* Quote text */}
                    <p className="text-gray-300 text-sm md:text-base leading-relaxed font-light group-hover:text-white transition-colors duration-500">
                      &ldquo;{t.content.length > 140 ? t.content.substring(0, 140) + "..." : t.content}&rdquo;
                    </p>
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-3 mt-8 pt-6 border-t border-white/[0.06]">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500/30 to-pink-500/30 border border-white/10 flex items-center justify-center font-bold text-white/60 text-xs flex-shrink-0">
                      {t.author.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold text-white/90 text-sm truncate">{t.author}</div>
                      <div className="text-[10px] font-medium uppercase tracking-widest text-gray-500 mt-0.5 truncate">{t.role} · {t.company}</div>
                    </div>
                    <div className="ml-auto">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-pink-400" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

        {/* Drag hint */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex items-center justify-center mt-10 gap-3"
        >
          <div className="w-6 h-px bg-gradient-to-r from-transparent to-white/20" />
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/20">Drag to explore</span>
          <div className="w-6 h-px bg-gradient-to-l from-transparent to-white/20" />
        </motion.div>
      </div>
    </section>
  );
}

// ════════ DOUBLE SCROLL MARQUEE — GSAP ScrollTrigger ════════
function DoubleScrollMarquee() {
  const sectionRef = useRef<HTMLElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  const row1 = [
    { name: "UGC", icon: <Clapperboard className="w-3.5 h-3.5 md:w-4 md:h-4 text-purple-400" /> },
    { name: "Video Production", icon: <Video className="w-3.5 h-3.5 md:w-4 md:h-4 text-pink-400" /> },
    { name: "Social Media", icon: <Smartphone className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-400" /> },
    { name: "Website Development", icon: <Monitor className="w-3.5 h-3.5 md:w-4 md:h-4 text-cyan-400" /> },
    { name: "App Development", icon: <Rocket className="w-3.5 h-3.5 md:w-4 md:h-4 text-orange-400" /> },
    { name: "Google Ads", icon: <Target className="w-3.5 h-3.5 md:w-4 md:h-4 text-red-500" /> },
    { name: "Meta Ads", icon: <Megaphone className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-500" /> },
    { name: "Podcast", icon: <Mic className="w-3.5 h-3.5 md:w-4 md:h-4 text-emerald-400" /> },
  ];
  const row2 = [
    { name: "Brand Design", icon: <Palette className="w-3.5 h-3.5 md:w-4 md:h-4 text-fuchsia-400" /> },
    { name: "Strategy", icon: <Brain className="w-3.5 h-3.5 md:w-4 md:h-4 text-yellow-400" /> },
    { name: "SEO Optimization", icon: <TrendingUp className="w-3.5 h-3.5 md:w-4 md:h-4 text-green-400" /> },
    { name: "Content Creation", icon: <PenTool className="w-3.5 h-3.5 md:w-4 md:h-4 text-pink-300" /> },
    { name: "Analytics", icon: <BarChart3 className="w-3.5 h-3.5 md:w-4 md:h-4 text-indigo-400" /> },
    { name: "Email Marketing", icon: <Mail className="w-3.5 h-3.5 md:w-4 md:h-4 text-amber-400" /> },
    { name: "Automation", icon: <Settings className="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-300" /> },
    { name: "PR & Media", icon: <Newspaper className="w-3.5 h-3.5 md:w-4 md:h-4 text-teal-400" /> },
  ];

  useEffect(() => {
    let ctx: any;
    // Dynamically import GSAP to avoid SSR issues
    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      // Setup a ResizeObserver for bulletproof ScrollTrigger updates when async images/fonts shift DOM height
      let resizeObserver: ResizeObserver | null = null;
      if (typeof document !== 'undefined') {
        resizeObserver = new ResizeObserver(() => {
          ScrollTrigger.refresh();
        });
        resizeObserver.observe(document.body);
        (window as any).__gsapResizeObserver = resizeObserver;
      }

      ctx = gsap.context(() => {
        if (!sectionRef.current || !row1Ref.current || !row2Ref.current) return;

        // Row 1: moves LEFT on scroll (negative x)
        gsap.fromTo(
          row1Ref.current,
          { x: 0 },
          {
            x: "-30%",
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5, // smooth lag, like momentum
            },
          }
        );

        // Row 2: moves RIGHT on scroll (positive x)
        gsap.fromTo(
          row2Ref.current,
          { x: "-30%" },
          {
            x: "0%",
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
            },
          }
        );
      }, sectionRef);
    };

    init();
    return () => {
      ctx?.revert();
      // Disconnect observer on unmount to prevent memory leaks and ghost updates
      if (typeof window !== 'undefined' && (window as any).__gsapResizeObserver) {
        (window as any).__gsapResizeObserver.disconnect();
      }
    };
  }, []);

  const Pill = ({ item }: { item: { name: string; icon: React.ReactNode } }) => (
    <div className="flex-shrink-0 flex items-center gap-2.5 px-4 py-2.5 md:px-6 md:py-3 rounded-full border border-white/[0.08] bg-white/[0.03] mx-1.5 md:mx-2 hover:bg-white/[0.06] hover:border-white/[0.15] hover:scale-105 transition-all duration-300 cursor-default shadow-lg shadow-black/20">
      <div className="flex items-center justify-center bg-black/40 p-1.5 rounded-full border border-white/5">
        {item.icon}
      </div>
      <span className="text-[10px] md:text-sm font-heading font-semibold uppercase tracking-[0.18em] text-white/70 whitespace-nowrap pt-0.5">{item.name}</span>
    </div>
  );

  return (
    <section ref={sectionRef} className="relative py-10 md:py-16 bg-black overflow-hidden z-10 border-y border-white/5">
      {/* Side fade masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 md:w-48 z-10 bg-gradient-to-r from-black to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 md:w-48 z-10 bg-gradient-to-l from-black to-transparent" />

      <div className="space-y-3 md:space-y-5">
        {/* Row 1 — moves left on scroll */}
        <div className="overflow-hidden">
          <div ref={row1Ref} className="flex will-change-transform">
            {[...row1, ...row1, ...row1].map((item, i) => <Pill key={i} item={item} />)}
          </div>
        </div>
        {/* Row 2 — moves right on scroll */}
        <div className="overflow-hidden">
          <div ref={row2Ref} className="flex will-change-transform">
            {[...row2, ...row2, ...row2].map((item, i) => <Pill key={i} item={item} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

// ════════ CTA ════════
function CTASection() {
  return (
    <section id="cta-section" className="relative py-12 md:py-20 px-4 md:px-6 z-10 w-full overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ scale: 0.95, y: 30, opacity: 0 }}
          whileInView={{ scale: 1, y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative rounded-[1.5rem] md:rounded-[2rem] overflow-hidden"
        >
          <div className="absolute -inset-[1px] rounded-[1.5rem] md:rounded-[2rem] bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 opacity-40"></div>

          <div className="relative rounded-[1.5rem] md:rounded-[2rem] bg-black">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-pink-900/20 to-orange-900/30 rounded-[1.5rem] md:rounded-[2rem]"></div>
            
            {/* Animated Real Estate Skyline SVG */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <svg 
                viewBox="0 0 1000 200" 
                className="absolute bottom-0 w-full h-full text-white/20"
                preserveAspectRatio="none"
              >
                <motion.path
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  transition={{ 
                    duration: 4, 
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                  d="M0,200 L50,200 L50,120 L80,120 L80,160 L120,160 L120,80 L160,80 L160,140 L200,140 L200,40 L250,40 L250,110 L300,110 L300,70 L350,70 L350,150 L400,150 L400,20 L460,20 L460,130 L520,130 L520,90 L580,90 L580,160 L640,160 L640,50 L700,50 L700,120 L760,120 L760,80 L820,80 L820,150 L880,150 L880,30 L940,30 L940,140 L1000,140 L1000,200"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                />
                {/* Second layer with different timing and color */}
                <motion.path
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.5 }}
                  transition={{ 
                    duration: 5, 
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 1
                  }}
                  d="M0,200 L30,200 L30,150 L70,150 L70,100 L110,100 L110,130 L150,130 L150,60 L190,60 L190,170 L240,170 L240,90 L290,90 L290,140 L340,140 L340,40 L400,40 L400,120 L460,120 L460,70 L530,70 L530,150 L600,150 L600,20 L680,20 L680,100 L750,100 L750,160 L830,160 L830,50 L910,50 L910,130 L1000,130"
                  fill="none"
                  stroke="rgba(236, 72, 153, 0.4)"
                  strokeWidth="0.5"
                />
              </svg>
            </div>

            <div className="absolute inset-0 opacity-20 rounded-[1.5rem] md:rounded-[2rem]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.07) 1px, transparent 0)", backgroundSize: "32px 32px" }}></div>

            <div className="relative px-6 py-10 md:px-12 md:py-16 text-center">
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-white text-[10px] md:text-xs font-bold uppercase tracking-widest mb-6">
                Let's Work Together
              </span>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold font-heading mb-4 md:mb-5 leading-[1.1]">
                <span className="text-gradient-metallic">Ready to Sell</span><br />
                <span className="text-gradient-primary">Faster?</span>
              </h2>
              <p className="text-sm md:text-lg text-gray-300 max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed">
                Let's build a lead engine for your next project launch. From awareness to site visits — your sales pipeline starts here.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <AnimatedButton href="/contact" variant="primary">
                  Get Free Consultation
                </AnimatedButton>
                <AnimatedButton href="tel:+919718428801" variant="outline">
                  Call Us Now
                </AnimatedButton>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
