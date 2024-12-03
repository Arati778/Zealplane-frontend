import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import "react-toastify/dist/ReactToastify.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { CiImageOn } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import axiosInstance from "../.../../../Auth/Axios";
import "./createPost.scss";
import Header from "./Component/Header";
import Sidebar from "./Component/Sidebar";
import Spinner from "../../components/spinner/Spinner";

const CreatePost = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state

  const userIdRedux = useSelector((state) => state.user.userId);
  const userIdLocalStorage = localStorage.getItem("Id");
  const userId = userIdRedux || userIdLocalStorage;
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const getUniqueIdFromToken = () => {
    if (!token) {
      console.error("No token found in localStorage");
      return null;
    }

    try {
      const decodedToken = jwtDecode(token); // Decode the token
      return decodedToken.uniqueId || null; // Return uniqueId if it exists
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  const uniqueId = getUniqueIdFromToken();

  const [formData, setFormData] = useState({
    title: "",
    body: "",
    subreddit: "",
    author: "",
    profilePic: "",
    image: null, // Storing the image as a file
    uniqueId: null,
  });

  const { title, body, subreddit, author, profilePic, image } = formData;

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (userId) {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/users/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`, // Include the token in the request
              },
            }
          );
          const { username, profilePic } = response.data.user;
          setFormData((prevData) => ({
            ...prevData,
            author: username,
            profilePic,
          }));
        } catch (error) {
          console.error(
            "Error fetching user details:",
            error.response?.data || error.message
          );
        }
      }
    };
    fetchUserDetails();
  }, [userId]);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleBodyChange = (value) => {
    setFormData({ ...formData, body: value });
  };

  const handleImageInsert = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 1024 * 1024 * 2) {
        toast.error("Image size should be less than 2MB");
      } else {
        setFormData({ ...formData, image: file });
      }
    }
  };

  const handleFileUploadClick = () => {
    document.getElementById("file-input").click();
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!author || !profilePic) {
      console.error("User information is missing, please try again.");
      return;
    }

    const cleanedBody = body
      .replace(/<\/?p>/g, "")
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/background-color:[^;]+;/gi, ""); // Removes background-color styles

    const postData = new FormData();
    postData.append("title", title);
    postData.append("body", cleanedBody);
    postData.append("subreddit", subreddit);
    postData.append("author", author);
    postData.append("profilePic", profilePic);
    postData.append("uniqueId", uniqueId);
    if (image) {
      postData.append("post_image", image); // Appending the image to FormData
    }
    console.log("formData appended successfully!");

    setLoading(true); // Set loading state to true when submitting

    try {
      const res = await axiosInstance.post(
        "http://localhost:5000/api/posts",
        postData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Post created successfully!", res.data);
      navigate(`/post/${res.data._id}`);
      setFormData({
        title: "",
        body: "",
        subreddit: "",
        author: "",
        profilePic: "",
        image: null,
      });
    } catch (err) {
      if (err.response) {
        console.error("Error response data:", err.response.data);
      } else if (err.request) {
        console.error("Error request data:", err.request);
      } else {
        console.error("Error message:", err.message);
      }
      toast.error("Failed to create post!");
    } finally {
      setLoading(false); // Set loading state to false once the request completes
    }
  };

  const handleRemoveImage = () => {
    setShowConfirmation(false);
    setFormData({ ...formData, image: null });
  };

  return (
    <div className="app-container">
      <Header />

      <div className="create-post-container">
        <div className="sidebar-component">
          <Sidebar />
        </div>

        <div className="create-post">
          {loading && (
            <div className="loading-screen">
              <p>
                <Spinner />
              </p>{" "}
              {/* You can add a spinner here */}
            </div>
          )}

          <h2>Create a New Post</h2>
          <div className="user-info">
            {profilePic && <img src={profilePic} alt="Profile" />}
            <span className="username">{author}</span>
          </div>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                name="title"
                value={title}
                onChange={onChange}
                required
                placeholder="Enter the post title"
              />
            </div>
            <div className="form-group">
              <label>Body</label>
              <ReactQuill
                value={body}
                theme="snow"
                onChange={handleBodyChange}
                required
                placeholder="Write your post content here..."
                className="quill"
              />
            </div>
            <div className="form-group">
              <label>Subreddit</label>
              <input
                type="text"
                name="subreddit"
                value={subreddit}
                onChange={onChange}
                required
                placeholder="Enter subreddit name"
              />
            </div>
            <div className="file-upload">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageInsert}
                id="file-input"
                style={{ display: "none" }}
              />
              <button
                type="button"
                onClick={handleFileUploadClick}
                className="upload-button"
              >
                <CiImageOn /> Upload Image
              </button>

              {image && (
                <div className="image-container">
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Preview"
                    className="image-preview"
                  />
                  <RxCross2
                    className="remove-icon"
                    onClick={() => setShowConfirmation(true)}
                  />
                </div>
              )}

              {showConfirmation && (
                <div className="confirmation-popup">
                  <p>Are you sure you want to remove this image?</p>
                  <button onClick={handleRemoveImage}>Yes</button>
                  <button onClick={() => setShowConfirmation(false)}>No</button>
                </div>
              )}
            </div>
            <button
              type="submit"
              className="submit-button"
              disabled={loading} // Disable the button while loading
            >
              {loading ? (
                <>
                  Creating Post...
                  <div className="spinner"></div>
                </>
              ) : (
                "Create Post"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
