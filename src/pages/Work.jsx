import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { projects } from '../data/projects';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProjectCard from '../components/ProjectCard';
import SEO from '../components/SEO';

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
    const [itemsPerPage, setItemsPerPage] = useState(window.innerWidth >= 768 ? 6 : 4);

    useEffect(() => {
        const handleResize = () => {
            setItemsPerPage(window.innerWidth >= 768 ? 6 : 4);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Scroll to top on page change
    useEffect(() => {
        if (window.lenis) {
            window.lenis.scrollTo(0, { immediate: true });
        } else {
            window.scrollTo(0, 0);
        }
    }, [currentPage]);

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
        <main className="min-h-screen pt-28 pb-12 px-6 md:px-8 bg-primary relative overflow-hidden">
            <SEO
                title="Our Work | Portfolio"
                description="Explore our portfolio of web and mobile application projects. See how we help businesses transform their digital presence."
                canonical="https://koderspark.com/work"
            />
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-secondary/5 rounded-full blur-3xl -z-10"></div>
            <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-accent/5 rounded-full blur-3xl -z-10"></div>

            <div className="max-w-5xl mx-auto">
                <header className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-sm font-bold text-secondary uppercase tracking-widest mb-4">Portfolio</h2>
                        <h1 className="text-5xl md:text-6xl font-bold font-heading text-white mb-6">
                            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent">Works</span>
                        </h1>
                        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                            Explore a selection of our recent projects, showcasing our expertise in web development, mobile apps, and digital design.
                        </p>
                    </motion.div>
                </header>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    key={currentPage} // Re-trigger animation on page change
                    className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8"
                >
                    {currentItems.map((project) => (
                        <ProjectCard key={project.id} project={project} variants={itemVariants} />
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
                            aria-label="Previous Page"
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
                            aria-label="Next Page"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>
                )}
            </div>
        </main>
    );
};

export default Work;
