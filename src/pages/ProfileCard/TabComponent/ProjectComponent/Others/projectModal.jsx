import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  Chip,
  Button,
  IconButton,
  CircularProgress,
  FormHelperText,
} from "@mui/material";
import { useSelector } from "react-redux";
import ContentWrapper from "../../../../../components/contentWrapper/ContentWrapper";
import Img from "../../../../../components/lazyLoadImage/Img";
import { MdClose } from "react-icons/md";
import { jwtDecode } from "jwt-decode";

const ProjectModal = ({ open, onClose, onSubmit }) => {
  const userIdRedux = useSelector((state) => state.user.userId);
  const userIdLocalStorage = localStorage.getItem("Id");
  const userId = userIdRedux || userIdLocalStorage;
  const token = localStorage.getItem("token");
  const decode = jwtDecode(token);
  const profilePic = decode?.profilePic;
  console.log("decoded token is", profilePic);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    thumbnailImage: "",
    tags: [],
    profilePic: "",
    username: localStorage.getItem("username"),
    profilePic: profilePic || "",
    id: Date.now(),
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [tagInput, setTagInput] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      thumbnailImage: e.target.files[0],
    }));
  };

  const handleProfilePicChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      profilePic: e.target.files[0],
    }));
  };

  const handleTagAdd = () => {
    if (tagInput && !formData.tags.includes(tagInput)) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        tags: [...prevFormData.tags, tagInput],
      }));
      setTagInput("");
    }
  };

  const handleTagDelete = (tagToDelete) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      tags: prevFormData.tags.filter((tag) => tag !== tagToDelete),
    }));
  };

  const validateForm = () => {
    const formErrors = {};
    if (!formData.name) formErrors.name = "Project Name is required.";
    if (!formData.description)
      formErrors.description = "Project Description is required.";
    if (!formData.thumbnailImage)
      formErrors.thumbnailImage = "Thumbnail Image is required.";
    if (formData.tags.length === 0)
      formErrors.tags = "At least one tag is required.";
    return formErrors;
  };

  const handleSubmit = async () => {
    setErrors({});
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setLoading(true);
    try {
      await onSubmit(formData);
      setFormData({
        name: "",
        description: "",
        thumbnailImage: "",
        tags: [],
        profilePic: profilePic || "",
        username: localStorage.getItem("username"),
        id: Date.now(),
      });
      onClose();
    } catch (error) {
      console.error("Error submitting the form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        style: {
          backgroundColor: "#2f2f2f", // Dark background color
          color: "#fff", // White text color
          borderRadius: 8,
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: "8px",
          borderBottom: "1px solid #444", // Dark border for separation
        }}
      >
        {formData.profilePic && (
          <Img
            src={formData.profilePic}
            className="profile-pic"
            alt="Profile Pic"
            style={{
              width: "100px",
              height: "100px",
              margin: "5px",
              borderRadius: "50%",
            }}
          />
        )}
        Add Comic Project
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ color: "#fff" }} // White icon color
        >
          <MdClose size={24} />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ padding: "16px", color: "#fff" }}>
        <TextField
          autoFocus
          margin="dense"
          id="projectName"
          name="name"
          placeholder="Project Name"
          type="text"
          fullWidth
          value={formData.name}
          onChange={handleChange}
          required
          error={!!errors.name}
          helperText={errors.name}
          sx={{
            marginBottom: 2,
            input: { color: "#fff" }, // White text color for input
            "& .MuiFormHelperText-root": {
              color: "#e57373", // Red helper text color
            },
          }}
        />
        <TextField
          margin="dense"
          id="projectDescription"
          name="description"
          placeholder="Project Description"
          type="text"
          fullWidth
          multiline
          rows={4}
          value={formData.description}
          onChange={handleChange}
          required
          error={!!errors.description}
          helperText={errors.description}
          style={{ color: "#fff" }}
          sx={{
            marginBottom: 2,
            input: { color: "#fff" }, // White text color for input
            "& .MuiFormHelperText-root": {
              color: "#e57373", // Red helper text color
            },
          }}
        />
        <TextField
          margin="dense"
          placeholder="Add Tags"
          type="text"
          fullWidth
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleTagAdd()}
          helperText="Press Enter to add tags"
          sx={{
            marginBottom: 2,
            input: { color: "#fff" },
            "& .MuiFormHelperText-root": { color: "#aaa" },
          }}
        />
        <div style={{ marginBottom: "16px" }}>
          {formData.tags.map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              onDelete={() => handleTagDelete(tag)}
              sx={{
                margin: "4px",
                backgroundColor: "#555",
                color: "#fff",
              }}
            />
          ))}
          {errors.tags && (
            <FormHelperText sx={{ color: "#e57373" }}>
              {errors.tags}
            </FormHelperText>
          )}
        </div>
        <input
          type="file"
          onChange={handleFileChange}
          accept="image/*"
          style={{ marginBottom: 16 }}
        />
        {errors.thumbnailImage && (
          <p style={{ color: "#e57373" }}>{errors.thumbnailImage}</p>
        )}
        <ContentWrapper>
          <div>
            {formData.thumbnailImage && (
              <Img
                src={URL.createObjectURL(formData.thumbnailImage)}
                className="Thumbnail-Picture"
                alt="Thumbnail"
                style={{ width: "50px", height: "50px", margin: "5px" }}
              />
            )}
          </div>
        </ContentWrapper>
      </DialogContent>
      <DialogActions
        sx={{
          backgroundColor: "#333", // Dark background for actions section
          color: "#fff",
          padding: "10px",
        }}
      >
        <Button onClick={onClose} sx={{ color: "#fff" }}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={loading}
          variant="contained"
          color="primary"
          sx={{
            backgroundColor: "#e57373", // Light red color for submit button
            "&:hover": {
              backgroundColor: "#c74343", // Darker red for hover effect
            },
          }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Submit"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProjectModal;
