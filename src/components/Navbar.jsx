import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, Cpu, Briefcase, Mail, Bell, ChevronDown } from 'lucide-react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import TextLogo3D from './TextLogo3D';


const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileCoursesOpen, setMobileCoursesOpen] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/', icon: Home, color: 'text-sky-400' },
        {
            name: 'Courses',
            icon: Cpu,
            color: 'text-purple-400',
            dropdown: [
                { name: 'Vibestack', path: '/program/vibestack' },
                { name: 'Campus Tech Access', path: '/campus-tech-access' },
            ],
            path: '/program/vibestack'
        },
        { name: 'Works', path: '/work', icon: Briefcase, color: 'text-emerald-400' },
        { name: 'Contact', path: '/contact', icon: Mail, color: 'text-orange-400' },
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
                <div className="flex items-center justify-center md:justify-between w-full relative">
                    {/* Desktop 3D Text Logo (Hidden on mobile) */}
                    <Link to="/" className="hidden md:block">
                        <div className="origin-left scale-100">
                            <TextLogo3D />
                        </div>
                    </Link>

                    {/* Mobile 3D Text Logo (Visible on mobile, centered by flex parent) */}
                    <Link to="/" className="md:hidden block mx-auto relative">
                        <div className="scale-100 origin-center">
                            <TextLogo3D />
                        </div>
                    </Link>

                    {/* Desktop Navigation (Centered) */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => {
                            const isActive = location.pathname === link.path || (link.dropdown && link.dropdown.some(item => location.pathname === item.path));

                            if (link.dropdown) {
                                return (
                                    <div key={link.name} className="relative group">
                                        <button className={`flex items-center gap-1 text-sm font-medium uppercase tracking-widest transition-colors relative ${isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
                                            {link.name}
                                            <ChevronDown size={14} className="transition-transform duration-300 group-hover:rotate-180" />
                                            <span className={`absolute -bottom-1 left-0 h-[1px] bg-secondary transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                                        </button>

                                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 pt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                                            <div className="bg-primary/95 backdrop-blur-md border border-white/10 shadow-xl shadow-primary/30 rounded-xl overflow-hidden py-2">
                                                {link.dropdown.map((item) => (
                                                    <Link
                                                        key={item.name}
                                                        to={item.path}
                                                        className={`block px-4 py-2 text-sm transition-colors hover:bg-white/5 ${location.pathname === item.path ? 'text-secondary font-medium' : 'text-slate-300 hover:text-white'}`}
                                                    >
                                                        {item.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                );
                            }

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
                        const isActive = location.pathname === link.path || (link.dropdown && link.dropdown.some(item => location.pathname === item.path));
                        const Icon = link.icon;

                        if (link.dropdown) {
                            return (
                                <div key={link.name} className="relative">
                                    {/* Mobile Dropdown Menu (pop up from bottom) */}
                                    <AnimatePresence>
                                        {mobileCoursesOpen && (
                                            <Motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-48 bg-primary/95 backdrop-blur-xl border border-white/10 shadow-xl shadow-primary/30 rounded-xl overflow-hidden py-2"
                                            >
                                                {link.dropdown.map((item) => (
                                                    <Link
                                                        key={item.name}
                                                        to={item.path}
                                                        onClick={() => setMobileCoursesOpen(false)}
                                                        className={`block px-4 py-3 text-sm transition-colors hover:bg-white/5 text-center ${location.pathname === item.path ? 'text-secondary font-medium' : 'text-slate-300 hover:text-white'}`}
                                                    >
                                                        {item.name}
                                                    </Link>
                                                ))}
                                            </Motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Overlay to close menu */}
                                    {mobileCoursesOpen && (
                                        <div
                                            className="fixed inset-0 z-[-1]"
                                            onClick={() => setMobileCoursesOpen(false)}
                                        ></div>
                                    )}

                                    <button
                                        onClick={() => setMobileCoursesOpen(!mobileCoursesOpen)}
                                        className={`flex flex-col items-center justify-center transition-all duration-300 ${isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200'}`}
                                    >
                                        <div className="relative flex flex-col items-center justify-center h-10 w-12">
                                            <Icon className={`w-5 h-5 mb-1 transition-all duration-300 ${(isActive || mobileCoursesOpen) ? `${link.color} -translate-y-1` : 'text-slate-400'}`} />
                                            <span className={`text-[8px] font-bold tracking-wide uppercase transition-colors duration-300 ${(isActive || mobileCoursesOpen) ? link.color : 'text-slate-500'}`}>
                                                {link.name}
                                            </span>
                                        </div>
                                    </button>
                                </div>
                            );
                        }

                        return (
                            <Link
                                key={link.name}
                                to={link.path}
                                onClick={() => setMobileCoursesOpen(false)}
                                className={`flex flex-col items-center justify-center transition-all duration-300 ${isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200'}`}
                            >
                                <div className="relative flex flex-col items-center justify-center h-10 w-12">
                                    <Icon className={`w-5 h-5 mb-1 transition-all duration-300 ${isActive ? `${link.color} -translate-y-1` : 'text-slate-400'}`} />
                                    <span className={`text-[8px] font-bold tracking-wide uppercase transition-colors duration-300 ${isActive ? link.color : 'text-slate-500'}`}>
                                        {link.name}
                                    </span>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default Navbar;