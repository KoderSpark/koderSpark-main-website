import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Star, Info } from 'lucide-react';
import { projects } from '../data/projects';

const ProjectDetail = () => {
    const { id } = useParams();
    const project = projects.find(p => p.id === parseInt(id));

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-primary text-white">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Project Not Found</h2>
                    <Link to="/work" className="text-secondary hover:underline">Back to Works</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 bg-primary relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-secondary/5 rounded-full blur-3xl -z-10"></div>
            <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-accent/5 rounded-full blur-3xl -z-10"></div>

            <div className="max-w-6xl mx-auto">
                <Link to="/work" className="inline-flex items-center text-slate-400 hover:text-white mb-8 transition-colors group">
                    <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Works
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="rounded-3xl overflow-hidden mb-12 border border-white/10 shadow-2xl">
                        <img src={project.image} alt={project.title} className="w-full h-[400px] md:h-[600px] object-cover" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
                        <div className="lg:col-span-2">
                            <h1 className="text-4xl md:text-5xl font-bold font-heading text-white mb-4">{project.title}</h1>


                            <div className="prose prose-invert max-w-none">
                                <h3 className="text-2xl font-bold text-white mb-4">About the Project</h3>
                                <p className="text-slate-300 text-lg leading-relaxed mb-8">
                                    {project.description}
                                </p>

                            </div>
                        </div>

                        <div className="lg:col-span-1 space-y-8">
                            <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
                                <h3 className="text-xl font-bold text-white mb-6">Project Info</h3>
                                <div className="space-y-4">



                                </div>
                                <div className="mt-8">
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full py-3 bg-gradient-to-r from-secondary to-accent text-white font-bold rounded-xl hover:shadow-[0_0_30px_rgba(56,189,248,0.3)] transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
                                    >
                                        Visit Live Site
                                        <ExternalLink className="w-4 h-4" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Client Feedback Section - Full Width */}
                    <div className="mt-16 border-t border-white/10 pt-16">
                        <h3 className="text-3xl font-bold text-white mb-8">Client Feedback</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {project.reviews.map((review, index) => {
                                const cardColors = [
                                    "bg-[#F2E8D5] text-slate-900", // Beige
                                    "bg-white text-slate-900",     // White
                                    "bg-[#FF6B4A] text-white",     // Orange
                                    "bg-[#FFD23F] text-slate-900", // Yellow
                                    "bg-[#1A1A1A] text-white",     // Black
                                ];
                                const colorClass = cardColors[index % cardColors.length];

                                return (
                                    <div key={index} className={`${colorClass} p-8 rounded-[2rem] min-h-[320px] flex flex-col justify-between transition-transform hover:-translate-y-2 duration-300`}>
                                        {/* Header */}
                                        <div className="flex items-center gap-2 opacity-70">
                                            <Info className="w-4 h-4" />
                                            <span className="text-xs font-bold uppercase tracking-wider">Review</span>
                                        </div>

                                        {/* Body */}
                                        <div className="py-6">
                                            <h4 className="text-xl font-medium leading-relaxed">
                                                "{review.comment}"
                                            </h4>
                                        </div>

                                        {/* Footer */}
                                        <div className="flex items-center justify-between border-t border-current/10 pt-4">
                                            <span className="font-bold text-sm">{review.user}</span>
                                            <div className="flex gap-0.5">
                                                {[...Array(review.rating)].map((_, i) => (
                                                    <Star key={i} className="w-3 h-3 fill-current" />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                </motion.div>
            </div>
        </div>
    );
};

export default ProjectDetail;
