import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./postdetail.scss";
import Header from "./Component/Header";
import PostInfo from "./Component/Posts/PostInfo";
import PostInteractions from "./Component/Posts/PostInteract";
import CommentsSection from "./Component/Posts/CommentsSection";
import Sidebar from "./Component/Sidebar";
import Spinner from "../../components/spinner/Spinner";
import axiosInstance from "../../Auth/Axios";
import { jwtDecode } from "jwt-decode";

const PostDetail = () => {
  const { id } = useParams(); // Get the post ID from the URL
  const navigate = useNavigate(); // Initialize navigate for redirection
  const [post, setPost] = useState(null); // State to store the post data
  const [comments, setComments] = useState([]); // State to store comments
  const [userVote, setUserVote] = useState(null); // Track if user upvoted or downvoted
  const [status, setStatus] = useState(null);
  const [hasVoted, setHasVoted] = useState(null);
  const token = localStorage.getItem("token");

  const getCurrentUserId = () => {
    const token = localStorage.getItem("token");
    try {
      const decodedToken = jwtDecode(token);

      // Assuming the uniqueId is stored in the token as "uniqueId"
      const currentUserId = decodedToken.uniqueId;
      return currentUserId;
    } catch (error) {
      return null;
    }
  };

  const currentUserId = getCurrentUserId();
  console.log("Current User ID:", currentUserId);

  // Define fetchUserVote outside useEffect
  const fetchUserVote = async () => {
    try {
      const res = await axiosInstance.get(
        `http://localhost:5000/api/posts/${id}/vote`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("User has interacted:", res.data.hasVoted);
      setHasVoted(res.data.hasVoted);

      if (res.data.hasVoted) {
        setUserVote(res.data.voteValue > 0 ? "upvote" : "downvote");
      }
    } catch (error) {
      console.error("Error fetching user vote:", error);
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/posts/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("post is", response.data);

        setPost({
          ...response.data.post,
          votes: response.data.post.votes || [],
        });
        setStatus(response.data.status);
        setComments(response.data.post.comments || []);
      } catch (error) {
        console.error("Error fetching post:", error);
        toast.error("Failed to fetch post details!");
      }
    };

    fetchPost();
    fetchUserVote(); // Call fetchUserVote from within useEffect
  }, [id, token]);

  const handleVote = async (voteType) => {
    try {
      const voteValue = voteType === "upvote" ? 1 : -1;

      console.log("voteType:", voteType);
      console.log("voteValue:", voteValue);

      // Check if the user has already voted
      const checkUserVoteResponse = await axios.get(
        `http://localhost:5000/api/posts/${id}/vote`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const { hasVoted, voteValue: userVoteValue } = checkUserVoteResponse.data;

      console.log("Has user voted:", hasVoted);
      console.log("User's current vote value:", userVoteValue);

      // Update the UI based on the current state
      if (hasVoted && userVoteValue === voteValue) {
        // User is toggling off their vote
        setUserVote(null); // Clear the user's vote state
        setPost((prevPost) => ({
          ...prevPost,
          votes: prevPost.votes.filter(
            (vote) => vote.uniqueId !== currentUserId
          ),
          votesCount: prevPost.votesCount - 1, // Decrement count
        }));
      } else {
        // User is either voting for the first time or changing their vote
        setUserVote(voteType); // Update vote state
        setPost((prevPost) => {
          const updatedVotes = prevPost.votes || [];
          const existingVoteIndex = updatedVotes.findIndex(
            (vote) => vote.uniqueId === currentUserId
          );

          if (existingVoteIndex >= 0) {
            // Update existing vote
            updatedVotes[existingVoteIndex].value = voteValue;
          } else {
            // Add a new vote
            updatedVotes.push({ uniqueId: currentUserId, value: voteValue });
          }

          return {
            ...prevPost,
            votes: updatedVotes,
            votesCount:
              prevPost.votesCount +
              (hasVoted ? voteValue - userVoteValue : voteValue), // Adjust count
          };
        });
      }

      // Sync with backend (Update vote on the server)
      const res = await axios.put(
        `http://localhost:5000/api/posts/votes/${id}`,
        { voteType: voteValue },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Response from backend:", res.data);

      toast.success("Vote updated successfully!");
    } catch (error) {
      console.error("Error voting on post:", error);
      toast.error("An error occurred while voting.");
    }
  };

  const handleEditPost = async (updatedData) => {
    try {
      const response = await axiosInstance.put(
        `http://localhost:5000/api/posts/${post._id}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Post updated successfully!");
      setPost(response.data.updatedPost);
    } catch (error) {
      console.error("Error updating post:", error);
      toast.error("Failed to update the post!");
    }
  };

  const handleDeletePost = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (!confirmDelete) return;

    try {
      await axiosInstance.delete(`http://localhost:5000/api/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Post deleted successfully!");
      navigate("/forum");
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("Failed to delete the post!");
    }
  };

  if (!post) return <Spinner />;

  const votesCount = post.votes ? post.votes.length : 0;

  return (
    <div className="post">
      <Header />

      <div className="post-detail-container">
        <div className="sidebar-component">
          <Sidebar />
        </div>
        <div className="post-content">
          <PostInfo
            post={post}
            status={status}
            onEdit={handleEditPost}
            onDelete={handleDeletePost}
          />

          <PostInteractions
            post={post}
            userVote={userVote}
            handleVote={handleVote}
            commentCount={comments.length}
            votesCount={votesCount}
            hasVoted={hasVoted}
          />

          <CommentsSection
            comments={comments}
            setComments={setComments}
            postId={id}
          />
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
