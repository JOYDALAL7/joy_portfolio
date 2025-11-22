"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaCheckCircle } from 'react-icons/fa';

export default function ContactForm() {
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

        // Create Gmail compose link (opens in browser, no app needed)
        const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
        const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
        const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=djjoydalal2002@gmail.com&su=${subject}&body=${body}`;

        // Open in new tab
        window.open(gmailLink, '_blank');

        await new Promise(resolve => setTimeout(resolve, 1000));

        setIsSubmitting(false);
        setIsSuccess(true);
        setFormData({ name: '', email: '', message: '' });

        setTimeout(() => setIsSuccess(false), 5000);
    };

    return (
        <motion.form
            onSubmit={handleSubmit}
            className="max-w-xl mx-auto mt-8 space-y-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            {isSuccess ? (
                <motion.div
                    className="bg-green-500/10 border border-green-500/30 rounded-xl p-8 text-center"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                >
                    <FaCheckCircle className="text-green-500 text-5xl mx-auto mb-3" />
                    <h3 className="text-white text-xl font-bold mb-2">Gmail Opened!</h3>
                    <p className="text-gray-400">A new tab has been opened with your message ready to send.</p>
                </motion.div>
            ) : (
                <>
                    <div>
                        <input
                            type="text"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className={`w-full px-4 py-3 bg-surface/50 border ${errors.name ? 'border-red-500' : 'border-white/10'
                                } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent focus:shadow-[0_0_15px_var(--color-glow)] transition-all`}
                        />
                        {errors.name && (
                            <motion.p className="text-red-500 text-sm mt-1" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}>
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
                            className={`w-full px-4 py-3 bg-surface/50 border ${errors.email ? 'border-red-500' : 'border-white/10'
                                } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent focus:shadow-[0_0_15px_var(--color-glow)] transition-all`}
                        />
                        {errors.email && (
                            <motion.p className="text-red-500 text-sm mt-1" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}>
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
                            className={`w-full px-4 py-3 bg-surface/50 border ${errors.message ? 'border-red-500' : 'border-white/10'
                                } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent focus:shadow-[0_0_15px_var(--color-glow)] transition-all resize-none`}
                        />
                        {errors.message && (
                            <motion.p className="text-red-500 text-sm mt-1" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}>
                                {errors.message}
                            </motion.p>
                        )}
                    </div>

                    <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full px-8 py-4 bg-accent text-black font-bold rounded-full hover:shadow-[0_0_30px_var(--color-glow)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
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
                                Opening Gmail...
                            </>
                        ) : (
                            <>
                                <FaPaperPlane />
                                Send Message
                            </>
                        )}
                    </motion.button>
                </>
            )}
        </motion.form>
    );
}
