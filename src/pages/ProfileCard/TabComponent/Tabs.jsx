import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { FaArrowRight } from "react-icons/fa"; // Import an icon from react-icons (you can choose any icon)
import FeedbackComponent from "./feedback.jsx";
import "./Tabs.scss";
import ProjectComponent from "./ProjectComponent/ProjectComponent.jsx";
import axios from "axios"; // Import axios for API calls
import Spinner from "../../../components/spinner/Spinner.jsx"; // Import Spinner component
import axiosInstance from "../../../Auth/Axios.jsx";

const TabComponent = () => {
  const [activeTabKey, setActiveTabKey] = useState("postroom");
  const [thoughts, setThoughts] = useState([]);
  const [loading, setLoading] = useState(false); // State to track loading status
  const navigate = useNavigate(); // Initialize useNavigate
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  // Fetch username from local storage or Redux
  const username = localStorage.getItem("username") || ""; // Adjust as per your state management logic

  const tabList = [
    {
      key: "postroom",
      label: "Postroom",
    },
    {
      key: "thoughts",
      label: "Thoughts",
    },
    {
      key: "feedback",
      label: "Feedback",
    },
  ];

  const contentList = {
    postroom: loading ? (
      <Spinner /> // Show spinner while loading
    ) : (
      <ProjectComponent />
    ),
    thoughts:
      thoughts.length > 0 ? (
        thoughts.map((thought) => (
          <div
            key={thought._id}
            className="thought-item"
            onClick={() => navigate(`/post/${thought._id}`)} // Navigate on click
          >
            <h4>{thought.title}</h4>
            <p>{thought.body}</p>
            <FaArrowRight className="navigation-icon" /> {/* Navigation icon */}
          </div>
        ))
      ) : (
        <div>
          <p>No thoughts are present.</p>
          <button
            className="comic-button"
            onClick={() => navigate("/forum/create-post")}
          >
            Create a Thought
          </button>
        </div>
      ),
    feedback: <FeedbackComponent />,
  };

  // Simulate ProjectComponent loading
  useEffect(() => {
    if (activeTabKey === "postroom") {
      setLoading(true);
      const simulateLoading = setTimeout(() => {
        setLoading(false); // Set loading to false after simulation
      }, 1500); // Simulate a 1.5-second delay

      return () => clearTimeout(simulateLoading); // Cleanup timeout
    }
  }, [activeTabKey]);

  // Fetch user thoughts when the Thoughts tab is active
  useEffect(() => {
    if (activeTabKey === "thoughts") {
      const fetchThoughts = async () => {
        try {
          // Fetch thoughts using the username
          if (username) {
            // Ensure username is not empty
            const response = await axiosInstance.get(`/posts/user/${username}`); // Adjust endpoint as necessary
            setThoughts(response.data);
          } else {
            console.warn("Username not found in local storage or Redux");
          }
        } catch (error) {
          console.error("Error fetching thoughts:", error);
        }
      };
      fetchThoughts();
    }
  }, [activeTabKey, username]); // Add username to the dependency array

  return (
    <div className="tab-container">
      <div className="tabs">
        {tabList.map((tab) => (
          <div
            key={tab.key}
            className={`tab-item ${activeTabKey === tab.key ? "active" : ""}`}
            onClick={() => setActiveTabKey(tab.key)}
          >
            {tab.label}
          </div>
        ))}
      </div>
      <div className="tab-content">{contentList[activeTabKey]}</div>
    </div>
  );
};

export default TabComponent;
