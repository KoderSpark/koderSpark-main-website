import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Bell,
    Rocket,
    Users,
    Briefcase,
    GraduationCap,
    CheckCircle,
    Lock,
    Clock,
    ArrowRight,
    Sparkles
} from 'lucide-react';
import { toast } from 'react-hot-toast';

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
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        role: 'Job Seeker'
    });
    const [showFallback, setShowFallback] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // PLACEHOLDER: Replace with your actual Google Apps Script Web App URL
    // Tutorial to create:
    // 1. Create a Google Sheet
    // 2. Extensions > Apps Script
    // 3. Paste code to handle POST request
    // 4. Deploy as Web App > Access: Anyone
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwNqNEigPq88e4vgBBjLJuAGhzEUg5e0zwyjK5eQavYw_O_E9c_wWD9nJg_eKGbUh-c/exec';

    const handleJoinWaitlist = async (e) => {
        e.preventDefault();

        // Validation for common mistake: User pasting the Spreadsheet URL instead of Web App URL
        if (GOOGLE_SCRIPT_URL.includes('docs.google.com') || !GOOGLE_SCRIPT_URL.includes('script.google.com')) {
            toast.error('Configuration Error: You are using the Spreadsheet URL.');
            toast.error('Please deploy as "Web App" and use that URL.');
            return;
        }

        if (!formData.name || !formData.email || !formData.phone) {
            toast.error('Please fill in all fields');
            return;
        }

        setShowFallback(false);
        setIsSubmitting(true);
        const scriptURL = GOOGLE_SCRIPT_URL.trim();

        try {
            // Method 1: If using a simple form submit (no-cors)
            // Using text/plain prevents the browser from sending an OPTIONS preflight request
            await fetch(scriptURL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'text/plain',
                },
                body: JSON.stringify(formData)
            });

            toast.success('You have been added to the waitlist!');
            setFormData({ name: '', email: '', phone: '', role: 'Job Seeker' });
            setShowFallback(false);

        } catch (error) {
            console.error("Error submitting form:", error);
            toast.error('Network error. Please try the email button below.');
            setShowFallback(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-primary relative overflow-hidden">
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
                        <Bell size={16} />
                        <span>ANNOUNCEMENT (Website Section)</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-secondary to-accent bg-clip-text text-transparent">
                        Something New Is <br /> Launching Soon
                    </h1>

                    <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8 leading-relaxed">
                        We’re building a new hiring experience designed to remove delays, noise, and endless back-and-forth.
                        <span className="block mt-2 text-white font-semibold">
                            This is not another job portal. This is a faster, smarter way to connect.
                        </span>
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-slate-400">
                        <span className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span>
                            Private Pre-launch
                        </span>
                        <span className="hidden sm:inline">•</span>
                        <span>Early access via waitlist only</span>
                    </div>
                </motion.div>

                {/* Who is this for? */}
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="mb-24"
                >
                    <motion.h2 variants={fadeInUp} className="text-3xl font-bold text-center mb-12">
                        Who Is This For?
                    </motion.h2>

                    <div className="grid md:grid-cols-2 gap-8">
                        <motion.div variants={fadeInUp} className="p-8 rounded-2xl bg-surface/50 border border-white/5 backdrop-blur-md hover:border-secondary/30 transition-all duration-300 group">
                            <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center text-secondary mb-6 group-hover:scale-110 transition-transform">
                                <Briefcase size={24} />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Recruiters & Founders</h3>
                            <p className="text-slate-300 mb-4">If you hire:</p>
                            <ul className="space-y-2 text-slate-400">
                                {['Interns', 'Freshers', 'Entry-level professionals', 'Tech & non-tech roles'].map((item, i) => (
                                    <li key={i} className="flex items-center gap-2">
                                        <CheckCircle size={16} className="text-secondary" /> {item}
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-6 pt-6 border-t border-white/5">
                                <p className="font-semibold text-white">This is built for you.</p>
                            </div>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="p-8 rounded-2xl bg-surface/50 border border-white/5 backdrop-blur-md hover:border-accent/30 transition-all duration-300 group">
                            <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform">
                                <GraduationCap size={24} />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Candidates</h3>
                            <p className="text-slate-300 mb-4">If you are:</p>
                            <ul className="space-y-2 text-slate-400">
                                {['A student', 'A fresher', 'An early-career professional'].map((item, i) => (
                                    <li key={i} className="flex items-center gap-2">
                                        <CheckCircle size={16} className="text-accent" /> {item}
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-6 pt-6 border-t border-white/5">
                                <p className="font-semibold text-white">Looking for real opportunities, not spam.</p>
                            </div>
                        </motion.div>
                    </div>
                </motion.section>

                {/* Waitlist Benefits */}
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="mb-24"
                >
                    <motion.div variants={fadeInUp} className="flex items-center justify-center gap-3 mb-12">
                        <Sparkles className="text-yellow-400" />
                        <h2 className="text-3xl font-bold text-center">Waitlist Benefits (Early Access Only)</h2>
                        <Sparkles className="text-yellow-400" />
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* For Recruiters */}
                        <motion.div variants={fadeInUp} className="relative p-1 rounded-2xl bg-gradient-to-b from-secondary/20 to-transparent">
                            <div className="bg-surface h-full rounded-xl p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <Briefcase className="text-secondary" />
                                    <h3 className="text-xl font-bold">For Recruiters / Companies</h3>
                                </div>
                                <ul className="space-y-4">
                                    {[
                                        '1 Year of FREE Job Posting',
                                        'Access to verified candidate profiles only',
                                        'Pre-screened candidates (basic validation completed)',
                                        'Faster shortlisting with reduced hiring effort',
                                        'Priority access during the launch phase'
                                    ].map((benefit, i) => (
                                        <li key={i} className="flex items-start gap-3 text-slate-300">
                                            <CheckCircle className="text-secondary shrink-0 mt-1" size={18} />
                                            <span>{benefit}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-6 p-3 rounded-lg bg-secondary/10 text-secondary text-sm text-center">
                                    No charges during the early-access period.
                                </div>
                            </div>
                        </motion.div>

                        {/* For Candidates */}
                        <motion.div variants={fadeInUp} className="relative p-1 rounded-2xl bg-gradient-to-b from-accent/20 to-transparent">
                            <div className="bg-surface h-full rounded-xl p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <GraduationCap className="text-accent" />
                                    <h3 className="text-xl font-bold">For Candidates</h3>
                                </div>
                                <ul className="space-y-4">
                                    {[
                                        'Free profile verification',
                                        'Eligibility for pre-screened opportunities',
                                        'Higher visibility to recruiters',
                                        'No mass applying : companies reach out',
                                        'Early access to opportunities'
                                    ].map((benefit, i) => (
                                        <li key={i} className="flex items-start gap-3 text-slate-300">
                                            <CheckCircle className="text-accent shrink-0 mt-1" size={18} />
                                            <span>{benefit}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-6 p-3 rounded-lg bg-accent/10 text-accent text-sm text-center">
                                    Your profile is reviewed to ensure quality over quantity.
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.section>

                {/* Why Join & CTA */}
                <section className="grid lg:grid-cols-2 gap-12 items-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl font-bold mb-8">Why Join the Waitlist?</h2>
                        <div className="space-y-6">
                            {[
                                { icon: Lock, text: "Limited early access", desc: "Secure your spot before public launch" },
                                { icon: Sparkles, text: "Priority benefits locked", desc: "Early users get perks that won't exist later" },
                                { icon: Users, text: "Shape the platform", desc: "Your feedback will directly influence features" },
                                { icon: Clock, text: "Launching Soon", desc: "Details revealed in stages. Members notified first." }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-surface border border-white/10 flex items-center justify-center shrink-0">
                                        <item.icon size={20} className="text-slate-300" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-white">{item.text}</h4>
                                        <p className="text-sm text-slate-400">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="bg-surface/80 backdrop-blur-xl border border-white/10 p-8 rounded-3xl text-center shadow-2xl shadow-secondary/5"
                    >
                        <Rocket size={48} className="text-secondary mx-auto mb-6" />
                        <h3 className="text-2xl font-bold mb-2">Join the Waitlist</h3>
                        <p className="text-slate-400 mb-8">Early access. Limited slots.</p>

                        <form onSubmit={handleJoinWaitlist} className="space-y-4 text-left">
                            <div>
                                <label className="text-sm text-slate-400 ml-1 mb-1 block">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="John Doe"
                                    className="w-full px-5 py-3 rounded-xl bg-black/20 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-secondary transition-colors"
                                />
                            </div>

                            <div>
                                <label className="text-sm text-slate-400 ml-1 mb-1 block">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="john@example.com"
                                    className="w-full px-5 py-3 rounded-xl bg-black/20 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-secondary transition-colors"
                                />
                            </div>

                            <div>
                                <label className="text-sm text-slate-400 ml-1 mb-1 block">Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    placeholder="+91 98765 43210"
                                    className="w-full px-5 py-3 rounded-xl bg-black/20 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-secondary transition-colors"
                                />
                            </div>

                            <div>
                                <label className="text-sm text-slate-400 ml-1 mb-1 block">I am a</label>
                                <div className="flex gap-4">
                                    <label className="flex-1 cursor-pointer group">
                                        <input
                                            type="radio"
                                            name="role"
                                            value="Job Seeker"
                                            checked={formData.role === 'Job Seeker'}
                                            onChange={handleInputChange}
                                            className="hidden peer"
                                        />
                                        <div className="w-full px-5 py-3 rounded-xl bg-black/20 border border-white/10 text-slate-400 peer-checked:bg-accent/20 peer-checked:border-accent peer-checked:text-white transition-all text-center hover:bg-white/5">
                                            Job Seeker
                                        </div>
                                    </label>
                                    <label className="flex-1 cursor-pointer group">
                                        <input
                                            type="radio"
                                            name="role"
                                            value="Recruiter"
                                            checked={formData.role === 'Recruiter'}
                                            onChange={handleInputChange}
                                            className="hidden peer"
                                        />
                                        <div className="w-full px-5 py-3 rounded-xl bg-black/20 border border-white/10 text-slate-400 peer-checked:bg-secondary/20 peer-checked:border-secondary peer-checked:text-white transition-all text-center hover:bg-white/5">
                                            Recruiter
                                        </div>
                                    </label>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full px-5 py-4 mt-2 rounded-xl bg-gradient-to-r from-secondary to-accent text-white font-bold text-lg hover:shadow-lg hover:shadow-secondary/25 transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? 'Joining...' : 'Get Early Access'}
                                {!isSubmitting && <ArrowRight className="group-hover:translate-x-1 transition-transform" />}
                            </button>
                        </form>

                        {showFallback && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-left"
                            >
                                <p className="text-red-200 text-sm mb-3 font-semibold flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                    Connection Error
                                </p>
                                <p className="text-slate-400 text-xs mb-3">
                                    Your network or browser is blocking the connection to Google Sheets. Please submit via email instead:
                                </p>
                                <a
                                    href={`mailto:support@koderspark.in?subject=Join Waitlist: ${formData.name}&body=Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0APhone: ${formData.phone}%0D%0ARole: ${formData.role}%0D%0A%0D%0APlease add me to the waitlist.`}
                                    className="block w-full text-center py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-colors"
                                >
                                    Submit via Email
                                </a>
                            </motion.div>
                        )}

                        <p className="mt-4 text-xs text-slate-500">
                            By joining, you agree to receive updates about our launch.
                        </p>
                    </motion.div>
                </section>


            </div>
        </div>
    );
};

export default Announcements;