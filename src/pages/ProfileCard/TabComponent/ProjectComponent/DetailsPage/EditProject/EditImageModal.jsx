import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Button,
  CircularProgress,
  Typography,
  Grid,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { AiOutlineClose } from "react-icons/ai"; // Import Close icon from react-icons
import axios from "axios";
import { toast } from "react-toastify";

const EditImageUpdate = ({
  imageModalOpen,
  handleImageClose,
  projectId,
  apiBaseUrl,
  onProjectUpdate,
  previousImages = [],
}) => {
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (thumbnailImage) {
      const objectUrl = URL.createObjectURL(thumbnailImage);
      setImagePreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [thumbnailImage]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setThumbnailImage(file || null);
  };

  const handleRemovePreview = () => {
    setThumbnailImage(null);
    setImagePreview(null);
    setConfirmDialogOpen(false);
  };

  const handleUpdateImage = async () => {
    if (!thumbnailImage) {
      toast.error("Please select an image to update.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("projectId", projectId);
      formData.append("thumbnailImage", thumbnailImage);

      await axios.post(`${apiBaseUrl}/projects/id/${projectId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Image updated successfully!");
      onProjectUpdate();
      handleImageClose();
    } catch (error) {
      console.error("Error updating image:", error);
      toast.error("Error updating image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={imageModalOpen} onClose={handleImageClose}>
      <Box sx={modalStyles}>
        <AiOutlineClose
          onClick={handleImageClose}
          style={{
            position: "absolute",
            zIndex: 1000,
            top: 10,
            right: 10,
            color: "white",
            backgroundColor: "#343536",
            borderRadius: "50%",
            padding: "5px",
            cursor: "pointer",
            fontSize: "24px",
            "&:hover": { backgroundColor: "#818384" },
          }}
        />
        <Typography variant="h6" sx={{ color: "#d7dadc", mb: 2 }}>
          Add Project Image
        </Typography>

        {/* Display previous images */}
        <Grid container spacing={2} sx={{ mb: 2 }}>
          {previousImages.length > 0 ? (
            previousImages.map((image, index) => (
              <Grid item xs={4} key={index}>
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                  }}
                />
              </Grid>
            ))
          ) : (
            <Typography variant="body2" sx={{ color: "#818384" }}>
              No previous images available.
            </Typography>
          )}
        </Grid>

        {/* Display the new image preview */}
        {imagePreview && (
          <Box sx={{ mb: 2, position: "relative" }}>
            <Typography variant="body2" sx={{ color: "#818384" }}>
              Selected Image Preview:
            </Typography>
            <img
              src={imagePreview}
              alt="Selected Preview"
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />
            <Tooltip title="Remove Preview">
              <AiOutlineClose
                onClick={() => setConfirmDialogOpen(true)}
                style={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  color: "#ff4500",
                  backgroundColor: "#1a1a1b",
                  borderRadius: "50%",
                  padding: "5px",
                  cursor: "pointer",
                  fontSize: "24px",
                  "&:hover": { backgroundColor: "#333" },
                }}
              />
            </Tooltip>
          </Box>
        )}

        {/* File input for selecting a new image */}
        <input
          type="file"
          onChange={handleFileChange}
          style={{ margin: "10px 0", color: "#818384" }}
        />

        <Button
          variant="contained"
          onClick={handleUpdateImage}
          disabled={loading || !thumbnailImage}
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
            "Add Image"
          )}
        </Button>

        {/* Confirmation Dialog */}
        <Dialog
          open={confirmDialogOpen}
          onClose={() => setConfirmDialogOpen(false)}
        >
          <DialogTitle>Confirm Removal</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to remove the selected image preview?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setConfirmDialogOpen(false)}
              color="secondary"
            >
              Cancel
            </Button>
            <Button onClick={handleRemovePreview} color="error">
              Remove
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Modal>
  );
};

const modalStyles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: window.innerWidth <= 768 ? 360 : 400,
  bgcolor: "#1a1a1b",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
  color: "#d7dadc",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  position: "relative",
};

export default EditImageUpdate;
