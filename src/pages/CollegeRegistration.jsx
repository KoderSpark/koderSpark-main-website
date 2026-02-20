import React, { useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { Building2, User, Mail, Phone, Code2, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

const CollegeRegistration = () => {
    const GOOGLE_SCRIPT_URL = import.meta.env.VITE_COLLEGE_REGISTRATION_SCRIPT_URL;

    const [formData, setFormData] = useState({
        collegeName: '',
        contactName: '',
        designation: '',
        email: '',
        phone: '',
        expectedStudents: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                // Mode 'no-cors' is often needed to bypass CORS issues with Google Scripts when just sending data.
                // However, 'no-cors' means you won't get a readable response off the execution.
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            // Since mode is no-cors, response.ok is false and status is 0. We assume success if no error was thrown.
            setIsSuccess(true);
            setFormData({
                collegeName: '',
                contactName: '',
                designation: '',
                email: '',
                phone: '',
                expectedStudents: '',
                message: ''
            });
        } catch (err) {
            console.error("Error submitting form", err);
            setError("Something went wrong. Please try again or contact us directly.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Animation variants
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <div className="min-h-screen bg-[#050510] relative overflow-hidden text-slate-300 font-sans pt-32 pb-20">
            {/* Background Effects */}
            <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-600/20 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px]"></div>
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-4xl">
                <Motion.div
                    initial="hidden" animate="visible" variants={fadeIn}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold uppercase tracking-widest mb-4">
                        <Building2 size={14} className="text-cyan-400" />
                        <span>Institution Registration</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
                        Partner With <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">KoderSpark</span>
                    </h1>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        Empower your students with our Campus Tech Access program. Fill out the details below and our team will get back to you with a customized implementation plan.
                    </p>
                </Motion.div>

                <Motion.div
                    initial="hidden" animate="visible" variants={fadeIn}
                    className="bg-[#0a0a1a]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-[80px] rounded-full pointer-events-none"></div>

                    {isSuccess ? (
                        <div className="flex flex-col items-center justify-center py-16 text-center space-y-6">
                            <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/30">
                                <CheckCircle2 className="text-green-400" size={48} />
                            </div>
                            <h3 className="text-3xl font-bold text-white">Application Received!</h3>
                            <p className="text-slate-400 max-w-md">
                                Thank you for your interest in the Campus Tech Access program. Our academic partnership team will review your details and contact you shortly.
                            </p>
                            <button
                                onClick={() => setIsSuccess(false)}
                                className="px-8 py-3 mt-4 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-colors"
                            >
                                Submit Another Request
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                            <div className="grid md:grid-cols-2 gap-6">
                                {/* College Name */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-300 ml-1">College / Institution Name *</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Building2 className="text-slate-500" size={18} />
                                        </div>
                                        <input
                                            type="text"
                                            name="collegeName"
                                            required
                                            value={formData.collegeName}
                                            onChange={handleChange}
                                            className="w-full bg-black/40 border border-white/10 text-white rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all placeholder:text-slate-600"
                                            placeholder="E.g. Engineering Institute of Tech"
                                        />
                                    </div>
                                </div>

                                {/* Expected Students */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-300 ml-1">Expected Student Count (Optional)</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Code2 className="text-slate-500" size={18} />
                                        </div>
                                        <input
                                            type="number"
                                            name="expectedStudents"
                                            value={formData.expectedStudents}
                                            onChange={handleChange}
                                            className="w-full bg-black/40 border border-white/10 text-white rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all placeholder:text-slate-600"
                                            placeholder="E.g. 500"
                                        />
                                    </div>
                                </div>

                                {/* Contact Name */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-300 ml-1">Contact Person Name *</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <User className="text-slate-500" size={18} />
                                        </div>
                                        <input
                                            type="text"
                                            name="contactName"
                                            required
                                            value={formData.contactName}
                                            onChange={handleChange}
                                            className="w-full bg-black/40 border border-white/10 text-white rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all placeholder:text-slate-600"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                </div>

                                {/* Designation */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-300 ml-1">Designation *</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <User className="text-slate-500" size={18} />
                                        </div>
                                        <input
                                            type="text"
                                            name="designation"
                                            required
                                            value={formData.designation}
                                            onChange={handleChange}
                                            className="w-full bg-black/40 border border-white/10 text-white rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all placeholder:text-slate-600"
                                            placeholder="E.g. TPO / HOD"
                                        />
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-300 ml-1">Official Email Address *</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Mail className="text-slate-500" size={18} />
                                        </div>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full bg-black/40 border border-white/10 text-white rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all placeholder:text-slate-600"
                                            placeholder="director@college.edu"
                                        />
                                    </div>
                                </div>

                                {/* Phone */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-300 ml-1">Phone Number *</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Phone className="text-slate-500" size={18} />
                                        </div>
                                        <input
                                            type="tel"
                                            name="phone"
                                            required
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full bg-black/40 border border-white/10 text-white rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all placeholder:text-slate-600"
                                            placeholder="+91 98765 43210"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Message */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300 ml-1">Any Specific Requirements / Message</label>
                                <div className="relative">
                                    <div className="absolute top-3 left-0 pl-4 flex items-start pointer-events-none">
                                        <MessageSquare className="text-slate-500" size={18} />
                                    </div>
                                    <textarea
                                        name="message"
                                        rows="4"
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full bg-black/40 border border-white/10 text-white rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all placeholder:text-slate-600 resize-none"
                                        placeholder="Tell us about the courses you're interested in, preferred timelines, etc."
                                    ></textarea>
                                </div>
                            </div>

                            {error && (
                                <p className="text-red-400 text-sm">{error}</p>
                            )}

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-extrabold text-lg hover:from-cyan-400 hover:to-blue-400 transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? 'Submitting...' : (
                                    <>
                                        Submit Registration <Send size={18} />
                                    </>
                                )}
                            </button>
                        </form>
                    )}
                </Motion.div>
            </div>
        </div>
    );
};

export default CollegeRegistration;
