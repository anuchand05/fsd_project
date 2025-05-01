import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Add Member Page Component - Minimal design with blue accents on grey theme
const AddMemberPage = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    email: '',
    phone: '',
    bio: '',
  });
  
  // State for file upload
  const [profileImage, setProfileImage] = useState(null);
  
  // State for form submission status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const navigate = useNavigate();
  
  // Handle input field changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  // Handle file selection
  const handleFileChange = (e) => {
    setProfileImage(e.target.files[0]);
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      // Create form data object to send to the server
      const memberFormData = new FormData();
      
      // Append text fields to form data
      Object.keys(formData).forEach(key => {
        memberFormData.append(key, formData[key]);
      });
      
      // Append profile image if selected
      if (profileImage) {
        memberFormData.append('profileImage', profileImage);
      }
      
      console.log('Attempting to connect to:', axios.defaults.baseURL);
      console.log('Sending member data:', Object.fromEntries(memberFormData));
      
      // Send POST request to the backend API
      const response = await axios.post('/api/members', memberFormData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        timeout: 5000 // 5 second timeout
      });
      
      console.log('Response from backend:', response.data);
      
      // Show success message
      setSuccess('Member added successfully!');
      
      // Clear form after successful submission
      setFormData({
        name: '',
        role: '',
        email: '',
        phone: '',
        bio: '',
      });
      setProfileImage(null);
      
      // Reset file input
      document.getElementById('profileImage').value = '';
      
      // Redirect to the members list page after a short delay
      setTimeout(() => {
        navigate('/members');
      }, 2000);
      
    } catch (err) {
      console.error('Detailed error information:', {
        message: err.message,
        response: err.response,
        request: err.request,
        config: err.config
      });
      
      if (err.response) {
        setError(`Server error (${err.response.status}): ${err.response.data.message || 'Failed to add member'}`);
      } else if (err.request) {
        setError(`No response from server (${axios.defaults.baseURL}). Please check if the backend is running.`);
      } else {
        setError(`Error: ${err.message}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div>
      <h1 className="mb-4 text-center">Add New Team Member</h1>
      
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card form-container">
            {/* Success and error messages */}
            {success && <div className="alert alert-success mb-4">{success}</div>}
            {error && <div className="alert alert-danger mb-4">{error}</div>}
            
            {/* Member add form */}
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              {/* Name field */}
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Full Name *</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              {/* Role field */}
              <div className="mb-3">
                <label htmlFor="role" className="form-label">Role *</label>
                <input
                  type="text"
                  className="form-control"
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                />
              </div>
              
              {/* Email field */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email *</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              {/* Phone field */}
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">Phone Number</label>
                <input
                  type="tel"
                  className="form-control"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              
              {/* Bio field */}
              <div className="mb-3">
                <label htmlFor="bio" className="form-label">Bio</label>
                <textarea
                  className="form-control"
                  id="bio"
                  name="bio"
                  rows="3"
                  value={formData.bio}
                  onChange={handleChange}
                ></textarea>
              </div>
              
              {/* Profile image upload */}
              <div className="mb-4">
                <label htmlFor="profileImage" className="form-label">Profile Image</label>
                <input
                  type="file"
                  className="form-control"
                  id="profileImage"
                  name="profileImage"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <div className="form-text">Upload a professional photo (JPEG, PNG, etc.)</div>
              </div>
              
              {/* Form buttons */}
              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <button 
                  type="button" 
                  className="btn btn-outline-secondary" 
                  onClick={() => navigate('/')}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Adding...' : 'Add Member'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMemberPage;