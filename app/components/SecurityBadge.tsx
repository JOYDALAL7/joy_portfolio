"use client";

import { motion } from "framer-motion";

interface SecurityBadgeProps {
    className?: string;
}

export default function SecurityBadge({ className = "" }: SecurityBadgeProps) {
    return (
        <div className={`relative ${className}`}>
            {/* Outer rotating ring */}
            <motion.div
                className="absolute inset-0 rounded-full border-2 border-accent/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />

            {/* Shield icon */}
            <div className="relative z-10 flex items-center justify-center w-full h-full">
                <svg viewBox="0 0 100 100" className="w-2/3 h-2/3">
                    {/* Shield shape */}
                    <motion.path
                        d="M50 10 L80 25 L80 50 C80 70, 50 85, 50 90 C50 85, 20 70, 20 50 L20 25 Z"
                        fill="none"
                        stroke="var(--color-accent)"
                        strokeWidth="2"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                    />

                    {/* Lock symbol */}
                    <motion.g
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1, duration: 0.5 }}
                    >
                        {/* Lock body */}
                        <rect x="40" y="50" width="20" height="15" rx="2" fill="none" stroke="var(--color-accent)" strokeWidth="2" />

                        {/* Lock shackle */}
                        <path
                            d="M42 50 L42 42 C42 37, 58 37, 58 42 L58 50"
                            fill="none"
                            stroke="var(--color-accent)"
                            strokeWidth="2"
                        />

                        {/* Keyhole */}
                        <circle cx="50" cy="57" r="2" fill="var(--color-accent)" />
                        <line x1="50" y1="59" x2="50" y2="63" stroke="var(--color-accent)" strokeWidth="1.5" />
                    </motion.g>

                    {/* Animated pulse */}
                    <motion.circle
                        cx="50"
                        cy="50"
                        r="35"
                        fill="none"
                        stroke="var(--color-accent)"
                        strokeWidth="1"
                        opacity="0"
                        animate={{
                            r: [35, 45],
                            opacity: [0.5, 0],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: 1,
                        }}
                    />
                </svg>
            </div>

            {/* Corner brackets */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                {/* Top-left */}
                <path d="M10 20 L10 10 L20 10" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" opacity="0.6" />
                {/* Top-right */}
                <path d="M80 10 L90 10 L90 20" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" opacity="0.6" />
                {/* Bottom-left */}
                <path d="M20 90 L10 90 L10 80" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" opacity="0.6" />
                {/* Bottom-right */}
                <path d="M90 80 L90 90 L80 90" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" opacity="0.6" />
            </svg>

            {/* Glow effect */}
            <motion.div
                className="absolute inset-0 rounded-full bg-accent/20 blur-xl"
                animate={{
                    opacity: [0.2, 0.4, 0.2],
                    scale: [0.9, 1.1, 0.9],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                }}
            />
        </div>
    );
}
