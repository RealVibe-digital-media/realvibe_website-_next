"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AnimatedButton } from "./AnimatedButton";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  image_url: string;
  bio?: string;
  social_links?: any;
}

export const TeamSection = () => {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await fetch("/api/admin/team");
        if (res.ok) {
          const data = await res.json();
          setTeam(data);
        }
      } catch (err) {
        console.error("Failed to load team data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, []);

  if (loading || team.length === 0) return null;

  // Duplicate team for seamless loop
  const marqueeItems = [...team, ...team, ...team, ...team];

  return (
    <section className="relative py-12 md:py-20 bg-black overflow-hidden z-20">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-pink-600/10 blur-[120px] rounded-full" />
      </div>

      <div className="w-full">
        {/* Header Section - Slower, More Subtle Header */}
        <div className="max-w-[1400px] mx-auto px-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <h2 className="text-4xl md:text-6xl font-black text-white leading-[0.9] tracking-tighter uppercase">
              The <span className="text-gradient-primary">Core Team</span>
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="pb-1 scale-90 origin-left md:origin-right"
          >
            <AnimatedButton href="/team">
              Join Us
            </AnimatedButton>
          </motion.div>
        </div>

        {/* Infinite Marquee - Smoother & Slower */}
        <div className="relative flex overflow-hidden py-6">
          <div className="flex animate-marquee-slow whitespace-nowrap will-change-transform">
            {marqueeItems.map((member, idx) => (
              <div 
                key={`${member.id}-${idx}`} 
                className="inline-flex flex-col items-center mx-3 md:mx-5 w-[140px] md:w-[180px]"
              >
                <div className="relative w-full aspect-square rounded-[1.5rem] md:rounded-[2rem] overflow-hidden bg-white/[0.03] border border-white/5 group mb-4">
                  <img 
                    src={member.image_url} 
                    alt={member.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Subtle overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-40" />
                </div>
                <div className="text-center w-full">
                  <h3 className="text-sm md:text-lg font-bold text-white tracking-tight leading-tight">
                    {member.name}
                  </h3>
                  <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.15em] text-pink-500/80 mt-1">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Edge Fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-black via-black/80 to-transparent z-10" />
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-slow {
          display: flex;
          animation: marquee 80s linear infinite;
        }
        .animate-marquee-slow:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};
