import React from 'react';
import { Link, useLocation } from 'react-router-dom';

// Minimal Navbar component
const Navbar = ({ teamName }) => {
  const location = useLocation();
  
  // Helper function to check if a path is active
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container">
        {/* Minimal brand with team name */}
        <Link className="navbar-brand" to="/">
          {teamName}
        </Link>
        
        {/* Responsive navbar toggle button */}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        {/* Navbar links */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link 
                className={`nav-link ${isActive('/') ? 'active' : ''}`} 
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${isActive('/add-member') ? 'active' : ''}`} 
                to="/add-member"
              >
                Add Member
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${isActive('/members') ? 'active' : ''}`} 
                to="/members"
              >
                View Team
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;