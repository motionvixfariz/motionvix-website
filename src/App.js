// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
import FloatingNav from './components/FloatingNav'; // New Nav
import CustomCursor from './components/CustomCursor'; // New Cursor
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import { AnimatePresence } from 'framer-motion';


const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
`;

function App() {
  return (
    <Router>
      <GlobalStyle />
      <CustomCursor />
      <AppContainer>
        <FloatingNav /> {/* Use the new floating nav */}
        <MainContent>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </AnimatePresence>
        </MainContent>
        {/* We can choose to remove the footer for a cleaner look or keep it */}
        {/* <Footer /> */}
      </AppContainer>
    </Router>
  );
}

export default App;