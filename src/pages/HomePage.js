import React, { useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import styled from 'styled-components';
import { motion, useInView, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa';
import Lottie from "lottie-react"; 
import AnimatedSphere from '../components/AnimatedSphere';
import Counter from '../components/Counter';
import ProcessStep from '../components/ProcessStep';
import { services, teamMembers, recentWorks, clientLogos, projectStats, devProcess, techStack, testimonials, faqs } from '../data';

//=========== General Styled Components ===========//
const HomePageContainer = styled(motion.div)`
  width: 100%;
`;

const Section = styled(motion.section)`
  max-width: 1200px;
  margin: 0 auto;
  padding: 6rem 2rem;
  border-bottom: 1px solid #222;

  &:last-child {
    border-bottom: none;
  }
`;

const SectionTitle = styled(motion.h2)`
  font-size: 3rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 4rem;
  color: #FFFFFF;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const StyledButton = styled(motion(Link))`
    display: inline-block;
    padding: 0.8rem 1.5rem;
    background-color: #8A2BE2;
    color: #FFFFFF;
    border: none;
    border-radius: 50px;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    text-decoration: none;
    margin-top: 1.5rem;
`;

//=========== Hero Section ===========//
const HeroSection = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  text-align: center;
`;

const HeroTitle = styled(motion.h1)`
  font-size: 5rem;
  font-weight: 900;
  color: #FFFFFF;
  z-index: 1;
  margin: 0;
  line-height: 1.1;
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.5rem;
  color: #BBBBBB;
  z-index: 1;
  max-width: 600px;
`;

const CanvasContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
`;

//=========== Interactive Client Marquee (NEW) ===========//
const MarqueeContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  /* Adds a faded edge effect for a seamless loop */
  -webkit-mask-image: linear-gradient(to right,
    transparent 0%,
    black 10%,
    black 90%,
    transparent 100%
  );
  mask-image: linear-gradient(to right,
    transparent 0%,
    black 10%,
    black 90%,
    transparent 100%
  );
`;

const MarqueeTrack = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 4rem; /* Spacing between logos */
`;

const MarqueeLogo = styled.div`
  flex-shrink: 0; /* Prevents logos from shrinking */
  img {
    height: 40px;
    opacity: 0.6;
    filter: grayscale(100%) brightness(1.5); /* Make them brighter to stand out */
    transition: all 0.3s ease;
    &:hover {
      opacity: 1;
      filter: none;
      transform: scale(1.1);
    }
  }
`;

//=========== About Us Summary Section (NEW) ===========//
const AboutSummaryContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  align-items: center;
  text-align: left;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;


const AboutContent = styled.div`
  h2 {
    font-size: 3rem;
    font-weight: bold;
    margin-bottom: 1.5rem;
  }
  p {
    font-size: 1.2rem;
    line-height: 1.7;
    color: #BBBBBB;
    margin-bottom: 2rem;
  }
`;

const ReadMoreLink = styled(motion(Link))`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #8A2BE2;
  font-weight: bold;
  font-size: 1.1rem;
  text-decoration: none;

  .arrow {
    transition: transform 0.2s ease-out;
  }

  &:hover .arrow {
    transform: translateX(5px);
  }
`;
//=========== Services Section (New & Interactive) ===========//
const ServiceCard = styled(motion.div)`
  position: relative;
  border-radius: 20px;
  overflow: hidden; /* Clips the image zoom effect */
  background: #1e1e1e;
  border: 1px solid #333;
  transition: border-color 0.3s ease;

  &:hover {
    border-color: #8A2BE2;
  }
`;

const ServiceImageContainer = styled.div`
  position: relative;
  height: 200px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease-out;

    ${ServiceCard}:hover & {
      transform: scale(1.1);
    }
  }

  /* Gradient overlay for text readability */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(30, 30, 30, 1) 0%, transparent 100%);
  }
`;

const ServiceTitle = styled.h3`
  position: absolute;
  bottom: 1.5rem;
  left: 1.5rem;
  right: 1.5rem;
  font-size: 1.7rem;
  font-weight: bold;
  color: #FFFFFF;
  margin: 0;
  z-index: 2;
`;

const ServiceContent = styled.div`
  padding: 1.5rem;
`;

const ServiceDescription = styled.p`
  font-size: 1rem;
  color: #BBBBBB;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const ServiceLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #8A2BE2;
  font-weight: bold;
  text-decoration: none;

  .arrow {
    transition: transform 0.2s ease;
  }

  &:hover .arrow {
    transform: translateX(4px);
  }
