import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { LayoutDashboard, Users, LogOut, Search, IndianRupee, ChevronLeft, ChevronRight, Menu, X, ClipboardList } from 'lucide-react';

export default function AdminLayout() {
    const location = useLocation();
    const navigate = useNavigate();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        sessionStorage.removeItem('adminToken');
        sessionStorage.removeItem('adminUser');
        navigate('/kodersparkasadmin');
    };

    // Protection Logic
    const isAdmin = sessionStorage.getItem('adminToken') === 'true';
    if (!isAdmin) {
        return <Navigate to="/kodersparkasadmin" replace />;
    }

    const navItems = [
        { path: '/ks-admin/students', icon: Users, label: 'Students' },
        { path: '/ks-admin/search', icon: Search, label: 'Search' },
        { path: '/ks-admin/payments', icon: IndianRupee, label: 'Payments' },
        { path: '/ks-admin/tasks', icon: ClipboardList, label: 'Tasks' },
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
                <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white">
                    {mobileMenuOpen ? <X /> : <Menu />}
                </button>
            </header>

            {/* Mobile Sidebar Overlay */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 bg-black/80 z-[95] md:hidden" onClick={() => setMobileMenuOpen(false)} />
            )}

            {/* Mobile Sidebar Drawer */}
            <aside className={`fixed inset-y-0 left-0 w-64 bg-surface border-r border-white/5 p-6 z-[100] transform transition-transform duration-300 md:hidden ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <Link to="/" className="mb-8 block" onClick={() => setMobileMenuOpen(false)}>
                    <h1 className="text-xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">
                        Koderspark<span className="text-secondary">.</span>
                    </h1>
                </Link>
                <nav className="space-y-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`flex items-center gap-3 p-3 rounded-lg text-sm font-medium uppercase tracking-wider transition-all duration-300 ${location.pathname.includes(item.path.split('/').pop())
                                ? 'bg-secondary/10 text-secondary border border-secondary/20'
                                : 'text-slate-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <item.icon className="w-5 h-5" />
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </nav>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 p-3 rounded-lg text-sm font-medium uppercase tracking-wider text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors mt-8 w-full"
                >
                    <LogOut className="w-5 h-5" />
                    Logout
                </button>
            </aside>


            {/* Desktop Sidebar */}
            <aside className={`${isCollapsed ? 'w-20' : 'w-64'} border-r border-white/5 bg-surface/50 backdrop-blur-xl p-4 hidden md:flex flex-col h-screen sticky top-0 transition-all duration-300`}>

                {/* Toggle Button */}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="absolute -right-3 top-8 bg-surface border border-white/10 rounded-full p-1 text-slate-400 hover:text-white hover:bg-white/10 transition-colors z-20"
                >
                    {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                </button>

                <div className="mb-12 mt-2 px-2">
                    <Link to="/" className="block overflow-hidden whitespace-nowrap">
                        {isCollapsed ? (
                            <h1 className="text-xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">
                                K<span className="text-secondary">.</span>
                            </h1>
                        ) : (
                            <h1 className="text-xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">
                                Koderspark<span className="text-secondary">.</span>
                            </h1>
                        )}
                    </Link>
                </div>

                <nav className="space-y-2 flex-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 p-3 rounded-lg text-sm font-medium uppercase tracking-wider transition-all duration-300 ${location.pathname.includes(item.path.split('/').pop())
                                ? 'bg-secondary/10 text-secondary border border-secondary/20'
                                : 'text-slate-400 hover:text-white hover:bg-white/5'
                                } ${isCollapsed ? 'justify-center' : ''}`}
                            title={isCollapsed ? item.label : ''}
                        >
                            <item.icon className="w-5 h-5 flex-shrink-0" />
                            {!isCollapsed && <span>{item.label}</span>}
                        </Link>
                    ))}
                </nav>

                <button
                    onClick={handleLogout}
                    className={`flex items-center gap-3 p-3 rounded-lg text-sm font-medium uppercase tracking-wider text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors ${isCollapsed ? 'justify-center' : ''}`}
                    title={isCollapsed ? 'Logout' : ''}
                >
                    <LogOut className="w-5 h-5 flex-shrink-0" />
                    {!isCollapsed && <span>Logout</span>}
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-4 md:p-8 overflow-y-auto bg-primary w-full">
                <Outlet />
            </main>
        </div>
    );
}
