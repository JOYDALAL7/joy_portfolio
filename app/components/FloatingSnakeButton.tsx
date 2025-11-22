"use client";

import { motion } from "framer-motion";
import { FaGamepad } from "react-icons/fa";

export default function FloatingSnakeButton() {
    return (
        <motion.button
            onClick={() => window.dispatchEvent(new CustomEvent('open-snake-game'))}
            className="fixed bottom-8 left-8 z-50 group"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
        >
            {/* Strong Glow Effect */}
            <div className="absolute inset-0 bg-accent/60 rounded-2xl blur-2xl animate-pulse" />

            {/* Button Card */}
            <div className="relative bg-accent px-5 py-4 rounded-2xl shadow-[0_8px_30px_var(--color-glow)] hover:shadow-[0_12px_40px_var(--color-glow)] border-4 border-white/30 transition-all">
                <div className="flex items-center gap-3">
                    <div className="bg-black/20 p-2.5 rounded-xl">
                        <FaGamepad className="text-3xl text-white drop-shadow-lg" />
                    </div>
                    <div className="text-left">
                        <div className="text-white font-bold text-base leading-tight drop-shadow-md">Release Stress</div>
                        <div className="text-white/80 text-xs font-medium">Play Snake</div>
                    </div>
                </div>
            </div>

            {/* Pulse Ring */}
            <motion.div
                className="absolute inset-0 rounded-2xl border-4 border-accent"
                animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.5, 0, 0.5]
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
        </motion.button>
    );
}