`;

//=========== Founder Section (New & Updated) ===========//
const FounderSectionLayout = styled.div`
    display: flex;
    align-items: center;
    gap: 4rem;
    flex-wrap: wrap;

    @media (max-width: 992px) {
        flex-direction: column;
        text-align: center;
    }
`;

const FounderImageWrapper = styled(motion.div)`
    position: relative;
    width: 300px;
    height: 300px;
    clip-path: circle(0% at 50% 50%);

    @media (max-width: 768px) {
        width: 250px;
        height: 250px;
    }
`;

const MorphingBlob = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  background: linear-gradient(45deg, #8A2BE2, #4B0082);
  animation: morph 8s ease-in-out infinite;
  z-index: 1;

  @keyframes morph {
    0% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
    50% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
    100% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
  }
`;

const FounderImage = styled(motion.img)`
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    position: relative;
    z-index: 2;
`;

const FounderMessage = styled(motion.div)`
    flex: 1;
    min-width: 300px;
`;
const FounderName = styled.h3`
    font-size: 2.5rem;
    font-weight: bold;
`;
const FounderTitle = styled.p`
    font-size: 1.2rem;
    color: #8A2BE2;
    margin-bottom: 1.5rem;
`;

//=========== Recent Work Section ===========//
const WorkCard = styled(motion.div)`
    position: relative;
    border-radius: 15px;
    overflow: hidden;
    color: #FFFFFF;
    height: 300px;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.4s ease;
    }

    &:hover img {
        transform: scale(1.1);
    }
`;

const WorkOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 1.5rem;
`;
const WorkTitle = styled.h4`
    font-size: 1.5rem;
    font-weight: bold;
    margin: 0;
`;
const WorkCategory = styled.p`
    margin: 0;
    color: #BBBBBB;
`;

//=========== Team Section (Final, Perfected Version) ===========//

const TeamMemberCard = styled(motion.div)`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2.5rem 2rem;
  background: #1e1e1e;
  border-radius: 20px;

  /* The Gradient Border */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 20px;
    padding: 1px;
    background: linear-gradient(45deg, rgba(138, 43, 226, 0.3), rgba(75, 0, 130, 0.3));
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    transition: background 0.3s ease;
  }
  &:hover::before {
    background: linear-gradient(45deg, rgba(138, 43, 226, 1), rgba(75, 0, 130, 1));
  }
