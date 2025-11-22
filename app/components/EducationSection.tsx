"use client";

import { motion } from "framer-motion";
import { FaGraduationCap, FaCertificate, FaTrophy, FaAward, FaShieldAlt } from "react-icons/fa";

export default function EducationSection() {
    const certifications = [
        { title: "AWS Cloud Practitioner", org: "Amazon Web Services", icon: <FaShieldAlt />, color: "from-orange-500 to-yellow-500" },
        { title: "TryHackMe Top 10%", org: "Cybersecurity Practice Platform", icon: <FaTrophy />, color: "from-green-500 to-emerald-500" },
        { title: "Google Bits by Bytes", org: "Google Certification", icon: <FaCertificate />, color: "from-blue-500 to-cyan-500" },
        { title: "VR/AR Tech Head", org: "Technical Leadership", icon: <FaAward />, color: "from-purple-500 to-pink-500" },
        { title: "Valorant LAN Champion", org: "Esports Achievement", icon: <FaTrophy />, color: "from-red-500 to-orange-500" },
    ];

    return (
        <div className="grid lg:grid-cols-12 gap-8">
            {/* Degree Certificate */}
            <div className="lg:col-span-5">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative group h-full"
                >
                    <div className="absolute -inset-1 bg-gradient-to-r from-accent via-blue-500 to-accent rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500" />

                    <div className="relative bg-black/80 border border-accent/30 rounded-2xl p-8 backdrop-blur-xl overflow-hidden h-full flex flex-col">
                        {/* Holographic Overlay */}
                        <div className="absolute inset-0 bg-[linear-gradient(transparent_2px,_rgba(0,255,157,0.05)_2px)] bg-[size:100%_4px] pointer-events-none" />
                        <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            >
                                <FaGraduationCap className="text-8xl text-accent" />
                            </motion.div>
                        </div>

                        <div className="relative z-10 flex flex-col h-full">
                            {/* Header */}
                            <div className="mb-6">
                                <div className="inline-block px-3 py-1 bg-accent/10 border border-accent/30 rounded-full mb-4">
                                    <span className="text-xs font-mono text-accent">CERT_ID: EDU-2025-CS</span>
                                </div>
                                <h3 className="text-2xl font-bold text-white font-orbitron mb-2">
                                    B.Tech in Computer Science
                                </h3>
                                <p className="text-accent text-lg font-semibold">(Cybersecurity Specialization)</p>
                            </div>

                            {/* Institution */}
                            <div className="mb-6 pb-6 border-b border-white/10">
                                <p className="text-white font-bold text-xl mb-1">VIT Bhopal University</p>
                                <div className="flex items-center gap-2 text-gray-400 text-sm font-mono">
                                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                    2021 - 2025
                                </div>
                            </div>

                            {/* Details */}
                            <div className="space-y-4 flex-grow">
                                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                                    <div className="text-xs text-gray-400 mb-1">CGPA</div>
                                    <div className="text-accent font-bold text-2xl font-mono">6.67</div>
                                </div>
                                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                                    <div className="text-xs text-gray-400 mb-2">CORE MODULES</div>
                                    <div className="flex flex-wrap gap-2">
                                        {["DSA", "DBMS", "OS", "Networks", "InfoSec"].map((module, i) => (
                                            <span key={i} className="px-2 py-1 bg-accent/10 text-accent text-xs font-mono rounded border border-accent/20">
                                                {module}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Holographic Seal */}
                            <div className="mt-6 flex justify-end">
                                <motion.div
                                    className="relative w-16 h-16"
                                    animate={{ rotate: [0, 360] }}
                                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                                >
                                    <div className="absolute inset-0 rounded-full border-2 border-accent border-dashed opacity-50" />
                                    <div className="absolute inset-2 rounded-full border border-accent/30 bg-accent/10 flex items-center justify-center">
                                        <FaShieldAlt className="text-accent text-xl" />
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Certifications Grid */}
            <div className="lg:col-span-7">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                    Achievement Modules
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                    {certifications.map((cert, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            whileHover={{ scale: 1.05, y: -5 }}
                            className="relative group"
                        >
                            <div className={`absolute -inset-0.5 bg-gradient-to-r ${cert.color} rounded-xl blur opacity-0 group-hover:opacity-50 transition duration-300`} />

                            <div className="relative bg-black/80 border border-white/10 rounded-xl p-6 hover:border-accent/30 transition-all backdrop-blur-sm h-full flex flex-col">
                                {/* Icon */}
                                <div className="mb-4 flex justify-between items-start">
                                    <div className={`p-3 rounded-lg bg-gradient-to-r ${cert.color} bg-opacity-10`}>
                                        <div className="text-2xl">{cert.icon}</div>
                                    </div>
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        whileInView={{ scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 + 0.3, type: "spring" }}
                                        className="w-6 h-6 rounded-full bg-green-500/20 border border-green-500/50 flex items-center justify-center"
                                    >
                                        <span className="text-green-400 text-xs">✓</span>
                                    </motion.div>
                                </div>

                                {/* Content */}
                                <h4 className="text-white font-bold mb-2 flex-grow">{cert.title}</h4>
                                <p className="text-gray-400 text-xs font-mono">{cert.org}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
