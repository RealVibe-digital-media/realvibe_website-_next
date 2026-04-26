import { query } from "@/lib/db";
import { notFound } from "next/navigation";
import { ArrowLeft, Target, Lightbulb, CheckCircle2, TrendingUp } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

async function getCaseStudy(slug: string) {
  const results = await query("SELECT * FROM portfolio WHERE slug = ?", [slug]);
  return (results as any[])[0];
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  let study = null;
  try {
    study = await getCaseStudy(slug);
  } catch (error) {
    console.error("Error fetching case study:", error);
  }

  if (!study) {
    notFound();
  }

  const metrics = JSON.parse(study.metrics || "[]");

  return (
    <main className="min-h-screen bg-black text-white font-sans overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={study.image_url} alt={study.title} className="w-full h-full object-cover opacity-20 scale-110" />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <Link href="/#portfolio" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-12 transition-colors group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Success Stories
          </Link>

          <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-end">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <img src={study.client_logo} alt={study.client_name} className="h-12 w-12 object-contain bg-white/5 p-2 rounded-xl border border-white/10" />
                <span className="text-pink-500 font-bold uppercase tracking-[0.3em] text-xs">{study.client_name}</span>
              </div>
              <h1 className="text-5xl md:text-8xl font-black font-heading tracking-tighter leading-[0.9]">
                {study.title}
              </h1>
              <p className="text-xl md:text-2xl text-gray-400 max-w-2xl leading-relaxed">
                {study.description}
              </p>
            </div>

            {/* Hero Metrics */}
            <div className="flex flex-col gap-8 border-l border-white/10 pl-12 py-4">
              {metrics.map((m: any, i: number) => (
                <div key={i}>
                  <div className="text-5xl md:text-6xl font-black text-gradient-primary">+{m.value}%</div>
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-2">{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* The Story Grid */}
      <section className="py-20 md:py-32 border-y border-white/5 bg-zinc-950/30">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            
            {/* Challenge */}
            <div className="space-y-6 p-8 bg-white/[0.02] border border-white/5 rounded-[2.5rem] relative group overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
                <Target size={120} />
               </div>
               <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
                <Target size={24} />
               </div>
               <h3 className="text-2xl font-bold">The Challenge</h3>
               <p className="text-gray-400 leading-relaxed">{study.challenge}</p>
            </div>

            {/* Solution */}
            <div className="space-y-6 p-8 bg-white/[0.02] border border-white/5 rounded-[2.5rem] relative group overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
                <Lightbulb size={120} />
               </div>
               <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400 border border-purple-500/20">
                <Lightbulb size={24} />
               </div>
               <h3 className="text-2xl font-bold">The Vibe Solution</h3>
               <p className="text-gray-400 leading-relaxed">{study.solution}</p>
            </div>

            {/* Results */}
            <div className="space-y-6 p-8 bg-white/[0.02] border border-white/5 rounded-[2.5rem] relative group overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
                <TrendingUp size={120} />
               </div>
               <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-400 border border-green-500/20">
                <TrendingUp size={24} />
               </div>
               <h3 className="text-2xl font-bold">The Outcome</h3>
               <p className="text-gray-400 leading-relaxed">{study.results}</p>
            </div>

          </div>
        </div>
      </section>

      {/* Main Narrative */}
      <section className="py-24 md:py-40">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <div className="prose prose-invert prose-xl max-w-none prose-headings:font-black prose-headings:tracking-tighter prose-p:text-gray-400 prose-p:leading-relaxed prose-strong:text-white">
            {study.content.split('\n').map((para: string, i: number) => (
              para.trim() ? <p key={i}>{para}</p> : <br key={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="pb-32">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-white/10 rounded-[3rem] p-12 md:p-24 text-center space-y-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none relative z-10">
                    Want to achieve similar<br/><span className="text-gradient-primary">High-Performance Results?</span>
                </h2>
                <div className="flex justify-center relative z-10">
                    <Link href="/#contact" className="px-12 py-5 bg-white text-black font-black uppercase tracking-widest rounded-2xl hover:bg-pink-500 hover:text-white transition-all shadow-2xl">
                        Start Your Growth Journey
                    </Link>
                </div>
            </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
