"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaCheckCircle, FaMapMarkerAlt, FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';

export default function ContactSection() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const validate = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        } else if (formData.message.trim().length < 10) {
            newErrors.message = 'Message must be at least 10 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) return;

        setIsSubmitting(true);

        // Create Gmail compose link
        const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
        const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
        const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=djjoydalal2002@gmail.com&su=${subject}&body=${body}`;

        window.open(gmailLink, '_blank');

        await new Promise(resolve => setTimeout(resolve, 1000));

        setIsSubmitting(false);
        setIsSuccess(true);
        setFormData({ name: '', email: '', message: '' });

        setTimeout(() => setIsSuccess(false), 5000);
    };

    return (
        <div className="grid lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
            {/* Info Panel */}
            <div className="lg:col-span-5 space-y-6">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h3 className="text-2xl font-bold text-white mb-4 font-orbitron">
                        <span className="w-2 h-2 bg-accent rounded-full animate-pulse inline-block mr-2" />
                        OPEN_FOR_OPPORTUNITIES
                    </h3>
                    <p className="text-gray-300 leading-relaxed mb-6">
                        Open to roles in <span className="text-accent">full-stack development</span>, <span className="text-accent">cybersecurity engineering</span>, and <span className="text-accent">AI-driven products</span>. Let's build something impactful together.
                    </p>
                </motion.div>

                {/* Contact Info Cards */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="space-y-4"
                >
                    <div className="bg-black/60 border border-white/10 rounded-lg p-4 backdrop-blur-sm hover:border-accent/30 transition-all">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-accent/10 rounded-lg">
                                <FaMapMarkerAlt className="text-accent" />
                            </div>
                            <div>
                                <div className="text-xs text-gray-400 font-mono">LOCATION</div>
                                <div className="text-white font-semibold">Bengaluru, Karnataka, India</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-black/60 border border-white/10 rounded-lg p-4 backdrop-blur-sm hover:border-accent/30 transition-all">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-accent/10 rounded-lg">
                                <FaEnvelope className="text-accent" />
                            </div>
                            <div>
                                <div className="text-xs text-gray-400 font-mono">EMAIL</div>
                                <div className="text-white font-semibold">djjoydalal2002@gmail.com</div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Social Links */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <div className="text-xs text-gray-400 font-mono mb-3">SOCIAL_LINKS</div>
                    <div className="flex gap-3">
                        {[
                            { icon: <FaGithub />, href: "https://github.com/JOYDALAL7", label: "GitHub" },
                            { icon: <FaLinkedin />, href: "https://www.linkedin.com/in/joy-dalal-6401a8246/", label: "LinkedIn" }
                        ].map((social, i) => (
                            <a
                                key={i}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 bg-white/5 border border-white/10 rounded-lg hover:border-accent/50 hover:bg-accent/10 transition-all group"
                                aria-label={social.label}
                            >
                                <div className="text-xl text-gray-400 group-hover:text-accent transition-colors">
                                    {social.icon}
                                </div>
                            </a>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-7">
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative group"
                >
                    <div className="absolute -inset-1 bg-gradient-to-r from-accent via-blue-500 to-accent rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-500" />

                    <div className="relative bg-black/80 border border-accent/30 rounded-2xl p-8 backdrop-blur-xl overflow-hidden">
                        {/* Scanline Background */}
                        <div className="absolute inset-0 bg-[linear-gradient(transparent_2px,_rgba(0,255,157,0.05)_2px)] bg-[size:100%_4px] pointer-events-none" />

                        <div className="relative z-10">
                            <div className="mb-6">
                                <div className="inline-block px-3 py-1 bg-accent/10 border border-accent/30 rounded-full mb-4">
                                    <span className="text-xs font-mono text-accent">CONTACT_FORM_V2.0</span>
                                </div>
                                <h3 className="text-2xl font-bold text-white font-orbitron">Send Transmission</h3>
                            </div>

                            {isSuccess ? (
                                <motion.div
                                    className="bg-green-500/10 border border-green-500/30 rounded-xl p-8 text-center"
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                >
                                    <FaCheckCircle className="text-green-500 text-5xl mx-auto mb-3" />
                                    <h3 className="text-white text-xl font-bold mb-2">Transmission Successful!</h3>
                                    <p className="text-gray-400">Gmail has been opened with your message ready to send.</p>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="Your Name"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className={`w-full px-4 py-3 bg-white/5 border ${errors.name ? 'border-red-500' : 'border-white/10'
                                                } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent focus:shadow-[0_0_15px_var(--color-glow)] transition-all font-mono`}
                                        />
                                        {errors.name && (
                                            <motion.p className="text-red-500 text-sm mt-1 font-mono" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}>
                                                {errors.name}
                                            </motion.p>
                                        )}
                                    </div>

                                    <div>
                                        <input
                                            type="email"
                                            placeholder="Your Email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className={`w-full px-4 py-3 bg-white/5 border ${errors.email ? 'border-red-500' : 'border-white/10'
                                                } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent focus:shadow-[0_0_15px_var(--color-glow)] transition-all font-mono`}
                                        />
                                        {errors.email && (
                                            <motion.p className="text-red-500 text-sm mt-1 font-mono" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}>
                                                {errors.email}
                                            </motion.p>
                                        )}
                                    </div>

                                    <div>
                                        <textarea
                                            placeholder="Your Message"
                                            rows={5}
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            className={`w-full px-4 py-3 bg-white/5 border ${errors.message ? 'border-red-500' : 'border-white/10'
                                                } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent focus:shadow-[0_0_15px_var(--color-glow)] transition-all resize-none font-mono`}
                                        />
                                        {errors.message && (
                                            <motion.p className="text-red-500 text-sm mt-1 font-mono" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}>
                                                {errors.message}
                                            </motion.p>
                                        )}
                                    </div>

                                    <motion.button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full px-8 py-4 bg-white text-black font-bold rounded-lg hover:bg-accent transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_var(--color-accent)]"
                                        whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                                        whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <motion.div
                                                    className="w-5 h-5 border-2 border-black border-t-transparent rounded-full"
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                />
                                                Transmitting...
                                            </>
                                        ) : (
                                            <>
                                                <FaPaperPlane />
                                                Send Transmission
                                            </>
                                        )}
                                    </motion.button>
                                </form>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
