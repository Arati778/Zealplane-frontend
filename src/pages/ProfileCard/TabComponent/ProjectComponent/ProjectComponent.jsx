// src/components/ProjectComponent/ProjectComponent.jsx
import React, { useState, useEffect } from "react";
import { Button, Card, Typography, CircularProgress, Box } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ProjectModal from "./Others/projectModal"; // Import the new modal
import ContentWrapper from "../../../../components/contentWrapper/ContentWrapper";
import Img from "../../../../components/lazyLoadImage/Img";
import "./ProjectComponent.scss";
import axiosInstance from "../../../../Auth/Axios";
import { jwtDecode } from "jwt-decode";

const ProjectComponent = () => {
  const [submittedData, setSubmittedData] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state
  const [uploading, setUploading] = useState(false); // Uploading state for progress
  const [error, setError] = useState(null);
  const [fetchedUsername, setFetchedUsername] = useState("");

  const { id } = useParams();
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();

  const userIdRedux = useSelector((state) => state.user.userId);
  const userIdLocalStorage = localStorage.getItem("Id");
  const userId = userIdRedux || userIdLocalStorage;

  const isOwner = id === userId;
  const [modalOpen, setModalOpen] = useState(false);
  const token = localStorage.getItem("token");
  const [status, setStatus] = useState("");

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  const handleSubmit = (formData) => {
    setUploading(true);

    // Get token from localStorage
    const token = localStorage.getItem("token");

    if (token) {
      try {
        // Decode the JWT token
        const decodedToken = jwtDecode(token);

        // Extract uniqueId from the decoded token
        const uniqueId = decodedToken?.uniqueId;
        const profilePic = decodedToken?.profilePic;

        if (!uniqueId) {
          console.error("uniqueId is missing or invalid from the token.");
          setUploading(false);
          return;
        }

        console.log("Extracted uniqueId:", uniqueId);
        console.log("Extracted profilePic:", profilePic);

        // Create FormData and append fields
        const data = new FormData();
        data.append("name", formData.name);
        data.append("description", formData.description);
        data.append("category", formData.category);
        data.append("tags", formData.tags.join(","));
        data.append("username", formData.username);
        data.append("id", formData.id);
        data.append("uniqueId", uniqueId);
        data.append("profilePic", profilePic);

        console.log();

        if (formData.thumbnailImage) {
          data.append("thumbnailImage", formData.thumbnailImage);
        }

        // Make POST request
        axiosInstance
          .post(`${apiBaseUrl}/projects`, data, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            setSubmittedData((prevData) => [...prevData, response.data]);
            setUploading(false);
            handleClose();
            navigate(`/details/${response.data.projectId}`);
          })
          .catch((error) => {
            console.error("Error posting form data:", error);
            setUploading(false);
          });
      } catch (error) {
        console.error("Error decoding token:", error);
        setUploading(false);
      }
    } else {
      console.error("Token is missing!");
      setUploading(false);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      if (fetchedUsername) {
        const response = await axios.get(
          `${apiBaseUrl}/projects/username/${fetchedUsername}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("projects fetched by username", response.data);

        setSubmittedData(response.data);
      } else {
        setSubmittedData([]);
        console.error("error fetching your project");
      }
    } catch (error) {
      console.log("Please upload your project here");
    }
    setLoading(false);
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axiosInstance.get(`/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.user.username) {
          setFetchedUsername(response.data.user.username);
          setStatus(response.data.status);
          console.log("username for the project is", fetchedUsername);

          localStorage.setItem("username", response.data.user.username);
        } else {
          setFetchedUsername("");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
        setFetchedUsername("");
      }
    };

    fetchUserDetails();
  }, [id]);

  useEffect(() => {
    if (fetchedUsername) {
      fetchData();
    }
  }, [fetchedUsername]);

  return (
    <div>
      <ProjectModal
        open={modalOpen}
        onClose={handleClose}
        onSubmit={handleSubmit}
      />

      {loading && <p>Loading...</p>}
      {uploading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "20px 0",
          }}
        >
          <CircularProgress />
        </Box>
      )}
      {error && <p>Error: {error.message}</p>}

      <div className="project-cards-container">
        {submittedData && submittedData.length > 0 ? (
          submittedData.map((project, index) => (
            <Card
              className="card"
              key={index}
              style={{
                width: window.innerWidth <= 768 ? "130px" : "300px",
                height: window.innerWidth <= 768 ? "170px" : "260px",
                margin: "5px",
                flex: "0 0 auto",
                cursor: "pointer",
                display: "inline-flex",
                flexDirection: "column",
                borderRadius: "3px",
                backgroundImage: project.thumbnailImage
                  ? `url(${project.thumbnailImage})`
                  : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "relative",
                overflow: "hidden",
                transition: "filter 0.3s ease-in-out",
              }}
              onClick={() => navigate(`/details/${project.projectId}`)}
            >
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: "rgba(0, 0, 0, 0.5)",
                  padding: "10px",
                  color: "white",
                }}
              >
                <Typography variant="h6">{project.name}</Typography>
              </div>
            </Card>
          ))
        ) : (
          <p>No projects found.</p>
        )}
      </div>
      {status !== "visitor" && (
        <Button variant="contained" onClick={handleOpen}>
          Add Project
        </Button>
      )}
    </div>
  );
};

export default ProjectComponent;
