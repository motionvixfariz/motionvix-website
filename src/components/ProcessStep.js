// src/components/ProcessStep.js
import React from 'react';
import styled from 'styled-components';
import { motion, useTransform } from 'framer-motion';

const ProcessStepCard = styled(motion.div)`
  text-align: left;
  padding: 2rem;
  border: 1px solid #333;
  border-radius: 15px;
  background: #1e1e1e;

  /* On mobile, we reduce padding and remove the border */
  @media (max-width: 768px) {
    padding: 1rem 0 1rem 1rem;
    border: none;
    background: none;
  }
`;

const StepNumber = styled.div`
  font-size: 3rem;
  font-weight: bold;
  color: #8A2BE2;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 2.5rem; /* Slightly smaller number on mobile */
    display: none; /* Hide the big number, we use the timeline dot instead */
  }
`;

const StepContent = styled.div`
  h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.5rem;
  }
  p {
    margin: 0;
    color: #BBBBBB;
  }
`;

// This component is now responsive
export default function ProcessStep({ step, index, totalSteps, scrollProgress }) {
  // --- This logic is for DESKTOP scrolling animation ---
  const start = index / totalSteps;
  const end = (index + 1) / totalSteps;
  const opacity = useTransform(scrollProgress, [start, (start + end) / 2, end], [0.3, 1, 0.3]);
  const scale = useTransform(scrollProgress, [start, (start + end) / 2, end], [0.9, 1, 0.9]);

  // Use a media query hook or simple CSS to decide which animation to apply.
  // For simplicity, we'll let CSS handle the layout and Framer Motion handle animation variants for mobile.
  
  const isMobile = window.innerWidth <= 768;

  return (
    <ProcessStepCard
      // Apply different animations based on screen size
      style={isMobile ? {} : { opacity, scale }}
      initial={isMobile ? { opacity: 0, x: 20 } : {}}
      whileInView={isMobile ? { opacity: 1, x: 0 } : {}}
      viewport={isMobile ? { once: true, amount: 0.5 } : {}}
      transition={{ duration: 0.5 }}
    >
      <StepNumber>{step.number}</StepNumber>
      <StepContent>
        <h3>{step.title}</h3>
        <p>{step.description}</p>
      </StepContent>
    </ProcessStepCard>
  );
}