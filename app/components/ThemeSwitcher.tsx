"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCog } from 'react-icons/fa';

const themes = [
    {
        name: 'Cyber Green',
        primary: '#00ff9d',
        secondary: '#00d97e',
        gradient: 'from-green-400 to-cyan-500',
        bg: '#0a0a0a',
        surface: '#121212',
        glow: 'rgba(0, 255, 157, 0.3)',
        glowStrong: 'rgba(0, 255, 157, 0.5)'
    },
    {
        name: 'Electric Blue',
        primary: '#00d4ff',
        secondary: '#0099ff',
        gradient: 'from-blue-400 to-cyan-500',
        bg: '#0a0e1a',
        surface: '#121620',
        glow: 'rgba(0, 212, 255, 0.3)',
        glowStrong: 'rgba(0, 212, 255, 0.5)'
    },
    {
        name: 'Purple Haze',
        primary: '#a855f7',
        secondary: '#8b5cf6',
        gradient: 'from-purple-400 to-pink-500',
        bg: '#0f0a1a',
        surface: '#1a1225',
        glow: 'rgba(168, 85, 247, 0.3)',
        glowStrong: 'rgba(168, 85, 247, 0.5)'
    },
    {
        name: 'Pink Neon',
        primary: '#ff0080',
        secondary: '#ff1493',
        gradient: 'from-pink-400 to-rose-500',
        bg: '#1a0a14',
        surface: '#20121a',
        glow: 'rgba(255, 0, 128, 0.3)',
        glowStrong: 'rgba(255, 0, 128, 0.5)'
    },
    {
        name: 'Orange Glow',
        primary: '#ff6b35',
        secondary: '#ff8c42',
        gradient: 'from-orange-400 to-red-500',
        bg: '#1a0f0a',
        surface: '#201612',
        glow: 'rgba(255, 107, 53, 0.3)',
        glowStrong: 'rgba(255, 107, 53, 0.5)'
    },
];

export default function ThemeSwitcher() {
    const [isOpen, setIsOpen] = useState(false);
    const [currentTheme, setCurrentTheme] = useState(0);

    const applyTheme = (index: number) => {
        if (index < 0 || index >= themes.length) return;

        const theme = themes[index];
        if (!theme) return;

        // Apply all theme properties including glow effects
        document.documentElement.style.setProperty('--color-accent', theme.primary);
        document.documentElement.style.setProperty('--color-accent-secondary', theme.secondary);
        document.documentElement.style.setProperty('--color-bg', theme.bg);
        document.documentElement.style.setProperty('--color-surface', theme.surface);
        document.documentElement.style.setProperty('--color-glow', theme.glow);
        document.documentElement.style.setProperty('--color-glow-strong', theme.glowStrong);
        document.documentElement.style.setProperty('--color-particle', theme.primary);

        document.body.style.backgroundColor = theme.bg;

        setCurrentTheme(index);
        localStorage.setItem('theme', index.toString());
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            const themeIndex = parseInt(savedTheme);
            if (!isNaN(themeIndex) && themeIndex >= 0 && themeIndex < themes.length) {
                applyTheme(themeIndex);
            }
        }
    }, []);

    return (
        <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-40">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="absolute bottom-16 md:bottom-20 right-0 bg-black/90 border border-accent/30 rounded-xl overflow-hidden backdrop-blur-xl min-w-[240px] max-h-[60vh] md:max-h-none overflow-y-auto"
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    >
                        {/* Scanline Effect */}
                        <div className="absolute inset-0 bg-[linear-gradient(transparent_2px,_rgba(0,255,157,0.05)_2px)] bg-[size:100%_4px] pointer-events-none" />

                        {/* Header */}
                        <div className="relative px-4 py-3 border-b border-white/10 bg-white/5">
                            <div className="flex items-center gap-2">
                                <div className="flex gap-1">
                                    <div className="w-2 h-2 rounded-full bg-red-500/50" />
                                    <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                                    <div className="w-2 h-2 rounded-full bg-green-500/50" />
                                </div>
                                <span className="text-xs font-mono text-gray-400">theme.config</span>
                            </div>
                        </div>

                        {/* Theme List */}
                        <div className="relative p-3 space-y-2">
                            {themes.map((theme, index) => (
                                <motion.button
                                    key={theme.name}
                                    onClick={() => {
                                        applyTheme(index);
                                        setIsOpen(false);
                                    }}
                                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all relative overflow-hidden ${currentTheme === index
                                        ? 'bg-accent/10 border border-accent/50'
                                        : 'hover:bg-white/5 border border-white/10'
                                        }`}
                                    whileHover={{ x: 3 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {/* Hex Badge */}
                                    <svg width="20" height="20" viewBox="0 0 20 20" className="flex-shrink-0">
                                        <path
                                            d="M10 2 L17 6 L17 14 L10 18 L3 14 L3 6 Z"
                                            fill={theme.primary}
                                            opacity="0.2"
                                            stroke={theme.primary}
                                            strokeWidth="1"
                                        />
                                        <circle cx="10" cy="10" r="3" fill={theme.primary} />
                                    </svg>

                                    <div className="flex-1 text-left">
                                        <div className="text-white text-sm font-medium">{theme.name}</div>
                                        <div className="text-xs font-mono text-gray-500">{theme.primary}</div>
                                    </div>

                                    {currentTheme === index && (
                                        <div className="text-accent text-xs">✓</div>
                                    )}
                                </motion.button>
                            ))}
                        </div>

                        {/* Footer */}
                        <div className="relative px-4 py-2 border-t border-white/10 bg-white/5">
                            <div className="text-[10px] font-mono text-gray-500 flex items-center gap-2">
                                <span className="text-accent">▸</span> {themes.length} themes loaded
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="relative group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                {/* Glow Effect */}
                <div className="absolute -inset-2 bg-accent/40 rounded-2xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity animate-pulse" />

                {/* Button */}
                <div className="relative bg-gradient-to-br from-accent/20 to-accent/10 border-2 border-accent/50 rounded-2xl px-3 py-2.5 md:px-5 md:py-3.5 backdrop-blur-md hover:border-accent transition-all shadow-[0_0_20px_var(--color-glow)]">
                    <div className="flex items-center gap-2 md:gap-3">
                        <motion.div
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.4, type: "spring" }}
                        >
                            <FaCog className="text-accent text-xl md:text-2xl drop-shadow-[0_0_8px_var(--color-glow)]" />
                        </motion.div>
                        <span className="text-xs md:text-sm font-mono font-bold text-accent">THEME</span>
                    </div>
                </div>
            </motion.button>
        </div>
    );
}
