import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { Loader2, Code, Layers, Briefcase, Zap, BookOpen, GraduationCap, ArrowRight, Flag, Star, Map, Compass } from 'lucide-react';
import toast from 'react-hot-toast';

const phases = [
    {
        number: "01",
        title: "Frontend Development",
        description: "Master the basics of web development with modern UI/UX principles.",
        icon: Code,
        skills: ["HTML5 & CSS3", "JavaScript (ES6+)", "React.js", "Tailwind CSS"],
        projects: ["Personal Portfolio", "Business Landing Page", "Interactive Dashboards"],
        color: "blue",
        alignment: "left"
    },
    {
        number: "02",
        title: "Backend Development",
        description: "Build robust, scalable server-side applications and APIs.",
        icon: Layers,
        skills: ["Node.js", "Express.js", "MongoDB", "RESTful APIs"],
        projects: ["API Development", "Database Architecture", "Auth Systems"],
        color: "purple",
        alignment: "right"
    },
    {
        number: "03",
        title: "Advanced Full Stack",
        description: "Master production-grade features like payments and deployment.",
        icon: Briefcase,
        skills: ["Authentication", "Payment Gateways", "Cloud Deployment", "Security"],
        projects: ["E-commerce Platform", "SaaS Application", "CI/CD Pipelines"],
        color: "emerald",
        alignment: "left"
    },
    {
        number: "04",
        title: "Generative AI Engineering",
        description: "Integrate cutting-edge AI capabilities into your applications.",
        icon: Zap,
        skills: ["LLM Integration", "Prompt Engineering", "AI Aided Dev", "RAG Pipelines"],
        projects: ["AI-Powered Web Apps", "Custom Chatbots", "AI Content Generators"],
        color: "amber",
        alignment: "right"
    }
];

