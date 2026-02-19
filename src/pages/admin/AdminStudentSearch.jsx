import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import { Search, Loader2, Mail, Phone, MapPin, Linkedin, Github, User, BookOpen, GraduationCap, Calendar, ClipboardList, IndianRupee } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminStudentSearch() {
    const navigate = useNavigate();
    const [emailQuery, setEmailQuery] = useState('');
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);

    // Suggestion State
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    // Debounce logic for suggestions
    useEffect(() => {
        const fetchSuggestions = async () => {
            if (emailQuery.length < 2) {
                setSuggestions([]);
                return;
            }

            try {
                const { data } = await api.get('/admin/students', {
                    params: { email: emailQuery }
                });
                // Filter to max 5 suggestions
                setSuggestions(data.slice(0, 5));
                setShowSuggestions(true);
            } catch (error) {
                console.error("Failed to fetch suggestions", error);
            }
        };

        const timeoutId = setTimeout(() => {
            if (!student) { // Only suggest if we haven't selected a student yet (or if user is typing new query)
                fetchSuggestions();
            }
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [emailQuery, student]);

    const handleSearch = async (e) => {
        e?.preventDefault();
        if (!emailQuery.trim()) return;

        setLoading(true);
        setSearched(true);
        setShowSuggestions(false); // Hide suggestions on explicit search
        setStudent(null);

        try {
            const { data } = await api.get('/admin/students', {
                params: { email: emailQuery }
            });

            // If explicit search, try to find exact match first, else take first result
            if (data && data.length > 0) {
                // strict match check if possible, otherwise first
                const exactMatch = data.find(s => s.email.toLowerCase() === emailQuery.toLowerCase());
                setStudent(exactMatch || data[0]);
            } else {
                toast.error("No student found with that email");
            }
        } catch (error) {
            console.error("Search failed", error);
            toast.error("Failed to search student");
        } finally {
            setLoading(false);
        }
    };

    const handleSelectSuggestion = (selectedStudent) => {
        setEmailQuery(selectedStudent.email);
        setStudent(selectedStudent);
        setSuggestions([]);
        setShowSuggestions(false);
        setSearched(true);
    };

    return (
        <div className="max-w-4xl mx-auto" onClick={() => setShowSuggestions(false)}>
            <header className="mb-8">
                <h2 className="text-3xl font-bold uppercase tracking-tight text-white mb-2">Student Search</h2>
                <p className="text-slate-400">Search for a student by email to view full profile details.</p>
            </header>

            {/* Search Input */}
            <div className="bg-surface border border-white/10 rounded-2xl p-6 mb-8 shadow-xl relative z-50">
                <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 relative">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                        <input
                            type="email"
                            placeholder="Enter student email address..."
                            className="w-full bg-primary border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white focus:border-secondary focus:outline-none placeholder:text-slate-600 transition-all font-medium"
                            value={emailQuery}
                            onChange={(e) => {
                                setEmailQuery(e.target.value);
                                setStudent(null); // Clear current view if typing
                                setShowSuggestions(true);
                            }}
                            onFocus={() => emailQuery.length >= 2 && setShowSuggestions(true)}
                            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking input
                            required
                            autoComplete="off"
                        />

                        {/* Suggestions Dropdown */}
                        {showSuggestions && suggestions.length > 0 && (
                            <div className="absolute top-full left-0 right-0 mt-2 bg-surface/95 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl animate-in fade-in slide-in-from-top-2">
                                {suggestions.map((s) => (
                                    <div
                                        key={s._id}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleSelectSuggestion(s);
                                        }}
                                        className="flex items-center gap-4 p-4 hover:bg-white/5 cursor-pointer transition-colors border-b border-white/5 last:border-0 group"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-slate-400 font-bold border border-white/5 group-hover:border-secondary/50 group-hover:text-secondary transition-colors">
                                            {s.profileImage ? (
                                                <img src={s.profileImage} alt="" className="w-full h-full rounded-full object-cover" />
                                            ) : (
                                                s.fullName.charAt(0)
                                            )}
                                        </div>
                                        <div>
                                            <div className="font-bold text-white group-hover:text-secondary transition-colors">{s.fullName}</div>
                                            <div className="text-xs text-slate-500">{s.email}</div>
                                        </div>
                                        <div className="ml-auto">
                                            <span className={`text-[10px] px-2 py-0.5 rounded border uppercase tracking-wider ${s.domain === 'IT' ? 'border-blue-500/20 text-blue-500' :
                                                s.domain === 'NON IT' ? 'border-purple-500/20 text-purple-500' :
                                                    'border-orange-500/20 text-orange-500'
                                                }`}>
                                                {s.domain}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </form>
            </div>

            {/* Result Display */}
            {student ? (
                <div className="bg-surface/50 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-500">

                    <div className="p-6 md:p-10 pb-8">
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10 mb-8">
                            {/* Profile Image */}
                            <div className="flex-shrink-0">
                                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-surface bg-primary shadow-2xl overflow-hidden flex items-center justify-center relative group">
                                    {student.profileImage ? (
                                        <img
                                            src={student.profileImage}
                                            alt={student.fullName}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="text-slate-600 bg-slate-900/50 w-full h-full flex items-center justify-center text-4xl md:text-5xl font-bold uppercase">
                                            {student.fullName.charAt(0)}
                                        </div>
                                    )}
                                    <div className={`absolute bottom-3 right-3 w-5 h-5 md:w-6 md:h-6 rounded-full border-4 border-surface ${student.status === 'Approved' ? 'bg-emerald-500' :
                                        student.status === 'Pending' ? 'bg-amber-500' : 'bg-blue-500'
                                        }`}></div>
                                </div>
                            </div>

                            {/* Main Info */}
                            <div className="flex-1 text-center md:text-left pt-2">
                                <div>
                                    <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">{student.fullName}</h3>
                                    <p className="text-slate-500 font-mono text-xs mt-1 uppercase tracking-widest">Student ID: {student.studentId || student._id}</p>
                                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-3">
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${student.domain === 'IT' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                                            student.domain === 'NON IT' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' :
                                                'bg-orange-500/10 text-orange-400 border border-orange-500/20'
                                            }`}>
                                            {student.domain} Domain
                                        </span>
                                        <span className="text-slate-400 text-sm flex items-center gap-1.5">
                                            <Calendar className="w-4 h-4" />
                                            Joined {new Date(student.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-4">
                                        <button
                                            onClick={() => navigate('/ks-admin/tasks', { state: { email: student.email } })}
                                            className="bg-secondary text-primary font-bold px-5 py-2 rounded-xl hover:bg-secondary/90 transition-all flex items-center gap-2 text-sm shadow-lg shadow-secondary/10"
                                        >
                                            <ClipboardList className="w-4 h-4" />
                                            ASSIGN TASK
                                        </button>
                                        <button
                                            onClick={() => navigate('/ks-admin/payments', { state: { email: student.email } })}
                                            className="bg-emerald-500 text-white font-bold px-5 py-2 rounded-xl hover:bg-emerald-600 transition-all flex items-center gap-2 text-sm shadow-lg shadow-emerald-500/10"
                                        >
                                            <IndianRupee className="w-4 h-4" />
                                            PAYMENT
                                        </button>
                                    </div>
                                </div>

                                {/* Bio */}
                                {student.bio && (
                                    <div className="mt-6 flex justify-center md:justify-start">
                                        <p className="text-slate-300 leading-relaxed max-w-2xl text-sm md:text-base border-l-2 border-primary/30 pl-4 py-1 text-left">
                                            {student.bio}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Details Grid - Cards Layout */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                            {/* Email */}
                            <div className="bg-white/5 p-4 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                                <div className="w-8 h-8 rounded-lg bg-surface flex items-center justify-center text-secondary mb-3">
                                    <Mail className="w-4 h-4" />
                                </div>
                                <div className="text-[10px] uppercase font-bold text-slate-500 mb-1">Email</div>
                                <div className="text-xs text-slate-200 font-medium break-all">{student.email}</div>
                            </div>

                            {/* Phone */}
                            <div className="bg-white/5 p-4 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                                <div className="w-8 h-8 rounded-lg bg-surface flex items-center justify-center text-secondary mb-3">
                                    <Phone className="w-4 h-4" />
                                </div>
                                <div className="text-[10px] uppercase font-bold text-slate-500 mb-1">Phone</div>
                                <div className="text-xs text-slate-200 font-medium">{student.phoneNumber}</div>
                            </div>

                            {/* Address */}
                            <div className="bg-white/5 p-4 rounded-xl border border-white/5 hover:border-white/10 transition-colors md:col-span-2">
                                <div className="w-8 h-8 rounded-lg bg-surface flex items-center justify-center text-secondary mb-3">
                                    <MapPin className="w-4 h-4" />
                                </div>
                                <div className="text-[10px] uppercase font-bold text-slate-500 mb-1">Address</div>
                                <div className="text-xs text-slate-200 font-medium truncate">{student.address || "Not Provided"}</div>
                            </div>

                            {/* College */}
                            <div className="bg-white/5 p-4 rounded-xl border border-white/5 hover:border-white/10 transition-colors md:col-span-2">
                                <div className="w-8 h-8 rounded-lg bg-surface flex items-center justify-center text-secondary mb-3">
                                    <GraduationCap className="w-4 h-4" />
                                </div>
                                <div className="text-[10px] uppercase font-bold text-slate-500 mb-1">College</div>
                                <div className="text-xs text-slate-200 font-medium truncate">{student.college || "Not Provided"}</div>
                            </div>

                            {/* Course */}
                            <div className="bg-white/5 p-4 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                                <div className="w-8 h-8 rounded-lg bg-surface flex items-center justify-center text-secondary mb-3">
                                    <BookOpen className="w-4 h-4" />
                                </div>
                                <div className="text-[10px] uppercase font-bold text-slate-500 mb-1">Course</div>
                                <div className="text-xs text-slate-200 font-medium">{student.course || "N/A"}</div>
                            </div>

                            {/* Socials */}
                            <div className="bg-white/5 p-4 rounded-xl border border-white/5 hover:border-white/10 transition-colors flex flex-col justify-between">
                                <div className="text-[10px] uppercase font-bold text-slate-500 mb-2">Social Profiles</div>
                                <div className="flex gap-2">
                                    {student.linkedIn ? (
                                        <a href={student.linkedIn} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded bg-[#0077b5]/20 text-[#0077b5] flex items-center justify-center hover:bg-[#0077b5] hover:text-white transition-colors">
                                            <Linkedin className="w-4 h-4" />
                                        </a>
                                    ) : (
                                        <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center opacity-30 cursor-not-allowed">
                                            <Linkedin className="w-4 h-4" />
                                        </div>
                                    )}
                                    {student.github ? (
                                        <a href={student.github} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors">
                                            <Github className="w-4 h-4" />
                                        </a>
                                    ) : (
                                        <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center opacity-30 cursor-not-allowed">
                                            <Github className="w-4 h-4" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : searched && !loading && (
                <div className="text-center py-20 bg-surface/30 border border-white/5 rounded-2xl">
                    <div className="w-16 h-16 rounded-full bg-slate-800 mx-auto mb-4 flex items-center justify-center text-slate-600">
                        <User className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">No Student Found</h3>
                    <p className="text-slate-400">Try searching with a different email address.</p>
                </div>
            )
            }
        </div >
    );
}
