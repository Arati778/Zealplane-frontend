import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  IconButton,
  Modal,
  Box,
  Button,
  Typography,
  Grid,
  Snackbar,
  Alert,
  CircularProgress
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Pagination, Navigation, Thumbs } from "swiper/modules";
import Img from "../../../../../components/lazyLoadImage/Img";
import ContentWrapper from "../../../../../components/contentWrapper/ContentWrapper";
import {
  FaHeart,
  FaThumbsUp,
  FaPlus,
  FaShare,
  FaFlag,
  FaArrowRight,
  FaPencilAlt,
  FaTimes,
  FaHome,
  FaFolder,
  FaTrash,
} from "react-icons/fa";
import axios from "axios";
import PosterFallback from "../../../../../assets/no-poster.png";
import "./style.scss";
import { useSelector, useDispatch } from "react-redux";
import avatar from "../../../../../assets/avatar.png";
import Header from "../../../../../components/header/Header";
import Feedback from "../../../../../components/carousel/Projexts/Feedback";
import HeroBannerData from "../../../../home/heroBanner/HeroBannerData";
import { MdShare, MdThumbUp } from "react-icons/md";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for styling



const DetailsPage = () => {
  const { projectId } = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [projectData, setProjectData] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const user = useSelector((state) => state.user.user);
  const userIdRedux = useSelector((state) => state.user.userId);
  const userIdLocalStorage = localStorage.getItem("Id");
  const userId = userIdRedux || userIdLocalStorage;
  const [userName, setUserName] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0); 
  // States for the modal
  const [open, setOpen] = useState(false);
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  // State for Thumbs
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const usernameLocalStorage = localStorage.getItem("username"); // Get userId from local storage
  console.log("username getting from localstorage is:", userIdLocalStorage);
  
  const [isOwner, setIsOwner] = useState(false);


  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setThumbnailImage(file);
    }
  };

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await axios.get(
          `${apiBaseUrl}/projects/id/${projectId}`
        );
        console.log("projectData is:", response.data);
        console.log("username is:", response.data.username);
        if (response.data.username === usernameLocalStorage) {
          console.log("username matched");
          setIsOwner(true);
        }else{
          console.log("username did not matched");
          setIsOwner(false);
        }
        
        setProjectData(response.data);
        setLiked(response.data.likes);
        setLikesCount(response.data.likes || 0); 
      } catch (error) {
        console.error("Error fetching project details:", error);
      }
    };

    fetchProjectDetails();
  }, [projectId]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `${apiBaseUrl}/users/${userId}`
        );
        setUserName(response.data.username);
        setProfilePic(response.data.profilePic);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [userId]);



  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleUpdateProject = async () => {
    const formData = new FormData();
    formData.append("projectId", projectId);
    formData.append("thumbnailImage", thumbnailImage); // Assuming thumbnailImage is a file

    try {
      // Send request to update the project
      const updateResponse = await axios.post(
        `${apiBaseUrl}/projects/id/${projectId}`, // Use the correct endpoint
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
try {
  console.log("Updated project response:", updateResponse.data);
  toast.success("Your content updated succesfully!");
} catch (error) {
  console.error("please try again", error);
  
}
      

      // Refresh project data
      const refreshResponse = await axios.get(
        `${apiBaseUrl}/projects/id/${projectId}`
      );

      setProjectData(refreshResponse.data);
      handleClose();
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  const handleLikeClick = async () => {

  try {
    // Get the token from localStorage
    const token = localStorage.getItem('token');
    
    // If token is not present, redirect to login
    if (!token) {
      toast.error("Authentication expired, please login again.");
      navigate('/login');
      return;
    }

    // Optimistically update the UI before the API call
    setLiked((prevLiked) => !prevLiked);
    setLikesCount((prevCount) => (liked ? prevCount - 1 : prevCount + 1));

    // Send a request to like/unlike the project
    const response = await axios.post(
      `${apiBaseUrl}/projects/${projectId}/like`,
      {}, // No body required
      {
        headers: {
          Authorization: `Bearer ${token}`, // Add the token from localStorage
        },
      }
    );

    console.log("liked by:", response.data);

    // Show a success toast
    toast.success("Project liked successfully!");

    // Optionally, if the API returns the updated likes count, you can use that
    if (response.data && response.data.likes !== undefined) {
      setLikesCount(response.data.likes);
    }
  } catch (error) {
    console.error("There was an error liking the item:", error);

    // If the error is related to authentication (401), redirect to login
    if (error.response && error.response.status === 401) {
      toast.error("Authentication expired, please login again.");
      localStorage.removeItem('authToken'); // Remove the expired token
      navigate('/login'); // Navigate to login page
    } else {
      // Rollback UI update if there was an error
      setLiked((prevLiked) => !prevLiked);
      setLikesCount((prevCount) => (liked ? prevCount + 1 : prevCount - 1));

      // Show a generic error toast
      toast.error("There was an error liking the project.");
    }
  }
};
  
const handleUpload = async () => {
  setLoading(true); // Set loading to true when upload starts

  // Call the update function (make sure it returns a promise)
  await handleUpdateProject();

  setLoading(false); // Set loading to false when upload completes
  setSnackbarOpen(true); // Show snackbar notification
  handleClose(); // Close the modal after upload
};

const handleSnackbarClose = () => {
  setSnackbarOpen(false);
};
  
  return (
    <div>
      <Header />
      <ToastContainer/>
      {projectData ? (
        <ContentWrapper>
          <div className="detailsBanner">
          <ToastContainer/>
            <div className="title">
              <h1>{projectData.name}</h1>
            </div>
            <ul className="menuItems">
              <li className="menuItem">
                <img
                  src={
                    "https://img.freepik.com/premium-photo/detailed-comic-book-art-young-female-warrior-standing-alone-neoncity-street-ai-generated_665346-45905.jpg" ||
                    avatar
                  }
                  alt=""
                  className="avatarImage"
                />
                {userName && <span style={{ color: "white" }}>{userName}</span>}
                <span className="badge">Top Rated</span>
              </li>
              <li className="menuItem iconBox">
                <FaShare className="icon" title="Share" />
              </li>
              <li className="menuItem iconBox">
                <FaFlag className="icon" title="Report" />
              </li>
              <li className="menuItem iconBox">
                <FaArrowRight className="icon" title="Go to" />
              </li>
              {isOwner && (
                <>
                <li className="menuItem iconBox" onClick={handleOpen}>
                <FaPencilAlt className="icon" title="Edit" />
              </li>
              <li className="menuItem iconBox" onClick={handleOpen}>
                <FaTrash className="icon" title="Delete Project" />
              </li>
                </>
              )
              }
            </ul>
           
            <div className="content">
              <div className="left">
              <Swiper
  style={{
    "--swiper-navigation-color": "#fff",
    "--swiper-pagination-color": "#fff",
  }}
  lazy={true}
  pagination={{
    clickable: true,
  }}
  thumbs={{ swiper: thumbsSwiper }}
  navigation={true}
  modules={[Pagination, Navigation, Thumbs]}
  className="mySwiper"
>
  {projectData.thumbnailImages && projectData.thumbnailImages.length > 0 ? (
    projectData.thumbnailImages.map((image, index) => (
      <SwiperSlide key={index} onClick={() => window.open(projectData.thumbnailImages[index], '_blank')}>
        <Img
          className="thumbImg"
          src={image || PosterFallback}
          alt={`Thumbnail ${index + 1}`}
        />
      </SwiperSlide>
    ))
  ) : (
    <SwiperSlide>
      <Img
        className="thumbImg"
        src={projectData.thumbnailImages || PosterFallback}
        alt="Thumbnail"
      />
    </SwiperSlide>
  )}
</Swiper>

                {/* Thumbnail Swiper */}
                <Swiper
                  onSwiper={setThumbsSwiper}
                  spaceBetween={10}
                  slidesPerView={4}
                  freeMode={true}
                  watchSlidesProgress={true}
                  modules={[Navigation, Thumbs]}
                  className="mySwiper-thumbs"
                >
                  {projectData.thumbnailImages &&
                  projectData.thumbnailImages.length > 0 ? (
                    projectData.thumbnailImages.map((image, index) => (
                      <SwiperSlide key={index}>
                        <Img
                          className="thumbImg"
                          src={image || PosterFallback}
                          alt={`Thumbnail ${index + 1}`}
                        />
                      </SwiperSlide>
                    ))
                  ) : (
                    <SwiperSlide>
                      <Img
                        className="thumbImg"
                        src={projectData.thumbnailImages || PosterFallback}
                        alt="Thumbnail"
                      />
                    </SwiperSlide>
                  )}
                </Swiper>
                
                
              </div>
              <div className="description1">{projectData.description}</div>
              <div className="right">
                <div className="project-container row-layout">
                  {HeroBannerData.map((project, index) => (
                    <div key={index} className="project-item">
                      <img
                        src={project.projectImageLink}
                        alt={project.projectTitle}
                        className="project-image"
                      />
                      <div className="project-content">
                        <h4>{project.projectTitle}</h4>
                        {/* <p>{project.projectDescription}</p> */}
                        <div className="avatarContainer2">
                          <div className="profileIcon2">
                            <img src={project.profileIconLink} alt="Profile" />
                            <span>{project.profileName}</span>
                          </div>
                        </div>

                        <div className="iconsContainer2">
                          <div className="icons2">
                            <MdShare className="icon" />
                            <MdThumbUp className="icon" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          
            <br />
      
            <h4
              style={{
                color: "white",
                marginBottom: "30px",
                marginTop: "50px",
              }}
            >
              Like My Project?
            </h4>
            <div className="User-Profile">
              <div className="avatar-container">
                <img
                  src={
                    "https://img.freepik.com/premium-photo/detailed-comic-book-art-young-female-warrior-standing-alone-neoncity-street-ai-generated_665346-45905.jpg  " ||
                    avatar
                  }
                  alt=""
                  className="avatarImage"
                />
              </div>
              <div className="user-details">
                <h3 className="username">{userName}</h3>
                <p className="user-description">
                  Web Developer | Graphic Designer | ZealPlane Seller
                </p>
                <div className="user-stats">
                  <div className="stat">
                    <h4>Projects Completed</h4>
                    <p>10</p>
                  </div>
                  <div className="stat">
                    <h4>Orders Completed</h4>
                    <p>5</p>
                  </div>
                  <div className="stat">
                    <h4>Positive Ratings</h4>
                    <p>80%</p>
                  </div>
                </div>
                <div className="user-actions">
                  <IconButton className="likeButton" onClick={handleLikeClick}>
                    <FaThumbsUp style={{ color: liked ? "blue" : "orange" }} />
                  </IconButton>
                  <IconButton className="messageButton">
                    <FaPlus style={{ color: "orange" }} />
                  </IconButton>
                  <IconButton
                    className="messageButton"
                    onClick={() => Enquiry()}
                  >
                    <FaShare style={{ color: "orange" }} />
                  </IconButton>
                </div>
              </div>
              <div className="like-info">
                {likesCount > 0 ? (
                  <p>{likesCount} {likesCount === 1 ? 'like' : 'likes'}</p>
                ) : (
                  <p>Be the first to like the project</p>
                )}
              </div>
            </div>
            <Feedback />
          </div>
        </ContentWrapper>
      ) : (
        <p>Loading...</p>
      )}
      <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          width: 400,
          padding: 2,
          backgroundColor: 'white',
          margin: 'auto',
          marginTop: '20vh',
          borderRadius: 2,
        }}
      >
       <Typography variant="h6" gutterBottom sx={{ color: 'black' }}>
  Edit Project
</Typography>

        {/* File input for images */}
        <input
          type="file"
          multiple
          onChange={(e) => {
            handleFileChange(e);
            setUploadedFiles(Array.from(e.target.files)); // Update uploaded files
          }}
          accept="image/*"
          style={{ display: 'block', marginBottom: '10px' }} // Styles for the file input
        />

        {/* Preview of uploaded images */}
        {uploadedFiles.length > 0 && (
          <Box mt={2} display="flex" flexWrap="wrap" gap={1}>
            {uploadedFiles.map((file, index) => (
              <img
                key={index}
                src={URL.createObjectURL(file)}
                alt={`Preview ${index + 1}`}
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '4px',
                  objectFit: 'cover',
                  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)', // Adds shadow to preview
                }}
              />
            ))}
          </Box>
        )}

        {/* Loading spinner and buttons */}
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
            <CircularProgress /> {/* Loading spinner */}
            <Typography variant="body2" sx={{ ml: 2 }}>
              Uploading...
            </Typography>
          </Box>
        ) : (
          <Box mt={2} display="flex" justifyContent="space-between">
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpload} // Use the upload handler
            >
              Update
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        )}

        {/* Snackbar for feedback */}
        <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
          <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
            Project updated successfully!
          </Alert>
        </Snackbar>
      </Box>
    </Modal>
    </div>
  );
};

export default DetailsPage;
