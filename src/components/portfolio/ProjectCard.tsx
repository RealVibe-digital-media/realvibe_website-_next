'use client';

import Image from 'next/image';
import { PortfolioItem } from '@/data/projects';
import { useRef } from 'react';
import gsap from 'gsap';

interface ProjectCardProps {
    project: PortfolioItem;
}

export default function ProjectCard({ project }: ProjectCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    const handleMouseEnter = () => {
        if (project.category !== 'Creatives') {
            gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, ease: 'power2.out' });
            gsap.to(imageRef.current, { scale: 1.05, duration: 0.5, ease: 'power2.out' });
        }
    };

    const handleMouseLeave = () => {
        if (project.category !== 'Creatives') {
            gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, ease: 'power2.out' });
            gsap.to(imageRef.current, { scale: 1, duration: 0.5, ease: 'power2.out' });
        }
    };

    // For Creatives, we just show the image in its natural aspect ratio (uploaded size)
    if (project.category === 'Creatives') {
        return (
            <div className="relative w-full mb-4">
                <img
                    src={project.image}
                    alt={project.title || 'Creative'}
                    className="w-full h-auto rounded-lg"
                    loading="lazy"
                />
            </div>
        );
    }

    // For other categories (Videos, Websites), keep the card look
    const CardContent = (
        <div
            ref={cardRef}
            className="group relative overflow-hidden rounded-2xl bg-gray-900 aspect-[4/3] cursor-pointer border border-white/5"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <Image
                ref={imageRef}
                src={project.image}
                alt={project.title || 'Portfolio Item'}
                fill
                className="object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />

            {project.title && (
                <div
                    ref={overlayRef}
                    className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 flex flex-col justify-end p-6 transition-opacity"
                >
                    <h3 className="text-xl font-bold text-white translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                        {project.title}
                    </h3>
                </div>
            )}
        </div>
    );

    return (
        <>
            {project.link ? (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="block">
                    {CardContent}
                </a>
            ) : (
                <div>{CardContent}</div>
            )}
        </>
    );
}
