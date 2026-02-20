import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';

import Contact from './pages/Contact';
import Work from './pages/Work';
import ProjectDetail from './pages/ProjectDetail';
import Careers from './pages/Careers';
import JobApplication from './pages/JobApplication';
import Announcements from './pages/Announcements';
import CourseDetail from './pages/CourseDetail';
import CampusTechAccess from './pages/CampusTechAccess';
import CollegeRegistration from './pages/CollegeRegistration';
import StudentLogin from './pages/StudentLogin';

import ScrollToTop from './components/ScrollToTop';

import { Navigate, Outlet } from 'react-router-dom';
import AdminLayout from './pages/admin/AdminLayout';
import AdminStudents from './pages/admin/AdminStudents';
import AdminStudentSearch from './pages/admin/AdminStudentSearch';
import AdminStudentPayment from './pages/admin/AdminStudentPayment';
import AdminTasks from './pages/admin/AdminTasks';
import AdminLogin from './pages/admin/AdminLogin';
import StudentDashboard from './pages/StudentDashboard';
import StudentLayout from './pages/StudentLayout';
import StudentClasses from './pages/StudentClasses';
import StudentTasks from './pages/StudentTasks';
import StudentProfile from './pages/StudentProfile';
import StudentEarnings from './pages/StudentEarnings';
import StudentReferral from './pages/StudentReferral';
import NotFound from './pages/NotFound';

function MainLayout() {
    return (
        <div className="bg-primary min-h-screen text-white selection:bg-secondary selection:text-primary">
            <Navbar />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

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
            <Routes>
                {/* Admin Auth */}
                <Route path="/kodersparkasadmin" element={<AdminLogin />} />

                {/* Admin Dashboard Routes */}
                <Route path="/ks-admin" element={<AdminLayout />}>
                    <Route index element={<Navigate to="students" replace />} />
                    <Route path="students" element={<AdminStudents />} />
                    <Route path="search" element={<AdminStudentSearch />} />
                    <Route path="payments" element={<AdminStudentPayment />} />
                    <Route path="tasks" element={<AdminTasks />} />
                </Route>

                {/* Student Login (No Layout) */}
                <Route path="/studentloginks" element={<StudentLogin />} />

                {/* Student Dashboard Routes */}
                <Route path="/student" element={<StudentLayout />}>
                    <Route index element={<Navigate to="dashboard" replace />} />
                    <Route path="dashboard" element={<StudentDashboard />} />
                    <Route path="classes" element={<StudentClasses />} />
                    <Route path="tasks" element={<StudentTasks />} />
                    <Route path="earnings" element={<StudentEarnings />} />
                    <Route path="refer-earn" element={<StudentReferral />} />
                    <Route path="profile" element={<StudentProfile />} />
                </Route>

                {/* Public Routes */}
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/program" element={<Navigate to="/program/fullstack-genai" replace />} />
                    <Route path="/program/:id" element={<CourseDetail />} />
                    <Route path="/campus-tech-access" element={<CampusTechAccess />} />
                    <Route path="/college-registration" element={<CollegeRegistration />} />
                    <Route path="/work" element={<Work />} />
                    <Route path="/work/:id" element={<ProjectDetail />} />
                    <Route path="/careers" element={<Careers />} />
                    <Route path="/careers/apply/:id" element={<JobApplication />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/announcements" element={<Announcements />} />
                </Route>

                {/* 404 Catch-all */}
                <Route path="*" element={<NotFound />} />
            </Routes>

            <Toaster
                position="bottom-right"
                reverseOrder={false}
                containerStyle={{
                    zIndex: 99999,
                }}
            />
        </Router>
    );
}

export default App;
