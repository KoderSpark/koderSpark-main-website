import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useSocket } from '../hooks/useSocket';
import { Loader2, IndianRupee, TrendingUp, BookOpen, Calendar, ArrowUpRight, Wallet, History } from 'lucide-react';

export default function StudentEarnings() {
    const navigate = useNavigate();
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStudentData = async () => {
            const storedUser = sessionStorage.getItem('currentUser');
            if (!storedUser) { navigate('/studentloginks'); return; }
            const parsedUser = JSON.parse(storedUser);

            // ⚡ Show cached data instantly
            setStudent(parsedUser);
            setLoading(false);

            // Silently refresh in background
            try {
                const { data } = await api.get(`/admin/students?email=${parsedUser.email}`);
                if (data.length > 0) setStudent(data[0]);
            } catch { /* keep showing cached */ }
        };
        fetchStudentData();
    }, [navigate]);

    // Live update via WebSocket
    useSocket({
        'student:updated': (updated) => {
            setStudent(updated);
        },
    });

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-secondary animate-spin" />
            </div>
        );
    }

    if (!student) return null;

    return (
        <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-700">
            {/* Header section (Compact) */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 px-2">
                <div>
                    <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-1 flex items-center gap-2">
                        <Wallet className="w-6 h-6 text-secondary" />
                        Earnings Portal
                    </h2>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Rewards & Financial Overview</p>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                        ID: {student.studentId || 'N/A'}
                    </span>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* Left Side: Summary Cards (Sidebar style) */}
                <div className="lg:col-span-4 space-y-4">
                    {/* Primary Balance Card */}
                    <div className="bg-gradient-to-br from-secondary/20 via-primary to-primary border border-secondary/20 p-6 rounded-[32px] shadow-2xl relative overflow-hidden group">
                        <div className="absolute -top-6 -right-6 opacity-10 group-hover:scale-125 transition-transform duration-1000">
                            <IndianRupee className="w-32 h-32" />
                        </div>

                        <div className="relative z-10">
                            <p className="text-[9px] font-black text-secondary uppercase tracking-[0.2em] mb-3">Total Balance</p>
                            <div className="flex items-baseline gap-1.5 mb-6">
                                <span className="text-4xl font-black text-white">₹ {(student.earnings || 0).toLocaleString()}</span>
                                <span className="text-secondary/60 font-bold text-lg">.00</span>
                            </div>
                            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mb-4">
                                <div className="h-full bg-secondary w-2/3 shadow-[0_0_10px_rgba(255,204,0,0.4)]" />
                            </div>
                            <div className="flex items-center justify-between text-[8px] font-black uppercase tracking-widest text-slate-500">
                                <span>Verified Earnings</span>
                                <span className="text-white">Live</span>
                            </div>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-surface/30 backdrop-blur-xl border border-white/5 p-4 rounded-3xl group">
                            <div className="w-8 h-8 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-3 group-hover:scale-110 transition-transform">
                                <History className="w-4 h-4" />
                            </div>
                            <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Payouts</p>
                            <p className="text-lg font-black text-white">{student.payouts?.length || 0}</p>
                        </div>

                        <div className="bg-surface/30 backdrop-blur-xl border border-white/5 p-4 rounded-3xl group">
                            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-3 group-hover:scale-110 transition-transform">
                                <ArrowUpRight className="w-4 h-4" />
                            </div>
                            <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Last Sent</p>
                            <p className="text-lg font-black text-white">
                                {student.payouts && student.payouts.length > 0
                                    ? `₹${student.payouts[0].amount.toLocaleString()}`
                                    : '₹0'}
                            </p>
                        </div>
                    </div>

                    {/* Status Card (Compact) */}

                </div>

                {/* Right Side: Detailed Payout History */}
                <div className="lg:col-span-8 flex flex-col h-full">
                    <div className="bg-surface/30 backdrop-blur-xl border border-white/5 p-6 md:p-8 rounded-[40px] shadow-xl flex-1 flex flex-col">
                        <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
                            <div>
                                <h3 className="text-xs font-black text-white uppercase tracking-[0.2em] mb-1">Transaction Ledger</h3>
                                <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">History of all rewards and payouts</p>
                            </div>
                            <div className="p-2 bg-white/5 rounded-xl">
                                <History className="w-4 h-4 text-slate-500" />
                            </div>
                        </div>

                        {student.payouts && student.payouts.length > 0 ? (
                            <div className="space-y-3 pr-1 max-h-[500px] overflow-y-auto custom-scrollbar">
                                {student.payouts.map((payout, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-4 bg-white/[0.02] hover:bg-white/5 rounded-[24px] border border-white/5 hover:border-white/10 transition-all group/item duration-300">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-slate-600 group-hover/item:text-secondary group-hover/item:scale-110 transition-all">
                                                <BookOpen className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-xs md:text-sm font-black text-white uppercase tracking-tight mb-1">{payout.title}</p>
                                                <div className="flex items-center gap-1.5 opacity-60">
                                                    <Calendar className="w-3 h-3 text-slate-500" />
                                                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">
                                                        {new Date(payout.date).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-emerald-400 font-black text-sm md:text-base">
                                                + ₹{payout.amount.toLocaleString()}
                                            </div>
                                            <p className="text-[7px] text-slate-600 font-black uppercase tracking-widest mt-1">Confirmed</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center py-20 bg-white/[0.01] rounded-[32px] border border-dashed border-white/10">
                                <Wallet className="w-12 h-12 text-slate-800 mb-4" />
                                <p className="text-[10px] text-slate-600 font-black uppercase tracking-[0.2em]">No financial data available</p>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}
