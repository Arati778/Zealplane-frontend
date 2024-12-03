import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./postdetail.scss";
import Header from "./Component/Header";
import PostInfo from "./Component/Posts/PostInfo";
import PostInteractions from "./Component/Posts/PostInteract";
import CommentsSection from "./Component/Posts/CommentsSection";
import Sidebar from "./Component/Sidebar"; // Import Sidebar
import Spinner from "../../components/spinner/Spinner";
import { toast } from "react-toastify"; // Assuming you are using react-toastify

const PostDetail = () => {
  const { id } = useParams(); // Get the post ID from the URL
  const [post, setPost] = useState(null); // State to store the post data
  const [comments, setComments] = useState([]); // State to store comments
  const [userVote, setUserVote] = useState(null); // Track if user upvoted or downvoted
  const [status, setStatus] = useState(null);

  const token = localStorage.getItem("token"); // Retrieve the token from local storage

  // Function to get the current logged-in user's ID
  const getUserId = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user ? user.uniqueId : null; // Assuming you store the user object with uniqueId in localStorage
  };

  const currentUserId = getUserId();

  // Fetch the post data from the backend when the component mounts
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/posts/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the request
            },
          }
        );

        console.log("response of post is", response.data.post);

        // Initialize post, comments, and userVote state
        setPost({
          ...response.data.post,
          votes: response.data.post.votes || [], // Ensure votes is an array
        });
        setStatus(response.data.status);
        setComments(response.data.post.comments || []); // Ensure comments is an array
        setUserVote(response.data.post.votes || []); // Initialize user vote
        console.log("user votes are", userVote);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [id, token]);

  const handleVote = async (voteType) => {
    try {
      if (voteType !== "upvote") {
        console.error("Invalid vote type"); // Only allow upvote
        return;
      }

      const voteValue = 1; // Set vote value to 1 for upvote

      // Update vote on the backend
      const res = await axios.put(
        `http://localhost:5000/api/posts/votes/${id}`,
        { voteType: voteValue }, // Send voteType as 1 for upvote
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("votes after post is", res);

      // Update votes state
      const updatedVotes = [...post.votes];
      const existingVoteIndex = updatedVotes.findIndex(
        (vote) => vote.uniqueId === currentUserId // Use the currentUserId from localStorage
      );

      if (existingVoteIndex !== -1) {
        // User has already voted
        if (updatedVotes[existingVoteIndex].voteValue === voteValue) {
          // Undo vote (remove the vote)
          updatedVotes.splice(existingVoteIndex, 1);
          setUserVote(null);
        } else {
          // Change vote to upvote
          updatedVotes[existingVoteIndex].voteValue = voteValue;
          setUserVote("upvote");
        }
      } else {
        // New vote
        updatedVotes.push({
          uniqueId: currentUserId, // Use the currentUserId from localStorage
          voteValue: voteValue,
          timestamp: new Date(),
        });
        setUserVote("upvote");
      }

      setPost((prevPost) => ({ ...prevPost, votes: updatedVotes }));
    } catch (error) {
      console.error("Error voting on post:", error);
    }
  };

  const handleEditPost = async (updatedData) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/posts/${post._id}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Post updated successfully!");
      setPost(response.data.updatedPost); // Update your post state with the new data
    } catch (error) {
      console.error("Error updating post:", error);
      toast.error("Failed to update the post!");
    }
  };

  if (!post) return <Spinner />; // Show loading state while data is being fetched

  const votesCount = post.votes ? post.votes.length : 0; // Count the number of votes

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
            OnEdit={handleEditPost} // Pass the handleEditPost function to PostInfo
            onEdit={handleEditPost}
          />

          <PostInteractions
            post={post}
            userVote={userVote}
            handleVote={handleVote}
            commentCount={comments.length}
            votesCount={votesCount} // Pass votesCount to the PostInteractions component
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
