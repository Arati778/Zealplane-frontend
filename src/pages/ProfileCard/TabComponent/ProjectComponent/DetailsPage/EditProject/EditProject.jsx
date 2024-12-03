import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Button,
  Typography,
  CircularProgress,
  TextField,
  Chip,
  IconButton,
} from "@mui/material";
import { FaPlus, FaTimes } from "react-icons/fa"; // Importing React Icons (FontAwesome)
import axios from "axios";
import { toast } from "react-toastify";
import axiosInstance from "../../../../../../Auth/Axios";

const UpdateProjectModal = ({
  open,
  handleClose,
  projectId,
  apiBaseUrl,
  onProjectUpdate,
}) => {
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  // Fetch existing project data when modal opens
  useEffect(() => {
    if (open && projectId) {
      fetchProjectData();
    }
  }, [open, projectId]);

  const fetchProjectData = async () => {
    try {
      const { data } = await axiosInstance.get(
        `${apiBaseUrl}/projects/id/${projectId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setName(data.name || "");
      setDescription(data.description || "");
      setTags(data.tags || []);
    } catch (error) {
      console.error("Error fetching project data:", error);
      toast.error("Failed to load project details.");
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) setThumbnailImage(file);
  };

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag)) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleUpdateProject = async () => {
    setLoading(true);

    try {
      // Perform PUT request for updated fields
      if (name || description || tags.length) {
        await axiosInstance.put(
          `${apiBaseUrl}/projects/id/${projectId}`,
          { name, description, tags },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      // Perform POST request for thumbnail image if updated
      if (thumbnailImage) {
        const formData = new FormData();
        formData.append("projectId", projectId);
        formData.append("thumbnailImage", thumbnailImage);

        await axios.post(`${apiBaseUrl}/projects/id/${projectId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
      }

      toast.success("Project updated successfully!");
      onProjectUpdate(); // Notify parent to refresh data
      handleClose(); // Close modal
    } catch (error) {
      console.error("Error updating project:", error);
      toast.error("Error updating project. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ ...modalStyles }}>
        <Typography variant="h6" sx={{ color: "#d7dadc", mb: 2 }}>
          Update Project
        </Typography>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
          InputLabelProps={{ style: { color: "#818384" } }}
          sx={{
            bgcolor: "#272729",
            input: { color: "white" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#343536" },
              "&:hover fieldset": { borderColor: "#818384" },
            },
          }}
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          margin="normal"
          multiline
          rows={4}
          InputLabelProps={{ style: { color: "#818384" } }}
          sx={{
            bgcolor: "#272729",
            input: { color: "#d7dadc" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#343536" },
              "&:hover fieldset": { borderColor: "#818384" },
            },
          }}
        />
        <Box sx={{ display: "flex", gap: 1, mt: 2, flexWrap: "wrap" }}>
          {tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              onDelete={() => handleRemoveTag(tag)}
              sx={{
                bgcolor: "#ff4500",
                color: "#fff",
                "& .MuiChip-deleteIcon": { color: "#fff" },
              }}
            />
          ))}
        </Box>
        <Box sx={{ display: "flex", mt: 2, gap: 1 }}>
          <TextField
            label="Add Tag"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            fullWidth
            InputLabelProps={{ style: { color: "#818384" } }}
            sx={{
              bgcolor: "#272729",
              input: { color: "#d7dadc" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#343536" },
                "&:hover fieldset": { borderColor: "#818384" },
              },
            }}
          />
          <IconButton onClick={handleAddTag} sx={{ color: "#ff4500" }}>
            <FaPlus /> {/* Using React Icon here */}
          </IconButton>
        </Box>
        <input
          type="file"
          onChange={handleFileChange}
          style={{ margin: "10px 0", color: "#818384" }}
        />
        <Button
          variant="contained"
          onClick={handleUpdateProject}
          disabled={loading}
          sx={{
            bgcolor: "#ff4500",
            color: "#fff",
            "&:hover": { bgcolor: "#cc3700" },
            mt: 2,
          }}
        >
          {loading ? (
            <CircularProgress size={24} sx={{ color: "#fff" }} />
          ) : (
            "Update Project"
          )}
        </Button>
      </Box>
    </Modal>
  );
};

const modalStyles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#1a1a1b",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
  color: "#d7dadc",
};

export default UpdateProjectModal;
