"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTrophy, FaTimes, FaChevronUp, FaChevronDown, FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function SnakeGame() {
    const [isOpen, setIsOpen] = useState(false);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
    const [food, setFood] = useState({ x: 15, y: 15 });
    const [direction, setDirection] = useState({ x: 0, y: 0 });
    const [isTouchDevice, setIsTouchDevice] = useState(false);
    const touchStartRef = useRef({ x: 0, y: 0 });

    // Konami Code Logic
    useEffect(() => {
        const konamiCode = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
        let cursor = 0;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === konamiCode[cursor]) {
                cursor++;
                if (cursor === konamiCode.length) {
                    setIsOpen(true);
                    cursor = 0;
                }
            } else {
                cursor = 0;
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        const handleOpenEvent = () => setIsOpen(true);
        window.addEventListener('open-snake-game', handleOpenEvent);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener('open-snake-game', handleOpenEvent);
        };
    }, []);

    // Game Logic
    useEffect(() => {
        if (!isOpen || gameOver || (direction.x === 0 && direction.y === 0)) return;

        const moveSnake = () => {
            const newSnake = [...snake];
            const head = { x: newSnake[0].x + direction.x, y: newSnake[0].y + direction.y };

            if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20 || newSnake.some(s => s.x === head.x && s.y === head.y)) {
                setGameOver(true);
                return;
            }

            newSnake.unshift(head);

            if (head.x === food.x && head.y === food.y) {
                setScore(s => s + 1);
                setFood({
                    x: Math.floor(Math.random() * 20),
                    y: Math.floor(Math.random() * 20)
                });
            } else {
                newSnake.pop();
            }

            setSnake(newSnake);
        };

        const interval = setInterval(moveSnake, 150);
        return () => clearInterval(interval);
    }, [isOpen, snake, direction, gameOver, food]);

    // Controls
    useEffect(() => {
        if (!isOpen) return;
        const handleControls = (e: KeyboardEvent) => {
            switch (e.key) {
                case "ArrowUp": if (direction.y === 0) setDirection({ x: 0, y: -1 }); break;
                case "ArrowDown": if (direction.y === 0) setDirection({ x: 0, y: 1 }); break;
                case "ArrowLeft": if (direction.x === 0) setDirection({ x: -1, y: 0 }); break;
                case "ArrowRight": if (direction.x === 0) setDirection({ x: 1, y: 0 }); break;
                case "Escape": setIsOpen(false); break;
            }
        };
        window.addEventListener("keydown", handleControls);
        return () => window.removeEventListener("keydown", handleControls);
    }, [isOpen, direction]);

    // Touch controls
    useEffect(() => {
        setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    }, []);

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartRef.current = {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY
        };
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (!isOpen || gameOver) return;

        const touchEnd = {
            x: e.changedTouches[0].clientX,
            y: e.changedTouches[0].clientY
        };

        const dx = touchEnd.x - touchStartRef.current.x;
        const dy = touchEnd.y - touchStartRef.current.y;
        const absDx = Math.abs(dx);
        const absDy = Math.abs(dy);

        // Minimum swipe distance
        if (absDx < 30 && absDy < 30) return;

        // Determine swipe direction
        if (absDx > absDy) {
            // Horizontal swipe
            if (dx > 0 && direction.x === 0) {
                setDirection({ x: 1, y: 0 }); // Right
            } else if (dx < 0 && direction.x === 0) {
                setDirection({ x: -1, y: 0 }); // Left
            }
        } else {
            // Vertical swipe
            if (dy > 0 && direction.y === 0) {
                setDirection({ x: 0, y: 1 }); // Down
            } else if (dy < 0 && direction.y === 0) {
                setDirection({ x: 0, y: -1 }); // Up
            }
        }
    };

    const handleDirectionButton = (newDirection: { x: number, y: number }) => {
        if (gameOver) return;
        if (newDirection.x !== 0 && direction.x === 0) {
            setDirection(newDirection);
        } else if (newDirection.y !== 0 && direction.y === 0) {
            setDirection(newDirection);
        }
    };

    const resetGame = () => {
        setSnake([{ x: 10, y: 10 }]);
        setScore(0);
        setGameOver(false);
        setDirection({ x: 0, y: 0 });
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[70] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
                >
                    <div className="bg-black/90 border border-accent/30 rounded-xl w-full max-w-md relative overflow-hidden backdrop-blur-xl">
                        {/* Scanline Effect */}
                        <div className="absolute inset-0 bg-[linear-gradient(transparent_2px,_rgba(0,255,157,0.05)_2px)] bg-[size:100%_4px] pointer-events-none z-10" />

                        {/* Header */}
                        <div className="relative px-6 py-4 border-b border-white/10 bg-white/5">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="flex gap-1.5">
                                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                                    </div>
                                    <span className="text-xs font-mono text-gray-400">~/games/snake.exe</span>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    <FaTimes />
                                </button>
                            </div>
                        </div>

                        {/* Game Info */}
                        <div className="relative px-6 py-3 border-b border-white/10 bg-black/40">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <FaTrophy className="text-yellow-400 text-sm" />
                                    <span className="text-yellow-400 font-mono font-bold">{score}</span>
                                </div>
                                <div className="text-xs font-mono text-gray-500">
                                    <span className="text-accent">▸</span> LEVEL {Math.floor(score / 5) + 1}
                                </div>
                            </div>
                        </div>

                        {/* Game Board */}
                        <div className="relative p-6">
                            <div
                                className="relative aspect-square bg-black/90 border-2 border-accent/30 rounded-lg overflow-hidden grid grid-cols-[repeat(20,1fr)] grid-rows-[repeat(20,1fr)] gap-[2px] bg-white/5"
                                onTouchStart={handleTouchStart}
                                onTouchEnd={handleTouchEnd}
                            >
                                {/* Snake Segments */}
                                {snake.map((segment, i) => (
                                    <div
                                        key={i}
                                        className={`m-0.5 rounded transition-all ${i === 0
                                            ? 'bg-accent shadow-[0_0_20px_var(--color-glow)] border-2 border-accent/80'
                                            : 'bg-accent/90 border border-accent/40'
                                            }`}
                                        style={{
                                            gridColumnStart: segment.x + 1,
                                            gridRowStart: segment.y + 1
                                        }}
                                    />
                                ))}

                                {/* Food (Hexagon) */}
                                <div
                                    className="flex items-center justify-center p-1"
                                    style={{
                                        gridColumnStart: food.x + 1,
                                        gridRowStart: food.y + 1
                                    }}
                                >
                                    <svg width="100%" height="100%" viewBox="0 0 20 20" className="drop-shadow-[0_0_15px_rgba(255,0,128,1)]">
                                        <path
                                            d="M10 2 L17 6 L17 14 L10 18 L3 14 L3 6 Z"
                                            fill="#ff0080"
                                            stroke="#ff1493"
                                            strokeWidth="2"
                                            className="animate-pulse"
                                        />
                                    </svg>
                                </div>

                                {/* Game Over Overlay */}
                                {gameOver && (
                                    <div className="absolute inset-0 bg-black/95 flex flex-col items-center justify-center backdrop-blur-md z-20 border-2 border-red-500/30 rounded-lg">
                                        <div className="text-center space-y-6 p-6">
                                            <h3 className="text-4xl font-bold text-red-500 font-mono drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]">GAME OVER</h3>
                                            <div className="text-gray-300 font-mono space-y-2">
                                                <div className="text-sm text-gray-500">FINAL SCORE</div>
                                                <div className="text-4xl text-accent font-bold">{score}</div>
                                            </div>
                                            <button
                                                onClick={resetGame}
                                                className="px-10 py-5 bg-accent text-white font-bold text-xl rounded-lg hover:bg-accent/90 active:scale-95 transition-all shadow-[0_0_40px_var(--color-glow)] border-4 border-accent"
                                            >
                                                RESTART GAME
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Start Message */}
                            {!direction.x && !direction.y && !gameOver && (
                                <div className="mt-4 text-center">
                                    <p className="text-accent/60 text-sm font-mono animate-pulse">
                                        <span className="text-accent">▸</span> {isTouchDevice ? 'Swipe or tap buttons to start' : 'Press any arrow key to start'}
                                    </p>
                                </div>
                            )}

                            {/* Mobile Touch Controls */}
                            {isTouchDevice && (
                                <div className="mt-6 flex flex-col items-center gap-2">
                                    <button
                                        onClick={() => handleDirectionButton({ x: 0, y: -1 })}
                                        className="p-3 bg-accent/20 border-2 border-accent/50 rounded-lg active:bg-accent/40 transition-all active:scale-95"
                                    >
                                        <FaChevronUp className="text-accent text-xl" />
                                    </button>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleDirectionButton({ x: -1, y: 0 })}
                                            className="p-3 bg-accent/20 border-2 border-accent/50 rounded-lg active:bg-accent/40 transition-all active:scale-95"
                                        >
                                            <FaChevronLeft className="text-accent text-xl" />
                                        </button>
                                        <button
                                            onClick={() => handleDirectionButton({ x: 0, y: 1 })}
                                            className="p-3 bg-accent/20 border-2 border-accent/50 rounded-lg active:bg-accent/40 transition-all active:scale-95"
                                        >
                                            <FaChevronDown className="text-accent text-xl" />
                                        </button>
                                        <button
                                            onClick={() => handleDirectionButton({ x: 1, y: 0 })}
                                            className="p-3 bg-accent/20 border-2 border-accent/50 rounded-lg active:bg-accent/40 transition-all active:scale-95"
                                        >
                                            <FaChevronRight className="text-accent text-xl" />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Footer Controls */}
                        <div className="relative px-6 py-4 border-t border-white/10 bg-white/5">
                            <div className="grid grid-cols-3 gap-2 text-xs font-mono text-gray-500 text-center">
                                <div><span className="text-accent">{isTouchDevice ? '👆' : '↑↓←→'}</span> Move</div>
                                <div><span className="text-accent">ESC</span> Close</div>
                                <div><span className="text-accent">Score</span> {score}</div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
