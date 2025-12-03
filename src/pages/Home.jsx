import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Smartphone, Zap, ArrowRight, ArrowUp, CheckCircle2, Globe, Layers, Shield, Rocket } from 'lucide-react';
import LogoLoader from '../components/LogoLoader';

const heroImages = [
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=2070&q=80",
];

// Animation Variants
const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1.0] }
    }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] }
    }
};

const Home = () => {
    const [currentImage, setCurrentImage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const handleConsultationClick = () => {
        setIsLoading(true);
        setTimeout(() => {
            window.open('https://calendly.com/koderspark/30min', '_blank');
            setIsLoading(false);
        }, 1500);
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % heroImages.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="min-h-screen bg-primary font-sans text-slate-200 selection:bg-secondary/30">
            {/* Background Noise Texture */}
            <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center px-6 pt-24 lg:pt-0 lg:px-12 overflow-hidden">
                {/* Background Slider */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent z-10"></div>
                    <AnimatePresence initial={false}>
                        <motion.img
                            key={currentImage}
                            src={heroImages[currentImage]}
                            initial={{ scale: 1.1, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                            alt="Background"
                            className="absolute inset-0 w-full h-full object-cover opacity-50"
                        />
                    </AnimatePresence>
                </div>

                <div className="relative z-20 max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        className="space-y-8"
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.div
                            variants={fadeInUp}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm"
                        >
                            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                            <span className="text-sm font-medium text-secondary tracking-wide uppercase">Available for new projects</span>
                        </motion.div>

                        <motion.h1
                            variants={fadeInUp}
                            className="text-5xl lg:text-7xl font-bold font-heading text-white leading-tight"
                        >
                            Expert Web & <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent">Mobile App Dev</span>
                        </motion.h1>

                        <motion.p
                            variants={fadeInUp}
                            className="text-xl text-slate-400 max-w-xl leading-relaxed"
                        >
                            We transform complex challenges into elegant, high-performance digital solutions. Elevate your brand with our expert development and design.
                        </motion.p>

                        <motion.div
                            variants={fadeInUp}
                            className="flex flex-wrap gap-4"
                        >
                            <Link to="/contact" className="px-8 py-4 bg-secondary text-primary font-bold rounded-full hover:bg-secondary/90 transition-all transform hover:scale-105 flex items-center gap-2 shadow-[0_0_20px_rgba(56,189,248,0.3)]">
                                Start Your Journey <ArrowRight className="w-5 h-5" />
                            </Link>
                            <Link to="/work" className="px-8 py-4 border border-white/10 bg-white/5 backdrop-blur-sm text-white font-bold rounded-full hover:bg-white/10 transition-all">
                                View Our Work
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
                >
                    <span className="text-xs uppercase tracking-widest text-slate-500">Scroll</span>
                    <div className="w-[1px] h-12 bg-gradient-to-b from-secondary to-transparent"></div>
                </motion.div>
            </section>

            {/* Services Section - Bento Grid */}
            <section className="min-h-screen flex flex-col justify-center py-20 px-6 lg:px-12 relative z-10">
                <div className="max-w-7xl mx-auto w-full">
                    <div className="mb-16">
                        <h2 className="text-sm font-bold text-secondary uppercase tracking-widest mb-2">Our Expertise</h2>
                        <h3 className="text-4xl lg:text-5xl font-bold font-heading text-white">Comprehensive Digital Solutions</h3>
                    </div>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[400px]"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        {/* Web Dev - Large Card */}
                        <motion.div
                            variants={fadeInUp}
                            className="md:col-span-2 rounded-3xl bg-surface border border-white/5 overflow-hidden relative group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/90 z-10"></div>
                            <img
                                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80"
                                alt="Web Development"
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute bottom-0 left-0 p-8 z-20">
                                <div className="w-12 h-12 rounded-2xl bg-icon1/20 flex items-center justify-center mb-4 backdrop-blur-md border border-icon1/20">
                                    <Code className="w-6 h-6 text-icon1" />
                                </div>
                                <h4 className="text-3xl font-bold text-white mb-2">Web Development</h4>
                                <p className="text-slate-300 max-w-md mb-4">Scalable, high-performance websites built with modern frameworks.</p>
                                <div className="flex flex-wrap gap-2">
                                    {['React', 'Next.js', 'Tailwind', 'Node.js'].map((tech, i) => (
                                        <span key={i} className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-medium text-white border border-white/10">{tech}</span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* App Dev - Tall Card */}
                        <motion.div
                            variants={fadeInUp}
                            className="md:row-span-2 rounded-3xl bg-surface border border-white/5 overflow-hidden relative group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/90 z-10"></div>
                            <img
                                src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80"
                                alt="App Development"
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute bottom-0 left-0 p-8 z-20">
                                <div className="w-12 h-12 rounded-2xl bg-icon2/20 flex items-center justify-center mb-4 backdrop-blur-md border border-icon2/20">
                                    <Smartphone className="w-6 h-6 text-icon2" />
                                </div>
                                <h4 className="text-3xl font-bold text-white mb-2">Mobile Apps</h4>
                                <p className="text-slate-300 mb-4">Native and cross-platform solutions for iOS and Android.</p>
                                <div className="flex flex-wrap gap-2">
                                    {['Flutter', 'React Native', 'iOS', 'Android'].map((tech, i) => (
                                        <span key={i} className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-medium text-white border border-white/10">{tech}</span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* Web Dev Info - Standard Card */}
                        <motion.div
                            variants={fadeInUp}
                            className="rounded-3xl bg-surface border border-white/5 p-8 flex flex-col justify-between group hover:border-secondary/30 transition-colors relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
                                <ArrowUp className="w-12 h-12 text-secondary transform rotate-0" />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-white mb-4">Why Custom Web?</h4>
                                <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                                    Your website is your digital storefront. We build custom solutions that are secure, scalable, and designed to convert visitors into customers.
                                </p>
                                <ul className="space-y-3">
                                    {[
                                        'SEO Optimized for Visibility',
                                        'Blazing Fast Performance',
                                        'Enhanced Security',
                                        'Scalable Architecture'
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center text-slate-300 text-sm font-medium">
                                            <div className="w-1.5 h-1.5 rounded-full bg-secondary mr-2"></div>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-6">
                                <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Web Development Expertise</p>
                            </div>
                        </motion.div>

                        {/* App Dev Info - Standard Card */}
                        <motion.div
                            variants={fadeInUp}
                            className="rounded-3xl bg-surface border border-white/5 p-8 flex flex-col justify-between group hover:border-secondary/30 transition-colors relative overflow-hidden"
                        >
                            <div className="absolute top-1/2 -translate-y-1/2 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
                                <ArrowRight className="w-12 h-12 text-secondary" />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-white mb-4">Mobile First Strategy</h4>
                                <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                                    Reach your audience anywhere. We create intuitive mobile experiences that feel native on every device.
                                </p>
                                <ul className="space-y-3">
                                    {[
                                        'Seamless iOS & Android',
                                        'Native-Like Performance',
                                        'Offline Capabilities',
                                        'User-Centric Design'
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center text-slate-300 text-sm font-medium">
                                            <div className="w-1.5 h-1.5 rounded-full bg-icon2 mr-2"></div>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-6">
                                <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">App Development Expertise</p>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* About Section - Asymmetric Layout */}
            < section className="min-h-screen flex items-center py-20 px-6 lg:px-12 bg-surface relative overflow-hidden" >
                {/* Decorative Elements */}
                < div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/50 to-transparent pointer-events-none" ></div >

                <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    <div className="lg:col-span-7 relative">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="relative z-10 rounded-[2rem] overflow-hidden shadow-2xl border border-white/5"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
                                alt="Team working"
                                className="w-full h-auto"
                            />
                        </motion.div>
                        {/* Floating Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="absolute -bottom-10 -right-10 z-20 bg-secondary text-primary p-8 rounded-[2rem] shadow-xl hidden md:block"
                        >
                            <p className="text-4xl font-bold font-heading">2+</p>
                            <p className="font-medium">Years of<br />Excellence</p>
                        </motion.div>
                    </div>

                    <motion.div
                        className="lg:col-span-5 space-y-8"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <motion.div variants={fadeInUp}>
                            <h2 className="text-sm font-bold text-secondary uppercase tracking-widest mb-2">About Us</h2>
                            <h3 className="text-4xl font-bold font-heading text-white mb-6">Innovators at Heart, <br />Developers by Trade.</h3>
                        </motion.div>
                        <motion.p
                            variants={fadeInUp}
                            className="text-slate-400 text-lg leading-relaxed"
                        >
                            Koder Spark is more than just a dev shop. We are a collective of visionaries dedicated to pushing the boundaries of what's possible on the web. We believe in code that is as beautiful as the design it powers.
                        </motion.p>
                        <ul className="space-y-4">
                            {['Agile Methodology', 'Clean Architecture', 'User-Centric Design'].map((item, i) => (
                                <motion.li
                                    key={i}
                                    variants={fadeInUp}
                                    className="flex items-center text-slate-300"
                                >
                                    <CheckCircle2 className="w-5 h-5 text-secondary mr-3" />
                                    {item}
                                </motion.li>
                            ))}
                        </ul>

                    </motion.div>
                </div>
            </section >

            {/* CTA Section */}
            <section className="min-h-screen flex items-center justify-center px-6 lg:px-12 relative overflow-hidden py-20">
                <div className="absolute inset-0 bg-gradient-to-b from-primary to-surface z-0"></div>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-secondary/10 via-primary/0 to-primary/0 z-0"></div>

                <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                    <motion.div
                        className="space-y-8 text-center lg:text-left order-2 lg:order-1"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <motion.h2
                            variants={fadeInUp}
                            className="text-5xl md:text-7xl font-bold font-heading text-white leading-tight"
                        >
                            Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent">Ignite</span> Your Project?
                        </motion.h2>
                        <motion.p
                            variants={fadeInUp}
                            className="text-xl text-slate-400 max-w-2xl mx-auto lg:mx-0"
                        >
                            Let's collaborate to build something extraordinary. Whether you need a high-performance website or a cutting-edge mobile app, our technical expertise brings your vision to life.
                        </motion.p>

                        <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <motion.button
                                onClick={handleConsultationClick}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-12 py-5 bg-white text-primary font-bold rounded-full text-lg shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)] transition-all flex items-center justify-center gap-2"
                            >
                                Schedule a Consultation <ArrowRight className="w-5 h-5" />
                            </motion.button>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="relative order-1 lg:order-2"
                    >
                        <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl group">
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-transparent to-transparent z-10"></div>
                            <img
                                src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
                                alt="Team Collaboration"
                                className="w-full aspect-[4/5] lg:aspect-square object-cover transition-transform duration-700 group-hover:scale-105"
                            />

                            {/* Floating Benefits Card */}
                            <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                                <div className="bg-surface/80 backdrop-blur-md border border-white/10 rounded-3xl p-6 shadow-lg">
                                    <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">What We Deliver</h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {[
                                            { icon: Rocket, text: "Rapid Prototyping" },
                                            { icon: Layers, text: "Scalable Architecture" },
                                            { icon: Shield, text: "Enterprise Security" },
                                            { icon: Zap, text: "High Performance" }
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-center gap-3 text-slate-300">
                                                <div className="p-2 rounded-full bg-white/5 border border-white/5">
                                                    <item.icon className="w-4 h-4 text-secondary" />
                                                </div>
                                                <span className="text-sm font-medium">{item.text}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-secondary/20 rounded-full blur-3xl -z-10"></div>
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl -z-10"></div>
                    </motion.div>
                </div>
            </section>
            <AnimatePresence>
                {isLoading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50"
                    >
                        <LogoLoader />
                    </motion.div>
                )}
            </AnimatePresence>
        </div >
    );
};

export default Home;
