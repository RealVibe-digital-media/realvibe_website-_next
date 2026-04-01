"use client";

import { motion } from "framer-motion";
import { Users, MessageSquareQuote, MousePointerClick, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function AdminDashboardPage() {
    const stats = [
        { label: "Total Testimonials", value: "0", icon: MessageSquareQuote, color: "text-blue-400", bg: "bg-blue-500/10" },
        { label: "Team Members", value: "0", icon: Users, color: "text-purple-400", bg: "bg-purple-500/10" },
        { label: "Active Campaigns", value: "3", icon: MousePointerClick, color: "text-pink-400", bg: "bg-pink-500/10" },
        { label: "Site Visitors (30d)", value: "12,450", icon: TrendingUp, color: "text-orange-400", bg: "bg-orange-500/10" },
    ];

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8">
                    <h2 className="text-xl font-bold mb-4">Manage Testimonials</h2>
                    <p className="text-gray-400 text-sm mb-6 max-w-sm">
                        Add new client quotes, update existing reviews, or manage images displayed in the Testimonial slider on the homepage.
                    </p>
                    <Link href="/admin/testimonials" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-white/10 hover:bg-white/20 transition-all border border-white/10">
                        Go to Testimonials
                        <MessageSquareQuote size={16} />
                    </Link>
                </div>

                <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8">
                    <h2 className="text-xl font-bold mb-4">Manage Team</h2>
                    <p className="text-gray-400 text-sm mb-6 max-w-sm">
                        Create, update, or remove profiles for RealVibe team members. Manage their roles, bios, and profile images.
                    </p>
                    <Link href="/admin/team" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-white/10 hover:bg-white/20 transition-all border border-white/10">
                        Go to Team
                        <Users size={16} />
                    </Link>
                </div>
            </div>
        </div>
    );
}
