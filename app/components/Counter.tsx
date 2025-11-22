"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

interface CounterProps {
    end: number;
    duration?: number;
    suffix?: string;
    prefix?: string;
}

export default function Counter({ end, duration = 2, suffix = "", prefix = "" }: CounterProps) {
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);
    const counterRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (hasAnimated) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setHasAnimated(true);

                    const steps = 60;
                    const increment = end / steps;
                    let current = 0;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= end) {
                            setCount(end);
                            clearInterval(timer);
                        } else {
                            setCount(Math.floor(current));
                        }
                    }, (duration * 1000) / steps);

                    return () => clearInterval(timer);
                }
            },
            { threshold: 0.5 }
        );

        if (counterRef.current) {
            observer.observe(counterRef.current);
        }

        return () => observer.disconnect();
    }, [end, duration, hasAnimated]);

    return (
        <motion.span
            ref={counterRef}
            className="text-accent font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            {prefix}{count}{suffix}
        </motion.span>
    );
}
