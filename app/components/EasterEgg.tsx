"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function EasterEgg() {
    const [showSecret, setShowSecret] = useState(false);
    const [konami, setKonami] = useState<string[]>([]);

    // Konami code: ↑ ↑ ↓ ↓ ← → ← → B A
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

    useEffect(() => {
        // Add console message
        console.log('%c🚀 Hey there, developer!', 'color: #00ff9d; font-size: 20px; font-weight: bold;');
        console.log('%cTry the Konami code: ↑ ↑ ↓ ↓ ← → ← → B A', 'color: #00d4ff; font-size: 14px;');
        console.log('%cOr type: secret()', 'color: #a855f7; font-size: 14px;');

        // Add secret function to window
        (window as any).secret = () => {
            setShowSecret(true);
            console.log('%c🎉 Secret unlocked!', 'color: #ff0080; font-size: 24px; font-weight: bold;');
        };

        const handleKeyPress = (e: KeyboardEvent) => {
            const newKonami = [...konami, e.key].slice(-10);
            setKonami(newKonami);

            if (newKonami.join(',') === konamiCode.join(',')) {
                setShowSecret(true);
                setTimeout(() => setShowSecret(false), 5000);
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [konami]);

    return (
        <>
            {showSecret && (
                <motion.div
                    className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="bg-surface border-2 border-accent rounded-2xl p-12 shadow-[0_0_100px_var(--color-glow-strong)] max-w-md text-center"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", duration: 0.7 }}
                    >
                        <motion.div
                            className="text-8xl mb-4"
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 0.5, repeat: Infinity }}
                        >
                            🎮
                        </motion.div>
                        <h2 className="text-3xl font-bold text-accent mb-3">Easter Egg Found!</h2>
                        <p className="text-white text-lg mb-2">You discovered the secret!</p>
                        <p className="text-gray-400 text-sm">
                            You're awesome for exploring! 🎉
                        </p>
                        <motion.div
                            className="mt-6 grid grid-cols-3 gap-2"
                            variants={{
                                show: { transition: { staggerChildren: 0.1 } }
                            }}
                            initial="hidden"
                            animate="show"
                        >
                            {['🚀', '⭐', '💎', '🔥', '✨', '🎯'].map((emoji, i) => (
                                <motion.div
                                    key={i}
                                    className="text-4xl"
                                    variants={{
                                        hidden: { opacity: 0, y: 20 },
                                        show: { opacity: 1, y: 0 }
                                    }}
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                                >
                                    {emoji}
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}
        </>
    );
}
