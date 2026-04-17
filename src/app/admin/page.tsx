"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, MessageSquareQuote, MousePointerClick, TrendingUp, BookOpen, Loader2, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AdminDashboardPage() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/admin/stats")
            .then(res => res.json())
            .then(json => {
                setData(json);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const stats = [
        { label: "Service Leads", value: data?.leads || "0", icon: MousePointerClick, color: "text-blue-400", bg: "bg-blue-500/10" },
        { label: "Team Members", value: data?.team || "0", icon: Users, color: "text-purple-400", bg: "bg-purple-500/10" },
        { label: "Blog Articles", value: data?.blogs || "0", icon: BookOpen, color: "text-orange-400", bg: "bg-orange-500/10" },
        { label: "Total Testimonials", value: data?.testimonials || "0", icon: MessageSquareQuote, color: "text-cyan-400", bg: "bg-cyan-500/10" },
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold tracking-tight text-white">Dashboard Overview</h1>
                <p className="text-gray-400 mt-2">Welcome back to the RealVibe control panel.</p>
            </header>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 relative overflow-hidden group"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <p className="text-sm font-medium text-gray-400">{stat.label}</p>
                                    <h3 className="text-3xl font-black mt-2 text-white">{stat.value}</h3>
                                </div>
                                <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                                    <Icon size={20} />
                                </div>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-12">
                <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 group relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-xl font-bold mb-3 text-white">Manage Blog</h2>
                        <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                            Create SEO-optimized articles, update industry insights, and share company news.
                        </p>
                        <Link href="/admin/blog" className="inline-flex items-center gap-2 text-orange-400 font-bold text-xs uppercase tracking-widest hover:text-orange-300 transition-colors">
                            Launch Articles
                            <ArrowRight size={14} />
                        </Link>
                    </div>
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                        <BookOpen size={64} className="text-orange-500" />
                    </div>
                </div>

                <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 group relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-xl font-bold mb-3 text-white">Manage Team</h2>
                        <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                            Update profile images, roles, and descriptions for all team members.
                        </p>
                        <Link href="/admin/team" className="inline-flex items-center gap-2 text-purple-400 font-bold text-xs uppercase tracking-widest hover:text-purple-300 transition-colors">
                            Manage Profiles
                            <ArrowRight size={14} />
                        </Link>
                    </div>
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                        <Users size={64} className="text-purple-500" />
                    </div>
                </div>

                <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 group relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-xl font-bold mb-3 text-white">Testimonials</h2>
                        <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                            Showcase success stories and feedback from your satisfied clients.
                        </p>
                        <Link href="/admin/testimonials" className="inline-flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-widest hover:text-cyan-300 transition-colors">
                            View Feedback
                            <ArrowRight size={14} />
                        </Link>
                    </div>
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                        <MessageSquareQuote size={64} className="text-cyan-500" />
                    </div>
                </div>
            </div>
        </div>
    );
}
