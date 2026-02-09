import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';
import { courses } from '../data/courses';

const Program = () => {

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5
            }
        }
    };

    return (
        <main className="min-h-screen pt-28 pb-20 px-4 bg-primary relative overflow-hidden">
            <SEO
                title="Programs | KoderSpark"
                description="Join our VibeStack (Fullstack + GenAI) program. Learn coding, build real projects, and start earning."
                canonical="https://koderspark.com/program"
            />

            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[100px] -z-10 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px] -z-10 animate-pulse" style={{ animationDelay: '2s' }}></div>

            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-sm font-bold text-secondary uppercase tracking-widest mb-4">Our Program</h2>
                        <h1 className="text-4xl md:text-6xl font-bold font-heading text-white mb-6">
                            Upskill for the <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent">Future</span>
                        </h1>
                        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                            Comprehensive learning program designed to take you from beginner to industry-ready developer.
                        </p>
                    </motion.div>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-wrap justify-center gap-8 max-w-5xl mx-auto"
                >
                    {courses.map((course) => (
                        <motion.div
                            key={course.id}
                            variants={itemVariants}
                            className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all duration-300 hover:shadow-2xl hover:shadow-secondary/5 hover:-translate-y-1 w-full max-w-2xl"
                        >
                            <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${course.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl`}></div>

                            <div className="mb-6 inline-block p-4 rounded-xl bg-white/5 ring-1 ring-white/10 group-hover:scale-110 transition-transform duration-300">
                                {typeof course.icon === 'string' ? (
                                    <img src={course.icon} alt={course.title} className="w-8 h-8 object-cover" />
                                ) : (
                                    <course.icon className="w-8 h-8 text-secondary" />
                                )}
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-secondary transition-colors">
                                {course.title}
                            </h3>

                            <p className="text-slate-400 mb-8 leading-relaxed">
                                {course.description}
                            </p>

                            <ul className="space-y-3 mb-8">
                                {course.features.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-3 text-slate-300 text-sm">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    to="/contact"
                                    state={{ message: `I am interested in joining the ${course.title} program.` }}
                                    className="flex-1 py-4 rounded-xl bg-gradient-to-r from-secondary to-accent text-white font-bold text-center tracking-wide hover:shadow-lg hover:shadow-secondary/25 transition-all duration-300 relative overflow-hidden group/btn"
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        Enroll Now <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                    </span>
                                </Link>
                                <Link
                                    to={`/program/${course.id}`}
                                    className="flex-1 py-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-white font-bold text-center tracking-wide transition-all duration-300"
                                >
                                    View Details
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </main>
    );
};

export default Program;
