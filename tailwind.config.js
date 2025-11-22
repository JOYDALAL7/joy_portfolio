/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx}",
        "./app/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--color-bg, #0a0a0a)",
                accent: "var(--color-accent, #00ff9d)",
                "accent-dark": "var(--color-accent-secondary, #00cc7d)",
                surface: "var(--color-surface, #121212)",
                "surface-hover": "#1e1e1e",
            },
            fontFamily: {
                sans: ["var(--font-outfit)", "sans-serif"],
            },
            boxShadow: {
                "glow-green": "0 0 20px var(--color-glow, rgba(0, 255, 157, 0.3))",
                "glow-card": "0 0 30px var(--color-glow, rgba(0, 255, 157, 0.1))",
            },
            animation: {
                "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
            },
        },
    },
    plugins: [],
};
