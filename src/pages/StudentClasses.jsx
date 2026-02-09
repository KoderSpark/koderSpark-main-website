import React from 'react';
import { BookOpen, Calendar, Clock } from 'lucide-react';

export default function StudentClasses() {
    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div className="bg-surface/30 backdrop-blur-xl border border-white/5 p-10 rounded-[40px] relative overflow-hidden">
                <div className="absolute top-0 right-0 p-10 opacity-5">
                    <BookOpen className="w-40 h-40" />
                </div>
                <div className="relative z-10">
                    <h1 className="text-4xl font-black text-white uppercase tracking-tighter mb-4">My Classes</h1>
                    <p className="text-slate-400 max-w-xl">View your upcoming live sessions, recordings, and course schedules here.</p>
                </div>
            </div>

            <div className="bg-surface/30 border border-white/5 p-20 rounded-[40px] text-center space-y-6">
                <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto text-slate-700">
                    <BookOpen className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-white uppercase tracking-widest">Class Access</h3>
                <p className="text-slate-500 text-sm max-w-sm mx-auto uppercase font-bold tracking-tight italic">Live session links and recordings will be provided here as they become available.</p>
            </div>
        </div>
    );
}
