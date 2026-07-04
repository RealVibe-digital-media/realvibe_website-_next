'use client';

import { useEffect } from 'react';

export default function AnimatedBackground() {
    useEffect(() => {
        // Create floating particles
        const container = document.getElementById('particles-container');
        if (!container) return;

        for (let i = 0; i < 4; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.width = `${Math.random() * 300 + 100}px`;
            particle.style.height = particle.style.width;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            container.appendChild(particle);
        }

        return () => {
            if (container) {
                container.innerHTML = '';
            }
        };
    }, []);

    return (
        <>
            {/* Animated Grid */}
            <div className="grid-background" />

            {/* Particles Container */}
            <div id="particles-container" className="fixed inset-0 pointer-events-none overflow-hidden" />

            {/* Gradient Orbs */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            </div>
        </>
    );
}
