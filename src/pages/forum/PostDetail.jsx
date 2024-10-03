import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './postdetail.scss';
import { BiUpvote, BiDownvote } from "react-icons/bi";
import { FaRegCommentAlt } from "react-icons/fa";
import { RiShareForwardLine } from "react-icons/ri";

const PostDetail = () => {
  const { id } = useParams(); // Get the post ID from the URL
  const [post, setPost] = useState(null); // State to store the post data
  const [newComment, setNewComment] = useState(''); // State for the new comment
  const [comments, setComments] = useState([]); // State to store comments
  const [userVote, setUserVote] = useState(null); // Track if user upvoted or downvoted
  const [isVoting, setIsVoting] = useState(false); // Prevent multiple votes

  // Fetch the post data from the backend when the component mounts
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/posts/${id}`);
        console.log("fetched the data for subreditt is:", response.data);
        
        setPost(response.data);
        setComments(response.data.comments); // Initialize comments state
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [id]);

  // Handle new comment input change
  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  // Handle new comment submission
  const handleCommentSubmit = async (event) => {
    event.preventDefault(); // Prevent form default behavior
    try {
      const response = await axios.post(`http://localhost:5000/api/posts/${id}/comments`, {
        body: newComment
      });
      setComments([...comments, response.data]); // Add new comment to the comments list
      setNewComment(''); // Clear the input field
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  // Handle upvote
  const handleUpvote = async () => {
    if (isVoting || userVote === 'upvote') return; // Prevent multiple votes
    setIsVoting(true);
    try {
      await axios.put(`http://localhost:5000/api/posts/${id}/votes`, { vote: 1 });
      setUserVote('upvote');
      setPost((prevPost) => ({ ...prevPost, votes: prevPost.votes + (userVote === 'downvote' ? 2 : 1) }));
    } catch (error) {
      console.error('Error upvoting post:', error);
    } finally {
      setIsVoting(false);
    }
  };

  // Handle downvote
  const handleDownvote = async () => {
    if (isVoting || userVote === 'downvote') return; // Prevent multiple votes
    setIsVoting(true);
    try {
      await axios.post(`http://localhost:5000/api/posts/${id}/downvote`, { vote: -1 });
      setUserVote('downvote');
      setPost((prevPost) => ({ ...prevPost, votes: prevPost.votes - (userVote === 'upvote' ? 2 : 1) }));
    } catch (error) {
      console.error('Error downvoting post:', error);
    } finally {
      setIsVoting(false);
    }
  };

  if (!post) return <div>Loading...</div>; // Show loading state while data is being fetched

  return (
    <div className="post-detail-container">
      <div className="post-header">
        <h2 className="post-title">{post.title}</h2>
        <div className="post-meta">
          <span className="subreddit">r/{post.subreddit}</span> • 
          <span className="author">Posted by u/{post.author}</span> • 
          <span className="timestamp">{post.timestamp}</span>
        </div>
      </div>
      
      <div className="post-body">
        <p>{post.body}</p>
      </div>

      <div className="post-votes">
        <button
          className={`vote-button upvote ${userVote === 'upvote' ? 'active' : ''}`}
          onClick={handleUpvote}
          disabled={isVoting || userVote === 'upvote'}
        >
          <BiUpvote />
        </button>
        <span className="vote-count">{post.votes}</span>
        <button
          className={`vote-button downvote ${userVote === 'downvote' ? 'active' : ''}`}
          onClick={handleDownvote}
          disabled={isVoting || userVote === 'downvote'}
        >
          <BiDownvote />
        </button>
        <button className="vote-button comment"><FaRegCommentAlt /></button>
        <button className="vote-button share"><RiShareForwardLine /></button>
      </div>

      <div className="post-comments">
        <h3>Comments</h3>
        {comments.map((comment) => (
          <div key={comment.id} className="comment">
            <p>{comment.body}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleCommentSubmit} className="comment-form">
        <textarea
          value={newComment}
          onChange={handleCommentChange}
          placeholder="Add a comment..."
          required
        />
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default PostDetail;
