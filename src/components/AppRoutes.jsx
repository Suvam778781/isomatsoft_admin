import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import NotFound from './NotFound';
import AboutUs from './AboutUsSection';
import HeroSection from './HeroSection';
import FooterSection from './FooterSection';
import HeaderSection from './HeaderSection';
import Carousel from './CarouselSection';
import Login from './Login';
const AppRoutes = () => {
  return (
 
      <Routes>
        <Route path="/" element={<AboutUs />} />
        <Route path="/hero" element={<HeroSection />} />
        <Route path="/footer" element={<FooterSection />} />
        <Route path="/header" element={<HeaderSection />} />
        <Route path="/carousel" element={<Carousel />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
  
  );
};

export default AppRoutes;
