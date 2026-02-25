import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useSocket } from '../hooks/useSocket';
import { Loader2, User, Mail, GraduationCap, MapPin, Camera, CheckCircle2, ShieldCheck, Phone, Globe, Calendar, Info, BookOpen, LogOut } from 'lucide-react';
import toast from 'react-hot-toast';

export default function StudentProfile() {
    const navigate = useNavigate();
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStudentData = async () => {
            const storedUser = sessionStorage.getItem('currentUser');
            if (!storedUser) { navigate('/studentloginks'); return; }
            const parsedUser = JSON.parse(storedUser);

            // ⚡ Show cached data instantly
            setStudent(parsedUser);
            setLoading(false);

            // Refresh in background
            try {
                const { data } = await api.get(`/admin/students?email=${parsedUser.email}`);
                if (data.length > 0) setStudent(data[0]);
            } catch { /* keep showing cached */ }
        };
        fetchStudentData();
    }, [navigate]);

    useSocket({
        'student:updated': (updated) => setStudent(updated),
    });

    const handleLogout = () => {
        sessionStorage.removeItem('currentUser');
        sessionStorage.removeItem('studentAuthData');
        toast.success("Logged out successfully");
        navigate('/studentloginks');
    };

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-secondary animate-spin" />
            </div>
        );
    }

    if (!student) return null;

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700">
            {/* Header / Banner area */}
            <div className="relative group">
                <div className="h-32 md:h-40 rounded-[32px] bg-gradient-to-r from-secondary/20 via-blue-500/10 to-purple-500/20 border border-white/5 overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
                </div>
                <div className="absolute -bottom-12 left-6 md:left-10 flex items-end gap-5 md:gap-6 w-full px-4 md:px-0">
                    <div className="relative group/photo">
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-[24px] border-4 border-primary bg-surface overflow-hidden shadow-2xl transition-transform group-hover/photo:scale-105 duration-500">
                            {student.profileImage ? (
                                <img src={student.profileImage} alt="" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-3xl font-black text-slate-700 bg-slate-900/50">
                                    {student.fullName?.charAt(0)}
                                </div>
                            )}
                        </div>
                        <button className="absolute bottom-1 right-1 p-2 bg-secondary text-primary rounded-xl shadow-xl hover:scale-110 transition-all">
                            <Camera className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="pb-3 flex-1">
                        <h1 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter leading-none mb-2">
                            {student.fullName}
                        </h1>
                        <div className="flex flex-wrap items-center gap-2 md:gap-3">
                            <span className={`flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border ${student.status === 'Approved' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' :
                                student.status === 'Verifying' ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' :
                                    'bg-amber-500/10 border-amber-500/20 text-amber-400'
                                }`}>
                                <ShieldCheck className={`w-3 h-3 ${student.status === 'Approved' ? 'text-emerald-500' : student.status === 'Verifying' ? 'text-blue-500' : 'text-amber-500'}`} />
                                {student.status || 'Pending'} Student
                            </span>
                            <span className="text-slate-500 text-[9px] font-bold uppercase tracking-widest font-mono">
                                ID: {student.studentId || 'NOT ASSIGNED'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="pt-14 grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left side: Main Stats & Bio */}
                <div className="lg:col-span-1 space-y-6">


                    {/* Bio Section (Compacted) */}
                    <div className="bg-surface/30 backdrop-blur-xl border border-white/5 p-6 rounded-[32px] shadow-xl">
                        <h3 className="text-[9px] font-black text-slate-500 uppercase tracking-[0.1em] mb-3 flex items-center gap-2">
                            <Info className="w-3 h-3 text-secondary" /> About Me
                        </h3>
                        <p className="text-slate-400 text-xs leading-relaxed italic line-clamp-4">
                            {student.bio || "No professional bio added yet. Tell us more about your coding journey."}
                        </p>
                    </div>

                    {/* Logout Button (Compacted) */}
                    <button
                        onClick={handleLogout}
                        className="w-full py-3.5 rounded-2xl bg-red-500/5 hover:bg-red-500/10 border border-red-500/10 text-red-500/70 hover:text-red-400 font-bold uppercase tracking-widest text-[9px] transition-all shadow-xl flex items-center justify-center gap-2"
                    >
                        <LogOut className="w-3 h-3" />
                        Logout Profile
                    </button>
                </div>

                {/* Right side: Detailed Info */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Information Grid (Compacted Padding) */}
                    <div className="bg-surface/30 backdrop-blur-xl border border-white/5 p-6 md:p-8 rounded-[32px] shadow-xl">
                        <h3 className="text-[9px] font-black text-slate-500 uppercase tracking-[0.1em] mb-6 border-b border-white/5 pb-3">Personal & Academic Records</h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-x-8 md:gap-y-6">
                            <div className="space-y-1">
                                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                                    <Mail className="w-3 h-3" /> Email
                                </p>
                                <p className="text-xs font-bold text-white break-all">{student.email}</p>
                            </div>

                            <div className="space-y-1">
                                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                                    <Phone className="w-3 h-3" /> Phone
                                </p>
                                <p className="text-xs font-bold text-white tracking-wider">{student.phoneNumber || 'Not Provided'}</p>
                            </div>

                            <div className="space-y-1">
                                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                                    <GraduationCap className="w-3 h-3" /> College
                                </p>
                                <p className="text-xs font-bold text-white uppercase tracking-tight line-clamp-1">{student.college || 'Not Mentioned'}</p>
                            </div>

                            <div className="space-y-1">
                                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                                    <BookOpen className="w-3 h-3" /> Course
                                </p>
                                <p className="text-xs font-bold text-white uppercase tracking-tight">{student.course || 'Independent'}</p>
                            </div>

                            <div className="space-y-1">
                                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                                    <Globe className="w-3 h-3" /> Domain
                                </p>
                                <p className="text-xs font-bold text-white uppercase tracking-tight">{student.domain || 'General'}</p>
                            </div>

                            <div className="space-y-1">
                                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                                    <Calendar className="w-3 h-3" /> Joined
                                </p>
                                <p className="text-xs font-bold text-white uppercase tracking-tight">
                                    {student.createdAt ? new Date(student.createdAt).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) : 'Unknown'}
                                </p>
                            </div>

                            <div className="sm:col-span-2 space-y-1 pt-4 border-t border-white/5">
                                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                                    <MapPin className="w-3 h-3" /> Physical Address
                                </p>
                                <p className="text-[11px] font-medium text-slate-500 leading-relaxed italic">{student.address || 'Address not updated in records.'}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/10 p-6 md:p-8 rounded-[32px] flex items-center justify-between group">
                        <div className="space-y-1">
                            <h4 className="text-lg font-black text-white uppercase tracking-tighter">Verified Profile</h4>
                            <p className="text-slate-500 text-xs max-w-sm">Confirmed by Koderspark administration.</p>
                        </div>
                        <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-500 shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">
                            <CheckCircle2 className="w-7 h-7" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
