import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

// Member Details Page Component - Minimal design with blue accents on grey theme
const MemberDetailsPage = () => {
  // Get member ID from URL parameters
  const { id } = useParams();
  
  // State for member details
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Fetch member details from the API when component mounts
  useEffect(() => {
    const fetchMemberDetails = async () => {
      try {
        setLoading(true);
        // Make API call to get member details by ID
        const response = await axios.get(`/api/members/${id}`);
        setMember(response.data);
        setError('');
      } catch (err) {
        console.error('Error fetching member details:', err);
        setError('Failed to load member details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchMemberDetails();
  }, [id]);
  
  return (
    <div>
      {/* Display error message if API request fails */}
      {error && <div className="alert alert-danger">{error}</div>}
      
      {/* Display loading spinner while data is being fetched */}
      {loading && (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading member details...</p>
        </div>
      )}
      
      {/* Display member details once loaded */}
      {!loading && member && (
        <div className="row g-4">
          <div className="col-lg-4 mb-4">
            {/* Member profile image section */}
            <div className="card">
              <div className="card-body p-0">
                {member.profileImage ? (
                  <img 
                    src={`/uploads/${member.profileImage}`} 
                    className="w-100" 
                    alt={`${member.name}`}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/400x400?text=No+Image';
                    }}
                  />
                ) : (
                  <div className="bg-light d-flex align-items-center justify-content-center" style={{height: '350px'}}>
                    <span className="text-secondary">No Image Available</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="col-lg-8">
            {/* Member details section */}
            <div className="card">
              <div className="card-body">
                <h2 className="mb-4 border-bottom pb-3">{member.name}</h2>
                
                <div className="mb-3">
                  <h5 className="text-secondary">Role</h5>
                  <p className="fs-5">{member.role}</p>
                </div>
                
                <div className="mb-3">
                  <h5 className="text-secondary">Email</h5>
                  <p className="fs-5">
                    <a href={`mailto:${member.email}`} className="text-decoration-none">{member.email}</a>
                  </p>
                </div>
                
                {member.phone && (
                  <div className="mb-3">
                    <h5 className="text-secondary">Phone</h5>
                    <p className="fs-5">
                      <a href={`tel:${member.phone}`} className="text-decoration-none">{member.phone}</a>
                    </p>
                  </div>
                )}
                
                {member.bio && (
                  <div className="mb-3">
                    <h5 className="text-secondary">Bio</h5>
                    <p className="fs-5">{member.bio}</p>
                  </div>
                )}
                
                <div className="mt-5">
                  <Link to="/members" className="btn btn-outline-primary">
                    Back to Team
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberDetailsPage;