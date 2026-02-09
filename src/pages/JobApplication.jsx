import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Upload, AlertCircle, Loader2 } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { careers } from '../data/careers';
import SEO from '../components/SEO';
import { generateJobPostingSchema } from '../utils/Schema';

const JobApplication = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        address: '',
        resumeLink: '',
        portfolioLink: ''
    });
    const [status, setStatus] = useState('idle');

    useEffect(() => {
        const foundJob = careers.find(c => c.id === parseInt(id));
        if (foundJob) {
            setJob(foundJob);
        } else {
            toast.error('Job not found');
            navigate('/careers');
        }
    }, [id, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');

        const submissionData = new FormData();
        submissionData.append('type', 'career');
        submissionData.append('jobTitle', job?.title || 'Unknown Role');
        submissionData.append('jobId', id);
        submissionData.append('timestamp', new Date().toISOString());

        // Construct fullName
        submissionData.append('fullName', `${formData.firstName} ${formData.lastName}`);

        Object.keys(formData).forEach(key => {
            submissionData.append(key, formData[key]);
        });

        try {
            const response = await fetch(import.meta.env.VITE_CAREERS_GOOGLE_SHEETS_URL, {
                method: 'POST',
                body: submissionData
            });

            const result = await response.json();

            if (result.result === 'success') {
                setStatus('success');
                toast.success('Application submitted successfully!');
                setFormData({
                    firstName: '',
                    lastName: '',
                    phone: '',
                    email: '',
                    address: '',
                    resumeLink: '',
                    portfolioLink: ''
                });
                setTimeout(() => {
                    navigate('/careers');
                }, 2000);
            } else {
                setStatus('error');
                toast.error('Something went wrong. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setStatus('error');
            toast.error('Failed to submit application.');
        }
    };

    if (!job) return null;

    return (
        <main className="min-h-screen pt-24 pb-12 px-4 bg-primary relative overflow-hidden">
            <SEO
                title={`Apply for ${job.title}`}
                description={`Apply for the ${job.title} position at Koderspark. ${job.description.substring(0, 150)}...`}
                canonical={`https://koderspark.com/careers/apply/${job.id}`}
                jsonLd={generateJobPostingSchema(job)}
            />
            <Toaster position="bottom-right" />
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-secondary/5 rounded-full blur-3xl -z-10"></div>
            <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-accent/5 rounded-full blur-3xl -z-10"></div>

            <div className="max-w-5xl mx-auto">
                <Link to="/careers" className="inline-flex items-center text-slate-400 hover:text-white mb-6 transition-colors group">
                    <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Careers
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[#0f172a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        {/* Image Side */}
                        <div className="relative h-48 lg:h-auto min-h-[300px]">
                            <img
                                src={job.image}
                                alt={job.title}
                                className="absolute inset-0 w-full h-full object-cover"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/50 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-[#0f172a]/50 lg:to-[#0f172a]"></div>
                            <div className="absolute bottom-0 left-0 p-6 lg:p-8 z-10">
                                <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">{job.title}</h1>
                                <p className="text-slate-200 text-base font-medium">{job.location} • {job.type}</p>
                            </div>
                        </div>

                        {/* Form Side */}
                        <div className="p-6 lg:p-8 bg-[#0f172a]">
                            <div className="mb-6">
                                <h2 className="text-xl font-bold text-white mb-1">Submit Your Application</h2>
                                <p className="text-slate-400 text-sm">Please fill out the form below to apply.</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-medium text-slate-300">First Name *</label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            required
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-secondary transition-colors"
                                            placeholder="John"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-medium text-slate-300">Last Name *</label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            required
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-secondary transition-colors"
                                            placeholder="Doe"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-medium text-slate-300">Email Address *</label>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-secondary transition-colors"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-medium text-slate-300">Phone Number *</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            required
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-secondary transition-colors"
                                            placeholder="+91 98765 43210"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-slate-300">Address *</label>
                                    <textarea
                                        name="address"
                                        required
                                        value={formData.address}
                                        onChange={handleChange}
                                        rows="2"
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-secondary transition-colors"
                                        placeholder="Your current address"
                                    ></textarea>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-slate-300">Resume (Google Drive Link) *</label>
                                    <div className="relative">
                                        <input
                                            type="url"
                                            name="resumeLink"
                                            required
                                            value={formData.resumeLink}
                                            onChange={handleChange}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-secondary transition-colors pl-9"
                                            placeholder="https://drive.google.com/..."
                                        />
                                        <Upload className="absolute left-2.5 top-2.5 w-4 h-4 text-slate-400" />
                                    </div>
                                    <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-1">
                                        <AlertCircle className="w-3 h-3" />
                                        Please upload your resume to Google Drive and enable "Anyone with the link" sharing.
                                    </p>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-slate-300">Portfolio Link (Optional)</label>
                                    <input
                                        type="url"
                                        name="portfolioLink"
                                        value={formData.portfolioLink}
                                        onChange={handleChange}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-secondary transition-colors"
                                        placeholder="https://yourportfolio.com"
                                    />
                                </div>

                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        disabled={status === 'submitting'}
                                        className="w-full bg-secondary text-primary font-bold py-3 rounded-xl hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
                                    >
                                        {status === 'submitting' ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                Submitting Application...
                                            </>
                                        ) : (
                                            'Submit Application'
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </motion.div>
            </div>
        </main>
    );
};

export default JobApplication;
