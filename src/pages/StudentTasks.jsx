import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useSocket } from '../hooks/useSocket';
import { Loader2, ClipboardList, Clock, CheckCircle2, ChevronDown, ChevronUp, ExternalLink, X, Send } from 'lucide-react';
import toast from 'react-hot-toast';

function TaskCard({ task, index, onRefresh }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [vercelLink, setVercelLink] = useState(task.submissionUrl || '');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const descriptionLimit = 200;
    const isLongDescription = task.description?.length > descriptionLimit;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!vercelLink) return toast.error("Please provide a Vercel link");

        setIsSubmitting(true);
        try {
            const storedUser = JSON.parse(sessionStorage.getItem('currentUser'));
            await api.put('/student/submit-task', {
                studentId: storedUser._id,
                taskIndex: index,
                submissionUrl: vercelLink
            });
            toast.success("Work submitted successfully!");
            setShowModal(false);
            onRefresh();
        } catch (error) {
            console.error("Submission failed:", error);
            toast.error("Failed to submit work");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <div className="bg-surface/30 hover:bg-surface/50 border border-white/5 hover:border-secondary/20 p-5 md:p-6 rounded-[28px] transition-all duration-300 group shadow-lg flex flex-col h-full overflow-hidden">
                <div className="flex items-start justify-between gap-4 mb-4">
                    <div className={`p-2.5 rounded-xl border ${task.status === 'Completed' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' :
                        task.status === 'In Progress' ? 'bg-blue-500/10 border-blue-500/20 text-blue-500' :
                            'bg-amber-500/10 border-amber-500/20 text-amber-500'}`}>
                        {task.status === 'Completed' ? <CheckCircle2 className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                    </div>
                    <span className={`text-[9px] px-2.5 py-1 rounded-full font-black uppercase tracking-widest border ${task.status === 'Completed' ? 'border-emerald-500/20 text-emerald-500' :
                        task.status === 'In Progress' ? 'border-blue-500/20 text-blue-500' :
                            'border-amber-500/20 text-amber-500'}`}>
                        {task.status}
                    </span>
                </div>

                <h3 className="text-lg font-black text-white mb-3 group-hover:text-secondary transition-colors leading-tight uppercase tracking-tighter">
                    {task.title}
                </h3>

                {task.description && (
                    <div className="flex-grow space-y-3">
                        <p className={`text-slate-400 text-[13px] leading-relaxed whitespace-pre-wrap italic font-medium transition-all duration-500 ${!isExpanded && isLongDescription ? 'line-clamp-3' : ''}`}>
                            {task.description}
                        </p>

                        <div className="flex flex-wrap gap-2 pt-1">
                            {task.documentUrl && (
                                <a
                                    href={task.documentUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-[9px] font-black text-secondary uppercase tracking-widest bg-secondary/5 px-3 py-1.5 rounded-lg border border-secondary/10 hover:bg-secondary hover:text-primary transition-all group/link"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover/link:animate-bounce"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                                    Project Brief
                                </a>
                            )}

                            {task.submissionUrl && (
                                <a
                                    href={task.submissionUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-[9px] font-black text-emerald-400 uppercase tracking-widest bg-emerald-500/5 px-3 py-1.5 rounded-lg border border-emerald-500/10 hover:bg-emerald-500 hover:text-white transition-all"
                                >
                                    <ExternalLink className="w-3 h-3" />
                                    Live Preview
                                </a>
                            )}
                        </div>

                        {isLongDescription && (
                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="text-[9px] font-black text-secondary uppercase tracking-[0.2em] flex items-center gap-1.5 hover:gap-2 transition-all mt-1"
                            >
                                {isExpanded ? (
                                    <>Less <ChevronUp className="w-3 h-3" /></>
                                ) : (
                                    <>Instructions <ChevronDown className="w-3 h-3" /></>
                                )}
                            </button>
                        )}
                    </div>
                )}

                <div className="pt-4 border-t border-white/5 flex items-center justify-between mt-6">
                    <div className="space-y-0.5">
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Deadline</p>
                        <p className="text-[11px] font-bold text-white uppercase">
                            {task.deadline ? new Date(task.deadline).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }) : 'Flexible'}
                        </p>
                    </div>
                    <button
                        onClick={() => setShowModal(true)}
                        className={`text-[9px] font-black uppercase tracking-widest px-3.5 py-2 rounded-lg transition-all shadow-lg active:scale-95 border ${task.status === 'Completed'
                            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500 hover:bg-emerald-500 hover:text-white'
                            : 'bg-secondary text-primary border-secondary/20 hover:bg-secondary/90'
                            }`}
                    >
                        {task.status === 'Completed' ? 'Update' : 'Submit'}
                    </button>
                </div>
            </div>

            {/* Submission Modal */}
            {showModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-primary/80 backdrop-blur-md animate-in fade-in duration-300">
                    <div className="bg-surface border border-white/10 w-full max-w-md rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
                        <div className="p-8 space-y-6">
                            <div className="flex justify-between items-center">
                                <div className="space-y-1">
                                    <h4 className="text-2xl font-black text-white uppercase tracking-tighter">Submit Work</h4>
                                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest italic">{task.title}</p>
                                </div>
                                <button onClick={() => setShowModal(false)} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                                    <X className="w-6 h-6 text-slate-400" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Vercel Deployment Link</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <ExternalLink className="w-4 h-4 text-secondary group-focus-within:animate-pulse" />
                                        </div>
                                        <input
                                            type="url"
                                            required
                                            placeholder="https://your-project.vercel.app"
                                            className="w-full bg-primary/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm text-white focus:border-secondary transition-all outline-none font-medium shadow-inner"
                                            value={vercelLink}
                                            onChange={(e) => setVercelLink(e.target.value)}
                                        />
                                    </div>
                                    <p className="text-[9px] text-slate-600 font-bold uppercase tracking-tight ml-1">* Ensure the project is publicly accessible for verification.</p>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-secondary text-primary font-black py-4 rounded-2xl hover:bg-secondary/90 transition-all flex items-center justify-center gap-3 shadow-xl active:scale-95 disabled:opacity-50"
                                >
                                    {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                                        <><Send className="w-4 h-4" /> Finalize Submission</>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default function StudentTasks() {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const fetchTasks = useCallback(async () => {
        const storedUser = sessionStorage.getItem('currentUser');
        if (!storedUser) { navigate('/studentloginks'); return; }
        const parsedUser = JSON.parse(storedUser);

        // ⚡ Show cached tasks from sessionStorage immediately
        const cached = sessionStorage.getItem(`tasks_${parsedUser.email}`);
        if (cached) {
            setTasks(JSON.parse(cached));
            setLoading(false);
        }

        // Silently fetch fresh
        try {
            const { data } = await api.get(`/admin/students?email=${parsedUser.email}`);
            if (data.length > 0) {
                const freshTasks = data[0].tasks || [];
                setTasks(freshTasks);
                sessionStorage.setItem(`tasks_${parsedUser.email}`, JSON.stringify(freshTasks));
            }
        } catch {
            if (!cached) toast.error('Failed to load tasks');
        } finally {
            setLoading(false);
        }
    }, [navigate]);

    useEffect(() => { fetchTasks(); }, [fetchTasks, refreshTrigger]);

    // Live update via WebSocket
    useSocket({
        'tasks:updated': (student) => {
            const tasks = student.tasks || [];
            setTasks(tasks);
            // Update cache too
            try {
                const raw = sessionStorage.getItem('currentUser');
                if (raw) {
                    const { email } = JSON.parse(raw);
                    sessionStorage.setItem(`tasks_${email}`, JSON.stringify(tasks));
                }
            } catch { /* ignore */ }
            toast.success('Tasks updated!', { icon: '📋' });
        },
    });

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-secondary animate-spin" />
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">
            {/* Header Banner */}
            <div className="bg-gradient-to-br from-secondary/5 via-surface/30 to-blue-500/5 backdrop-blur-xl border border-white/5 p-8 md:p-12 rounded-[40px] relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-110 transition-transform duration-1000">
                    <ClipboardList className="w-48 h-48" />
                </div>
                <div className="relative z-10 space-y-2">
                    <h1 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none mb-4">
                        Project <span className="text-secondary">Milestones</span>
                    </h1>
                    <p className="text-slate-500 text-xs md:text-sm font-medium max-w-xl uppercase tracking-widest leading-relaxed">
                        Track your industry tasks, deadlines, and project submissions in real-time.
                    </p>
                </div>
            </div>

            {tasks.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 pb-20 px-2 md:px-0">
                    {tasks.map((task, index) => (
                        <TaskCard
                            key={index}
                            task={task}
                            index={index}
                            onRefresh={() => setRefreshTrigger(prev => prev + 1)}
                        />
                    ))}
                </div>
            ) : (
                <div className="bg-surface/30 border border-white/5 p-20 rounded-[40px] text-center space-y-6">
                    <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto">
                        <ClipboardList className="w-10 h-10 text-slate-800" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-black text-white uppercase tracking-tighter">No tasks assigned yet</h3>
                        <p className="text-slate-600 text-[10px] font-bold uppercase tracking-[0.2em] max-w-sm mx-auto mt-2 italic">
                            Your administrator will post milestones here soon.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
