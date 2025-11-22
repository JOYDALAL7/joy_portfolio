"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaNetworkWired, FaServer, FaShieldAlt, FaBolt } from "react-icons/fa";

export default function SystemMonitor() {
    const [networkActivity, setNetworkActivity] = useState<number[]>(Array(20).fill(0));
    const [encryptionLevel, setEncryptionLevel] = useState(100);
    const [serverLoad, setServerLoad] = useState(45);

    useEffect(() => {
        const interval = setInterval(() => {
            // Update network activity graph
            setNetworkActivity(prev => {
                const newValue = Math.floor(Math.random() * 100);
                return [...prev.slice(1), newValue];
            });

            // Fluctuate server load
            setServerLoad(prev => {
                const change = (Math.random() - 0.5) * 10;
                return Math.min(90, Math.max(20, prev + change));
            });

            // Encryption level mostly stable
            setEncryptionLevel(prev => Math.min(100, Math.max(98, prev + (Math.random() - 0.5))));
        }, 500);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full max-w-4xl mx-auto mb-12">
            <div className="bg-black/80 border border-white/10 rounded-xl p-1 backdrop-blur-md overflow-hidden">
                {/* Server Rack Header */}
                <div className="bg-white/5 px-4 py-2 flex justify-between items-center border-b border-white/10">
                    <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                            <div className="w-2 h-2 rounded-full bg-red-500/50" />
                            <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                            <div className="w-2 h-2 rounded-full bg-green-500/50" />
                        </div>
                        <span className="text-xs font-mono text-gray-400">SYS_MONITOR_V2.4</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-mono text-accent">
                        <span className="animate-pulse">● LIVE FEED</span>
                    </div>
                </div>

                <div className="p-6 grid md:grid-cols-3 gap-6">
                    {/* Network Graph */}
                    <div className="md:col-span-2 bg-black/50 border border-white/10 rounded-lg p-4 relative overflow-hidden">
                        <div className="absolute inset-0 bg-[linear-gradient(transparent_1px,_rgba(0,255,157,0.05)_1px)] bg-[size:100%_20px] pointer-events-none" />
                        <div className="flex justify-between items-center mb-4">
                            <h4 className="text-sm font-bold text-gray-300 flex items-center gap-2">
                                <FaNetworkWired className="text-accent" /> NETWORK TRAFFIC
                            </h4>
                            <span className="text-xs font-mono text-accent">1.2 GB/s</span>
                        </div>

                        <div className="h-32 flex items-end gap-1">
                            {networkActivity.map((value, i) => (
                                <motion.div
                                    key={i}
                                    className="flex-1 bg-accent/20 border-t border-accent/50"
                                    animate={{ height: `${value}%` }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <div className="w-full h-1 bg-accent shadow-[0_0_5px_var(--color-accent)]" />
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Status Modules */}
                    <div className="space-y-4">
                        {/* Encryption Status */}
                        <div className="bg-black/50 border border-white/10 rounded-lg p-4">
                            <div className="flex justify-between items-center mb-2">
                                <h4 className="text-xs font-bold text-gray-300 flex items-center gap-2">
                                    <FaShieldAlt className="text-green-400" /> ENCRYPTION
                                </h4>
                                <span className="text-xs font-mono text-green-400">{Math.round(encryptionLevel)}%</span>
                            </div>
                            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.5)]"
                                    animate={{ width: `${encryptionLevel}%` }}
                                />
                            </div>
                            <p className="text-[10px] text-gray-500 mt-2 font-mono">AES-256 • SECURE</p>
                        </div>

                        {/* Server Load */}
                        <div className="bg-black/50 border border-white/10 rounded-lg p-4">
                            <div className="flex justify-between items-center mb-2">
                                <h4 className="text-xs font-bold text-gray-300 flex items-center gap-2">
                                    <FaServer className="text-blue-400" /> SERVER LOAD
                                </h4>
                                <span className="text-xs font-mono text-blue-400">{Math.round(serverLoad)}%</span>
                            </div>
                            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.5)]"
                                    animate={{ width: `${serverLoad}%` }}
                                />
                            </div>
                            <p className="text-[10px] text-gray-500 mt-2 font-mono">OPTIMAL • 42ms LATENCY</p>
                        </div>

                        {/* Power Status */}
                        <div className="bg-black/50 border border-white/10 rounded-lg p-4 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <FaBolt className="text-yellow-400" />
                                <span className="text-xs font-bold text-gray-300">POWER</span>
                            </div>
                            <span className="text-xs font-mono text-yellow-400 animate-pulse">STABLE</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
