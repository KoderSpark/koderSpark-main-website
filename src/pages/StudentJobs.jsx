import React, { useState, useEffect, useCallback } from 'react';
import { Briefcase, Loader2, ImageIcon, CalendarDays, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useSocket } from '../hooks/useSocket';
import toast from 'react-hot-toast';

export default function StudentJobs() {
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchJobs = useCallback(async () => {
        try {
            const { data } = await api.get('/postings?type=job');
            setJobs(data);
        } catch {
            toast.error('Failed to load jobs');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchJobs(); }, [fetchJobs]);

    useSocket({
        'postings:updated': ({ type }) => {
            if (type === 'job') fetchJobs();
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
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4 font-bold text-xs text-blue-400 uppercase tracking-widest">
                    <Briefcase className="w-4 h-4" />
                    Job Opportunities
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter leading-[0.9]">
                    Open <span className="text-secondary">Jobs</span>
                </h1>
                <p className="text-slate-400 text-sm mt-3 font-medium">
                    Curated job openings selected by Koderspark for our students.
                </p>
            </div>

            {/* List */}
            {jobs.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 bg-surface/30 border border-white/5 rounded-3xl">
                    <Briefcase className="w-16 h-16 text-white/10 mb-4" />
                    <p className="text-slate-500 text-sm uppercase tracking-widest font-bold">No job listings available right now</p>
                    <p className="text-slate-600 text-xs mt-2">Check back soon — new opportunities are added regularly.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {jobs.map(job => {
                        const expired = isExpired(job.untilDate);
                        return (
                            <div
                                key={job._id}
                                onClick={() => navigate('/student/posting', { state: { posting: { ...job, type: 'job' } } })}
                                className={`group flex flex-row items-stretch bg-surface/30 backdrop-blur-xl border rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer hover:bg-surface/50 hover:scale-[1.01] ${expired ? 'border-white/5 opacity-60' : 'border-white/10 hover:border-blue-500/20'}`}
                            >
                                {/* Left: Image */}
                                <div className="w-36 md:w-52 flex-shrink-0 relative overflow-hidden bg-blue-500/5">
                                    {job.image ? (
                                        <img
                                            src={job.image}
                                            alt={job.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center min-h-[110px]">
                                            <ImageIcon className="w-8 h-8 text-blue-500/20" />
                                        </div>
                                    )}
                                    {/* Closed badge on image */}
                                    {expired && (
                                        <div className="absolute top-2 left-2 px-2 py-0.5 bg-red-500/80 text-white text-[9px] font-black uppercase tracking-widest rounded-full">
                                            Closed
                                        </div>
                                    )}
                                </div>

                                {/* Right: Content */}
                                <div className="flex-1 p-5 flex flex-col justify-between gap-3 min-w-0">
                                    <div className="space-y-2">
                                        {/* Type Badge */}
                                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full">
                                            <Briefcase className="w-3 h-3 text-blue-400" />
                                            <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest">Full-time Job</span>
                                        </div>
                                        {/* Title */}
                                        <h3 className="text-base md:text-lg font-black text-white uppercase tracking-tighter leading-tight">
                                            {job.title}
                                        </h3>
                                        {/* Description */}
                                        <p className="text-slate-400 text-sm leading-relaxed line-clamp-2">
                                            {job.description}
                                        </p>
                                    </div>

                                    {/* Dates */}
                                    <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-white/5">
                                        <span className="flex items-center gap-1.5 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                                            <CalendarDays className="w-3.5 h-3.5" />
                                            Posted: {fmt(job.postedDate)}
                                        </span>
                                        <span className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest ${expired ? 'text-red-400/70' : 'text-slate-400'}`}>
                                            <Clock className="w-3.5 h-3.5" />
                                            Until: {fmt(job.untilDate)}
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
