import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { CiImageOn } from 'react-icons/ci'; // Import the CiImageOn icon
import "./createPost.scss";

const CreatePost = () => {
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    subreddit: '',
    author: '', // Will be populated by fetched user data
    profilePic: '', // Will be populated by fetched user data
    image: '',
  });

  const { title, body, subreddit, author, profilePic, image } = formData;

  // Fetch userId from either Redux store or LocalStorage
  const userIdRedux = useSelector((state) => state.user.userId);
  const userIdLocalStorage = localStorage.getItem('Id');
  const userId = userIdRedux || userIdLocalStorage;
  
  const navigate = useNavigate();
  const fileInputRef = useRef(null); // Reference for the hidden file input

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (userId) {
        try {
          const response = await axios.get(`http://localhost:5000/api/users/${userId}`);
          const { username, profilePic } = response.data;
          setFormData((prevData) => ({
            ...prevData,
            author: username,
            profilePic,
          }));
        } catch (error) {
          console.error('Error fetching user details:', error);
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
      const reader = new FileReader();
      reader.onloadend = () => {
        // You can add your logic for using the image here
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileUploadClick = () => {
    fileInputRef.current.click(); // Simulate a click on the hidden file input
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    
    if (!author || !profilePic) {
      toast.error('User information is missing, please try again.');
      return;
    }
    
    try {
      const res = await axios.post('http://localhost:5000/api/posts', formData);
      console.log('Post created:', res.data);
      navigate(`/post/${res.data._id}`);
      toast.success('Post created successfully!');
      setFormData({
        title: '',
        body: '',
        subreddit: '',
        author: '',
        profilePic: '',
        image: '',
      });
    } catch (err) {
      console.error('Error creating post:', err.response?.data || err.message);
      toast.error('Failed to create post!');
    }
  };

  return (
    <div className="create-post">
      <h2>Create a New Post</h2>
      <div className="user-info">
        {profilePic && <img src={profilePic} alt="Profile" />}
        <span className="username">{author}</span>
      </div>
      <form onSubmit={onSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <label>Body</label>
          <ReactQuill 
            value={body}
            onChange={handleBodyChange}
            required
            placeholder="Write your post content here..."
            className="quill"
          />
          <div className="file-upload">
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageInsert} 
              ref={fileInputRef} 
              style={{ display: 'none' }} // Hide the file input
            />
            <button type="button" onClick={handleFileUploadClick} className="upload-button">
              <CiImageOn /> Upload Image {/* Button with icon */}
            </button>
            {image && <img src={image} alt="Preview" className="image-preview" />}
          </div>
        </div>
        <div>
          <label>Subreddit</label>
          <input
            type="text"
            name="subreddit"
            value={subreddit}
            onChange={onChange}
            required
          />
        </div>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default CreatePost;
