import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaRocket, FaLightbulb, FaUsers, FaHandshake } from 'react-icons/fa';

import ceoImage from '../assets/ceo-photo.jpg'; 
import cofounderImage from '../assets/lead-dev.png'; 

// --- Placeholder Data ---
const timelineData = [
  { year: '2022', title: 'The Spark of an Idea', description: 'The journey began with a simple observation: small industries needed better digital tools to compete. The idea for a dedicated, high-quality web solutions provider was born.' },
  { year: '2023', title: 'First Prototype & Founding', description: 'After months of planning and development, the first prototype was built. The company was officially founded by Muhammed Faris and his co-founder, setting the vision in motion.' },
  { year: '2024', title: 'Onboarding Our First Client', description: 'A major milestone! We partnered with our first client, delivering a successful project that validated our mission and set the standard for our work.' },
  { year: '2025', title: 'Expanding the Core Team', description: 'To meet growing demand and expand our capabilities, we welcomed new talent, forming the passionate and skilled core team we have today.' },
];

const teamData = {
    founder: { name: 'Muhammed Faris', title: 'CEO & Founder', img: ceoImage, message: 'I envisioned a company where technology acts as a bridge, not a barrier. Our purpose is to empower every entrepreneur with the tools to realize their vision, ensuring that great ideas are matched with great digital experiences.' },
    cofounder: { name: 'Abhinav Punnakkan', title: 'CTO & Co-Founder', img: cofounderImage, message: 'From day one, my focus has been on building robust, scalable, and secure platforms. We don\'t just write code; we build lasting digital assets for our partners, ensuring their success is built on a solid technical foundation.' }
}

// --- Styled Components ---

const AboutPageContainer = styled(motion.div)`
  padding: 4rem 2rem;
`;

const Section = styled.section`
  max-width: 1200px;
  margin: 0 auto 8rem auto;
  text-align: center;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 3.5rem;
  font-weight: bold;
  margin-bottom: 4rem;
  color: #FFFFFF;
`;

const HeroTitle = styled(motion.h1)`
  font-size: 5rem;
  font-weight: 900;
  line-height: 1.1;
  color: #FFFFFF;
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.5rem;
  color: #8A2BE2;
  margin-top: 1rem;
`;

// --- Timeline Section (Rebuilt with SVG) ---
const TimelineContainer = styled.div`
  position: relative;
  max-width: 800px;
  margin: 0 auto;
`;

const TimelineSVGContainer = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  height: 100%;
  width: 50px; /* Wider for easier positioning */
  z-index: 1;
`;

const TimelineItem = styled(motion.div)`
  padding: 10px 40px;
  position: relative;
  width: 50%;
  box-sizing: border-box;
  z-index: 2;

  &:nth-child(odd) { left: 0; text-align: right; }
  &:nth-child(even) { left: 50%; text-align: left; }

  &::after {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    background-color: #FFFFFF;
    border: 4px solid #8A2BE2;
    top: 25px;
    border-radius: 50%;
    z-index: 3;
    transition: transform 0.2s ease-in-out;
  }
  &:hover::after { transform: scale(1.2); }
  &:nth-child(odd)::after { right: -12px; }
  &:nth-child(even)::after { left: -12px; }
`;

const TimelineCard = styled.div`
  padding: 1.5rem;
  background-color: #1e1e1e;
  border-radius: 10px;
  h3 { margin-top: 0; color: #8A2BE2; }
  p { color: #BBBBBB; }
`;

// --- Leadership Section ---
const LeadershipContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    text-align: left;
    @media (max-width: 768px) { grid-template-columns: 1fr; }
`;
const LeaderCard = styled(motion.div)``;
const LeaderImage = styled.img`
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid #8A2BE2;
    margin-bottom: 1rem;
`;
const LeaderQuote = styled.blockquote`
    margin: 0;
    padding-left: 1rem;
    border-left: 3px solid #8A2BE2;
    font-style: italic;
    color: #BBBBBB;
`;

// --- The Main Component ---

export default function AboutPage() {
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    // Start when the top of timeline hits the center of the screen, 
    // end when the bottom of timeline hits the center. This is reliable.
    offset: ["start center", "end center"],
  });

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.2 } },
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <AboutPageContainer initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {/* Hero Section */}
      <Section>
        <HeroTitle variants={itemVariants} initial="hidden" animate="visible">
          More Than a Company.
        </HeroTitle>
        <HeroSubtitle variants={itemVariants} initial="hidden" animate="visible" transition={{delay: 0.2}}>
          We Are a Growth Partner.
        </HeroSubtitle>
      </Section>

      {/* The Journey Section */}
      <Section>
        <SectionTitle>Our Journey</SectionTitle>
        <TimelineContainer ref={timelineRef}>
          <TimelineSVGContainer>
            <svg width="50" height="100%" viewBox="0 0 50 1200" preserveAspectRatio="none">
              {/* The background line */}
              <path d="M 25 0 V 1200" stroke="#333" strokeWidth="4" />
              {/* The animated foreground line */}
              <motion.path
                d="M 25 0 V 1200"
                stroke="#8A2BE2"
                strokeWidth="4"
                style={{ pathLength: scrollYProgress }}
              />
              {/* The animated dot */}
              <motion.circle 
                cx="25"
                cy="0"
                r="11" 
                fill="#fff" 
                stroke="#8A2BE2" 
                strokeWidth="4" 
                style={{ pathLength: scrollYProgress }} 
              />
            </svg>
          </TimelineSVGContainer>

          {timelineData.map((item, index) => (
            <TimelineItem
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
            >
              <TimelineCard>
                <h3>{item.year} - {item.title}</h3>
                <p>{item.description}</p>
              </TimelineCard>
            </TimelineItem>
          ))}
        </TimelineContainer>
      </Section>

      {/* Leadership Section */}
      <Section>
          <SectionTitle>Meet The Visionaries</SectionTitle>
          <LeadershipContainer>
              <LeaderCard variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                  <LeaderImage src={teamData.founder.img} alt={teamData.founder.name} />
                  <h3>{teamData.founder.name} <span style={{color: '#8A2BE2', fontSize: '1.2rem'}}>{teamData.founder.title}</span></h3>
                  <LeaderQuote>{teamData.founder.message}</LeaderQuote>
              </LeaderCard>
              <LeaderCard variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                  <LeaderImage src={teamData.cofounder.img} alt={teamData.cofounder.name} />
                  <h3>{teamData.cofounder.name} <span style={{color: '#8A2BE2', fontSize: '1.2rem'}}>{teamData.cofounder.title}</span></h3>
                  <LeaderQuote>{teamData.cofounder.message}</LeaderQuote>
              </LeaderCard>
          </LeadershipContainer>
      </Section>
    </AboutPageContainer>
  );
}