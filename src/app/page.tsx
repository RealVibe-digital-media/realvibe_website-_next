"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ServiceCard } from "@/components/ServiceCard";
// Lenis removed — causes scroll jank in Chrome
import { MoveRight } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <PortfolioSection />
      <TestimonialsSection />
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
          setClients(data);
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

      {/* Tiny Box Particles (Static CSS representation of the reference) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] left-[15%] w-1 h-1 bg-white/20"></div>
        <div className="absolute top-[30%] left-[25%] w-1.5 h-1.5 bg-white/30"></div>
        <div className="absolute top-[15%] right-[20%] w-1 h-1 bg-white/20"></div>
        <div className="absolute top-[40%] right-[30%] w-2 h-2 bg-white/10"></div>
        <div className="absolute top-[60%] left-[10%] w-1.5 h-1.5 bg-white/20"></div>
        <div className="absolute top-[70%] left-[30%] w-1 h-1 bg-white/10"></div>
        <div className="absolute top-[50%] right-[15%] w-1 h-1 bg-white/30"></div>
        <div className="absolute top-[80%] right-[25%] w-1.5 h-1.5 bg-white/20"></div>
        <div className="absolute top-[45%] left-[45%] w-1 h-1 bg-white/40"></div>
        <div className="absolute top-[25%] left-[60%] w-1.5 h-1.5 bg-white/20"></div>
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
          Web Design Agency
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] font-medium tracking-tight leading-[1.1] mb-6 md:mb-8 text-white"
        >
          We Build <span className="text-gradient-primary">Brands</span>
          <br />
          That <span className="text-gradient-primary">Dominate</span> Digital
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
          <Link href="/contact" className="group relative px-8 py-4 rounded-full font-bold text-white overflow-hidden transition-all duration-500 hover:scale-[1.02] active:scale-95 hover:shadow-[0_0_40px_rgba(236,72,153,0.3)] tap-bounce">
            <span className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 transition-opacity duration-300"></span>
            <span className="absolute inset-0 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
            <span className="relative flex items-center gap-2">
              Start Your Project
              <MoveRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </Link>
          <Link href="#portfolio" className="px-8 py-4 rounded-full font-semibold border border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300 hover:scale-[1.03] active:scale-95 tap-bounce">
            View Our Work
          </Link>
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
                      <img src={client.logo_url} alt={client.name || "Client"} className="max-w-full max-h-full object-contain grayscale hover:grayscale-0 transition-all duration-300" loading="lazy" />
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
      techIcons: ['Google Ads', 'Meta', 'LinkedIn', 'Analytics', 'TikTok Ads'],
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
      techIcons: ['Instagram', 'Facebook', 'LinkedIn', 'Reels', 'Discord'],
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
      techIcons: ['Next.js', 'React', 'Node.js', 'Shopify', 'Tailwind'],
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
      techIcons: ['Figma', 'Adobe', 'Illustration', 'Canva', 'Motion'],
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
      techIcons: ['SEMRush', 'Ahrefs', 'Search Console', 'G-Analytics', 'PageSpeed'],
      bg: 'bg-gradient-to-br from-[#1a0a2e] to-[#2d1b4e]',
      iconGradient: 'from-purple-400 via-fuchsia-400 to-pink-400',
      glowColor: 'purple',
      iconSvg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>,
      href: '/services/seo',
    },
  ];

  return (
    <section id="services" className="relative z-10 pt-20 md:pt-32 pb-10 md:pb-16">
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
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05]">
              <span className="text-gray-500">Transforming</span><br />
              <span className="text-white">ideas into </span><span className="text-gradient-primary">reality</span>
            </h2>
          </div>
          <Link href="/contact" className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white font-semibold hover:bg-white/10 hover:border-white/30 transition-all duration-300">
            Our services
            <MoveRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </motion.div>

      {/* Stacking Cards Container */}
      <div className="max-w-7xl mx-auto px-6">
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

// ════════ STATS ════════
function StatsSection() {
  const stats = [
    { value: 500, suffix: '+', label: 'Projects Delivered' },
    { value: 150, suffix: '+', label: 'Happy Clients' },
    { value: 10, suffix: '+', label: 'Years Experience' },
    { value: 98, suffix: '%', label: 'Client Satisfaction' },
  ];

  return (
    <section id="stats-section" className="relative py-28 px-6 z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/20 to-black"></div>
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[1px] h-40 bg-gradient-to-b from-transparent via-purple-400/50 to-transparent"></div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-40 bg-gradient-to-b from-transparent via-pink-400/50 to-transparent"></div>

      <div className="max-w-7xl mx-auto relative">
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-16"></div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-white/[0.06]">
          {stats.map((stat, i) => (
            <StatItem key={i} stat={stat} />
          ))}
        </div>

        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mt-16"></div>
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
      const duration = 2000;
      const finalValue = stat.value;

      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);

        // easeOutQuart easing
        const easeProgress = 1 - Math.pow(1 - progress, 4);

        setCount(Math.floor(easeProgress * finalValue));

        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };

      window.requestAnimationFrame(step);
    }
  }, [isInView, stat.value]);

  return (
    <div ref={ref} className="text-center px-4 py-6 group">
      <div className="text-5xl md:text-7xl lg:text-8xl font-black mb-3 bg-gradient-to-b from-white via-white to-white/40 bg-clip-text text-transparent tracking-tighter">
        <span>{count}</span><span className="text-gradient-primary">{stat.suffix}</span>
      </div>
      <div className="text-gray-400 font-semibold text-xs md:text-sm uppercase tracking-[0.2em]">{stat.label}</div>
    </div>
  );
}

