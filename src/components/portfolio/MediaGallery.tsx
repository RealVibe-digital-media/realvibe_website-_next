'use client';

import Image from 'next/image';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface MediaGalleryProps {
    images: string[];
    videos?: string[];
}

export default function MediaGallery({ images, videos = [] }: MediaGalleryProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const elements = containerRef.current?.children;
        if (elements) {
            Array.from(elements).forEach((el) => {
                gsap.fromTo(el,
                    { y: 50, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: el,
                            start: 'top 80%',
                            toggleActions: 'play none none reverse'
                        }
                    }
                );
            });
        }
    }, []);

    return (
        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
            {/* Videos first if any */}
            {videos.map((video, index) => (
                <div key={`video-${index}`} className="relative aspect-video rounded-2xl overflow-hidden bg-gray-100 shadow-sm">
                    <iframe
                        src={video}
                        className="absolute inset-0 w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>
            ))}

            {/* Images */}
            {images.map((image, index) => (
                <div key={`image-${index}`} className={`relative rounded-2xl overflow-hidden bg-gray-100 shadow-sm ${index % 3 === 0 ? 'md:col-span-2 aspect-[21/9]' : 'aspect-[4/3]'}`}>
                    <Image
                        src={image}
                        alt={`Project image ${index + 1}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 100vw"
                    />
                </div>
            ))}
        </div>
    );
}
