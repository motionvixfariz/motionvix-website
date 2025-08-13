import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  padding: 2rem;
  text-align: center;
  background-color: #1a1a1a;
  color: #BBBBBB;
  margin-top: auto; // Pushes footer to the bottom
`;

export default function Footer() {
  return (
    <FooterContainer>
      <p>&copy; {new Date().getFullYear()} MyStartup. All Rights Reserved.</p>
    </FooterContainer>
  );
}