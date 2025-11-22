import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron" });

export const metadata: Metadata = {
  title: "Joy Dalal | Full-Stack Developer",
  description: "Portfolio of Joy Dalal - Full-Stack Developer specializing in React, Next.js, Node.js and modern web technologies",
};

import { AchievementProvider } from "./components/AchievementPopup";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${orbitron.variable}`}>
      <body className="antialiased bg-background text-white selection:bg-accent/30 selection:text-accent">
        <AchievementProvider>
          {children}
        </AchievementProvider>
      </body>
    </html>
  );
}
