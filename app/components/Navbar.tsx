"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';

const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Show navbar at top
            if (currentScrollY < 10) {
                setHidden(false);
                setScrolled(false);
            } else {
                setScrolled(true);
                // Hide on scroll down, show on scroll up
                if (currentScrollY > lastScrollY && currentScrollY > 100) {
                    setHidden(true);
                } else {
                    setHidden(false);
                }
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-500 flex justify-center ${hidden ? '-translate-y-full' : 'translate-y-0'
            } ${scrolled ? 'pt-4' : 'pt-6'}`}>
            <div className={`
                relative flex items-center justify-between px-6 py-3 
                transition-all duration-500 ease-out
                ${scrolled
                    ? 'w-[95%] md:w-[85%] rounded-full glass-panel shadow-[0_8px_30px_rgba(0,0,0,0.3)] border border-accent/20 backdrop-blur-2xl bg-black/40'
                    : 'w-full max-w-7xl bg-black/20 backdrop-blur-sm border-b border-white/5'}
            `}>
                <Link href="/" className="text-2xl font-bold tracking-wider group font-orbitron relative">
                    <span className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">JOY</span>
                    <span className="text-accent group-hover:text-accent-secondary transition-colors drop-shadow-[0_0_15px_var(--color-glow)]">DALAL</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-gray-300 hover:text-white transition-colors relative group"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full shadow-[0_0_10px_var(--color-accent)]" />
                        </a>
                    ))}

                    <div className="h-6 w-px bg-white/10 mx-2"></div>

                    {/* Icon Buttons */}
                    <button
                        onClick={() => window.dispatchEvent(new Event('open-command-palette'))}
                        className="p-2 text-gray-400 hover:text-accent transition-colors hover:bg-accent/10 rounded-lg"
                        title="Search (Ctrl+K)"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>

                    <a
                        href="/resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-2.5 text-sm font-bold text-black bg-white rounded-full hover:shadow-[0_0_20px_white] hover:scale-105 transition-all duration-300"
                    >
                        Resume
                    </a>
                </div>

                {/* Mobile Nav Toggle */}
                <button
                    className="md:hidden text-2xl text-white hover:text-accent transition-colors"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    {isOpen ? <FaTimes /> : <FaBars />}
                </button>

                {/* Mobile Nav Menu */}
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-full left-0 right-0 mt-4 mx-auto w-full bg-surface/95 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col items-center gap-6 md:hidden shadow-2xl"
                    >
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-lg font-medium text-gray-300 hover:text-accent transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </a>
                        ))}
                    </motion.div>
                )}
            </div>
        </nav>
    );
}
