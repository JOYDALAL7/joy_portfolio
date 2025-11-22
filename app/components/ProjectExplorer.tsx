"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaFolder, FaFolderOpen, FaFileCode, FaExternalLinkAlt, FaTimes } from "react-icons/fa";
import { SiReact, SiNextdotjs, SiNodedotjs, SiMongodb, SiTailwindcss, SiTypescript, SiJavascript, SiPython, SiAmazon, SiDocker } from "react-icons/si";

interface Project {
    title: string;
    tech: string;
    description: string;
    links: { live: string };
    tags: string[];
    gradient: string;
}

interface ProjectExplorerProps {
    projects: Project[];
}

export default function ProjectExplorer({ projects }: ProjectExplorerProps) {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    return (
        <div className="bg-surface/50 border border-white/10 rounded-xl overflow-hidden backdrop-blur-sm h-[500px] flex flex-col md:flex-row">
            {/* Sidebar / File Tree */}
            <div className="w-full md:w-1/3 border-b md:border-b-0 md:border-r border-white/10 bg-black/20 p-4 overflow-y-auto">
                <div className="flex items-center gap-2 mb-4 text-accent/80 text-sm font-mono">
                    <FaFolderOpen /> ~/projects
                </div>
                <div className="space-y-1">
                    {projects.map((project, index) => (
                        <motion.button
                            key={index}
                            onClick={() => setSelectedProject(project)}
                            className={`w-full flex items-center gap-2 px-3 py-2 rounded text-sm font-mono transition-colors ${selectedProject === project
                                ? "bg-accent/20 text-accent"
                                : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
                                }`}
                            whileHover={{ x: 4 }}
                        >
                            <FaFileCode className="text-xs" />
                            {project.title.toLowerCase().replace(/\s+/g, "-")}.tsx
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* Preview Pane */}
            <div className="flex-1 p-6 relative overflow-y-auto">
                <AnimatePresence mode="wait">
                    {selectedProject ? (
                        <motion.div
                            key={selectedProject.title}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="h-full flex flex-col"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-2">{selectedProject.title}</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedProject.tags.map(tag => (
                                            <span key={tag} className="text-xs px-2 py-1 rounded-full bg-white/5 text-gray-300 border border-white/5">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedProject(null)}
                                    className="md:hidden text-gray-500 hover:text-white"
                                >
                                    <FaTimes />
                                </button>
                            </div>

                            <div className="flex-1">
                                <div className="font-mono text-sm text-gray-400 mb-4">
                                    <span className="text-purple-400">const</span> <span className="text-blue-400">techStack</span> = <span className="text-green-400">"{selectedProject.tech}"</span>;
                                </div>
                                <p className="text-gray-300 leading-relaxed mb-6">
                                    {selectedProject.description}
                                </p>
                            </div>

                            <div className="mt-auto pt-6 border-t border-white/10">
                                <a
                                    href={selectedProject.links.live}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-black font-bold rounded hover:bg-accent-dark transition-colors"
                                >
                                    <FaExternalLinkAlt /> View Live Deployment
                                </a>
                            </div>
                        </motion.div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-gray-500">
                            <FaFileCode className="text-4xl mb-4 opacity-20" />
                            <p className="font-mono text-sm">Select a file to view details</p>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
