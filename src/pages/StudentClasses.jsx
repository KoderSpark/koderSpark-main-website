import React, { useEffect, useState } from 'react';
import { BookOpen, Lock, CheckCircle, Clock } from 'lucide-react';
import { useSocket } from '../hooks/useSocket';
import api from '../api/axios';

export default function StudentClasses() {
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const raw = sessionStorage.getItem('currentUser');
                if (!raw) return;
                const parsed = JSON.parse(raw);

                // ⚡ Show cached data instantly
                setStudent(parsed);
                setLoading(false);

                // Fetch fresh data in background
                const { data } = await api.get(`/admin/students?email=${parsed.email}`);
                if (data.length > 0) setStudent(data[0]);
            } catch {
                setLoading(false);
            }
        };
        fetchStudent();
    }, []);

    // Live update via WebSocket — instantly unlock when admin approves
    useSocket({
        'student:updated': (updated) => {
            setStudent(updated);
        },
    });

    const isApproved = student?.status === 'Approved';

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-secondary border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-700">

            {/* Header */}
            <div className="bg-surface/30 backdrop-blur-xl border border-white/5 p-10 rounded-[40px] relative overflow-hidden">
                <div className="absolute top-0 right-0 p-10 opacity-5">
                    <BookOpen className="w-40 h-40" />
                </div>
                <div className="relative z-10 flex items-start justify-between gap-6">
                    <div>
                        <h1 className="text-4xl font-black text-white uppercase tracking-tighter mb-4">My Classes</h1>
                        <p className="text-slate-400 max-w-xl">View your upcoming live sessions, recordings, and course schedules here.</p>
                    </div>
                    {/* Approval badge */}
                    <div className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-black uppercase tracking-widest ${isApproved
                        ? 'bg-green-500/10 border-green-500/20 text-green-400'
                        : student?.status === 'Verifying'
                            ? 'bg-amber-500/10 border-amber-500/20 text-amber-400'
                            : 'bg-red-500/10 border-red-500/20 text-red-400'
                        }`}>
                        {isApproved ? <CheckCircle className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                        {student?.status || 'Pending'}
                    </div>
                </div>
            </div>

            {/* Approved — show classes content */}
            {isApproved ? (
                <div className="space-y-6">
                    <div className="bg-surface/30 border border-white/5 p-20 rounded-[40px] text-center space-y-6">
                        <div className="w-24 h-24 bg-secondary/10 rounded-full flex items-center justify-center mx-auto text-secondary">
                            <BookOpen className="w-10 h-10" />
                        </div>
                        <h3 className="text-xl font-bold text-white uppercase tracking-widest">Class Access</h3>
                        <p className="text-slate-500 text-sm max-w-sm mx-auto uppercase font-bold tracking-tight italic">
                            Live session links and recordings will be provided here as they become available.
                        </p>
                    </div>
                </div>
            ) : (
                /* Not Approved — show locked state */
                <div className="bg-surface/30 border border-white/5 rounded-[40px] p-20 flex flex-col items-center justify-center text-center space-y-6 relative overflow-hidden">
                    {/* Blurred BG */}
                    <div className="absolute inset-0 bg-red-500/3 rounded-[40px]" />
                    <div className="absolute -top-20 -right-20 w-60 h-60 bg-red-500/5 blur-[80px] rounded-full" />

                    <div className="relative z-10 flex flex-col items-center gap-6">
                        {/* Lock icon */}
                        <div className="w-24 h-24 bg-white/5 border border-white/5 rounded-full flex items-center justify-center">
                            <Lock className="w-10 h-10 text-slate-600" />
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-2xl font-black text-white uppercase tracking-tighter">
                                Access Restricted
                            </h3>
                            <p className="text-slate-400 text-sm max-w-sm mx-auto leading-relaxed">
                                Your account has not been approved yet. Once approved by your admin, you'll get full access to live sessions, recordings, and course materials.
                            </p>
                        </div>

                        {/* Status pill */}
                        <div className={`flex items-center gap-2 px-5 py-2.5 rounded-full border text-xs font-black uppercase tracking-widest ${student?.status === 'Verifying'
                            ? 'bg-amber-500/10 border-amber-500/20 text-amber-400'
                            : 'bg-slate-500/10 border-slate-500/20 text-slate-400'
                            }`}>
                            <Clock className="w-3.5 h-3.5" />
                            {student?.status === 'Verifying'
                                ? 'Your account is being verified...'
                                : 'Awaiting admin approval'}
                        </div>

                        <p className="text-slate-600 text-xs uppercase tracking-widest">
                            Contact your admin if you think this is a mistake
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
