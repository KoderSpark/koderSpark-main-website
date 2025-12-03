import React from 'react';
import { motion } from 'framer-motion';

const Program = () => {
    return (
        <div className="min-h-screen pt-28 pb-12 px-4 bg-primary relative overflow-hidden flex items-center justify-center">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-secondary/5 rounded-full blur-3xl -z-10"></div>
            <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-accent/5 rounded-full blur-3xl -z-10"></div>

            <div className="text-center max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-sm font-bold text-secondary uppercase tracking-widest mb-4">Program</h2>
                    <h1 className="text-6xl md:text-8xl font-bold font-heading text-white mb-8">
                        Coming <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent">Soon</span>
                    </h1>
                    <p className="text-slate-400 text-xl max-w-2xl mx-auto mb-12">
                        We are working on something amazing. Stay tuned for our upcoming programs and initiatives.
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default Program;
