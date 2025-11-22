"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';

interface ProjectFiltersProps {
    activeFilters: string[];
    onFilterChange: (filters: string[]) => void;
}

export default function ProjectFilters({ activeFilters, onFilterChange }: ProjectFiltersProps) {

    const allTags = ['AI', 'Security', 'API', 'Dashboard', 'Real-time', 'Performance', 'All'];

    const toggleFilter = (tag: string) => {
        if (tag === 'All') {
            onFilterChange([]);
            return;
        }

        const newFilters = activeFilters.includes(tag)
            ? activeFilters.filter(t => t !== tag)
            : [...activeFilters, tag];

        onFilterChange(newFilters);
    };

    return (
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
            {allTags.map((tag) => (
                <motion.button
                    key={tag}
                    onClick={() => toggleFilter(tag)}
                    className={`px-4 py-2 rounded-full font-medium transition-all ${tag === 'All' && activeFilters.length === 0
                        ? 'bg-accent text-black shadow-[0_0_20px_var(--color-glow)]'
                        : activeFilters.includes(tag)
                            ? 'bg-accent text-black shadow-[0_0_20px_var(--color-glow)]'
                            : 'bg-surface/50 text-gray-400 border border-white/10 hover:border-accent/50'
                        }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {tag}
                </motion.button>
            ))}
        </div>
    );
}
