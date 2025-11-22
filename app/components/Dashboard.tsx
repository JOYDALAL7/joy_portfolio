"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaServer, FaUserSecret, FaGlobe, FaClock, FaMicrochip, FaMemory, FaGamepad } from "react-icons/fa";

export default function Dashboard() {
    const [uptime, setUptime] = useState(0);
    const [visitors, setVisitors] = useState(1240);
    const [memory, setMemory] = useState(42);
    const [cpu, setCpu] = useState(12);
    const [glitch, setGlitch] = useState(false);
    const [apiResponse, setApiResponse] = useState(45);
    const [connections, setConnections] = useState(127);

    useEffect(() => {
        const interval = setInterval(() => {
            setUptime(prev => prev + 1);
            setVisitors(prev => prev + (Math.random() > 0.7 ? 1 : 0));
            setMemory(prev => Math.min(90, Math.max(20, prev + (Math.random() - 0.5) * 5)));
            setCpu(prev => Math.min(100, Math.max(5, prev + (Math.random() - 0.5) * 10)));
            setApiResponse(prev => Math.min(200, Math.max(20, prev + (Math.random() - 0.5) * 15)));
            setConnections(prev => Math.min(500, Math.max(50, prev + (Math.random() - 0.5) * 20)));

            // Random glitch trigger
            if (Math.random() > 0.9) {
                setGlitch(true);
                setTimeout(() => setGlitch(false), 150);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const formatTime = (seconds: number) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const stats = [
        { icon: <FaClock />, label: "Session Uptime", value: formatTime(uptime), color: "text-accent" },
        { icon: <FaUserSecret />, label: "Active Connections", value: connections.toFixed(0), color: "text-blue-400" },
        { icon: <FaServer />, label: "API Response", value: `${apiResponse.toFixed(0)}ms`, color: "text-purple-400" },
        { icon: <FaGlobe />, label: "Deployment", value: "LIVE", color: "text-green-400" }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
                <motion.div
                    key={index}
                    className="relative group"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-accent/20 to-blue-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
                    <div className="relative bg-black/60 border border-white/10 p-6 rounded-xl backdrop-blur-md overflow-hidden">
                        {/* Scanline */}
                        <div className="absolute inset-0 bg-[linear-gradient(transparent_2px,_rgba(0,0,0,0.5)_2px)] bg-[size:100%_4px] pointer-events-none opacity-20" />

                        <div className="flex items-center gap-4 relative z-10">
                            <div className={`p-3 rounded-lg bg-white/5 ${stat.color} shadow-[0_0_15px_rgba(0,255,157,0.1)]`}>
                                {stat.icon}
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 uppercase tracking-wider font-mono mb-1">{stat.label}</p>
                                <div className="relative">
                                    <p className={`text-xl font-mono font-bold ${stat.color} ${glitch && index === 1 ? 'translate-x-[2px] opacity-80' : ''}`}>
                                        {stat.value}
                                    </p>
                                    {glitch && index === 1 && (
                                        <p className={`absolute top-0 left-0 text-xl font-mono font-bold text-red-500 -translate-x-[2px] opacity-50`}>
                                            {stat.value}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            ))}

            {/* Performance Metrics */}
            <motion.div
                className="col-span-1 md:col-span-2 lg:col-span-4 relative bg-black/60 border border-white/10 rounded-xl p-6 mt-4 backdrop-blur-md overflow-hidden"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
            >
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px]" />

                <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center justify-center">
                    <CircularProgress value={cpu} label="CPU Load" icon={<FaMicrochip />} color="#3b82f6" />
                    <CircularProgress value={memory} label="Memory" icon={<FaMemory />} color="#a855f7" />
                </div>
            </motion.div>
        </div>
    );
}

function CircularProgress({ value, label, icon, color }: { value: number, label: string, icon: React.ReactNode, color: string }) {
    const circumference = 2 * Math.PI * 40;
    const strokeDashoffset = circumference - (value / 100) * circumference;

    return (
        <div className="flex items-center gap-4">
            <div className="relative w-24 h-24 flex items-center justify-center">
                {/* Background Circle */}
                <svg className="w-full h-full transform -rotate-90">
                    <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="8"
                        fill="transparent"
                    />
                    <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke={color}
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        className="transition-all duration-500 ease-out"
                        style={{ filter: `drop-shadow(0 0 5px ${color})` }}
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-xl font-mono font-bold text-white">
                    {Math.round(value)}%
                </div>
            </div>
            <div>
                <div className="text-2xl mb-1" style={{ color }}>{icon}</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider font-mono">{label}</div>
            </div>
        </div>
    );
}
