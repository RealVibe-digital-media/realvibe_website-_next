'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { usePathname } from 'next/navigation';

export default function Template({ children }: { children: React.ReactNode }) {
    const path = usePathname();
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.fromTo(elementRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
        );
    }, [path]);

    return (
        <div ref={elementRef}>
            {children}
        </div>
    );
}
