import React, { useState, useEffect } from "react";
import axios from "axios";
import PostList from "./Component/PostList";
import Header from "./Component/Header";
import Sidebar from "./Component/Sidebar";
import "./style.scss";
import Spinner from "../../components/spinner/Spinner";

const Home = () => {
  const [posts, setPosts] = useState([]); // State for storing posts
  const [loading, setLoading] = useState(true); // State to track loading status

  // Fetch posts from the backend
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/posts");
        console.log(response.data);
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchPosts();
  }, []);

  // Combine backend posts with dummy posts (optional)
  const combinedPosts = [...posts];

  return (
    <div className="home-container">
      <Header />
      <div className="sidebar-component">
        <Sidebar />
      </div>
      <div className="main-content" style={{ marginTop: "55px" }}>
        <main className="content-container">
          {loading ? (
            <Spinner /> // Show spinner while data is loading
          ) : (
            <PostList posts={combinedPosts} /> // Show posts when data is loaded
          )}
        </main>
      </div>
    </div>
  );
};

export default Home;