`;

const TeamImageContainer = styled(motion.div)`
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-bottom: 1.5rem;

  /* The Glow Effect */
  &::after {
    content: '';
    position: absolute;
    top: -5px; left: -5px; right: -5px; bottom: -5px;
    border-radius: 50%;
    background: linear-gradient(45deg, #8A2BE2, #4B0082);
    z-index: -1;
    transition: filter 0.3s ease;
    filter: blur(15px);
    opacity: 0.8;
  }
  ${TeamMemberCard}:hover &::after {
    filter: blur(20px);
    opacity: 1;
  }
`;

const TeamImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #8A2BE2;
`;

const MemberName = styled.h4`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0; /* Increased bottom margin */
  color: #FFFFFF;
`;

// NEW: A container for the interactive title/socials swap
const InfoSwapContainer = styled.div`
  position: relative;
  height: 40px; /* Crucial: Gives the container a fixed height */
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MemberTitle = styled(motion.p)`
  color: #BBBBBB;
  margin: 0;
  position: absolute; /* Allows title and socials to occupy the same space */
`;

const SocialLinks = styled(motion.div)`
  display: flex;
  gap: 1.5rem;
  position: absolute; /* Allows title and socials to occupy the same space */
`;

const SocialIcon = styled(motion.a)`
  color: #BBBBBB;
  &:hover {
    color: #8A2BE2;
  }
`;
//=========== Animation Variants ===========//
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};


//=========== Client Trust Bar ===========//
// const ClientLogosContainer = styled(motion.div)`
//   display: flex;
//   align-items: center;
//   justify-content: space-around;
//   flex-wrap: wrap;
//   gap: 2rem;
  
//   img {
//     height: 40px;
//     opacity: 0.6;
//     filter: grayscale(100%);
//     transition: all 0.3s ease;
//     &:hover {
//       opacity: 1;
//       filter: grayscale(0%);
//     }
//   }
// `;

//=========== Interactive Process Section (NEW) ===========//
const ProcessContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProcessStickySide = styled.div`
  position: sticky;
  top: 100px; /* Adjust as needed */
  height: fit-content;
  text-align: left;
`;

const ProcessScrollSide = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;

const ProcessStepCard = styled(motion.div)`
  text-align: left;
  padding: 2rem;
  border: 1px solid #333;
  border-radius: 15px;
  background: #1e1e1e;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
`;

//=========== Project Stats Section (NEW) ===========//
const StatsContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  background: #1e1e1e;
  padding: 4rem;
  border-radius: 20px;
`;

const StatItem = styled.div`
  text-align: center;
  .number {
    font-size: 4rem;
    font-weight: bold;
    color: #8A2BE2;
  }
  .label {
    font-size: 1.2rem;
    color: #BBBBBB;
  }
`;

//=========== Technology Stack Section (NEW) ===========//
const TechStackGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 3rem;
  justify-items: center;
`;

const TechItem = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  
  img {
    height: 50px;
    transition: transform 0.3s ease;
  }
  
  &:hover img {
    transform: scale(1.1);
  }
`;
//=========== Testimonials Section ===========//
const TestimonialCard = styled(motion.div)`
  background: #1e1e1e;
  padding: 3rem;
  border-radius: 20px;
  border-left: 5px solid #8A2BE2;
  text-align: left;
`;

const Quote = styled.p`
  font-size: 1.5rem;
  font-style: italic;
  margin: 0 0 2rem 0;
  line-height: 1.5;
`;

const Author = styled.p`
  margin: 0;
  font-weight: bold;
  .company {
    color: #8A2BE2;
    font-weight: normal;
  }
`;

//=========== FAQ Section ===========//
const FaqContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: left;
`;

const FaqItem = styled(motion.div)`
  background: #1e1e1e;
  margin-bottom: 1rem;
  border-radius: 10px;
  overflow: hidden;
`;

const FaqHeader = styled(motion.header)`
  padding: 1.5rem;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2rem;
`;

const FaqBody = styled(motion.section)`
  padding: 0 1.5rem 1.5rem 1.5rem;
  color: #BBBBBB;
  line-height: 1.6;
`;

//=========== Final CTA Section ===========//
const CtaSection = styled(motion.div)`
  background: linear-gradient(45deg, #8A2BE2, #4B0082);
  padding: 5rem 2rem;
  border-radius: 20px;
  text-align: center;
`;

const CtaTitle = styled.h2`
  font-size: 3rem;
  font-weight: bold;
  margin: 0 0 1rem 0;
`;

const CtaSubtitle = styled.p`
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto 2rem auto;
  opacity: 0.9;
`;


//=========== The Homepage Component ===========//
export default function HomePage() {
  const [expandedFaq, setExpandedFaq] = useState(null);
  const founderSectionRef = useRef(null);
  const isFounderSectionInView = useInView(founderSectionRef, { once: true, amount: 0.2 });
  const processRef = useRef(null);
  const statsRef = useRef(null);

  // For the interactive process section
  const { scrollYProgress: processScroll } = useScroll({
    target: processRef,
    offset: ["start end", "end start"]
  });

  // For the project stats counting animation
  const { scrollYProgress: statsScroll } = useScroll({
    target: statsRef,
    offset: ["start 0.8", "start 0.6"] // Trigger when the section is partially visible
  });

  return (
    <HomePageContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Hero Section */}
      <HeroSection>
        <HeroTitle
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
        >
            Innovate. Create. Elevate.
        </HeroTitle>
        <HeroSubtitle
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
        >
          We build modern web solutions that empower small-scale industries to thrive in the digital landscape.
        </HeroSubtitle>
        <CanvasContainer>
          <Canvas>
            <ambientLight intensity={0.5} />
            <directionalLight position={[-2, 5, 2]} intensity={1} />
            <AnimatedSphere />
          </Canvas>
        </CanvasContainer>
      </HeroSection>

       {/* NEW: About Us Summary Section with Lottie Animation */}
      <Section>
        <AboutSummaryContainer>
          {/* The Lottie Animation Replaces the Static Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Lottie 
              animationData={require('../assets/developer skills.json')} // Or use the URL like below
              // animationData={/* Paste the JSON data here if you download it */}
              // path="https://lottie.host/e7b9955c-21a7-4185-a734-754854d94326/jAUyHrSurR.json" // Alternative: use the URL
              loop={true} 
            />
          </motion.div>

          <AboutContent>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}>
              Who We Are
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }}>
              We are a passionate team of designers, developers, and strategists dedicated to crafting exceptional digital experiences. We combine innovative technology with human-centered design to help small industries achieve big goals.
            </motion.p>
            <ReadMoreLink 
              to="/about"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Learn More About Our Journey
              <span className="arrow">→</span>
            </ReadMoreLink>
          </AboutContent>
        </AboutSummaryContainer>
      </Section>

            {/* NEW: Interactive Client Marquee */}
      <Section>
        <h3 style={{ textAlign: 'center', fontWeight: 'normal', color: '#BBBBBB', marginBottom: '3rem' }}>Trusted by Industry-Leading Companies Worldwide</h3>
        <MarqueeContainer>
          <MarqueeTrack
            // Animate the track from left to right
            animate={{ x: ['0%', '-100%'] }}
            transition={{
              ease: 'linear',
              duration: 20, // Adjust duration for speed
              repeat: Infinity,
            }}
          >
            {/* We duplicate the logos to create the seamless loop effect */}
            {[...clientLogos, ...clientLogos].map((logo, index) => (
              <MarqueeLogo key={index}>
                <img src={logo.src} alt={logo.alt} />
              </MarqueeLogo>
            ))}
          </MarqueeTrack>
        </MarqueeContainer>
      </Section>

      {/* Founder's Message Section (New & Updated) */}
      <Section ref={founderSectionRef}>
        <FounderSectionLayout>
          <FounderImageWrapper
            animate={{
              clipPath: isFounderSectionInView
                ? "circle(75% at 50% 50%)"
                : "circle(0% at 50% 50%)",
            }}
            transition={{ duration: 1, ease: "circOut" }}
          >
            <MorphingBlob />
            <FounderImage
              src={teamMembers[0].img}
              alt={teamMembers[0].name}
              initial={{ scale: 1.2 }}
              animate={{ scale: isFounderSectionInView ? 1 : 1.2 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            />
          </FounderImageWrapper>

          <FounderMessage
             initial={{ opacity: 0, x: 50 }}
             animate={{
                 opacity: isFounderSectionInView ? 1 : 0,
                 x: isFounderSectionInView ? 0 : 50
             }}
             transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          >
            <FounderName>A Message from Our Founder</FounderName>
            <FounderTitle>{teamMembers[0].name}, CEO & Founder</FounderTitle>
            <p style={{lineHeight: 1.7, color: '#BBBBBB'}}>
              "Our mission is to democratize technology. We believe every business, regardless of scale, deserves access to high-quality, modern web solutions that can level the playing field. We're not just building websites; we're building partnerships for growth."
            </p>
          </FounderMessage>
        </FounderSectionLayout>
      </Section>


     {/* Services Section (New & Interactive) */}
      <Section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <SectionTitle variants={itemVariants}>Our Core Services</SectionTitle>
        <Grid>
          {services.map((service, index) => (
            <ServiceCard key={index} variants={itemVariants}>
              <ServiceImageContainer>
                <img src={service.img} alt={service.title} />
                <ServiceTitle>{service.title}</ServiceTitle>
              </ServiceImageContainer>
              <ServiceContent>
                <ServiceDescription>{service.description}</ServiceDescription>
                <ServiceLink to="/services">
                  <span>Explore Service</span>
                  <span className="arrow">→</span>
                </ServiceLink>
              </ServiceContent>
            </ServiceCard>
          ))}
        </Grid>
        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
            <StyledButton to="/services" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              View All Services
            </StyledButton>
        </div>
      </Section>

 {/* CORRECTED: Interactive Development Process Section */}
            <Section ref={processRef}>
                <ProcessContainer>
                    <ProcessStickySide>
                        <SectionTitle style={{ textAlign: 'left', marginBottom: '1rem' }}>Our Approach to Excellence</SectionTitle>
                        <motion.p style={{ color: '#BBBBBB', textAlign: 'left', fontSize: '1.2rem' }} variants={itemVariants}>We follow a refined, agile process to ensure every project is a masterpiece of strategy, design, and technology.</motion.p>
                    </ProcessStickySide>
                    <ProcessScrollSide>
                        {devProcess.map((step, index) => (
                            <ProcessStep 
                                key={index}
                                step={step}
                                index={index}
                                totalSteps={devProcess.length}
                                scrollProgress={processScroll} // Pass the scroll progress down as a prop
                            />
                        ))}
                    </ProcessScrollSide>
                </ProcessContainer>
            </Section>
      



{/* CORRECTED: Technology Stack Section */}
            <Section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <SectionTitle>Technology We Use</SectionTitle>
              <TechStackGrid>
                {techStack.map((tech, index) => (
                  <TechItem key={index} variants={itemVariants}>
                    {/* The placeholder div is now replaced with a real image tag */}
                    <img src={tech.img} alt={tech.name} />
                    <p>{tech.name}</p>
                  </TechItem>
                ))}
              </TechStackGrid>
            </Section>

                              {/* CORRECTED: Project Stats Section */}
            <Section ref={statsRef}>
                <StatsContainer>
                    {projectStats.map((stat, index) => (
                        <StatItem key={index}>
                            <motion.div
                                className="number"
                                initial={{ opacity: 0, y: 20 }}
                                // Animate based on the statsScroll progress
                                animate={statsScroll.get() > (index * 0.2) ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.5 }}
                            >
                                <Counter value={stat.value} />+
                            </motion.div>
                            <div className="label">{stat.label}</div>
                        </StatItem>
                    ))}
                </StatsContainer>
            </Section>

      {/* Recent Work Section */}
      <Section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <SectionTitle variants={itemVariants}>Recent Works</SectionTitle>
        <Grid>
            {recentWorks.map((work, index) => (
                <WorkCard key={index} variants={itemVariants} whileHover={{ y: -10 }}>
                    <img src={work.img} alt={work.title} />
                    <WorkOverlay>
                        <WorkTitle>{work.title}</WorkTitle>
                        <WorkCategory>{work.category}</WorkCategory>
                    </WorkOverlay>
                </WorkCard>
            ))}
        </Grid>
      </Section>
      
      {/* NEW: Testimonials Section */}
  <Section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
      <SectionTitle>What Our Clients Say</SectionTitle>
      <TestimonialCard variants={itemVariants}>
          <Quote>"{testimonials[0].quote}"</Quote>
          <Author>{testimonials[0].author} - <span className="company">{testimonials[0].company}</span></Author>
      </TestimonialCard>
  </Section>

      {/* Core Team Section */}
      <Section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <SectionTitle variants={itemVariants}>Our Core Team</SectionTitle>
        <Grid>
          {teamMembers.map((member, index) => (
            <TeamMemberCard
              key={index}
              variants={itemVariants}
              whileHover="hover"
              initial="rest"
            >
              <TeamImageContainer>
                <TeamImage src={member.img} alt={member.name} />
              </TeamImageContainer>
              
              <MemberName>{member.name}</MemberName>

              <InfoSwapContainer>
                <MemberTitle
                  variants={{
                    rest: { opacity: 1, y: 0 },
                    hover: { opacity: 0, y: -20 }
                  }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                  {member.title}
                </MemberTitle>

                <SocialLinks
                  variants={{
                    rest: { opacity: 0, y: 20 },
                    hover: { opacity: 1, y: 0 }
                  }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                  <SocialIcon href="#" whileHover={{ y: -3 }}><FaLinkedin size={20} /></SocialIcon>
                  <SocialIcon href="#" whileHover={{ y: -3 }}><FaTwitter size={20} /></SocialIcon>
                  <SocialIcon href="#" whileHover={{ y: -3 }}><FaGithub size={20} /></SocialIcon>
                </SocialLinks>
              </InfoSwapContainer>
            </TeamMemberCard>
          ))}
        </Grid>
      </Section>

    {/* NEW: FAQ Section */}
  <Section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
      <SectionTitle>Frequently Asked Questions</SectionTitle>
      <FaqContainer>
          {faqs.map((faq, index) => (
              <FaqItem key={index} variants={itemVariants}>
                  <FaqHeader onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}>
                      {faq.q}
                      <motion.div animate={{ rotate: expandedFaq === index ? 180 : 0 }}>
                          <svg width="15" height="15" viewBox="0 0 20 20"><path d="M4.516 7.548c.436-.446 1.043-.481 1.576 0L10 11.295l3.908-3.747c.533-.481 1.141-.446 1.574 0 .436.445.408 1.197 0 1.615-.406.418-4.695 4.502-4.695 4.502a1.095 1.095 0 0 1-1.576 0S4.924 9.581 4.516 9.163c-.409-.418-.436-1.17 0-1.615z" fill="currentColor"></path></svg>
                      </motion.div>
                  </FaqHeader>
                  <AnimatePresence initial={false}>
                  {expandedFaq === index && (
                      <FaqBody
                          initial="collapsed"
                          animate="open"
                          exit="collapsed"
                          variants={{
                              open: { opacity: 1, height: 'auto' },
                              collapsed: { opacity: 0, height: 0 }
                          }}
                          transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                      >
                          {faq.a}
                      </FaqBody>
                  )}
                  </AnimatePresence>
              </FaqItem>
          ))}
      </FaqContainer>
  </Section>

  {/* NEW: Final CTA Section */}
  <Section>
      <CtaSection variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <CtaTitle>Have a Project in Mind?</CtaTitle>
          <CtaSubtitle>Let's build something amazing together. We're excited to learn about your ideas and help you bring them to life.</CtaSubtitle>
          <StyledButton to="/contact" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              Let's Talk
          </StyledButton>
      </CtaSection>
  </Section>


    </HomePageContainer>
  );
}