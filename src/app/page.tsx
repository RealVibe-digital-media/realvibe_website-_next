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
import { MoveRight, Play, CheckCircle2, Clapperboard, Video, Smartphone, Monitor, Rocket, Target, Megaphone, Mic, Palette, Brain, TrendingUp, PenTool, BarChart3, Mail, Settings, Newspaper } from "lucide-react";

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
            Digital marketing <span className="text-gradient-primary">Agency</span>
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
        {/* Badge */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="inline-block px-4 py-1.5 rounded-full border border-white/10 text-xs text-gray-400 uppercase tracking-widest mb-10 bg-white/[0.02]"
        >
          Digital Marketing Agency
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tighter leading-[1.1] mb-6 md:mb-8 font-heading overflow-visible"
        >
          <span className="text-gradient-metallic pr-[0.1em]">We Build</span> <span className="text-gradient-primary pr-[0.1em]">Brands</span>
          <br />
          <span className="text-gradient-metallic pr-[0.1em]">That</span> <span className="text-gradient-primary pr-[0.1em]">Dominate</span> <span className="text-gradient-metallic pr-[0.1em]">Digital</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="text-[15px] md:text-[17px] text-gray-400 max-w-xl mx-auto leading-relaxed mb-8 md:mb-12 px-2"
        >
          Transform ideas into impactful digital experiences that
          captivate your audience and fuel business growth.
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
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">They trusted us</span>
        </div>
        <div className="trusted-marquee-wrapper relative overflow-hidden">
          <div className="trusted-marquee flex items-center gap-8 md:gap-12 whitespace-nowrap w-max">
            {/* Repeat twice for continuous CSS marquee */}
            {[1, 2].map((loop) => (
              <div key={loop} className="flex gap-8 md:gap-12">
                {(!loading && clients.length > 0) ? (
                  clients.map((client, i) => (
                    <div key={`client-${loop}-${i}`} className="flex-shrink-0 w-20 md:w-32 h-10 md:h-12 flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity duration-300" title={client.name}>
                      <img src={client.logo_url} alt={client.name || "Client"} className="max-w-full max-h-full object-contain grayscale hover:grayscale-0 transition-all duration-300" loading="eager" />
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
      title: 'PPC & Performance Ads',
      description: 'Maximize ROI with precision-targeted campaigns across Google Ads, Meta Ads, and programmatic networks. Every rupee spent is optimized for maximum impact and measurable results.',
      tags: ['Google Ads', 'Meta Ads', 'Display Ads', 'Retargeting', 'Analytics'],

      bg: 'bg-gradient-to-br from-[#2e1a0a] to-[#4e2d1b]',
      iconGradient: 'from-orange-400 via-amber-400 to-yellow-400',
      glowColor: 'orange',
      iconSvg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" /></svg>,
      href: '/services/ppc',
    },
    {
      title: 'Social Media Marketing',
      description: 'Build engaged communities and viral brand presence across Instagram, Facebook, LinkedIn, and emerging platforms. We create scroll-stopping content that drives real engagement and conversions.',
      tags: ['Content Strategy', 'Reels & Stories', 'Community Management', 'Influencer Marketing', 'Paid Social'],

      bg: 'bg-gradient-to-br from-[#2e0a1a] to-[#4e1b2d]',
      iconGradient: 'from-pink-400 via-rose-400 to-red-400',
      glowColor: 'pink',
      iconSvg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" /></svg>,
      href: '/services/social-media',
    },
    {
      title: 'Web Development',
      description: 'Build blazing-fast, conversion-optimized websites and web applications with cutting-edge technology. From landing pages to full e-commerce platforms — we code experiences that convert.',
      tags: ['React/Next.js', 'E-Commerce', 'Landing Pages', 'UI/UX Design', 'Performance'],

      bg: 'bg-gradient-to-br from-[#0a1a2e] to-[#1b2d4e]',
      iconGradient: 'from-blue-400 via-cyan-400 to-teal-400',
      glowColor: 'blue',
      iconSvg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" /></svg>,
      href: '/services/web-development',
    },
    {
      title: 'Brand Strategy & Design',
      description: 'Define your brand DNA — from visual identity systems to positioning strategy. We craft compelling brand narratives that make your audience feel something and remember you forever.',
      tags: ['Brand Identity', 'Logo Design', 'Brand Guidelines', 'Pitch Decks', 'Graphic Design'],

      bg: 'bg-gradient-to-br from-[#1a0a20] to-[#3d1b4e]',
      iconGradient: 'from-fuchsia-400 via-purple-400 to-violet-400',
      glowColor: 'fuchsia',
      iconSvg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" /></svg>,
      href: '/services/branding',
    },
    {
      title: 'SEO & Search Marketing',
      description: 'Dominate search rankings with data-driven SEO strategies. We optimize every aspect of your online presence to deliver sustainable organic growth and qualified traffic that converts.',
      tags: ['SEO Audit', 'Keyword Strategy', 'Link Building', 'Local SEO', 'Technical SEO'],

      bg: 'bg-gradient-to-br from-[#1a0a2e] to-[#2d1b4e]',
      iconGradient: 'from-purple-400 via-fuchsia-400 to-pink-400',
      glowColor: 'purple',
      iconSvg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>,
      href: '/services/seo',
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
              Our Solutions
            </span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold font-heading leading-[1.05] tracking-tight">
              <span className="text-gray-500">Transforming</span><br />
              <span className="text-gradient-metallic">ideas into</span> <span className="text-gradient-primary">reality</span>
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
    { value: 500, suffix: '+', label: 'Projects Delivered', color: 'from-purple-500/20 to-transparent' },
    { value: 150, suffix: '+', label: 'Happy Clients', color: 'from-pink-500/20 to-transparent' },
    { value: 10, suffix: '+', label: 'Years Experience', color: 'from-orange-500/20 to-transparent' },
    { value: 98, suffix: '%', label: 'Satisfaction Rate', color: 'from-blue-500/20 to-transparent' },
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
    { title: 'Data-Driven Precision', desc: 'Decisions powered by real-time analytics, not guesswork.' },
    { title: 'Creative Authority', desc: 'Visual identities and narratives that command absolute market presence.' },
    { title: 'Absolute Transparency', desc: 'Open dashboards and honest communication. You see every rupee move.' },
    { title: 'Senior Partnership', desc: 'Direct collaboration with seasoned strategists invested in your growth.' },
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
              <span className="text-gradient-metallic inline-block pb-1">We Craft</span> <span className="text-gradient-primary italic inline-block pb-1 pr-2">Clarity</span><br />
              <span className="text-gradient-metallic inline-block pb-1 mt-2">in a World of Noise.</span>
            </h2>

            <div className="w-full h-px bg-white/5 mb-6" />

            <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-8 max-w-xl font-normal">
              For over a decade, we have refined the science of luxury brand positioning. We blend rigorous data analysis with deeply human storytelling—building campaigns that don't just generate leads, but command market authority.
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


// ════════ PORTFOLIO ════════
function PortfolioSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);

  const successStories = [
    {
      name: "Central Park",
      logo: "/assets/real-estate/CENTRAL-PARK-LOGO_Mother-Logo-scaled-e1762848235731-1015x1024.webp",
      val: 37,
      sub: "Qualified Leads for Bignonia",
      desc: "Central Park transformed their luxury residential positioning. Our performance-led strategy delivered a surge in high-intent buyer engagement.",
      metrics: [
        { label: "Increase in qualified leads", value: 37 },
        { label: "Rise in site visits", value: 25 }
      ]
    },
    {
      name: "Signature Global",
      logo: "/assets/real-estate/imgi_1_SG-GLOBAL-NEW-LOGO-1024x373.webp",
      val: 47,
      sub: "Sales-ready Inquiries for Park Extension 1",
      desc: "For Signature Global, we engineered a full-funnel lead engine that prioritized 'Ready-to-Buy' intent over volume.",
      metrics: [
        { label: "Sales-ready inquiries", value: 47 },
        { label: "Reduction in CPL", value: 40 }
      ]
    },
    {
      name: "Trevoc",
      logo: "/assets/real-estate/logo-2.webp",
      val: 33,
      sub: "High-intent Conversions for Royal Residences",
      desc: "Trevoc required ultra-premium targeting. Our data-mapped approach connected them with the top 1% of the ultra-HNW demographic.",
      metrics: [
        { label: "High-intent conversions", value: 33 },
        { label: "Ad recall lift", value: 28 }
      ]
    },
    {
      name: "Emaar",
      logo: "/assets/real-estate/8571fdf7-emaar-dxb-logo-en.svg",
      val: 31,
      sub: "Qualified Leads for Elva",
      desc: "Global leader Emaar partnered with us for the 'Elva' launch. Our localized intelligence mapping drove consistent sales momentum.",
      metrics: [
        { label: "Lower funnel efficiency", value: 31 },
        { label: "In-target audience reach", value: 55 }
      ]
    },
    {
      name: "Omaxe",
      logo: "/assets/real-estate/omaxe-logo-1.webp",
      val: 33,
      sub: "Sales-ready Inquiries for Chandni Chowk",
      desc: "Repositioning a heritage commercial hub like Chandni Chowk required surgical precision. Our system scaled inquiries across regional markets.",
      metrics: [
        { label: "Inquiry volume growth", value: 33 },
        { label: "Regional engagement", value: 42 }
      ]
    },
    {
      name: "Sobha",
      logo: "/assets/real-estate/sobha-logo-e1762941031469.webp",
      val: 37,
      sub: "High-intent Conversions for Orbis",
      desc: "Sobha's commitment to quality required a digital presence to match. We built a high-conversion pipeline that mirrored their architectural excellence.",
      metrics: [
        { label: "Conversion rate lift", value: 37 },
        { label: "Direct-to-sales leads", value: 18 }
      ]
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % successStories.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [successStories.length]);

  return (
    <section id="portfolio" className="relative py-24 md:py-32 px-4 md:px-6 z-10 w-full overflow-hidden bg-[#0F0F0F]">
      {/* Background Stylistic Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-[-10%] w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-pink-600/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-7xl font-bold font-heading tracking-tighter"
          >
            <span className="text-gradient-metallic">Unlocking</span> <span className="text-gradient-primary">Success Stories</span>
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-[1fr_3fr] gap-12 lg:gap-24 items-center mb-24">

          {/* Vertical Sidebar Navigation */}
          <div className="hidden lg:flex flex-col gap-10 relative border-r border-white/5 py-8">
            {/* Absolute moving bar */}
            <motion.div
              className="absolute right-0 w-[2px] bg-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.5)]"
              animate={{ top: `${(activeIndex / successStories.length) * 100}%`, height: `${100 / successStories.length}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />

            {successStories.map((story, i) => (
              <button
                key={story.name}
                onClick={() => setActiveIndex(i)}
                className={`group flex items-center justify-end pr-8 transition-all duration-500 ${activeIndex === i ? "opacity-100" : "opacity-30 hover:opacity-50"}`}
              >
                <img
                  src={story.logo}
                  alt={story.name}
                  className={`max-w-[120px] max-h-[40px] object-contain transition-transform duration-500 ${activeIndex === i ? "scale-110" : "scale-90"}`}
                />
              </button>
            ))}
          </div>

          {/* Main Content Area */}
          <div className="relative min-h-[500px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                className="grid md:grid-cols-[1fr_1.5fr] gap-12 items-center"
              >
                {/* Left Side: Logo & Story */}
                <div className="space-y-8 text-center md:text-left">
                  <div className="h-24 md:h-32 flex items-center justify-center md:justify-start">
                    <img
                      src={successStories[activeIndex].logo}
                      alt={successStories[activeIndex].name}
                      className="max-w-[200px] max-h-full object-contain filter drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                    />
                  </div>
                  <p className="text-gray-400 text-lg md:text-xl font-medium leading-relaxed italic max-w-xl">
                    "{successStories[activeIndex].desc}"
                  </p>

                  <AnimatedButton
                    href="https://real-vibe-s-portfolio.vercel.app/"
                    variant="primary"
                    className="mt-4"
                  >
                    Featured Work
                  </AnimatedButton>
                </div>

                {/* Right Side: Big Bold Metrics */}
                <div className="flex flex-col gap-16 py-8 px-4 md:px-16">
                  {successStories[activeIndex].metrics.map((metric, idx) => (
                    <div key={idx} className="flex flex-col items-center md:items-start group relative">
                      <div className="animate-text-shimmer text-5xl md:text-8xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-pink-500 transition-all">
                        +{metric.value}%
                      </div>
                      <div className="text-xs md:text-sm font-bold text-gray-500 uppercase tracking-[0.4em] mt-2 group-hover:text-pink-500 transition-colors leading-none">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
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
            <div className="absolute inset-0 opacity-20 rounded-[1.5rem] md:rounded-[2rem]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.07) 1px, transparent 0)", backgroundSize: "32px 32px" }}></div>

            <div className="relative px-6 py-10 md:px-12 md:py-16 text-center">
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-white text-[10px] md:text-xs font-bold uppercase tracking-widest mb-6">
                Let's Work Together
              </span>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold font-heading mb-4 md:mb-5 leading-[1.1]">
                <span className="text-gradient-metallic">Ready to Go</span><br />
                <span className="text-gradient-primary">Viral?</span>
              </h2>
              <p className="text-sm md:text-lg text-gray-300 max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed">
                Let's craft a digital strategy that puts your brand ahead of the competition. Your growth story starts here.
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