// ════════ ABOUT ════════
function AboutSection() {
  const features = [
    { title: 'Data-Driven', desc: 'Real-time analytics & market insights.' },
    { title: 'Creative Excellence', desc: 'Award-winning standout campaigns.' },
    { title: 'Transparent Reports', desc: 'Monthly performance dashboards.' },
    { title: 'Dedicated Team', desc: 'Personal account manager for you.' },
  ];

  return (
    <section id="about" className="relative py-16 md:py-32 px-4 md:px-6 z-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Stacked Images */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="lg:col-span-5 relative"
          >
            <div className="relative">
              <div className="relative rounded-[1.5rem] md:rounded-[2rem] overflow-hidden aspect-[3/4] shadow-2xl shadow-purple-900/20">
                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=1000&fit=crop" alt="Team at work" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-purple-900/20"></div>
              </div>
              <div className="absolute -bottom-4 -right-4 md:-bottom-8 md:-right-8 w-32 h-32 md:w-56 md:h-56 rounded-2xl overflow-hidden border-4 border-black shadow-2xl">
                <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=400&fit=crop" alt="Team brainstorming" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -top-4 -left-4 bg-gradient-to-br from-purple-600 to-pink-500 rounded-2xl p-5 shadow-2xl shadow-purple-500/30">
                <div className="text-3xl font-black text-white leading-none">10+</div>
                <div className="text-[11px] text-white/80 font-bold uppercase tracking-wider mt-1">Years</div>
              </div>
              <div className="absolute -z-10 -top-12 -right-12 w-40 h-40 rounded-full border border-purple-500/10"></div>
              <div className="absolute -z-10 -bottom-16 -left-16 w-60 h-60 rounded-full border border-pink-500/10"></div>
            </div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.9, delay: 0.1, ease: "easeOut" }}
            className="lg:col-span-7 lg:pl-8"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-300 text-xs font-bold uppercase tracking-widest mb-6">
              Why RealVibe
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mb-6 md:mb-8 leading-[1.1] text-white">
              We Don't Just<br />
              Market. <span className="text-gradient-primary">We Transform.</span>
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-12 max-w-xl">
              We combine creative storytelling with data-driven precision to build brands that
              don't just survive — they thrive. Every strategy is backed by analytics, fueled
              by creativity, and measured by results.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((item, i) => (
                <div key={i} className="group flex gap-4 p-4 rounded-xl hover:bg-white/[0.03] transition-all duration-300">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-white/[0.06] flex items-center justify-center text-sm font-black text-purple-300 group-hover:border-purple-500/30 transition-colors">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1 text-[15px]">{item.title}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
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

// ════════ PORTFOLIO ════════
function PortfolioSection() {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Social Media', 'Branding', 'SEO', 'PPC'];

  const portfolioItems = [
    { title: 'Luxury Real Estate Campaign', category: 'Social Media', image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop' },
    { title: 'E-Commerce Brand Launch', category: 'Branding', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop' },
    { title: 'SaaS Growth Strategy', category: 'SEO', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop' },
    { title: 'Restaurant Chain Rebrand', category: 'Branding', image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop' },
    { title: 'Fitness App Campaign', category: 'PPC', image: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=600&h=400&fit=crop' },
    { title: 'Tech Startup Social Launch', category: 'Social Media', image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop' },
  ];

  const filteredItems = filter === 'All' ? portfolioItems : portfolioItems.filter(item => item.category === filter);

  return (
    <section id="portfolio" className="relative py-16 md:py-32 px-4 md:px-6 z-10 w-full overflow-hidden">

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 gap-6"
        >
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-bold uppercase tracking-widest mb-6">
              Portfolio
            </span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05]">
              Featured<br />
              <span className="text-gradient-primary">Projects</span>
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${filter === cat ? 'bg-white text-black shadow-lg' : 'bg-white/[0.05] text-gray-300 hover:bg-white/10 border border-white/10 hover:border-white/20'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 auto-rows-[280px]">
          {filteredItems.map((item, i) => {
            let spanClass = '';
            if (i === 0) spanClass = 'lg:col-span-7 lg:row-span-2';
            else if (i === 1 || i === 2) spanClass = 'lg:col-span-5';
            else spanClass = 'lg:col-span-4';

            return (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                key={item.title}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer ${spanClass}`}
              >
                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute inset-0 p-6 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="inline-block px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold text-white border border-white/10">
                      {item.category}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all duration-500 border border-white/10">
                      <MoveRight className="w-5 h-5 text-white -rotate-45" />
                    </div>
                  </div>
                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-xl md:text-2xl font-black text-white mb-1">{item.title}</h3>
                    <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">View project details &rarr;</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="text-center mt-14">
          <Link href="/clients" className="group inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-white bg-white/[0.05] border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-[1.03]">
            View Full Client Portfolio
            <MoveRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ════════ TESTIMONIALS ════════
function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
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

  useEffect(() => {
    if (testimonials.length === 0) return;
    const timer = setInterval(() => {
      setActiveIndex((prev: number) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <section id="testimonials-section" className="relative py-16 md:py-32 px-4 md:px-6 z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/10 to-transparent"></div>

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-300 text-xs font-bold uppercase tracking-widest mb-6">
            Client Love
          </span>
          <h2 className="text-3xl md:text-6xl lg:text-7xl font-black text-white">
            Words That<br />
            <span className="text-gradient-primary">Inspire Us</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full flex justify-center py-10 opacity-50">
              <div className="animate-pulse flex space-x-4">
                <div className="rounded-full bg-slate-700 h-10 w-10"></div>
                <div className="flex-1 space-y-6 py-1">
                  <div className="h-2 bg-slate-700 rounded"></div>
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                      <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                    </div>
                    <div className="h-2 bg-slate-700 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          ) : testimonials.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center p-20 text-center border lg:mx-auto lg:w-3/4 border-white/5 rounded-2xl bg-white/[0.02]">
              <h3 className="text-lg font-medium text-white mb-2">More Testimonials Coming Soon</h3>
              <p className="text-gray-400 text-sm">Our clients are writing amazing things about us.</p>
            </div>
          ) : testimonials.map((t, i) => (
            <div
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`group relative rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 cursor-pointer ${i === activeIndex ? 'ring-1 ring-purple-500/30' : ''}`}
            >
              <div className="relative bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-2xl p-8 h-full flex flex-col group-hover:bg-white/[0.06] group-hover:border-white/[0.12] transition-all duration-500">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, s) => (
                    <svg key={s} className="w-4 h-4 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-200 leading-relaxed flex-1 mb-8 text-[15px]">
                  "{t.content}"
                </p>
                <div className="flex items-center gap-4 pt-6 border-t border-white/[0.06]">
                  {t.image_url ? (
                    <img src={t.image_url} alt={t.author} className="w-12 h-12 rounded-full object-cover bg-gray-800 shadow-lg shadow-purple-500/20" />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center font-bold text-white text-sm shadow-lg shadow-purple-500/20">
                      {t.author.charAt(0)}
                    </div>
                  )}
                  <div>
                    <div className="font-bold text-white text-sm">{t.author}</div>
                    <div className="text-xs text-gray-400">{t.role} @ {t.company}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ════════ CTA ════════
function CTASection() {
  return (
    <section id="cta-section" className="relative py-16 md:py-32 px-4 md:px-6 z-10 w-full overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ scale: 0.92, y: 40, opacity: 0 }}
          whileInView={{ scale: 1, y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative rounded-[2rem] overflow-hidden"
        >
          <div className="absolute -inset-[1px] rounded-[2rem] bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 opacity-30"></div>

          <div className="relative rounded-[2rem] bg-black">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-pink-900/20 to-orange-900/30 rounded-[2rem]"></div>
            <div className="absolute inset-0 opacity-20 rounded-[2rem]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.07) 1px, transparent 0)", backgroundSize: "32px 32px" }}></div>

            <div className="relative px-6 py-14 md:px-16 md:py-28 text-center">
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-white text-xs font-bold uppercase tracking-widest mb-8">
                Let's Work Together
              </span>
              <h2 className="text-3xl md:text-6xl lg:text-7xl font-black mb-4 md:mb-6 text-white leading-[1.1]">
                Ready to Go<br />
                <span className="text-gradient-primary">Viral?</span>
              </h2>
              <p className="text-base md:text-xl text-gray-300 max-w-2xl mx-auto mb-8 md:mb-12 leading-relaxed">
                Let's craft a digital strategy that puts your brand ahead of the competition. Your growth story starts here.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/contact" className="group px-10 py-5 rounded-full font-bold bg-white text-black hover:bg-gray-100 transition-all duration-300 hover:scale-[1.03] active:scale-95 hover:shadow-2xl hover:shadow-white/20 flex items-center gap-3 text-base md:text-lg tap-bounce">
                  Get Free Consultation
                  <MoveRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a href="tel:+919999999999" className="px-10 py-5 rounded-full font-bold border border-white/20 text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300 hover:scale-[1.03] active:scale-95 text-base md:text-lg tap-bounce">
                  Call Us Now
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
