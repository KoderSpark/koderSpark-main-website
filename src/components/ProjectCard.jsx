import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ProjectCard = ({ project, variants }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <motion.div variants={variants}>
            <Link to={`/work/${project.id}`} className="block h-full">
                <div
                    className="group cursor-pointer rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-secondary/50 transition-all hover:shadow-[0_0_30px_rgba(56,189,248,0.15)] h-full aspect-square md:aspect-auto relative md:flex md:flex-col"
                >
                    {/* Skeleton Loader - No Icon */}
                    {!isLoaded && (
                        <div className="absolute inset-0 z-20 bg-slate-800 animate-pulse"></div>
                    )}

                    <div className="absolute inset-0 h-full w-full md:relative md:h-64 overflow-hidden">
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                        <img
                            src={project.image}
                            alt={project.title}
                            loading="lazy"
                            onLoad={() => setIsLoaded(true)}
                            className={`w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 will-change-transform ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                        />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent md:relative md:bg-none md:p-6 md:flex-grow z-20">

                        <h2 className="text-lg md:text-xl font-bold text-white mb-1 md:mb-2 group-hover:text-secondary transition-colors md:line-clamp-2">
                            {project.title}
                        </h2>
                        <p className="hidden">{project.description}</p>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export default ProjectCard;
