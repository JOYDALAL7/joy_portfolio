"use client";

import { useEffect, useRef } from "react";

export default function Background3D() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;

        canvas.width = width;
        canvas.height = height;

        const particles: Particle[] = [];
        const particleCount = Math.min(Math.floor(width * height / 15000), 100);
        const connectionDistance = 150;
        const mouseDistance = 200;

        let mouseX = 0;
        let mouseY = 0;
        let scrollY = 0;

        // Helper to get current accent color from CSS variable
        const getAccentColor = () => {
            const style = getComputedStyle(document.documentElement);
            const color = style.getPropertyValue('--color-accent').trim();
            return color || '#00ff9d'; // Fallback
        };

        // Helper to convert hex to rgb
        const hexToRgb = (hex: string) => {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : { r: 0, g: 255, b: 157 };
        };

        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
            depth: number;

            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 3 + 2; // Larger particles (2-5px)
                this.depth = Math.random() * 0.5 + 0.5; // Depth factor for parallax
            }

            update(mouseX: number, mouseY: number) {
                this.x += this.vx;
                this.y += this.vy;

                // Mouse repulsion
                const dx = this.x - mouseX;
                const dy = this.y - mouseY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const maxDistance = 150;

                if (distance < maxDistance) {
                    const force = (maxDistance - distance) / maxDistance;
                    const angle = Math.atan2(dy, dx);
                    const push = force * 5; // Stronger repulsion
                    this.x += Math.cos(angle) * push;
                    this.y += Math.sin(angle) * push;
                }

                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;
            }

            draw(rgb: { r: number, g: number, b: number }) {
                if (!ctx) return;
                ctx.beginPath();
                // Apply parallax offset based on depth
                const parallaxY = this.y - (scrollY * this.depth * 0.2);
                // Wrap around screen
                const displayY = (parallaxY % height + height) % height;

                ctx.arc(this.x, displayY, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.8)`; // More opaque particles
                ctx.fill();
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        function animate() {
            if (!ctx || !canvas) return;
            ctx.clearRect(0, 0, width, height);

            // Get current color each frame (or could optimize to check less often)
            const accentHex = getAccentColor();
            const rgb = hexToRgb(accentHex);

            particles.forEach((particle, i) => {
                particle.update(mouseX, mouseY);
                particle.draw(rgb);

                // Connect particles
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[j].x - particle.x;
                    const dy = particles[j].y - particle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectionDistance) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${0.3 * (1 - distance / connectionDistance)})`; // More visible lines
                        ctx.lineWidth = 1;
                        const parallaxYi = particle.y - (scrollY * particle.depth * 0.2);
                        const displayYi = (parallaxYi % height + height) % height;

                        const parallaxYj = particles[j].y - (scrollY * particles[j].depth * 0.2);
                        const displayYj = (parallaxYj % height + height) % height;

                        // Don't draw lines across the screen wrap
                        if (Math.abs(displayYi - displayYj) > 100) continue;

                        ctx.moveTo(particle.x, displayYi);
                        ctx.lineTo(particles[j].x, displayYj);
                        ctx.stroke();
                    }
                }

                // Connect to mouse
                const dx = mouseX - particle.x;
                const dy = mouseY - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < mouseDistance) {
                    ctx.beginPath();
                    // Reduce opacity and remove shadow for mouse connection to avoid bright dot
                    ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${0.2 * (1 - distance / mouseDistance)})`;
                    ctx.lineWidth = 1;
                    const parallaxYi = particle.y - (scrollY * particle.depth * 0.2);
                    const displayYi = (parallaxYi % height + height) % height;

                    ctx.shadowBlur = 10;
                    ctx.shadowColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)`;
                    ctx.moveTo(particle.x, displayYi);
                    ctx.lineTo(mouseX, mouseY);
                    ctx.stroke();
                    ctx.shadowBlur = 0; // Reset shadow
                }
            });

            requestAnimationFrame(animate);
        }

        animate();

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        const handleScroll = () => {
            scrollY = window.scrollY;
        };

        window.addEventListener("resize", handleResize);
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-[-1] pointer-events-none opacity-40"
        />
    );
}
