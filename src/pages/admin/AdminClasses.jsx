import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import { Search, Loader2, BookOpen, Plus, Calendar, Trash2, Clock, ExternalLink, Video } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminClasses() {
    const location = useLocation();
    const navigate = useNavigate();
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(false);
    const [mode, setMode] = useState('Individual'); // 'Individual' or 'Bulk'

    // Bulk Filters
    const [bulkDomain, setBulkDomain] = useState('All');
    const [bulkStatus, setBulkStatus] = useState('Approved');

    // New Class Form
    const [classTitle, setClassTitle] = useState('');
    const [classDate, setClassDate] = useState('');
    const [classTime, setClassTime] = useState('');
    const [classLink, setClassLink] = useState('');
    const [classStatus, setClassStatus] = useState('Upcoming');

    // Editing State (Individual only)
    const [isEditing, setIsEditing] = useState(false);
    const [editIndex, setEditIndex] = useState(null);

    // Delete Confirmation State
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [classToDelete, setClassToDelete] = useState(null);

    // Bulk Confirmation State
    const [showBulkConfirm, setShowBulkConfirm] = useState(false);

    // Initial load if email passed from search
    useEffect(() => {
        const fetchStudent = async () => {
            const email = location.state?.email;
            if (!email) return;

            setLoading(true);
            try {
                const { data } = await api.get(`/admin/students?email=${email}`);
                if (data.length > 0) {
                    setStudent(data[0]);
                    setMode('Individual');
                } else {
                    toast.error("Student not found");
                }
            } catch (error) {
                console.error(error);
                toast.error("Failed to load student data");
            } finally {
                setLoading(false);
            }
        };

        fetchStudent();
    }, [location.state?.email]);

    const handleAddClass = async () => {
        if (mode === 'Individual') {
            await handleIndividualAdd();
        } else {
            setShowBulkConfirm(true);
        }
    };

    const handleIndividualAdd = async () => {
        if (!student || !classTitle) return;
        setLoading(true);
        try {
            let updatedClasses;

            const classData = {
                title: classTitle,
                date: classDate,
                time: classTime,
                link: classLink,
                status: classStatus,
            };

            if (isEditing) {
                // Update existing class
                updatedClasses = [...(student.classes || [])];
                updatedClasses[editIndex] = {
                    ...updatedClasses[editIndex],
                    ...classData
                };
            } else {
                // Add new class
                const newClass = {
                    ...classData,
                    createdAt: new Date()
                };
                updatedClasses = [...(student.classes || []), newClass];
            }

            await api.put(`/admin/students/${student._id}/classes`, {
                classes: updatedClasses
            });

            toast.success(isEditing ? "Class updated successfully!" : "Class assigned successfully!");
            setStudent(prev => ({ ...prev, classes: updatedClasses }));

            // Clear form & Reset editing
            resetForm();
        } catch (error) {
            console.error(error);
            toast.error(isEditing ? "Failed to update class" : "Failed to assign class");
        } finally {
            setLoading(false);
        }
    };

    const handleBulkAdd = async () => {
        if (!classTitle) return;
        setLoading(true);
        try {
            const classData = {
                title: classTitle,
                date: classDate,
                time: classTime,
                link: classLink,
                status: classStatus,
            };

            const { data } = await api.post('/admin/students/bulk-classes', {
                domain: bulkDomain,
                status: bulkStatus,
                classData
            });

            toast.success(data.message);
            setShowBulkConfirm(false);
            resetForm();
        } catch (error) {
            console.error(error);
            toast.error("Bulk assignment failed");
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setClassTitle('');
        setClassDate('');
        setClassTime('');
        setClassLink('');
        setClassStatus('Upcoming');
        setIsEditing(false);
        setEditIndex(null);
    };

    const handleEditClass = (index) => {
        const c = student.classes[index];
        setClassTitle(c.title);
        setClassDate(c.date || '');
        setClassTime(c.time || '');
        setClassLink(c.link || '');
        setClassStatus(c.status || 'Upcoming');
        setIsEditing(true);
        setEditIndex(index);

        // Scroll to top of form
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const initiateDeleteClass = (index) => {
        setClassToDelete(index);
        setShowDeleteModal(true);
    };

    const confirmDeleteClass = async () => {
        if (classToDelete === null) return;

        setLoading(true);
        try {
            const updatedClasses = student.classes.filter((_, i) => i !== classToDelete);
            await api.put(`/admin/students/${student._id}/classes`, {
                classes: updatedClasses
            });
            toast.success("Class deleted");
            setStudent(prev => ({ ...prev, classes: updatedClasses }));

            if (isEditing && editIndex === classToDelete) {
                resetForm();
            }
        } catch (error) {
            console.error(error);
            toast.error("Delete failed");
        } finally {
            setLoading(false);
            setShowDeleteModal(false);
            setClassToDelete(null);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Student Classes</h2>
                    <p className="text-slate-400 mt-2">Manage live sessions and recordings for students.</p>
                </div>

                {/* Mode Toggle */}
                <div className="flex bg-surface/50 p-1 rounded-xl border border-white/5 self-start md:self-center">
                    <button
                        onClick={() => { setMode('Individual'); resetForm(); }}
                        className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${mode === 'Individual' ? 'bg-secondary text-primary' : 'text-slate-400 hover:text-white'}`}
                    >
                        Individual
                    </button>
                    <button
                        onClick={() => { setMode('Bulk'); setStudent(null); resetForm(); }}
                        className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${mode === 'Bulk' ? 'bg-secondary text-primary' : 'text-slate-400 hover:text-white'}`}
                    >
                        Bulk Assignment
                    </button>
                </div>
            </header>

            {mode === 'Individual' && !student && !loading && (
                <div className="text-center py-20 bg-surface/30 border border-white/5 rounded-2xl border-dashed">
                    <Search className="w-12 h-12 text-slate-700 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">No Student Selected</h3>
                    <p className="text-slate-400">Search for a student to manage their specific classes.</p>
                    <button
                        onClick={() => navigate('/ks-admin/search')}
                        className="mt-6 px-6 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all"
                    >
                        Go to Search
                    </button>
                </div>
            )}

            {(mode === 'Bulk' || student) && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Sidebar: Filters/Info & Form */}
                    <div className="md:col-span-1 space-y-6">
                        {mode === 'Individual' ? (
                            <div className="bg-surface/50 border border-white/5 p-6 rounded-2xl text-center">
                                <div className="w-20 h-20 mx-auto rounded-full bg-secondary text-primary flex items-center justify-center text-3xl font-bold border-4 border-white/5 shadow-xl overflow-hidden mb-4">
                                    {student.profileImage ? <img src={student.profileImage} alt="" className="w-full h-full object-cover" /> : student.fullName[0]}
                                </div>
                                <h3 className="text-xl font-bold text-white">{student.fullName}</h3>
                                <p className="text-slate-400 text-xs break-all mt-1">{student.email}</p>
                            </div>
                        ) : (
                            <div className="bg-surface/50 border border-white/5 p-6 rounded-2xl space-y-4">
                                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Target Filter</h4>
                                <div className="space-y-3">
                                    <div>
                                        <label className="text-[9px] font-bold text-slate-600 uppercase ml-1">Domain</label>
                                        <select
                                            className="w-full bg-primary/50 border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                                            value={bulkDomain}
                                            onChange={(e) => setBulkDomain(e.target.value)}
                                        >
                                            <option value="All">All Domains</option>
                                            <option value="IT">IT Only</option>
                                            <option value="NON IT">NON IT Only</option>
                                            <option value="Both">Both Domains</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-[9px] font-bold text-slate-600 uppercase ml-1">Status</label>
                                        <select
                                            className="w-full bg-primary/50 border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                                            value={bulkStatus}
                                            onChange={(e) => setBulkStatus(e.target.value)}
                                        >
                                            <option value="All">All Statuses</option>
                                            <option value="Approved">Approved Only</option>
                                            <option value="Pending">Pending Only</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="bg-primary/50 p-6 rounded-2xl border border-white/5">
                            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">
                                {mode === 'Bulk' ? 'Bulk Class Details' : isEditing ? 'Edit Class Details' : 'Add New Class'}
                            </h4>
                            <div className="space-y-4">
                                <input
                                    type="text"
                                    placeholder="Class title..."
                                    className="w-full bg-surface/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-secondary focus:outline-none"
                                    value={classTitle}
                                    onChange={(e) => setClassTitle(e.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder="Date (e.g. Every Monday)..."
                                    className="w-full bg-surface/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-secondary focus:outline-none"
                                    value={classDate}
                                    onChange={(e) => setClassDate(e.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder="Time (e.g. 06:00 PM)..."
                                    className="w-full bg-surface/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-secondary focus:outline-none"
                                    value={classTime}
                                    onChange={(e) => setClassTime(e.target.value)}
                                />
                                <input
                                    type="url"
                                    placeholder="Live Link / Recording Link..."
                                    className="w-full bg-surface/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-secondary focus:outline-none"
                                    value={classLink}
                                    onChange={(e) => setClassLink(e.target.value)}
                                />
                                <select
                                    className="w-full bg-surface/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-secondary focus:outline-none"
                                    value={classStatus}
                                    onChange={(e) => setClassStatus(e.target.value)}
                                >
                                    <option value="Upcoming">Upcoming</option>
                                    <option value="Live">Live Now</option>
                                    <option value="Recording">Recording Available</option>
                                </select>

                                <div className="flex gap-2 pt-2">
                                    {isEditing && (
                                        <button onClick={resetForm} className="flex-1 bg-white/5 text-white font-bold py-3 rounded-xl hover:bg-white/10 transition-all">
                                            Cancel
                                        </button>
                                    )}
                                    <button
                                        onClick={handleAddClass}
                                        disabled={loading || !classTitle}
                                        className={`${isEditing ? 'flex-[2]' : 'w-full'} bg-secondary text-primary font-bold py-3 rounded-xl hover:bg-secondary/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50`}
                                    >
                                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Plus className="w-4 h-4" /> {mode === 'Bulk' ? 'Run Bulk assignment' : isEditing ? 'Update Class' : 'Add Class'}</>}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content: Individual Class List or Bulk Guidelines */}
                    <div className="md:col-span-2 space-y-6">
                        {mode === 'Individual' ? (
                            <>
                                <div className="flex items-center justify-between">
                                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Classes for {student.fullName.split(' ')[0]}</h4>
                                    <span className="text-[10px] bg-white/5 px-2 py-1 rounded text-slate-400">{(student.classes || []).length} Total</span>
                                </div>

                                <div className="space-y-4">
                                    {student.classes && student.classes.length > 0 ? (
                                        [...student.classes].reverse().map((c, idx) => {
                                            const originalIdx = student.classes.length - 1 - idx;
                                            const isBeingEdited = isEditing && editIndex === originalIdx;

                                            return (
                                                <div key={idx} className={`bg-surface/30 border ${isBeingEdited ? 'border-secondary/50 ring-1 ring-secondary/20' : 'border-white/5'} p-5 rounded-2xl hover:border-white/10 transition-all group relative`}>
                                                    <div className="flex justify-between items-start gap-4">
                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-3 mb-2">
                                                                <h5 className="font-bold text-white text-lg">{c.title}</h5>
                                                                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider 
                                                                    ${c.status === 'Live' ? 'bg-red-500/10 text-red-500 animate-pulse' :
                                                                        c.status === 'Recording' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-blue-500/10 text-blue-500'}`}>
                                                                    {c.status}
                                                                </span>
                                                            </div>
                                                            <div className="grid grid-cols-2 gap-4 mb-4">
                                                                <div className="flex items-center gap-2 text-xs text-slate-400"><Calendar className="w-3.5 h-3.5 text-secondary" /> {c.date || 'Scheduled'}</div>
                                                                <div className="flex items-center gap-2 text-xs text-slate-400"><Clock className="w-3.5 h-3.5 text-secondary" /> {c.time || 'TBA'}</div>
                                                            </div>
                                                            {c.link && (
                                                                <a href={c.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[10px] font-black text-secondary uppercase tracking-widest bg-secondary/10 px-3 py-1.5 rounded-lg border border-secondary/20 hover:bg-secondary hover:text-primary transition-all">
                                                                    {c.status === 'Recording' ? <Video className="w-3 h-3" /> : <ExternalLink className="w-3 h-3" />}
                                                                    {c.status === 'Recording' ? 'View Recording' : 'Join Session'}
                                                                </a>
                                                            )}
                                                        </div>
                                                        <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <button onClick={() => handleEditClass(originalIdx)} className="p-2 bg-blue-500/10 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition-all"><Plus className="w-4 h-4 rotate-45" /></button>
                                                            <button onClick={() => initiateDeleteClass(originalIdx)} className="p-2 bg-rose-500/10 text-rose-500 rounded-lg hover:bg-rose-500 hover:text-white transition-all"><Trash2 className="w-4 h-4" /></button>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <div className="text-center py-12 bg-white/5 rounded-2xl border border-dashed border-white/10">
                                            <BookOpen className="w-12 h-12 text-slate-700 mx-auto mb-4" />
                                            <p className="text-slate-500 italic">No classes scheduled for this student.</p>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <div className="bg-surface/30 border border-white/5 p-10 rounded-[32px] space-y-8 h-full flex flex-col justify-center text-center">
                                <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mx-auto text-secondary">
                                    <Video className="w-10 h-10" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-4">Bulk Session Assignment</h3>
                                    <p className="text-slate-400 text-sm max-w-sm mx-auto leading-relaxed">
                                        Use this mode to schedule a session for all students or a specific group based on their domain.
                                        This is perfect for common orientation sessions or domain-specific live workshops.
                                    </p>
                                </div>
                                <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto w-full pt-4">
                                    <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                                        <div className="text-secondary font-black text-lg">{bulkDomain}</div>
                                        <div className="text-[10px] text-slate-500 uppercase tracking-wider">Target Domain</div>
                                    </div>
                                    <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                                        <div className="text-secondary font-black text-lg">{bulkStatus}</div>
                                        <div className="text-[10px] text-slate-500 uppercase tracking-wider">Target Status</div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="bg-surface border border-white/10 rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
                        <div className="p-6 text-center">
                            <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4 text-red-400"><Trash2 className="w-6 h-6" /></div>
                            <h3 className="text-xl font-bold text-white mb-2">Delete Class?</h3>
                            <p className="text-slate-400 text-sm mb-6">Are you sure you want to remove this class?</p>
                            <div className="flex gap-3">
                                <button onClick={() => setShowDeleteModal(false)} className="flex-1 py-2.5 rounded-lg border border-white/10 text-slate-300 hover:bg-white/5 font-semibold transition-colors">Cancel</button>
                                <button onClick={confirmDeleteClass} className="flex-1 py-2.5 rounded-lg bg-red-500 text-white hover:bg-red-600 font-bold transition-colors shadow-lg shadow-red-500/20">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Bulk Confirmation Modal */}
            {showBulkConfirm && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
                    <div className="bg-surface border border-white/10 rounded-[32px] w-full max-w-md overflow-hidden shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
                        <div className="p-8 text-center">
                            <div className="w-16 h-16 rounded-3xl bg-secondary/10 flex items-center justify-center mx-auto mb-6 text-secondary"><Video className="w-8 h-8" /></div>
                            <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tighter">Confirm Bulk Assignment</h3>
                            <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                                You are about to assign "<span className="text-white font-bold">{classTitle}</span>" to all students matching the following filters:
                                <br />
                                <span className="inline-block mt-4 px-3 py-1 rounded bg-white/5 text-xs text-secondary border border-white/5">
                                    Domain: {bulkDomain === 'All' ? 'All Students' : bulkDomain} • Status: {bulkStatus}
                                </span>
                            </p>
                            <div className="flex gap-4">
                                <button onClick={() => setShowBulkConfirm(false)} className="flex-1 py-4 rounded-2xl border border-white/10 text-slate-300 hover:bg-white/5 font-bold uppercase tracking-widest text-[11px] transition-all">Cancel</button>
                                <button
                                    onClick={handleBulkAdd}
                                    disabled={loading}
                                    className="flex-1 py-4 rounded-2xl bg-secondary text-primary font-black uppercase tracking-widest text-[11px] hover:bg-secondary/90 transition-all shadow-lg shadow-secondary/20 flex items-center justify-center gap-2"
                                >
                                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Confirm & Run'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
