'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
    const navRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const showAnim = gsap.from(navRef.current, {
            yPercent: -100,
            paused: true,
            duration: 0.3,
            ease: "power2.out"
        }).progress(1);

        ScrollTrigger.create({
            start: "top top",
            end: "max",
            onUpdate: (self) => {
                self.direction === -1 ? showAnim.play() : showAnim.reverse();
            }
        });
    }, []);

    return (
        <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
            <nav ref={navRef} className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-full px-10 py-4 flex items-center gap-20 shadow-2xl shadow-purple-500/10">
                <Link href="/portfolio" className="hover:opacity-80 transition-opacity">
                    <img src="/logo.png" alt="Logo" className="h-12 w-auto" />
                </Link>

                <div className="flex items-center gap-12">
                    <Link
                        href="/portfolio"
                        className="text-sm font-medium text-white/70 hover:text-white transition-colors"
                    >
                        Work
                    </Link>
                    <Link
                        href="/portfolio/contact"
                        className="text-sm font-medium text-white/70 hover:text-white transition-colors"
                    >
                        Contact
                    </Link>
                </div>
            </nav>
        </div>
    );
}
