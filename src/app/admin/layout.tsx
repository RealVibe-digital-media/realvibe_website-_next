"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Users, MessageSquareQuote, LogOut, Image as ImageIcon, Briefcase, FileText, BookOpen } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        await fetch("/api/admin/logout", { method: "POST" });
        router.push("/admin/login");
        router.refresh();
    };

    const navItems = [
        { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
        { name: "Service Leads", href: "/admin/leads", icon: FileText },
        { name: "Blogs", href: "/admin/blog", icon: BookOpen },
        { name: "Client Logos", href: "/admin/clients", icon: Briefcase },
        { name: "Testimonials", href: "/admin/testimonials", icon: MessageSquareQuote },
        { name: "Team Members", href: "/admin/team", icon: Users },
        { name: "Work Culture", href: "/admin/culture", icon: ImageIcon },
    ];

    return (
        <div className="min-h-screen bg-black text-white flex">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/10 bg-black/50 p-6 flex flex-col hidden md:flex">
                <div className="mb-10">
                    <Link href="/admin" className="flex items-center gap-3">
                        <img src="/assets/logo.png" alt="RealVibe" className="h-8 w-auto" />
                        <span className="font-bold text-lg tracking-tight">Admin</span>
                    </Link>
                </div>

                <nav className="flex-1 space-y-2">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                                    ? "bg-purple-600/20 text-purple-400 font-semibold"
                                    : "text-gray-400 hover:text-white hover:bg-white/5"
                                    }`}
                            >
                                <Icon size={18} />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                <div className="mt-auto pt-6 border-t border-white/10">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 w-full text-left text-red-400 hover:bg-red-500/10 rounded-xl transition-colors"
                    >
                        <LogOut size={18} />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 h-screen overflow-y-auto bg-gradient-to-br from-black to-purple-950/10 relative">
                <div className="p-8 max-w-6xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
