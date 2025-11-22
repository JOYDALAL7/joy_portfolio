"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTerminal, FaTimes } from "react-icons/fa";

const CODE_SNIPPET = `
// Injecting payload into mainframe...
const target = "SECURE_SERVER_V4";
const protocol = "SSH_TUNNEL";

async function bypassFirewall(target) {
    console.log("Initiating handshake...");
    await establishConnection(target);
    
    const vulnerabilities = scanPorts(target);
    if (vulnerabilities.length > 0) {
        console.log("Vulnerability found: PORT 8080");
        injectExploit("BUFFER_OVERFLOW");
    } else {
        console.warn("System hardened. Switching to brute force...");
        bruteForce("admin", "dictionary.txt");
    }
}

class CyberAttack extends ThreatVector {
    constructor(target) {
        super(target);
        this.stealthMode = true;
    }

    execute() {
        this.bypassFirewall();
        this.deployRootkit();
        return "ACCESS GRANTED";
    }
}

// Decrypting user data...
// 10% ... 40% ... 90% ...
// COMPLETE.
`;

export default function HackerTyper() {
    const [isOpen, setIsOpen] = useState(false);
    const [text, setText] = useState("");
    const [index, setIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleOpen = () => setIsOpen(true);
        window.addEventListener('open-hacker-typer', handleOpen);
        return () => window.removeEventListener('open-hacker-typer', handleOpen);
    }, []);

    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setIsOpen(false);
                return;
            }

            // Add 3 characters per keystroke for faster typing feel
            const nextIndex = Math.min(index + 3, CODE_SNIPPET.length);
            setText(CODE_SNIPPET.substring(0, nextIndex));
            setIndex(nextIndex);

            // Auto scroll to bottom
            if (containerRef.current) {
                containerRef.current.scrollTop = containerRef.current.scrollHeight;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, index]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4"
                >
                    <div className="w-full max-w-4xl bg-black border border-green-500/50 rounded-lg shadow-[0_0_50px_rgba(0,255,0,0.2)] overflow-hidden flex flex-col h-[80vh]">
                        {/* Header */}
                        <div className="bg-green-900/20 border-b border-green-500/30 p-3 flex justify-between items-center">
                            <div className="flex items-center gap-2 text-green-400 font-mono">
                                <FaTerminal />
                                <span>ROOT_ACCESS_TERMINAL</span>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-green-500 hover:text-white transition-colors"
                            >
                                <FaTimes />
                            </button>
                        </div>

                        {/* Terminal Body */}
                        <div
                            ref={containerRef}
                            className="flex-1 p-6 font-mono text-green-500 overflow-y-auto whitespace-pre-wrap"
                        >
                            {text}
                            <motion.span
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ duration: 0.8, repeat: Infinity }}
                                className="inline-block w-3 h-5 bg-green-500 ml-1 align-middle"
                            />
                        </div>

                        {/* Footer */}
                        <div className="bg-green-900/10 p-2 text-xs text-green-600 font-mono text-center border-t border-green-500/20">
                            PRESS ANY KEY TO INJECT CODE...
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
