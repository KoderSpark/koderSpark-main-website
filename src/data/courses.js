import { Globe, Code, Zap, Briefcase, Award, Rocket, Layers, IndianRupee } from 'lucide-react';
import codingFoundationsImg from '../assets/coding-foundations.webp';
import fullStackDevImg from '../assets/full-stack-dev.webp';
import industryReadinessImg from '../assets/industry-readiness.webp';
import vibeCodingImg from '../assets/vibe-coding.webp';

export const courses = [
    {
        id: 'fullstack-genai',
        title: 'FULL STACK + GENERATIVE AI PROGRAM',
        subtitle: 'Become a Full Stack + AI Developer in 120 Days',
        description: 'This 4-month intensive program is designed to transform beginners into industry-ready Full Stack Developers with Generative AI integration expertise.',
        longDescription: 'This 4-month intensive program is designed to transform beginners into industry-ready Full Stack Developers with Generative AI integration expertise. Students build real-world applications and client-level systems.',
        icon: '/favicon.webp', // Keeping existing icon for now
        gradient: 'from-blue-500 to-cyan-400',
        programDetails: {
            duration: '4 Months (Intensive Career Accelerator)',
            format: 'Online & Offline Options',
        },
        philosophy: [
            'Become a Full Stack + AI Developer in 120 Days',
            'Build real-world, client-ready projects',
            'Transform from beginner to industry-ready',
            'Gain Generative AI integration expertise'
        ],
        outcomes: [
            'Full Stack Developer',
            'AI Application Developer',
            'Freelance AI Automation Developer',
            'Startup-Ready Technical Founder'
        ],
        features: [
            'Introduction to AI/ML Concepts',
            'Cloud Computing Basics',
            'Cybersecurity Fundamentals',
            'Data Science Overview'
        ],
        roadmap: [
            {
                phase: 'Month 1',
                title: 'Frontend Development',
                objective: 'Master the basics of web development.',
                shortDescription: 'HTML, CSS, JavaScript, React',
                icon: Code,
                image: codingFoundationsImg,
                techStack: ['HTML', 'CSS', 'JavaScript', 'React'],
                projects: [
                    'Personal Portfolio Website',
                    'Responsive Business Landing Page',
                    'Interactive Web Applications'
                ],
                outcomes: [
                    'Proficiency in Frontend Technologies',
                    'Ability to build responsive UIs',
                    'Understanding of Component-Based Architecture'
                ]
            },
            {
                phase: 'Month 2',
                title: 'Backend Development',
                objective: 'Build robust server-side applications.',
                shortDescription: 'Node.js, Express.js, MongoDB',
                icon: Layers,
                image: fullStackDevImg,
                techStack: ['Node.js', 'Express.js', 'MongoDB'],
                projects: [
                    'RESTful API Development',
                    'Database Schema Design',
                    'Backend Integration with Frontend'
                ],
                outcomes: [
                    'Server-side Logic Implementation',
                    'Database Management Skills',
                    'API Development Proficiency'
                ]
            },
            {
                phase: 'Month 3',
                title: 'Advanced Concepts',
                objective: 'Master advanced full-stack concepts.',
                shortDescription: 'Authentication, Payments, Deployment, APIs',
                icon: Briefcase,
                image: industryReadinessImg,
                techStack: ['Authentication', 'Payment Gateways', 'Deployment', 'Advanced APIs'],
                projects: [
                    'Secure Authentication System',
                    'E-commerce Platform with Payments',
                    'Cloud Deployment'
                ],
                outcomes: [
                    'Secure Application Development',
                    'Third-party Service Integration',
                    'Production Deployment Skills'
                ]
            },
            {
                phase: 'Month 4',
                title: 'Generative AI Integration',
                objective: 'Integrate AI capabilities into applications.',
                shortDescription: 'Concepts, API Integration, Real-world Implementation',
                icon: Rocket,
                image: vibeCodingImg,
                techStack: ['Generative AI Concepts', 'LLM API Integration', 'AI-Powered Features'],
                projects: [
                    'AI-Enhanced Web Application',
                    'Chatbot Integration',
                    'Content Generation Tools'
                ],
                outcomes: [
                    'AI Integration Expertise',
                    'Building Intelligent Applications',
                    'Understanding of GenAI Landscape'
                ]
            }
        ],
        plans: [ // Renamed from pricing to plans to match the tiers structure better, or keep pricing but change structure
            {
                name: 'Premium Plan',
                price: '₹15,000',
                features: [
                    'Live classes',
                    '1 Client Project',
                    'GenAI capstone',
                    'Freelance setup',
                    'Internship assistance',
                    '1:1 mentorship',
                    'Placement support'
                ]
            },
            {
                name: 'Pro Plan',
                price: '₹7,500',
                features: [
                    'Live classes',
                    '1 major project',
                    'Portfolio building',
                    'Internship assistance',
                    'Freelance guidance'
                ]
            },
            {
                name: 'Basic Plan',
                price: '₹2,500',
                features: [
                    'Recorded classes',
                    'Assignments',
                    'Community support',
                    'Job/internship updates'
                ]
            }
        ],
        additionalModules: {
            title: 'Post-Program Specializations',
            description: 'After completing the 4-month core program, you can opt for these advanced specializations to further boost your career.',
            modules: [
                'Introduction to AI/ML Concepts',
                'Cloud Computing Basics',
                'Cybersecurity Fundamentals',
                'Data Science Overview'
            ],
            note: 'Available as optional add-ons. Contact for pricing.'
        }
    }
];
