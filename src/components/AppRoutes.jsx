import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import NotFound from './NotFound';
import AboutUs from './AboutUsSection';
import HeroSection from './HeroSection';
import FooterSection from './FooterSection';
import HeaderSection from './HeaderSection';
import Carousel from './CarouselSection';
import Login from './Login';
import PrivateRoute from './PrivateRoute';
const AppRoutes = () => {
  return (
 
      <Routes>
        <Route path="/" element={<PrivateRoute><AboutUs /></PrivateRoute>} />
        <Route path="/hero" element={<PrivateRoute><HeroSection /></PrivateRoute>} />
        <Route path="/footer" element={<PrivateRoute><FooterSection /></PrivateRoute>} />
        <Route path="/header" element={<PrivateRoute><HeaderSection /></PrivateRoute>} />
        <Route path="/carousel" element={<PrivateRoute><Carousel /></PrivateRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
  
  );
};

export default AppRoutes;
