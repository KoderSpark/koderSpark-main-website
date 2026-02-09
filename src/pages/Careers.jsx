import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { careers } from '../data/careers';
import SEO from '../components/SEO';

const Careers = () => {
    return (
        <main className="min-h-screen pt-24 pb-12 px-4 bg-primary relative overflow-hidden">
            <SEO
                title="Careers | Join Our Team"
                description="Join Koderspark. We're looking for passionate individuals who want to build the future of digital experiences."
                canonical="https://koderspark.com/careers"
            />
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-secondary/5 rounded-full blur-3xl -z-10"></div>
            <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-accent/5 rounded-full blur-3xl -z-10"></div>

            <div className="max-w-7xl mx-auto">
                <header className="text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-bold font-heading text-white mb-6"
                    >
                        Join Our Team
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-400 text-lg max-w-2xl mx-auto"
                    >
                        We're looking for passionate individuals who want to build the future of digital experiences with us.
                    </motion.p>
                </header>

                <div className="grid grid-cols-1 gap-8">
                    {careers.map((job, index) => (
                        <motion.article
                            key={job.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + index * 0.1 }}
                            className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors group"
                        >
                            <div className="flex flex-col lg:flex-row gap-8 items-center">
                                <div className="w-full lg:w-1/3 h-48 lg:h-auto overflow-hidden rounded-xl border border-white/10">
                                    <img
                                        src={job.image}
                                        alt={job.title}
                                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-6 w-full">
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-2">{job.title}</h3>
                                        <div className="flex flex-wrap gap-4 text-slate-400 text-sm mb-4">
                                            <span className="flex items-center gap-1"><Briefcase className="w-4 h-4" /> {job.type}</span>
                                            <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {job.location}</span>
                                            <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {job.posted}</span>
                                        </div>
                                        <p className="text-slate-300 max-w-2xl">
                                            {job.description}
                                        </p>
                                    </div>
                                    <Link
                                        to={`/careers/apply/${job.id}`}
                                        className="px-6 py-3 bg-secondary text-primary font-bold rounded-xl hover:bg-white transition-colors flex items-center gap-2 whitespace-nowrap self-start md:self-center"
                                        aria-label={`Apply for ${job.title}`}
                                    >
                                        Apply Now
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </main>
    );
};

export default Careers;
