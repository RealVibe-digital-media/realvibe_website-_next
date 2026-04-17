"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";

interface AnimatedButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'outline';
  className?: string;
}

export const AnimatedButton = ({
  children,
  href,
  onClick,
  variant = 'primary',
  className = ""
}: AnimatedButtonProps) => {
  const content = (
    <>
      <span className="relative z-10 transition-colors duration-500 flex items-center gap-2 group-hover:text-white">
        {children}
        <motion.span
          initial={{ x: 0 }}
          whileHover={{ x: 5 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <MoveRight className="w-3.5 h-3.5 ml-1 opacity-70" />
        </motion.span>
      </span>
      <div className="absolute inset-0 z-0 overflow-hidden rounded-full">
        <div className="absolute inset-x-0 bottom-0 h-0 bg-pink-600 transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:h-full" />
      </div>
    </>
  );

  const baseStyles = `group relative inline-flex items-center justify-center px-7 py-3 rounded-full font-medium text-[11px] uppercase tracking-[0.2em] overflow-hidden transition-all duration-500 ${className}`;

  const borderStyles = variant === 'outline'
    ? {
      background: 'linear-gradient(#000, #000) padding-box, linear-gradient(90deg, #da0c89, #a7228e, #da0c89) border-box',
      backgroundSize: '200% 200%',
      border: '1px solid transparent',
    }
    : {};

  const variantStyles = variant === 'primary'
    ? "bg-white text-black border border-white"
    : `text-white animate-moving-border`;

  if (href) {
    if (href.startsWith('http') || href.startsWith('tel:')) {
      return (
        <a
          href={href}
          target={href.startsWith('tel:') ? undefined : "_blank"}
          rel="noopener noreferrer"
          className={`${baseStyles} ${variantStyles}`}
          style={borderStyles}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={`${baseStyles} ${variantStyles}`} style={borderStyles}>
        {content}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variantStyles}`}
      style={borderStyles}
    >
      {content}
    </button>
  );
};
