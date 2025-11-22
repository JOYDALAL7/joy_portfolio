"use client";

import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaCode } from "react-icons/fa";

interface ProjectCardProps {
    title: string;
    tech: string;
    description: string;
    links: {
        live: string;
        github?: string;
    };
    icon?: React.ReactNode;
    index?: number;
}

export default function ProjectCard({ title, tech, description, links, icon, index = 0 }: ProjectCardProps) {
    const techStack = tech.split("•").map(t => t.trim());

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group relative h-full"
        >
            {/* Holographic Glow Effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-accent/20 via-blue-500/20 to-accent/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />

            <div className="relative h-full bg-black/80 border border-white/10 rounded-2xl p-8 backdrop-blur-xl overflow-hidden flex flex-col">
                {/* Scanline Background */}
                <div className="absolute inset-0 bg-[linear-gradient(transparent_2px,_rgba(0,0,0,0.5)_2px)] bg-[size:100%_4px] pointer-events-none opacity-20" />

                {/* Header */}
                <div className="relative z-10 mb-6 flex justify-between items-start">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 rounded-lg bg-accent/10 text-accent">
                                {icon || <FaCode />}
                            </div>
                            <h3 className="text-2xl font-bold text-white font-orbitron tracking-wide group-hover:text-accent transition-colors">
                                {title}
                            </h3>
                        </div>
                    </div>
                </div>

                {/* Tech Stack Chips */}
                <div className="relative z-10 flex flex-wrap gap-2 mb-6">
                    {techStack.map((t, i) => (
                        <span
                            key={i}
                            className="px-3 py-1 text-xs font-mono font-bold text-accent bg-accent/5 border border-accent/20 rounded-full"
                        >
                            {t}
                        </span>
                    ))}
                </div>

                {/* Description */}
                <p className="relative z-10 text-gray-400 leading-relaxed mb-8 flex-grow">
                    {description}
                </p>

                {/* Actions */}
                <div className="relative z-10 flex gap-4 mt-auto pt-6 border-t border-white/5">
                    <a
                        href={links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 px-4 py-3 bg-white text-black font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-accent hover:scale-[1.02] transition-all active:scale-[0.98] shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_var(--color-accent)]"
                    >
                        <FaExternalLinkAlt className="text-sm" />
                        <span>Initialize</span>
                    </a>
                    {links.github && (
                        <a
                            href={links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-3 bg-white/5 text-white font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-white/10 transition-all border border-white/10 hover:border-white/30"
                        >
                            <FaGithub className="text-lg" />
                            <span className="hidden sm:inline">Source</span>
                        </a>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
