import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 relative overflow-hidden font-inter">
            {/* Ambient Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] rounded-full bg-secondary/5 blur-[120px] animate-pulse" />
                <div className="absolute bottom-[20%] left-[5%] w-[400px] h-[400px] rounded-full bg-blue-500/5 blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />

                {/* Floating Particles */}
                <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white/20 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
                <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-secondary/20 rounded-full animate-ping" style={{ animationDuration: '4s' }} />
                <div className="absolute middle right-10 w-1.5 h-1.5 bg-blue-500/20 rounded-full animate-ping" style={{ animationDuration: '5s' }} />
            </div>

            <div className="max-w-xl w-full text-center relative z-10 space-y-12">
                {/* Visual Section */}
                <div className="relative group">
                    <div className="absolute inset-0 bg-secondary/20 blur-[100px] rounded-full scale-150 opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />
                    <h1 className="text-[180px] md:text-[240px] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white/40 to-transparent relative z-10 animate-in zoom-in duration-1000">
                        404
                    </h1>

                </div>

                {/* Content Section */}
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
                    <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">
                        Lost in <span className="text-secondary">Cyberspace</span>
                    </h2>
                    <p className="text-slate-400 text-sm md:text-base font-medium max-w-sm mx-auto leading-relaxed border-l-2 border-secondary/30 pl-6 italic">
                        The page you're looking for has drifted into the dark void of the internet. Even our best algorithms can't find it.
                    </p>
                </div>

                {/* Action Section */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500">
                    <button
                        onClick={() => navigate(-1)}
                        className="group flex items-center gap-3 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-all active:scale-95"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Go Back
                    </button>

                    <button
                        onClick={() => navigate('/')}
                        className="group flex items-center gap-3 px-8 py-4 rounded-2xl bg-secondary text-primary font-black uppercase tracking-widest text-xs hover:bg-secondary/90 transition-all shadow-xl shadow-secondary/10 active:scale-95"
                    >
                        <Home className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        Return Home
                    </button>
                </div>

                {/* Coordination Info */}
                <div className="pt-12 text-[10px] text-slate-700 font-bold uppercase tracking-[0.4em] animate-pulse">
                    Error Code: 0xKODERSPARK_LOST
                </div>
            </div>
        </div>
    );
}
