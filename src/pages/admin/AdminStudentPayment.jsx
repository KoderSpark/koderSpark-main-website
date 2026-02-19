import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import { Search, Loader2, IndianRupee, Plus, Calculator, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminStudentPayment() {
    const location = useLocation();
    const navigate = useNavigate();
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(false);

    // Form States
    const [earnings, setEarnings] = useState('');
    const [payoutTitle, setPayoutTitle] = useState('');
    const [payoutAmount, setPayoutAmount] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editIndex, setEditIndex] = useState(null);

    // Delete Confirmation State
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [payoutToDelete, setPayoutToDelete] = useState(null);

    // Initial load if email passed from search
    useEffect(() => {
        const fetchStudent = async () => {
            const email = location.state?.email;
            if (!email) return;

            setLoading(true);
            try {
                const { data } = await api.get(`/admin/students?email=${email}`);
                if (data.length > 0) {
                    const found = data[0];
                    setStudent(found);
                    setEarnings(found.earnings || 0);
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

    const handleUpdate = async () => {
        if (!student) return;
        setLoading(true);
        try {
            // Update Earnings Only
            await api.put(`/admin/students/${student._id}/payment`, {
                earnings: parseFloat(earnings)
            });
            toast.success("Earnings updated!");

            // Refresh local data
            setStudent(prev => ({ ...prev, earnings: parseFloat(earnings) }));
        } catch (error) {
            console.error(error);
            toast.error("Update failed");
        } finally {
            setLoading(false);
        }
    };

    const handleAddPayout = async () => {
        if (!student || !payoutTitle || !payoutAmount) return;
        setLoading(true);
        try {
            let updatedPayouts;

            if (isEditing) {
                // Update existing payout
                updatedPayouts = [...student.payouts];
                updatedPayouts[editIndex] = {
                    ...updatedPayouts[editIndex],
                    title: payoutTitle,
                    amount: parseFloat(payoutAmount)
                };
            } else {
                // Add new payout
                const newPayout = {
                    title: payoutTitle,
                    amount: parseFloat(payoutAmount),
                    date: new Date(),
                    status: 'Paid'
                };
                updatedPayouts = [...(student.payouts || []), newPayout];
            }

            await api.put(`/admin/students/${student._id}/payment`, {
                payouts: updatedPayouts
            });

            toast.success(isEditing ? "Payout updated!" : "Payout added!");
            setStudent(prev => ({ ...prev, payouts: updatedPayouts }));

            // Reset form
            setPayoutTitle('');
            setPayoutAmount('');
            setIsEditing(false);
            setEditIndex(null);
        } catch (error) {
            console.error(error);
            toast.error(isEditing ? "Failed to update payout" : "Failed to add payout");
        } finally {
            setLoading(false);
        }
    };

    const handleEditClick = (index, payout) => {
        setIsEditing(true);
        setEditIndex(index);
        setPayoutTitle(payout.title);
        setPayoutAmount(payout.amount);
        // Scroll to form
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    };

    const initiateDeletePayout = (index) => {
        setPayoutToDelete(index);
        setShowDeleteModal(true);
    };

    const confirmDeletePayout = async () => {
        if (payoutToDelete === null) return;

        setLoading(true);
        try {
            const updatedPayouts = student.payouts.filter((_, i) => i !== payoutToDelete);

            await api.put(`/admin/students/${student._id}/payment`, {
                payouts: updatedPayouts
            });

            toast.success("Payout record deleted");
            setStudent(prev => ({ ...prev, payouts: updatedPayouts }));

            // If deleting the one being edited, reset form
            if (isEditing && editIndex === payoutToDelete) {
                setPayoutTitle('');
                setPayoutAmount('');
                setIsEditing(false);
                setEditIndex(null);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete payout");
        } finally {
            setLoading(false);
            setShowDeleteModal(false);
            setPayoutToDelete(null);
        }
    };

    const cancelEdit = () => {
        setIsEditing(false);
        setEditIndex(null);
        setPayoutTitle('');
        setPayoutAmount('');
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
            <header className="flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Payment Status</h2>
                    <p className="text-slate-400 mt-2">Manage student earnings and payouts.</p>
                </div>
            </header>

            {!student && !loading && (
                <div className="text-center py-20 bg-surface/30 border border-white/5 rounded-2xl border-dashed">
                    <Search className="w-12 h-12 text-slate-700 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">No Student Selected</h3>
                    <p className="text-slate-400">Please search for a student in the <span className="text-secondary cursor-pointer hover:underline" onClick={() => navigate('/ks-admin/search')}>Search Page</span> to manage payments.</p>
                </div>
            )}

            {student && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* LEFT COLUMN: Earnings & Status */}
                    <div className="space-y-6">
                        {/* Student Info - Redesigned for mobile */}
                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 bg-surface/50 border border-white/5 p-6 rounded-2xl">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-full bg-secondary text-primary flex items-center justify-center text-2xl sm:text-3xl font-bold border-4 border-white/5 shadow-xl overflow-hidden">
                                {student.profileImage ? (
                                    <img src={student.profileImage} alt={student.fullName} className="w-full h-full object-cover" />
                                ) : (
                                    student.fullName[0]
                                )}
                            </div>
                            <div className="text-center sm:text-left min-w-0 flex-1">
                                <h3 className="text-xl font-bold text-white truncate">{student.fullName}</h3>
                                <p className="text-slate-400 text-sm break-all mt-1">{student.email}</p>
                                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mt-3 
                                    ${student.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
                                    <span className={`w-2 h-2 rounded-full ${student.status === 'Approved' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                                    {student.status}
                                </div>
                            </div>
                        </div>

                        {/* Earnings Dashboard Card */}
                        <div className="bg-[#0f1014] border border-white/5 p-6 sm:p-8 rounded-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4">
                                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                            </div>

                            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Earnings Dashboard</h4>
                            <div className="flex items-center gap-2 text-3xl sm:text-4xl font-black text-white">
                                <span className="text-secondary">₹</span>
                                <input
                                    type="number"
                                    value={earnings}
                                    onChange={(e) => setEarnings(e.target.value)}
                                    className="bg-transparent border-b border-white/10 focus:border-secondary transition-colors focus:outline-none w-full max-w-[200px]"
                                />
                            </div>
                            <button
                                onClick={handleUpdate}
                                disabled={loading}
                                className="mt-6 text-sm text-secondary hover:text-white font-bold uppercase tracking-wider flex items-center gap-2 transition-colors"
                            >
                                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Update Total"}
                            </button>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Recent Payouts */}
                    <div className="bg-surface/50 border border-white/5 p-6 rounded-2xl h-fit">
                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">Recent Payouts</h4>

                        {/* List */}
                        <div className="space-y-4 mb-8">
                            {student.payouts && student.payouts.length > 0 ? (
                                student.payouts.map((payout, index) => (
                                    <div key={index} className="group relative flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-primary rounded-xl border border-white/5 hover:border-white/20 transition-all gap-3 overflow-hidden">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-10 h-10 flex-shrink-0 rounded-lg flex items-center justify-center 
                                                ${payout.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-slate-500/10 text-slate-500'}`}>
                                                <IndianRupee className="w-5 h-5" />
                                            </div>
                                            <div className="min-w-0">
                                                <h5 className="font-bold text-white truncate">{payout.title}</h5>
                                                <p className="text-xs text-slate-500">{new Date(payout.date).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4 self-end sm:self-center">
                                            <span className="font-bold text-emerald-400 whitespace-nowrap">+ ₹{payout.amount.toLocaleString()}</span>

                                            {/* Action Buttons (Visible on Hover / Mobile always?) */}
                                            <div className="flex items-center gap-1 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => handleEditClick(index, payout)}
                                                    className="p-1.5 rounded-lg text-slate-400 hover:text-secondary hover:bg-white/5 transition-colors"
                                                    title="Edit"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
                                                </button>
                                                <button
                                                    onClick={() => initiateDeletePayout(index)}
                                                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-white/5 transition-colors"
                                                    title="Delete"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-slate-500 text-center py-4">No payouts yet.</p>
                            )}
                        </div>

                        {/* Add/Edit Payout Form */}
                        <div className={`bg-primary/50 p-5 sm:p-6 rounded-xl border transition-all ${isEditing ? 'border-secondary/30 bg-secondary/5' : 'border-white/5 shadow-inner'}`}>
                            <div className="flex justify-between items-center mb-4">
                                <h5 className="text-sm font-black text-white uppercase tracking-widest">
                                    {isEditing ? 'Update Payout Record' : 'Add New Payout'}
                                </h5>
                                {isEditing && (
                                    <button
                                        onClick={cancelEdit}
                                        className="text-[10px] font-bold text-slate-500 hover:text-white uppercase tracking-wider"
                                    >
                                        Cancel Edit
                                    </button>
                                )}
                            </div>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase font-bold text-slate-500 ml-1">Title</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Frontend Fix"
                                        className="w-full bg-surface/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-secondary focus:outline-none transition-all font-medium"
                                        value={payoutTitle}
                                        onChange={(e) => setPayoutTitle(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase font-bold text-slate-500 ml-1">Amount</label>
                                    <div className="flex gap-3">
                                        <div className="relative flex-1">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">₹</span>
                                            <input
                                                type="number"
                                                placeholder="0"
                                                className="w-full bg-surface/50 border border-white/10 rounded-xl pl-8 pr-4 py-3 text-sm text-white focus:border-secondary focus:outline-none transition-all font-bold"
                                                value={payoutAmount}
                                                onChange={(e) => setPayoutAmount(e.target.value)}
                                            />
                                        </div>
                                        <button
                                            onClick={handleAddPayout}
                                            disabled={loading}
                                            className={`font-bold px-6 rounded-xl transition-all flex items-center justify-center shadow-lg active:scale-95 disabled:opacity-50 ${isEditing ? 'bg-emerald-500 text-white shadow-emerald-500/20' : 'bg-secondary text-primary shadow-secondary/20'
                                                }`}
                                        >
                                            {isEditing ? (
                                                loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"></path></svg>
                                            ) : (
                                                <Plus className="w-5 h-5" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
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
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Delete Payout?</h3>
                            <p className="text-slate-400 text-sm mb-6">Are you sure you want to delete this payout record? This action cannot be undone.</p>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowDeleteModal(false)}
                                    className="flex-1 py-2.5 rounded-lg border border-white/10 text-slate-300 hover:bg-white/5 font-semibold transition-colors"
                                >
                                    No, Keep It
                                </button>
                                <button
                                    onClick={confirmDeletePayout}
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
