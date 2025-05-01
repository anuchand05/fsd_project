import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// View Members Page Component - Minimal design with blue accents on grey theme
const ViewMembersPage = () => {
  // State for members list
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Fetch members from the API when component mounts
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/members');
        setMembers(response.data);
        setError('');
      } catch (err) {
        console.error('Error fetching members:', err);
        setError('Failed to load team members. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchMembers();
  }, []);
  
  return (
    <div>
      <h1 className="mb-4 text-center">Team Members</h1>
      
      {/* Display error message if API request fails */}
      {error && <div className="alert alert-danger">{error}</div>}
      
      {/* Display loading spinner while data is being fetched */}
      {loading && (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading members...</p>
        </div>
      )}
      
      {/* Display message if no members found */}
      {!loading && members.length === 0 && !error && (
        <div className="text-center my-5">
          <p className="mb-3">No team members found.</p>
          <Link to="/add-member" className="btn btn-primary">
            Add First Member
          </Link>
        </div>
      )}
      
      {/* Display members in a grid with minimal cards */}
      {!loading && members.length > 0 && (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {members.map(member => (
            <div className="col" key={member._id}>
              <div className="card h-100">
                {/* Square image container */}
                <div className="profile-image-container">
                  {member.profileImage ? (
                    <img 
                      src={`/uploads/${member.profileImage}`} 
                      className="profile-image" 
                      alt={`${member.name}`}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '';
                      }}
                    />
                  ) : (
                    <div className="profile-image d-flex align-items-center justify-content-center bg-light">
                      <span className="text-secondary">No Image</span>
                    </div>
                  )}
                </div>
                
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{member.name}</h5>
                  <p className="card-text mb-4">{member.role}</p>
                  <Link 
                    to={`/members/${member._id}`} 
                    className="btn btn-primary mt-auto"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewMembersPage;