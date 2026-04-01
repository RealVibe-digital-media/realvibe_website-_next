"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { useRouter } from "next/navigation";

export function RealEstateLeadForm({ 
    title = "Book Your Funnel Strategy Plan",
    variant = "dark",
    showTitle = true
}: { 
    title?: string;
    variant?: "light" | "dark";
    showTitle?: boolean;
}) {
    const router = useRouter();
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const isLight = variant === "light";

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('loading');
        
        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            service: 'real-estate',
            message: 'Real Estate Landing Page Lead',
            sourcePage: 'Real Estate Marketing Funnel'
        };

        try {
            const res = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (res.ok) {
                setStatus('success');
                // Auto-redirect to thank you page after 1.5 seconds
                setTimeout(() => {
                    router.push('/thank-you');
                }, 1500);
            } else {
                setStatus('error');
            }
        } catch (err) {
            setStatus('error');
        }
    };

    return (
        <div className={`relative p-8 md:p-10 rounded-[2.5rem] backdrop-blur-3xl overflow-hidden group transition-all duration-500 ${
            isLight 
            ? "bg-white/80 border border-gray-200 shadow-gray-200/50" 
            : "bg-transparent"
        }`}>
            {/* Background Glow - Subtle Specular */}
            <div className={`absolute -top-24 -right-24 w-48 h-48 blur-[80px] rounded-full transition-all duration-700 ${
                isLight ? "bg-purple-400/10 group-hover:bg-purple-400/20" : "bg-white/5 group-hover:bg-white/10"
            }`}></div>
            
            {showTitle && (
                <h3 className={`text-xl md:text-3xl font-black mb-10 relative z-10 tracking-tight ${isLight ? "text-gray-900" : "text-white"}`}>
                    Book Your <span className="relative">
                        Strategy Plan
                        <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></span>
                    </span>
                </h3>
            )}

            {status === 'success' ? (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-10"
                >
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${
                        isLight ? "bg-green-100 text-green-600" : "bg-white/5 text-green-400 shadow-[0_0_30px_rgba(34,197,94,0.1),inset_0_1px_1px_rgba(255,255,255,0.1)]"
                    }`}>
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <h4 className={`text-xl font-bold mb-2 ${isLight ? "text-gray-900" : "text-white"}`}>Strategy Plan Booked!</h4>
                    <p className={isLight ? "text-gray-500" : "text-gray-400"}>Our real estate experts will call you within 24 hours.</p>
                </motion.div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                    <div className="space-y-2">
                        <label className={`text-[10px] uppercase font-black tracking-[0.2em] ml-1 ${isLight ? "text-gray-400" : "text-white/30"}`}>Full Name</label>
                        <motion.input 
                            whileFocus={{ scale: 1.01 }}
                            type="text" 
                            name="name"
                            required
                            placeholder="e.g. John Doe"
                            className={`w-full px-6 py-4.5 rounded-2xl border transition-all duration-500 outline-none text-sm group ${
                                isLight 
                                ? "bg-white border-gray-200 text-gray-900 placeholder:text-gray-300 focus:border-purple-400 shadow-sm" 
                                : "bg-black/20 border-white/5 text-white placeholder:text-white/10 focus:border-white/20 focus:bg-black/40 shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]"
                            }`}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className={`text-[10px] uppercase font-black tracking-[0.2em] ml-1 ${isLight ? "text-gray-400" : "text-white/30"}`}>Official Email</label>
                        <motion.input 
                            whileFocus={{ scale: 1.01 }}
                            type="email" 
                            name="email"
                            required
                            placeholder="e.g. name@company.com"
                            className={`w-full px-6 py-4.5 rounded-2xl border transition-all duration-500 outline-none text-sm ${
                                isLight 
                                ? "bg-white border-gray-200 text-gray-900 placeholder:text-gray-300 focus:border-purple-400 shadow-sm" 
                                : "bg-black/20 border-white/5 text-white placeholder:text-white/10 focus:border-white/20 focus:bg-black/40 shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]"
                            }`}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className={`text-[10px] uppercase font-black tracking-[0.2em] ml-1 ${isLight ? "text-gray-400" : "text-white/30"}`}>Contact Number</label>
                        <motion.input 
                            whileFocus={{ scale: 1.01 }}
                            type="tel" 
                            name="phone"
                            required
                            placeholder="e.g. +91 98765 43210"
                            className={`w-full px-6 py-4.5 rounded-2xl border transition-all duration-500 outline-none text-sm ${
                                isLight 
                                ? "bg-white border-gray-200 text-gray-900 placeholder:text-gray-300 focus:border-purple-400 shadow-sm" 
                                : "bg-black/20 border-white/5 text-white placeholder:text-white/10 focus:border-white/20 focus:bg-black/40 shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]"
                            }`}
                        />
                    </div>
                    
                    <button 
                        disabled={status === 'loading'}
                        className="w-full relative px-8 py-5 rounded-xl font-black text-white text-xs uppercase tracking-[0.2em] transition-all duration-500 hover:scale-[1.02] active:scale-95 shadow-xl disabled:opacity-50 mt-4 overflow-hidden group"
                    >
                        <span className="absolute inset-0 bg-gradient-to-r from-[#BE185D] to-[#8B5CF6] group-hover:opacity-90 transition-opacity"></span>
                        <span className="relative flex items-center justify-center gap-3">
                            {status === 'loading' ? (
                                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v4m0 8v4m8-8h-4m-8 0H4" /></svg>
                                </motion.div>
                            ) : (
                                <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            )}
                            {status === 'loading' ? 'Securing Slot...' : 'Secure My Strategy Slot'}
                        </span>
                    </button>

                    <div className={`flex items-center justify-center gap-2 mt-4 text-[10px] font-medium opacity-40 ${isLight ? "text-gray-600" : "text-white"}`}>
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8z"/></svg>
                        100% Secure & Private. No Spam.
                    </div>
                    
                    {status === 'error' && (
                        <p className="text-red-500 text-[10px] text-center font-bold">Connection error. Please try again.</p>
                    )}
                </form>
            )}
        </div>
    );
}
