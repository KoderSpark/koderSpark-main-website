import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import { Search, Loader2, ClipboardList, Plus, Calendar, Trash2, CheckCircle2, Clock, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminTasks() {
    const location = useLocation();
    const navigate = useNavigate();
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(false);

    // New Task Form
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDesc, setTaskDesc] = useState('');
    const [taskDeadline, setTaskDeadline] = useState('');
    const [taskDocUrl, setTaskDocUrl] = useState('');

    // Editing State
    const [isEditing, setIsEditing] = useState(false);
    const [editIndex, setEditIndex] = useState(null);

    // Delete Confirmation State
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);

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

    const handleAddTask = async () => {
        if (!student || !taskTitle) return;
        setLoading(true);
        try {
            let updatedTasks;

            if (isEditing) {
                // Update existing task
                updatedTasks = [...student.tasks];
                updatedTasks[editIndex] = {
                    ...updatedTasks[editIndex],
                    title: taskTitle,
                    description: taskDesc,
                    deadline: taskDeadline,
                    documentUrl: taskDocUrl
                };
            } else {
                // Add new task
                const newTask = {
                    title: taskTitle,
                    description: taskDesc,
                    deadline: taskDeadline,
                    documentUrl: taskDocUrl,
                    status: 'Pending',
                    createdAt: new Date()
                };
                updatedTasks = [...(student.tasks || []), newTask];
            }

            await api.put(`/admin/students/${student._id}/tasks`, {
                tasks: updatedTasks
            });

            toast.success(isEditing ? "Task updated successfully!" : "Task assigned successfully!");
            setStudent(prev => ({ ...prev, tasks: updatedTasks }));

            // Clear form & Reset editing
            setTaskTitle('');
            setTaskDesc('');
            setTaskDeadline('');
            setTaskDocUrl('');
            setIsEditing(false);
            setEditIndex(null);
        } catch (error) {
            console.error(error);
            toast.error(isEditing ? "Failed to update task" : "Failed to assign task");
        } finally {
            setLoading(false);
        }
    };

    const handleEditTask = (index) => {
        const task = student.tasks[index];
        setTaskTitle(task.title);
        setTaskDesc(task.description || '');
        setTaskDeadline(task.deadline ? new Date(task.deadline).toISOString().split('T')[0] : '');
        setTaskDocUrl(task.documentUrl || '');
        setIsEditing(true);
        setEditIndex(index);

        // Scroll to top of form
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const initiateDeleteTask = (taskIndex) => {
        setTaskToDelete(taskIndex);
        setShowDeleteModal(true);
    };

    const confirmDeleteTask = async () => {
        if (taskToDelete === null) return;

        setLoading(true);
        try {
            const updatedTasks = student.tasks.filter((_, i) => i !== taskToDelete);
            await api.put(`/admin/students/${student._id}/tasks`, {
                tasks: updatedTasks
            });
            toast.success("Task deleted");
            setStudent(prev => ({ ...prev, tasks: updatedTasks }));

            // Re-sync editing state if deleting the one being edited
            if (isEditing && editIndex === taskToDelete) {
                setIsEditing(false);
                setEditIndex(null);
                setTaskTitle('');
                setTaskDesc('');
                setTaskDeadline('');
                setTaskDocUrl('');
            }
        } catch (error) {
            console.error(error);
            toast.error("Delete failed");
        } finally {
            setLoading(false);
            setShowDeleteModal(false);
            setTaskToDelete(null);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
            <header>
                <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Student Tasks</h2>
                <p className="text-slate-400 mt-2">Assign and manage tasks for students.</p>
            </header>

            {!student && !loading && (
                <div className="text-center py-20 bg-surface/30 border border-white/5 rounded-2xl border-dashed">
                    <Search className="w-12 h-12 text-slate-700 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">No Student Selected</h3>
                    <p className="text-slate-400">Please search for a student in the <span className="text-secondary cursor-pointer hover:underline" onClick={() => navigate('/ks-admin/search')}>Search Page</span> to assign tasks.</p>
                </div>
            )}

            {student && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Sidebar: Student Info & Add Task */}
                    <div className="md:col-span-1 space-y-6">
                        <div className="bg-surface/50 border border-white/5 p-6 rounded-2xl text-center">
                            <div className="w-20 h-20 mx-auto rounded-full bg-secondary text-primary flex items-center justify-center text-3xl font-bold border-4 border-white/5 shadow-xl overflow-hidden mb-4">
                                {student.profileImage ? (
                                    <img src={student.profileImage} alt="" className="w-full h-full object-cover" />
                                ) : (
                                    student.fullName[0]
                                )}
                            </div>
                            <h3 className="text-xl font-bold text-white">{student.fullName}</h3>
                            <p className="text-slate-400 text-xs break-all mt-1">{student.email}</p>
                        </div>

                        <div className="bg-primary/50 p-6 rounded-2xl border border-white/5">
                            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">
                                {isEditing ? 'Edit Task Details' : 'Assign New Task'}
                            </h4>
                            <div className="space-y-4">
                                <input
                                    type="text"
                                    placeholder="Task title..."
                                    className="w-full bg-surface/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-secondary focus:outline-none"
                                    value={taskTitle}
                                    onChange={(e) => setTaskTitle(e.target.value)}
                                />
                                <textarea
                                    placeholder="Description (optional)..."
                                    rows="3"
                                    className="w-full bg-surface/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-secondary focus:outline-none resize-none"
                                    value={taskDesc}
                                    onChange={(e) => setTaskDesc(e.target.value)}
                                />
                                <input
                                    type="url"
                                    placeholder="Document Link (Google Drive)..."
                                    className="w-full bg-surface/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-secondary focus:outline-none"
                                    value={taskDocUrl}
                                    onChange={(e) => setTaskDocUrl(e.target.value)}
                                />
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-slate-500 ml-1 uppercase">Deadline</label>
                                    <input
                                        type="date"
                                        className="w-full bg-surface/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-secondary focus:outline-none [color-scheme:dark]"
                                        value={taskDeadline}
                                        onChange={(e) => setTaskDeadline(e.target.value)}
                                    />
                                </div>
                                <div className="flex gap-2">
                                    {isEditing && (
                                        <button
                                            onClick={() => {
                                                setIsEditing(false);
                                                setEditIndex(null);
                                                setTaskTitle('');
                                                setTaskDesc('');
                                                setTaskDeadline('');
                                                setTaskDocUrl('');
                                            }}
                                            className="flex-1 bg-white/5 text-white font-bold py-3 rounded-xl hover:bg-white/10 transition-all"
                                        >
                                            Cancel
                                        </button>
                                    )}
                                    <button
                                        onClick={handleAddTask}
                                        disabled={loading || !taskTitle}
                                        className={`${isEditing ? 'flex-[2]' : 'w-full'} bg-secondary text-primary font-bold py-3 rounded-xl hover:bg-secondary/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50`}
                                    >
                                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Plus className="w-4 h-4" /> {isEditing ? 'Update Task' : 'Assign Task'}</>}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content: Task List */}
                    <div className="md:col-span-2 space-y-6">
                        <div className="flex items-center justify-between">
                            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Active Tasks</h4>
                            <span className="text-[10px] bg-white/5 px-2 py-1 rounded text-slate-400">{(student.tasks || []).length} Total</span>
                        </div>

                        <div className="space-y-4">
                            {student.tasks && student.tasks.length > 0 ? (
                                [...student.tasks].reverse().map((task, idx) => {
                                    const originalIdx = student.tasks.length - 1 - idx;
                                    const isBeingEdited = isEditing && editIndex === originalIdx;

                                    return (
                                        <div key={idx} className={`bg-surface/30 border ${isBeingEdited ? 'border-secondary/50 ring-1 ring-secondary/20' : 'border-white/5'} p-5 rounded-2xl hover:border-white/10 transition-all group relative`}>
                                            <div className="flex justify-between items-start gap-4">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <h5 className="font-bold text-white text-lg">{task.title}</h5>
                                                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider 
                                                            ${task.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-500' :
                                                                task.status === 'In Progress' ? 'bg-blue-500/10 text-blue-500' : 'bg-amber-500/10 text-amber-500'}`}>
                                                            {task.status}
                                                        </span>
                                                    </div>
                                                    {task.description && (
                                                        <p className="text-slate-400 text-sm leading-relaxed mb-4">{task.description}</p>
                                                    )}

                                                    {task.documentUrl && (
                                                        <div className="mb-2">
                                                            <a
                                                                href={task.documentUrl}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="inline-flex items-center gap-2 text-[10px] font-black text-secondary uppercase tracking-widest bg-secondary/10 px-3 py-1.5 rounded-lg border border-secondary/20 hover:bg-secondary hover:text-primary transition-all"
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                                                                Reference PDF
                                                            </a>
                                                        </div>
                                                    )}

                                                    {task.submissionUrl && (
                                                        <div className="mb-4">
                                                            <a
                                                                href={task.submissionUrl}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="inline-flex items-center gap-2 text-[10px] font-black text-emerald-500 uppercase tracking-widest bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20 hover:bg-emerald-500 hover:text-white transition-all shadow-lg shadow-emerald-500/10"
                                                            >
                                                                <ExternalLink className="w-3 h-3" />
                                                                View Submission
                                                            </a>
                                                        </div>
                                                    )}

                                                    <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-500">
                                                        <span className="flex items-center gap-1.5">
                                                            <Calendar className="w-3.5 h-3.5 text-secondary" />
                                                            Deadline: {task.deadline ? new Date(task.deadline).toLocaleDateString() : 'No deadline'}
                                                        </span>
                                                        <span className="flex items-center gap-1.5">
                                                            <Clock className="w-3.5 h-3.5 text-slate-600" />
                                                            Assigned: {new Date(task.createdAt).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button
                                                        onClick={() => handleEditTask(originalIdx)}
                                                        className="p-2 bg-blue-500/10 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition-all"
                                                        title="Edit Task"
                                                    >
                                                        <Plus className="w-4 h-4 rotate-45" />
                                                    </button>
                                                    <button
                                                        onClick={() => initiateDeleteTask(originalIdx)}
                                                        className="p-2 bg-rose-500/10 text-rose-500 rounded-lg hover:bg-rose-500 hover:text-white transition-all"
                                                        title="Delete Task"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="text-center py-12 bg-white/5 rounded-2xl border border-dashed border-white/10">
                                    <ClipboardList className="w-12 h-12 text-slate-700 mx-auto mb-4" />
                                    <p className="text-slate-500 italic">No tasks assigned to this student yet.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Custom Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="bg-surface border border-white/10 rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
                        <div className="p-6 text-center">
                            <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4 text-red-400">
                                <Trash2 className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Delete Task?</h3>
                            <p className="text-slate-400 text-sm mb-6">Are you sure you want to delete this task? This action cannot be undone.</p>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowDeleteModal(false)}
                                    className="flex-1 py-2.5 rounded-lg border border-white/10 text-slate-300 hover:bg-white/5 font-semibold transition-colors"
                                >
                                    No, Keep It
                                </button>
                                <button
                                    onClick={confirmDeleteTask}
                                    className="flex-1 py-2.5 rounded-lg bg-red-500 text-white hover:bg-red-600 font-bold transition-colors shadow-lg shadow-red-500/20"
                                >
                                    Yes, Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
