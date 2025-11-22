"use client";

import { useCallback, useRef, useEffect } from 'react';

// Simple synthesized sounds using Web Audio API to avoid external assets
// This keeps the app lightweight and fast
export default function useSoundEffects() {
    const audioContextRef = useRef<AudioContext | null>(null);
    const gainNodeRef = useRef<GainNode | null>(null);

    useEffect(() => {
        // Initialize audio context on first user interaction to respect autoplay policies
        const initAudio = () => {
            if (!audioContextRef.current) {
                const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
                if (AudioContextClass) {
                    audioContextRef.current = new AudioContextClass();
                    gainNodeRef.current = audioContextRef.current.createGain();
                    gainNodeRef.current.connect(audioContextRef.current.destination);
                    // Set volume low by default
                    gainNodeRef.current.gain.value = 0.1;
                }
            }
        };

        window.addEventListener('click', initAudio, { once: true });
        window.addEventListener('keydown', initAudio, { once: true });

        return () => {
            if (audioContextRef.current) {
                audioContextRef.current.close();
            }
        };
    }, []);

    const playSound = useCallback((type: 'hover' | 'click' | 'success' | 'error' | 'typing') => {
        if (!audioContextRef.current || !gainNodeRef.current) return;

        // Resume context if suspended (browser policy)
        if (audioContextRef.current.state === 'suspended') {
            audioContextRef.current.resume();
        }

        const ctx = audioContextRef.current;
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(gainNodeRef.current!);

        const now = ctx.currentTime;

        switch (type) {
            case 'hover':
                // High pitch short blip
                oscillator.type = 'sine';
                oscillator.frequency.setValueAtTime(800, now);
                oscillator.frequency.exponentialRampToValueAtTime(1200, now + 0.05);
                gainNode.gain.setValueAtTime(0.05, now);
                gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
                oscillator.start(now);
                oscillator.stop(now + 0.05);
                break;

            case 'click':
                // Mechanical click sound
                oscillator.type = 'square';
                oscillator.frequency.setValueAtTime(300, now);
                oscillator.frequency.exponentialRampToValueAtTime(100, now + 0.1);
                gainNode.gain.setValueAtTime(0.1, now);
                gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
                oscillator.start(now);
                oscillator.stop(now + 0.1);
                break;

            case 'success':
                // Ascending chime
                oscillator.type = 'sine';
                oscillator.frequency.setValueAtTime(400, now);
                oscillator.frequency.linearRampToValueAtTime(800, now + 0.1);
                oscillator.frequency.linearRampToValueAtTime(1200, now + 0.2);
                gainNode.gain.setValueAtTime(0.1, now);
                gainNode.gain.linearRampToValueAtTime(0.1, now + 0.1);
                gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
                oscillator.start(now);
                oscillator.stop(now + 0.4);
                break;

            case 'error':
                // Low buzz
                oscillator.type = 'sawtooth';
                oscillator.frequency.setValueAtTime(150, now);
                oscillator.frequency.linearRampToValueAtTime(100, now + 0.2);
                gainNode.gain.setValueAtTime(0.1, now);
                gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
                oscillator.start(now);
                oscillator.stop(now + 0.3);
                break;

            case 'typing':
                // Soft keypress
                oscillator.type = 'triangle';
                oscillator.frequency.setValueAtTime(600, now);
                gainNode.gain.setValueAtTime(0.03, now);
                gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
                oscillator.start(now);
                oscillator.stop(now + 0.03);
                break;
        }
    }, []);

    return { playSound };
}
