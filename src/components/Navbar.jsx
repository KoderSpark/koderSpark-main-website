import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, Cpu, Briefcase, Mail, Bell } from 'lucide-react';
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
        { name: 'Announcements', path: '/announcements', icon: Bell, isSpecial: true },
    ];

    const location = useLocation();

    return (
        <>
            {/* Top Bar - Logo Only on Mobile, Logo + Nav on Desktop */}
            {/* Top Bar - Logo Only on Mobile, Logo + Nav on Desktop */}
            <nav
                className={`fixed top-6 md:top-8 left-1/2 -translate-x-1/2 z-[2000] transition-all duration-300 w-[90%] max-w-4xl ${scrolled
                    ? 'bg-primary/80 backdrop-blur-md border border-white/10 shadow-lg shadow-primary/20 rounded-full py-2.5 px-6 md:px-8'
                    : 'bg-transparent py-4 md:py-5 px-4 md:px-6'
                    }`}
            >
                <div className="flex items-center justify-between w-full relative">
                    {/* Desktop 3D Text Logo (Hidden on mobile) */}
                    <Link to="/" className="hidden md:block">
                        <div className="origin-left scale-100">
                            <TextLogo3D />
                        </div>
                    </Link>

                    {/* Mobile 3D Text Logo (Visible on mobile, centered by flex parent) */}
                    <Link to="/" className="md:hidden block absolute left-1/2 -translate-x-1/2">
                        <div className="scale-100 origin-center">
                            <TextLogo3D />
                        </div>
                    </Link>

                    {/* Desktop Navigation (Centered) */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => {
                            const isActive = location.pathname === link.path;

                            if (link.isSpecial) {
                                return (
                                    <Link
                                        key={link.name}
                                        to={link.path}
                                        className={`relative px-5 py-2 rounded-full overflow-hidden group transition-all duration-300 ${isActive ? 'text-white' : 'text-primary'
                                            }`}
                                    >
                                        <span className={`absolute inset-0 bg-gradient-to-r from-secondary to-accent opacity-90 transition-opacity duration-300 ${isActive ? 'opacity-100' : 'group-hover:opacity-100'
                                            }`}></span>
                                        {/* Shimmer effect */}
                                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_2s_infinite] group-hover:animate-shine"></span>

                                        <span className="relative z-10 font-bold text-xs uppercase tracking-wider flex items-center gap-2 text-white">
                                            <Bell size={14} className="animate-pulse" />
                                            {/* Combining the text shine with the gradient button */}
                                            <span className="animate-shine-white">{link.name}</span>
                                        </span>
                                    </Link>
                                );
                            }

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
                                className={`flex flex-col items-center gap-1 transition-all duration-300 ${isActive ? 'text-white scale-110' : 'text-slate-400 hover:text-slate-200'} ${link.isSpecial ? 'text-secondary font-bold' : ''}`}
                            >
                                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
                                {isActive && <span className="absolute -bottom-2 w-1 h-1 bg-secondary rounded-full"></span>}
                                {link.isSpecial && !isActive && <span className="absolute top-2 right-6 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default Navbar;
