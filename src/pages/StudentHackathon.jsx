import React, { useState, useEffect, useCallback } from 'react';
import { Trophy, Loader2, ImageIcon, CalendarDays, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useSocket } from '../hooks/useSocket';
import toast from 'react-hot-toast';

const isUpcoming = (date) => new Date(date) >= new Date();

export default function StudentHackathon() {
    const navigate = useNavigate();
    const [hackathons, setHackathons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('upcoming');

    const fetchHackathons = useCallback(async () => {
        try {
            const { data } = await api.get('/postings?type=hackathon');
            setHackathons(data);
        } catch {
            toast.error('Failed to load hackathons');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchHackathons(); }, [fetchHackathons]);

    useSocket({
        'postings:updated': ({ type }) => {
            if (type === 'hackathon') fetchHackathons();
        },
    });

    const fmt = (d) => d ? new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—';

    const upcoming = hackathons.filter(h => isUpcoming(h.untilDate));
    const previous = hackathons.filter(h => !isUpcoming(h.untilDate));
    const displayed = filter === 'upcoming' ? upcoming : previous;

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
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-4 font-bold text-xs text-amber-400 uppercase tracking-widest">
                    <Trophy className="w-4 h-4" />
                    Hackathons
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter leading-[0.9]">
                    Hack <span className="text-secondary">& Build</span>
                </h1>
                <p className="text-slate-400 text-sm mt-3 font-medium">
                    Explore hackathons curated by Koderspark for our students.
                </p>
                <div className="absolute -top-8 right-0 w-48 h-48 bg-amber-500/5 blur-[80px] rounded-full -z-10" />
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 bg-surface/30 border border-white/5 rounded-2xl p-1.5 w-fit">
                <button
                    onClick={() => setFilter('upcoming')}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${filter === 'upcoming'
                        ? 'bg-green-500/15 text-green-400 border border-green-500/20 shadow-lg'
                        : 'text-slate-500 hover:text-slate-300'
                        }`}
                >
                    <span className={`w-2 h-2 rounded-full ${filter === 'upcoming' ? 'bg-green-400 animate-pulse' : 'bg-slate-600'}`} />
                    Upcoming
                    <span className={`ml-1 px-2 py-0.5 rounded-full text-[9px] font-black ${filter === 'upcoming' ? 'bg-green-500/20 text-green-400' : 'bg-white/5 text-slate-500'}`}>
                        {upcoming.length}
                    </span>
                </button>
                <button
                    onClick={() => setFilter('previous')}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${filter === 'previous'
                        ? 'bg-white/10 text-white border border-white/10'
                        : 'text-slate-500 hover:text-slate-300'
                        }`}
                >
                    <span className={`w-2 h-2 rounded-full ${filter === 'previous' ? 'bg-slate-400' : 'bg-slate-600'}`} />
                    Previous
                    <span className={`ml-1 px-2 py-0.5 rounded-full text-[9px] font-black ${filter === 'previous' ? 'bg-white/10 text-slate-300' : 'bg-white/5 text-slate-500'}`}>
                        {previous.length}
                    </span>
                </button>
            </div>

            {/* List */}
            {displayed.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 bg-surface/30 border border-white/5 rounded-3xl">
                    <Trophy className="w-16 h-16 text-white/10 mb-4" />
                    <p className="text-slate-500 text-sm uppercase tracking-widest font-bold">
                        No {filter} hackathons right now
                    </p>
                    <p className="text-slate-600 text-xs mt-2">
                        {filter === 'upcoming' ? 'Check back soon for new events.' : 'Past hackathons will appear here.'}
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {displayed.map(item => (
                        <div
                            key={item._id}
                            onClick={() => navigate('/student/posting', { state: { posting: { ...item, type: 'hackathon' } } })}
                            className={`group flex flex-row items-stretch bg-surface/30 backdrop-blur-xl border rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer hover:bg-surface/50 hover:scale-[1.01] ${filter === 'upcoming'
                                ? 'border-white/10 hover:border-amber-500/20'
                                : 'border-white/5 opacity-75 hover:opacity-90'
                                }`}
                        >
                            {/* Left: Image */}
                            <div className="w-36 md:w-52 flex-shrink-0 relative overflow-hidden bg-amber-500/5">
                                {item.image ? (
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center min-h-[120px]">
                                        <Trophy className="w-10 h-10 text-amber-500/20" />
                                    </div>
                                )}
                                {/* Status badge */}
                                <div className={`absolute top-2 left-2 px-2 py-0.5 text-[9px] font-black uppercase tracking-widest rounded-full ${filter === 'upcoming'
                                    ? 'bg-green-500/80 text-white'
                                    : 'bg-slate-600/80 text-white'
                                    }`}>
                                    {filter === 'upcoming' ? '🟢 Upcoming' : '⚫ Past'}
                                </div>
                            </div>

                            {/* Right: Content */}
                            <div className="flex-1 p-5 flex flex-col justify-between gap-3 min-w-0">
                                <div className="space-y-2">
                                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full">
                                        <Trophy className="w-3 h-3 text-amber-400" />
                                        <span className="text-[9px] font-black text-amber-400 uppercase tracking-widest">Hackathon</span>
                                    </div>
                                    <h3 className="text-base md:text-lg font-black text-white uppercase tracking-tighter leading-tight">
                                        {item.title}
                                    </h3>
                                    <p className="text-slate-400 text-sm leading-relaxed line-clamp-2">
                                        {item.description}
                                    </p>
                                </div>

                                {/* Dates */}
                                <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-white/5">
                                    <span className="flex items-center gap-1.5 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                                        <CalendarDays className="w-3.5 h-3.5" />
                                        Announced: {fmt(item.postedDate)}
                                    </span>
                                    <span className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest ${filter === 'upcoming' ? 'text-amber-400' : 'text-slate-500'}`}>
                                        <Clock className="w-3.5 h-3.5" />
                                        Event: {fmt(item.untilDate)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
