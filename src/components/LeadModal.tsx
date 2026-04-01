"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";
import { RealEstateLeadForm } from "./RealEstateLeadForm";

interface LeadModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function LeadModal({ isOpen, onClose }: LeadModalProps) {
    // Prevent scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-md"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20, filter: "blur(20px)" }}
                        animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, scale: 0.95, y: 20, filter: "blur(20px)" }}
                        transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
                        className="relative w-full max-w-xl bg-white/[0.03] backdrop-blur-[40px] rounded-[3rem] border-t border-l border-white/20 border-b border-r border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.1)] overflow-hidden"
                    >
                        {/* Specular Glow Spot */}
                        <div className="absolute -top-24 -left-24 w-48 h-48 bg-white/10 blur-[80px] rounded-full pointer-events-none" />
                        
                        {/* Close Button */}
                        <button 
                            onClick={onClose}
                            className="absolute top-8 right-8 z-20 p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all group border border-white/10"
                        >
                            <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                        </button>

                        <div className="p-1">
                             <RealEstateLeadForm variant="dark" />
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
