import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Feedback.scss";
import avatar from "../../../assets/avatar.png";
import { formatDistanceToNow } from "date-fns";
import axiosInstance from "../../../Auth/Axios";

const Feedback = () => {
  const [feedbackText, setFeedbackText] = useState("");
  const [rating, setRating] = useState(0);
  const [feedbackList, setFeedbackList] = useState([]);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const username = localStorage.getItem("username");
  const { projectId } = useParams();

  const token = localStorage.getItem("token");

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

  // Handle feedback submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!feedbackText || rating === 0) {
      alert("Please provide feedback text and a rating!");
      return;
    }

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

  // Edit comment
  const handleEdit = (comment) => {
    setEditingCommentId(comment._id);
    setFeedbackText(comment.commentText);
    setRating(comment.rating);
  };

  // Update comment
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
    } catch (error) {
      console.error("Error updating feedback:", error);
    }
  };

  // Delete comment
  const handleDelete = async (commentId) => {
    try {
      await axios.delete(`${apiBaseUrl}/projects/${projectId}/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setFeedbackList(
        feedbackList.filter((comment) => comment._id !== commentId)
      );
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
                  onClick={() => handleDelete(feedback._id)}
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
