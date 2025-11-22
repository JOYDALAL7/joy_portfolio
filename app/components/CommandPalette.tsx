"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaHome, FaUser, FaCode, FaBriefcase, FaProjectDiagram, FaGraduationCap, FaEnvelope, FaFileDownload, FaCopy, FaTerminal } from 'react-icons/fa';
import useSoundEffects from '../hooks/useSoundEffects';
import { useAchievements } from './AchievementPopup';

interface Command {
    id: string;
    name: string;
    icon: React.ReactNode;
    action: () => void;
    category: string;
    terminalCmd?: string;
}

export default function CommandPalette() {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [copied, setCopied] = useState(false);
    const [mode, setMode] = useState<'visual' | 'terminal'>('visual');
    const [terminalOutput, setTerminalOutput] = useState<string[]>(['Welcome to JoyOS Terminal v1.0.0', 'Type "help" for available commands.']);
    const [terminalInput, setTerminalInput] = useState('');

    const { playSound } = useSoundEffects();
    const { unlockAchievement } = useAchievements();
    const inputRef = useRef<HTMLInputElement>(null);
    const terminalEndRef = useRef<HTMLDivElement>(null);

    const commands: Command[] = [
        // Navigation
        { id: 'nav-home', name: 'Go to Home', icon: <FaHome />, category: 'Navigation', action: () => scrollToSection('home'), terminalCmd: 'goto home' },
        { id: 'nav-about', name: 'Go to About', icon: <FaUser />, category: 'Navigation', action: () => scrollToSection('about'), terminalCmd: 'goto about' },
        { id: 'nav-skills', name: 'Go to Skills', icon: <FaCode />, category: 'Navigation', action: () => scrollToSection('skills'), terminalCmd: 'goto skills' },
        { id: 'nav-experience', name: 'Go to Experience', icon: <FaBriefcase />, category: 'Navigation', action: () => scrollToSection('experience'), terminalCmd: 'goto experience' },
        { id: 'nav-projects', name: 'Go to Projects', icon: <FaProjectDiagram />, category: 'Navigation', action: () => scrollToSection('projects'), terminalCmd: 'goto projects' },
        { id: 'nav-education', name: 'Go to Education', icon: <FaGraduationCap />, category: 'Navigation', action: () => scrollToSection('education'), terminalCmd: 'goto education' },
        { id: 'nav-contact', name: 'Go to Contact', icon: <FaEnvelope />, category: 'Navigation', action: () => scrollToSection('contact'), terminalCmd: 'goto contact' },

        // Actions
        { id: 'copy-email', name: 'Copy Email Address', icon: <FaCopy />, category: 'Actions', action: () => copyEmail(), terminalCmd: 'copy email' },
        { id: 'download-resume', name: 'Download Resume', icon: <FaFileDownload />, category: 'Actions', action: () => window.open('/resume.pdf', '_blank'), terminalCmd: 'download resume' },

        // System
        { id: 'toggle-terminal', name: 'Switch to Terminal Mode', icon: <FaTerminal />, category: 'System', action: () => setMode('terminal'), terminalCmd: 'mode terminal' },
    ];

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setIsOpen(false);
            playSound('success');
        }
    };

    const copyEmail = () => {
        navigator.clipboard.writeText('djjoydalal2002@gmail.com');
        setCopied(true);
        playSound('success');
        setTimeout(() => {
            setCopied(false);
            setIsOpen(false);
        }, 1500);
    };

    const filteredCommands = commands.filter(cmd =>
        cmd.name.toLowerCase().includes(search.toLowerCase()) ||
        cmd.category.toLowerCase().includes(search.toLowerCase())
    );

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            setIsOpen(prev => !prev);
            playSound('click');
        }
        if (e.key === 'Escape') {
            setIsOpen(false);
        }
    }, [playSound]);

    useEffect(() => {
        const handleOpenEvent = () => {
            setIsOpen(true);
            playSound('click');
        };
        document.addEventListener('keydown', handleKeyDown);
        window.addEventListener('open-command-palette', handleOpenEvent);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('open-command-palette', handleOpenEvent);
        };
    }, [handleKeyDown, playSound]);

    // Terminal Logic
    const handleTerminalSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const input = terminalInput.trim().toLowerCase();
        if (!input) return;

        playSound('typing');
        setTerminalOutput(prev => [...prev, `> ${terminalInput}`]);
        setTerminalInput('');

        // Check for secret command
        if (input === 'sudo su') {
            setTerminalOutput(prev => [...prev, 'ACCESS GRANTED. Welcome, Admin.', 'Achievement Unlocked: Hacker']);
            unlockAchievement('hacker');
            playSound('success');
            return;
        }

        if (input === 'help') {
            setTerminalOutput(prev => [...prev,
                'Available commands:',
                '  goto [section] - Navigate to a section',
                '  copy email - Copy contact email',
                '  download resume - Get resume PDF',
                '  clear - Clear terminal',
                '  mode visual - Switch to visual mode',
                '  exit - Close terminal'
            ]);
            return;
        }

        if (input === 'clear') {
            setTerminalOutput([]);
            return;
        }

        if (input === 'mode visual') {
            setMode('visual');
            return;
        }

        if (input === 'exit') {
            setIsOpen(false);
            return;
        }

        // Find matching command
        const command = commands.find(cmd => cmd.terminalCmd === input || (cmd.terminalCmd && input.startsWith(cmd.terminalCmd.split(' ')[0]) && input.includes(cmd.terminalCmd.split(' ')[1])));

        if (command) {
            setTerminalOutput(prev => [...prev, `Executing: ${command.name}...`]);
            setTimeout(() => {
                command.action();
            }, 500);
        } else {
            setTerminalOutput(prev => [...prev, `Command not found: ${input}. Type "help" for list.`]);
            playSound('error');
        }
    };

    useEffect(() => {
        if (mode === 'terminal' && terminalEndRef.current) {
            terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [terminalOutput, mode]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Command Palette */}
                    <motion.div
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl z-50"
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ type: "spring", duration: 0.3 }}
                    >
                        <div className="bg-surface border border-accent/30 rounded-2xl shadow-[0_0_50px_var(--color-glow)] overflow-hidden flex flex-col max-h-[600px]">

                            {/* Header / Tabs */}
                            <div className="flex border-b border-white/10 bg-black/20">
                                <button
                                    onClick={() => { setMode('visual'); playSound('click'); }}
                                    className={`flex-1 py-3 text-sm font-medium transition-colors ${mode === 'visual' ? 'bg-accent/10 text-accent' : 'text-gray-400 hover:text-white'}`}
                                >
                                    Visual
                                </button>
                                <button
                                    onClick={() => { setMode('terminal'); playSound('click'); }}
                                    className={`flex-1 py-3 text-sm font-medium transition-colors ${mode === 'terminal' ? 'bg-accent/10 text-accent' : 'text-gray-400 hover:text-white'}`}
                                >
                                    Terminal
                                </button>
                            </div>

                            {mode === 'visual' ? (
                                <>
                                    {/* Search Input */}
                                    <div className="flex items-center gap-3 p-4 border-b border-white/10">
                                        <FaSearch className="text-accent text-lg" />
                                        <input
                                            type="text"
                                            placeholder="Type a command or search..."
                                            className="flex-1 bg-transparent text-white outline-none placeholder-gray-500 text-lg"
                                            value={search}
                                            onChange={(e) => { setSearch(e.target.value); playSound('typing'); }}
                                            autoFocus
                                        />
                                        <kbd className="px-2 py-1 text-xs bg-white/10 rounded">ESC</kbd>
                                    </div>

                                    {/* Commands List */}
                                    <div className="overflow-y-auto p-2 max-h-[400px]">
                                        {copied ? (
                                            <motion.div
                                                className="p-8 text-center"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                            >
                                                <div className="text-accent text-4xl mb-2">✓</div>
                                                <p className="text-white">Email copied to clipboard!</p>
                                            </motion.div>
                                        ) : filteredCommands.length > 0 ? (
                                            Object.entries(
                                                filteredCommands.reduce((acc, cmd) => {
                                                    if (!acc[cmd.category]) acc[cmd.category] = [];
                                                    acc[cmd.category].push(cmd);
                                                    return acc;
                                                }, {} as Record<string, Command[]>)
                                            ).map(([category, cmds]) => (
                                                <div key={category} className="mb-3">
                                                    <p className="text-xs text-gray-500 uppercase font-semibold px-3 py-2">{category}</p>
                                                    {cmds.map((cmd) => (
                                                        <motion.button
                                                            key={cmd.id}
                                                            className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-accent/10 transition-colors text-left group"
                                                            whileHover={{ x: 5 }}
                                                            onMouseEnter={() => playSound('hover')}
                                                            onClick={() => {
                                                                playSound('click');
                                                                cmd.action();
                                                            }}
                                                        >
                                                            <span className="text-accent text-lg">{cmd.icon}</span>
                                                            <span className="text-white group-hover:text-accent transition-colors">{cmd.name}</span>
                                                            {cmd.terminalCmd && <span className="ml-auto text-xs text-gray-600 font-mono hidden group-hover:inline-block">cmd: {cmd.terminalCmd}</span>}
                                                        </motion.button>
                                                    ))}
                                                </div>
                                            ))
                                        ) : (
                                            <div className="p-8 text-center text-gray-500">
                                                No commands found
                                            </div>
                                        )}
                                    </div>
                                </>
                            ) : (
                                /* Terminal Mode */
                                <div className="p-4 bg-black/80 font-mono text-sm h-[400px] flex flex-col" onClick={() => inputRef.current?.focus()}>
                                    <div className="flex-1 overflow-y-auto space-y-1 scrollbar-hide">
                                        {terminalOutput.map((line, i) => (
                                            <div key={i} className={`${line.startsWith('>') ? 'text-gray-400' : line.includes('Error') ? 'text-red-400' : line.includes('Success') || line.includes('Welcome') ? 'text-accent' : 'text-white'}`}>
                                                {line}
                                            </div>
                                        ))}
                                        <div ref={terminalEndRef} />
                                    </div>
                                    <form onSubmit={handleTerminalSubmit} className="mt-2 flex items-center gap-2 border-t border-white/10 pt-2">
                                        <span className="text-accent">{'>'}</span>
                                        <input
                                            ref={inputRef}
                                            type="text"
                                            value={terminalInput}
                                            onChange={(e) => setTerminalInput(e.target.value)}
                                            className="flex-1 bg-transparent outline-none text-white"
                                            autoFocus
                                            spellCheck={false}
                                        />
                                    </form>
                                </div>
                            )}

                            {/* Footer */}
                            <div className="flex items-center justify-between p-3 border-t border-white/10 text-xs text-gray-500 bg-black/20">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-1">
                                        <kbd className="px-2 py-1 bg-white/10 rounded">↑</kbd>
                                        <kbd className="px-2 py-1 bg-white/10 rounded">↓</kbd>
                                        <span>Navigate</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <kbd className="px-2 py-1 bg-white/10 rounded">↵</kbd>
                                        <span>Select</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1">
                                    <kbd className="px-2 py-1 bg-white/10 rounded">Ctrl</kbd>
                                    <span>+</span>
                                    <kbd className="px-2 py-1 bg-white/10 rounded">K</kbd>
                                    <span>to toggle</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
