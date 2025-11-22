"use client";

import { motion } from "framer-motion";
import { useMemo, useState, useEffect } from "react";

export default function TechDecoration() {
    // Generate positions for complex hexes
    const hexPositions = useMemo(() =>
        [...Array(6)].map((_, i) => ({
            left: ((i * 17 + 13) % 90),
            top: ((i * 23 + 7) % 80) + 10,
            scale: 0.5 + (i % 3) * 0.2,
            duration: 15 + (i % 5) * 3,
            delay: i * 2,
            rotationDir: i % 2 === 0 ? 1 : -1
        }))
        , []);

    const [particleConfig, setParticleConfig] = useState<Array<{
        left: number;
        duration: number;
        delay: number;
        opacity: number;
    }>>([]);

    useEffect(() => {
        // Generate random particle config on client only
        setParticleConfig([...Array(20)].map((_, i) => ({
            left: Math.random() * 100,
            duration: 2 + Math.random() * 3,
            delay: Math.random() * 2,
            opacity: 0.3 + Math.random() * 0.5
        })));
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {/* Perspective Grid Background */}
            <div className="absolute inset-0 opacity-20"
                style={{
                    background: 'linear-gradient(to bottom, transparent 0%, var(--color-bg) 100%), radial-gradient(circle at 50% 50%, var(--color-accent-secondary) 0%, transparent 50%)',
                    transform: 'perspective(1000px) rotateX(20deg) scale(1.5)'
                }}>
                <div className="absolute inset-0"
                    style={{
                        backgroundImage: 'linear-gradient(var(--color-surface) 1px, transparent 1px), linear-gradient(90deg, var(--color-surface) 1px, transparent 1px)',
                        backgroundSize: '50px 50px',
                        opacity: 0.1
                    }}
                />
            </div>

            {/* Complex Rotating Data Hexes */}
            {hexPositions.map((config, i) => (
                <motion.div
                    key={`hex-${i}`}
                    className="absolute"
                    style={{
                        left: `${config.left}%`,
                        top: `${config.top}%`,
                        scale: config.scale,
                    }}
                    animate={{
                        rotate: [0, 360 * config.rotationDir],
                        y: [0, -20, 0],
                    }}
                    transition={{
                        rotate: { duration: config.duration, repeat: Infinity, ease: "linear" },
                        y: { duration: config.duration / 2, repeat: Infinity, ease: "easeInOut" }
                    }}
                >
                    <svg width="100" height="100" viewBox="0 0 100 100" className="opacity-30">
                        <path
                            d="M50 5 L90 25 L90 75 L50 95 L10 75 L10 25 Z"
                            fill="none"
                            stroke="var(--color-accent)"
                            strokeWidth="1"
                            strokeDasharray="10 5"
                        />
                        <path
                            d="M50 15 L80 30 L80 70 L50 85 L20 70 L20 30 Z"
                            fill="var(--color-surface)"
                            stroke="var(--color-accent-secondary)"
                            strokeWidth="0.5"
                            opacity="0.5"
                        />
                        <circle cx="50" cy="50" r="5" fill="var(--color-accent)" className="animate-pulse" />
                        <line x1="50" y1="50" x2="50" y2="5" stroke="var(--color-accent)" strokeWidth="1" strokeDasharray="5 5" />
                        <line x1="50" y1="50" x2="90" y2="75" stroke="var(--color-accent)" strokeWidth="1" strokeDasharray="5 5" />
                        <line x1="50" y1="50" x2="10" y2="75" stroke="var(--color-accent)" strokeWidth="1" strokeDasharray="5 5" />
                    </svg>
                </motion.div>
            ))}

            {/* Enhanced Data Stream Particles */}
            {particleConfig.map((config, i) => (
                <motion.div
                    key={`particle-${i}`}
                    className="absolute w-px bg-gradient-to-b from-transparent via-accent to-transparent"
                    style={{
                        left: `${config.left}%`,
                        height: '150px',
                        opacity: config.opacity
                    }}
                    animate={{
                        y: ['-100%', '100vh'],
                    }}
                    transition={{
                        duration: config.duration,
                        repeat: Infinity,
                        delay: config.delay,
                        ease: "linear",
                    }}
                />
            ))}

            {/* Floating Code Snippets */}
            <div className="absolute top-20 right-10 font-mono text-xs text-accent/20 hidden lg:block">
                <TypewriterText text="> SYSTEM.INIT(SECURE_MODE)" delay={0} />
                <TypewriterText text="> LOADING_MODULES..." delay={2} />
                <TypewriterText text="> ACCESS_GRANTED" delay={4} />
            </div>
        </div>
    );
}

function TypewriterText({ text, delay }: { text: string, delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ duration: 4, delay: delay, repeat: Infinity, repeatDelay: 10 }}
            className="mb-2"
        >
            {text}
        </motion.div>
    );
}
