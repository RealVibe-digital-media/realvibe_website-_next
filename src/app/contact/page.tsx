"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
// Lenis removed — causes scroll jank in Chrome
import { motion } from "framer-motion";

export default function ContactPage() {
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setSuccessMessage("");
        setErrorMessage("");

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get("name"),
            mobile: formData.get("mobile"),
            service: formData.get("service"),
            message: formData.get("message"),
        };

        try {
            // In a real Next.js app, this would hit an API route (e.g., /api/contact)
            // which would use an SMTP provider to send the email.
            // For now, we simulate a successful API request.
            console.log("Form data exactly as would be sent to API:", data);

            await new Promise((resolve) => setTimeout(resolve, 1500));
            setSuccessMessage("Message sent successfully! We'll be in touch.");
            (e.target as HTMLFormElement).reset();
        } catch (err) {
            setErrorMessage("Failed to send message. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-black text-white selection:bg-purple-600/40 selection:text-white relative overflow-hidden">
            {/* Minimal Background Glow */}
            <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-purple-900/20 rounded-full blur-3xl pointer-events-none z-0"></div>

            <Navbar />

            <div className="relative z-10 pt-32 pb-20 px-6 max-w-4xl mx-auto">
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 font-heading">
                        Let's Create <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500">
                            Something Amazing
                        </span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto font-sans">
                        Ready to elevate your brand? Tell us about your project and let's make magic happen.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl"
                >
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-medium text-gray-400 ml-1">Your Name</label>
                                <input type="text" id="name" name="name" required
                                    className="w-full bg-black/20 border border-white/10 rounded-xl px-6 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                                    placeholder="John Doe" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="mobile" className="text-sm font-medium text-gray-400 ml-1">Mobile Number</label>
                                <input type="tel" id="mobile" name="mobile" required
                                    className="w-full bg-black/20 border border-white/10 rounded-xl px-6 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                                    placeholder="+91 98765 43210" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="service" className="text-sm font-medium text-gray-400 ml-1">Service Interested In</label>
                            <div className="relative">
                                <select id="service" name="service" required defaultValue=""
                                    className="w-full bg-black/20 border border-white/10 rounded-xl pl-6 pr-14 py-4 text-white appearance-none focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all cursor-pointer">
                                    <option value="" disabled style={{ background: "#000", color: "#6b7280" }}>Select a service</option>
                                    <option value="Digital Strategy" style={{ background: "#000", color: "#fff" }}>Digital Strategy</option>
                                    <option value="Creative Design" style={{ background: "#000", color: "#fff" }}>Creative Design</option>
                                    <option value="Web Development" style={{ background: "#000", color: "#fff" }}>Web Development</option>
                                    <option value="Video Production" style={{ background: "#000", color: "#fff" }}>Video Production</option>
                                    <option value="Social Media Marketing" style={{ background: "#000", color: "#fff" }}>Social Media Marketing</option>
                                    <option value="Other" style={{ background: "#000", color: "#fff" }}>Other</option>
                                </select>
                                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="message" className="text-sm font-medium text-gray-400 ml-1">Your Message</label>
                            <textarea id="message" name="message" required rows={4}
                                className="w-full bg-black/20 border border-white/10 rounded-xl px-6 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all resize-none"
                                placeholder="Tell us about your project goals..."></textarea>
                        </div>

                        {successMessage && <div className="text-green-500 text-sm font-medium bg-green-500/10 border border-green-500/20 px-4 py-3 rounded-lg">{successMessage}</div>}
                        {errorMessage && <div className="text-red-500 text-sm font-medium bg-red-500/10 border border-red-500/20 px-4 py-3 rounded-lg">{errorMessage}</div>}

                        <button type="submit" disabled={loading}
                            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-4 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-500/25">
                            {loading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Sending...
                                </>
                            ) : (
                                "Send Message"
                            )}
                        </button>
                    </form>
                </motion.div>
            </div>

            <Footer />
        </main>
    );
}
