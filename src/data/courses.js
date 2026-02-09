import { Globe, Code, Zap, Briefcase, Award, Rocket, Layers, IndianRupee } from 'lucide-react';
import codingFoundationsImg from '../assets/coding-foundations.jpg';
import fullStackDevImg from '../assets/full-stack-dev.jpg';
import industryReadinessImg from '../assets/industry-readiness.jpg';
import vibeCodingImg from '../assets/vibe-coding.jpg';

export const courses = [
    {
        id: 'vibestack',
        title: 'VibeStack (Fullstack + GenAI)',
        subtitle: 'Learn. Build. Earn.',
        description: 'An outcome-driven, income-focused full-stack development program utilizing AI for rapid development.',
        longDescription: 'VibeStack (Fullstack + GenAI) is a 4-month AI-powered Full Stack program that helps learners learn coding, build real projects, work with real clients, and earn money even before landing a job. It is not just a traditional course; it is a bridge to your first paycheck as a developer.',
        icon: '/favicon.png',
        gradient: 'from-blue-500 to-cyan-400',
        programDetails: {
            duration: '4 Months (16 Weeks)',
            format: 'Online & Offline Options',
        },
        philosophy: [
            'Learn full-stack development',
            'Use AI for rapid “Vibe Coding”',
            'Work on real client projects',
            'Earn money even before getting a job',
            'Optionally start freelancing or an agency'
        ],
        outcomes: [
            'Job-ready Full Stack Developer',
            'AI-powered Vibe Coder',
            'First paid client experience',
            'Freelancing / agency readiness'
        ],
        features: [
            'AI-Assisted Vibe Coding',
            'Real Client Projects',
            'Income-Focused Learning',
            'Agency & Freelancing Skills',
            'Job-Ready Portfolio'
        ],
        roadmap: [
            {
                phase: 'Month 1',
                title: 'Coding Foundations',
                objective: 'Build strong fundamentals and developer mindset.',
                shortDescription: 'Master the basics of web development with HTML, CSS, and JavaScript.',
                icon: Code,
                image: codingFoundationsImg,
                techStack: ['HTML5', 'CSS3 (Flexbox, Grid)', 'JavaScript (ES6+)', 'Git & GitHub'],
                projects: [
                    'Personal Portfolio Website',
                    'Responsive Business Landing Page',
                    'JavaScript Mini Apps (To-Do, Calculator, Form Validation)'
                ],
                outcomes: [
                    'Understand how the web works',
                    'Build responsive websites',
                    'Write clean JavaScript',
                    'Use Git for version control'
                ]
            },
            {
                phase: 'Month 2',
                title: 'Full Stack Development',
                objective: 'Make learners capable of building complete applications end-to-end.',
                shortDescription: 'Build scalable web apps using the MERN stack (MongoDB, Express, React, Node).',
                icon: Layers,
                image: fullStackDevImg,
                techStack: ['Frontend: React.js', 'Backend: Node.js + Express.js', 'Database: MongoDB', 'Rest APIs', 'Deployment (Vercel / Render)'],
                projects: [
                    'Full Stack Blog Application',
                    'User Authentication System',
                    'Dashboard App (Admin & User Roles)'
                ],
                outcomes: [
                    'Build scalable full-stack apps',
                    'Handle backend logic',
                    'Work with databases',
                    'Deploy applications live'
                ]
            },
            {
                phase: 'Month 3',
                title: 'Industry & Placement Readiness',
                objective: 'Make learners professional, job-ready, and team-ready.',
                shortDescription: 'Prepare for the workforce with real-world workflows and interview prep.',
                icon: Briefcase,
                image: industryReadinessImg,
                techStack: ['Clean Code Practices', 'API Integrations', 'Performance Optimization', 'Agile & Team Workflows'],
                projects: [
                    'Capstone Project (E-Commerce, SaaS, CRM, or LMS)',
                    'Collaboration via GitHub Issues & PRs'
                ],
                outcomes: [
                    'Professional Developer Profile',
                    'Team Collaboration Skills',
                    'Optimized Resume & LinkedIn',
                    'Mock Interview Readiness'
                ]
            },
            {
                phase: 'Month 4',
                title: 'Vibe Coding + AI + Client Mode',
                objective: 'Convert learners from developers → earners.',
                shortDescription: 'Leverage AI for speed and start earning with real client projects.',
                icon: IndianRupee,
                image: vibeCodingImg,
                techStack: ['AI Tools (ChatGPT, Copilot, Cursor)', 'Prompt Engineering', 'Rapid MVP Building'],
                projects: [
                    'Real Client Project (for qualified learners)',
                    'Freelance Profile Setup (Upwork, Fiverr)',
                    'Cold Outreach Scripts'
                ],
                outcomes: [
                    'Build projects in days, not weeks',
                    'Client Communication & Pricing Skills',
                    'First Income Proof',
                    'Freelancing / Agency Readiness'
                ]
            }
        ],
        clientProject: {
            title: 'VibeStack (Fullstack + GenAI) Client Challenge',
            description: 'Only learners who complete all mandatory projects and clear evaluations will receive a real client project provided by VibeStack (Fullstack + GenAI).',
            examples: ['Website for local business', 'Startup landing page', 'Admin dashboard', 'Internal automation tool'],
            revenueModel: {
                clientPays: '₹30,000',
                studentEarns: '₹20,000',
                vibeStackEarns: '₹10,000'
            },
            purpose: [
                'First income proof',
                'Confidence boost',
                'Real-world experience',
                'Strong trust in the program'
            ]
        },
        pricing: {
            offline: {
                actualFee: '₹25,000',
                earlyBirdFee: '₹20,000',
            },
            online: {
                actualFee: '₹20,000',
                earlyBirdFee: '₹15,000',
            },
            discountNote: 'Early Bird Offer'
        }
    }
];
