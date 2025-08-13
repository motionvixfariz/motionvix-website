import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ContactContainer = styled(motion.div)`
  padding: 4rem 2rem;
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Input = styled.input`
  padding: 1rem;
  background-color: #1e1e1e;
  border: 1px solid #333;
  border-radius: 5px;
  color: #FFFFFF;
  font-size: 1rem;
`;

const TextArea = styled.textarea`
  padding: 1rem;
  background-color: #1e1e1e;
  border: 1px solid #333;
  border-radius: 5px;
  color: #FFFFFF;
  font-size: 1rem;
  resize: vertical;
`;

const Button = styled(motion.button)`
  padding: 1rem;
  background-color: #8A2BE2;
  color: #FFFFFF;
  border: none;
  border-radius: 5px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
`;

export default function ContactPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    alert("Thank you for your message!");
  };

  return (
    <ContactContainer initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Title>Get In Touch</Title>
      <Form onSubmit={handleSubmit}>
        <Input type="text" placeholder="Your Name" required />
        <Input type="email" placeholder="Your Email" required />
        <TextArea rows="5" placeholder="Your Message" required></TextArea>
        <Button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
        >
          Send Message
        </Button>
      </Form>
    </ContactContainer>
  );
}