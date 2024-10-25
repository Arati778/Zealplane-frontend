import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostList from './Component/PostList';
import Header from './Component/Header';
import Sidebar from './Component/Sidebar';
import './style.scss';

const Home = () => {
  const [posts, setPosts] = useState([]);

  // Fetch posts from the backend
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/posts');
        console.log(response.data);
        
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  // Combine backend posts with dummy posts (optional)
  const combinedPosts = [...posts];

  return (
    <div className="home-container">
      <Header />
      <div className="main-content">
        <Sidebar />
        <main className="content-container">
          {/* <h2 className="page-title">Recent Posts</h2> */}
          <PostList posts={combinedPosts} />
        </main>
      </div>
    </div>
  );
};

export default Home;
