import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Card,
  Typography,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  Chip,
  CircularProgress,
  IconButton,
  Box,
} from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
import { Link, useNavigate, useParams } from "react-router-dom";
import Img from "../../../../components/lazyLoadImage/Img";
import "./ProjectComponent.scss";
import { useSelector } from "react-redux";
import ContentWrapper from "../../../../components/contentWrapper/ContentWrapper";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const ProjectComponent = () => {
  const [open, setOpen] = useState(false);
  const userIdRedux = useSelector((state) => state.user.userId);
  const userIdLocalStorage = localStorage.getItem("Id");
  const userId = userIdRedux || userIdLocalStorage;
  const generateUniqueId = () => Date.now() + Math.floor(Math.random() * 1000);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    thumbnailImage: "",
    category: "",
    thumbnailLink: [],
    tags: [],
    username: localStorage.getItem("username"),
    id: generateUniqueId(),
  });

  const [submittedData, setSubmittedData] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state
  const [uploading, setUploading] = useState(false); // Uploading state for progress
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fetchedUsername, setFetchedUsername] = useState("");
  
  const { id } = useParams();
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const isOwner = id === userId;
  const navigate = useNavigate();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    try {
      setUploading(true); // Set uploading state to true
      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("tags", formData.tags.join(","));
      data.append("username", formData.username);
      data.append("id", formData.id);

      if (selectedFile) {
        data.append("thumbnailImage", selectedFile);
      }

      const response = await axios.post(
        `${apiBaseUrl}/projects`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSubmittedData([...submittedData, response.data]);
      setUploading(false); // Reset uploading state
      handleClose();
      setFormData({
        name: "",
        description: "",
        id: generateUniqueId(),
        thumbnailImage: [],
        category: "",
        tags: [],
        username: localStorage.getItem("username"),
      });

      navigate(`/details/${response.data.projectId}`);
    } catch (error) {
      console.error("Error posting form data:", error);
      setUploading(false); // Reset uploading state on error
    }
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/users/${id}`);
        if (response.data.username) {
          setFetchedUsername(response.data.username);
          localStorage.setItem("username", response.data.username);
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

  const fetchData = async () => {
    setLoading(true);
    try {
      if (fetchedUsername) {
        const response = await axios.get(`${apiBaseUrl}/projects/username/${fetchedUsername}`);
        setSubmittedData(response.data);
      } else {
        setSubmittedData([]);
      }
    } catch (error) {
      console.log("Please upload your project here");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (fetchedUsername) {
      fetchData();
    }
  }, [fetchedUsername]);

  const categories = [
    { value: "Artworks", label: "Artworks" },
    { value: "Books", label: "Books" },
    { value: "Comics", label: "Comics" },
    { value: "Fan Art", label: "Fan Art" },
  ];

  useEffect(() => {
    if (submittedData) {
      console.log(submittedData);
    }
  }, [submittedData]);

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          Add Comic Project
          <IconButton
            aria-label="close"
            onClick={handleClose}
            style={{ position: "absolute", right: 8, top: 8 }}
          >
            {/* <CloseIcon /> */}
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="projectName"
            name="name"
            label="Project Name"
            type="text"
            fullWidth
            value={formData.name}
            onChange={handleChange}
            required
            error={!formData.name}
            helperText={!formData.name && "Project Name is required"}
            sx={{ marginBottom: 2 }} // Add space between fields
          />
          <TextField
            margin="dense"
            id="projectDescription"
            name="description"
            label="Project Description"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={formData.description}
            onChange={handleChange}
            sx={{ marginBottom: 2 }} // Add space between fields
          />
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              {categories.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <input type="file" onChange={handleFileChange} accept="image/*" style={{ marginBottom: 16 }} />
          <ContentWrapper>
            <div>
              {formData.thumbnailImage &&
                formData.thumbnailImage.map((thumbnail, index) => (
                  <Img
                    key={index}
                    src={thumbnail}
                    alt={`Thumbnail ${index}`}
                    style={{ width: "100px", height: "100px", margin: "5px" }}
                  />
                ))}
            </div>
          </ContentWrapper>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>

      {loading && <p>Loading...</p>}
      {uploading && (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "20px 0" }}>
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
{isOwner && (
        <Button variant="contained" onClick={handleOpen}>
          Add Project
        </Button>
      )}
    </div>
  );
};

export default ProjectComponent;
