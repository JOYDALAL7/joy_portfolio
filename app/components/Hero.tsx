"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function Hero() {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        const xPct = (clientX - left) / width - 0.5;
        const yPct = (clientY - top) / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);

    const [text, setText] = useState("");
    const fullText = "FULL STACK DEVELOPER";

    useEffect(() => {
        let i = 0;
        const timer = setInterval(() => {
            setText(fullText.slice(0, i));
            i++;
            if (i > fullText.length) clearInterval(timer);
        }, 50);
        return () => clearInterval(timer);
    }, []);

    return (
        <section id="home" className="min-h-screen flex flex-col justify-center items-center text-center px-4 relative pt-20 overflow-hidden">
            {/* Grid Background Effect */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,157,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,157,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

            <div className="space-y-8 max-w-6xl z-10 relative">
                {/* Terminal Header */}
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="inline-block mb-8"
                >
                    <div className="flex items-center gap-2 px-4 py-2 bg-black/60 border border-accent/30 rounded-lg backdrop-blur-sm">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-500/50" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                            <div className="w-3 h-3 rounded-full bg-green-500/50" />
                        </div>
                        <span className="text-xs font-mono text-gray-400 ml-2">~/portfolio/home</span>
                    </div>
                </motion.div>

                {/* Main Name Display */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="relative"
                >
                    <div className="absolute -inset-4 bg-accent/5 blur-3xl rounded-full" />
                    <h1 className="text-7xl md:text-9xl font-black tracking-tighter mb-4 font-orbitron relative">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-accent to-white">
                            JOY DALAL
                        </span>
                    </h1>
                </motion.div>

                {/* Typing Effect Subtitle */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex items-center justify-center gap-2 mb-8"
                >
                    <span className="text-accent font-mono">&gt;</span>
                    <p className="text-xl md:text-2xl tracking-[0.3em] text-accent font-bold uppercase font-mono">
                        {text}<span className="animate-pulse">_</span>
                    </p>
                </motion.div>

                {/* Tech Stack Grid */}
                <motion.div
                    className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 max-w-4xl mx-auto mb-12"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7 }}
                >
                    {['React', 'Next.js', 'Node.js', 'TypeScript', 'MongoDB', 'Docker', 'CyberSec'].map((tech, i) => (
                        <motion.div
                            key={tech}
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.8 + i * 0.1 }}
                            className="relative group"
                        >
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-accent to-blue-500 rounded-lg blur opacity-0 group-hover:opacity-50 transition duration-300" />
                            <div className="relative px-4 py-3 rounded-lg border border-white/10 bg-black/60 text-accent font-medium text-sm hover:border-accent/50 transition-all cursor-default backdrop-blur-md">
                                {tech}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Description with Command Line Style */}
                <motion.div
                    className="max-w-3xl mx-auto mb-12"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.9 }}
                >
                    <div className="bg-black/60 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
                        <div className="flex items-start gap-3">
                            <span className="text-accent font-mono text-sm mt-1">&gt;&gt;</span>
                            <p className="text-gray-300 text-lg leading-relaxed text-left">
                                Building <span className="text-accent font-semibold">secure, scalable</span> digital experiences.
                                I bridge the gap between <span className="text-accent font-semibold">robust engineering</span> and
                                <span className="text-accent font-semibold"> offensive security</span>.
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                    className="flex flex-wrap justify-center gap-4"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.0 }}
                >
                    <a
                        href="#contact"
                        className="px-8 py-4 rounded-lg bg-white text-black font-bold text-lg shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_var(--color-accent)] hover:bg-accent transition-all duration-300"
                    >
                        Get In Touch
                    </a>

                    <a
                        href="#projects"
                        className="px-8 py-4 rounded-lg bg-white text-black font-bold text-lg shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_var(--color-accent)] hover:bg-accent transition-all duration-300"
                    >
                        View Projects
                    </a>

                    <a
                        href="/resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-4 rounded-lg bg-white text-black font-bold text-lg shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_var(--color-accent)] hover:bg-accent transition-all duration-300"
                    >
                        Resume
                    </a>
                </motion.div>
            </div>
        </section>
    );
}

// Social Link Component with green accent color
function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
    return (
        <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-accent/80 transition-colors"
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
        >
            {icon}
        </motion.a>
    );
}
