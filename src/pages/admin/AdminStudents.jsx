import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import { Upload, Loader2, Check, X, Download, Plus, Save, Trash2, AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminStudents() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [domainFilter, setDomainFilter] = useState('');
    const [uploading, setUploading] = useState(false);
    const [selectedIds, setSelectedIds] = useState([]);

    // Modal State
    const [showAddModal, setShowAddModal] = useState(false);
    const [newStudent, setNewStudent] = useState({ fullName: '', email: '', phoneNumber: '', domain: 'IT', studentId: '' });
    const [creating, setCreating] = useState(false);

    // Confirmation Modal State
    const [confirmModal, setConfirmModal] = useState({
        isOpen: false,
        title: '',
        message: '',
        onConfirm: null
    });

    const fetchStudents = async () => {
        try {
            setLoading(true);
            const params = domainFilter ? { domain: domainFilter } : {};
            const { data } = await api.get('/admin/students', { params });
            setStudents(data);
            setSelectedIds([]); // Reset selection on fetch
        } catch (error) {
            console.error("Failed to fetch students", error);
            toast.error("Failed to fetch students");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, [domainFilter]);

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            await api.put(`/admin/students/${id}/status`, { status: newStatus });
            setStudents(prev => prev.map(s => s._id === id ? { ...s, status: newStatus } : s));
            toast.success(`Status updated to ${newStatus}`);
        } catch (error) {
            console.error("Failed to update status", error);
            toast.error("Failed to update status");
        }
    };

    const confirmDelete = (id) => {
        setConfirmModal({
            isOpen: true,
            title: 'Delete Student',
            message: 'Are you sure you want to delete this student? This action cannot be undone.',
            onConfirm: () => handleDelete(id)
        });
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/admin/students/${id}`);
            setStudents(prev => prev.filter(s => s._id !== id));
            setSelectedIds(prev => prev.filter(sid => sid !== id));
            toast.success("Student deleted successfully");
            setConfirmModal({ ...confirmModal, isOpen: false });
        } catch (error) {
            console.error("Failed to delete student", error);
            toast.error("Failed to delete student");
        }
    };

    const confirmBulkDelete = () => {
        setConfirmModal({
            isOpen: true,
            title: 'Bulk Delete Students',
            message: `Are you sure you want to delete ${selectedIds.length} students? This action cannot be undone.`,
            onConfirm: handleBulkDelete
        });
    };

    const handleBulkDelete = async () => {
        try {
            await api.post('/admin/students/bulk-delete', { ids: selectedIds });
            setStudents(prev => prev.filter(s => !selectedIds.includes(s._id)));
            setSelectedIds([]);
            toast.success("Students deleted successfully");
            setConfirmModal({ ...confirmModal, isOpen: false });
        } catch (error) {
            console.error("Failed to bulk delete", error);
            toast.error("Failed to bulk delete");
        }
    };

    const toggleSelectAll = () => {
        if (selectedIds.length === students.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(students.map(s => s._id));
        }
    };

    const toggleSelectOne = (id) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(prev => prev.filter(sid => sid !== id));
        } else {
            setSelectedIds(prev => [...prev, id]);
        }
    };

    const handleFileUpload = async (e) => {
        if (!e.target.files?.[0]) return;

        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);

        try {
            setUploading(true);
            const { data } = await api.post('/admin/students/bulk-upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            toast.success(`Upload Complete: ${data.success} added, ${data.failed} failed.`);
            fetchStudents();
        } catch (error) {
            console.error("Upload failed", error);
            toast.error("Upload failed");
        } finally {
            setUploading(false);
            e.target.value = '';
        }
    };

    const downloadTemplate = () => {
        const headers = ['fullName,email,phoneNumber,domain,ID'];
        const rows = ['John Doe,john@example.com,1234567890,IT,KSP-IND-001', 'Jane Smith,jane@example.com,0987654321,NON IT,KSP-IND-002', 'Alex Both,alex@example.com,1122334455,Both,KSP-IND-003'];
        const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "student_template.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success("Template downloaded");
    };

    const handleCreateStudent = async (e) => {
        e.preventDefault();
        try {
            setCreating(true);
            await api.post('/admin/students', { ...newStudent, password: "KS@2025" });
            toast.success("Student created successfully!");
            setShowAddModal(false);
            setNewStudent({ fullName: '', email: '', phoneNumber: '', domain: 'IT', studentId: '' });
            fetchStudents();
        } catch (error) {
            console.error("Failed to create student", error);
            toast.error(error.response?.data?.message || "Failed to create student");
        } finally {
            setCreating(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto relative">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h2 className="text-3xl font-bold uppercase tracking-tight text-white mb-2">Students</h2>
                    <p className="text-slate-400">Manage statuses and uploads.</p>
                </div>

                <div className="flex flex-wrap gap-4 w-full md:w-auto items-center">
                    {/* Bulk Delete Button - Only visible when items selected */}
                    {selectedIds.length > 0 && (
                        <button
                            onClick={confirmBulkDelete}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wider bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500 hover:text-white transition-all animate-in fade-in slide-in-from-right-4"
                        >
                            <Trash2 className="w-4 h-4" />
                            Delete ({selectedIds.length})
                        </button>
                    )}

                    <div className="relative group">
                        <select
                            value={domainFilter}
                            onChange={(e) => setDomainFilter(e.target.value)}
                            className="appearance-none bg-surface border border-white/10 text-slate-300 px-5 py-2.5 pr-10 rounded-lg text-sm font-medium uppercase tracking-wide focus:outline-none focus:border-secondary/50 focus:text-white transition-colors cursor-pointer w-full md:w-48"
                        >
                            <option value="">All Domains</option>
                            <option value="IT">IT</option>
                            <option value="NON IT">NON IT</option>
                            <option value="Both">Both</option>
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500 group-hover:text-secondary transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                        </div>
                    </div>

                    <button
                        onClick={() => setShowAddModal(true)}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wider bg-secondary text-primary hover:bg-secondary/90 transition-all shadow-lg shadow-secondary/20"
                    >
                        <Plus className="w-4 h-4" />
                        Add New
                    </button>

                    <div className="flex gap-2">
                        <button
                            onClick={downloadTemplate}
                            className="p-2.5 rounded-lg border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                            title="Download Template"
                        >
                            <Download className="w-5 h-5" />
                        </button>

                        <label className={`
                            flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wider 
                            bg-white text-primary hover:bg-slate-200 transition-all cursor-pointer shadow-lg shadow-white/5
                            ${uploading ? 'opacity-70 cursor-not-allowed' : ''}
                        `}>
                            {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                            Bulk Upload
                            <input
                                type="file"
                                accept=".xlsx,.xls,.csv"
                                className="hidden"
                                onChange={handleFileUpload}
                                disabled={uploading}
                            />
                        </label>
                    </div>
                </div>
            </header>

            {loading ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="w-8 h-8 animate-spin text-secondary" />
                </div>
            ) : (
                <div className="bg-surface/30 backdrop-blur-md border border-white/5 rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-white/5 text-slate-400 text-xs font-bold uppercase tracking-widest bg-white/5">
                                    <th className="py-5 px-6 font-normal w-12">
                                        <input
                                            type="checkbox"
                                            checked={students.length > 0 && selectedIds.length === students.length}
                                            onChange={toggleSelectAll}
                                            className="rounded border-white/20 bg-white/5 text-secondary focus:ring-secondary focus:ring-offset-0 cursor-pointer"
                                        />
                                    </th>
                                    <th className="py-5 px-6 font-normal">Details</th>
                                    <th className="py-5 px-6 font-normal">Contact</th>
                                    <th className="py-5 px-6 font-normal">Domain</th>
                                    <th className="py-5 px-6 font-normal">Status</th>
                                    <th className="py-5 px-6 font-normal text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm divide-y divide-white/5">
                                {students.map(student => (
                                    <tr key={student._id} className={`hover:bg-white/5 transition-colors group ${selectedIds.includes(student._id) ? 'bg-white/5' : ''}`}>
                                        <td className="py-4 px-6">
                                            <input
                                                type="checkbox"
                                                checked={selectedIds.includes(student._id)}
                                                onChange={() => toggleSelectOne(student._id)}
                                                className="rounded border-white/20 bg-white/5 text-secondary focus:ring-secondary focus:ring-offset-0 cursor-pointer"
                                            />
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="font-bold text-white group-hover:text-secondary transition-colors">{student.fullName}</div>
                                            <div className="text-xs text-slate-500 font-mono mt-1">ID: {student.studentId || `...${student._id.slice(-6)}`}</div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="text-slate-300">{student.email}</div>
                                            <div className="text-xs text-slate-500 mt-1">{student.phoneNumber}</div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className={`inline-flex items-center px-2.5 py-1 rounded text-xs font-medium border ${student.domain === 'IT' ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' :
                                                student.domain === 'NON IT' ? 'bg-purple-500/10 border-purple-500/20 text-purple-400' :
                                                    'bg-orange-500/10 border-orange-500/20 text-orange-400'
                                                }`}>
                                                {student.domain}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className={`
                                                inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide
                                                ${student.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-400' : ''}
                                                ${student.status === 'Pending' ? 'bg-amber-500/10 text-amber-400' : ''}
                                                ${student.status === 'Verifying' ? 'bg-blue-500/10 text-blue-400' : ''}
                                            `}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${student.status === 'Approved' ? 'bg-emerald-400' :
                                                    student.status === 'Pending' ? 'bg-amber-400' : 'bg-blue-400'
                                                    }`}></span>
                                                {student.status}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                {student.status !== 'Approved' && (
                                                    <button
                                                        onClick={() => handleStatusUpdate(student._id, 'Approved')}
                                                        className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-white transition-all"
                                                        title="Approve"
                                                    >
                                                        <Check className="w-4 h-4" />
                                                    </button>
                                                )}
                                                {student.status === 'Pending' && (
                                                    <button
                                                        onClick={() => handleStatusUpdate(student._id, 'Verifying')}
                                                        className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white transition-all"
                                                        title="Verify"
                                                    >
                                                        <Loader2 className="w-4 h-4" />
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => confirmDelete(student._id)}
                                                    className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all ml-1"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {students.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="py-12 text-center text-slate-500">
                                            <p className="text-lg font-medium mb-2">No students found</p>
                                            <p className="text-sm">Try adjusting filters or upload a new batch.</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Add Student Modal */}
            {showAddModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="bg-surface border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
                        <button
                            onClick={() => setShowAddModal(false)}
                            className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="p-6">
                            <h3 className="text-xl font-bold text-white mb-1">Add New Student</h3>
                            <p className="text-slate-400 text-sm mb-6">Enter student details manually.</p>

                            <form onSubmit={handleCreateStudent} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Student ID (Custom)</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. KSP-IND-001"
                                        className="w-full bg-primary border border-white/10 rounded-lg px-4 py-2 text-white focus:border-secondary focus:outline-none"
                                        value={newStudent.studentId}
                                        onChange={(e) => setNewStudent({ ...newStudent, studentId: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full bg-primary border border-white/10 rounded-lg px-4 py-2 text-white focus:border-secondary focus:outline-none"
                                        value={newStudent.fullName}
                                        onChange={(e) => setNewStudent({ ...newStudent, fullName: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Email Address</label>
                                    <input
                                        type="email"
                                        required
                                        className="w-full bg-primary border border-white/10 rounded-lg px-4 py-2 text-white focus:border-secondary focus:outline-none"
                                        value={newStudent.email}
                                        onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Phone Number</label>
                                    <input
                                        type="tel"
                                        required
                                        className="w-full bg-primary border border-white/10 rounded-lg px-4 py-2 text-white focus:border-secondary focus:outline-none"
                                        value={newStudent.phoneNumber}
                                        onChange={(e) => setNewStudent({ ...newStudent, phoneNumber: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Domain</label>
                                    <select
                                        className="w-full bg-primary border border-white/10 rounded-lg px-4 py-2 text-white focus:border-secondary focus:outline-none cursor-pointer"
                                        value={newStudent.domain}
                                        onChange={(e) => setNewStudent({ ...newStudent, domain: e.target.value })}
                                    >
                                        <option value="IT">IT</option>
                                        <option value="NON IT">NON IT</option>
                                        <option value="Both">Both</option>
                                    </select>
                                </div>

                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        disabled={creating}
                                        className="w-full flex items-center justify-center gap-2 bg-secondary text-primary font-bold uppercase tracking-wider py-3 rounded-lg hover:bg-secondary/90 transition-all disabled:opacity-50"
                                    >
                                        {creating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                        Save Student
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Custom Confirmation Modal */}
            {confirmModal.isOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="bg-surface border border-white/10 rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
                        <div className="p-6 text-center">
                            <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4 text-red-400">
                                <AlertTriangle className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{confirmModal.title}</h3>
                            <p className="text-slate-400 text-sm mb-6">{confirmModal.message}</p>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => setConfirmModal({ ...confirmModal, isOpen: false })}
                                    className="flex-1 py-2.5 rounded-lg border border-white/10 text-slate-300 hover:bg-white/5 font-semibold transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmModal.onConfirm}
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
