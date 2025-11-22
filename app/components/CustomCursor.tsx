"use client";

import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
    const [isMobile, setIsMobile] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);
    const cursorX = useMotionValue(0);
    const cursorY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 700 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    // Detect mobile/touch devices
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(
                'ontouchstart' in window ||
                navigator.maxTouchPoints > 0 ||
                window.innerWidth < 768
            );
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        if (isMobile) return; // Don't run cursor on mobile

        const handleMouseMove = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.tagName === "A" || target.tagName === "BUTTON" || target.closest("a") || target.closest("button")) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseover", handleMouseOver);
        document.addEventListener("mousedown", handleMouseDown);
        document.addEventListener("mouseup", handleMouseUp);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseover", handleMouseOver);
            document.removeEventListener("mousedown", handleMouseDown);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [cursorX, cursorY, isMobile]);

    // Don't render cursor on mobile
    if (isMobile) return null;

    return (
        <>
            {/* Main Hexagonal Cursor */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9999]"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            >
                <motion.div
                    className="relative flex items-center justify-center"
                    animate={{
                        scale: isClicking ? 0.7 : isHovering ? 1.5 : 1,
                        rotate: isHovering ? [0, 180] : 0,
                    }}
                    transition={{
                        duration: 0.3,
                        rotate: { duration: 0.6, ease: "easeInOut" }
                    }}
                >
                    {/* Center Dot with Pulse */}
                    <motion.div
                        className="w-2 h-2 bg-accent rounded-full absolute shadow-[0_0_12px_var(--color-glow)]"
                        animate={{
                            scale: [1, 1.3, 1],
                            opacity: [1, 0.7, 1]
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />

                    {/* Hexagon Shape with Glow */}
                    <svg width="40" height="40" viewBox="0 0 40 40" className="absolute">
                        <defs>
                            <filter id="glow">
                                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                                <feMerge>
                                    <feMergeNode in="coloredBlur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>
                        <path
                            d="M20 5 L32 12 L32 28 L20 35 L8 28 L8 12 Z"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className={`transition-all ${isHovering ? "text-accent opacity-100" : "text-accent/60 opacity-70"}`}
                            filter="url(#glow)"
                        />
                    </svg>

                    {/* Corner Markers with Animation */}
                    {isHovering && (
                        <>
                            {[
                                { x: -2, y: -2 },
                                { x: 2, y: -2 },
                                { x: -2, y: 2 },
                                { x: 2, y: 2 }
                            ].map((pos, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute w-2 h-2 bg-accent rounded-sm shadow-[0_0_8px_var(--color-glow)]"
                                    style={{
                                        top: pos.y === -2 ? "-8px" : "auto",
                                        bottom: pos.y === 2 ? "-8px" : "auto",
                                        left: pos.x === -2 ? "-8px" : "auto",
                                        right: pos.x === 2 ? "-8px" : "auto",
                                    }}
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{
                                        scale: [0, 1.2, 1],
                                        opacity: 1,
                                        rotate: [0, 90, 45]
                                    }}
                                    transition={{
                                        duration: 0.4,
                                        delay: i * 0.05
                                    }}
                                />
                            ))}
                        </>
                    )}

                    {/* Scan Lines Effect when hovering */}
                    {isHovering && (
                        <motion.div
                            className="absolute inset-0 overflow-hidden rounded-full"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.3 }}
                        >
                            <motion.div
                                className="absolute w-full h-px bg-accent"
                                animate={{
                                    y: [-20, 60]
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                            />
                        </motion.div>
                    )}
                </motion.div>
            </motion.div>

            {/* Enhanced Trailing Ring */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9998]"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            >
                <motion.svg
                    width="60"
                    height="60"
                    viewBox="0 0 60 60"
                    animate={{
                        scale: isClicking ? 0.6 : 1,
                        opacity: isHovering ? 0 : 0.4,
                        rotate: [0, 360]
                    }}
                    transition={{
                        duration: 0.2,
                        rotate: { duration: 20, repeat: Infinity, ease: "linear" }
                    }}
                >
                    <path
                        d="M30 10 L45 18 L45 42 L30 50 L15 42 L15 18 Z"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="text-accent"
                        strokeDasharray="6 6"
                    />
                </motion.svg>
            </motion.div>

            {/* Particle Trail Effect */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9997]"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            >
                <motion.div
                    className="w-1 h-1 bg-accent rounded-full"
                    animate={{
                        scale: [1, 2, 0],
                        opacity: [0.6, 0.3, 0]
                    }}
                    transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        ease: "easeOut"
                    }}
                />
            </motion.div>
        </>
    );
}
