import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, LogOut, ChevronLeft, ChevronRight, Menu, X, BookOpen, ClipboardList, User, IndianRupee, Users } from 'lucide-react';
import api from '../api/axios';
import toast from 'react-hot-toast';

export default function StudentLayout() {
    const location = useLocation();
    const navigate = useNavigate();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
                if (data.length > 0) {
                    setStudent(data[0]);
                } else {
                    setStudent(parsedUser);
                }
            } catch (error) {
                console.error("Failed to fetch student data:", error);
                setStudent(parsedUser);
            }
        };

        fetchStudentData();
    }, [navigate, location.pathname]); // Refetch on route change to keep data fresh

    const handleLogout = () => {
        sessionStorage.removeItem('currentUser');
        sessionStorage.removeItem('studentAuthData');
        toast.success("Logged out successfully");
        navigate('/studentloginks');
    };

    const navItems = [
        { path: '/student/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { path: '/student/classes', icon: BookOpen, label: 'Classes' },
        { path: '/student/tasks', icon: ClipboardList, label: 'Tasks' },
        { path: '/student/earnings', icon: IndianRupee, label: 'Earnings' },
        { path: '/student/refer-earn', icon: Users, label: 'Refer & Earn' },
        { path: '/student/profile', icon: User, label: 'Profile' },
    ];

    return (
        <div className="min-h-screen bg-primary text-white flex flex-col md:flex-row font-sans transition-all duration-300">

            {/* Mobile Header */}
            <header className="md:hidden bg-surface/50 backdrop-blur-xl border-b border-white/5 p-4 flex justify-between items-center sticky top-0 z-[90]">
                <Link to="/">
                    <h1 className="text-lg font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">
                        Koderspark<span className="text-secondary">.</span>
                    </h1>
                </Link>
                <div className="flex items-center gap-4">
                    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white">
                        {mobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </header>

            {/* Mobile Sidebar Overlay */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 bg-black/80 z-[95] md:hidden" onClick={() => setMobileMenuOpen(false)} />
            )}

            {/* Mobile Sidebar Drawer */}
            <aside className={`fixed inset-y-0 left-0 w-64 bg-surface border-r border-white/5 p-6 z-[100] transform transition-transform duration-300 md:hidden ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <Link to="/" className="mb-12 block" onClick={() => setMobileMenuOpen(false)}>
                    <h1 className="text-xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">
                        Koderspark<span className="text-secondary">.</span>
                    </h1>
                </Link>
                <nav className="space-y-3">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`flex items-center gap-4 p-4 rounded-xl text-sm font-bold uppercase tracking-widest transition-all duration-300 ${location.pathname === item.path
                                ? 'bg-secondary/10 text-secondary border border-secondary/20 shadow-lg shadow-secondary/5'
                                : 'text-slate-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <item.icon className="w-5 h-5" />
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </nav>

                <div className="absolute bottom-8 left-6 right-6 space-y-6">
                    {student && (
                        <div className="flex items-center gap-3 p-2 bg-white/5 rounded-2xl border border-white/5">
                            <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10 flex-shrink-0">
                                {student.profileImage ? (
                                    <img src={student.profileImage} alt="" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-slate-800 flex items-center justify-center text-xs font-black">
                                        {student.fullName?.charAt(0)}
                                    </div>
                                )}
                            </div>
                            <div className="min-w-0">
                                <p className="text-xs font-bold text-white truncate uppercase tracking-tighter">{student.fullName}</p>
                                <p className="text-[9px] text-slate-500 uppercase tracking-tighter truncate">{student.course || student.domain}</p>
                            </div>
                        </div>
                    )}
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-4 p-4 rounded-xl text-sm font-bold uppercase tracking-widest text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors w-full"
                    >
                        <LogOut className="w-5 h-5" />
                        Logout
                    </button>
                </div>
            </aside>


            {/* Desktop Sidebar */}
            <aside className={`${isCollapsed ? 'w-24' : 'w-72'} border-r border-white/5 bg-surface/40 backdrop-blur-2xl p-6 hidden md:flex flex-col h-screen sticky top-0 transition-all duration-500 ease-in-out z-50`}>

                {/* Toggle Button */}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="absolute -right-4 top-10 bg-surface border border-white/10 rounded-full p-2 text-slate-400 hover:text-white hover:bg-white/10 transition-all shadow-xl z-20"
                >
                    {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                </button>

                <div className="mb-16 mt-2 px-2">
                    <Link to="/" className="block overflow-hidden">
                        {isCollapsed ? (
                            <h1 className="text-2xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60 text-center">
                                K<span className="text-secondary">.</span>
                            </h1>
                        ) : (
                            <h1 className="text-2xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">
                                Koderspark<span className="text-secondary">.</span>
                            </h1>
                        )}
                    </Link>
                </div>

                <nav className="space-y-3 flex-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-4 p-4 rounded-xl text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 ${location.pathname === item.path
                                ? 'bg-secondary/10 text-secondary border border-secondary/20 shadow-lg shadow-secondary/5'
                                : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                                } ${isCollapsed ? 'justify-center p-4' : ''}`}
                            title={isCollapsed ? item.label : ''}
                        >
                            <item.icon className={`w-5 h-5 flex-shrink-0 ${location.pathname === item.path ? 'animate-pulse' : ''}`} />
                            {!isCollapsed && <span>{item.label}</span>}
                        </Link>
                    ))}
                </nav>

                <div className="mt-auto space-y-6">
                    {student && !isCollapsed && (
                        <div className="p-4 bg-white/5 rounded-2xl border border-white/5 animate-in slide-in-from-left-4 duration-500">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl overflow-hidden border border-white/10 flex-shrink-0">
                                    {student.profileImage ? (
                                        <img src={student.profileImage} alt="" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full bg-slate-800 flex items-center justify-center text-xs font-black">
                                            {student.fullName?.charAt(0)}
                                        </div>
                                    )}
                                </div>
                                <div className="min-w-0">
                                    <p className="text-[11px] font-black text-white truncate uppercase tracking-tighter">{student.fullName}</p>
                                    <p className="text-[9px] text-slate-500 uppercase tracking-widest truncate">{student.status} Student</p>
                                </div>
                            </div>
                        </div>
                    )}

                    <button
                        onClick={handleLogout}
                        className={`flex items-center gap-4 p-4 rounded-xl text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all ${isCollapsed ? 'justify-center' : ''}`}
                        title={isCollapsed ? 'Logout' : ''}
                    >
                        <LogOut className="w-5 h-5 flex-shrink-0" />
                        {!isCollapsed && <span>Logout</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto bg-primary relative">
                {/* Background Decor */}
                <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-secondary/5 blur-[120px] rounded-full -z-10 pointer-events-none" />
                <div className="fixed bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/5 blur-[100px] rounded-full -z-10 pointer-events-none" />

                <div className="max-w-[1400px] mx-auto p-4 md:p-10">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
