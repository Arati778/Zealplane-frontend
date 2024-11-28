// CreateCommunityModal.js
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Community.scss';

const CreateCommunityModal = ({ isOpen, onClose }) => {
  const [communityData, setCommunityData] = useState({
    name: '',
    description: '',
    image: ''
  });

  const handleChange = (e) => {
    setCommunityData({
      ...communityData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCommunityData({ ...communityData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/communities', communityData);
      toast.success('Community created successfully!');
      onClose();
    } catch (err) {
      toast.error('Failed to create community.');
      console.error(err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="create-community-modal">
      <div className="modal-content">
        <h2>Create a New Community</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Community Name</label>
            <input
              type="text"
              name="name"
              value={communityData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Description</label>
            <textarea
              name="description"
              value={communityData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Community Image</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </div>
          <button type="submit">Create Community</button>
          <button type="button" onClick={onClose} className="cancel-button">
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCommunityModal;
