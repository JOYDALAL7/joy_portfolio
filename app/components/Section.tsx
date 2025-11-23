"use client";

import { motion } from "framer-motion";
import React from 'react';

export default function Section({ id, title, children }: { id: string, title?: string, children: React.ReactNode }) {
    return (
        <section id={id} className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative group"
            >
                {/* Tech reveal decoration */}
                <div className="absolute -left-4 top-0 w-1 h-0 bg-accent group-hover:h-full transition-all duration-500" />

                {title && (
                    <h2 className="text-2xl md:text-5xl font-bold mb-12 text-center">
                        <span className="inline-block border-b-4 border-accent pb-3 leading-relaxed">{title}</span>
                    </h2>
                )}
                {children}
            </motion.div>
        </section>
    );
}
