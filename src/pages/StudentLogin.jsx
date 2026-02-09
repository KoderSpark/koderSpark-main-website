import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import api from '../api/axios';
import { Loader2, ArrowRight, Check, Upload, User, MapPin, GraduationCap, Github, Linkedin, BookOpen, Lock, Eye, EyeOff, IndianRupee, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

export default function StudentLogin() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    // Steps: 1 = Email, 2 = Profile, 3 = Success
    // Initialize step from URL, default to 1
    const initialStep = parseInt(searchParams.get('step')) || 1;
    const [step, setStepState] = useState(initialStep);

    const [loading, setLoading] = useState(false);

    // Data
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // To toggle between Email check and Password login
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const [studentData, setStudentData] = useState(null);
    const [formData, setFormData] = useState({
        profileImage: '',
        address: '',
        college: '',
        course: '',
        year: '',
        bio: '',
        linkedIn: '',
        github: ''
    });

    // Sync Step state with URL
    const setStep = (newStep) => {
        setStepState(newStep);
        setSearchParams({ step: newStep });
    };

    // Load data from Session Storage on Mount
    useEffect(() => {
        const storedStudent = sessionStorage.getItem('studentAuthData');
        if (storedStudent) {
            const parsed = JSON.parse(storedStudent);
            setStudentData(parsed);
            setEmail(parsed.email);
            if (parsed.profileImage) {
                setFormData(prev => ({ ...prev, profileImage: parsed.profileImage }));
            }
        }
    }, []);

    // Guard: Redirect to Step 1 if on Step 2/3 but no data
    const stepParam = searchParams.get('step');
    useEffect(() => {
        const storedStudent = sessionStorage.getItem('studentAuthData');

        // Guard check
        if (step > 1 && !storedStudent && !studentData) {
            setStepState(1);
            setSearchParams({ step: 1 });
            toast.error("Session expired. Please verify email again.");
            return;
        }

        // Sync URL to State (handle back button)
        const currentStepFromUrl = parseInt(stepParam) || 1;
        if (currentStepFromUrl !== step) {
            setStepState(currentStepFromUrl);
        }
    }, [stepParam, step, studentData, setSearchParams]);


    // Step 1A: Verify Email
    const handleVerifyEmail = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await api.post('/student/verify-email', { email });

            // CHECK FOR DUPLICATE COMPLETION -> SWITCH TO PASSWORD MODE
            if (data.student.status === 'Verifying' || data.student.status === 'Approved') {
                toast("Welcome back! Please enter your password.", { icon: '👋' });
                setShowPassword(true);
                setLoading(false);
                return;
            }

            setStudentData(data.student);

            // SAVE to Session Storage
            sessionStorage.setItem('studentAuthData', JSON.stringify(data.student));

            if (data.student.profileImage) {
                setFormData(prev => ({ ...prev, profileImage: data.student.profileImage }));
            }

            setStep(2);
            toast.success(`Welcome, ${data.student.fullName} !`);
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Verification failed");
        } finally {
            setLoading(false);
        }
    };

    // Step 1B: Login with Password
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await api.post('/student/login', { email, password });

            // Login Success
            toast.success("Login successful!");

            // Store auth data if needed (e.g. for a protected route) - or just navigate
            // localStorage.setItem('token', data.token); 
            sessionStorage.setItem('currentUser', JSON.stringify(data.student));

            navigate('/student/dashboard'); // Navigate to new standalone Dashboard

        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    // Step 2: Submit Profile
    const handleSubmitProfile = async (e) => {
        e.preventDefault();

        if (formData.createPassword !== formData.confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }
        if (!formData.createPassword || formData.createPassword.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }

        setLoading(true);
        try {
            await api.put('/student/complete-profile', {
                id: studentData._id,
                ...formData,
                password: formData.createPassword // Send the new password
            });

            // CLEAR Session Storage on success
            sessionStorage.removeItem('studentAuthData');

            // Log them in automatically
            sessionStorage.setItem('currentUser', JSON.stringify({ email: studentData.email, fullName: studentData.fullName }));

            navigate('/student/dashboard');
        } catch (error) {
            console.error(error);
            toast.error("Failed to update profile");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen bg-primary flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-secondary/5 blur-[100px]" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-[100px]" />
            </div>

            <div className="w-full max-w-2xl bg-surface/50 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl relative z-10 overflow-hidden">
                {/* Header */}
                <div className="p-8 border-b border-white/5 text-center">
                    <h1 className="text-2xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60 mb-2">
                        Student Portal
                    </h1>
                    <p className="text-slate-400 text-sm">
                        {step === 1 && !showPassword && "Verify your identity to proceed."}
                        {step === 1 && showPassword && "Welcome back! Please log in."}
                        {step === 2 && "Complete your student profile."}
                        {step === 3 && "You're all set!"}
                    </p>
                </div>

                <div className="p-8">
                    {/* STEP 1: Email Verification OR Login */}
                    {step === 1 && (
                        <form onSubmit={showPassword ? handleLogin : handleVerifyEmail} className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-300 max-w-md mx-auto">

                            {/* Email Input - Always visible but maybe disabled if showing password? Let's keep it editable just in case they typed wrong email */}
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    className="w-full bg-primary border border-white/10 rounded-xl px-4 py-3 text-white focus:border-secondary focus:outline-none transition-colors"
                                    placeholder="Enter your registered email..."
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        if (showPassword) setShowPassword(false); // Reset if they change email
                                    }}
                                />
                            </div>

                            {/* Password Fields - Only if showPassword is true */}
                            {showPassword && (
                                <div className="animate-in fade-in slide-in-from-top-2 duration-200">
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                                        <input
                                            type={isPasswordVisible ? "text" : "password"}
                                            required
                                            className="w-full bg-primary border border-white/10 rounded-xl pl-10 pr-12 py-3 text-white focus:border-secondary focus:outline-none transition-colors"
                                            placeholder="Enter your password..."
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors focus:outline-none"
                                        >
                                            {isPasswordVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                    <div className="mt-2 text-right">
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(false)}
                                            className="text-xs text-slate-400 hover:text-white transition-colors"
                                        >
                                            Use a different email?
                                        </button>
                                    </div>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-secondary text-primary font-bold uppercase tracking-wider py-4 rounded-xl hover:bg-secondary/90 transition-all flex items-center justify-center gap-2"
                            >
                                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> :
                                    showPassword ?
                                        <>Login <ArrowRight className="w-5 h-5" /></> :
                                        <>Verify Email <ArrowRight className="w-5 h-5" /></>
                                }
                            </button>
                        </form>
                    )}

                    {/* STEP 2: Profile Completion */}
                    {step === 2 && studentData && (
                        <form onSubmit={handleSubmitProfile} className="animate-in fade-in slide-in-from-right-8 duration-300">

                            <div className="flex items-center gap-4 p-4 rounded-xl bg-secondary/10 border border-secondary/20 mb-8 max-w-md mx-auto md:max-w-none">
                                <div className="w-10 h-10 rounded-full bg-secondary text-primary flex items-center justify-center font-bold">
                                    <Check className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-sm">Verified as {studentData.fullName}</h3>
                                    <p className="text-slate-400 text-xs">{studentData.email}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Profile Image */}
                                <div className="md:col-span-2 flex flex-col items-center py-4">
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">Profile Image</label>
                                    <div className="relative group">
                                        <div className="w-32 h-32 rounded-full bg-white/5 border-2 border-dashed border-white/10 flex items-center justify-center overflow-hidden group-hover:border-secondary/50 transition-colors">
                                            {formData.profileImage ? (
                                                <img src={formData.profileImage} alt="Profile" className="w-full h-full object-cover" />
                                            ) : (
                                                <User className="w-12 h-12 text-slate-600" />
                                            )}
                                        </div>

                                        <label className={`
                                            absolute bottom-0 right-0 bg-secondary text-primary p-3 rounded-full shadow-lg 
                                            hover:bg-secondary/90 transition-transform transform hover:scale-110 cursor-pointer
                                            ${loading ? 'opacity-50 cursor-not-allowed' : ''}
                                        `}>
                                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Upload className="w-5 h-5" />}
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                disabled={loading}
                                                onChange={async (e) => {
                                                    const file = e.target.files?.[0];
                                                    if (!file) return;

                                                    const uploadFormData = new FormData();
                                                    uploadFormData.append('profileImage', file);

                                                    try {
                                                        const toastId = toast.loading("Uploading...");
                                                        const { data } = await api.post('/student/upload-image', uploadFormData, {
                                                            headers: { 'Content-Type': 'multipart/form-data' }
                                                        });
                                                        setFormData(prev => ({ ...prev, profileImage: data.url }));
                                                        toast.success("Image uploaded!", { id: toastId });
                                                    } catch (error) {
                                                        console.error("Upload failed", error);
                                                        toast.error("Upload failed");
                                                    }
                                                }}
                                            />
                                        </label>
                                    </div>
                                    <p className="text-[10px] text-slate-500 mt-3">Click the icon to upload (JPG, PNG, WEBP)</p>
                                </div>

                                {/* Form Fields */}
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Address</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                                        <input
                                            type="text"
                                            name="address"
                                            required
                                            className="w-full bg-primary border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:border-secondary focus:outline-none"
                                            value={formData.address}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">College</label>
                                    <div className="relative">
                                        <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                                        <input
                                            type="text"
                                            name="college"
                                            required
                                            className="w-full bg-primary border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:border-secondary focus:outline-none"
                                            value={formData.college}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Course</label>
                                    <div className="relative">
                                        <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                                        <input
                                            type="text"
                                            name="course"
                                            required
                                            className="w-full bg-primary border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:border-secondary focus:outline-none"
                                            value={formData.course}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Year / Batch</label>
                                    <input
                                        type="text"
                                        name="year"
                                        required
                                        placeholder="e.g. 2025"
                                        className="w-full bg-primary border border-white/10 rounded-xl px-4 py-3 text-white focus:border-secondary focus:outline-none"
                                        value={formData.year}
                                        onChange={handleChange}
                                    />
                                </div>

                                {/* New Password Fields */}
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Create Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                                        <input
                                            type="password"
                                            name="createPassword"
                                            required
                                            placeholder="Min 6 characters"
                                            className="w-full bg-primary border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:border-secondary focus:outline-none"
                                            value={formData.createPassword || ''}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Confirm Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            required
                                            placeholder="Re-enter password"
                                            className="w-full bg-primary border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:border-secondary focus:outline-none"
                                            value={formData.confirmPassword || ''}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>


                                <div className="md:col-span-2">
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Bio</label>
                                    <textarea
                                        name="bio"
                                        rows="3"
                                        className="w-full bg-primary border border-white/10 rounded-xl px-4 py-3 text-white focus:border-secondary focus:outline-none"
                                        placeholder="Tell us a bit about yourself..."
                                        value={formData.bio}
                                        onChange={handleChange}
                                    ></textarea>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">LinkedIn (Optional)</label>
                                    <div className="relative">
                                        <Linkedin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                                        <input
                                            type="url"
                                            name="linkedIn"
                                            className="w-full bg-primary border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:border-secondary focus:outline-none"
                                            value={formData.linkedIn}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">GitHub (Optional)</label>
                                    <div className="relative">
                                        <Github className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                                        <input
                                            type="url"
                                            name="github"
                                            className="w-full bg-primary border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:border-secondary focus:outline-none"
                                            value={formData.github}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-secondary text-primary font-bold uppercase tracking-wider py-4 rounded-xl hover:bg-secondary/90 transition-all flex items-center justify-center gap-2 mt-8"
                            >
                                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Complete Profile"}
                            </button>
                        </form>
                    )}

                </div>
            </div>
        </div>
    );
}
