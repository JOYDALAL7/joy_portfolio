"use client";

import { FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { SiReact, SiNextdotjs, SiNodedotjs, SiMongodb, SiTailwindcss, SiTypescript, SiJavascript, SiPython, SiAmazon, SiDocker, SiGit, SiLinux } from "react-icons/si";
import { motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Section from "./components/Section";
import Hero from "./components/Hero";
import Scene3D from "./components/Scene3D";
import ScrollProgress from "./components/ScrollProgress";
import TechDecoration from "./components/TechDecoration";
import SkillBar from "./components/SkillBar";
import ThemeSwitcher from "./components/ThemeSwitcher";
import ContactForm from "./components/ContactForm";
import SnakeGame from "./components/SnakeGame";
import CommandPalette from "./components/CommandPalette";
import Hero3D from "./components/Hero3D";
import { AchievementProvider } from "./components/AchievementPopup";
import SecurityBadge from "./components/SecurityBadge";
import TreeConnection from "./components/TreeConnection";
import CustomCursor from "./components/CustomCursor";
import Dashboard from "./components/Dashboard";
import ProfessionalJourney from "./components/ProfessionalJourney";

import ProjectCard from "./components/ProjectCard";

import AboutSection from "./components/AboutSection";
import SystemMonitor from "./components/SystemMonitor";
import EducationSection from "./components/EducationSection";
import ContactSection from "./components/ContactSection";
import FloatingSnakeButton from "./components/FloatingSnakeButton";

export default function HomePage() {
  return (
    <AchievementProvider>
      <CustomCursor />
      <main className="min-h-screen bg-background text-white bg-grid relative overflow-x-hidden">
        {/* Global Components */}
        <ScrollProgress />
        <Scene3D />
        <TechDecoration />
        <Hero3D />
        <ThemeSwitcher />
        <SnakeGame />
        <CommandPalette />
        <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,255,157,0.08),_transparent_60%)]"></div>

        <Navbar />

        {/* Hero */}
        <Hero />

        {/* Dashboard Stats */}
        <div className="max-w-7xl mx-auto px-4 mt-12">
          <Dashboard />
        </div>

        {/* About */}
        <Section id="about" title="About Me">
          <AboutSection />
        </Section>

        {/* Skills */}
        <Section id="skills" title="Technical Arsenal">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Frontend */}
            <div className="bg-surface/30 border border-white/5 rounded-xl p-8 hover:border-accent/30 transition-colors group backdrop-blur-sm shadow-[0_0_20px_rgba(0,0,0,0.3)] hover:shadow-[0_0_30px_var(--color-glow)]">
              <h3 className="text-xl font-semibold mb-6 text-accent flex items-center gap-2">
                <span className="w-2 h-8 bg-accent rounded-full"></span> Frontend Development
              </h3>
              <div>
                <SkillBar icon={<SiReact />} name="React" level={95} delay={0} />
                <SkillBar icon={<SiNextdotjs />} name="Next.js" level={92} delay={0.1} />
                <SkillBar icon={<SiTypescript />} name="TypeScript" level={88} delay={0.2} />
                <SkillBar icon={<SiJavascript />} name="JavaScript" level={94} delay={0.3} />
                <SkillBar icon={<SiTailwindcss />} name="Tailwind CSS" level={96} delay={0.4} />
              </div>
            </div>

            {/* Backend */}
            <div className="bg-surface/30 border border-white/5 rounded-xl p-8 hover:border-accent/30 transition-colors group backdrop-blur-sm shadow-[0_0_20px_rgba(0,0,0,0.3)] hover:shadow-[0_0_30px_var(--color-glow)]">
              <h3 className="text-xl font-semibold mb-6 text-accent flex items-center gap-2">
                <span className="w-2 h-8 bg-accent rounded-full"></span> Backend & DevOps
              </h3>
              <div>
                <SkillBar icon={<SiNodedotjs />} name="Node.js" level={93} delay={0} />
                <SkillBar icon={<SiPython />} name="Python" level={85} delay={0.1} />
                <SkillBar icon={<SiMongodb />} name="MongoDB" level={90} delay={0.2} />
                <SkillBar icon={<SiAmazon />} name="AWS" level={82} delay={0.3} />
                <SkillBar icon={<SiDocker />} name="Docker" level={87} delay={0.4} />
              </div>
            </div>
          </div>
        </Section>

        {/* Experience */}
        <Section id="experience" title="Professional Journey">
          <ProfessionalJourney />
        </Section>

        {/* Projects */}
        <Section id="projects" title="Featured Projects">
          <div className="grid md:grid-cols-2 gap-8">
            <ProjectCard
              title="MindShield AI"
              tech="Next.js • Node.js • Flask • MongoDB"
              description="AI-powered threat-analysis platform integrating Node.js backend with Flask OpenAI inference APIs. Reduced inference latency 40% (480ms→290ms) via routing optimization and caching. Implemented RBAC, refresh tokens, secure sessions following OWASP guidelines."
              links={{ live: "https://mind-shield-ai.vercel.app/", github: "https://github.com/JOYDALAL7/MindShield-AI" }}
              icon={<SiReact />}
              index={0}
            />
            <ProjectCard
              title="Wall Finishing Workflow System"
              tech="React • Node.js • MongoDB"
              description="Developed workflow automation dashboard with CRUD operations and real-time updates. Improved DB query performance 60% via indexing + optimized schemas. Reduced manual operations workload by 70% through automation."
              links={{ live: "https://wall-finishing-system.vercel.app/", github: "https://github.com/JOYDALAL7/wall-finishing-system" }}
              icon={<SiMongodb />}
              index={1}
            />
          </div>
        </Section>

        {/* Education & Certifications */}
        <Section id="education" title="Education & Certifications">
          <EducationSection />
        </Section>

        {/* System Monitor */}
        <Section id="system" title="System Status">
          <SystemMonitor />
        </Section>

        {/* Contact */}
        <Section id="contact" title="Let's Connect">
          <ContactSection />
        </Section>

        <footer className="py-8 text-center text-sm text-gray-600 border-t border-white/5 bg-black">
          <p>© {new Date().getFullYear()} Joy Dalal. Built by Joy.</p>
        </footer>
      </main>

      {/* Floating Snake Game Button */}
      <FloatingSnakeButton />
    </AchievementProvider>
  );
}
