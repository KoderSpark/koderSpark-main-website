import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    ArrowLeft, CalendarDays, Clock, Briefcase,
    GraduationCap, Trophy, Send, ArrowUpRight, Zap, Sparkles
} from 'lucide-react';

const TYPE_CONFIG = {
    job: {
        icon: Briefcase,
        label: 'Full-time Job',
        applyText: 'Apply Now',
        gradient: 'from-blue-600 via-cyan-500 to-blue-900',
        glowColor: 'rgba(59,130,246,0.5)',
        accentBg: 'bg-blue-500',
        accentText: 'text-blue-400',
        borderAccent: 'border-blue-500/20',
        tagBg: 'bg-blue-500/15',
        tagText: 'text-blue-300',
        tagBorder: 'border-blue-400/30',
    },
    internship: {
        icon: GraduationCap,
        label: 'Internship',
        applyText: 'Apply for Internship',
        gradient: 'from-violet-700 via-purple-600 to-indigo-900',
        glowColor: 'rgba(139,92,246,0.5)',
        accentBg: 'bg-violet-500',
        accentText: 'text-violet-400',
        borderAccent: 'border-violet-500/20',
        tagBg: 'bg-violet-500/15',
        tagText: 'text-violet-300',
        tagBorder: 'border-violet-400/30',
    },
    hackathon: {
        icon: Trophy,
        label: 'Hackathon',
        applyText: 'Register Now',
        gradient: 'from-amber-500 via-orange-500 to-rose-700',
        glowColor: 'rgba(245,158,11,0.5)',
        accentBg: 'bg-amber-500',
        accentText: 'text-amber-400',
        borderAccent: 'border-amber-500/20',
        tagBg: 'bg-amber-500/15',
        tagText: 'text-amber-300',
        tagBorder: 'border-amber-400/30',
    },
};

const fmt = (d) =>
    d ? new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : '—';

