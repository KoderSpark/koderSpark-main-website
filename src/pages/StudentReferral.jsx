import React from 'react';
import { ExternalLink, Users, Gift, ArrowRight } from 'lucide-react';

export default function StudentReferral() {
    return (
        <div className="space-y-8 animate-in fade-in zoom-in duration-500">
            {/* Header */}
            <div>
                <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter">
                    Refer & <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-secondary/60">Earn</span>
                </h1>
                <p className="text-slate-400 mt-2 font-medium">Invite your friends to Koderspark and earn rewards together.</p>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Instructions Card */}
                <div className="bg-surface/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 relative overflow-hidden group hover:border-white/20 transition-all duration-300">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 blur-[80px] rounded-full -mr-32 -mt-32 pointer-events-none" />

                    <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-3">
                        <Gift className="w-6 h-6 text-secondary" />
                        How it works
                    </h2>

                    <div className="space-y-8 relative">
                        {/* Step 1 */}
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-bold text-secondary">1</div>
                            <div>
                                <h3 className="text-lg font-bold text-white mb-1">Fill the Form</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    Click the button below to open the referral form. Enter your details and your friend's details accurately.
                                </p>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-bold text-secondary">2</div>
                            <div>
                                <h3 className="text-lg font-bold text-white mb-1">Friend Joins</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    Your friend must enroll in a course at Koderspark using your referral.
                                </p>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-bold text-secondary">3</div>
                            <div>
                                <h3 className="text-lg font-bold text-white mb-1">You Earn ₹2500</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    Once their admission is confirmed, you will receive <span className="text-white font-bold">₹2500</span> directly!
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10">
                        <a
                            href="https://forms.gle/xJDYhERZsd71ViVWA"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-xl font-black uppercase tracking-widest hover:bg-secondary hover:text-white transition-all duration-300 transform hover:-translate-y-1 shadow-xl hover:shadow-secondary/20"
                        >
                            Start Referring
                            <ExternalLink className="w-4 h-4" />
                        </a>
                    </div>
                </div>

                {/* Stats / Info Card */}
                <div className="space-y-6">
                    <div className="bg-gradient-to-br from-secondary/20 to-secondary/5 border border-secondary/20 rounded-3xl p-8 text-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-secondary/10 blur-xl"></div>
                        <div className="relative z-10">
                            <Users className="w-12 h-12 text-secondary mx-auto mb-4" />
                            <h3 className="text-4xl font-black text-white mb-2">₹2500</h3>
                            <p className="text-secondary font-bold uppercase tracking-widest text-sm">Per Successful Referral</p>
                        </div>
                    </div>

                    <div className="bg-surface/30 border border-white/10 rounded-3xl p-8">
                        <h3 className="text-lg font-bold text-white mb-4">Terms & Conditions</h3>
                        <ul className="space-y-3 text-sm text-slate-400">
                            <li className="flex items-start gap-2">
                                <ArrowRight className="w-4 h-4 text-white/20 mt-0.5 flex-shrink-0" />
                                <span>The referred student must implement the complete admission process.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <ArrowRight className="w-4 h-4 text-white/20 mt-0.5 flex-shrink-0" />
                                <span>Rewards are processed within 7 days of successful enrollment.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <ArrowRight className="w-4 h-4 text-white/20 mt-0.5 flex-shrink-0" />
                                <span>Multiple referrals are allowed and encouraged!</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
