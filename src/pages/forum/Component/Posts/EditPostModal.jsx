import React, { useState } from "react";
import "./EditPostModal.scss";

const EditPostModal = ({ post, onClose, onEdit }) => {
  const [formData, setFormData] = useState({
    title: post.title,
    body: post.body,
    subreddit: post.subreddit,
    tags: post.tags || [], // Add tags field to form data
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "tags") {
      // Handle multiple tags input (assuming tags are comma-separated)
      setFormData({
        ...formData,
        tags: value.split(",").map((tag) => tag.trim()), // Convert input into array of tags
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onEdit(formData); // Pass the updated data to the parent
    onClose(); // Close the modal
    window.location.reload(); // Refresh the page after the modal is closed
    alert("Post updated successfully!");
  };

  return (
    <div className="edit-post-modal">
      <div className="modal-content">
        <h2>Edit Post</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Body</label>
            <textarea
              name="body"
              value={formData.body}
              onChange={handleChange}
              required
            />
          </div>
          {/* Render HTML from Body */}
          {/* <div className="rendered-body">
            <p
              dangerouslySetInnerHTML={{
                __html: formData.body || "No content available",
              }}
            ></p>
          </div> */}

          <div className="form-group">
            <label>Subreddit</label>
            <input
              type="text"
              name="subreddit"
              value={formData.subreddit}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Tags</label>
            <input
              type="text"
              name="tags"
              value={formData.tags.join(", ")} // Display tags as a comma-separated string
              onChange={handleChange}
            />
            <small>Enter tags separated by commas</small>
          </div>
          <div className="modal-actions">
            <button type="submit" className="save-button">
              Save Changes
            </button>
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPostModal;
