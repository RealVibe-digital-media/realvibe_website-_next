"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Calendar, User, ArrowRight } from "lucide-react";
import Link from "next/link";

interface Blog {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  image_url: string;
  author: string;
  created_at: string;
}

export default function BlogListingPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blogs");
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

  return (
    <main className="bg-black min-h-screen text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-30 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-600/10 blur-[150px] rounded-full" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-pink-600/10 blur-[150px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-[0.3em] mb-6">
              Our Insights
            </span>
            <h1 className="text-5xl md:text-8xl font-black font-heading leading-none tracking-tighter mb-8">
              Stories & <br /> <span className="text-gradient-primary">Perspectives</span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
              Explore the latest trends, strategies, and case studies from the RealVibe team. We share our knowledge to help your brand evolve.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blogs Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="animate-pulse bg-white/5 h-[450px] rounded-[2.5rem]" />
              ))}
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-40">
              <h2 className="text-2xl font-bold opacity-50">No articles found yet.</h2>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {blogs.map((blog, i) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group flex flex-col h-full bg-white/[0.02] border border-white/5 rounded-[2.5rem] overflow-hidden hover:bg-white/[0.04] transition-all duration-500 hover:border-white/10"
                >
                  <Link href={`/blog/${blog.slug}`} className="block aspect-[16/10] overflow-hidden relative">
                    {blog.image_url ? (
                      <img 
                        src={blog.image_url} 
                        alt={blog.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-orange-500/20 to-pink-500/20 flex items-center justify-center" />
                    )}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                  </Link>
                  
                  <div className="flex flex-col flex-1 p-8 md:p-10">
                    <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-5">
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
                    
                    <h3 className="text-2xl font-bold text-white mb-5 line-clamp-2 transition-colors group-hover:text-orange-300">
                      <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
                    </h3>
                    
                    <p className="text-gray-400 text-sm leading-relaxed mb-10 line-clamp-3">
                      {blog.excerpt}
                    </p>
                    
                    <Link 
                      href={`/blog/${blog.slug}`} 
                      className="mt-auto inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.25em] text-white hover:text-orange-400 transition-colors"
                    >
                      Explore More
                      <ArrowRight size={14} className="transition-transform group-hover:translate-x-1.5" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
