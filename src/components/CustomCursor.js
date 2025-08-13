// src/components/CustomCursor.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Cursor = styled(motion.div)`
  position: fixed;
  left: 0;
  top: 0;
  width: 32px;
  height: 32px;
  border: 2px solid #ffffff;
  border-radius: 50%;
  pointer-events: none; // Allows clicking through the cursor
  z-index: 9999;
  mix-blend-mode: difference; // Cool effect on different backgrounds
  transition: transform 0.1s ease-out;
`;

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  const variants = {
    default: {
      x: position.x - 16,
      y: position.y - 16,
    },
  };

  return <Cursor variants={variants} animate="default" />;
}