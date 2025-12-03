import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import TextLogo3D from './TextLogo3D';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => setIsOpen(!isOpen);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Program', path: '/program' },
        { name: 'Work', path: '/work' },
        { name: 'Contact', path: '/contact' },
    ];

    const location = useLocation();

    return (
        <>
            <nav
                className={`fixed top-6 md:top-8 left-1/2 -translate-x-1/2 z-40 transition-all duration-300 ${scrolled
                    ? 'bg-primary/80 backdrop-blur-md border border-white/10 shadow-lg shadow-primary/20 rounded-full py-5 md:py-4 px-10'
                    : 'bg-transparent py-7 md:py-6 px-8'
                    } w-[90%] max-w-4xl`}
            >
                <div className="flex items-center justify-center relative">
                    {/* Desktop 3D Text Logo (Hidden on mobile) */}
                    <Link to="/" className="absolute left-0 top-1/2 -translate-y-1/2 hidden md:block">
                        <div className="origin-left">
                            <TextLogo3D />
                        </div>
                    </Link>

                    {/* Mobile 3D Text Logo (Visible on mobile, absolute left for gap) */}
                    <Link to="/" className="absolute left-0 top-1/2 -translate-y-1/2 md:hidden block">
                        <div className="scale-110 origin-left">
                            <TextLogo3D />
                        </div>
                    </Link>

                    {/* Desktop Navigation (Centered) */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => {
                            const isActive = location.pathname === link.path;
                            return (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className={`text-sm font-medium uppercase tracking-widest transition-colors relative group ${isActive ? 'text-white' : 'text-slate-300 hover:text-white'
                                        }`}
                                >
                                    {link.name}
                                    <span className={`absolute -bottom-1 left-0 h-[1px] bg-secondary transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'
                                        }`}></span>
                                </Link>
                            );
                        })}
                    </div>

                    {/* Mobile Menu Button - Absolute positioned to right */}
                    <div className="md:hidden absolute right-4">
                        <button
                            onClick={toggleMenu}
                            className="p-2 text-slate-300 hover:text-white transition-colors"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed top-24 left-4 right-4 w-auto max-w-md mx-auto z-40 md:hidden bg-primary/95 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl max-h-[80vh] overflow-y-auto"
                    >
                        <div className="px-6 py-8 space-y-4 flex flex-col items-center">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className="block text-lg font-medium text-slate-300 hover:text-secondary transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
