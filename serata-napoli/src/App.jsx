import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Homepage from './pages/Homepage';
import VenueDetail from './pages/VenueDetail';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Homepage */}
        <Route path="/" element={<Homepage />} />

        {/* Venue Detail Page */}
        <Route path="/venue/:id" element={<VenueDetail />} />

        {/* Venue Detail with slug (optional) */}
        <Route path="/venue/:id/:slug" element={<VenueDetail />} />

        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
