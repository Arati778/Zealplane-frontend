import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, IconButton, Modal, Box, TextField, Button } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import Img from "../lazyLoadImage/Img";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
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
} from "react-icons/fa"; // Importing icons
import axios from "axios"; // Import axios
import avatar from "../../assets/avatar.png";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import Header from "../../components/header/Header";
import { useSelector } from "react-redux";
import "./style.scss";
import DemoCarausel from "./DemoCarousel";
import projectData from "./ProjectsData";
import { Pagination, Navigation, Thumbs } from "swiper/modules";
import Cast from "../../pages/details/cast/Cast";
import Feedback from "./Projexts/Feedback";

const DemoProjectPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const user = useSelector((state) => state.user.user);
  const userIdRedux = useSelector((state) => state.user.userId); // Get userId from Redux store
  const userIdLocalStorage = localStorage.getItem("Id"); // Get userId from local storage
  const userId = userIdRedux || userIdLocalStorage; // Use userId from Redux if available, otherwise use local storage
  const [userName, setUserName] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Log projects from index 0 to 2
    for (let i = 0; i <= 2; i++) {
      console.log(`projectsData[${i}]:`, projectData[i]);
    }
    // Find and set the project matching projectId
    const matchedProject = projectData.find((p) => p.id === id);
    console.log("projectId:", id);
    console.log("matchedProject:", matchedProject);
    setProject(matchedProject);
  }, [id]);

  // States for the modal
  const [open, setOpen] = useState(false);
  const [newImage, setNewImage] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `https://thezealplane-6dsp3b2ixq-uc.a.run.app/getUserDetails/${userId}`
        );
        setUserName(response.data.username);
        setProfilePic(response.data.profilePic);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [userId]);

  const handleAddImage = () => {
    // Implement logic to add an image to the project
    console.log("Add image functionality");
  };

  const handleCardClick = () => {
    // Implement logic for handling card click
    console.log("Card clicked");
  };

  // Modal handlers
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Implement logic to add new image and description
    console.log("New Image:", newImage);
    console.log("Uploaded Image:", uploadedImage);
    console.log("New Description:", newDescription);
    // Close the modal after submission
    handleClose();
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadedImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const sendToTheatre = () => {
    const requestData = {
      userId: "Krishna060$U",
      projectId: "49fa8fef-8794-4a07-a861-b443f533079e",
      theatrePicId: "cqlyuwqibmdpfd5k7lkm",
    };

    axios
      .post(
        "https://thezealplane-6dsp3b2ixq-uc.a.run.app/uploadToTheatre",
        requestData
      )
      .then((response) => {
        console.log("Image sent to theatre successfully:", response.data);
        // Handle success, e.g., show a success message
      })
      .catch((error) => {
        console.error("Error sending image to theatre:", error);
        // Handle error, e.g., show an error message
      });
  };

  const Enquiry = () => {
    const EnquiryData = {
      userId: "king$U",
      userIdOfScroller: "kufu$U",
    };
    axios
      .post("https://thezealplane-6dsp3b2ixq-uc.a.run.app/enquiry", EnquiryData)
      .then((response) => {
        console.log("Successfully Enquired:", response.data);
        // Handle success, e.g., show a success message
      })
      .catch((error) => {
        console.error("Enquiry Failed:", error);
        // Handle error, e.g., show an error message
      });
  };

  return (
    <div>
      <Header />
      <ContentWrapper>
        <div className="detailsBanner">
          <Breadcrumbs
            aria-label="breadcrumbs"
            className="enhanced-breadcrumbs"
          >
            <Link onClick={() => navigate("/home")} className="breadcrumb-link">
              <FaHome className="breadcrumb-icon" />
              Home
            </Link>
            {/* 
            <Link
              onClick={() => navigate("/projects")}
              className="breadcrumb-link"
            >
              <FaFolder className="breadcrumb-icon" />
              Projects
            </Link>
            <Typography className="breadcrumb-current">Details</Typography> */}
          </Breadcrumbs>
          <div className="title">
            {/* <h2>This is a Superman for you !! Golden age Superman !</h2> */}
            <div className="title">{project && <h2>{project.name}</h2>}</div>
          </div>
          <ul className="menuItems">
            <li className="menuItem">
              {userName && <span>{userName}</span>}
              <img src={profilePic || avatar} alt="" className="avatarImage" />
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
            <li className="menuItem iconBox" onClick={handleOpen}>
              <FaPencilAlt className="icon" title="Edit" />
            </li>
            <li className="menuItem iconBox" onClick={handleOpen}>
              <FaTrash className="icon" title="Delete Project" />
            </li>
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
                {project &&
                  project.ThumnailLinks.map((img, index) => (
                    <SwiperSlide key={index}>
                      <img src={img} alt={`Slide ${index}`} loading="lazy" />
                      <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                    </SwiperSlide>
                  ))}
              </Swiper>
              <Swiper
                style={{
                  "--swiper-navigation-color": "#fff",
                  "--swiper-pagination-color": "#fff",
                }}
                lazy={true}
                pagination={{
                  clickable: true,
                }}
                onSwiper={setThumbsSwiper} // Sync the thumbs swiper with the state
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[Navigation, Thumbs]}
                className="mySwiper2"
              >
                {project &&
                  project.ThumnailLinks.map((img, index) => (
                    <SwiperSlide key={index}>
                      <img
                        src={img}
                        alt={`Thumbnail ${index}`}
                        loading="lazy"
                      />
                      <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
            <div className="right">
              <div className="overview">
                <div className="description">
                  <h3 className="Description-Title">Description</h3>
                  {project && (
                    <>
                      <p
                        style={{
                          fontSize: "17px",
                          letterSpacing: "0.5px",
                          color: "#f3f0f0",
                        }}
                      >
                        {project.description}
                      </p>
                    </>
                  )}
                </div>

                <br />
                <p className="tags-Title">Project Tag</p>
                <div className="tags">
                  {project && (
                    <>
                      <span>{project.tags}</span>
                    </>
                  )}
                </div>
                <div className="created">
                  {project && (
                    <>
                      created by: <span> {project.Publisher}</span>
                    </>
                  )}
                </div>
                <div className="created">
                  {project && (
                    <>
                      genre: <span> {project.genre}</span>
                    </>
                  )}
                </div>
                <div className="created">
                  {project && (
                    <>
                      status: <span> {project.status}</span>
                    </>
                  )}
                </div>
              </div>
              <div className="Team-Members">
                Team Members
                <div className="Team-Mmebers-Profile">
                  <img
                    src={profilePic || avatar}
                    alt=""
                    className="avatarImage"
                  />
                  <img
                    src={profilePic || avatar}
                    alt=""
                    className="avatarImage"
                  />
                </div>
              </div>
              <div className="buttons">
                <button className="wishlistButton">
                  <FaHeart /> Wishlist (0)
                </button>
              </div>
            </div>
          </div>
          <br />
          <h4 style={{ color: "white", marginBottom: "30px" }}>
            Like My Project?
          </h4>
          <div className="User-Profile">
            <div className="avatar-container">
              <img src={profilePic || avatar} alt="" className="avatarImage" />
            </div>
            <div className="user-details">
              <h3 className="username">{userName}</h3>
              <p className="user-description">
                Web Developer | Graphic Designer | ZealPlane Seller
              </p>
              <div className="user-stats">
                <div className="stat">
                  <span className="stat-label">Projects:</span>
                  <span className="stat-value">10</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Followers:</span>
                  <span className="stat-value">500</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Likes:</span>
                  <span className="stat-value">300</span>
                </div>
              </div>
              <div className="user-actions">
                <IconButton className="likeButton">
                  <FaThumbsUp style={{ color: "orange" }} />
                </IconButton>
                <IconButton className="messageButton">
                  <FaPlus style={{ color: "orange" }} />
                </IconButton>
                <IconButton className="messageButton" onClick={() => Enquiry()}>
                  <FaShare style={{ color: "orange" }} />
                </IconButton>
              </div>
            </div>
          </div>
        </div>
        <Feedback />
      </ContentWrapper>

      {/* Modal for editing project */}
      <Modal open={open} onClose={handleClose}>
        <Box className="modal-box">
          <h2>Edit Project</h2>
          <form onSubmit={handleFormSubmit}>
            <TextField
              label="New Image URL"
              fullWidth
              margin="normal"
              value={newImage}
              onChange={(e) => setNewImage(e.target.value)}
            />
            <Button
              variant="contained"
              component="label"
              color="primary"
              fullWidth
              style={{ margin: "10px 0" }}
            >
              Upload File
              <input
                type="file"
                hidden
                onChange={handleFileUpload}
                accept="image/*"
              />
            </Button>
            <TextField
              label="New Description"
              fullWidth
              multiline
              rows={4}
              margin="normal"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              style={{ marginTop: "10px" }}
            >
              Save Changes
            </Button>
          </form>
          <Button
            variant="contained"
            className="cancel"
            onClick={handleClose}
            fullWidth
            style={{ marginTop: "10px" }}
          >
            Cancel
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default DemoProjectPage;
