import React, { useState } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    CheckCircle2, MonitorPlay, Infinity as InfinityIcon, CalendarDays,
    BookOpen, BookMarked, Code2, Users, FileDigit,
    Trophy, Briefcase, Zap, Shield, Database,
    LineChart, Cloud, Clock, SearchX, SearchCheck,
    HelpCircle, XCircle, ArrowRight, Laptop, Star, Cpu, Target, Bell,
    ChevronDown, Building2
} from 'lucide-react';

const CampusTechAccess = () => {
    const [openFaq, setOpenFaq] = useState(null);

    // Animation variants
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    return (
        <div className="min-h-screen bg-[#050510] relative overflow-hidden text-slate-300 font-sans pt-16 md:pt-24 pb-12 md:pb-20">
            {/* Background Effects */}
            <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[150px]"></div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10 space-y-16 md:space-y-24 lg:space-y-32">

                {/* HERO SECTION */}
                <section className="pt-10 lg:pt-20">
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                        <Motion.div
                            initial="hidden" animate="visible" variants={staggerContainer}
                            className="space-y-8"
                        >
                            <Motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-medium">
                                <Zap size={14} className="text-cyan-400" />
                                <span>Future-Ready Learning</span>
                            </Motion.div>

                            <Motion.h1 variants={fadeIn} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
                                Campus Tech Access <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Program</span>
                            </Motion.h1>

                            <Motion.p variants={fadeIn} className="text-lg sm:text-xl text-slate-400 font-medium max-w-xl">
                                Continuous Technology Learning Ecosystem
                            </Motion.p>

                            <Motion.div variants={fadeIn} className="flex flex-wrap gap-4 text-sm font-semibold text-slate-300">
                                <span className="flex items-center gap-1"><CheckCircle2 size={16} className="text-purple-400" /> Affordable</span>
                                <span className="flex items-center gap-1"><CheckCircle2 size={16} className="text-cyan-400" /> Self-Paced</span>
                                <span className="flex items-center gap-1"><CheckCircle2 size={16} className="text-cyan-400" /> Skill-Driven</span>
                            </Motion.div>

                            <Motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 pt-4">
                                <Link to="/college-registration" className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-black font-bold hover:bg-slate-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30_rgba(255,255,255,0.5)] flex items-center justify-center gap-2">
                                    <Building2 size={18} /> Register Your College
                                </Link>
                                <a href="#paths" className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 text-white font-bold border border-white/10 hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                                    Explore Learning Paths <ArrowRight size={18} />
                                </a>
                            </Motion.div>
                        </Motion.div>

                        <Motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/30 to-cyan-600/30 rounded-2xl blur-2xl"></div>
                            <div className="relative border border-white/10 rounded-2xl overflow-hidden bg-primary/80 backdrop-blur-sm p-4 shadow-2xl">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/20 blur-[50px]"></div>
                                {/* Abstract Dashboard Mockup */}
                                <div className="w-full h-64 md:h-80 bg-[#0a0a1a] rounded-xl border border-white/10 flex flex-col p-4 gap-4 overflow-hidden relative shadow-2xl">
                                    {/* App Bar */}
                                    <div className="flex justify-between items-center pb-2 border-b border-white/5">
                                        <div className="flex gap-2">
                                            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                                            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                                            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                                        </div>
                                        <div className="flex gap-3 text-[10px] text-slate-400 font-medium tracking-wide">
                                            <span className="text-white">Dashboard</span>
                                            <span>Courses</span>
                                            <span>Progress</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-4 h-full relative z-10 overflow-y-auto sm:overflow-hidden pb-4">
                                        {/* Sidebar Area */}
                                        <div className="w-full sm:w-1/3 flex flex-col gap-3">
                                            <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">Learning Path</div>

                                            <div className="w-full relative flex-grow bg-gradient-to-br from-purple-900/40 to-indigo-900/40 rounded-lg border border-purple-500/20 p-3 flex flex-col justify-between overflow-hidden shadow-inner group">
                                                <div className="absolute top-0 right-0 w-16 h-16 bg-purple-500/20 blur-xl group-hover:bg-purple-500/40 transition-all"></div>
                                                <div className="relative z-10">
                                                    <span className="text-[9px] text-purple-300/80 font-medium">IN PROGRESS</span>
                                                    <h4 className="text-xs md:text-sm font-bold text-white leading-tight mt-1">Full Stack + Gen AI</h4>
                                                </div>
                                                <div className="relative z-10 mt-2">
                                                    <div className="w-full bg-black/40 h-1.5 rounded-full overflow-hidden">
                                                        <div className="bg-purple-500 h-full w-[45%]"></div>
                                                    </div>
                                                    <span className="text-[8px] text-purple-200 mt-1 block text-right">45% Completed</span>
                                                </div>
                                            </div>

                                            <div className="w-full h-20 bg-gradient-to-br from-cyan-900/40 to-blue-900/40 rounded-lg border border-cyan-500/20 p-3 flex flex-col justify-between shadow-inner">
                                                <div>
                                                    <span className="text-[9px] text-cyan-300/80 font-medium">NEXT UP</span>
                                                    <h4 className="text-xs font-bold text-white mt-0.5 truncate">React & Next.js</h4>
                                                </div>
                                                <div className="flex items-center gap-1 text-[9px] text-cyan-200">
                                                    <Clock size={10} /> 4h 30m left
                                                </div>
                                            </div>
                                        </div>

                                        {/* Main Content Area */}
                                        <div className="w-full sm:w-2/3 flex flex-col gap-3">
                                            <div className="flex items-center justify-between bg-white/5 rounded-lg px-3 py-2 border border-white/5">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-purple-500 to-cyan-500 p-[1px]">
                                                        <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-[10px] font-bold text-white">S</div>
                                                    </div>
                                                    <div>
                                                        <div className="text-[10px] text-slate-400">Welcome back</div>
                                                        <div className="text-xs font-bold text-white">Student User</div>
                                                    </div>
                                                </div>
                                                <Bell size={12} className="text-slate-400" />
                                            </div>

                                            <div className="flex-grow bg-white/5 rounded-lg border border-white/5 p-4 flex flex-col relative overflow-hidden">
                                                {/* Decorative background grid */}
                                                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none"></div>

                                                <div className="relative z-10 flex flex-col h-full">
                                                    <h4 className="text-[11px] uppercase tracking-wider text-slate-400 font-bold mb-3">Today's Agenda</h4>

                                                    <div className="space-y-2 mb-4 flex-grow">
                                                        <div className="group flex items-center gap-2 bg-black/20 hover:bg-black/40 transition-colors p-2 rounded border border-white/5">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                                                            <div className="flex-grow">
                                                                <div className="text-xs text-slate-200 font-medium group-hover:text-purple-300 transition-colors">Async JS & Promises</div>
                                                                <div className="text-[9px] text-slate-500">Video Lesson • 45 mins</div>
                                                            </div>
                                                            <MonitorPlay size={12} className="text-slate-400 group-hover:text-purple-400" />
                                                        </div>

                                                        <div className="group flex items-center gap-2 bg-black/20 hover:bg-black/40 transition-colors p-2 rounded border border-white/5">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-500"></div>
                                                            <div className="flex-grow">
                                                                <div className="text-xs text-slate-200 font-medium group-hover:text-cyan-300 transition-colors">Build a REST API</div>
                                                                <div className="text-[9px] text-slate-500">Coding Practice • Due Today</div>
                                                            </div>
                                                            <Code2 size={12} className="text-slate-400 group-hover:text-cyan-400" />
                                                        </div>
                                                    </div>

                                                    <div className="mt-auto flex justify-between items-end pt-2 border-t border-white/10">
                                                        <div className="bg-gradient-to-r from-purple-500/20 to-transparent p-2 rounded-lg border-l-2 border-purple-500 flex items-center gap-2">
                                                            <Trophy size={14} className="text-purple-400" />
                                                            <div>
                                                                <div className="text-[9px] text-slate-400">Current Streak</div>
                                                                <div className="text-xs font-bold text-white">12 Days 🔥</div>
                                                            </div>
                                                        </div>

                                                        <button className="flex items-center gap-1 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 transition-colors text-white text-[9px] sm:text-[10px] font-bold px-2 sm:px-3 py-1 sm:py-1.5 rounded-md shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                                                            Resume <ArrowRight size={10} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Motion.div>
                    </div>
                </section>

                {/* SECTION 1 – Program Overview (Bento Grid) */}
                <Motion.section
                    initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn}
                    className="max-w-6xl mx-auto"
                >
                    <div className="grid lg:grid-cols-5 gap-6">
                        {/* Text Content */}
                        <div className="lg:col-span-3 p-8 md:p-12 rounded-[2rem] bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] -mr-20 -mt-20 transition-all duration-700 group-hover:bg-cyan-500/20 group-hover:scale-150"></div>
                            <div className="relative z-10 space-y-6 flex flex-col justify-center h-full">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-semibold uppercase tracking-widest w-fit mb-2">
                                    <BookOpen size={14} className="text-cyan-400" />
                                    <span>About The Ecosystem</span>
                                </div>
                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight">Program Overview</h2>
                                <p className="text-base sm:text-lg leading-relaxed text-slate-400">
                                    The Campus Tech Access Program is a subscription-based digital learning ecosystem designed to provide students with affordable, long-term access to high-demand technology skills.
                                </p>
                                <p className="text-base sm:text-lg leading-relaxed text-slate-400 font-medium">
                                    The platform follows a self-paced, recorded-first learning model, enabling students to learn at their convenience without fixed schedules or live class dependencies.
                                </p>
                            </div>
                        </div>

                        {/* 4 Cards Grid */}
                        <div className="lg:col-span-2 grid grid-cols-2 gap-4">
                            {[
                                { icon: Code2, text: "Skill exposure", color: "from-blue-500/20 to-blue-500/0", iconColor: "text-blue-400" },
                                { icon: Target, text: "Practice-driven", color: "from-purple-500/20 to-purple-500/0", iconColor: "text-purple-400" },
                                { icon: LineChart, text: "Structured progression", color: "from-pink-500/20 to-pink-500/0", iconColor: "text-pink-400" },
                                { icon: InfinityIcon, text: "Unlimited access", color: "from-cyan-500/20 to-cyan-500/0", iconColor: "text-cyan-400" }
                            ].map((item, idx) => {
                                const Icon = item.icon || Code2; // Fallback to Code2 if target isn't imported correctly earlier
                                return (
                                    <div key={idx} className={`p-4 rounded-3xl bg-white/5 border border-white/5 hover:border-white/20 transition-all duration-300 flex flex-col items-center justify-center text-center gap-3 relative overflow-hidden group hover:-translate-y-1 hover:shadow-xl`}>
                                        <div className={`absolute inset-0 bg-gradient-to-b ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                                        <div className="w-10 h-10 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center relative z-10 group-hover:scale-110 transition-transform duration-300">
                                            <Icon size={20} className={item.iconColor} />
                                        </div>
                                        <h3 className="font-semibold text-white relative z-10 text-xs md:text-sm">{item.text}</h3>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </Motion.section>

                {/* SECTION 2 – Pricing Structure */}
                <Motion.section
                    id="subscribe"
                    initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
                    className="space-y-16 relative"
                >
                    {/* Background Ambient Glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[500px] bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 blur-[100px] pointer-events-none rounded-full"></div>

                    <div className="text-center space-y-4 relative z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-semibold uppercase tracking-widest mb-2">
                            <Star size={14} className="text-yellow-400" />
                            <span>Transparent Value</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Pricing Structure</h2>
                        <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto">Incredible value structured specifically to make high-end technology education accessible for campus students.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto relative z-10">
                        {/* Base Plan */}
                        <Motion.div
                            variants={fadeIn}
                            whileHover={{ y: -10, scale: 1.01 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="relative group rounded-[2rem] p-[2px] overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-cyan-600 to-purple-600 opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
                            {/* Inner gradient to stop the full spin from being too crazy and make it edge only */}
                            <div className="absolute inset-0 bg-black/80 rounded-[2rem] z-0"></div>

                            <div className="relative z-10 h-full bg-gradient-to-b from-white/10 to-transparent backdrop-blur-2xl p-6 lg:p-8 rounded-[2rem] flex flex-col border border-white/10">
                                {/* Sparkle effect top corner */}
                                <div className="absolute -top-12 -right-12 w-32 h-32 bg-cyan-500/40 rounded-full blur-[40px] group-hover:bg-cyan-400/60 transition-colors duration-500"></div>

                                <div className="flex justify-between items-start mb-4">
                                    <div className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 text-cyan-400 text-sm font-semibold border border-cyan-500/20">Base Subscription</div>
                                    <div className="px-3 py-1 rounded-full bg-white text-black text-[10px] font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(255,255,255,0.4)]">Most Popular</div>
                                </div>

                                <div className="flex items-baseline gap-2 mb-2">
                                    <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">₹365</span>
                                    <span className="text-slate-400 font-medium">/ year</span>
                                </div>
                                <div className="flex items-center gap-2 mb-6">
                                    <Zap size={14} className="text-cyan-400 shrink-0" />
                                    <p className="text-sm text-cyan-400 font-medium">Equivalent Value: <span className="text-white font-bold">Just ₹1 per day</span></p>
                                </div>

                                <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent mb-6"></div>

                                <ul className="space-y-4 mb-8 flex-grow">
                                    <li className="flex items-start gap-4 text-slate-200">
                                        <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center shrink-0 mt-0.5">
                                            <CheckCircle2 className="text-cyan-400" size={14} />
                                        </div>
                                        <span><strong className="text-white">12 months</strong> full access from activation date</span>
                                    </li>
                                    <li className="flex items-start gap-4 text-slate-200">
                                        <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center shrink-0 mt-0.5">
                                            <CheckCircle2 className="text-cyan-400" size={14} />
                                        </div>
                                        <span><strong className="text-white">No additional payments</strong> for included courses</span>
                                    </li>
                                    <li className="flex items-start gap-4 text-slate-200">
                                        <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center shrink-0 mt-0.5">
                                            <CheckCircle2 className="text-cyan-400" size={14} />
                                        </div>
                                        <span><strong className="text-white">Unlimited</strong> content replays directly</span>
                                    </li>
                                    <li className="flex items-start gap-4 text-slate-500">
                                        <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center shrink-0 mt-0.5">
                                            <XCircle className="text-slate-500" size={14} />
                                        </div>
                                        <span>Live doubt clarification (Not included)</span>
                                    </li>
                                </ul>

                                <button className="w-full py-4 relative group/btn overflow-hidden rounded-xl bg-cyan-500 text-white font-bold shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] transition-all duration-300">
                                    <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black"></span>
                                    <span className="relative z-10 flex items-center justify-center gap-2">Start Base Plan <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" /></span>
                                </button>
                            </div>
                        </Motion.div>

                        {/* Add-on Plan */}
                        <Motion.div
                            variants={fadeIn}
                            whileHover={{ y: -10, scale: 1.01 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="relative group p-[2px] rounded-[2rem] overflow-hidden md:mt-6"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/40 via-pink-500/40 to-orange-500/40 opacity-40 group-hover:opacity-100 transition-opacity duration-500"></div>

                            <div className="relative z-10 h-full bg-[#050510]/95 backdrop-blur-2xl p-6 lg:p-8 rounded-[2rem] flex flex-col border border-white/5">
                                <div className="absolute -top-12 -right-12 w-32 h-32 bg-purple-500/20 rounded-full blur-[40px] group-hover:bg-purple-400/40 transition-colors duration-500"></div>

                                <div className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-400 text-sm font-semibold mb-4 w-fit border border-purple-500/20">Mentorship Add-On</div>
                                <div className="flex items-baseline gap-2 mb-2">
                                    <span className="text-4xl font-extrabold text-white">₹1,999</span>
                                    <span className="text-slate-400 font-medium">/ year</span>
                                </div>
                                <p className="text-sm text-purple-400/80 font-medium mb-6">Available to active subscribers only</p>

                                <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6"></div>

                                <ul className="space-y-4 mb-8 flex-grow">
                                    <li className="flex items-start gap-4 text-slate-300">
                                        <div className="w-6 h-6 rounded-full bg-purple-500/10 flex items-center justify-center shrink-0 mt-0.5">
                                            <Star className="text-purple-400" size={14} />
                                        </div>
                                        <span><strong className="text-white">Guided assistance</strong> & conceptual guidance</span>
                                    </li>
                                    <li className="flex items-start gap-4 text-slate-300">
                                        <div className="w-6 h-6 rounded-full bg-purple-500/10 flex items-center justify-center shrink-0 mt-0.5">
                                            <Star className="text-purple-400" size={14} />
                                        </div>
                                        <span><strong className="text-white">Doubt clarification</strong> support</span>
                                    </li>
                                    <li className="flex items-start gap-4 text-slate-300">
                                        <div className="w-6 h-6 rounded-full bg-purple-500/10 flex items-center justify-center shrink-0 mt-0.5">
                                            <Star className="text-purple-400" size={14} />
                                        </div>
                                        <span><strong className="text-white">Problem-solving</strong> & exact task assistance</span>
                                    </li>
                                    <li className="flex items-start gap-4 text-slate-300">
                                        <div className="w-6 h-6 rounded-full bg-purple-500/10 flex items-center justify-center shrink-0 mt-0.5">
                                            <Star className="text-purple-400" size={14} />
                                        </div>
                                        <span><strong className="text-white">Learning direction</strong> support</span>
                                    </li>
                                </ul>

                                <button className="w-full py-4 rounded-xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 hover:border-purple-500/50 transition-all duration-300 flex items-center justify-center gap-2">
                                    Explore Mentorship <ArrowRight size={18} className="opacity-50" />
                                </button>
                            </div>
                        </Motion.div>
                    </div>
                </Motion.section>

                {/* SECTION 3 & 4 – Access & Learning Model */}
                <section className="grid sm:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto pt-8 md:pt-12">
                    <Motion.div
                        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
                        className="p-[1px] rounded-[2rem] bg-gradient-to-br from-cyan-500/30 to-white/5 relative group hover:from-cyan-400/50 hover:to-white/10 transition-colors duration-500"
                    >
                        <div className="h-full bg-[#0a0a1a] rounded-[2rem] p-6 md:p-8 relative overflow-hidden flex flex-col items-center text-center">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-[60px] rounded-full group-hover:bg-cyan-500/20 transition-all duration-700 group-hover:scale-150"></div>

                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-transparent border border-cyan-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                                <CalendarDays className="text-cyan-400" size={32} />
                            </div>

                            <h3 className="text-xl md:text-2xl font-bold text-white mb-5">Access Duration</h3>
                            <ul className="space-y-4 w-full text-left bg-white/5 p-5 rounded-2xl border border-white/5 group-hover:border-cyan-500/20 transition-colors mt-auto">
                                <li className="flex items-center gap-3"><CheckCircle2 className="text-cyan-400 shrink-0" size={18} /> <span className="text-slate-200 text-sm">12 months from activation</span></li>
                                <li className="flex items-center gap-3"><CheckCircle2 className="text-cyan-400 shrink-0" size={18} /> <span className="text-slate-200 text-sm">Unlimited usage within validity</span></li>
                                <div className="h-px w-full bg-white/10 my-2"></div>
                                <li className="flex items-start gap-3"><span className="text-slate-400 text-xs italic">Expired subscriptions require renewal</span></li>
                            </ul>
                        </div>
                    </Motion.div>

                    <Motion.div
                        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
                        className="p-[1px] rounded-[2rem] bg-gradient-to-br from-purple-500/30 to-white/5 relative group hover:from-purple-400/50 hover:to-white/10 transition-colors duration-500"
                    >
                        <div className="h-full bg-[#0a0a1a] rounded-[2rem] p-6 md:p-8 relative overflow-hidden flex flex-col items-center text-center">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 blur-[60px] rounded-full group-hover:bg-purple-500/20 transition-all duration-700 group-hover:scale-150"></div>

                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-transparent border border-purple-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                                <Laptop className="text-purple-400" size={32} />
                            </div>

                            <h3 className="text-xl md:text-2xl font-bold text-white mb-1">Learning Model</h3>
                            <p className="text-purple-300/80 mb-5 text-[10px] font-bold uppercase tracking-[0.2em]">Self-paced digital system</p>

                            <ul className="space-y-3 w-full text-left bg-white/5 p-5 rounded-2xl border border-white/5 group-hover:border-purple-500/20 transition-colors mt-auto">
                                <li className="flex items-center gap-3"><CheckCircle2 className="text-purple-400 shrink-0" size={18} /> <span className="text-slate-200 text-sm">Learn anytime, anywhere</span></li>
                                <li className="flex items-center gap-3"><CheckCircle2 className="text-purple-400 shrink-0" size={18} /> <span className="text-slate-200 text-sm">Students progress at personal speed</span></li>
                                <div className="h-px w-full bg-white/10 my-1"></div>
                                <li className="flex items-center gap-3"><XCircle className="text-slate-500 shrink-0" size={16} /> <span className="text-slate-400 text-sm line-through decoration-slate-600">Fixed class schedules</span></li>
                                <li className="flex items-center gap-3"><XCircle className="text-slate-500 shrink-0" size={16} /> <span className="text-slate-400 text-sm line-through decoration-slate-600">Mandatory live sessions</span></li>
                            </ul>
                        </div>
                    </Motion.div>
                </section>

                {/* SECTION 5 – Learning Structure */}
                <Motion.section
                    id="paths"
                    initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
                    className="space-y-12 max-w-6xl mx-auto pt-10"
                >
                    <div className="text-center space-y-4 max-w-3xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-semibold uppercase tracking-widest mb-2">
                            <Code2 size={14} className="text-purple-400" />
                            <span>Structured Flexibility</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">Learning Structure</h2>
                        <p className="text-base sm:text-lg text-slate-400">Pave your own path. Follow our recommended sequence or explore domains freely within your active subscription.</p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-6">
                        {/* Foundational Path */}
                        <div className="lg:col-span-1 p-[1px] rounded-[2rem] overflow-hidden bg-gradient-to-br from-purple-500 to-indigo-500 relative group">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                            <div className="h-full bg-[#0a0a1a]/95 backdrop-blur-xl rounded-[2rem] p-8 relative flex flex-col">
                                <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-500/30 blur-[40px] rounded-full group-hover:bg-cyan-500/30 transition-colors duration-700"></div>

                                <div className="inline-block px-3 py-1 bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[10px] font-bold uppercase tracking-widest rounded-full w-fit mb-6">Recommended First Track</div>

                                <h3 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 mb-4">Full Stack + Gen AI</h3>
                                <p className="text-slate-300 text-sm mb-8 leading-relaxed">Completion is highly recommended to build strong fundamentals.</p>

                                <div className="mt-auto space-y-4 bg-white/5 p-5 rounded-2xl border border-white/5 relative z-10">
                                    <h4 className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-2">Core Focus Areas</h4>
                                    <ul className="space-y-3 relative z-10">
                                        <li className="flex items-start gap-3 text-sm"><CheckCircle2 size={16} className="text-purple-400 mt-0.5 shrink-0" /> <span className="text-slate-200">Programming logic</span></li>
                                        <li className="flex items-start gap-3 text-sm"><CheckCircle2 size={16} className="text-purple-400 mt-0.5 shrink-0" /> <span className="text-slate-200">Frontend & backend concepts</span></li>
                                        <li className="flex items-start gap-3 text-sm"><CheckCircle2 size={16} className="text-purple-400 mt-0.5 shrink-0" /> <span className="text-slate-200">AI-assisted workflows</span></li>
                                        <li className="flex items-start gap-3 text-sm"><CheckCircle2 size={16} className="text-purple-400 mt-0.5 shrink-0" /> <span className="text-slate-200">Practical problem solving</span></li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Advanced Library */}
                        <div className="lg:col-span-2 p-8 md:p-10 rounded-[2rem] bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 flex flex-col">
                            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-white/10">
                                <div>
                                    <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-2">Advanced Domain Library</h3>
                                    <p className="text-slate-400 max-w-md">Pursue individually, sequentially, or simultaneously. No domain restrictions.</p>
                                </div>
                                <div className="mt-4 md:mt-0 text-[10px] text-cyan-400 font-bold uppercase tracking-widest bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20 whitespace-nowrap">
                                    All Included
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 auto-rows-fr">
                                {[
                                    { icon: Cloud, name: "Cloud Computing", color: "hover:bg-blue-500/10 hover:border-blue-500/30", iconColor: "text-blue-400" },
                                    { icon: Shield, name: "Cybersecurity", color: "hover:bg-red-500/10 hover:border-red-500/30", iconColor: "text-red-400" },
                                    { icon: Database, name: "Data Science", color: "hover:bg-green-500/10 hover:border-green-500/30", iconColor: "text-green-400" },
                                    { icon: LineChart, name: "Data Analytics", color: "hover:bg-orange-500/10 hover:border-orange-500/30", iconColor: "text-orange-400" },
                                    { icon: Cpu, name: "AI / ML", color: "hover:bg-purple-500/10 hover:border-purple-500/30", iconColor: "text-purple-400" }
                                ].map((domain, idx) => (
                                    <div key={idx} className={`p-4 rounded-2xl bg-[#0a0a1a] border border-white/5 flex flex-col items-center justify-center text-center gap-3 transition-all duration-300 ${domain.color} group cursor-default hover:-translate-y-1 hover:shadow-lg`}>
                                        <div className={`w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                                            <domain.icon className={domain.iconColor} size={20} />
                                        </div>
                                        <span className="font-bold text-xs text-slate-200">{domain.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Motion.section>

                {/* SECTION 6 – What Base Subscription Includes */}
                <Motion.section
                    initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
                    className="space-y-12 max-w-6xl mx-auto pt-10"
                >
                    <div className="text-center space-y-4">
                        <h2 className="text-2xl sm:text-3xl font-bold text-white">Included in Base Subscription</h2>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { icon: MonitorPlay, text: "Recorded video lessons", color: "from-blue-500/20 to-transparent", border: "hover:border-blue-500/50" },
                            { icon: BookMarked, text: "Structured learning paths", color: "from-purple-500/20 to-transparent", border: "hover:border-purple-500/50" },
                            { icon: FileDigit, text: "Concise cheat sheets", color: "from-pink-500/20 to-transparent", border: "hover:border-pink-500/50" },
                            { icon: SearchCheck, text: "MCQ-based assessments", color: "from-orange-500/20 to-transparent", border: "hover:border-orange-500/50" },
                            { icon: Code2, text: "Practice coding exercises", color: "from-emerald-500/20 to-transparent", border: "hover:border-emerald-500/50" },
                            { icon: Target, text: "Self-evaluation mechanisms", color: "from-cyan-500/20 to-transparent", border: "hover:border-cyan-500/50" },
                            { icon: LineChart, text: "Progress tracking", color: "from-yellow-500/20 to-transparent", border: "hover:border-yellow-500/50" },
                            { icon: Trophy, text: "Auto-generated certificates", color: "from-indigo-500/20 to-transparent", border: "hover:border-indigo-500/50" }
                        ].map((item, idx) => (
                            <Motion.div variants={fadeIn} key={idx} className={`p-4 rounded-[1.5rem] bg-gradient-to-b from-white/5 to-[#050510] border border-white/5 flex flex-col items-center text-center gap-3 group hover:-translate-y-1 transition-all duration-300 ${item.border} shadow-lg relative overflow-hidden`}>
                                <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}></div>
                                <div className="p-3 rounded-2xl bg-white/5 group-hover:bg-white/10 transition-colors relative z-10">
                                    <item.icon className="text-cyan-400 group-hover:scale-110 transition-transform" size={24} />
                                </div>
                                <span className="text-xs font-semibold text-slate-200 relative z-10">{item.text}</span>
                            </Motion.div>
                        ))}
                    </div>
                </Motion.section>

                {/* SECTION 7, 8, 9 - Practice, Support & Mentorship */}
                <Motion.section
                    initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
                    className="grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto pt-8"
                >
                    {/* Practice */}
                    <Motion.div variants={fadeIn} className="p-8 md:p-10 rounded-[2rem] bg-gradient-to-b from-white/5 to-[#050510] border border-white/10 flex flex-col group relative overflow-hidden">
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-[40px] group-hover:bg-cyan-500/20 transition-all duration-700"></div>
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-transparent border border-cyan-500/20 flex items-center justify-center mb-6 relative z-10 group-hover:scale-110 transition-transform">
                            <Code2 className="text-cyan-400" size={28} />
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-white mb-3 relative z-10">Practice & Assessment</h3>
                        <p className="text-slate-400 text-sm mb-8 leading-relaxed relative z-10">Performance tracking may be used for eligibility-based opportunities like internships.</p>

                        <ul className="space-y-4 mt-auto relative z-10 bg-black/20 p-6 rounded-2xl border border-white/5">
                            <li className="flex items-start gap-3 text-sm text-slate-300"><CheckCircle2 size={16} className="text-cyan-400 shrink-0 mt-0.5" /> Coding exercises</li>
                            <li className="flex items-start gap-3 text-sm text-slate-300"><CheckCircle2 size={16} className="text-cyan-400 shrink-0 mt-0.5" /> Knowledge reinforcement</li>
                            <li className="flex items-start gap-3 text-sm text-slate-300"><CheckCircle2 size={16} className="text-cyan-400 shrink-0 mt-0.5" /> Objective assessments (MCQs)</li>
                            <li className="flex items-start gap-3 text-sm text-slate-300"><CheckCircle2 size={16} className="text-cyan-400 shrink-0 mt-0.5" /> Skill validation checkpoints</li>
                        </ul>
                    </Motion.div>

                    {/* Support Model */}
                    <Motion.div variants={fadeIn} className="p-8 md:p-10 rounded-[2rem] bg-gradient-to-b from-white/5 to-[#050510] border border-white/10 flex flex-col group relative overflow-hidden">
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-slate-500/10 rounded-full blur-[40px] group-hover:bg-slate-500/20 transition-all duration-700"></div>
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-500/20 to-transparent border border-slate-500/20 flex items-center justify-center mb-6 relative z-10 group-hover:scale-110 transition-transform">
                            <HelpCircle className="text-slate-300" size={28} />
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-white mb-3 relative z-10">Base Support Model</h3>
                        <p className="text-slate-400 text-sm mb-8 leading-relaxed relative z-10">To maintain affordability & scalability, live doubt clarification is <strong className="text-white bg-white/10 px-1 rounded">not included</strong> in the base plan.</p>

                        <ul className="space-y-4 mt-auto relative z-10 bg-black/20 p-6 rounded-2xl border border-white/5">
                            <li className="flex items-start gap-3 text-sm text-slate-400"><CheckCircle2 size={16} className="text-slate-500 shrink-0 mt-0.5" /> Structured explanations</li>
                            <li className="flex items-start gap-3 text-sm text-slate-400"><CheckCircle2 size={16} className="text-slate-500 shrink-0 mt-0.5" /> Practice-driven modules</li>
                            <li className="flex items-start gap-3 text-sm text-slate-400"><CheckCircle2 size={16} className="text-slate-500 shrink-0 mt-0.5" /> Self-guided resources</li>
                            <li className="flex items-start gap-3 text-sm text-slate-400"><CheckCircle2 size={16} className="text-slate-500 shrink-0 mt-0.5" /> Knowledge aids</li>
                        </ul>
                    </Motion.div>

                    {/* Mentorship Addon Details */}
                    <Motion.div variants={fadeIn} className="p-8 md:p-10 rounded-[2rem] bg-gradient-to-br from-purple-900/40 to-[#050510] border border-purple-500/30 flex flex-col group relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/30 rounded-full blur-[50px] group-hover:bg-purple-400/40 transition-all duration-700"></div>

                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/30 to-transparent border border-purple-500/40 flex items-center justify-center mb-6 relative z-10 group-hover:scale-110 transition-transform">
                            <Users className="text-purple-300" size={28} />
                        </div>
                        <div className="relative z-10 flex flex-col h-full">
                            <h3 className="text-xl md:text-2xl font-bold text-white mb-3">Mentorship Add-On</h3>
                            <p className="text-purple-200/80 text-sm mb-8 leading-relaxed">Human-assisted learning support via scheduled sessions, tickets, or chat.</p>

                            <div className="mt-auto p-6 rounded-2xl bg-[#050510]/80 backdrop-blur-md border border-purple-500/20 text-xs text-purple-200 shadow-inner group-hover:border-purple-500/40 transition-colors">
                                <p className="text-sm font-bold text-white mb-3 flex items-center gap-2"><Target size={14} className="text-purple-400" /> Important Note</p>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1 shrink-0"></span> Improves support</li>
                                    <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1 shrink-0"></span> Response timelines may vary</li>
                                    <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1 shrink-0"></span> Coverage applies to platform learning topics</li>
                                </ul>
                            </div>
                        </div>
                    </Motion.div>
                </Motion.section>

                {/* SECTION 10, 11, 12, 13 - Outcomes & Opportunities */}
                <Motion.section
                    initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
                    className="space-y-12 max-w-6xl mx-auto pt-10"
                >
                    <div className="text-center space-y-4 mb-12">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-semibold uppercase tracking-widest mb-2">
                            <Briefcase size={14} className="text-cyan-400" />
                            <span>Future Pathways</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">Outcomes & Opportunities</h2>
                        <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto">Platform facilitates exposure and merit-based opportunities, but true success depends on your consistency and effort.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Certificates */}
                        <Motion.div variants={fadeIn} className="group p-6 rounded-[2rem] bg-gradient-to-b from-white/5 to-[#050510] border border-white/10 hover:border-cyan-500/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.1)] relative overflow-hidden">
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-[30px] group-hover:bg-cyan-500/20 transition-all duration-500"></div>
                            <div className="flex flex-col sm:flex-row gap-4 items-start relative z-10">
                                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center shrink-0 border border-cyan-500/20 group-hover:bg-cyan-500/20 transition-colors">
                                    <Trophy className="text-cyan-400 group-hover:scale-110 transition-transform" size={24} />
                                </div>
                                <div className="space-y-2">
                                    <h4 className="font-bold text-white text-lg">Certification System</h4>
                                    <p className="text-xs text-slate-300 leading-relaxed">Auto-generated digitally upon meeting defined criteria. Confirms learning completion, not job placement.</p>
                                    <div className="flex flex-wrap gap-2 pt-1">
                                        <span className="text-[10px] font-medium px-2 py-1 rounded bg-white/5 text-slate-300 border border-white/10">Unique ID</span>
                                        <span className="text-[10px] font-medium px-2 py-1 rounded bg-white/5 text-slate-300 border border-white/10">Domain Tagging</span>
                                        <span className="text-[10px] font-medium px-2 py-1 rounded bg-white/5 text-slate-300 border border-white/10">Verifiable</span>
                                    </div>
                                </div>
                            </div>
                        </Motion.div>

                        {/* Internships */}
                        <Motion.div variants={fadeIn} className="group p-6 rounded-[2rem] bg-gradient-to-b from-white/5 to-[#050510] border border-white/10 hover:border-purple-500/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.1)] relative overflow-hidden">
                            <div className="absolute -top-10 -left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-[30px] group-hover:bg-purple-500/20 transition-all duration-500"></div>
                            <div className="flex flex-col sm:flex-row gap-4 items-start relative z-10">
                                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center shrink-0 border border-purple-500/20 group-hover:bg-purple-500/20 transition-colors">
                                    <Briefcase className="text-purple-400 group-hover:scale-110 transition-transform" size={24} />
                                </div>
                                <div className="space-y-2">
                                    <h4 className="font-bold text-white text-lg">Internship Exposure</h4>
                                    <p className="text-xs text-slate-300 leading-relaxed">Subscribers receive opportunity notifications, application guidance, and resume preparation aids.</p>
                                    <div className="flex flex-wrap gap-2 pt-1">
                                        <span className="text-[10px] font-medium px-2 py-1 rounded bg-white/5 text-slate-300 border border-white/10">Merit-based selection</span>
                                        <span className="text-[10px] font-medium px-2 py-1 rounded bg-white/5 text-slate-300 border border-white/10">Partner outreach</span>
                                    </div>
                                </div>
                            </div>
                        </Motion.div>

                        {/* Performance */}
                        <Motion.div variants={fadeIn} className="group p-6 rounded-[2rem] bg-gradient-to-b from-white/5 to-[#050510] border border-white/10 hover:border-yellow-500/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(234,179,8,0.1)] relative overflow-hidden">
                            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-yellow-500/10 rounded-full blur-[30px] group-hover:bg-yellow-500/20 transition-all duration-500"></div>
                            <div className="flex flex-col sm:flex-row gap-4 items-start relative z-10">
                                <div className="w-12 h-12 rounded-2xl bg-yellow-500/10 flex items-center justify-center shrink-0 border border-yellow-500/20 group-hover:bg-yellow-500/20 transition-colors">
                                    <Star className="text-yellow-400 group-hover:scale-110 transition-transform" size={24} />
                                </div>
                                <div className="space-y-2">
                                    <h4 className="font-bold text-white text-lg">Performance Opportunities</h4>
                                    <p className="text-xs text-slate-300 leading-relaxed">High-performing students may be considered for internal project participation and paid contributions.</p>
                                    <p className="text-[10px] font-bold uppercase tracking-wider text-yellow-500/80">Based on assessments, project quality, and consistency.</p>
                                </div>
                            </div>
                        </Motion.div>

                        {/* Residency */}
                        <Motion.div variants={fadeIn} className="group p-6 rounded-[2rem] bg-gradient-to-b from-white/5 to-[#050510] border border-white/10 hover:border-cyan-500/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.1)] relative overflow-hidden">
                            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-[30px] group-hover:bg-cyan-500/20 transition-all duration-500"></div>
                            <div className="flex flex-col sm:flex-row gap-4 items-start relative z-10">
                                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center shrink-0 border border-cyan-500/20 group-hover:bg-cyan-500/20 transition-colors">
                                    <Zap className="text-cyan-400 group-hover:scale-110 transition-transform" size={24} />
                                </div>
                                <div className="space-y-2">
                                    <h4 className="font-bold text-white text-lg">Office Residency</h4>
                                    <p className="text-xs text-slate-300 leading-relaxed">Selected candidates may be invited for short-term project residency (15–30 days). Learning & exposure oriented.</p>
                                    <p className="text-[10px] font-bold uppercase tracking-wider text-cyan-500/80">Limited seats. Availability varies.</p>
                                </div>
                            </div>
                        </Motion.div>
                    </div>
                </Motion.section>

                {/* SECTION 14, 15, 16, 17, 18 - Philosophies & Profile */}
                <Motion.section
                    initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
                    className="p-8 md:p-14 rounded-[2.5rem] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/[0.05] via-[#050510] to-[#050510] border border-white/5 max-w-6xl mx-auto shadow-2xl relative overflow-hidden"
                >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>

                    <div className="grid md:grid-cols-2 gap-12 md:gap-16">
                        <div className="space-y-8 relative z-10">
                            <div>
                                <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-4">Platform Philosophy</h3>
                                <p className="text-slate-300 leading-relaxed text-base sm:text-lg">Designed as a digital learning infrastructure, skill development ecosystem, and continuous practice environment, not a traditional coaching institute.</p>
                            </div>

                            <div className="space-y-5 bg-black/20 p-6 rounded-[1.5rem] border border-white/5">
                                <h4 className="font-bold text-white text-sm uppercase tracking-wider flex items-center gap-2">
                                    <Target size={16} className="text-red-400" /> Critical Reminders
                                </h4>
                                <ul className="space-y-4 text-sm text-slate-300">
                                    <li className="flex items-start gap-3"><ArrowRight size={16} className="text-purple-400 shrink-0 mt-0.5" /> <span className="leading-relaxed">Learning outcomes depend entirely on your effort & consistency.</span></li>
                                    <li className="flex items-start gap-3"><ArrowRight size={16} className="text-purple-400 shrink-0 mt-0.5" /> <span className="leading-relaxed text-white font-medium">There are absolutely no guaranteed placements or internships.</span></li>
                                    <li className="flex items-start gap-3"><ArrowRight size={16} className="text-purple-400 shrink-0 mt-0.5" /> <span className="leading-relaxed">Base plan is purely self-guided without live mentoring.</span></li>
                                    <li className="flex items-start gap-3"><ArrowRight size={16} className="text-purple-400 shrink-0 mt-0.5" /> <span className="leading-relaxed">Self-discipline is essential for success.</span></li>
                                </ul>
                            </div>
                        </div>

                        <div className="space-y-10 relative z-10">
                            <div>
                                <h4 className="font-bold text-xl text-white mb-6 flex items-center gap-2">
                                    <Users size={20} className="text-cyan-400" /> The Ideal Student Profile
                                </h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {[
                                        { text: "Prefers self-paced learning", icon: Clock, color: "text-blue-400", bg: "bg-blue-500/10" },
                                        { text: "Values affordability", icon: Zap, color: "text-yellow-400", bg: "bg-yellow-500/10" },
                                        { text: "Comfortable with recorded content", icon: MonitorPlay, color: "text-purple-400", bg: "bg-purple-500/10" },
                                        { text: "Self-driven", icon: Target, color: "text-red-400", bg: "bg-red-500/10" },
                                        { text: "Practice-oriented", icon: Code2, color: "text-cyan-400", bg: "bg-cyan-500/10" }
                                    ].map((tag, i) => (
                                        <div key={i} className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 group">
                                            <div className={`w-8 h-8 rounded-lg ${tag.bg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                                                <tag.icon size={16} className={tag.color} />
                                            </div>
                                            <span className="text-sm font-medium text-slate-200">
                                                {tag.text}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-8 border-t border-white/10">
                                <h4 className="font-bold text-xl text-white mb-4 flex items-center gap-2">
                                    <Database size={20} className="text-cyan-400" /> Campus Partnerships
                                </h4>
                                <p className="text-slate-300 mb-5 leading-relaxed">May function as a Digital Skill Lab, Tech Learning Infrastructure, or Placement Prep System for educational institutions.</p>
                                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-900/30 text-cyan-300 text-sm font-bold border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.1)]">
                                    <Zap size={14} /> Bulk subscription models available
                                </span>
                            </div>
                        </div>
                    </div>
                </Motion.section>

                {/* SECTION 19 – FAQ */}
                <Motion.section
                    initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
                    className="max-w-4xl mx-auto space-y-10 pt-10"
                >
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold uppercase tracking-widest mb-4">
                            <HelpCircle size={14} className="text-purple-400" />
                            <span>Clarifications</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">Frequently Asked Questions</h2>
                    </div>

                    <div className="max-w-3xl mx-auto space-y-3">
                        {[
                            { q: "Is this a live training program?", a: "No. The platform is recorded-first and self-paced. We believe in providing you the flexibility to learn at your own rhythm without being tied to a fixed schedule." },
                            { q: "Can I access multiple domains?", a: "Yes. All listed domains, including Cloud Computing, Cybersecurity, Data Science, and AI/ML, are fully included in the base subscription without any hidden fees." },
                            { q: "Are internships guaranteed?", a: "No. Only exposure and assistance are provided based on merit. We equip you with the skills, connect you with opportunities, and provide interview prep, but you must earn the position." },
                            { q: "How do certificates work?", a: "Certificates are auto-generated digitally after specific learning completion criteria and assessments are met. They are verifiable and contain unique domain tagging." },
                            { q: "Are courses frequently updated?", a: "Yes. Our expert team regularly reviews and updates course content to ensure it aligns with the newest industry standards and technology trends." },
                            { q: "Is there mentorship available?", a: "Yes! While the base plan is self-paced, you can upgrade to our dedicated premium Mentorship Add-On for ₹1,999/year to receive guided assistance and doubt clarification." }
                        ].map((faq, idx) => (
                            <Motion.div variants={fadeIn} key={idx} className={`rounded-2xl border transition-all duration-300 overflow-hidden ${openFaq === idx ? 'bg-white/10 border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.15)]' : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-cyan-500/30'}`}>
                                <button
                                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                                    className="w-full text-left p-5 flex items-center justify-between gap-4 focus:outline-none"
                                >
                                    <h4 className="font-bold text-white text-sm md:text-base flex items-start gap-3 flex-1">
                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300 ${openFaq === idx ? 'bg-cyan-500/20 text-cyan-400' : 'bg-white/10 text-slate-400'}`}>
                                            <HelpCircle size={12} />
                                        </div>
                                        <span className="mt-0.5">{faq.q}</span>
                                    </h4>
                                    <div className={`shrink-0 transition-transform duration-300 ${openFaq === idx ? 'rotate-180 text-cyan-400' : 'text-slate-500'}`}>
                                        <ChevronDown size={18} />
                                    </div>
                                </button>
                                <AnimatePresence>
                                    {openFaq === idx && (
                                        <Motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                        >
                                            <div className="px-5 pb-5 pt-0 sm:pl-14">
                                                <div className="h-px w-full bg-white/10 mb-4"></div>
                                                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">{faq.a}</p>
                                            </div>
                                        </Motion.div>
                                    )}
                                </AnimatePresence>
                            </Motion.div>
                        ))}
                    </div>
                </Motion.section>

                {/* Final CTA */}
                <Motion.section
                    initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
                    className="relative rounded-[2.5rem] md:rounded-[3rem] overflow-hidden mt-24 mb-10 max-w-5xl mx-auto"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/40 via-purple-600/40 to-[#050510] z-0"></div>
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] mix-blend-overlay z-0"></div>
                    <div className="absolute inset-0 bg-[#050510]/80 backdrop-blur-2xl z-0 border border-white/10 rounded-[2.5rem] md:rounded-[3rem]"></div>

                    {/* Decorative glowing orbs */}
                    <div className="absolute top-0 right-1/4 w-64 h-64 bg-cyan-500/30 rounded-full blur-[80px] z-0 pointer-events-none"></div>
                    <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-purple-500/30 rounded-full blur-[80px] z-0 pointer-events-none"></div>

                    <div className="relative z-10 px-6 py-8 md:p-14 text-center flex flex-col items-center">
                        <div className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white text-[10px] font-bold uppercase tracking-widest mb-6 backdrop-blur-md">
                            Begin your journey
                        </div>

                        <h2 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 mb-6 md:mb-8 max-w-3xl leading-tight">
                            Start Your 12-Month Learning Journey Today
                        </h2>

                        <div className="flex flex-col items-center gap-3 mb-6 md:mb-8 py-5 px-6 md:px-8 rounded-3xl bg-black/20 border border-white/5 backdrop-blur-sm">
                            <div className="flex flex-col items-center">
                                <span className="text-4xl md:text-5xl font-extrabold text-cyan-400 tracking-tight">₹365 <span className="text-xl text-slate-400 font-medium tracking-normal">per year</span></span>
                                <div className="flex items-center gap-1 mt-1">
                                    <Zap size={12} className="text-cyan-400" />
                                    <span className="text-xs text-cyan-400 font-bold uppercase tracking-wider">Just ₹1 per day</span>
                                </div>
                            </div>
                            <span className="text-[10px] font-semibold text-purple-300 bg-purple-500/20 px-3 py-1 rounded-full border border-purple-500/20 mt-1 max-w-[200px] md:max-w-none text-center leading-tight">Upgrade anytime for mentorship support</span>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 w-full max-w-md md:max-w-none">
                            <button className="px-6 py-3 w-full sm:w-48 text-sm rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-extrabold hover:from-cyan-400 hover:to-blue-400 transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] hover:-translate-y-0.5">
                                Subscribe Now
                            </button>
                            <Link to="/contact" className="px-6 py-3 w-full sm:w-48 text-sm rounded-xl bg-white/5 border border-white/20 text-white font-bold hover:bg-white/10 hover:border-white/30 transition-all backdrop-blur-md hover:-translate-y-0.5 flex items-center justify-center">
                                Contact if interested
                            </Link>
                        </div>
                    </div>
                    {/* SECTION 20 - Transparency */}
                    <div className="pt-4 border-t border-white/10 mt-6 text-[10px] md:text-xs text-slate-500 max-w-2xl mx-auto flex flex-col gap-1 items-center relative z-10 px-6 pb-6 md:pb-8">
                        <div className="flex items-center gap-1 text-center leading-tight"><Shield size={12} className="shrink-0" /> Access intended for enrolled subscribers only. Misuse or sharing may result in restrictions.</div>
                        <div className="text-center leading-tight">Features may evolve to improve learning experience.</div>
                    </div>
                </Motion.section>

            </div>
        </div>
    );
};

export default CampusTechAccess;
