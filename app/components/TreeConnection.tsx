"use client";

import { useEffect, useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

// Sections to track - defined outside component to prevent infinite loop
const sections = ['about', 'skills', 'experience', 'projects', 'education', 'contact'];

export default function TreeConnection() {
    const [trunkHeight, setTrunkHeight] = useState(0);
    const [activeSections, setActiveSections] = useState<Set<string>>(new Set());
    const [passedSections, setPassedSections] = useState<Set<string>>(new Set());

    useEffect(() => {
        const handleScroll = () => {
            const newActiveSections = new Set<string>();
            const newPassedSections = new Set<string>();
            let maxReachedHeight = 0;

            sections.forEach((sectionId) => {
                const element = document.getElementById(sectionId);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    const windowHeight = window.innerHeight;
                    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

                    // Section is considered active if it's in the viewport
                    if (rect.top < windowHeight * 0.8 && rect.bottom > 0) {
                        newActiveSections.add(sectionId);
                        // Calculate trunk height to this section
                        const sectionTop = rect.top + scrollTop + 100;
                        maxReachedHeight = Math.max(maxReachedHeight, sectionTop);
                    }

                    // Section is passed if it's above the viewport
                    if (rect.bottom < windowHeight * 0.3) {
                        newPassedSections.add(sectionId);
                        const sectionTop = rect.top + scrollTop + 100;
                        maxReachedHeight = Math.max(maxReachedHeight, sectionTop);
                    }
                }
            });

            setActiveSections(newActiveSections);
            setPassedSections(newPassedSections);
            setTrunkHeight(maxReachedHeight);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial check

        return () => window.removeEventListener('scroll', handleScroll);
    }, []); // Empty dependency array since sections is constant

    return (
        <div className="fixed left-8 md:left-16 top-0 h-full pointer-events-none z-[1]">
            {/* Main Trunk - grows progressively section by section */}
            <motion.div
                className="absolute left-0 top-0 w-0.5 bg-gradient-to-b from-accent via-green-400 to-accent opacity-40"
                style={{
                    height: `${trunkHeight}px`,
                    boxShadow: '0 0 10px var(--color-glow-strong)',
                }}
                transition={{
                    duration: 0.5,
                    ease: "easeOut"
                }}
            />

            {/* Section Branches */}
            {sections.map((sectionId, index) => {
                const isActive = activeSections.has(sectionId);
                const isPassed = passedSections.has(sectionId);

                return (
                    <SectionBranch
                        key={sectionId}
                        sectionId={sectionId}
                        isActive={isActive}
                        isPassed={isPassed}
                        index={index}
                    />
                );
            })}

            {/* Roots at bottom */}
            {passedSections.has('contact') && (
                <motion.div
                    className="absolute left-0"
                    style={{ top: `${trunkHeight + 50}px` }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <svg width="300" height="200" viewBox="0 0 300 200">
                        <motion.path
                            d="M0 0 Q-30 40 -60 80 L-90 120"
                            stroke="var(--color-glow)"
                            strokeWidth="2"
                            fill="none"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1, delay: 0.2 }}
                        />
                        <motion.path
                            d="M0 0 Q-20 50 -35 90 L-50 140"
                            stroke="var(--color-glow)"
                            strokeWidth="1.5"
                            fill="none"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1, delay: 0.3 }}
                        />
                        <motion.path
                            d="M0 0 Q30 40 60 80 L90 120"
                            stroke="var(--color-glow)"
                            strokeWidth="2"
                            fill="none"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1, delay: 0.4 }}
                        />
                        <motion.path
                            d="M0 0 Q20 50 35 90 L50 140"
                            stroke="var(--color-glow)"
                            strokeWidth="1.5"
                            fill="none"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1, delay: 0.5 }}
                        />
                        <motion.path
                            d="M0 0 L0 160"
                            stroke="var(--color-glow)"
                            strokeWidth="1"
                            fill="none"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1, delay: 0.1 }}
                        />
                    </svg>
                </motion.div>
            )}
        </div>
    );
}

function SectionBranch({ sectionId, isActive, isPassed, index }: {
    sectionId: string;
    isActive: boolean;
    isPassed: boolean;
    index: number;
}) {
    const [position, setPosition] = useState({ top: 0 });
    const lastPositionRef = useRef({ top: 0 });

    const updatePosition = useCallback(() => {
        const element = document.getElementById(sectionId);
        if (element) {
            const rect = element.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const newTop = rect.top + scrollTop + 100;

            // Only update if position changed significantly
            if (Math.abs(newTop - lastPositionRef.current.top) > 5) {
                lastPositionRef.current = { top: newTop };
                setPosition({ top: newTop });
            }
        }
    }, [sectionId]);

    useEffect(() => {
        updatePosition();
        window.addEventListener('scroll', updatePosition, { passive: true });
        window.addEventListener('resize', updatePosition);

        return () => {
            window.removeEventListener('scroll', updatePosition);
            window.removeEventListener('resize', updatePosition);
        };
    }, [updatePosition]);

    const branchLength = 60;

    return (
        <motion.div
            className="absolute left-0"
            style={{ top: position.top }}
        >
            {/* Horizontal branch extending right */}
            <motion.div
                className="absolute top-0 h-0.5 bg-gradient-to-r from-accent/50 to-transparent"
                style={{
                    width: branchLength,
                    left: 0,
                    boxShadow: '0 0 6px var(--color-glow)',
                }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: isActive || isPassed ? 1 : 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            />

            {/* Branch node/dot */}
            <motion.div
                className="absolute top-1/2 -translate-y-1/2 rounded-full"
                style={{
                    left: branchLength,
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                    scale: isActive || isPassed ? 1 : 0,
                    opacity: isActive || isPassed ? 1 : 0,
                }}
                transition={{ duration: 0.4, delay: 0.3 }}
            >
                {/* Main dot */}
                <motion.div
                    className="w-3 h-3 rounded-full bg-accent"
                    style={{
                        boxShadow: '0 0 10px var(--color-glow-strong)',
                    }}
                    animate={isPassed ? {
                        backgroundColor: 'var(--color-accent)',
                        boxShadow: '0 0 20px var(--color-accent)',
                    } : {}}
                />

                {/* Pulsing ring for active */}
                {isActive && !isPassed && (
                    <motion.div
                        className="absolute inset-0 rounded-full border-2 border-accent"
                        animate={{
                            scale: [1, 2, 1],
                            opacity: [0.8, 0, 0.8],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                )}

                {/* Checkmark for passed */}
                {isPassed && (
                    <motion.svg
                        className="absolute -inset-1 w-5 h-5"
                        viewBox="0 0 20 20"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 200 }}
                    >
                        <motion.path
                            d="M5 10 L8 13 L15 6"
                            stroke="var(--color-accent)"
                            strokeWidth="2"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        />
                    </motion.svg>
                )}
            </motion.div>

            {/* Flowing particle along branch */}
            {isActive && !isPassed && (
                <motion.div
                    className="absolute w-1.5 h-1.5 bg-accent rounded-full"
                    style={{
                        left: 0,
                        top: 0,
                    }}
                    animate={{
                        x: [0, branchLength],
                        opacity: [0, 1, 0],
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            )}
        </motion.div>
    );
}

// Export a wrapper component for sections to use
export function TreeAnimatedSection({
    children,
    id
}: {
    children: React.ReactNode;
    id: string;
}) {
    return (
        <motion.div
            id={id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            {children}
        </motion.div>
    );
}
