"use client";

import Link from "next/link";
import { Instagram, Facebook, Linkedin, Youtube, Twitter, MapPin, Mail, Phone, ArrowUpRight } from "lucide-react";

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative bg-black border-t border-white/5 overflow-hidden">
            {/* Gradient Top Bar */}
            <div className="h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>

            {/* Background Glows */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-pink-600/5 rounded-full blur-3xl pointer-events-none"></div>

            {/* ════════════════════════════════════════════════ */}
            {/* ═══ MOBILE FOOTER ═══ */}
            {/* ════════════════════════════════════════════════ */}
            <div className="block lg:hidden relative z-10 px-5 pt-10 pb-6">

                {/* Logo + Tagline */}
                <div className="flex items-center gap-3 mb-6">
                    <Link href="/">
                        <img src="/assets/logo.png" alt="RealVibe" className="h-9 w-auto" />
                    </Link>
                    <div className="h-6 w-px bg-white/10"></div>
                    <span className="text-[11px] text-gray-500 uppercase tracking-widest font-bold">Digital Agency</span>
                </div>

                {/* CTA Card */}
                <div className="relative rounded-2xl overflow-hidden mb-8">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-pink-600/10 to-orange-600/20"></div>
                    <div className="absolute inset-[1px] bg-black/90 rounded-2xl"></div>
                    <div className="relative p-5">
                        <p className="text-white font-bold text-lg mb-1">Ready to grow?</p>
                        <p className="text-gray-400 text-sm mb-4">Let's build something extraordinary together.</p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-pink-500 active:scale-95 transition-transform"
                        >
                            Start a Project
                            <ArrowUpRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>

                {/* Links — 2 Columns with gradient headers */}
                <div className="grid grid-cols-2 gap-x-6 gap-y-6 mb-8">
                    <div>
                        <h4 className="text-[11px] uppercase tracking-[0.15em] font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-3">Services</h4>
                        <ul className="space-y-2.5">
                            <MobileFooterLink href="/services/seo" text="SEO" />
                            <MobileFooterLink href="/services/social-media" text="Social Media" />
                            <MobileFooterLink href="/services/ppc" text="PPC & Ads" />
                            <MobileFooterLink href="/services/web-development" text="Web Dev" />
                            <MobileFooterLink href="/services/branding" text="Branding" />
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-[11px] uppercase tracking-[0.15em] font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-orange-400 mb-3">Explore</h4>
                        <ul className="space-y-2.5">
                            <MobileFooterLink href="/" text="Home" />
                            <MobileFooterLink href="/#about" text="About Us" />
                            <MobileFooterLink href="/#portfolio" text="Portfolio" />
                            <MobileFooterLink href="/clients" text="Our Clients" />
                            <MobileFooterLink href="/contact" text="Contact" />
                        </ul>
                    </div>
                </div>

                {/* Contact Chips */}
                <div className="flex flex-wrap gap-2 mb-6">
                    <a href="mailto:hello@realvibe.in" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs text-gray-400 hover:text-white hover:border-white/20 transition-all active:scale-95">
                        <Mail className="w-3 h-3 text-pink-400" />
                        hello@realvibe.in
                    </a>
                    <a href="tel:+919999999999" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs text-gray-400 hover:text-white hover:border-white/20 transition-all active:scale-95">
                        <Phone className="w-3 h-3 text-orange-400" />
                        +91 99999 99999
                    </a>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs text-gray-400">
                        <MapPin className="w-3 h-3 text-purple-400" />
                        Gurgaon, India
                    </span>
                </div>

                {/* Social Row */}
                <div className="flex items-center gap-3 mb-6">
                    <MobileSocialLink href="#" icon={<Instagram className="w-4 h-4" />} gradient="from-pink-500 to-purple-500" />
                    <MobileSocialLink href="#" icon={<Facebook className="w-4 h-4" />} gradient="from-blue-500 to-blue-600" />
                    <MobileSocialLink href="#" icon={<Linkedin className="w-4 h-4" />} gradient="from-blue-400 to-cyan-500" />
                    <MobileSocialLink href="#" icon={<Youtube className="w-4 h-4" />} gradient="from-red-500 to-pink-500" />
                    <MobileSocialLink href="#" icon={<Twitter className="w-4 h-4" />} gradient="from-gray-400 to-gray-500" />
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/[0.06] pt-4 flex flex-col gap-2">
                    <p className="text-[11px] text-gray-600">
                        © {currentYear} RealVibe Digital Media Pvt Ltd.
                    </p>
                    <div className="flex gap-4 text-[11px]">
                        <Link href="#" className="text-gray-500 hover:text-white transition-colors">Privacy</Link>
                        <Link href="#" className="text-gray-500 hover:text-white transition-colors">Terms</Link>
                        <Link href="#" className="text-gray-500 hover:text-white transition-colors">Sitemap</Link>
                    </div>
                </div>
            </div>

            {/* ════════════════════════════════════════════════ */}
            {/* ═══ DESKTOP FOOTER ═══ */}
            {/* ════════════════════════════════════════════════ */}
            <div className="hidden lg:block max-w-7xl mx-auto px-6 pt-20 pb-10 relative z-10">
                <div className="grid grid-cols-4 gap-12 mb-16">
                    {/* Col 1: Brand */}
                    <div>
                        <Link href="/" className="block w-fit mb-6">
                            <img src="/assets/logo.png" alt="RealVibe" className="h-12 w-auto" />
                        </Link>
                        <p className="text-gray-400 leading-relaxed mb-6">
                            RealVibe is a creative digital marketing agency helping brands dominate the digital landscape
                            with data-driven strategies.
                        </p>
                        <div className="flex flex-wrap items-center gap-4">
                            <SocialLink href="#" icon={<Instagram className="w-4 h-4" />} label="Instagram" />
                            <SocialLink href="#" icon={<Facebook className="w-4 h-4" />} label="Facebook" />
                            <SocialLink href="#" icon={<Linkedin className="w-4 h-4" />} label="LinkedIn" />
                            <SocialLink href="#" icon={<Youtube className="w-4 h-4" />} label="YouTube" />
                            <SocialLink href="#" icon={<Twitter className="w-4 h-4" />} label="Twitter" />
                        </div>
                    </div>

                    {/* Col 2: Services */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-6 relative w-fit">
                            Services
                            <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500"></span>
                        </h3>
                        <ul className="space-y-3">
                            <FooterLink href="/services/seo" text="SEO Optimization" color="bg-purple-500" />
                            <FooterLink href="/services/social-media" text="Social Media Marketing" color="bg-purple-500" />
                            <FooterLink href="/services/ppc" text="PPC & Paid Ads" color="bg-purple-500" />
                            <FooterLink href="/services/web-development" text="Web Development" color="bg-purple-500" />
                            <FooterLink href="/services/branding" text="Brand Strategy" color="bg-purple-500" />
                        </ul>
                    </div>

                    {/* Col 3: Quick Links */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-6 relative w-fit">
                            Quick Links
                            <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-pink-500 to-orange-500"></span>
                        </h3>
                        <ul className="space-y-3">
                            <FooterLink href="/" text="Home" color="bg-pink-500" />
                            <FooterLink href="/#about" text="About Us" color="bg-pink-500" />
                            <FooterLink href="/#services" text="Services" color="bg-pink-500" />
                            <FooterLink href="/#portfolio" text="Portfolio" color="bg-pink-500" />
                            <FooterLink href="/clients" text="Our Clients" color="bg-pink-500" />
                            <FooterLink href="/contact" text="Contact" color="bg-pink-500" />
                        </ul>
                    </div>

                    {/* Col 4: Contact */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-6 relative w-fit">
                            Contact Us
                            <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-orange-500 to-amber-500"></span>
                        </h3>
                        <div className="space-y-4">
                            <div className="flex gap-3">
                                <MapPin className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    303, 3rd Floor, JMD Galleria,<br />
                                    Sector-48, Gurgaon-122018
                                </p>
                            </div>
                            <div className="flex gap-3">
                                <Mail className="w-5 h-5 text-pink-400 flex-shrink-0" />
                                <a href="mailto:hello@realvibe.in" className="text-gray-400 hover:text-white transition-colors text-sm">
                                    hello@realvibe.in
                                </a>
                            </div>
                            <div className="flex gap-3">
                                <Phone className="w-5 h-5 text-orange-400 flex-shrink-0" />
                                <a href="tel:+919999999999" className="text-gray-400 hover:text-white transition-colors text-sm">
                                    +91 99999 99999
                                </a>
                            </div>
                        </div>

                        {/* Partner Badges */}
                        <div className="grid grid-cols-2 gap-4 mt-6">
                            <div className="h-14 rounded-xl flex items-center justify-center bg-white/[0.03] border border-white/10 p-3 hover:bg-white/[0.08] transition-all group">
                                <img src="/assets/partners/meta.png" alt="Meta Partner" className="h-6 w-auto opacity-40 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0" />
                            </div>
                            <div className="h-14 rounded-xl flex items-center justify-center bg-white/[0.03] border border-white/10 p-3 hover:bg-white/[0.08] transition-all group">
                                <img src="/assets/partners/google.svg" alt="Google Partner" className="h-6 w-auto opacity-40 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-sm">
                        © {currentYear} RealVibe Digital Media Pvt Ltd. All rights reserved.
                    </p>
                    <div className="flex flex-wrap justify-center gap-6 text-sm">
                        <Link href="#" className="text-gray-500 hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="#" className="text-gray-500 hover:text-white transition-colors">Terms of Service</Link>
                        <Link href="#" className="text-gray-500 hover:text-white transition-colors">Sitemap</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

// ═══ MOBILE-ONLY COMPONENTS ═══
function MobileFooterLink({ href, text }: { href: string; text: string }) {
    return (
        <li>
            <Link href={href} className="text-gray-400 hover:text-white text-[13px] transition-colors active:translate-x-1 flex items-center gap-1.5 group">
                <span className="w-1 h-1 rounded-full bg-white/20 group-hover:bg-pink-500 transition-colors"></span>
                {text}
            </Link>
        </li>
    );
}

function MobileSocialLink({ href, icon, gradient }: { href: string; icon: React.ReactNode; gradient: string }) {
    return (
        <a
            href={href}
            className="relative w-10 h-10 rounded-xl flex items-center justify-center text-white overflow-hidden active:scale-90 transition-transform group"
        >
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-20 group-hover:opacity-40 transition-opacity`}></div>
            <div className="absolute inset-[1px] bg-black/80 rounded-[10px]"></div>
            <span className="relative z-10">{icon}</span>
        </a>
    );
}

// ═══ DESKTOP-ONLY COMPONENTS ═══
function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
    return (
        <a
            href={href}
            className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-110"
            aria-label={label}
        >
            {icon}
        </a>
    );
}

function FooterLink({ href, text, color }: { href: string; text: string; color: string }) {
    return (
        <li>
            <Link href={href} className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                <span className={`w-1 h-1 rounded-full ${color} opacity-0 group-hover:opacity-100 transition-opacity`}></span>
                {text}
            </Link>
        </li>
    );
}
