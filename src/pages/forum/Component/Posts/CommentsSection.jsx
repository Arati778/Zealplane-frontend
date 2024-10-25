import React, { useState } from 'react';
import axios from 'axios';

const CommentsSection = ({ comments, setComments, postId }) => {
  const [newComment, setNewComment] = useState(''); // State for the new comment
  const token = localStorage.getItem('token'); // Retrieve the token from local storage

  // Handle new comment input change
  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  // Handle new comment submission
  const handleCommentSubmit = async (event) => {
    event.preventDefault(); // Prevent form default behavior
    try {
      const response = await axios.post(`http://localhost:5000/api/posts/${postId}/comments`, {
        body: newComment
      }, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the request
        },
      });
      setComments([...comments, response.data]); // Add new comment to the comments list
      setNewComment(''); // Clear the input field
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  return (
    <div className="post-thread">
      <h3>Comments</h3>
      {comments.map((comment) => (
        <div key={comment.id} className="thread">
          <div className="comment-meta">
            <img src={comment.profilePic || 'default-pic-url'} alt="Profile" className="profile-pic" />
            <span className="comment-author">{comment.author || 'Anonymous'}</span>
          </div>
          <p>{comment.body}</p>
        </div>
      ))}

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

export default CommentsSection;
