// UpdateProjectModal.js
import React, { useState } from "react";
import {
  Modal,
  Box,
  Button,
  Typography,
  CircularProgress,
  TextField,
} from "@mui/material";
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
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) setThumbnailImage(file);
  };

  const handleUpdateProject = async () => {
    setLoading(true);

    try {
      // Only perform PUT if name or description is non-empty
      if (name || description) {
        await axiosInstance.put(
          `${apiBaseUrl}/projects/id/${projectId}`,
          { name, description },
          { headers: { Authorization: `Bearer ${token}` } } // Add token for authorization if needed
        );
      }

      // Only perform POST if thumbnailImage is provided
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
      onProjectUpdate(); // Notify parent component to refresh project data
      handleClose(); // Close the modal
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
            input: { color: "#d7dadc" },
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
