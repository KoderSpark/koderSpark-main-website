import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Work = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
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

    // Pagination Logic
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const totalPages = Math.ceil(projects.length / itemsPerPage);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = projects.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const nextPage = () => {
        if (currentPage < totalPages) {
            paginate(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            paginate(currentPage - 1);
        }
    };

    return (
        <div className="min-h-screen pt-28 pb-12 px-4 bg-primary relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-secondary/5 rounded-full blur-3xl -z-10"></div>
            <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-accent/5 rounded-full blur-3xl -z-10"></div>

            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-sm font-bold text-secondary uppercase tracking-widest mb-4">Portfolio</h2>
                    <h1 className="text-5xl md:text-6xl font-bold font-heading text-white mb-6">
                        Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent">Works</span>
                    </h1>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        Explore a selection of our recent projects, showcasing our expertise in web development, mobile apps, and digital design.
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    key={currentPage} // Re-trigger animation on page change
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {currentItems.map((project) => (
                        <motion.div key={project.id} variants={itemVariants}>
                            <Link to={`/work/${project.id}`} className="block h-full">
                                <div
                                    className="group cursor-pointer rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-secondary/50 transition-all hover:shadow-[0_0_30px_rgba(56,189,248,0.15)] h-full flex flex-col"
                                >
                                    <div className="h-64 overflow-hidden relative">
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            loading="lazy"
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 will-change-transform"
                                        />
                                    </div>
                                    <div className="p-6 flex-grow">

                                        <h2 className="text-xl font-bold text-white mb-2 group-hover:text-secondary transition-colors">
                                            {project.title}
                                        </h2>
                                        <p className="text-slate-400 text-sm line-clamp-2">{project.description}</p>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-4 mt-16">
                        <button
                            onClick={prevPage}
                            disabled={currentPage === 1}
                            className={`p-3 rounded-full border border-white/10 transition-all ${currentPage === 1
                                ? 'bg-white/5 text-slate-600 cursor-not-allowed'
                                : 'bg-white/10 text-white hover:bg-secondary hover:text-primary hover:border-secondary'
                                }`}
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>

                        <span className="text-slate-400 font-medium">
                            Page {currentPage} of {totalPages}
                        </span>

                        <button
                            onClick={nextPage}
                            disabled={currentPage === totalPages}
                            className={`p-3 rounded-full border border-white/10 transition-all ${currentPage === totalPages
                                ? 'bg-white/5 text-slate-600 cursor-not-allowed'
                                : 'bg-white/10 text-white hover:bg-secondary hover:text-primary hover:border-secondary'
                                }`}
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Work;
