"use client";

import { motion } from "framer-motion";

interface SkillBarProps {
    icon: React.ReactNode;
    name: string;
    level: number;
    delay?: number;
}

export default function SkillBar({ icon, name, level, delay = 0 }: SkillBarProps) {
    // Calculate number of active segments (out of 20)
    const totalSegments = 20;
    const activeSegments = Math.floor((level / 100) * totalSegments);

    return (
        <div className="mb-6 last:mb-0 group">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                    {/* Hexagonal Icon Badge */}
                    <div className="relative">
                        <svg width="36" height="36" viewBox="0 0 36 36" className="absolute inset-0">
                            <path
                                d="M18 2 L30 9 L30 27 L18 34 L6 27 L6 9 Z"
                                fill="rgba(0,255,157,0.1)"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                className="text-accent/50 group-hover:text-accent transition-colors"
                            />
                        </svg>
                        <div className="relative w-9 h-9 flex items-center justify-center">
                            <span className="text-lg text-accent group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_8px_var(--color-accent)]">
                                {icon}
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-bold text-gray-100 tracking-wide">{name}</span>
                        <span className="text-[10px] text-accent/60 font-mono">v{Math.floor(level / 10)}.{level % 10}</span>
                    </div>
                </div>
                <div className="flex items-center gap-2 bg-accent/10 px-3 py-1 rounded-lg border border-accent/20">
                    <motion.div
                        className="w-1.5 h-1.5 bg-accent rounded-full"
                        animate={{
                            opacity: [1, 0.3, 1],
                            scale: [1, 1.2, 1]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                    <span className="text-sm font-bold font-mono text-accent">{level}%</span>
                </div>
            </div>

            {/* Enhanced Segmented Bar */}
            <div className="flex gap-1 h-4 relative">
                {/* Background glow */}
                <div className="absolute inset-0 bg-accent/5 rounded-full blur-sm" />

                {[...Array(totalSegments)].map((_, i) => (
                    <motion.div
                        key={i}
                        className={`relative flex-1 rounded-sm overflow-hidden ${i < activeSegments
                                ? "bg-gradient-to-t from-accent/80 to-accent shadow-[0_0_8px_var(--color-accent)]"
                                : "bg-white/5"
                            }`}
                        initial={{ opacity: 0, scaleY: 0 }}
                        whileInView={{
                            opacity: i < activeSegments ? [0.6, 1, 0.6] : 0.3,
                            scaleY: 1
                        }}
                        viewport={{ once: true }}
                        transition={{
                            duration: 0.6,
                            delay: delay + (i * 0.03),
                            opacity: {
                                duration: 3,
                                repeat: Infinity,
                                delay: i * 0.1,
                                ease: "easeInOut"
                            }
                        }}
                        whileHover={{
                            scaleY: i < activeSegments ? 1.2 : 1,
                            transition: { duration: 0.2 }
                        }}
                    >
                        {/* Inner glow effect */}
                        {i < activeSegments && (
                            <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent" />
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

