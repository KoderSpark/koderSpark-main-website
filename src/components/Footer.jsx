import React from 'react';
import { Instagram, Linkedin, Youtube, Mail, MapPin, Phone, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="relative bg-primary border-t border-white/10 pt-16 pb-8 overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-20">
                <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-secondary/20 to-transparent blur-3xl"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold font-heading text-white">Koder Spark</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Building the future of web and mobile experiences. We transform ideas into powerful digital solutions with clean, modern, and performant code.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold text-white mb-6">Quick Links</h4>
                        <ul className="space-y-3 text-sm text-slate-400">
                            <li><Link to="/" className="hover:text-secondary transition-colors flex items-center gap-2">Home</Link></li>
                            <li><Link to="/work" className="hover:text-secondary transition-colors flex items-center gap-2">Our Work</Link></li>
                            <li><Link to="/careers" className="hover:text-secondary transition-colors flex items-center gap-2 animate-shine">Careers</Link></li>
                            <li><Link to="/program" className="hover:text-secondary transition-colors flex items-center gap-2">Program</Link></li>
                            <li><Link to="/contact" className="hover:text-secondary transition-colors flex items-center gap-2">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-bold text-white mb-6">Contact Us</h4>
                        <ul className="space-y-4 text-sm text-slate-400">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                                <span>Mayuri Tech Park, KoderSpark, 4th floor, Mangalagiri, Andhra Pradesh 522503</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-secondary shrink-0" />
                                <a href="mailto:support@koderspark.in" className="hover:text-white transition-colors">support@koderspark.in</a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-secondary shrink-0" />
                                <a href="tel:+919866293371" className="hover:text-white transition-colors">+91 98662 93371</a>
                            </li>
                        </ul>
                    </div>

                    {/* Social Links */}
                    <div>
                        <h4 className="text-lg font-bold text-white mb-6">Follow Us</h4>
                        <div className="flex flex-wrap gap-4">
                            <a
                                href="https://www.instagram.com/koder_spark/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:text-white transition-all hover:-translate-y-1"
                                aria-label="Instagram"
                            >
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a
                                href="https://www.linkedin.com/company/koder-spark"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-[#0077b5] hover:text-white transition-all hover:-translate-y-1"
                                aria-label="LinkedIn"
                            >
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a
                                href="https://chat.whatsapp.com/LB8e8FY9rNWDsshvp8QU3W"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-[#25D366] hover:text-white transition-all hover:-translate-y-1"
                                aria-label="WhatsApp"
                            >
                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                </svg>
                            </a>
                            <a
                                href="https://www.youtube.com/@Koder_Spark"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-[#FF0000] hover:text-white transition-all hover:-translate-y-1"
                                aria-label="YouTube"
                            >
                                <Youtube className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 text-center text-sm text-slate-500">
                    <p>&copy; {new Date().getFullYear()} Koder Spark PVT LTD. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
