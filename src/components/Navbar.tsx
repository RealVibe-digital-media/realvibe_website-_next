"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;
        if (latest > previous && latest > 150) {
            setHidden(true);
            setIsOpen(false);
        } else {
            setHidden(false);
        }
        setScrolled(latest > 50);
    });

    // Close mobile menu on route change
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    const toggleMenu = () => setIsOpen(!isOpen);

    const links = [
        { name: "Home", href: "/" },
        { name: "Services", href: "/services" },
        { name: "About", href: "/#about" },
        { name: "Portfolio", href: "/#portfolio" },
        { name: "Our Clients", href: "/clients" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <>
            <motion.div
                variants={{
                    visible: { y: 0 },
                    hidden: { y: "-100%" },
                }}
                animate={hidden ? "hidden" : "visible"}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4"
            >
                <nav
                    className={`flex items-center justify-between gap-6 rounded-2xl px-6 py-3 transition-all duration-500 w-full max-w-5xl border ${scrolled
                        ? "bg-black/80 backdrop-blur-md border-white/10 shadow-2xl shadow-purple-500/10"
                        : "bg-black/40 backdrop-blur-sm border-white/5"
                        }`}
                >
                    {/* Logo */}
                    <Link href="/" className="hover:opacity-80 transition-opacity flex-shrink-0">
                        <img src="/assets/logo.png" alt="RealVibe" className="h-10 w-auto" />
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-8">
                        {links.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-sm font-medium text-gray-300 hover:text-white transition-colors relative group"
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
                            </Link>
                        ))}
                    </div>

                    {/* Desktop CTA */}
                    <Link
                        href="/contact"
                        className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-purple-500/25"
                    >
                        Get Started
                        <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                    </Link>

                    {/* Mobile Hamburger */}
                    <button
                        onClick={toggleMenu}
                        className="md:hidden relative w-8 h-8 flex items-center justify-center text-white"
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </nav>
            </motion.div>

            {/* Mobile Menu Backdrop */}
            <motion.div
                initial={false}
                animate={{ opacity: isOpen ? 1 : 0, pointerEvents: isOpen ? "auto" : "none" }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-40 bg-black/80 backdrop-blur-lg md:hidden"
                onClick={() => setIsOpen(false)}
            />

            {/* Mobile Menu Content */}
            <motion.div
                initial={false}
                animate={{
                    opacity: isOpen ? 1 : 0,
                    y: isOpen ? 0 : -20,
                    pointerEvents: isOpen ? "auto" : "none",
                }}
                transition={{ duration: 0.3 }}
                className="fixed top-20 left-4 right-4 z-40 bg-black/90 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 md:hidden"
            >
                <div className="flex flex-col gap-1">
                    {links.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-lg font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-xl px-4 py-3 transition-all"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
                <div className="mt-4 pt-4 border-t border-white/10">
                    <Link
                        href="/contact"
                        className="block text-center px-6 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 transition-all"
                    >
                        Get Started &rarr;
                    </Link>
                </div>
            </motion.div>
        </>
    );
}
