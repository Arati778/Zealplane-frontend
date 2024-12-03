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
import axiosInstance from "../../Auth/Axios";

Modal.setAppElement("#root");

const ProfileCard = () => {
  const userIdRedux = useSelector((state) => state.user.userId);
  const userIdLocalStorage = localStorage.getItem("Id");
  const userId = userIdRedux || userIdLocalStorage;
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");

  const [data, setData] = useState({
    username: "",
    jobRole: "",
    description: "",
    location: "",
    fullName: "",
    status: "", // Add status here
  });
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullname: data.fullname,
    jobRole: data.jobRole,
    description: data.description,
    location: data.location,
  });
  const { id } = useParams();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userIdToFetch = id || userId;
        const response = await axiosInstance.get(`users/${userIdToFetch}`);
        console.log("User data is:", response.data);

        const { fullName, description, jobRole, location, status } =
          response.data.user;
        setStatus(response.data);

        setData({
          fullName: fullName || "Enter Your Full Name",
          description: description || "Your Description!",
          jobRole: jobRole || "Your Profession",
          location: location || "Your Location",
        });

        setFormData({
          fullname: fullName || "",
          jobRole: jobRole || "",
          location: location || "",
          description: description || "",
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
      const token = localStorage.getItem("token");

      const response = await axiosInstance.put(
        `/users/${userId}`,
        {
          fullName: formData.fullname,
          jobRole: formData.jobRole,
          location: formData.location,
          description: formData.description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("User data updated:", response.data);
      toast.success("Your description updated successfully!");
      setData({
        ...data,
        fullName: formData.fullname,
        jobRole: formData.jobRole,
        location: formData.location,
        description: formData.description,
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user data:", error);
      toast.error("Description update failed! Please try again.");
    }
  };

  const customStyles = {
    overlay: {
      position: "fixed",
      inset: 0,
      backgroundColor: "rgba(0, 0, 0, 0.4)",
    },
    content: {
      top: "53%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "40%",
      height: "85%",
      backgroundColor: "white",
      color: "black",
      padding: "20px",
    },
  };

  return (
    <div className="col mb-3" style={{ marginTop: "10px" }}>
      <ToastContainer />
      <div>
        <div
          className="card"
          style={{
            background: "transparent",
            color: "white",
            marginLeft: "10px",
            width: "100%",
            overflow: "auto",
            maxHeight: "270px",
          }}
        >
          {/* Conditionally render the Edit button */}
          {status.status !== "visitor" && (
            <Button className="Edit" onClick={handleEditClick}>
              <FaEdit />
            </Button>
          )}
          <h4>{data.fullName}</h4>
          <h5 style={{ color: "#34aadc" }}>{data.jobRole}</h5>
          <h7 style={{ color: "#ced4da" }}>{data.location}</h7>
          <br />
          <h5 style={{ fontWeight: "200" }}>About</h5>
          <div className="fade-text-container">
            <span>
              <p
                className="fade-text"
                style={{ color: "white", marginBottom: "1px" }}
              >
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
            fontSize: "1px",
            cursor: "pointer",
            color: "rgb(39, 39, 39)",
            display: "flex",
            justifyContent: "end",
          }}
        >
          <FaTimes />
        </span>
        <div className="card-input-container">
          <h5 className="pt-sm-2 pb-1 mb-0 mt-3 text-nowrap">
            Enter Your Full Name
          </h5>
          <input
            type="text"
            name="fullname"
            value={formData.fullname}
            placeholder="Your Full Name"
            onChange={handleInputChange}
            style={{ marginBottom: "5px", width: "100%", fontSize: "18px" }}
          />
          <br />
          <h5>What's Your Passion</h5>
          <input
            type="text"
            name="jobRole"
            value={formData.jobRole}
            placeholder="Writer / Artist / Developer / Designer"
            onChange={handleInputChange}
            style={{ marginBottom: "5px", width: "100%" }}
          />
          <br />
          <h5>Location</h5>
          <input
            type="text"
            name="location"
            value={formData.location}
            placeholder="Your Location"
            onChange={handleInputChange}
            style={{ marginBottom: "5px", width: "100%" }}
          />
          <br />
          <h5>Description</h5>
          <input
            type="text"
            name="description"
            value={formData.description}
            placeholder="About You"
            onChange={handleInputChange}
            style={{ marginBottom: "5px", width: "100%" }}
          />
          <br />
          <Button
            type="primary"
            onClick={handleSaveButtonClick}
            style={{ width: "60px" }}
          >
            Save
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default ProfileCard;
