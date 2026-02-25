import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import { Loader2, ArrowRight, Lock, User, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminLogin() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await api.post('/admin/login', { username, password });

            toast.success("Welcome, Master Admin!");
            sessionStorage.setItem('adminToken', 'true'); // Simple session marker
            sessionStorage.setItem('adminUser', JSON.stringify(data.admin));

            navigate('/ks-admin/students');
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Authentication failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 relative overflow-hidden font-inter">
            {/* Ambient Background */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-secondary/10 blur-[120px]" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-blue-500/5 blur-[120px]" />
            </div>

            <div className="w-full max-w-md relative z-10 animate-in fade-in zoom-in-95 duration-700">
                {/* Brand / Logo Area */}
                <div className="text-center mb-6 md:mb-8">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-secondary/10 border border-secondary/20 rounded-3xl flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-2xl shadow-secondary/20">
                        <ShieldCheck className="w-8 h-8 md:w-10 md:h-10 text-secondary" />
                    </div>
                    <h1 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tighter mb-2">
                        Admin <span className="text-secondary">Vault</span>
                    </h1>
                    <p className="text-slate-500 text-[10px] md:text-xs font-bold uppercase tracking-[0.3em]">
                        Koder Spark Control Center
                    </p>
                </div>

                {/* Login Card */}
                <div className="bg-surface/40 backdrop-blur-2xl border border-white/5 rounded-[32px] md:rounded-[40px] p-6 md:p-10 shadow-3xl">
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-4">
                            {/* Username */}
                            <div className="space-y-2">
                                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">
                                    Admin Identifier
                                </label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 w-4 h-4 group-focus-within:text-secondary transition-colors" />
                                    <input
                                        type="text"
                                        required
                                        className="w-full bg-black/40 border border-white/5 rounded-2xl pl-12 pr-4 py-3 md:py-4 text-sm md:text-base text-white placeholder:text-slate-700 focus:border-secondary focus:bg-black/60 outline-none transition-all"
                                        placeholder="admin@koderspark"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="space-y-2">
                                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">
                                    Access Key
                                </label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 w-4 h-4 group-focus-within:text-secondary transition-colors" />
                                    <input
                                        type={isPasswordVisible ? "text" : "password"}
                                        required
                                        className="w-full bg-black/40 border border-white/5 rounded-2xl pl-12 pr-12 py-3 md:py-4 text-sm md:text-base text-white placeholder:text-slate-700 focus:border-secondary focus:bg-black/60 outline-none transition-all"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 hover:text-white transition-colors"
                                    >
                                        {isPasswordVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-secondary text-primary font-black uppercase tracking-widest py-3 md:py-5 rounded-2xl hover:bg-secondary/90 transition-all flex items-center justify-center gap-3 shadow-xl shadow-secondary/10 active:scale-[0.98] disabled:opacity-50 text-sm md:text-base"
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    Authorize Access
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Footer Info */}
                    <div className="mt-10 text-center">
                        <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">
                            Secure Encrypted Environment
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
