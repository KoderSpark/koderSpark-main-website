import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Program from './pages/Program';
import Contact from './pages/Contact';
import Work from './pages/Work';
import ProjectDetail from './pages/ProjectDetail';
import Careers from './pages/Careers';
import JobApplication from './pages/JobApplication';
import Announcements from './pages/Announcements';

import ScrollToTop from './components/ScrollToTop';
import GradualBlur from './components/GradualBlur';

function App() {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
        });

        window.lenis = lenis;

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
            window.lenis = null;
        };
    }, []);

    return (
        <Router>
            <ScrollToTop />
            <div className="bg-primary min-h-screen text-white selection:bg-secondary selection:text-primary">
                <Navbar />
                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/program" element={<Program />} />
                        <Route path="/work" element={<Work />} />
                        <Route path="/work/:id" element={<ProjectDetail />} />
                        <Route path="/careers" element={<Careers />} />
                        <Route path="/careers/apply/:id" element={<JobApplication />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/announcements" element={<Announcements />} />
                    </Routes>
                </main>
                <Footer />
                <Toaster position="bottom-right" reverseOrder={false} />
                <GradualBlur
                    target="page"
                    position="bottom"
                    height="6rem"
                    strength={2}
                    divCount={5}
                    curve="bezier"
                    exponential={true}
                    opacity={1}
                />
            </div>
        </Router>
    );
}

export default App;