export default function StudentDashboard() {
    const navigate = useNavigate();
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStudentData = async () => {
            const storedUser = sessionStorage.getItem('currentUser');
            if (!storedUser) {
                navigate('/studentloginks');
                return;
            }

            const parsedUser = JSON.parse(storedUser);
            try {
                const { data } = await api.get(`/admin/students?email=${parsedUser.email}`);
                if (data.length > 0) {
                    setStudent(data[0]);
                } else {
                    setStudent(parsedUser);
                }
            } catch (error) {
                console.error("Failed to fetch student data:", error);
                setStudent(parsedUser);
            } finally {
                setLoading(false);
            }
        };

        fetchStudentData();
    }, [navigate]);

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-secondary animate-spin" />
            </div>
        );
    }

    if (!student) return null;

    return (
        <div className="space-y-16 animate-in fade-in duration-700">
            {/* Path Header */}
            <div className="text-center relative">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-6 font-bold text-xs text-secondary uppercase tracking-widest">
                    <Map className="w-4 h-4" />
                    Student Learning Path
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter max-w-2xl mx-auto leading-[0.9]">
                    Architecting Your <br /> <span className="text-secondary">Code-to-Cash</span> Journey
                </h2>
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-64 h-64 bg-secondary/5 blur-[80px] -z-10 rounded-full" />
            </div>

            {/* ROADMAP / HYBRID UI */}
            <div className="relative pt-10 pb-20">
                {/* Central Path Line (Desktop Only) */}
                <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-[2px]">
                    <div className="w-full h-full bg-gradient-to-b from-secondary/50 via-white/10 to-transparent border-l-2 border-dashed border-white/10" />
                </div>

                <div className="space-y-12 lg:space-y-0 relative">
                    {phases.map((phase, index) => (
                        <div key={index} className={`flex flex-col lg:flex-row items-center justify-center lg:min-h-[350px] w-full relative ${phase.alignment === 'right' ? 'lg:flex-row-reverse' : ''
                            }`}>

                            {/* Card Container */}
                            <div className={`w-full lg:w-[45%] ${phase.alignment === 'right' ? 'lg:pl-12' : 'lg:pr-12'
                                }`}>
                                <div className="group h-full bg-surface/30 backdrop-blur-xl border border-white/5 p-6 md:p-8 rounded-[32px] transition-all duration-500 hover:border-secondary/30 hover:bg-surface/50 shadow-2xl relative overflow-hidden flex flex-col">

                                    <div className="flex items-center gap-4 mb-6">
                                        <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-${phase.color}-500/10 border border-${phase.color}-500/20 flex items-center justify-center text-${phase.color}-500 group-hover:scale-110 transition-transform duration-500`}>
                                            <phase.icon className="w-6 h-6 md:w-7 md:h-7" />
                                        </div>
                                        <div className="flex-1">
                                            <p className={`text-[10px] font-black text-${phase.color}-500 uppercase tracking-widest mb-1`}>
                                                Phase {phase.number}
                                            </p>
                                            <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tighter leading-none">
                                                {phase.title}
                                            </h3>
                                        </div>
                                    </div>

                                    <p className="text-slate-400 text-sm leading-relaxed mb-8 font-medium italic">
                                        {phase.description}
                                    </p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2 px-1">
                                                <Compass className={`w-3 h-3 text-${phase.color}-500`} />
                                                Core Skills
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                {phase.skills.map((skill, si) => (
                                                    <span key={si} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-[10px] font-bold text-slate-300 hover:border-white/10 transition-colors">
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2 px-1">
                                                <Zap className={`w-3 h-3 text-${phase.color}-500`} />
                                                Projects
                                            </h4>
                                            <ul className="space-y-2">
                                                {phase.projects.map((project, pi) => (
                                                    <li key={pi} className="flex items-center gap-3 text-[11px] text-white/80 font-medium uppercase tracking-tight">
                                                        <ArrowRight className={`w-3 h-3 text-${phase.color}-500 flex-shrink-0`} />
                                                        {project}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Progress Decoration */}
                                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/5 overflow-hidden">
                                        <div className={`h-full bg-${phase.color}-500/50 w-0 group-hover:w-full transition-all duration-1000`} />
                                    </div>
                                </div>
                            </div>

                            {/* Node Icon on Center Line (Desktop Only) */}
                            <div className="hidden lg:flex absolute left-1/2 -ml-8 top-1/2 -mt-8 w-16 h-16 rounded-full border-4 border-primary bg-surface items-center justify-center z-10 transition-all duration-500 hover:scale-110">
                                <div className={`w-6 h-6 rounded-full bg-${phase.color}-500 shadow-lg shadow-${phase.color}-500/50 animate-pulse`} />
                                <div className={`absolute inset-0 rounded-full border-2 border-${phase.color}-500/20 scale-150 animate-ping opacity-20`} />
                            </div>

                            {/* Spacer for empty side on desktop */}
                            <div className="hidden lg:block lg:w-[45%]"></div>
                        </div>
                    ))}

                    {/* Final Node */}
                    <div className="flex justify-center pt-20">
                        <div className="w-20 h-20 rounded-full bg-secondary border-4 border-primary flex items-center justify-center shadow-2xl relative group hover:scale-110 transition-transform">
                            <Flag className="w-10 h-10 text-primary" />
                            <div className="absolute -bottom-12 whitespace-nowrap text-xs font-black text-secondary uppercase tracking-[0.4em] animate-pulse">
                                Destination: Earner
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Support & Community Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
                <div className="bg-surface/30 backdrop-blur-xl border border-white/5 p-8 rounded-[32px] hover:bg-surface/50 transition-all group relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Compass className="w-24 h-24" />
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 mb-6 font-bold">
                        <Compass className="w-6 h-6" />
                    </div>
                    <h4 className="text-xl font-black text-white uppercase tracking-tighter mb-2">Resource Hub</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">Access documentation, cheatsheets, and libraries to accelerate your progress.</p>
                </div>

                <div className="bg-surface/30 backdrop-blur-xl border border-white/5 p-8 rounded-[32px] hover:bg-surface/50 transition-all group relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Zap className="w-24 h-24" />
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary mb-6 font-bold">
                        <Zap className="w-6 h-6" />
                    </div>
                    <h4 className="text-xl font-black text-white uppercase tracking-tighter mb-2">Vibe Community</h4>
                    <p className="text-slate-400 text-sm mb-6 leading-relaxed">Connect with mentors and peers to share insights and build together.</p>
                    <button className="flex items-center gap-2 text-[10px] font-black text-secondary uppercase tracking-widest hover:gap-3 transition-all">
                        Join WhatsApp <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* TW Helper */}
            <div className="hidden">
                <div className="bg-blue-500 border-blue-500 text-blue-500 shadow-blue-500/5 bg-blue-500/10 border-blue-500/20 shadow-blue-500/50 bg-blue-500/50" />
                <div className="bg-purple-500 border-purple-500 text-purple-500 shadow-purple-500/5 bg-purple-500/10 border-purple-500/20 shadow-purple-500/50 bg-purple-500/50" />
                <div className="bg-emerald-500 border-emerald-500 text-emerald-500 shadow-emerald-500/5 bg-emerald-500/10 border-emerald-500/20 shadow-emerald-500/50 bg-emerald-500/50" />
                <div className="bg-amber-500 border-amber-500 text-amber-500 shadow-amber-500/5 bg-amber-500/10 border-amber-500/20 shadow-amber-500/50 bg-amber-500/50" />
            </div>
        </div>
    );
}
