
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, User, MapPin, GraduationCap, Phone, Mail, CheckCircle2, ChevronRight, Loader2 } from 'lucide-react';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [step, setStep] = useState(0); // 0: Init, 1: Name, 2: College, 3: Branch, 4: Status, 5: Batch (Cond), 6: Sem (Cond), 7: Phone, 8: Email, 9: Done
    const [formData, setFormData] = useState({
        fullName: '',
        collegeName: '',
        branch: '',
        graduationStatus: '',
        batch: '',
        semester: '',
        phone: '',
        email: ''
    });

    // For "Others" status handling
    const [isAskingSpecificStatus, setIsAskingSpecificStatus] = useState(false);

    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const simulateBotResponse = useCallback((text, delay = 1000) => {
        setIsTyping(true);
        setTimeout(() => {
            setIsTyping(false);
            setMessages(prev => [...prev, { text, sender: 'bot' }]);
        }, delay);
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    useEffect(() => {
        if (isOpen && messages.length === 0) {
            const timer = setTimeout(() => {
                simulateBotResponse("Hi 👋 Welcome! What is your full name?", 500);
                setStep(1);
            }, 0);
            return () => clearTimeout(timer);
        }
    }, [isOpen, messages.length, simulateBotResponse]);

    // Auto-focus input when bot finishes typing
    useEffect(() => {
        if (!isTyping && isOpen && step <= 8) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isTyping, isOpen, step]);

    const handleSendMessage = (e) => {
        e?.preventDefault();

        if (!inputValue.trim()) return;

        const currentInput = inputValue.trim();
        setMessages(prev => [...prev, { text: currentInput, sender: 'user' }]);
        setInputValue('');

        processUserInput(currentInput);
    };

    const processUserInput = (input) => {
        // Step 1: Name -> College
        if (step === 1) {
            setFormData(prev => ({ ...prev, fullName: input }));
            setStep(2);
            simulateBotResponse("What is your college name?");
        }
        // Step 2: College -> Branch
        else if (step === 2) {
            setFormData(prev => ({ ...prev, collegeName: input }));
            setStep(3);
            simulateBotResponse("Which branch are you from?");
        }
        // Step 3: Branch -> Status
        else if (step === 3) {
            setFormData(prev => ({ ...prev, branch: input }));
            setStep(4);
            simulateBotResponse("What is your graduation status?", 1000);
        }
        // Step 4: Status
        else if (step === 4) {
            if (isAskingSpecificStatus) {
                setFormData(prev => ({ ...prev, graduationStatus: input }));
                setIsAskingSpecificStatus(false);
                setStep(7); // Skip Batch/Sem
                simulateBotResponse("Please enter your phone number");
            } else {
                // Fallback text input
                setFormData(prev => ({ ...prev, graduationStatus: input }));
                if (input.toLowerCase().includes('studying') || input.toLowerCase().includes('student')) {
                    setStep(5); // Go to Batch
                    simulateBotResponse("What is your batch year? (e.g., 2026-2029)");
                } else {
                    setStep(7); // Skip Batch/Sem
                    simulateBotResponse("Please enter your phone number");
                }
            }
        }
        // Step 5: Batch (Conditional) -> Semester
        else if (step === 5) {
            setFormData(prev => ({ ...prev, batch: input }));
            setStep(6);
            simulateBotResponse("Which semester are you in?");
        }
        // Step 6: Semester (Conditional) -> Phone
        else if (step === 6) {
            setFormData(prev => ({ ...prev, semester: input }));
            setStep(7);
            simulateBotResponse("Please enter your phone number");
        }
        // Step 7: Phone -> Email
        else if (step === 7) {
            if (!/^\d{10,}$/.test(input.replace(/[^0-9]/g, ''))) {
                setTimeout(() => {
                    setMessages(prev => [...prev, { text: "Please enter a valid phone number (min 10 digits).", sender: 'bot', isError: true }]);
                }, 600);
                return;
            }
            setFormData(prev => ({ ...prev, phone: input }));
            setStep(8);
            simulateBotResponse("Please enter your email address");
        }
        // Step 8: Email -> Done
        else if (step === 8) {
            if (!/\S+@\S+\.\S+/.test(input)) {
                setTimeout(() => {
                    setMessages(prev => [...prev, { text: "Please enter a valid email address.", sender: 'bot', isError: true }]);
                }, 600);
                return;
            }
            const finalData = { ...formData, email: input };
            setFormData(finalData);
            setStep(9);

            // Save to Local Storage
            const leads = JSON.parse(localStorage.getItem('courseLeads') || '[]');
            leads.push({ ...finalData, date: new Date().toISOString() });
            localStorage.setItem('courseLeads', JSON.stringify(leads));

            // Send to Google Sheets
            const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

            if (GOOGLE_SCRIPT_URL) {
                console.log("Sending data to:", GOOGLE_SCRIPT_URL);
                fetch(GOOGLE_SCRIPT_URL, {
                    method: "POST",
                    mode: "no-cors",
                    headers: {
                        "Content-Type": "text/plain", // changed from application/json to avoid preflight
                    },
                    body: JSON.stringify(finalData),
                })
                    .then(() => console.log("Request sent to Google Sheets (no-cors mode)"))
                    .catch(err => console.error("Error sending to Google Sheets:", err));
            } else {
                console.warn("Google Script URL not set. Data saved only to Local Storage.");
            }

            simulateBotResponse("Thank you! 🎉 Our team will contact you soon.");

            // Optional: Auto close after delay
            setTimeout(() => {
                // setIsOpen(false); // Can uncomment if desired
            }, 4000);
        }
    };

    const handleOptionClick = (option) => {
        setMessages(prev => [...prev, { text: option, sender: 'user' }]);

        if (option === 'Others') {
            setIsAskingSpecificStatus(true);
            simulateBotResponse("Please specify your status:");
        } else if (option === 'Studying') {
            setFormData(prev => ({ ...prev, graduationStatus: option }));
            setStep(5); // Go to Batch
            simulateBotResponse("What is your batch year? (e.g., 2022-2026)");
        } else {
            setFormData(prev => ({ ...prev, graduationStatus: option }));
            setStep(7); // Skip Batch/Sem
            simulateBotResponse("Please enter your phone number");
        }
    };

    return (
        <div className="fixed bottom-24 sm:bottom-6 right-4 sm:right-6 z-[9999] flex flex-col items-end font-sans">
            <AnimatePresence>
                {isOpen && (
                    <Motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20, transformOrigin: 'bottom right' }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="mb-4 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-[320px] sm:w-[360px] overflow-hidden border border-slate-200 dark:border-slate-700 flex flex-col h-[480px] sm:h-[550px]"
                    >
                        {/* Header */}
                        <div className="px-5 py-4 bg-gradient-to-r from-secondary to-accent text-white flex justify-between items-center shadow-md z-10">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                                        <MessageSquare className="w-5 h-5 text-white" />
                                    </div>
                                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 border-2 border-secondary rounded-full"></div>
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm leading-tight">Course Assistant</h3>
                                    <p className="text-[10px] text-white/80 font-medium">Detailed Guidance</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                            >
                                <X className="w-4 h-4 text-white" />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-950 scrollbar-thin scrollbar-thumb-slate-200">
                            {messages.map((msg, idx) => (
                                <Motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ duration: 0.3 }}
                                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[85%] px-4 py-3 text-sm shadow-sm ${msg.sender === 'user'
                                            ? 'bg-secondary text-white rounded-2xl rounded-tr-sm'
                                            : msg.isError
                                                ? 'bg-red-50 text-red-600 border border-red-100 rounded-2xl rounded-tl-sm'
                                                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-100 dark:border-slate-700 rounded-2xl rounded-tl-sm'
                                            }`}
                                    >
                                        {msg.text}
                                    </div>
                                </Motion.div>
                            ))}

                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-white dark:bg-slate-800 px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm border border-slate-100 dark:border-slate-700">
                                        <div className="flex gap-1">
                                            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Options for Step 4 (Graduation Status) */}
                            {step === 4 && !isAskingSpecificStatus && !isTyping && messages[messages.length - 1]?.sender === 'bot' && (
                                <Motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex flex-wrap gap-2 mt-2 pl-1"
                                >
                                    {['Graduated', 'Studying', 'Others'].map((opt) => (
                                        <button
                                            key={opt}
                                            onClick={() => handleOptionClick(opt)}
                                            className="px-4 py-2 bg-white dark:bg-slate-800 border border-secondary/20 hover:border-secondary hover:bg-secondary/5 text-secondary text-sm font-medium rounded-full transition-all shadow-sm hover:shadow-md"
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </Motion.div>
                            )}

                            {/* Options for Step 6 (Semester - Conditional) */}
                            {step === 6 && !isTyping && messages[messages.length - 1]?.sender === 'bot' && (
                                <Motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex flex-wrap gap-2 mt-2 pl-1 max-w-[90%]"
                                >
                                    {['1-1', '1-2', '2-1', '2-2', '3-1', '3-2', '4-1', '4-2'].map((sem) => (
                                        <button
                                            key={sem}
                                            onClick={() => {
                                                setMessages(prev => [...prev, { text: sem, sender: 'user' }]);
                                                setFormData(prev => ({ ...prev, semester: sem }));
                                                setStep(7);
                                                simulateBotResponse("Please enter your phone number");
                                            }}
                                            className="px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-secondary text-slate-700 dark:text-slate-300 text-xs font-medium rounded-lg transition-all shadow-sm hover:ring-1 hover:ring-secondary/50"
                                        >
                                            {sem}
                                        </button>
                                    ))}
                                </Motion.div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        {step <= 8 && (
                            <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
                                <form
                                    onSubmit={handleSendMessage}
                                    className="flex gap-2 items-center bg-slate-100 dark:bg-slate-800/50 rounded-full px-1 py-1 border border-transparent focus-within:border-secondary/30 focus-within:ring-2 focus-within:ring-secondary/10 transition-all"
                                >
                                    <input
                                        ref={inputRef}
                                        type={step === 7 ? "tel" : step === 8 ? "email" : "text"}
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        placeholder={
                                            step === 1 ? "Your full name..." :
                                                step === 2 ? "College Name..." :
                                                    step === 3 ? "Your branch..." :
                                                        step === 4 ? "Specify status..." :
                                                            step === 5 ? "Batch year..." :
                                                                step === 6 ? "Semester..." :
                                                                    step === 7 ? "Phone number..." :
                                                                        step === 8 ? "Email address..." : "Type here..."
                                        }
                                        className="flex-1 bg-transparent text-slate-900 dark:text-white px-4 py-2.5 focus:outline-none text-sm placeholder:text-slate-400"
                                        disabled={isTyping || (step === 4 && !isAskingSpecificStatus)}
                                        autoComplete="off"
                                    />
                                    <button
                                        type="submit"
                                        disabled={!inputValue.trim() || isTyping}
                                        className="w-9 h-9 rounded-full bg-secondary text-white flex items-center justify-center hover:bg-secondary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md flex-shrink-0"
                                    >
                                        <Send className="w-4 h-4 ml-0.5" />
                                    </button>
                                </form>
                            </div>
                        )}

                        {/* Success State Input Replacement */}
                        {step === 9 && (
                            <div className="p-4 bg-emerald-50 dark:bg-emerald-900/10 border-t border-emerald-100 dark:border-emerald-900/20 text-center">
                                <p className="text-emerald-600 dark:text-emerald-400 text-sm font-medium flex items-center justify-center gap-2">
                                    <CheckCircle2 className="w-4 h-4" /> Response Saved
                                </p>
                            </div>
                        )}
                    </Motion.div>
                )}
            </AnimatePresence>

            {/* Floating Trigger Button */}
            <AnimatePresence>
                {!isOpen && (
                    <Motion.button
                        initial={{ scale: 0, rotate: 180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: -180 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsOpen(true)}
                        className="group relative w-14 h-14 bg-gradient-to-tr from-secondary to-accent rounded-full flex items-center justify-center text-white shadow-lg shadow-secondary/30 hover:shadow-secondary/50 transition-shadow"
                    >
                        {/* Pulse Effect */}
                        <span className="absolute inset-0 rounded-full bg-secondary opacity-75 animate-ping group-hover:animate-none"></span>

                        <MessageSquare className="w-6 h-6 relative z-10" />

                        {/* Badge for notification */}
                        <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 border-2 border-white rounded-full z-20"></span>
                    </Motion.button>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Chatbot;
