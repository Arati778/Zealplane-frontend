import React, { useState } from 'react';
import { Rating } from '@mui/material';
import "./feedback.scss";
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';

const FeedbackComponent = () => {
  const [rating, setRating] = useState(0);

  return (
    <ContentWrapper>
    <div style={{ marginTop: "20px", width: "70%", maxWidth: "500px", margin: "0 auto" }}>
      <Rating
        name="feedback-rating"
        value={rating}
        onChange={(event, newValue) => setRating(newValue)}
      />
      <form className="feedback-form text-white" style={{ marginBottom: "20px" }}>
        <label htmlFor="feedback">Leave your feedback:</label>
        <textarea
          id="feedback"
          name="feedback"
          rows="4"
          style={{
            width: "80%", // Full width of its container
            maxWidth: "100%", // Ensure it doesn’t exceed container width
            padding: "8px",
            boxSizing: "border-box",
            marginBottom: "12px",
            backgroundColor: "#212529",
            color: "white",
            border: "1px solid #444" // Optional: add border for better visibility
          }}
          // Add any necessary state or handlers for feedback submission
        ></textarea>
        <br />
        <button
          type="submit"
          style={{
            backgroundColor: "#007bff",
            color: "white",
            padding: "10px 15px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Submit Feedback
        </button>
      </form>
      {/* You can display existing feedback here */}
      <div className="existing-feedback text-white" style={{ marginTop: "10px", width: "400px" }}>
        <p>User1: Great platform!</p>
        <p>User2: Enjoying the experience.</p>
        {/* Add more feedback entries as needed */}
      </div>
    </div>
    </ContentWrapper>
  );
};

export default FeedbackComponent;
