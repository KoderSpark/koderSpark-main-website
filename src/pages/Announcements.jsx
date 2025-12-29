import React from 'react';
import { motion } from 'framer-motion';
import {
    Rocket,
    Users,
    Briefcase,
    GraduationCap,
    CheckCircle,
    ArrowRight,
    Sparkles,
    ExternalLink,
    Zap
} from 'lucide-react';

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const Announcements = () => {
    const handleRedirect = () => {
        window.open('https://www.hireinminutes.in', '_blank');
    };

    return (
        <div className="min-h-screen pt-32 pb-12 px-4 sm:px-6 lg:px-8 bg-primary relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-secondary/10 rounded-full blur-3xl" />
                <div className="absolute bottom-[10%] left-[-10%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">

                {/* Hero Section */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface/80 border border-white/10 backdrop-blur-sm mb-6 text-secondary text-sm font-medium">
                        <Rocket size={16} />
                        <span>WE HAVE LAUNCHED!</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight pb-2 bg-gradient-to-r from-white via-secondary to-accent bg-clip-text text-transparent">
                        HireInMinutes <br className="hidden md:block" /> is Now Live
                    </h1>

                    <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed">
                        The wait is over. Experience the faster, smarter way to connect recruiters and candidates.
                        <span className="block mt-2 text-white font-semibold">
                            No more delays. No more noise. Just results.
                        </span>
                    </p>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleRedirect}
                        className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-secondary to-accent rounded-full text-white font-bold text-lg shadow-lg shadow-secondary/25 hover:shadow-secondary/40 transition-all duration-300"
                    >
                        <span>Visit HireInMinutes.in</span>
                        <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />

                        <span className="absolute inset-0 rounded-full ring-2 ring-white/20 group-hover:ring-white/40 transition-all" />
                    </motion.button>
                </motion.div>

                {/* What is it? */}
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="mb-24"
                >
                    <div className="grid md:grid-cols-2 gap-8">
                        <motion.div variants={fadeInUp} className="p-8 rounded-2xl bg-surface/50 border border-white/5 backdrop-blur-md hover:border-secondary/30 transition-all duration-300 group">
                            <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center text-secondary mb-6 group-hover:scale-110 transition-transform">
                                <Briefcase size={24} />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">For Recruiters</h3>
                            <p className="text-slate-300 mb-6">
                                Post jobs for free and access verified candidate profiles instantly.
                            </p>
                            <ul className="space-y-3 text-slate-400">
                                <li className="flex items-center gap-3">
                                    <CheckCircle size={18} className="text-secondary" />
                                    <span>Verified Candidates Only</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <CheckCircle size={18} className="text-secondary" />
                                    <span>Direct Connection</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <CheckCircle size={18} className="text-secondary" />
                                    <span>Zero Commission Fees</span>
                                </li>
                            </ul>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="p-8 rounded-2xl bg-surface/50 border border-white/5 backdrop-blur-md hover:border-accent/30 transition-all duration-300 group">
                            <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform">
                                <GraduationCap size={24} />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">For Candidates</h3>
                            <p className="text-slate-300 mb-6">
                                Get discovered by top companies without the endless application spam.
                            </p>
                            <ul className="space-y-3 text-slate-400">
                                <li className="flex items-center gap-3">
                                    <CheckCircle size={18} className="text-accent" />
                                    <span>Profile Verification</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <CheckCircle size={18} className="text-accent" />
                                    <span>Direct Recruiter Outreach</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <CheckCircle size={18} className="text-accent" />
                                    <span>Fast-Track Process</span>
                                </li>
                            </ul>
                        </motion.div>
                    </div>
                </motion.section>

                {/* Final CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center"
                >
                    <div className="inline-block p-[2px] rounded-3xl bg-gradient-to-r from-secondary via-white/20 to-accent">
                        <div className="bg-surface/90 backdrop-blur-xl rounded-3xl px-8 py-12 md:px-16">
                            <Sparkles className="w-12 h-12 text-yellow-400 mx-auto mb-6" />
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to get started?</h2>
                            <p className="text-slate-400 mb-8 max-w-lg mx-auto">
                                Join the platform that's changing the way hiring happens.
                                Simple, fast, and effective.
                            </p>
                            <button
                                onClick={handleRedirect}
                                className="px-10 py-4 bg-white text-primary font-bold rounded-xl hover:bg-slate-200 transition-colors flex items-center gap-2 mx-auto"
                            >
                                <Zap size={20} className="fill-primary" />
                                <span>Go to HireInMinutes.in</span>
                            </button>
                        </div>
                    </div>
                </motion.div>

            </div>
        </div>
    );
};

export default Announcements;