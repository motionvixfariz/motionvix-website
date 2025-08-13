import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ServicesContainer = styled(motion.div)`
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 2rem;
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const ServiceCard = styled(motion.div)`
  background-color: #1e1e1e;
  padding: 2rem;
  border-radius: 10px;
  border: 1px solid #333;
`;

const ServiceTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #8A2BE2;
`;

const ServiceDescription = styled.p`
  font-size: 1rem;
  color: #BBBBBB;
`;

const services = [
  { title: "Website Development", description: "Creating stunning, responsive, and modern websites." },
  { title: "Web Application Development", description: "Building powerful and scalable web applications with React and Node.js." },
  { title: "UI/UX Design", description: "Focusing on user-centric design to create intuitive and engaging experiences." },
];

export default function ServicesPage() {
  return (
    <ServicesContainer initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Title>What We Offer</Title>
      <ServicesGrid>
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            whileHover={{ scale: 1.05, borderColor: '#8A2BE2' }}
            transition={{ duration: 0.3 }}
          >
            <ServiceTitle>{service.title}</ServiceTitle>
            <ServiceDescription>{service.description}</ServiceDescription>
          </ServiceCard>
        ))}
      </ServicesGrid>
    </ServicesContainer>
  );
}