"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaUserAstronaut, FaFingerprint, FaIdCard, FaShieldAlt } from "react-icons/fa";

export default function AboutSection() {
    const [decryptedText, setDecryptedText] = useState("");
    const fullText = "Full-stack developer passionate about building scalable web applications and solving complex problems. Experienced with React, Next.js, Node.js, Express, MongoDB, and cloud deployment. I focus on writing clean, efficient code and creating seamless user experiences. Currently exploring AI integration and modern development tools to build innovative solutions.";

    useEffect(() => {
        // Detect mobile for performance optimization
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ||
            ('ontouchstart' in window) ||
            (window.innerWidth < 768);

        // On mobile, skip animation and show text immediately
        if (isMobile) {
            setDecryptedText(fullText);
            return;
        }

        let iteration = 0;
        const interval = setInterval(() => {
            setDecryptedText(prev => {
                return fullText
                    .split("")
                    .map((letter, index) => {
                        if (index < iteration) {
                            return fullText[index];
                        }
                        return String.fromCharCode(65 + Math.floor(Math.random() * 26));
                    })
                    .join("");
            });

            if (iteration >= fullText.length) {
                clearInterval(interval);
                setDecryptedText(fullText); // Ensure final text is correct
            }

            iteration += 1 / 2; // Slower decryption
        }, 30);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="grid md:grid-cols-12 gap-8 items-center">
            {/* Identity Module (Avatar/Stats) */}
            <div className="md:col-span-5 relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-accent via-blue-500 to-accent rounded-2xl blur opacity-20 group-hover:opacity-50 transition duration-500" />
                <div className="relative bg-black/80 border border-accent/30 rounded-2xl p-6 backdrop-blur-xl overflow-hidden">
                    {/* Holographic Overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(transparent_2px,_rgba(0,255,157,0.05)_2px)] bg-[size:100%_4px] pointer-events-none" />
                    <div className="absolute top-0 left-0 w-full h-1 bg-accent/50 shadow-[0_0_15px_var(--color-accent)] animate-scan" />

                    <div className="flex flex-col items-center text-center relative z-10">
                        <div className="w-32 h-32 rounded-full border-4 border-accent/20 p-1 mb-6 relative">
                            <div className="w-full h-full rounded-full bg-accent/10 flex items-center justify-center overflow-hidden relative">
                                <img
                                    src="/joy.jpg"
                                    alt="Joy Dalal"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                            </div>
                            <motion.div
                                className="absolute inset-0 border-2 border-accent rounded-full border-dashed"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            />
                        </div>

                        <h3 className="text-2xl font-bold text-white font-orbitron mb-1">JOY DALAL</h3>
                        <p className="text-accent font-mono text-sm mb-6">ID: DEV-7392-SEC</p>

                        <div className="grid grid-cols-2 gap-4 w-full">
                            <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                                <div className="text-xs text-gray-400 mb-1 flex items-center justify-center gap-1">
                                    <FaFingerprint /> ACCESS
                                </div>
                                <div className="text-accent font-bold">LEVEL 5</div>
                            </div>
                            <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                                <div className="text-xs text-gray-400 mb-1 flex items-center justify-center gap-1">
                                    <FaShieldAlt /> STATUS
                                </div>
                                <div className="text-green-400 font-bold">ACTIVE</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bio Data */}
            <div className="md:col-span-7">
                <div className="bg-surface/30 border-l-4 border-accent p-6 backdrop-blur-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-2 opacity-20">
                        <FaIdCard className="text-6xl text-accent" />
                    </div>

                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                        BIO_DATA_DECRYPTED
                    </h3>

                    <p className="text-gray-300 leading-relaxed font-mono text-sm md:text-base min-h-[150px]">
                        {decryptedText}
                    </p>
                </div>
            </div>
        </div>
    );
}
