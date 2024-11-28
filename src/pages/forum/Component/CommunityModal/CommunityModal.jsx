import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios
import { jwtDecode } from 'jwt-decode'; // Use named import
import './CommunityModal.scss';

const CreateCommunityModal = ({ closeModal }) => {
  const [communityName, setCommunityName] = useState('');
  const [communityDescription, setCommunityDescription] = useState('');
  const [communityImage, setCommunityImage] = useState('');
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token); // Use 'decode' instead of 'jwt_decode'
        // Assuming the username is stored under 'username' in the token payload
        setUsername(decodedToken.username);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data to be sent to the backend
    const communityData = {
      name: communityName,
      description: communityDescription,
      image: communityImage,
      createdBy: username, // Send the username with the community data
    };

    try {
      // Make an API request to the backend
      const response = await axios.post('http://localhost:5000/api/communities/post', communityData, {
        headers: {
          'Content-Type': 'application/json',
          // Add authentication token
          'Authorization': `Bearer ${token}`,
        },
      });

      // Handle success
      console.log('Community Created:', response.data);
      
      // Close the modal after submission
      closeModal();
    } catch (error) {
      // Handle errors
      console.error('Error creating community:', error);
      setError('Failed to create community. Please try again.');
    }
  };

  return (
    <div className="create-community-modal__overlay">
  <div className="create-community-modal__content">
    <button className="create-community-modal__close-btn" onClick={closeModal}>X</button>
    <h2 className="create-community-modal__title">Create a New Community</h2>

    {/* Display Username */}
    <p>Welcome, <strong>{username ? username : 'User'}</strong></p>

    {/* Error Message */}
    {error && <p className="error-message">{error}</p>}

    <form onSubmit={handleSubmit} className="create-community-modal__form">
      <div>
        <label htmlFor="name">Community Name</label>
        <input
          type="text"
          className="create-community-modal__input"
          id="name"
          value={communityName}
          onChange={(e) => setCommunityName(e.target.value)}
          placeholder="Enter community name"
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <textarea
          className="create-community-modal__textarea"
          id="description"
          value={communityDescription}
          onChange={(e) => setCommunityDescription(e.target.value)}
          placeholder="Enter community description"
          required
        />
      </div>
      <div>
        <label htmlFor="image">Image (URL)</label>
        <input
          type="text"
          className="create-community-modal__input"
          id="image"
          value={communityImage}
          onChange={(e) => setCommunityImage(e.target.value)}
          placeholder="Enter image URL"
        />
      </div>
      <button type="submit" className="create-community-modal__submit-btn">Create Community</button>
    </form>
  </div>
</div>
  );
};

export default CreateCommunityModal;
