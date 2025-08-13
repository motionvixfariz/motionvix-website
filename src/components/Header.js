import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Nav = styled(motion.nav)`
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1a1a1a;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: #FFFFFF;
  text-decoration: none;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
`;

const NavLink = styled(Link)`
  color: #BBBBBB;
  text-decoration: none;
  font-size: 1rem;
  position: relative;

  &:hover {
    color: #FFFFFF;
  }
`;

export default function Header() {
  return (
    <Nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Logo to="/">MyStartup</Logo>
      <NavLinks>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/services">Services</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </NavLinks>
    </Nav>
  );
}