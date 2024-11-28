import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaFire, FaStar } from "react-icons/fa";
import "./Sidebar.scss";

// Import the modal component
import CreateCommunityModal from "./CommunityModal/CommunityModal";
import axios from "axios"; // Import axios for API calls

const Sidebar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // To control modal visibility
  const [communities, setCommunities] = useState([]); // State to store communities
  const [error, setError] = useState(""); // To handle potential errors

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    // Fetch communities from the backend
    const fetchCommunities = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/communities"
        ); // Adjust the API endpoint if needed
        setCommunities(response.data); // Assuming response.data is an array of communities
      } catch (error) {
        console.error("Error fetching communities:", error);
        setError("Failed to load communities");
      }
    };

    fetchCommunities();
  }, []); // Empty dependency array to fetch once when the component mounts

  return (
    
    <div className="sidebar">
      <div className="sidebar-section">
        <Link to="/home" className="sidebar-link">
          <FaHome className="icon" /> Home
        </Link>
        <Link to="/forum" className="sidebar-link">
          <FaHome className="icon" /> Forum
        </Link>
        <Link to="/popular" className="sidebar-link">
          <FaFire className="icon" /> Popular
        </Link>
        <Link to="/favorites" className="sidebar-link">
          <FaStar className="icon" /> Favorites
        </Link>
      </div>

      <div className="sidebar-section">
        <h3>Communities</h3>
        {/* Check if there was an error fetching communities */}
        {error && <p className="error-message">{error}</p>}

        {/* Map over communities and display them dynamically */}
        {communities.length > 0 ? (
          communities.map((community) => (
            <Link
              to={`/r/${community.name}`}
              className="sidebar-link"
              key={community._id}
            >
              r/{community.name}
            </Link>
          ))
        ) : (
          <p>Loading communities...</p>
        )}
      </div>

      {/* Add the Create Community button */}
      <div className="create-community-btn">
        <button onClick={toggleModal}>Create Community</button>
      </div>

      {/* Modal to create a community */}
      {isModalOpen && <CreateCommunityModal closeModal={toggleModal} />}
    </div>
  );
};

export default Sidebar;
