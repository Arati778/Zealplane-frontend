import React, { useState } from "react";
import { Modal, Box, Button, Typography, Grid, CircularProgress } from "@mui/material";
import { toast } from 'react-toastify';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from "axios";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '10px',
};

const UpdateImageModal = ({ open, handleClose, projectId, apiBaseUrl }) => {
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Function to handle file change and image preview
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file && file.type.startsWith('image/')) {
      setThumbnailImage(file);

      // Preview the image
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      toast.error("Please upload a valid image file.");
      setThumbnailImage(null);
    }
  };

  // Function to handle form submission and update the project image
  const handleUpdateProject = async () => {
    if (!thumbnailImage) {
      toast.error("No image selected. Please upload an image.");
      return;
    }

    setUploading(true); // Start the upload process
    const formData = new FormData();
    formData.append("thumbnailImage", thumbnailImage);

    try {
      const updateResponse = await axios.post(
        `${apiBaseUrl}/projects/id/${projectId}`, 
        formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Image updated successfully!");
      setThumbnailImage(null);
      setPreviewImage(null);
      handleClose(); // Close the modal after successful upload
    } catch (error) {
      toast.error("Error updating image. Please try again.");
    } finally {
      setUploading(false); // Stop the uploading state
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-title" variant="h6" component="h2">
          Update Project Image
        </Typography>

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ marginTop: "20px", display: "block" }}
        />

        {previewImage && (
          <div style={{ marginTop: "20px" }}>
            <Typography variant="body1">Image Preview:</Typography>
            <img
              src={previewImage}
              alt="Preview"
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "10px",
                marginTop: "10px",
              }}
            />
          </div>
        )}

        <Grid container spacing={2} justifyContent="center" style={{ marginTop: "20px" }}>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              startIcon={<FontAwesomeIcon icon={faUpload} />}
              onClick={handleUpdateProject}
              disabled={uploading}
            >
              {uploading ? <CircularProgress size={24} color="inherit" /> : "Upload"}
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default UpdateImageModal;
