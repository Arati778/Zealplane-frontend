import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "antd";
import { FaTimes, FaEdit } from "react-icons/fa";
import Modal from "react-modal";
import { useSelector, useDispatch } from "react-redux";
import { setUserId } from "../../store/userAction";
import "./avatar.scss";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



Modal.setAppElement("#root");

const ProfileCard = () => {
  const user = useSelector((state) => state.user.user);
  const userIdRedux = useSelector((state) => state.user.userId);
  const userIdLocalStorage = localStorage.getItem("Id");
  const userId = userIdRedux || userIdLocalStorage;
  const dispatch = useDispatch();
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const [data, setData] = useState({
    username: "Krishna",
    jobRole: "FullStack Developer",
    description: "This is demo description",
    fullName: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    jobRole: data.jobRole,
    description: data.description,
  });
  const { id } = useParams();

  // Determine if the current user is viewing their own profile
  const isOwner = id === userId;
  // console.log("userId", userId);
  // console.log("id", id);
  

  useEffect(() => {
    // Fetch user data from backend API
    const fetchUserData = async () => {
      try {
        // Use 'id' from URL if present; otherwise, use 'userId'
        const userIdToFetch = id || userId;
        const response = await axios.get(`${apiBaseUrl}/users/${userIdToFetch}`);
        console.log("User data is:", response.data);
        const { fullName, description, jobRole } = response.data;
        setData((prevData) => ({
          ...prevData,
          fullName: fullName || "Full Name not provided",
          description: description || "Description not provided",
          jobRole: jobRole || "Job Role not provided",
        }));
        setFormData({
          jobRole: jobRole || "Job Role not provided",
          description: description || "Description not provided",
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [id, userId]);

  useEffect(() => {
    if (!userIdRedux && userIdLocalStorage) {
      dispatch(setUserId(userIdLocalStorage));
    }
  }, [dispatch, userIdRedux, userIdLocalStorage]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ 
      ...formData,
      [name]: value,
    });
  };

  const handleSaveButtonClick = async () => {
    try {
      const response = await axios.put(
        `${apiBaseUrl}/users/${userId}`,
        {
          jobRole: formData.jobRole,
          description: formData.description,
        }
      );
      console.log("User data updated:", response.data);
      toast.success("Your description updated succesfully!");
      setData({
        ...data,
        jobRole: formData.jobRole,
        description: formData.description,
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user data:", error);
      toast.error("description update failed! please try again")
    }
  };

  const customStyles = {
    overlay: {
      position: "fixed",
      inset: 0,
      backgroundColor: "rgba(0, 0, 0, 0.4)",
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "40%",
      height: "70%",
      backgroundColor: "white",
      color: "black",
      padding: "20px",
    },
  };

  const responsiveStyles = () => {
    if (window.innerWidth <= 768) {
      customStyles.content.width = "80%";
      customStyles.content.height = "auto";
      customStyles.content.padding = "10px";
    }
  };

  responsiveStyles();
  window.addEventListener("resize", responsiveStyles);

  return (
    <div className="col mb-3" style={{ marginTop: "30px" }}>
    <ToastContainer/>
      <div>
      <div
          className="card"
          style={{
            background: "transparent",
            color: "white",
            marginLeft: "10px",
            width: "100%",
            overflow: "auto",
            maxHeight: "250px",
          }}
        >
          {/* Conditionally render the Edit button */}
          {isOwner && (
            <Button className="Edit" onClick={handleEditClick}>
              <FaEdit />
            </Button>
          )}
          <h5>
            <strong>Artist</strong> // <strong>Writer</strong> //{" "}
            <strong>FullStack Developer</strong> // {data.jobRole}
          </h5>
          <br />
          <h6>About Me</h6>
          <div className="fade-text-container">
        <span>
          <p className="fade-text" style={{ color: "white" }}>
            {data.description}
          </p>
        </span>
      </div>
        </div>
      </div>

      <Modal
        isOpen={isEditing}
        onRequestClose={handleCancelClick}
        contentLabel="Edit Modal"
        style={customStyles}
      >
        <span
          onClick={handleCancelClick}
          style={{
            fontSize: "20px",
            cursor: "pointer",
            color: "rgb(39, 39, 39)",
            display: "flex",
            justifyContent: "end",
          }}
        >
          <FaTimes />
        </span>
        <div className="card-input-container">
          <h5>What's Your Passion</h5>
          <input
            type="text"
            name="jobRole"
            value={formData.jobRole}
            placeholder="Writer / Artist / Developer / Designer"
            onChange={handleInputChange}
            style={{ marginBottom: "10px", width: "100%" }}
          />
          <br />
          <h5>Description</h5>
          <input
            type="text"
            name="description"
            value={formData.description}
            placeholder="About You"
            onChange={handleInputChange}
            style={{ marginBottom: "10px", width: "100%" }}
          />
          <br />
          <h5>Your birth date?</h5>
          <input
            type="text"
            name="dob"
            value={formData.dob}
            placeholder="About Your date of birth"
            onChange={handleInputChange}
            style={{ marginBottom: "10px", width: "100%" }}
          />
          <span>
            <Button
              type="primary"
              onClick={handleSaveButtonClick}
              style={{ width: "60px" }}
            >
              Save
            </Button>
          </span>
        </div>
      </Modal>
    </div>
  );
};

export default ProfileCard;
