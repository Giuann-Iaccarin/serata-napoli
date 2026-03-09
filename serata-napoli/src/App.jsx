import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Homepage from './pages/Homepage';
import VenueDetail from './pages/VenueDetail';
import EventDetail from './pages/EventDetail';
import EventsPage from './pages/EventsPage';
import VenuesPage from './pages/VenuesPage';
import GuidePage from './pages/GuidePage';
import MapPage from './pages/MapPage';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import Premium from './pages/Premium';
import Notifications from './pages/Notifications';
import Favorites from './pages/Favorites';
import SerateList from './pages/SerateList';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Register from './pages/Register';
import SearchResults from './pages/SearchResults';
import TopVenues from './pages/TopVenues';
import HowItWorks from './pages/HowItWorks';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Cities from './pages/Cities';
import Categories from './pages/Categories';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Homepage */}
        <Route path="/" element={<Homepage />} />

        {/* Venue Detail Page */}
        <Route path="/venue/:id" element={<VenueDetail />} />
        <Route path="/venue/:id/:slug" element={<VenueDetail />} />

        {/* Event Detail Page */}
        <Route path="/event/:id" element={<EventDetail />} />

        {/* Events Page */}
        <Route path="/events" element={<EventsPage />} />

        {/* Guide Page */}
        <Route path="/guide" element={<GuidePage />} />

        {/* Map Page */}
        <Route path="/map" element={<MapPage />} />

        {/* Venues Page */}
        <Route path="/venues" element={<VenuesPage />} />

        {/* User Account Pages */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/premium" element={<Premium />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/serate-list" element={<SerateList />} />
        <Route path="/settings" element={<Settings />} />

        {/* Auth Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Search and Explore */}
        <Route path="/search" element={<SearchResults />} />
        <Route path="/top-venues" element={<TopVenues />} />

        {/* Help and Info */}
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />

        {/* Browse */}
        <Route path="/cities" element={<Cities />} />
        <Route path="/categories" element={<Categories />} />

        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
