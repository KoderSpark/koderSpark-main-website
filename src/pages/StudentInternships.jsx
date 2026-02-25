import React, { useState, useEffect, useCallback } from 'react';
import { GraduationCap, Loader2, ImageIcon, CalendarDays, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useSocket } from '../hooks/useSocket';
import toast from 'react-hot-toast';

export default function StudentInternships() {
    const navigate = useNavigate();
    const [internships, setInternships] = useState([]);
    const [loading, setLoading] = useState(true);
    const [appliedIds, setAppliedIds] = useState([]);

    const fetchInternships = useCallback(async () => {
        try {
            const { data } = await api.get('/postings?type=internship');
            setInternships(data);

            // Fetch applied mappings from current user
            const storedUser = sessionStorage.getItem('currentUser');
            if (storedUser) {
                const student = JSON.parse(storedUser);
                setAppliedIds(student.appliedPostings || []);
            }
        } catch {
            toast.error('Failed to load internships');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchInternships(); }, [fetchInternships]);

    useSocket({
        'postings:updated': ({ type }) => {
            if (type === 'internship') fetchInternships();
        },
    });

    const fmt = (d) => d ? new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—';
    const isExpired = (untilDate) => new Date(untilDate) < new Date();

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-secondary animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="relative">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-4 font-bold text-xs text-purple-400 uppercase tracking-widest">
                    <GraduationCap className="w-4 h-4" />
                    Internship Opportunities
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter leading-[0.9]">
                    Open <span className="text-secondary">Internships</span>
                </h1>
                <p className="text-slate-400 text-sm mt-3 font-medium">
                    Curated internship programs selected by Koderspark for our students.
                </p>
            </div>

            {/* List */}
            {internships.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 bg-surface/30 border border-white/5 rounded-3xl">
                    <GraduationCap className="w-16 h-16 text-white/10 mb-4" />
                    <p className="text-slate-500 text-sm uppercase tracking-widest font-bold">No internship listings available right now</p>
                    <p className="text-slate-600 text-xs mt-2">Check back soon — new opportunities are added regularly.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {internships.map(item => {
                        const expired = isExpired(item.untilDate);
                        const hasApplied = appliedIds.includes(item._id);
                        return (
                            <div
                                key={item._id}
                                onClick={() => navigate('/student/posting', { state: { posting: { ...item, type: 'internship' } } })}
                                className={`group flex flex-row items-stretch bg-surface/30 backdrop-blur-xl border rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer hover:bg-surface/50 hover:scale-[1.01] ${expired ? 'border-white/5 opacity-60' : 'border-white/10 hover:border-purple-500/20'}`}
                            >
                                {/* Left: Image */}
                                <div className="w-36 md:w-52 flex-shrink-0 relative overflow-hidden bg-purple-500/5">
                                    {item.image ? (
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center min-h-[110px]">
                                            <ImageIcon className="w-8 h-8 text-purple-500/20" />
                                        </div>
                                    )}
                                    {/* Overlay badges on image */}
                                    <div className="absolute top-2 left-2 flex flex-col gap-1.5">
                                        {expired && (
                                            <div className="px-2 py-0.5 bg-red-500/80 text-white text-[9px] font-black uppercase tracking-widest rounded-full">
                                                Closed
                                            </div>
                                        )}
                                        {hasApplied && (
                                            <div className="px-2 py-0.5 bg-emerald-500/80 text-white text-[9px] font-black uppercase tracking-widest rounded-full">
                                                Applied
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Right: Content */}
                                <div className="flex-1 p-5 flex flex-col justify-between gap-3 min-w-0">
                                    <div className="space-y-2">
                                        {/* Type Badge */}
                                        <div className="flex items-center justify-between">
                                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full">
                                                <GraduationCap className="w-3 h-3 text-purple-400" />
                                                <span className="text-[9px] font-black text-purple-400 uppercase tracking-widest">Internship</span>
                                            </div>
                                            {hasApplied && (
                                                <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">Applied</span>
                                            )}
                                        </div>
                                        {/* Title */}
                                        <h3 className="text-base md:text-lg font-black text-white uppercase tracking-tighter leading-tight">
                                            {item.title}
                                        </h3>
                                        {/* Description */}
                                        <p className="text-slate-400 text-sm leading-relaxed line-clamp-2">
                                            {item.description}
                                        </p>
                                    </div>

                                    {/* Dates */}
                                    <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-white/5">
                                        <span className="flex items-center gap-1.5 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                                            <CalendarDays className="w-3.5 h-3.5" />
                                            Posted: {fmt(item.postedDate)}
                                        </span>
                                        <span className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest ${expired ? 'text-red-400/70' : 'text-slate-400'}`}>
                                            <Clock className="w-3.5 h-3.5" />
                                            Until: {fmt(item.untilDate)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
