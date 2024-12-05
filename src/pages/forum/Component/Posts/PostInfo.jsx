import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./PostInfo.scss";
import EditPostModal from "./EditPostModal";

const PostInfo = ({ post, onEdit, onDelete, status }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editablePost, setEditablePost] = useState(null);
  const navigate = useNavigate(); // Initialize the navigate function

  const handleEditClick = () => {
    setEditablePost(post); // Set the current post data
    setIsEditModalOpen(true); // Open the modal
  };

  const handleDeleteClick = () => {
    onDelete(post.id); // Trigger the delete callback with the post ID
    navigate("/forum"); // Navigate to the home page
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false); // Close the modal
    setEditablePost(null); // Clear the editable post data
  };

  return (
    <div className="post-header">
      {/* Edit and Delete Icons */}
      {status !== "visitor" && (
        <div className="icon-container">
          <FaEdit
            className="edit-icon"
            onClick={handleEditClick}
            title="Edit Post"
          />
          <FaTrash
            className="trash-icon"
            onClick={handleDeleteClick}
            title="Delete Post"
          />
        </div>
      )}

      <h2 className="post-title">{post.title}</h2>

      <div className="post-meta">
        <span className="subreddit">r/{post.subreddit}</span> •
        <span className="author">Posted by u/{post.author || "Anonymous"}</span>{" "}
        •
        <span className="timestamp">
          {new Date(post.timestamp).toLocaleString()}
        </span>
      </div>

      <div className="post-body">
        <p
          className="post-body"
          dangerouslySetInnerHTML={{
            __html: post.body || "No content available",
          }}
          style={{ whiteSpace: "pre-wrap" }}
        ></p>
        {post.image && (
          <div className="post-image">
            <img src={post.image} className="Post-Content" alt="Post content" />
          </div>
        )}
      </div>

      {/* Render the Edit Modal */}
      {isEditModalOpen && (
        <EditPostModal
          post={editablePost}
          onClose={handleCloseModal}
          onEdit={onEdit}
        />
      )}
    </div>
  );
};

export default PostInfo;
