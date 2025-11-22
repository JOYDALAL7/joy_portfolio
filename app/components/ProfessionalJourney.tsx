"use client";

import { motion } from "framer-motion";

const experiences = [
    {
        title: "Cybersecurity Intern",
        company: "IOCL",
        period: "Jun 2025 - Jul 2025",
        description: [
            "Automated scanning pipelines, cutting manual review time by 50%.",
            "Identified 14+ vulnerabilities using Burp Suite, Nmap, and log analysis.",
            "Built Python automations saving 6+ hours per week."
        ],
        align: "right"
    },
    {
        title: "Jr. Frontend Developer",
        company: "Devtrend Web Solutions",
        period: "May 2025 - Jun 2025",
        description: [
            "Improved Lighthouse score from 68 → 92 by optimizing rendering and bundle.",
            "Reduced bundle size by 25%, enhancing performance.",
            "Built reusable UI components used across 3+ apps."
        ],
        align: "left"
    }
];

export default function ProfessionalJourney() {
    return (
        <div className="relative max-w-6xl mx-auto py-20">
            {/* Central Circuit Line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-accent to-transparent transform -translate-x-1/2 hidden md:block opacity-30"></div>

            {/* Mobile Circuit Line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-accent to-transparent md:hidden opacity-30"></div>

            <div className="space-y-24">
                {experiences.map((exp, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7, delay: index * 0.2 }}
                        className={`relative flex flex-col md:flex-row ${exp.align === "right" ? "md:flex-row-reverse" : ""
                            } items-center gap-12`}
                    >
                        {/* Cyber Node (Center) */}
                        <div className="absolute left-6 md:left-1/2 w-12 h-12 z-10 transform -translate-x-1/2 flex items-center justify-center">
                            <div className="relative w-full h-full">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-0 border-2 border-accent/50 rounded-full border-dashed"
                                />
                                <div className="absolute inset-2 bg-black rounded-full border border-accent shadow-[0_0_15px_var(--color-accent)] flex items-center justify-center">
                                    <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                                </div>
                            </div>
                        </div>

                        {/* Connector Line */}
                        <div className={`hidden md:block absolute top-1/2 w-1/2 h-px bg-accent/30 ${exp.align === "right" ? "left-1/2 origin-left" : "right-1/2 origin-right"
                            }`}>
                            <motion.div
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className="w-full h-full bg-accent shadow-[0_0_10px_var(--color-accent)]"
                            />
                        </div>

                        {/* Content Card */}
                        <div className={`w-full md:w-[calc(50%-3rem)] pl-16 md:pl-0 ${exp.align === "right" ? "md:text-left" : "md:text-right"
                            }`}>
                            <div className="relative group">
                                {/* Holographic Card Effect */}
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-accent/0 via-accent/30 to-accent/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

                                <div className="relative bg-black/80 border border-white/10 rounded-2xl p-8 backdrop-blur-xl overflow-hidden">
                                    {/* Scanline Background */}
                                    <div className="absolute inset-0 bg-[linear-gradient(transparent_1px,_transparent_1px),_linear-gradient(90deg,rgba(0,255,157,0.03)_1px,_transparent_1px)] bg-[size:20px_20px] opacity-50" />

                                    <div className={`relative z-10 flex flex-col ${exp.align === "right" ? "md:items-start" : "md:items-end"
                                        }`}>
                                        <div className="flex flex-wrap items-center gap-3 mb-2">
                                            <h3 className="text-2xl font-bold text-white font-orbitron tracking-wide group-hover:text-accent transition-colors">
                                                {exp.title}
                                            </h3>
                                            <span className="px-3 py-1 rounded-full bg-accent/10 border border-accent/30 text-accent text-xs font-mono tracking-wider shadow-[0_0_10px_rgba(0,255,157,0.2)]">
                                                {exp.period}
                                            </span>
                                        </div>
                                        <p className="text-lg text-gray-300 font-medium mb-6 flex items-center gap-2">
                                            <span className="text-accent">@</span> {exp.company}
                                        </p>

                                        <ul className={`space-y-3 text-gray-400 ${exp.align === "right" ? "text-left" : "md:text-right text-left"
                                            }`}>
                                            {exp.description.map((item, i) => (
                                                <li key={i} className={`flex gap-3 ${exp.align === "right"
                                                    ? "flex-row"
                                                    : "md:flex-row-reverse flex-row"
                                                    }`}>
                                                    <span className="text-accent mt-1.5 text-[10px]">▣</span>
                                                    <span className="leading-relaxed">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Empty space for alignment */}
                        <div className="hidden md:block w-[calc(50%-3rem)]"></div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
