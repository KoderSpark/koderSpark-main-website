import React, { useEffect, useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, ChevronRight, Zap, Briefcase, Code, Award, Target, Rocket, Sparkles, Calendar, Laptop, Building2, Users, Banknote, TrendingUp, Wallet, Layout, DollarSign } from 'lucide-react';
import SEO from '../components/SEO';
import { courses } from '../data/courses';
import Chatbot from '../components/Chatbot';

const offlineImages = [
    "/workspace_placeholder.webp",
    "/offline_mentorship.webp",
    "/developer_community.webp"
];

const CourseDetail = () => {
    const { id } = useParams();
    const course = courses.find(c => c.id === id);

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % offlineImages.length);
        }, 3000); // Change every 3 seconds

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!course) {
        return <Navigate to="/program" replace />;
    }



    return (
        <main className="min-h-screen pt-28 pb-20 px-4 bg-primary relative overflow-hidden">
            <SEO
                title={`${course.title} | KoderSpark`}
                description={course.description}
                canonical={`https://koderspark.com/program/${id}`}
            />

            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[100px] -z-10 animate-pulse"></div>
            <div className={`absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr ${course.gradient} opacity-10 rounded-full blur-[100px] -z-10 animate-pulse`} style={{ animationDelay: '2s' }}></div>

            <div className="max-w-6xl mx-auto">
                {/* Back Link */}
                <Link to="/" className="inline-flex items-center text-slate-400 hover:text-white mb-8 transition-colors">
                    <ChevronRight className="w-4 h-4 rotate-180 mr-1" /> Back to Home
                </Link>

                {/* Hero Section */}
                <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-12 md:mb-20">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm mb-8 hover:bg-white/10 transition-colors group cursor-default">
                            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white/10 overflow-hidden shrink-0 border border-white/10">
                                {typeof course.icon === 'string' ? (
                                    <img src={course.icon} alt={course.title} className="w-full h-full object-contain" />
                                ) : (
                                    <course.icon className="w-4 h-4 text-secondary" />
                                )}
                            </div>
                            <span className="text-secondary font-semibold tracking-wide">{course.subtitle}</span>
                        </div>
                        <h1 className="text-3xl md:text-6xl font-bold font-heading text-white mb-4 md:mb-6">
                            {course.title}
                        </h1>
                        <p className="text-slate-400 text-base md:text-lg leading-relaxed mb-6">
                            {course.longDescription}
                        </p>

                        {/* Program Details Badges */}
                        <div className="flex flex-wrap gap-4 mb-8">
                            <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-slate-300 flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-secondary" /> {course.programDetails.duration}
                            </div>
                            <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-slate-300 flex items-center gap-2">
                                <Laptop className="w-4 h-4 text-secondary" /> {course.programDetails.format}
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <Link
                                to="/contact"
                                state={{ message: `I am interested in registering for the ${course.title} course.` }}
                                className="px-8 py-4 rounded-xl bg-gradient-to-r from-secondary to-accent text-white font-bold cursor-pointer hover:shadow-lg hover:shadow-secondary/25 transition-all duration-300 flex items-center gap-2"
                            >
                                Register Now <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative"
                    >
                        <div className={`absolute inset-0 bg-gradient-to-r ${course.gradient} blur-3xl opacity-20`}></div>
                        <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 md:p-8">
                            <h3 className="text-xl font-bold text-white mb-4 md:mb-6">Course Philosophy</h3>
                            <ul className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                                {course.philosophy.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <Zap className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                                        <span className="text-slate-300 text-sm md:text-base">{item}</span>
                                    </li>
                                ))}
                            </ul>

                            <h3 className="text-xl font-bold text-white mb-4 md:mb-6 pt-6 border-t border-white/10">Final Outcomes</h3>
                            <ul className="space-y-3 md:space-y-4">
                                {course.outcomes.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <Target className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                                        <span className="text-slate-300 text-sm md:text-base">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                </div>

                {/* Zigzag Timeline Section */}
                <div className="mb-12 md:mb-24 relative">
                    <div className="text-center mb-10 md:mb-16">
                        <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">Your Journey Map</h2>
                        <p className="text-slate-400 text-sm md:text-base">From Beginner to Professional Vibe Coder</p>
                    </div>

                    <div className="hidden md:flex relative max-w-4xl mx-auto h-[400px] items-center justify-center">
                        {/* Central Line */}
                        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-0.5 bg-white/10 overflow-hidden rounded-full">
                            <motion.div
                                className="w-full h-full bg-gradient-to-r from-transparent via-secondary to-transparent opacity-75 blur-[1px]"
                                initial={{ x: '-100%' }}
                                animate={{ x: '100%' }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                            />
                        </div>

                        {course.roadmap.map((phase, index) => {
                            const isTop = index % 2 === 0;
                            // Calculate position based on index: 0->~12%, 1->~37%, 2->~62%, 3->~87%
                            const positionLeft = `${(index * 25) + 12.5}%`;

                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.2 }}
                                    className="absolute"
                                    style={{ left: positionLeft, top: '48%', transform: 'translate(-50%, -50%)' }}
                                >
                                    <div className="relative flex flex-col items-center">

                                        {/* Dot on line */}
                                        <motion.div
                                            animate={{
                                                boxShadow: [
                                                    "0 0 0 0px rgba(56, 189, 248, 0.4)",
                                                    "0 0 0 8px rgba(56, 189, 248, 0)",
                                                    "0 0 0 0px rgba(56, 189, 248, 0)"
                                                ],
                                                scale: [1, 1.2, 1]
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                                ease: "easeInOut",
                                                delay: index * 0.4 // Staggered delay for "starting to ending" flow
                                            }}
                                            className="w-4 h-4 bg-secondary rounded-full border-4 border-primary z-20 relative -translate-y-1"
                                        ></motion.div>

                                        {/* Content Box */}
                                        <div className={`absolute w-56 ${isTop ? 'bottom-full mb-8' : 'top-full mt-8'}`}>
                                            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-5 rounded-2xl text-center hover:bg-white/10 transition-colors shadow-lg">
                                                <h3 className="text-white font-bold mb-1 text-sm">{phase.title}</h3>
                                                <p className="text-slate-400 text-[10px] leading-relaxed line-clamp-2">{phase.shortDescription}</p>
                                            </div>
                                            {/* Connector Line to Content */}
                                            <div className={`absolute left-1/2 -translate-x-1/2 w-0.5 h-8 bg-gradient-to-b from-secondary to-transparent opacity-50 ${isTop ? '-bottom-8' : '-top-8'}`}></div>
                                        </div>

                                        {/* Icon Bubble (Opposite Side) */}
                                        <div className={`absolute ${isTop ? 'top-full mt-8' : 'bottom-full mb-8'}`}>
                                            {/* Connector Line to Icon */}
                                            <div className={`absolute left-1/2 -translate-x-1/2 w-0.5 h-8 bg-gradient-to-b from-secondary to-transparent opacity-50 ${isTop ? '-top-8' : '-bottom-8'}`}></div>

                                            <div className="w-12 h-12 rounded-full bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary shadow-lg z-10 bg-primary">
                                                <phase.icon className="w-5 h-5" />
                                            </div>
                                        </div>

                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Mobile Timeline Fallback */}
                    <div className="md:hidden space-y-6 relative pl-6 border-l-2 border-white/10 ml-2">
                        {course.roadmap.map((phase, index) => (
                            <div key={index} className="relative">
                                <div className="absolute -left-[35px] top-0 w-4 h-4 bg-secondary rounded-full border-4 border-primary shadow-[0_0_10px_rgba(56,189,248,0.5)]"></div>
                                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
                                    <div className="flex items-center gap-3 mb-2">
                                        <phase.icon className="w-5 h-5 text-secondary" />
                                        <h3 className="text-white font-bold text-sm">{phase.title}</h3>
                                    </div>
                                    <p className="text-slate-400 text-xs">{phase.shortDescription}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Detailed Structure with Images */}
                <div className="mb-12 md:mb-24">
                    <div className="text-center mb-10 md:mb-16">
                        <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">Deep Dive into Curriculum</h2>
                        <p className="text-slate-400 text-sm md:text-base">Phase by Phase Technical Breakdown</p>
                    </div>

                    <div className="space-y-12 md:space-y-24">
                        {course.roadmap.map((phase, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className={`flex flex-col gap-8 md:gap-12 items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                            >
                                <div className="flex-1 w-full">
                                    <div className="relative group rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                                        <div className="absolute inset-0 bg-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
                                        <img src={phase.image} alt={phase.title} className="w-full h-[200px] md:h-[300px] object-cover group-hover:scale-105 transition-transform duration-700" />

                                        {/* Overlay Badge */}
                                        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-white font-bold text-sm z-20">
                                            Phase 0{index + 1}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-1 w-full">
                                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{phase.title}</h3>
                                    <p className="text-slate-400 text-base md:text-lg mb-6">{phase.objective}</p>

                                    <div className="space-y-6">
                                        <div>
                                            <h4 className="flex items-center gap-2 text-secondary font-semibold mb-3">
                                                <Code className="w-5 h-5" /> What You'll Learn
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                {phase.techStack.map((tech, i) => (
                                                    <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-slate-300 text-xs md:text-sm">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="flex items-center gap-2 text-secondary font-semibold mb-3">
                                                <Rocket className="w-5 h-5" /> Key Projects
                                            </h4>
                                            <ul className="space-y-2">
                                                {phase.projects && phase.projects.map((proj, i) => (
                                                    <li key={i} className="flex items-center gap-2 text-slate-400 text-xs md:text-sm">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                                                        {proj}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Additional Modules Section */}
                {course.additionalModules && (
                    <div className="mb-24 relative">


                        <div className="max-w-5xl mx-auto">
                            <div className="text-center mb-16">
                                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                                    {course.additionalModules.title}
                                </h2>
                                <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
                                    {course.additionalModules.description}
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                {course.additionalModules.modules.map((mod, index) => (
                                    <div key={index} className="group relative">


                                        <div className="relative h-full bg-surface border border-white/10 rounded-2xl p-6 md:p-8 overflow-hidden hover:border-white/20 transition-colors">
                                            {/* Decorative Background Icon */}
                                            <Sparkles className="absolute -right-4 -bottom-4 w-24 h-24 text-white/5 rotate-12 group-hover:scale-110 transition-transform duration-500" />

                                            <div className="flex items-start gap-4 md:gap-6 relative z-10">
                                                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                                                    <div className="text-secondary font-bold text-lg md:text-xl">0{index + 1}</div>
                                                </div>

                                                <div className="flex-1">
                                                    <h4 className="text-xl font-bold text-white mb-2 group-hover:text-secondary transition-colors">{mod}</h4>
                                                    <div className="flex items-center gap-2">
                                                        <span className="px-2 py-1 rounded text-[10px] uppercase font-bold tracking-wider bg-white/5 text-slate-400 border border-white/5">
                                                            Extension
                                                        </span>
                                                        <span className="text-xs text-slate-500">Available post-completion</span>
                                                    </div>
                                                </div>

                                                <div className="self-center opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                                                    <ArrowRight className="w-5 h-5 text-secondary" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <p className="text-center mt-10 text-sm text-slate-500 italic flex items-center justify-center gap-2">
                                <Sparkles className="w-4 h-4" />
                                {course.additionalModules.note}
                            </p>
                        </div>
                    </div>
                )}




                {/* Offline Workspace Environment Section */}
                <div className="mb-24">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="order-2 md:order-1">
                                <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl group h-[400px]">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10"></div>

                                    {/* Image Carousel */}
                                    {offlineImages.map((img, index) => (
                                        <motion.img
                                            key={index}
                                            src={img}
                                            alt="Modern Workspace"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: index === currentImageIndex ? 1 : 0 }}
                                            transition={{ duration: 1 }}
                                            className="absolute inset-0 w-full h-full object-cover"
                                        />
                                    ))}

                                    <div className="absolute bottom-6 left-6 z-20">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold mb-2">
                                            <Sparkles className="w-3 h-3" /> Premium Workspace
                                        </div>
                                        <p className="text-slate-300 text-sm">Experience the startup culture</p>
                                    </div>

                                    {/* Carousel Indicators */}
                                    <div className="absolute bottom-6 right-6 z-20 flex gap-1.5">
                                        {offlineImages.map((_, idx) => (
                                            <div
                                                key={idx}
                                                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${idx === currentImageIndex ? 'bg-white w-3' : 'bg-white/40'}`}
                                            ></div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="order-1 md:order-2">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm font-bold mb-6">
                                    <Building2 className="w-4 h-4" /> Offline Experience
                                </div>
                                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                                    Not Just a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Classroom</span>
                                </h2>
                                <p className="text-slate-400 text-lg leading-relaxed mb-8">
                                    Step into a professional ecosystem. Our offline center isn't a coaching institute it's a vibrant workspace surrounded by multiple startups and active professionals. Immerse yourself in a real corporate culture from day one, not a boring lecture hall.
                                </p>
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                        <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                                            <Users className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold">Network with Pros</h4>
                                            <p className="text-slate-400 text-sm">Connect with employees from neighboring startups.</p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Earn While You Learn Section - Redesigned & Compact */}
                <div className="mb-24 relative">
                    <div className="max-w-5xl mx-auto">
                        <div className="relative overflow-hidden rounded-2xl bg-slate-900 border border-emerald-500/20 shadow-2xl">
                            {/* Animated Background Mesh */}
                            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 animate-pulse"></div>

                            {/* Grid Pattern Overlay */}
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px] opacity-20"></div>

                            <div className="relative z-10 grid lg:grid-cols-2 gap-8 lg:gap-12 p-6 md:p-10 items-center">
                                <div>
                                    <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold mb-4 border border-emerald-500/20">
                                        <TrendingUp className="w-3 h-3" /> Financial Independence
                                    </div>

                                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 md:mb-4 leading-tight">
                                        Code Your Way to <br />
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Your First Paycheck</span>
                                    </h2>

                                    <p className="text-slate-400 text-sm md:text-base mb-6 leading-relaxed">
                                        Stop waiting for a degree. We assign you real commercial projects. Deliver quality code, get paid instantly.
                                    </p>

                                    <div className="space-y-3">
                                        <div className="flex items-start gap-3">
                                            <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <Briefcase className="w-4 h-4 text-emerald-400" />
                                            </div>
                                            <div>
                                                <h4 className="text-white font-bold text-sm">Real Commercial Projects</h4>
                                                <p className="text-slate-400 text-xs">Work on actual client requirements.</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="w-8 h-8 rounded-full bg-teal-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <Wallet className="w-4 h-4 text-teal-400" />
                                            </div>
                                            <div>
                                                <h4 className="text-white font-bold text-sm">Performance-Based Payouts</h4>
                                                <p className="text-slate-400 text-xs">Clear task completion → Direct payment.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Visual Element - The "Dashboard" Card */}
                                <div className="relative mt-4 lg:mt-0">
                                    {/* Floating Notification - Mobile Adjusted */}
                                    <div className="absolute -top-4 -right-2 lg:-top-6 lg:-right-6 bg-white text-slate-900 px-3 py-2 rounded-lg shadow-xl flex items-center gap-2 animate-bounce z-20 scale-90 lg:scale-100" style={{ animationDuration: '3s' }}>
                                        <div className="bg-green-500 rounded-full p-0.5">
                                            <CheckCircle2 className="w-3 h-3 text-white" />
                                        </div>
                                        <div className="text-xs font-bold">
                                            <p>Payment Received!</p>
                                        </div>
                                    </div>

                                    {/* Main Card */}
                                    <div className="relative bg-slate-800/80 backdrop-blur-xl border border-white/10 rounded-xl p-4 md:p-5 shadow-2xl transform rotate-1 lg:rotate-3 hover:rotate-0 transition-all duration-500 group">
                                        {/* Glossy sheen */}
                                        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent rounded-xl pointer-events-none"></div>

                                        {/* Card Header */}
                                        <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-3">
                                            <div>
                                                <p className="text-[9px] text-slate-400 uppercase tracking-widest font-bold">Earnings Dashboard</p>
                                                <h3 className="text-2xl font-bold text-white mt-0.5">₹ 15,400<span className="text-sm text-emerald-400">.00</span></h3>
                                            </div>
                                            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                                            </div>
                                        </div>

                                        {/* Recent Activity */}
                                        <div className="space-y-2">
                                            <p className="text-[9px] text-slate-500 font-bold uppercase mb-1 ml-1">Recent Payouts</p>

                                            <div className="bg-black/20 rounded-md p-2 flex items-center justify-between border border-transparent">
                                                <div className="flex items-center gap-2">
                                                    <div className="bg-emerald-500/20 p-1.5 rounded">
                                                        <Code className="w-3 h-3 text-emerald-400" />
                                                    </div>
                                                    <div>
                                                        <p className="text-white text-xs font-medium">Frontend Fix</p>
                                                        <p className="text-[9px] text-slate-400">2h ago</p>
                                                    </div>
                                                </div>
                                                <span className="text-emerald-400 font-bold text-xs">+ ₹2,500</span>
                                            </div>

                                            <div className="bg-black/20 rounded-md p-2 flex items-center justify-between border border-transparent">
                                                <div className="flex items-center gap-2">
                                                    <div className="bg-blue-500/20 p-1.5 rounded">
                                                        <Layout className="w-3 h-3 text-blue-400" />
                                                    </div>
                                                    <div>
                                                        <p className="text-white text-xs font-medium">Landing Page</p>
                                                        <p className="text-[9px] text-slate-400">Yesterday</p>
                                                    </div>
                                                </div>
                                                <span className="text-emerald-400 font-bold text-xs">+ ₹5,000</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Plans & Pricing Section */}
                <div className="mb-24">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                                Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent">Path</span>
                            </h2>
                            <p className="text-slate-400 text-lg">Select the plan that fits your career goals.</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {course.plans?.map((plan, index) => (
                                <div key={index} className={`relative p-8 rounded-3xl border ${plan.name.includes('Premium') ? 'bg-white/10 border-secondary ring-1 ring-secondary shadow-2xl scale-105 z-10' : 'bg-surface border-white/10'} flex flex-col transition-all duration-300 hover:border-white/20`}>
                                    {plan.name.includes('Premium') && (
                                        <div className="absolute top-0 right-0 bg-secondary text-primary text-xs font-bold px-4 py-1.5 rounded-bl-xl rounded-tr-2xl uppercase tracking-wider">
                                            Most Popular
                                        </div>
                                    )}
                                    <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                                    <div className="text-4xl font-bold text-white mb-6 tracking-tight">{plan.price}</div>

                                    <div className="flex-1 mb-8">
                                        <ul className="space-y-4">
                                            {plan.features.map((feature, i) => (
                                                <li key={i} className="flex items-start gap-3 text-slate-300 text-sm">
                                                    <CheckCircle2 className={`w-5 h-5 flex-shrink-0 ${plan.name.includes('Premium') ? 'text-secondary' : 'text-emerald-500'}`} />
                                                    <span className="leading-tight">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <Link
                                        to="/contact"
                                        state={{ message: `I am interested in the ${plan.name} for ${course.title}.` }}
                                        className={`w-full py-4 rounded-xl font-bold text-center transition-all duration-300 ${plan.name.includes('Premium')
                                            ? 'bg-gradient-to-r from-secondary to-accent text-white hover:shadow-lg hover:shadow-secondary/25'
                                            : 'bg-white/10 text-white hover:bg-white/20'
                                            }`}
                                    >
                                        Choose {plan.name.split(' ')[0]}
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Unique VIP / Early Access CTA */}
                <div className="text-center pb-12 pt-8 md:pt-12">
                    <div className="max-w-4xl mx-auto">
                        <div className="relative z-10 flex flex-col items-center">


                            <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-slate-400 mb-4 md:mb-6 font-display tracking-tight drop-shadow-sm">
                                Become Verified Vibe Coder
                            </h2>
                            <p className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed font-light">
                                This isn't just a course. It's an exclusive accelerator for those who want to build real wealth through code. <span className="text-white font-medium">Limited spots available for the next cohort.</span>
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                                <Link
                                    to="/contact"
                                    state={{ message: `I am interested in joining the ${course.title} program.` }}
                                    className="px-8 py-4 md:px-12 md:py-5 rounded-full bg-white text-black font-bold text-base md:text-lg hover:scale-105 hover:shadow-[0_0_50px_-10px_rgba(255,255,255,0.4)] transition-all duration-300 relative overflow-hidden group"
                                >
                                    <span className="relative z-10">Claim Your Spot</span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
                                </Link>
                            </div>
                            <p className="mt-8 text-[10px] md:text-xs text-slate-500 uppercase tracking-[0.2em] font-medium opacity-70">Batches filling fast • Next cohort starts soon</p>
                        </div>
                    </div>
                </div>
                <Chatbot />
            </div>
        </main>
    );
};

export default CourseDetail;
