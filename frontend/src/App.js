import React from 'react';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AddMemberPage from './pages/AddMemberPage';
import ViewMembersPage from './pages/ViewMembersPage';
import MemberDetailsPage from './pages/MemberDetailsPage';

// Configure axios with proper CORS settings
axios.defaults.baseURL = 'http://localhost:5001';
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.withCredentials = false; // Important for CORS

function App() {
  // Team name configuration - this could be loaded from a configuration file or API in a real app
  const teamName = "WIZARDS";
  
  return (
    <div className="app-container">
      {/* Navbar will be displayed on all pages */}
      <Navbar teamName={teamName} />
      
      {/* Set up routes for different pages */}
      <div className="container page-container">
        <Routes>
          {/* Home page route */}
          <Route path="/" element={<HomePage teamName={teamName} />} />
          
          {/* Add new team member route */}
          <Route path="/add-member" element={<AddMemberPage />} />
          
          {/* View all team members route */}
          <Route path="/members" element={<ViewMembersPage />} />
          
          {/* View details of a specific team member route */}
          <Route path="/members/:id" element={<MemberDetailsPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;