export default function PostingDetail() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const posting = state?.posting;

    useEffect(() => {
        if (!posting) navigate(-1);
    }, [posting, navigate]);

    if (!posting) return null;

    const cfg = TYPE_CONFIG[posting.type] || TYPE_CONFIG.job;
    const Icon = cfg.icon;
    const isExpired = new Date(posting.untilDate) < new Date();

    const whatsappMsg = encodeURIComponent(
        `Hi! I saw the ${posting.title} ${cfg.label} on Koderspark and I'm interested. Could you share more details?`
    );

    return (
        <div className="min-h-screen bg-primary animate-in fade-in duration-300">

            {/* ══════════════════════════════
                HERO — image fills full width
                with NO colour tint. Only a
                gradient at the very bottom
                so the title text is legible.
            ══════════════════════════════ */}
            <div className="relative w-full overflow-hidden" style={{ height: '260px' }}>

                {posting.image ? (
                    /* Clean image — zero tint */
                    <img
                        src={posting.image}
                        alt={posting.title}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                ) : (
                    /* Fallback: abstract gradient art when no image */
                    <div className={`absolute inset-0 bg-gradient-to-br ${cfg.gradient}`}>
                        {/* decorative rings */}
                        <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full border border-white/10" />
                        <div className="absolute -top-10 -left-10 w-60 h-60 rounded-full border border-white/10" />
                        <div className="absolute top-1/2 right-10 w-40 h-40 rounded-full bg-white/5" />
                        <div className="absolute bottom-10 left-1/3 w-24 h-24 rounded-full bg-white/5" />
                        {/* huge watermark */}
                        <Icon className="absolute -bottom-6 right-8 w-64 h-64 text-white opacity-[0.06]" />
                    </div>
                )}

                {/* Text readable gradient — ONLY behind the text at the bottom, not tinting the whole image */}
                <div className="absolute bottom-0 left-0 right-0 h-3/4 bg-gradient-to-t from-primary via-primary/80 to-transparent" />

                {/* Content over hero */}
                <div className="absolute inset-0 flex flex-col justify-between p-5 md:p-10 max-w-5xl mx-auto left-0 right-0">

                    {/* Top bar */}
                    <div className="flex items-center gap-3 flex-wrap">
                        <button
                            onClick={() => navigate(-1)}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md hover:bg-black/60 border border-white/15 text-white text-xs font-black uppercase tracking-widest transition-all active:scale-95"
                        >
                            <ArrowLeft className="w-3.5 h-3.5" />
                            Back
                        </button>

                        {/* Live / Closed */}
                        {isExpired ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-black/40 backdrop-blur-md border border-red-500/30 text-red-400 text-[9px] font-black uppercase tracking-widest">
                                ✕ Closed
                            </span>
                        ) : (
                            <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-black/40 backdrop-blur-md border border-green-400/30 text-green-400 text-[9px] font-black uppercase tracking-widest">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                Live Now
                            </span>
                        )}

                        {/* Type chip */}
                        <span className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-full backdrop-blur-md border text-[9px] font-black uppercase tracking-widest ${cfg.tagBg} ${cfg.tagText} ${cfg.tagBorder}`}>
                            <Icon className="w-3 h-3" />
                            {cfg.label}
                        </span>
                    </div>

                    {/* Title at bottom of hero */}
                    <div>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none drop-shadow-2xl">
                            {posting.title}
                        </h1>
                    </div>
                </div>
            </div>

            {/* ══════════════════════════════
                BODY CONTENT
            ══════════════════════════════ */}
            <div className="max-w-5xl mx-auto px-5 md:px-10 pb-16 space-y-8 -mt-2">

                {/* ── Date pills row ── */}
                <div className="flex flex-wrap gap-3">
                    <div className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-surface/50 backdrop-blur border ${cfg.borderAccent}`}>
                        <CalendarDays className="w-4 h-4 text-slate-500 flex-shrink-0" />
                        <div>
                            <p className="text-[8px] font-black uppercase tracking-widest text-slate-500">Posted</p>
                            <p className="text-sm font-bold text-white">{fmt(posting.postedDate)}</p>
                        </div>
                    </div>
                    <div className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-surface/50 backdrop-blur border ${isExpired ? 'border-red-500/20' : cfg.borderAccent}`}>
                        <Clock className={`w-4 h-4 flex-shrink-0 ${isExpired ? 'text-red-400' : 'text-slate-500'}`} />
                        <div>
                            <p className="text-[8px] font-black uppercase tracking-widest text-slate-500">
                                {posting.type === 'hackathon' ? 'Event Date' : 'Apply Before'}
                            </p>
                            <p className={`text-sm font-bold ${isExpired ? 'text-red-400' : 'text-white'}`}>
                                {fmt(posting.untilDate)}
                            </p>
                        </div>
                    </div>
                </div>

                {/* ── Description area ── */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Sparkles className={`w-4 h-4 ${cfg.accentText}`} />
                        <span className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">
                            About this opportunity
                        </span>
                        <div className="flex-1 h-px bg-white/5" />
                    </div>

                    <p className="text-slate-300 text-base leading-loose whitespace-pre-wrap">
                        {posting.description || 'No description provided.'}
                    </p>
                </div>

                {/* ── CTA button ── */}
                <div className="pt-2">
                    {isExpired ? (
                        <div className="w-full py-5 rounded-2xl text-center text-slate-600 font-black text-sm uppercase tracking-widest bg-white/3 border border-white/5">
                            This opportunity has closed
                        </div>
                    ) : (
                        <a
                            href={`https://wa.me/919876543210?text=${whatsappMsg}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`group relative inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl font-black text-sm uppercase tracking-widest text-white transition-all active:scale-[0.98] hover:brightness-105 overflow-hidden ${cfg.accentBg}`}
                            style={{ boxShadow: `0 8px 32px ${cfg.glowColor}` }}
                        >
                            {/* animated shine */}
                            <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                            <Send className="w-5 h-5 relative z-10" />
                            <span className="relative z-10">{cfg.applyText}</span>
                            <ArrowUpRight className="w-5 h-5 relative z-10 opacity-70 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}
