import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Feedback.scss";
import avatar from "../../../assets/avatar.png";
import { formatDistanceToNow } from "date-fns";
import axiosInstance from "../../../Auth/Axios";
import { jwtDecode } from "jwt-decode";

const Feedback = () => {
  const [feedbackText, setFeedbackText] = useState("");
  const [rating, setRating] = useState(0);
  const [feedbackList, setFeedbackList] = useState([]);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const username = localStorage.getItem("username");
  const { projectId } = useParams();
  const token = localStorage.getItem("token");

  const textAreaRef = useRef(null); // Reference for the text area

  // Fetch comments when the component mounts
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axiosInstance.get(`/projects/id/${projectId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        });
        setFeedbackList(response.data.project.comments || []);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [projectId]);

  // Focus on the text area when editing
  useEffect(() => {
    if (editingCommentId !== null) {
      textAreaRef.current?.focus(); // Set focus to the text area when editing
    }
  }, [editingCommentId]);

  // Handle feedback submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newFeedback = { username, commentText: feedbackText, rating };

    try {
      const response = await axiosInstance.post(
        `/projects/${projectId}`,
        newFeedback,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setFeedbackList([response.data.comment, ...feedbackList]);
      setFeedbackText("");
      setRating(0);
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  // Handle rating change
  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleEdit = (comment) => {
    // Decode the token and get the username
    const decodedToken = jwtDecode(token);
    const decodedUsername = decodedToken.username; // Assuming the token has the username field

    // Log the values for comparison
    console.log("Comment Username:", comment.username);
    console.log("Decoded Username from Token:", decodedUsername);

    if (comment.username !== decodedUsername) {
      alert("You can only edit your own comments.");
      return; // Prevent editing if it's not the user's comment
    }

    setEditingCommentId(comment._id);
    setFeedbackText(comment.commentText);
    setRating(comment.rating);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${apiBaseUrl}/projects/${projectId}/comments/${editingCommentId}`,
        { commentText: feedbackText, rating },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const updatedList = feedbackList.map((comment) =>
        comment._id === editingCommentId ? response.data.comment : comment
      );

      setFeedbackList(updatedList);
      setFeedbackText("");
      setRating(0);
      setEditingCommentId(null);

      // Show success alert
      alert("Your comment has been successfully updated!");
    } catch (error) {
      console.error("Error updating feedback:", error);
    }
  };

  // Delete comment
  const handleDelete = async (commentId, commentUsername) => {
    // Decode the token and get the username
    const decodedToken = jwtDecode(token);
    const decodedUsername = decodedToken.username; // Assuming the token has the username field

    if (commentUsername !== decodedUsername) {
      alert("You can only delete your own comments.");
      return; // Prevent deletion if it's not the user's comment
    }

    // Show confirmation pop-up
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this comment?"
    );

    if (!isConfirmed) {
      return; // If user clicks 'Cancel', don't delete the comment
    }

    try {
      await axios.delete(`${apiBaseUrl}/projects/${projectId}/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setFeedbackList(
        feedbackList.filter((comment) => comment._id !== commentId)
      );

      // Show success alert
      alert("Your comment has been successfully deleted!");
    } catch (error) {
      console.error("Error deleting feedback:", error);
    }
  };

  return (
    <div className="feedback">
      <h3 className="feedback-title">
        {editingCommentId ? "Edit Feedback" : "Leave Feedback"}
      </h3>
      <form
        className="feedback-form"
        onSubmit={editingCommentId ? handleUpdate : handleSubmit}
      >
        <textarea
          ref={textAreaRef} // Add the reference to the text area
          className="feedback-input"
          placeholder="Write your feedback here..."
          rows="4"
          value={feedbackText}
          onChange={(e) => setFeedbackText(e.target.value)}
        ></textarea>
        <div className="feedback-rating">
          <span>Rate:</span>
          <div className="stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={star <= rating ? "star active" : "star"}
                onClick={() => handleRatingChange(star)}
              >
                ★
              </span>
            ))}
          </div>
        </div>
        <button type="submit" className="feedback-button">
          {editingCommentId ? "Update" : "Submit"}
        </button>
      </form>

      <div className="feedback-list">
        <h3 className="feedback-list-title">Recent Feedback</h3>
        {feedbackList.length === 0 ? (
          <p>No feedback yet. Be the first to leave a comment!</p>
        ) : (
          feedbackList.map((feedback) => (
            <div className="feedback-item" key={feedback._id}>
              <div className="feedback-info">
                <img
                  src={feedback.profilePic || avatar}
                  alt="Profile"
                  className="feedback-avatar"
                />
                <div>
                  <div className="feedback-user">
                    {feedback.username || "Anonymous"}
                  </div>
                  <div className="feedback-time">
                    {formatDistanceToNow(new Date(feedback.date || Date.now()))}{" "}
                    ago
                  </div>
                </div>
              </div>
              <div className="feedback-text">{feedback.commentText}</div>
              <div className="feedback-rating">Rating: {feedback.rating} ★</div>
              <div className="feedback-actions">
                <button
                  onClick={() => handleEdit(feedback)}
                  className="edit-button"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(feedback._id, feedback.username)}
                  className="delete-button"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Feedback;
