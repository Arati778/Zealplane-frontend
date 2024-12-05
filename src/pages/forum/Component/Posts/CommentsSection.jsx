import React, { useState } from "react";
import axios from "axios";
import moment from "moment";
import "./CommentSection.scss";
import { jwtDecode } from "jwt-decode";

const CommentsSection = ({ comments = [], setComments, postId }) => {
  const [newComment, setNewComment] = useState("");
  const [isEditing, setIsEditing] = useState(null); // Track which comment is being edited
  const [editingComment, setEditingComment] = useState("");
  const token = localStorage.getItem("token");
  const uniqueId = token ? jwtDecode(token)?.uniqueId : null;

  // Log matching comments
  if (uniqueId) {
    const matchingComments = comments.filter(
      (comment) => comment.uniqueId === uniqueId
    );
  }

  // Limit unique commenters to 5
  const uniqueCommenters = Array.isArray(comments)
    ? Array.from(
        new Set(comments.map((comment) => comment.author || "Anonymous"))
      )
        .map((author) => comments.find((comment) => comment.author === author))
        .slice(0, 5) // Limit to 5
    : [];

  const generateCommentSummary = () => {
    if (uniqueCommenters.length === 0) return "No one has commented yet.";
    if (uniqueCommenters.length === 1) {
      return `${
        uniqueCommenters[0].author || "Anonymous"
      } commented on your project.`;
    }
    const firstCommenter = uniqueCommenters[0].author || "Anonymous";
    const othersCount = uniqueCommenters.length - 1;
    return `${firstCommenter} and ${othersCount} ${
      othersCount === 1 ? "other" : "others"
    } commented on your project.`;
  };

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    if (!postId || !token) {
      console.error("Missing postId or token");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:5000/api/posts/${postId}/comments`,
        { body: newComment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("new comment is", response.data);

      setComments([...comments, response.data]);
      setNewComment("");
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const handleEditClick = (comment) => {
    setIsEditing(comment._id);
    setEditingComment(comment.body); // Set comment body for editing
  };

  const handleEditChange = (event) => {
    setEditingComment(event.target.value);
  };

  const handleSaveEdit = async (commentId) => {
    if (!editingComment) return;

    try {
      const response = await axios.put(
        `http://localhost:5000/api/posts/${postId}/comments/${commentId}`,
        {
          body: editingComment, // Include the new comment text
          commentId: commentId, // Include commentId in the body
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setComments(
        comments.map((comment) =>
          comment._id === commentId
            ? { ...comment, body: response.data.body }
            : comment
        )
      );
      setIsEditing(null); // Reset edit state
      setEditingComment("");
    } catch (error) {
      console.error("Error editing comment:", error);
    }
  };

  const handleDeleteClick = async (commentId) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      try {
        await axios.delete(
          `http://localhost:5000/api/posts/${postId}/comments/${commentId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setComments(comments.filter((comment) => comment._id !== commentId));
      } catch (error) {
        console.error("Error deleting comment:", error);
      }
    }
  };

  return (
    <div className="comments-section">
      <h3>Comments</h3>

      {/* Profile Picture Group */}
      <div className="profile-pic-group">
        {uniqueCommenters.map((commenter, index) => (
          <img
            key={index}
            src={commenter?.profilePic || "https://via.placeholder.com/40"}
            alt={commenter?.author || "Anonymous"}
            className="profile-pic-group-item"
          />
        ))}
      </div>

      {/* Comment Summary */}
      <div className="comment-summary">{generateCommentSummary()}</div>

      {/* Comment Form */}
      <form onSubmit={handleCommentSubmit} className="comment-form">
        <textarea
          value={newComment}
          onChange={handleCommentChange}
          placeholder="Add a comment..."
          required
          className="comment-input"
        />
        <button type="submit" className="submit-button">
          Post Comment
        </button>
      </form>

      {/* Comments */}
      {Array.isArray(comments) && comments.length > 0 ? (
        comments.map(
          (comment) =>
            comment &&
            comment._id && (
              <div key={comment._id} className="comment">
                <div className="comment-meta">
                  <img
                    src={comment.profilePic || "https://via.placeholder.com/40"}
                    alt="Profile"
                    className="profile-pic"
                  />
                  <div>
                    <span className="comment-author">
                      {comment.author || "Anonymous"}
                    </span>
                    <span className="comment-timestamp">
                      {comment.date
                        ? moment(comment.date).fromNow()
                        : "Just now"}
                    </span>
                  </div>
                </div>

                {isEditing === comment._id ? (
                  <div className="edit-comment">
                    <textarea
                      value={editingComment}
                      onChange={handleEditChange}
                      className="comment-input"
                    />
                    <button
                      type="button"
                      className="submit-button"
                      onClick={() => handleSaveEdit(comment._id)}
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <p className="comment-body">{comment.body}</p>
                )}

                <div className="comment-actions">
                  {comment.uniqueId === uniqueId && ( // Replace with the actual logic for the logged-in user
                    <>
                      <button
                        className="edit-button"
                        onClick={() => handleEditClick(comment)}
                      >
                        Edit
                      </button>
                      <button
                        className="delete-button"
                        onClick={() => handleDeleteClick(comment._id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            )
        )
      ) : (
        <p>No comments yet.</p>
      )}
    </div>
  );
};

export default CommentsSection;
