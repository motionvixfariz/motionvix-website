// src/components/FloatingNav.js
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { GoHome, GoPerson, GoGear, GoMail } from 'react-icons/go';

const NavContainer = styled(motion.div)`
  position: fixed;
  top: 50%;
  right: 2rem;
  transform: translateY(-50%);
  padding: 1rem 0.8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50px;
  z-index: 1000;
`;

const NavItem = styled(NavLink)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  color: #BBBBBB;
  text-decoration: none;
  transition: color 0.3s ease;

  &.active {
    color: #FFFFFF;
  }

  &:hover {
    color: #FFFFFF;
  }
`;

const IconWrapper = styled(motion.div)``;

const LinkText = styled(motion.span)`
  position: absolute;
  right: 60px; /* Position to the left of the nav bar */
  top: 50%;
  transform: translateY(-50%);
  background-color: #FFFFFF;
  color: #121212;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  font-weight: bold;
  white-space: nowrap;
  pointer-events: none;
`;

const ActiveIndicator = styled(motion.div)`
  position: absolute;
  width: 48px;
  height: 48px;
  background-color: #8A2BE2;
  border-radius: 50%;
  z-index: -1;
`;

const navItems = [
  { path: '/', icon: <GoHome size={24} />, label: 'Home' },
  { path: '/about', icon: <GoPerson size={24} />, label: 'About' },
  { path: '/services', icon: <GoGear size={24} />, label: 'Services' },
  { path: '/contact', icon: <GoMail size={24} />, label: 'Contact' },
];

export default function FloatingNav() {
  const [hoveredPath, setHoveredPath] = useState(null);

  return (
    <NavContainer
      initial={{ x: 200, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {navItems.map((item) => (
        <NavItem
          key={item.path}
          to={item.path}
          onMouseEnter={() => setHoveredPath(item.path)}
          onMouseLeave={() => setHoveredPath(null)}
        >
          {({ isActive }) => (
            <>
              {isActive && (
                <ActiveIndicator
                  layoutId="activeIndicator"
                  initial={false}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, ease: 'backOut' }}
                />
              )}
              <IconWrapper whileHover={{ scale: 1.2 }}>{item.icon}</IconWrapper>
              {hoveredPath === item.path && (
                <LinkText
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {item.label}
                </LinkText>
              )}
            </>
          )}
        </NavItem>
      ))}
    </NavContainer>
  );
}