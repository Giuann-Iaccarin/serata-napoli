import React, { useState } from 'react';

import './App.css'
import Homepage from './pages/Homepage'
import VenueDetail from './components/VenueDetail';

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedVenue, setSelectedVenue] = useState(null);

  const handleViewVenue = (venue) => {
    setSelectedVenue(venue);
    setCurrentView('detail');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedVenue(null);
  };

  return (
    <>
      {currentView === 'home' ? (
        <Homepage onViewVenue={handleViewVenue} />
      ) : (
        <VenueDetail
          venue={selectedVenue}
          onBack={handleBackToHome}
        />
      )}
    </>
  );
}
