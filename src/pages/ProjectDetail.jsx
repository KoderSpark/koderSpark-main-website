import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Star, Info } from 'lucide-react';
import { projects } from '../data/projects';
import SEO from '../components/SEO';
import { generateProjectSchema } from '../utils/Schema';

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
        <main className="min-h-screen pt-24 pb-12 px-6 md:px-8 bg-primary relative overflow-hidden">
            <SEO
                title={project.title}
                description={project.description.substring(0, 150)}
                canonical={`https://koderspark.com/work/${project.id}`}
                jsonLd={generateProjectSchema(project)}
            />
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-secondary/5 rounded-full blur-3xl -z-10"></div>
            <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-accent/5 rounded-full blur-3xl -z-10"></div>

            <div className="max-w-6xl mx-auto">
                <nav className="mb-12">
                    <Link to="/work" className="inline-flex items-center text-slate-400 hover:text-white transition-colors group">
                        <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Back to Works
                    </Link>
                </nav>

                <motion.article
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* New Layout: Split View */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-20 items-start">
                        {/* Left Column: Content */}
                        <div className="order-2 lg:order-1 flex flex-col justify-center">
                            <motion.h1
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-white mb-8 leading-tight"
                            >
                                {project.title}
                            </motion.h1>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="prose prose-invert max-w-none"
                            >
                                <h3 className="text-xl font-bold text-secondary mb-4 uppercase tracking-widest flex items-center gap-2">
                                    <Info className="w-5 h-5" /> About the Project
                                </h3>
                                <p className="text-slate-300 text-lg leading-relaxed mb-8">
                                    {project.description}
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="mt-4"
                            >
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-secondary to-accent text-white font-bold rounded-xl hover:shadow-[0_0_30px_rgba(56,189,248,0.3)] transition-all transform hover:-translate-y-1 gap-2"
                                >
                                    Visit Live Site
                                    <ExternalLink className="w-5 h-5" />
                                </a>
                            </motion.div>
                        </div>

                        {/* Right Column: Image */}
                        <div className="order-1 lg:order-2">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="rounded-2xl overflow-hidden border-4 border-white/5 shadow-2xl relative group bg-white/5"
                            >
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"></div>
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                                    loading="eager"
                                />
                            </motion.div>
                        </div>
                    </div>

                    {/* Client Feedback Section */}
                    {project.reviews?.length > 0 && (
                        <section className="mt-16 border-t border-white/10 pt-16">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <h3 className="text-3xl font-bold text-white mb-10 text-center">What Clients & Users Say</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {project.reviews.map((review, index) => {
                                        const cardColors = [
                                            "bg-[#F2E8D5] text-slate-900", // Beige
                                            "bg-white text-slate-900",     // White
                                            "bg-[#FF6B4A] text-white",     // Orange
                                            "bg-[#FFD23F] text-slate-900", // Yellow
                                            "bg-[#1A1A1A] text-white border border-white/20",     // Black
                                        ];
                                        const colorClass = cardColors[index % cardColors.length];

                                        return (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, y: 20 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: index * 0.1 }}
                                                className={`${colorClass} p-8 rounded-[2rem] min-h-[280px] flex flex-col justify-between transition-transform hover:-translate-y-2 duration-300 shadow-lg`}
                                            >
                                                {/* Header */}
                                                <div className="flex items-center justify-between opacity-80">
                                                    <div className="flex items-center gap-2">
                                                        <Info className="w-4 h-4" />
                                                        <span className="text-xs font-bold uppercase tracking-wider">{review.role || 'Review'}</span>
                                                    </div>
                                                </div>

                                                {/* Body */}
                                                <div className="py-6 flex-grow flex items-center">
                                                    <h4 className="text-lg md:text-xl font-medium leading-relaxed italic">
                                                        "{review.text}"
                                                    </h4>
                                                </div>

                                                {/* Footer */}
                                                <div className="flex flex-col border-t border-current/10 pt-4">
                                                    <div className="flex items-center justify-between">
                                                        <span className="font-bold text-sm truncate pr-2">{review.name}</span>
                                                        <div className="flex gap-0.5 flex-shrink-0">
                                                            {[...Array(5)].map((_, i) => (
                                                                <Star key={i} className="w-3 h-3 fill-current" />
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        </section>
                    )}

                </motion.article>
            </div>
        </main>
    );
};

export default ProjectDetail;
