import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, Cpu, Briefcase, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import TextLogo3D from './TextLogo3D';


const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/', icon: Home },
        { name: 'Program', path: '/program', icon: Cpu },
        { name: 'Work', path: '/work', icon: Briefcase },
        { name: 'Contact', path: '/contact', icon: Mail },
    ];

    const location = useLocation();

    return (
        <>
            {/* Top Bar - Logo Only on Mobile, Logo + Nav on Desktop */}
            <nav
                className={`fixed top-6 md:top-8 left-1/2 -translate-x-1/2 z-[2000] transition-all duration-300 w-[90%] max-w-4xl ${scrolled
                    ? 'bg-primary/80 backdrop-blur-md border border-white/10 shadow-lg shadow-primary/20 rounded-full py-3 md:py-4 px-6 md:px-10'
                    : 'bg-transparent py-4 md:py-6 px-4 md:px-8'
                    }`}
            >
                <div className="flex items-center justify-center relative">
                    {/* Desktop 3D Text Logo (Hidden on mobile) */}
                    <Link to="/" className="absolute left-0 top-1/2 -translate-y-1/2 hidden md:block">
                        <div className="origin-left">
                            <TextLogo3D />
                        </div>
                    </Link>

                    {/* Mobile 3D Text Logo (Visible on mobile, centered by flex parent) */}
                    <Link to="/" className="md:hidden block">
                        <div className="scale-110 origin-center">
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
                </div>
            </nav>

            {/* Mobile Bottom Navigation Bar */}
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[2000] md:hidden w-[90%] max-w-[280px]">
                <div className="bg-primary/90 backdrop-blur-xl border border-white/10 shadow-lg shadow-primary/20 rounded-full py-2.5 px-6 flex items-center justify-between">
                    {navLinks.map((link) => {
                        const isActive = location.pathname === link.path;
                        const Icon = link.icon;
                        return (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`flex flex-col items-center gap-1 transition-all duration-300 ${isActive ? 'text-white scale-110' : 'text-slate-400 hover:text-slate-200'
                                    }`}
                            >
                                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
                                {isActive && <span className="absolute -bottom-2 w-1 h-1 bg-secondary rounded-full"></span>}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default Navbar;
