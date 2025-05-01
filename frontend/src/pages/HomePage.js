import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = ({ teamName = "Synergy" }) => {
  return (
    <div className="app-container">
      
      {/* Main Content */}
      <div className="page-container">
        <div className="minimal-home">
          <div className="home-header">
            <h1>Welcome to <span className="home-header">{teamName}</span> Team</h1>
            <p>Manage your team efficiently with our centralized platform. Track performance, assign tasks, and boost collaboration.</p>
          </div>
          
          {/* Feature Cards */}
          <div className="home-features">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-user-plus"></i>
              </div>
              <h3 className="feature-title">Member Management</h3>
              <p className="feature-text">Add, edit, and organize team members with detailed profiles and skill tracking.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-tasks"></i>
              </div>
              <h3 className="feature-title">Task Assignment</h3>
              <p className="feature-text">Create and assign tasks to team members with deadlines and priority levels.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-chart-line"></i>
              </div>
              <h3 className="feature-title">Performance Analytics</h3>
              <p className="feature-text">Track team performance with visual analytics and custom reporting tools.</p>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="home-buttons">
            <Link to="/add-member" className="btn btn-primary btn-lg">
              <i className="fas fa-user-plus"></i>
              Add New Member
            </Link>
            <Link to="/members" className="btn btn-outline-primary btn-lg">
              <i className="fas fa-users"></i>
              View Team
            </Link>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-links">
            <a href="#" className="footer-link">Privacy Policy</a>
            <a href="#" className="footer-link">Terms of Service</a>
            <a href="#" className="footer-link">Contact Us</a>
          </div>
          <div className="footer-copyright">
            © {new Date().getFullYear()} {teamName} Team Management. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;