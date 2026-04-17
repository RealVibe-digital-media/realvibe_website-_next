"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AnimatedButton } from "./AnimatedButton";
import Link from "next/link";
import { Calendar, User, ArrowRight } from "lucide-react";

interface Blog {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  image_url: string;
  author: string;
  created_at: string;
}

export const BlogSection = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blogs?limit=3");
        if (res.ok) {
          const data = await res.json();
          setBlogs(data);
        }
      } catch (err) {
        console.error("Failed to load blogs", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading || blogs.length === 0) return null;

  return (
    <section className="relative py-24 bg-black overflow-hidden z-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-widest mb-4">
              Insights & Stories
            </span>
            <h2 className="text-4xl md:text-6xl font-bold font-heading text-white tracking-tight">
              Latest from <span className="text-gradient-primary">RealVibe</span>
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <AnimatedButton href="/blog" variant="outline">
              View All Insights
            </AnimatedButton>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((blog, i) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group flex flex-col h-full bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden hover:bg-white/[0.04] transition-all duration-500 hover:border-white/10"
            >
              <Link href={`/blog/${blog.slug}`} className="block aspect-[16/10] overflow-hidden relative">
                {blog.image_url ? (
                  <img 
                    src={blog.image_url} 
                    alt={blog.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-orange-500/20 to-pink-500/20 flex items-center justify-center">
                    <span className="text-white/20 font-black text-4xl uppercase opacity-20">Insights</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
              </Link>
              
              <div className="flex flex-col flex-1 p-8">
                <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-4">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={12} className="text-orange-500/80" />
                    {new Date(blog.created_at).toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-white/10" />
                  <span className="flex items-center gap-1.5">
                    <User size={12} className="text-pink-500/80" />
                    {blog.author}
                  </span>
                </div>
                
                <h3 className="text-xl md:text-2xl font-bold text-white mb-4 line-clamp-2 transition-colors group-hover:text-orange-300">
                  <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
                </h3>
                
                <p className="text-gray-400 text-sm leading-relaxed mb-8 line-clamp-3">
                  {blog.excerpt}
                </p>
                
                <Link 
                  href={`/blog/${blog.slug}`} 
                  className="mt-auto inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white hover:text-orange-400 transition-colors"
                >
                  Read Full Story
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
