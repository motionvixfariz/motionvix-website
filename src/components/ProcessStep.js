import React from 'react';
import styled from 'styled-components';
import { motion, useTransform } from 'framer-motion';

const ProcessStepCard = styled(motion.div)`
  text-align: left;
  padding: 2rem;
  border: 1px solid #333;
  border-radius: 15px;
  background: #1e1e1e;
`;

const StepNumber = styled.div`
  font-size: 3rem;
  font-weight: bold;
  color: #8A2BE2;
  line-height: 1;
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

// This component correctly uses hooks for its animation
export default function ProcessStep({ step, index, totalSteps, scrollProgress }) {
  // Calculate a start and end point for each step's animation
  const start = index / totalSteps;
  const end = (index + 1) / totalSteps;
  
  // Hooks are now correctly used at the top level of this component
  const opacity = useTransform(scrollProgress, [start, (start + end) / 2, end], [0.3, 1, 0.3]);
  const scale = useTransform(scrollProgress, [start, (start + end) / 2, end], [0.9, 1, 0.9]);

  return (
    <ProcessStepCard style={{ opacity, scale }}>
      <StepNumber>{step.number}</StepNumber>
      <StepContent>
        <h3>{step.title}</h3>
        <p>{step.description}</p>
      </StepContent>
    </ProcessStepCard>
  );
}