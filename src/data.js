// src/data.js
import ceoImage from './assets/ceo-photo.jpg'; // <-- Add this line
import Abhinav from './assets/lead-dev.png'; // <-- Add this line
// import johnSmithImage from './assets/ui-designer.png'; // <-- Add this line
import workImage1 from './assets/Project-Ayurveda.png'; 
// You can keep using Unsplash for other works or import your own
// import workImage2 from 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2070&auto=format&fit=crop';
// import workImage3 from 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=2070&auto=format&fit=crop';
import clientLogo1 from './assets/swastham-ayurveda-logo.png'; // Create placeholder images
import clientLogo2 from './assets/globallabs-logo.png';
// import clientLogo3 from './assets/placeholder-logo-3.png';
// import clientLogo4 from './assets/placeholder-logo-4.png';
// import clientLogo5 from './assets/placeholder-logo-5.png';

import reactLogo from './assets/techStack/logo-react.png';
import nodejsLogo from './assets/techStack/logo-nodejs.png';
import mongodbLogo from './assets/techStack/logo-mongodb.png';
import bootstrapLogo from './assets/techStack/logo-bootstrap.png';
import typescriptLogo from './assets/techStack/logo-typescript.png';
import javascriptLogo from './assets/techStack/logo-javaScript.png';
import figmaLogo from './assets/techStack/logo-figma.png';
import pythonLogo from './assets/techStack/logo-python.png';

import serviceWebappImg from './assets/service-webapp.jpg';
import serviceWebsiteImg from './assets/service-website.jpg';
import serviceCyberImg from './assets/service-cyber.jpg';
import serviceAiImg from './assets/service-ai (1).jpg';
import { img } from 'framer-motion/client';

export const services = [
    {
        title: "Web Application Development",
        description: "Building powerful, scalable, and secure web applications tailored to your business logic using React and Node.js.",
        img: serviceWebappImg,
    },
    {
        title: "Modern Website Creation",
        description: "Designing and developing stunning, responsive, and memorable websites that captivate your audience.",
        img: serviceWebsiteImg,
    },
    {
        title: "Cybersecurity Consulting",
        description: "Protecting your digital assets with expert security audits, vulnerability assessments, and strategic guidance.",
        img: serviceCyberImg,
    },
    {
        title: "AI-Driven Design & UX",
        description: "Leveraging artificial intelligence to create highly personalized, intuitive, and engaging user experiences.",
        img: serviceAiImg,
    },
];

export const teamMembers = [
    { name: "Muhammed Faris", title: "CEO & Founder", img: ceoImage },
    { name: "Abhinav Punnakkan", title: "Lead Developer", img: Abhinav },
    { name: "Fazeen Alan", title: "CyberSecurity Engineer", img: "https://placehold.co/500x500/333333/FFFFFF?text=UX" },
];

export const recentWorks = [
    { title: "Project Ayurveda", category: "Web Application", img: workImage1 },
    { title: "Quantum Leap", category: "Cybersecurity Audit", img: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2070&auto=format&fit=crop" },
    { title: "Global Labs", category: "Website & Branding", img: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=2070&auto=format&fit=crop" },
]

export const clientLogos = [
  { src: clientLogo1, alt: 'Client 1' },
  { src: clientLogo2, alt: 'Client 2' },
//   { src: clientLogo3, alt: 'Client 3' },
//   { src: clientLogo4, alt: 'Client 4' },
//   { src: clientLogo5, alt: 'Client 5' },
];

// 2. Development Process Steps
export const devProcess = [
  { number: '01', title: 'Discovery & Strategy', description: 'We start by understanding your vision, goals, and target audience to create a comprehensive project roadmap.' },
  { number: '02', title: 'UI/UX Design', description: 'Our team designs a beautiful, intuitive, and user-friendly interface that provides an exceptional user experience.' },
  { number: '03', title: 'Development & Coding', description: 'Using modern technologies, we build a robust, scalable, and secure web application tailored to your needs.' },
  { number: '04', title: 'Testing & QA', description: 'We rigorously test every aspect of the application to ensure it is bug-free, performant, and reliable.' },
  { number: '05', title: 'Deployment & Launch', description: 'We handle the deployment process to ensure a smooth launch, getting your project live for the world to see.' },
  { number: '06', title: 'Support & Growth', description: 'Our partnership doesn’t end at launch. We provide ongoing support and guidance to help you grow.' },
];

// 3. Technology Stack (use your own or find logos online)
export const techStack = [
    { name: 'React', img: reactLogo },
    { name: 'Node.js', img: nodejsLogo },
    { name: 'JavaScript', img: javascriptLogo },
    { name: 'MongoDB', img: mongodbLogo },
    { name: 'Figma', img: figmaLogo },
    { name: 'TypeScript', img: typescriptLogo },
    { name: 'Python', img: pythonLogo},
    
];

// 4. Testimonials
export const testimonials = [
    { quote: "Working with this team was a game-changer. They delivered a product that exceeded our expectations on every level.", author: "John Doe", company: "Innovate Inc." },
    { quote: "Their attention to detail and commitment to quality is unparalleled. I would recommend them to anyone.", author: "Jane Smith", company: "Solutions Co." },
];

// 5. FAQs
export const faqs = [
    { q: "How long does a typical web development project take?", a: "A typical project takes between 6-12 weeks, depending on the complexity and scope. We provide a detailed timeline after our initial discovery phase." },
    { q: "How much will my website cost?", a: "Every project is unique. We provide a custom quote after understanding your specific requirements. Contact us for a free, no-obligation estimate." },
    { q: "Will I be able to update the website myself?", a: "Absolutely. We can build your website on a user-friendly Content Management System (CMS) that allows you to easily update content without any coding knowledge." },
    { q: "Do you provide ongoing support after launch?", a: "Yes, we offer various support and maintenance packages to ensure your website remains secure, updated, and performant." },
];

export const projectStats = [
  { label: 'Projects Completed', value: 50 },
  { label: 'Happy Clients', value: 30 },
  { label: 'Years of Experience', value: 4 },
];