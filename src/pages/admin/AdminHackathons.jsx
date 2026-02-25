import React, { useState, useEffect, useCallback } from 'react';
import { Trophy, Plus, Pencil, Trash2, Loader2, ImageIcon, CalendarDays, Clock, X, Check } from 'lucide-react';
import api from '../../api/axios';
import toast from 'react-hot-toast';

const emptyForm = { title: '', description: '', postedDate: '', untilDate: '' };

const isUpcoming = (date) => new Date(date) >= new Date();

export default function AdminHackathons() {
    const [hackathons, setHackathons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [form, setForm] = useState(emptyForm);
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [deletingId, setDeletingId] = useState(null);

    const fetchHackathons = useCallback(async () => {
        try {
            setLoading(true);
            const { data } = await api.get('/postings?type=hackathon');
            setHackathons(data);
        } catch {
            toast.error('Failed to load hackathons');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchHackathons(); }, [fetchHackathons]);

    const openAdd = () => {
        setEditingItem(null);
        setForm(emptyForm);
        setImageFile(null);
        setImagePreview(null);
        setShowForm(true);
        setTimeout(() => document.getElementById('hack-form-top')?.scrollIntoView({ behavior: 'smooth' }), 100);
    };

    const openEdit = (item) => {
        setEditingItem(item);
        setForm({
            title: item.title,
            description: item.description,
            postedDate: item.postedDate?.slice(0, 10) || '',
            untilDate: item.untilDate?.slice(0, 10) || '',
        });
        setImageFile(null);
        setImagePreview(item.image || null);
        setShowForm(true);
        setTimeout(() => document.getElementById('hack-form-top')?.scrollIntoView({ behavior: 'smooth' }), 100);
    };

    const cancelForm = () => {
        setShowForm(false);
        setEditingItem(null);
        setForm(emptyForm);
        setImageFile(null);
        setImagePreview(null);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.title || !form.description || !form.postedDate || !form.untilDate) {
            toast.error('Please fill all required fields');
            return;
        }
        setSubmitting(true);
        try {
            const fd = new FormData();
            fd.append('type', 'hackathon');
            fd.append('title', form.title);
            fd.append('description', form.description);
            fd.append('postedDate', form.postedDate);
            fd.append('untilDate', form.untilDate);
            if (imageFile) fd.append('image', imageFile);

            if (editingItem) {
                await api.put(`/postings/${editingItem._id}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
                toast.success('Hackathon updated!');
            } else {
                await api.post('/postings', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
                toast.success('Hackathon created!');
            }
            cancelForm();
            fetchHackathons();
        } catch (err) {
            toast.error(err?.response?.data?.message || 'Something went wrong');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        setDeletingId(id);
        try {
            await api.delete(`/postings/${id}`);
            toast.success('Hackathon deleted');
            setHackathons(prev => prev.filter(h => h._id !== id));
        } catch {
            toast.error('Failed to delete');
        } finally {
            setDeletingId(null);
        }
    };


    const upcoming = hackathons.filter(h => isUpcoming(h.untilDate));
    const previous = hackathons.filter(h => !isUpcoming(h.untilDate));

    return (
        <div className="space-y-8 animate-in fade-in duration-500">

            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                        <Trophy className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-white uppercase tracking-tighter">Hackathons</h1>
                        <p className="text-xs text-slate-400 uppercase tracking-widest">
                            <span className="text-green-400">{upcoming.length} upcoming</span>
                            <span className="mx-2 text-white/20">·</span>
                            <span className="text-slate-500">{previous.length} previous</span>
                        </p>
                    </div>
                </div>
                {!showForm && (
                    <button
                        onClick={openAdd}
                        className="flex items-center gap-2 px-5 py-3 bg-secondary text-primary text-xs font-black uppercase tracking-widest rounded-xl hover:opacity-90 transition-opacity"
                    >
                        <Plus className="w-4 h-4" /> Add Hackathon
                    </button>
                )}
            </div>

            {/* Inline Form Panel */}
            {showForm && (
                <div id="hack-form-top" className="bg-surface/40 border border-amber-500/10 rounded-3xl p-6 md:p-8 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-black uppercase tracking-tighter text-white">
                            {editingItem ? 'Edit Hackathon' : 'Add New Hackathon'}
                        </h2>
                        <button onClick={cancelForm} className="p-2 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white transition-colors">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Image */}
                        <div>
                            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Cover Image</label>
                            <label className="cursor-pointer block border-2 border-dashed border-white/10 rounded-2xl hover:border-amber-500/40 transition-colors group overflow-hidden">
                                {imagePreview ? (
                                    <div className="relative">
                                        <img src={imagePreview} alt="" className="w-full h-52 object-cover" />
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <span className="text-xs font-black text-white uppercase tracking-widest">Change Image</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center gap-3 py-12">
                                        <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-amber-500/10 transition-colors">
                                            <ImageIcon className="w-7 h-7 text-slate-600 group-hover:text-amber-400 transition-colors" />
                                        </div>
                                        <div className="text-center">
                                            <p className="text-sm font-bold text-slate-400">Click to upload banner</p>
                                            <p className="text-xs text-slate-600 mt-1">JPG, PNG, WEBP supported</p>
                                        </div>
                                    </div>
                                )}
                                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                            </label>
                        </div>

                        {/* Title */}
                        <div>
                            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Hackathon Title *</label>
                            <input
                                type="text"
                                value={form.title}
                                onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                                placeholder="e.g. KoderSpark Build Challenge 2026"
                                className="w-full bg-primary/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-amber-500/50 transition-colors"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Description *</label>
                            <textarea
                                value={form.description}
                                onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                                placeholder="Describe the hackathon, prizes, eligibility, theme..."
                                rows={5}
                                className="w-full bg-primary/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-amber-500/50 transition-colors resize-none"
                            />
                        </div>

                        {/* Dates */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Posted / Announced Date *</label>
                                <input
                                    type="date"
                                    value={form.postedDate}
                                    onChange={e => setForm(f => ({ ...f, postedDate: e.target.value }))}
                                    className="w-full bg-primary/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500/50 transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">
                                    Event Date * <span className="text-amber-400/70 normal-case tracking-normal font-medium text-[9px]">(determines upcoming / previous)</span>
                                </label>
                                <input
                                    type="date"
                                    value={form.untilDate}
                                    onChange={e => setForm(f => ({ ...f, untilDate: e.target.value }))}
                                    className="w-full bg-primary/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500/50 transition-colors"
                                />
                            </div>
                        </div>

                        {/* Preview auto-label */}
                        {form.untilDate && (
                            <div className={`flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-widest ${isUpcoming(form.untilDate) ? 'bg-green-500/10 border border-green-500/20 text-green-400' : 'bg-slate-500/10 border border-slate-500/20 text-slate-400'}`}>
                                <Trophy className="w-4 h-4" />
                                Will be categorized as: {isUpcoming(form.untilDate) ? '🟢 Upcoming' : '⚫ Previous'}
                            </div>
                        )}

                        <div className="flex items-center gap-3 pt-2">
                            <button
                                type="submit"
                                disabled={submitting}
                                className="flex items-center gap-2 px-6 py-3 bg-secondary text-primary text-xs font-black uppercase tracking-widest rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
                            >
                                {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                                {editingItem ? 'Save Changes' : 'Create Hackathon'}
                            </button>
                            <button type="button" onClick={cancelForm} className="px-6 py-3 bg-white/5 border border-white/10 text-slate-400 text-xs font-black uppercase tracking-widest rounded-xl hover:bg-white/10 hover:text-white transition-all">
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Table */}
            {loading ? (
                <div className="flex items-center justify-center py-24">
                    <Loader2 className="w-8 h-8 text-secondary animate-spin" />
                </div>
            ) : hackathons.length === 0 && !showForm ? (
                <div className="flex flex-col items-center justify-center py-24 bg-surface/30 border border-white/5 rounded-3xl">
                    <Trophy className="w-16 h-16 text-white/10 mb-4" />
                    <p className="text-slate-500 text-sm uppercase tracking-widest font-bold">No hackathons yet</p>
                    <button onClick={openAdd} className="mt-6 px-5 py-2.5 text-xs font-black uppercase tracking-widest bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 transition-colors">
                        Add First Hackathon
                    </button>
                </div>
            ) : hackathons.length > 0 && (
                <div className="space-y-6">
                    {/* Upcoming */}
                    {upcoming.length > 0 && (
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                <p className="text-[10px] font-black uppercase tracking-widest text-green-400">Upcoming ({upcoming.length})</p>
                            </div>
                            <HackathonTable items={upcoming} onEdit={openEdit} onDelete={handleDelete} deletingId={deletingId} editingId={editingItem?._id} />
                        </div>
                    )}

                    {/* Previous */}
                    {previous.length > 0 && (
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <span className="w-2 h-2 rounded-full bg-slate-500" />
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Previous ({previous.length})</p>
                            </div>
                            <HackathonTable items={previous} onEdit={openEdit} onDelete={handleDelete} deletingId={deletingId} editingId={editingItem?._id} />
                        </div>
                    )}
                </div>
            )}

            {!showForm && hackathons.length > 0 && (
                <div className="flex justify-center pt-2">
                    <button onClick={openAdd} className="flex items-center gap-2 px-5 py-3 bg-white/5 border border-white/10 text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-white/10 transition-colors">
                        <Plus className="w-4 h-4" /> Add Another Hackathon
                    </button>
                </div>
            )}
        </div>
    );
}

function HackathonTable({ items, onEdit, onDelete, deletingId, editingId }) {
    const fmt = (d) => d ? new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—';
    return (
        <div className="overflow-x-auto rounded-2xl border border-white/5">
            <table className="w-full text-sm">
                <thead>
                    <tr className="bg-surface/50 border-b border-white/5">
                        <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-widest text-slate-500">Image</th>
                        <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-widest text-slate-500">Title</th>
                        <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-widest text-slate-500 hidden md:table-cell">Announced</th>
                        <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-widest text-slate-500 hidden md:table-cell">Event Date</th>
                        <th className="px-4 py-3 text-right text-[10px] font-black uppercase tracking-widest text-slate-500">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {items.map(item => (
                        <tr key={item._id} className={`bg-surface/20 hover:bg-surface/40 transition-colors ${editingId === item._id ? 'bg-secondary/5 border-l-2 border-secondary/30' : ''}`}>
                            <td className="px-4 py-3">
                                {item.image
                                    ? <img src={item.image} alt="" className="w-12 h-12 rounded-lg object-cover border border-white/10" />
                                    : <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center"><ImageIcon className="w-5 h-5 text-slate-600" /></div>
                                }
                            </td>
                            <td className="px-4 py-3">
                                <p className="text-white font-bold text-sm truncate max-w-[180px]">{item.title}</p>
                                <p className="text-slate-400 text-xs truncate max-w-[180px] mt-0.5 hidden md:block">{item.description}</p>
                            </td>
                            <td className="px-4 py-3 hidden md:table-cell">
                                <span className="text-xs text-slate-400 flex items-center gap-1.5"><CalendarDays className="w-3.5 h-3.5" />{fmt(item.postedDate)}</span>
                            </td>
                            <td className="px-4 py-3 hidden md:table-cell">
                                <span className="text-xs text-slate-400 flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{fmt(item.untilDate)}</span>
                            </td>
                            <td className="px-4 py-3">
                                <div className="flex items-center justify-end gap-2">
                                    <button onClick={() => onEdit(item)} className="p-2 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"><Pencil className="w-4 h-4" /></button>
                                    <button onClick={() => onDelete(item._id)} disabled={deletingId === item._id} className="p-2 rounded-lg hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition-colors disabled:opacity-50">
                                        {deletingId === item._id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
