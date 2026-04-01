"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [mounted, setMounted] = useState(false);
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        setMounted(true);
        // Hide default cursor
        document.body.classList.add("cursor-none");

        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX - 16);
            cursorY.set(e.clientY - 16);
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName.toLowerCase() === "a" ||
                target.tagName.toLowerCase() === "button" ||
                target.closest("a") ||
                target.closest("button")
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        const handleMouseLeave = () => {
            setIsVisible(false);
        };

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mouseover", handleMouseOver);
        document.documentElement.addEventListener("mouseleave", handleMouseLeave);
        document.documentElement.addEventListener("mouseenter", () => setIsVisible(true));

        return () => {
            document.body.classList.remove("cursor-none");
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mouseover", handleMouseOver);
            document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [cursorX, cursorY, isVisible]);

    if (!mounted) return null;

    return (
        <motion.div
            className="fixed top-0 left-0 w-8 h-8 rounded-full border border-purple-500/50 pointer-events-none z-[10000] flex items-center justify-center mix-blend-screen hidden md:flex"
            style={{
                x: cursorXSpring,
                y: cursorYSpring,
            }}
            initial={{ opacity: 0 }}
            animate={{
                opacity: isVisible ? 1 : 0,
                scale: isHovering ? 1.8 : 1,
                backgroundColor: isHovering ? "rgba(236,72,153,0.15)" : "transparent",
                borderColor: isHovering ? "rgba(236,72,153,0.4)" : "rgba(192,38,211,0.5)",
            }}
            transition={{ duration: 0.15 }}
        >
            <motion.div
                className="w-1.5 h-1.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-[0_0_10px_rgba(236,72,153,0.8)]"
                animate={{
                    scale: isHovering ? 0 : 1,
                    opacity: isHovering ? 0 : 1,
                }}
                transition={{ duration: 0.15 }}
            />
        </motion.div>
    );
}
