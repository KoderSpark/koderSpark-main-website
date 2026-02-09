import React from 'react';
import { motion as Motion } from 'framer-motion';
import { Wallet, Users } from 'lucide-react';

export default function StudentReferral() {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1 }
    };

    return (
        <div className="max-w-6xl mx-auto">
            <Motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="space-y-8"
            >
                {/* Header */}
                <Motion.div variants={item} className="text-center md:text-left">
                    <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
                        Grow Your <span className="text-secondary">Community</span>
                    </h1>
                    <p className="text-slate-400 text-lg max-w-2xl">
                        Invite your friends to Koderspark. Help them start their journey, and earn rewards for every successful admission.
                    </p>
                </Motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Main Content - Left Col */}
                    <Motion.div variants={item} className="lg:col-span-8 space-y-6">
                        {/* Steps Card */}
                        <div className="bg-surface border border-white/10 rounded-2xl p-6">
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                <Users className="w-5 h-5 text-secondary" />
                                How it works
                            </h2>

                            <div className="grid gap-6">
                                <div className="flex gap-4 group">
                                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-bold text-lg text-secondary group-hover:scale-110 transition-transform duration-300">1</div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-1">Fill the Form</h3>
                                        <p className="text-slate-400 text-sm leading-relaxed">
                                            Enter your friend's details in the referral form. Make sure the information is accurate so we can reach out to them.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4 group">
                                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-bold text-lg text-secondary group-hover:scale-110 transition-transform duration-300">2</div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-1">Friend Joins</h3>
                                        <p className="text-slate-400 text-sm leading-relaxed">
                                            Your friend enrolls in one of our courses. The admission process must be completed for the referral to be valid.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4 group">
                                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-bold text-lg text-secondary group-hover:scale-110 transition-transform duration-300">3</div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-1">You Get Paid</h3>
                                        <p className="text-slate-400 text-sm leading-relaxed">
                                            Once verified, you receive <span className="text-white font-bold">₹2500</span> directly to your account.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Motion.div>

                    {/* Sidebar - Right Col */}
                    <Motion.div variants={item} className="lg:col-span-4 space-y-6">
                        {/* Reward Card */}
                        <div className="bg-secondary text-white rounded-2xl p-6 text-center relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 pointer-events-none transition-transform duration-500 group-hover:scale-150" />

                            <Wallet className="w-10 h-10 mx-auto mb-3" />
                            <div className="text-xs font-bold uppercase tracking-widest mb-2 opacity-90">You Earn</div>
                            <div className="text-4xl font-black mb-1">₹2500</div>
                            <div className="text-xs opacity-75 mb-6">Per successful referral</div>

                            <a
                                href="https://forms.gle/xJDYhERZsd71ViVWA"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full bg-white text-secondary py-3 rounded-xl font-black uppercase tracking-widest hover:bg-slate-100 transition-colors text-sm"
                            >
                                Refer Now
                            </a>
                        </div>

                        {/* Terms Card */}
                        <div className="bg-surface border border-white/10 rounded-2xl p-5">
                            <h3 className="font-bold text-white mb-3 text-sm uppercase tracking-wider">Terms & Conditions</h3>
                            <ul className="space-y-2 text-xs text-slate-500">
                                <li className="flex items-start gap-2">
                                    <span className="w-1 h-1 bg-slate-500 rounded-full mt-1.5" />
                                    <span>Referral is valid only for new student admissions.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1 h-1 bg-slate-500 rounded-full mt-1.5" />
                                    <span>Payouts are processed within 7 days of admission confirmation.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1 h-1 bg-slate-500 rounded-full mt-1.5" />
                                    <span>Program rules are subject to change.</span>
                                </li>
                            </ul>
                        </div>
                    </Motion.div>
                </div>
            </Motion.div>
        </div>
    );
}
