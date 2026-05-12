"use client";

import { motion } from "framer-motion";
import { Calendar, User, ArrowLeft, Share2, Clock } from "lucide-react";
import Link from "next/link";

interface Blog {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image_url: string;
  author: string;
  created_at: string;
}

export default function BlogDetailClient({ blog }: { blog: Blog }) {
  // Calculate read time (approximate 250 words per min)
  const wordCount = blog.content.split(/\s+/).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 250));

  return (
    <>
      {/* Article Header */}
      <section className="relative pt-32 pb-16 px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10 pt-10">
          <Link href="/blog" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-12 text-sm font-bold uppercase tracking-widest group">
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            Back to Insights
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-7xl font-black font-heading leading-tight tracking-tighter mb-8">
              {blog.title}
            </h1>

            <div className="flex flex-wrap items-center gap-8 text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 border-y border-white/10 py-8">
              <div className="flex items-center gap-2">
                <Calendar size={14} className="text-orange-500" />
                {new Date(blog.created_at).toLocaleDateString("en-US", { month: 'long', day: 'numeric', year: 'numeric' })}
              </div>
              <div className="flex items-center gap-2">
                <User size={14} className="text-pink-500" />
                Post by {blog.author}
              </div>
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-cyan-500" />
                {readTime} Min Read
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      {blog.image_url && (
        <section className="px-6 pb-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="max-w-6xl mx-auto h-[400px] md:h-[650px] rounded-[3rem] overflow-hidden relative shadow-2xl shadow-purple-500/10"
          >
            <img 
              src={blog.image_url} 
              alt={blog.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </motion.div>
        </section>
      )}

      {/* Article Content */}
      <section className="px-6 pb-32">
        <div className="max-w-3xl mx-auto">
          {blog.excerpt && (
            <div className="text-2xl md:text-3xl font-bold leading-relaxed text-gray-200 mb-12 italic border-l-4 border-pink-500 pl-8">
              {blog.excerpt}
            </div>
          )}

          <div 
            className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed space-y-8 prose-headings:text-white prose-headings:font-black prose-headings:tracking-tighter prose-strong:text-white prose-a:text-pink-400 hover:prose-a:text-pink-300 transition-colors"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* Social Share Callout */}
          <div className="mt-24 pt-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-sm font-bold uppercase tracking-widest text-gray-400">
              Shared as a RealVibe Story
            </div>
            <div className="flex gap-4">
               <button className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 rounded-full text-xs font-bold uppercase tracking-widest border border-white/10 transition-all">
                 <Share2 size={14} />
                 Share Insight
               </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
