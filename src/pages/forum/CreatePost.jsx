// src/components/CreatePost.js
import React, { useState } from 'react';
import axios from 'axios';
import "./createPost.scss";

const CreatePost = () => {
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    subreddit: '',
    author: '',
    image: '',
  });

  const { title, body, subreddit, author, image } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/posts', formData);
      console.log('Post created:', res.data);
      // Clear the form
      setFormData({
        title: '',
        body: '',
        subreddit: '',
        author: '',
        image: '',
      });
    } catch (err) {
      console.error('Error creating post:', err.response?.data || err.message);
    }
  };

  return (
    <div className="create-post">
      <h2>Create a New Post</h2>
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
          <textarea
            name="body"
            value={body}
            onChange={onChange}
            required
          />
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
        <div>
          <label>Author</label>
          <input
            type="text"
            name="author"
            value={author}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <label>Image URL</label>
          <input
            type="text"
            name="image"
            value={image}
            onChange={onChange}
          />
        </div>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default CreatePost;
