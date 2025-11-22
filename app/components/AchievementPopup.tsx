"use client";

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrophy } from 'react-icons/fa';
import useSoundEffects from '../hooks/useSoundEffects';

interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: string;
}

const achievementsList: Achievement[] = [
    { id: 'explorer', title: 'Explorer', description: 'Visited every section', icon: '🗺️' },
    { id: 'night_owl', title: 'Night Owl', description: 'Switched to a dark theme', icon: '🦉' },
    { id: 'hacker', title: 'Hacker', description: 'Found the secret terminal command', icon: '💻' },
    { id: 'scroll_master', title: 'Scroll Master', description: 'Reached the bottom of the page', icon: '📜' },
    { id: 'click_frenzy', title: 'Click Frenzy', description: 'Clicked 50 times', icon: '🖱️' },
];

interface AchievementContextType {
    unlockAchievement: (id: string) => void;
    unlocked: string[];
}

const AchievementContext = createContext<AchievementContextType | undefined>(undefined);

export function AchievementProvider({ children }: { children: ReactNode }) {
    const [unlocked, setUnlocked] = useState<string[]>([]);
    const [queue, setQueue] = useState<Achievement[]>([]);
    const { playSound } = useSoundEffects();

    useEffect(() => {
        const saved = localStorage.getItem('achievements');
        if (saved) {
            setUnlocked(JSON.parse(saved));
        }
    }, []);

    const unlockAchievement = (id: string) => {
        if (unlocked.includes(id)) return;

        const achievement = achievementsList.find(a => a.id === id);
        if (achievement) {
            const newUnlocked = [...unlocked, id];
            setUnlocked(newUnlocked);
            localStorage.setItem('achievements', JSON.stringify(newUnlocked));
            setQueue(prev => [...prev, achievement]);
            playSound('success');
        }
    };

    const removeNotification = (id: string) => {
        setQueue(prev => prev.filter(a => a.id !== id));
    };

    return (
        <AchievementContext.Provider value={{ unlockAchievement, unlocked }}>
            {children}
            <div className="fixed bottom-4 left-4 z-50 flex flex-col gap-2 pointer-events-none">
                <AnimatePresence>
                    {queue.map((achievement) => (
                        <AchievementNotification
                            key={achievement.id}
                            achievement={achievement}
                            onClose={() => removeNotification(achievement.id)}
                        />
                    ))}
                </AnimatePresence>
            </div>
        </AchievementContext.Provider>
    );
}

function AchievementNotification({ achievement, onClose }: { achievement: Achievement, onClose: () => void }) {
    useEffect(() => {
        const timer = setTimeout(onClose, 4000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <motion.div
            initial={{ opacity: 0, x: -50, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50, scale: 0.8 }}
            className="bg-surface border border-accent/50 rounded-lg p-4 shadow-[0_0_20px_var(--color-glow)] flex items-center gap-4 w-80 pointer-events-auto backdrop-blur-md"
        >
            <div className="text-3xl">{achievement.icon}</div>
            <div>
                <h4 className="text-accent font-bold text-sm flex items-center gap-2">
                    <FaTrophy className="text-yellow-400" />
                    Achievement Unlocked!
                </h4>
                <p className="text-white font-bold">{achievement.title}</p>
                <p className="text-gray-400 text-xs">{achievement.description}</p>
            </div>
        </motion.div>
    );
}

export function useAchievements() {
    const context = useContext(AchievementContext);
    if (!context) {
        throw new Error('useAchievements must be used within an AchievementProvider');
    }
    return context;
}
