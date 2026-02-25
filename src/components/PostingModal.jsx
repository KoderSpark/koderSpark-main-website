import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, CalendarDays, Clock, Briefcase, GraduationCap, Trophy, Send, ArrowUpRight, Zap } from 'lucide-react';

const TYPE_CONFIG = {
    job: {
        icon: Briefcase,
        label: 'Full-time Job',
        applyText: 'Apply Now',
        gradient: 'from-blue-600 via-cyan-500 to-blue-800',
        glowColor: 'rgba(59,130,246,0.4)',
        accentBg: 'bg-blue-500',
        accentText: 'text-blue-300',
        borderAccent: 'border-blue-500/30',
    },
    internship: {
        icon: GraduationCap,
        label: 'Internship',
        applyText: 'Apply for Internship',
        gradient: 'from-purple-600 via-violet-500 to-indigo-800',
        glowColor: 'rgba(139,92,246,0.4)',
        accentBg: 'bg-purple-500',
        accentText: 'text-purple-300',
        borderAccent: 'border-purple-500/30',
    },
    hackathon: {
        icon: Trophy,
        label: 'Hackathon',
        applyText: 'Register Now',
        gradient: 'from-amber-500 via-orange-500 to-rose-600',
        glowColor: 'rgba(245,158,11,0.4)',
        accentBg: 'bg-amber-500',
        accentText: 'text-amber-300',
        borderAccent: 'border-amber-500/30',
    },
};

const fmt = (d) =>
    d ? new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—';

export default function PostingModal({ posting, onClose }) {
    const cfg = TYPE_CONFIG[posting?.type] || TYPE_CONFIG.job;
    const Icon = cfg.icon;
    const isExpired = posting ? new Date(posting.untilDate) < new Date() : false;

    useEffect(() => {
        if (!posting) return;
        const fn = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', fn);
        return () => window.removeEventListener('keydown', fn);
    }, [onClose, posting]);

    useEffect(() => {
        if (!posting) return;
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = ''; };
    }, [posting]);

    if (!posting) return null;

    const whatsappMsg = encodeURIComponent(
        `Hi! I saw the ${posting.title} ${cfg.label} on Koderspark and I'm interested. Could you share more details?`
    );

    return createPortal(
        <div
            className="fixed inset-0 z-[9999] flex items-end md:items-center justify-center md:p-6"
            style={{ background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(14px)' }}
            onClick={onClose}
        >
            <div
                className="relative w-full md:max-w-3xl flex flex-col md:flex-row rounded-t-[28px] md:rounded-[28px] overflow-hidden animate-in slide-in-from-bottom-8 md:zoom-in-95 duration-300 ease-out"
                style={{
                    maxHeight: '92dvh',
                    boxShadow: `0 0 100px ${cfg.glowColor}, 0 0 0 1px rgba(255,255,255,0.06)`,
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Drag handle — visible on mobile only */}
                <div className="md:hidden absolute top-0 inset-x-0 flex justify-center pt-3 z-20 pointer-events-none">
                    <div className="w-10 h-1 rounded-full bg-white/25" />
                </div>
                {/* ART PANEL */}
                <div
                    className={`
                        relative flex-shrink-0
                        w-full h-44 md:h-auto md:w-72
                        bg-gradient-to-br ${cfg.gradient}
                        flex flex-col justify-end
                        p-5 md:p-8
                        overflow-hidden
                    `}
                >
                    {posting.image && (
                        <img src={posting.image} alt="" className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-25" />
                    )}
                    <Icon className="absolute -bottom-4 -right-4 w-36 h-36 text-white opacity-[0.08]" />
                    {isExpired ? (
                        <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 bg-black/40 backdrop-blur-sm rounded-full text-white text-[9px] font-black uppercase tracking-widest border border-white/15">
                            ✕ Closed
                        </span>
                    ) : (
                        <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-[9px] font-black uppercase tracking-widest border border-white/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                            Live Now
                        </span>
                    )}
                    <div className="relative space-y-1">
                        <p className="text-white/60 text-[9px] font-black uppercase tracking-[0.18em]">{cfg.label}</p>
                        <h2 className="text-white font-black uppercase tracking-tighter leading-tight text-xl md:text-2xl">
                            {posting.title}
                        </h2>
                    </div>
                    {/* X button — sits on art panel top-right, always correct position */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/30 hover:bg-black/50 border border-white/20 backdrop-blur-sm transition-all hover:rotate-90 duration-300"
                    >
                        <X className="w-4 h-4 text-white" />
                    </button>
                </div>

                {/* DETAILS PANEL */}
                <div className="relative flex-1 bg-[#0d0f14] flex flex-col min-h-0">
                    <div className="flex-1 overflow-y-auto px-5 md:px-7 pt-6 pb-4 space-y-5 overscroll-contain">
                        <div className={`grid grid-cols-2 gap-3 p-4 rounded-2xl bg-white/3 border ${cfg.borderAccent}`}>
                            <div className="flex items-center gap-2">
                                <CalendarDays className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                                <div>
                                    <p className="text-[8px] font-black uppercase tracking-widest text-slate-500 mb-0.5">Posted</p>
                                    <p className="text-xs font-bold text-white">{fmt(posting.postedDate)}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className={`w-3.5 h-3.5 flex-shrink-0 ${isExpired ? 'text-red-500' : 'text-slate-500'}`} />
                                <div>
                                    <p className="text-[8px] font-black uppercase tracking-widest text-slate-500 mb-0.5">
                                        {posting.type === 'hackathon' ? 'Event Date' : 'Apply Before'}
                                    </p>
                                    <p className={`text-xs font-bold ${isExpired ? 'text-red-400' : 'text-white'}`}>
                                        {fmt(posting.untilDate)}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <Zap className={`w-3 h-3 ${cfg.accentText} flex-shrink-0`} />
                                <p className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-500">About this opportunity</p>
                            </div>
                            <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap pr-2">
                                {posting.description || 'No description provided.'}
                            </p>
                        </div>
                    </div>

                    <div className="flex-shrink-0 px-5 md:px-7 pb-6 pt-3 border-t border-white/5 bg-[#0d0f14]">
                        {isExpired ? (
                            <div className="w-full py-4 rounded-2xl text-center text-slate-600 font-black text-xs uppercase tracking-widest bg-white/3 border border-white/5">
                                This opportunity has closed
                            </div>
                        ) : (
                            <a
                                href={`https://wa.me/919876543210?text=${whatsappMsg}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`group w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-black text-sm uppercase tracking-widest text-white transition-all active:scale-95 hover:brightness-110 ${cfg.accentBg}`}
                                style={{ boxShadow: `0 8px 32px ${cfg.glowColor}` }}
                            >
                                <Send className="w-4 h-4" />
                                {cfg.applyText}
                                <ArrowUpRight className="w-4 h-4 opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
}
