import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Feedback.scss";
import avatar from "../../../assets/avatar.png"; // Placeholder avatar image
import { formatDistanceToNow } from "date-fns";

const Feedback = () => {
  const [feedbackText, setFeedbackText] = useState("");
  const [rating, setRating] = useState(0);
  const [feedbackList, setFeedbackList] = useState([]);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const username = localStorage.getItem('username');

  const { projectId } = useParams(); // Retrieve projectId from URL parameters
  


  // Fetch comments when the component mounts
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `${apiBaseUrl}/projects/id/${projectId}`
        );
        console.log("Fetched comments:", response.data.comments);

        // Assuming response.data has a structure like { project: { comments: [...] } }
        setFeedbackList(response.data.comments || []); // Set the comments array from the project data
        console.log("comments are:", feedbackList);
        
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

    const newFeedback = {
      username,
      commentText: feedbackText,
      rating, // Including rating if it's required
    };

    // Retrieve the token (assuming it's stored in localStorage)
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        `${apiBaseUrl}/projects/${projectId}`, // Adjusted to match typical comment endpoint
        newFeedback,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token in Authorization header
          },
        }
      );

      console.log("Comment added successfully:", response.data);

      setFeedbackList([response.data.comment, ...feedbackList]); // Prepend the new feedback to the list
      setFeedbackText("");
      setRating(0); // Reset after submission
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  // Handle rating change
  const handleRatingChange = (value) => {
    setRating(value);
  };

  return (
    <div className="feedback">
      <h3 className="feedback-title">Leave Feedback</h3>
      <form className="feedback-form" onSubmit={handleSubmit}>
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
          Submit
        </button>
      </form>

      <div className="feedback-list">
        <h3 className="feedback-list-title">Recent Feedback</h3>
        {feedbackList.length === 0 ? (
          <p>No feedback yet. Be the first to leave a comment!</p>
        ) : (
          feedbackList.map((feedback, index) => (
            <div className="feedback-item" key={feedback._id || index}>
              <div className="feedback-info">
                <img 
                  src={feedback.profilePic || avatar} // Use actual profilePic or fallback to placeholder
                  alt="Profile" 
                  className="feedback-avatar" 
                />
                <div>
                  <div className="feedback-user">{`${index + 1}. ${feedback.username || 'Anonymous'}`}</div>
                  <div className="feedback-time">
                    {formatDistanceToNow(new Date(feedback.date || Date.now()))} ago
                  </div>
                </div>
              </div>
              <div className="feedback-text">{feedback.commentText || "No comment text"}</div>
              <div className="feedback-rating">Rating: {feedback.rating} ★</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Feedback;
