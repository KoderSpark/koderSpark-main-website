import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, LogOut, ChevronLeft, ChevronRight, Menu, X, BookOpen, ClipboardList, User, IndianRupee, Users, Briefcase, GraduationCap, ChevronDown, Trophy } from 'lucide-react';
import api from '../api/axios';
import toast from 'react-hot-toast';

export default function StudentLayout() {
    const location = useLocation();
    const navigate = useNavigate();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [placementsOpen, setPlacementsOpen] = useState(false);
    const [student, setStudent] = useState(null);

    useEffect(() => {
        const currentUser = sessionStorage.getItem('currentUser');
        if (!currentUser) {
            navigate('/studentloginks');
            return;
        }
        const parsedUser = JSON.parse(currentUser);
        const fetchStudentData = async () => {
            try {
                const { data } = await api.get(`/admin/students?email=${parsedUser.email}`);
                setStudent(data.length > 0 ? data[0] : parsedUser);
            } catch {
                setStudent(parsedUser);
            }
        };
        fetchStudentData();
    }, [navigate, location.pathname]);

    const handleLogout = () => {
        sessionStorage.removeItem('currentUser');
        sessionStorage.removeItem('studentAuthData');
        toast.success('Logged out successfully');
        navigate('/studentloginks');
    };

    const navItemsTop = [
        { path: '/student/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { path: '/student/classes', icon: BookOpen, label: 'Classes' },
        { path: '/student/tasks', icon: ClipboardList, label: 'Tasks' },
        { path: '/student/hackathon', icon: Trophy, label: 'Hackathon' },
    ];

    const placementsItems = [
        { path: '/student/career/jobs', icon: Briefcase, label: 'Jobs' },
        { path: '/student/career/internships', icon: GraduationCap, label: 'Internships' },
    ];

    const navItemsBottom = [
        { path: '/student/earnings', icon: IndianRupee, label: 'Earnings' },
        { path: '/student/refer-earn', icon: Users, label: 'Refer and Earn' },
        { path: '/student/profile', icon: User, label: 'Profile' },
    ];

    const isPlacementsActive = placementsItems.some(item => location.pathname === item.path);

    // Shared nav link style helper
    const linkClass = (active) =>
        `flex items-center gap-4 p-4 rounded-xl text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 border w-full ${active
            ? 'bg-secondary/10 text-secondary border-secondary/20 shadow-lg shadow-secondary/5'
            : 'text-slate-400 hover:text-white hover:bg-white/5 border-transparent'
        }`;

    return (
        <div className="min-h-screen bg-primary text-white flex flex-col md:flex-row font-sans">

            {/* ── Mobile Header ── */}
            <header className="md:hidden bg-surface/50 backdrop-blur-xl border-b border-white/5 p-4 flex justify-between items-center sticky top-0 z-[90]">
                <h1 className="text-lg font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">
                    Koder Spark<span className="text-secondary">.</span>
                </h1>
                <button onClick={() => setMobileMenuOpen(o => !o)} className="text-white">
                    {mobileMenuOpen ? <X /> : <Menu />}
                </button>
            </header>

            {/* ── Mobile Overlay ── */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 bg-black/80 z-[95] md:hidden" onClick={() => setMobileMenuOpen(false)} />
            )}

            {/* ── Mobile Sidebar ── */}
            <aside className={`fixed inset-y-0 left-0 w-64 bg-surface border-r border-white/5 z-[100] flex flex-col transform transition-transform duration-300 md:hidden ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-6 flex-shrink-0">
                    <h1 className="text-xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60 mb-8">
                        Koder Spark<span className="text-secondary">.</span>
                    </h1>
                </div>

                {/* Scrollable nav area */}
                <div className="flex-1 overflow-y-auto px-6 pb-4 space-y-1" data-lenis-prevent>
                    {navItemsTop.map(item => (
                        <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`flex items-center gap-4 p-4 rounded-xl text-sm font-bold uppercase tracking-widest transition-all duration-300 ${location.pathname === item.path
                                ? 'bg-secondary/10 text-secondary border border-secondary/20'
                                : 'text-slate-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <item.icon className="w-5 h-5 flex-shrink-0" />
                            <span>{item.label}</span>
                        </Link>
                    ))}

                    {/* Placements Dropdown */}
                    <div>
                        <button
                            onClick={() => setPlacementsOpen(o => !o)}
                            className={`flex items-center gap-4 p-4 rounded-xl text-sm font-bold uppercase tracking-widest transition-all duration-300 w-full ${isPlacementsActive
                                ? 'bg-secondary/10 text-secondary border border-secondary/20'
                                : 'text-slate-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <Briefcase className="w-5 h-5 flex-shrink-0" />
                            <span className="flex-1 text-left">Placements</span>
                            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${placementsOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {placementsOpen && (
                            <div className="ml-4 mt-1 space-y-1 border-l border-white/10 pl-4">
                                {placementsItems.map(item => (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={`flex items-center gap-3 p-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${location.pathname === item.path ? 'text-secondary bg-secondary/10' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                                    >
                                        <item.icon className="w-4 h-4 flex-shrink-0" />
                                        <span>{item.label}</span>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    {navItemsBottom.map(item => (
                        <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`flex items-center gap-4 p-4 rounded-xl text-sm font-bold uppercase tracking-widest transition-all duration-300 ${location.pathname === item.path
                                ? 'bg-secondary/10 text-secondary border border-secondary/20'
                                : 'text-slate-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <item.icon className="w-5 h-5 flex-shrink-0" />
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </div>

                {/* Bottom: student info + logout */}
                <div className="p-6 flex-shrink-0 space-y-4 border-t border-white/5">
                    {student && (
                        <Link
                            to="/student/profile"
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center gap-3 p-3 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors"
                        >
                            <div className="w-9 h-9 rounded-full overflow-hidden border border-white/10 flex-shrink-0">
                                {student.profileImage
                                    ? <img src={student.profileImage} alt="" className="w-full h-full object-cover" />
                                    : <div className="w-full h-full bg-slate-800 flex items-center justify-center text-xs font-black">{student.fullName?.charAt(0)}</div>
                                }
                            </div>
                            <div className="min-w-0">
                                <p className="text-xs font-bold text-white truncate uppercase tracking-tighter">{student.fullName}</p>
                                <p className="text-[9px] text-slate-500 uppercase tracking-tighter truncate">{student.course || student.domain}</p>
                            </div>
                        </Link>
                    )}
                    <button onClick={handleLogout} className="flex items-center gap-4 p-4 rounded-xl text-sm font-bold uppercase tracking-widest text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors w-full">
                        <LogOut className="w-5 h-5" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* ── Desktop Sidebar ── */}
            <aside className={`${isCollapsed ? 'w-24' : 'w-72'} border-r border-white/5 bg-surface/40 backdrop-blur-2xl hidden md:flex flex-col h-screen sticky top-0 transition-all duration-500 ease-in-out z-50`}>

                {/* Collapse toggle */}
                <button
                    onClick={() => setIsCollapsed(c => !c)}
                    className="absolute -right-4 top-10 bg-surface border border-white/10 rounded-full p-2 text-slate-400 hover:text-white hover:bg-white/10 transition-all shadow-xl z-20"
                >
                    {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                </button>

                {/* Logo */}
                <div className="p-6 pb-8 flex-shrink-0">
                    <div className="block overflow-hidden">
                        {isCollapsed
                            ? <h1 className="text-2xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60 text-center">K<span className="text-secondary">.</span></h1>
                            : <h1 className="text-2xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">Koder Spark<span className="text-secondary">.</span></h1>
                        }
                    </div>
                </div>

                {/* Scrollable Nav */}
                <div className="flex-1 overflow-y-auto px-4 space-y-1 pb-4" data-lenis-prevent>
                    {navItemsTop.map(item => (
                        <Link
                            key={item.path}
                            to={item.path}
                            title={isCollapsed ? item.label : ''}
                            className={`${linkClass(location.pathname === item.path)} ${isCollapsed ? 'justify-center' : ''}`}
                        >
                            <item.icon className={`w-5 h-5 flex-shrink-0 ${location.pathname === item.path ? 'animate-pulse' : ''}`} />
                            {!isCollapsed && <span>{item.label}</span>}
                        </Link>
                    ))}

                    {/* Placements Dropdown */}
                    <div>
                        <button
                            onClick={() => {
                                if (isCollapsed) {
                                    setIsCollapsed(false);
                                    setPlacementsOpen(true);
                                } else {
                                    setPlacementsOpen(o => !o);
                                }
                            }}
                            title={isCollapsed ? 'Placements' : ''}
                            className={`${linkClass(isPlacementsActive)} ${isCollapsed ? 'justify-center' : ''}`}
                        >
                            <Briefcase className={`w-5 h-5 flex-shrink-0 ${isPlacementsActive ? 'animate-pulse' : ''}`} />
                            {!isCollapsed && (
                                <>
                                    <span className="flex-1 text-left">Placements</span>
                                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${placementsOpen ? 'rotate-180' : ''}`} />
                                </>
                            )}
                        </button>
                        {placementsOpen && !isCollapsed && (
                            <div className="ml-4 mt-1 space-y-1 border-l border-white/10 pl-4">
                                {placementsItems.map(item => (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        className={`flex items-center gap-3 p-3 rounded-xl text-xs font-bold uppercase tracking-[0.2em] transition-all ${location.pathname === item.path ? 'text-secondary bg-secondary/10' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                                    >
                                        <item.icon className="w-4 h-4 flex-shrink-0" />
                                        <span>{item.label}</span>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    {navItemsBottom.map(item => (
                        <Link
                            key={item.path}
                            to={item.path}
                            title={isCollapsed ? item.label : ''}
                            className={`${linkClass(location.pathname === item.path)} ${isCollapsed ? 'justify-center' : ''}`}
                        >
                            <item.icon className={`w-5 h-5 flex-shrink-0 ${location.pathname === item.path ? 'animate-pulse' : ''}`} />
                            {!isCollapsed && <span>{item.label}</span>}
                        </Link>
                    ))}
                </div>

                {/* Bottom: student info + logout */}
                <div className="px-4 pb-6 pt-4 flex-shrink-0 space-y-4 border-t border-white/5">
                    {student && !isCollapsed && (
                        <Link
                            to="/student/profile"
                            className="p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-all block group"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl overflow-hidden border border-white/10 flex-shrink-0 group-hover:scale-105 transition-transform">
                                    {student.profileImage
                                        ? <img src={student.profileImage} alt="" className="w-full h-full object-cover" />
                                        : <div className="w-full h-full bg-slate-800 flex items-center justify-center text-xs font-black">{student.fullName?.charAt(0)}</div>
                                    }
                                </div>
                                <div className="min-w-0">
                                    <p className="text-[11px] font-black text-white truncate uppercase tracking-tighter group-hover:text-secondary transition-colors">{student.fullName}</p>
                                    <p className="text-[9px] text-slate-500 uppercase tracking-widest truncate">{student.status} Student</p>
                                </div>
                            </div>
                        </Link>
                    )}
                    <button
                        onClick={handleLogout}
                        title={isCollapsed ? 'Logout' : ''}
                        className={`flex items-center gap-4 p-4 rounded-xl text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all w-full ${isCollapsed ? 'justify-center' : ''}`}
                    >
                        <LogOut className="w-5 h-5 flex-shrink-0" />
                        {!isCollapsed && <span>Logout</span>}
                    </button>
                </div>
            </aside>

            {/* ── Main Content ── */}
            <main className="flex-1 overflow-y-auto bg-primary relative">
                <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-secondary/5 blur-[120px] rounded-full -z-10 pointer-events-none" />
                <div className="fixed bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/5 blur-[100px] rounded-full -z-10 pointer-events-none" />
                <div className="max-w-[1400px] mx-auto p-4 md:p-10">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
