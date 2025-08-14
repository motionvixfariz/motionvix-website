import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';

// Import your custom hook and components
import { useMediaQuery } from '../components/useMediaQuery';
import Counter from '../components/Counter';

// Import your assets
import ceoImage from '../assets/ceo-photo.jpg'; 
import cofounderImage from '../assets/lead-dev.png'; 

// --- Data ---
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

//=========== Interactive Journey Section ===========//
const JourneyContainer = styled.div`
  position: relative;
  max-width: 800px;
  margin: 0 auto;
`;

const JourneyList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8rem;
  @media (max-width: 768px) { gap: 4rem; }
`;

const StickyYear = styled.div`
  position: sticky;
  top: 150px;
  width: 200px;
  font-size: 8rem;
  font-weight: 900;
  color: rgba(138, 43, 226, 0.2);
  text-align: left;
  z-index: 1;

  @media (max-width: 768px) {
    display: none; // Hide the sticky counter completely on mobile
  }
`;

const JourneyItem = styled(motion.div)`
  position: relative;
  padding: 2.5rem;
  background: rgba(30, 30, 30, 0.5);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  z-index: 2;
  text-align: left;
  transition: opacity 0.4s ease, transform 0.4s ease;

  h3 {
    margin: 0 0 1rem 0;
    font-size: 2rem;
    color: #FFFFFF;
    @media (max-width: 768px) { font-size: 1.5rem; }
  }
  p {
    margin: 0;
    color: #BBBBBB;
    line-height: 1.7;
  }
`;

const MobileYear = styled.div`
  display: none;
  font-size: 1rem;
  font-weight: bold;
  color: #8A2BE2;
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    display: block; // Only show on mobile
  }
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

// --- Reusable Child Component for the Journey Item ---
function JourneyItemWrapper({ item, setFocusedYear, isDesktop }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0.4, 1, 0.4]);
  const scale = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0.95, 1, 0.95]);

  return (
    <motion.div
      ref={ref}
      // Only trigger the year update if on desktop
      onViewportEnter={() => isDesktop && setFocusedYear(item.year)}
    >
      <JourneyItem style={{ opacity, scale }}>
        <MobileYear>{item.year}</MobileYear>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
      </JourneyItem>
    </motion.div>
  );
}


// --- The Main Component ---
export default function AboutPage() {
  const [focusedYear, setFocusedYear] = useState(timelineData[0].year); 
  const isDesktop = useMediaQuery('(min-width: 768px)'); // This is the responsive check

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

      {/* The Journey Section - FINAL RESPONSIVE VERSION */}
      <Section>
        <SectionTitle>Our Journey</SectionTitle>
        <JourneyContainer>
          
          {/* Conditional Rendering: Only show StickyYear if isDesktop is true */}
          {isDesktop && (
            <StickyYear>
              <Counter value={Number(focusedYear)} />
            </StickyYear>
          )}

          <JourneyList>
            {timelineData.map((item, index) => (
              <JourneyItemWrapper 
                key={index} 
                item={item} 
                setFocusedYear={setFocusedYear}
                isDesktop={isDesktop} // Pass the boolean down
              />
            ))}
          </JourneyList>
          
        </JourneyContainer>
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