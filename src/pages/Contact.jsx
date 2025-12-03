import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, Phone, ArrowRight, Loader2, Copy } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState('idle'); // idle, submitting, success, error

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCopy = (e, text) => {
        e.preventDefault();
        e.stopPropagation();
        navigator.clipboard.writeText(text);
        toast.success('Copied to clipboard!');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            await fetch(import.meta.env.VITE_GOOGLE_SHEETS_URL, {
                method: 'POST',
                mode: 'no-cors', // Important for Google Apps Script
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            setStatus('success');
            toast.success('Message sent successfully! We\'ll get back to you soon.');
            setFormData({ firstName: '', lastName: '', email: '', message: '' });

            // Reset success message after 5 seconds
            setTimeout(() => setStatus('idle'), 5000);
        } catch (error) {
            console.error('Error submitting form:', error);
            setStatus('error');
            toast.error('Something went wrong. Please try again later.');
        }
    };
    return (
        <div className="min-h-screen pt-28 pb-12 px-4 bg-primary relative overflow-hidden">
            <Toaster position="bottom-right" reverseOrder={false} />
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-secondary/5 rounded-full blur-3xl -z-10"></div>
            <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-accent/5 rounded-full blur-3xl -z-10"></div>

            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-sm font-bold text-secondary uppercase tracking-widest mb-4">Get in Touch</h2>
                        <h1 className="text-5xl md:text-6xl font-bold font-heading text-white mb-8 leading-tight">
                            Let's Build Something <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent">Extraordinary</span>
                        </h1>
                        <p className="text-slate-300 text-lg mb-12 leading-relaxed max-w-lg">
                            Have a project in mind? We'd love to hear from you. Send us a message and we'll get back to you shortly to discuss how we can bring your vision to life.
                        </p>

                        {/* Contact Cards moved to right column */}

                        {/* Image Grid */}
                        <div className="mt-12 grid grid-cols-2 gap-4">
                            <div className="space-y-4">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="rounded-2xl overflow-hidden h-48 border border-white/10"
                                >
                                    <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80" alt="Office" loading="lazy" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500 will-change-transform" />
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 }}
                                    className="rounded-2xl overflow-hidden h-32 border border-white/10"
                                >
                                    <img src="https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&w=400&q=80" alt="Tech" loading="lazy" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500 will-change-transform" />
                                </motion.div>
                            </div>
                            <div className="pt-8">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="rounded-2xl overflow-hidden h-64 border border-white/10"
                                >
                                    <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80" alt="Team" loading="lazy" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500 will-change-transform" />
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative group"
                    >
                        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">

                            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-200 ml-1">First Name</label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-5 py-4 bg-primary/50 border border-white/10 rounded-xl focus:outline-none focus:border-secondary focus:bg-primary/80 focus:shadow-[0_0_15px_rgba(56,189,248,0.1)] text-white placeholder-slate-600 transition-all duration-300"
                                            placeholder="John"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-200 ml-1">Last Name</label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-5 py-4 bg-primary/50 border border-white/10 rounded-xl focus:outline-none focus:border-secondary focus:bg-primary/80 focus:shadow-[0_0_15px_rgba(56,189,248,0.1)] text-white placeholder-slate-600 transition-all duration-300"
                                            placeholder="Doe"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-200 ml-1">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-5 py-4 bg-primary/50 border border-white/10 rounded-xl focus:outline-none focus:border-secondary focus:bg-primary/80 focus:shadow-[0_0_15px_rgba(56,189,248,0.1)] text-white placeholder-slate-600 transition-all duration-300"
                                        placeholder="john@example.com"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-300 ml-1">Message</label>
                                    <textarea
                                        rows="5"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-5 py-4 bg-primary/50 border border-white/10 rounded-xl focus:outline-none focus:border-secondary focus:bg-primary/80 focus:shadow-[0_0_15px_rgba(56,189,248,0.1)] text-white placeholder-slate-600 transition-all duration-300 resize-none"
                                        placeholder="Tell us about your project goals..."
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={status === 'submitting'}
                                    className={`w-full py-4 bg-gradient-to-r from-secondary to-accent text-white font-bold rounded-xl hover:shadow-[0_0_30px_rgba(56,189,248,0.3)] transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 group ${status === 'submitting' ? 'opacity-70 cursor-not-allowed' : ''}`}
                                >
                                    {status === 'submitting' ? (
                                        <>
                                            Sending... <Loader2 className="w-5 h-5 animate-spin" />
                                        </>
                                    ) : (
                                        <>
                                            Send Message <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>

                        {/* Contact Cards */}
                        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                            {[
                                { icon: Mail, title: "Email", value: "support@koderspark.in", color: "text-secondary", bg: "bg-secondary/10", link: "mailto:support@koderspark.in" },
                                { icon: Phone, title: "WhatsApp", value: "+91 98662 93371", color: "text-icon2", bg: "bg-icon2/10", link: "https://wa.me/919866293371" },
                                { icon: MapPin, title: "Visit", value: "Mayuri Tech Park, KoderSpark, 4th floor, Mangalagiri, Andhra Pradesh 522503", color: "text-icon3", bg: "bg-icon3/10", link: "https://maps.app.goo.gl/9qYTzrhpQSavuuuz8" }
                            ].map((item, index) => (
                                <motion.a
                                    key={index}
                                    href={item.link}
                                    target={item.link.startsWith('http') ? "_blank" : undefined}
                                    rel={item.link.startsWith('http') ? "noopener noreferrer" : undefined}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 + index * 0.1 }}
                                    className="flex flex-col items-center text-center p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group cursor-pointer relative"
                                >
                                    <button
                                        onClick={(e) => handleCopy(e, item.value)}
                                        className="absolute top-2 right-2 p-1.5 rounded-full bg-white/5 hover:bg-white/20 text-slate-400 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
                                        title="Copy"
                                    >
                                        <Copy className="w-3 h-3" />
                                    </button>
                                    <div className={`p-3 rounded-full ${item.bg} ${item.color} mb-3 group-hover:scale-110 transition-transform duration-300`}>
                                        <item.icon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold text-xs mb-1">{item.title}</h3>
                                        <p className="text-slate-200 text-[10px] break-words group-hover:text-white transition-colors">{item.value}</p>
                                    </div>
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
