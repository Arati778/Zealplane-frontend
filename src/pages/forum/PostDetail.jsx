import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './postdetail.scss';
import Header from './Component/Header';
import PostInfo from './Component/Posts/PostInfo';
import PostInteractions from './Component/Posts/PostInteract';
import CommentsSection from './Component/Posts/CommentsSection';

const PostDetail = () => {
  const { id } = useParams(); // Get the post ID from the URL
  const [post, setPost] = useState(null); // State to store the post data
  const [comments, setComments] = useState([]); // State to store comments
  const [userVote, setUserVote] = useState(null); // Track if user upvoted or downvoted
  const [isVoting, setIsVoting] = useState(false); // Prevent multiple votes

  const token = localStorage.getItem('token'); // Retrieve the token from local storage

  // Fetch the post data from the backend when the component mounts
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/posts/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request
          },
        });
        
        setPost(response.data);
        setComments(response.data.comments); // Initialize comments state
        setUserVote(response.data.userVote); // Set initial vote state
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [id, token]);

  // Handle voting logic (pass down to PostInteractions)
  const handleVote = async (voteType) => {
    if (isVoting) return; // Prevent multiple votes
    setIsVoting(true);

    try {
      let updatedVotes = post.votes;
      const isUpvote = voteType === 'upvote';
      const isDownvote = voteType === 'downvote';

      if (userVote === (isUpvote ? 'upvote' : 'downvote')) {
        // Undo vote
        await axios.put(`http://localhost:5000/api/posts/votes/${id}`, { vote: isUpvote ? -1 : 1 }, { headers: { Authorization: `Bearer ${token}` }});
        updatedVotes += isUpvote ? -1 : 1;
        setUserVote(null); // Reset user vote
      } else {
        // New or changing vote
        await axios.put(`http://localhost:5000/api/posts/votes/${id}`, { vote: isUpvote ? 1 : -1 }, { headers: { Authorization: `Bearer ${token}` }});
        updatedVotes += isUpvote ? 1 : -1;
        setUserVote(isUpvote ? 'upvote' : 'downvote'); // Set user vote
      }

      setPost((prevPost) => ({ ...prevPost, votes: updatedVotes }));
    } catch (error) {
      console.error('Error voting on post:', error);
    } finally {
      setIsVoting(false);
    }
  };

  if (!post) return <div>Loading...</div>; // Show loading state while data is being fetched

  return (
    <div className="post">
      <Header />

      <div className="post-detail-container">
        {/* Post Information Component */}
        <PostInfo post={post} />

        {/* Post Interactions (voting, comment, share) */}
        <PostInteractions 
          post={post} 
          userVote={userVote} 
          handleVote={handleVote} 
          isVoting={isVoting} 
          commentCount={comments.length}
        />

        {/* Comments Section (list + form) */}
        <CommentsSection
          comments={comments}
          setComments={setComments}
          postId={id}
        />
      </div>
    </div>
  );
};

export default PostDetail;
