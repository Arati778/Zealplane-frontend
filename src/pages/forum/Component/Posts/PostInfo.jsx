import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import "./PostInfo.scss";
import EditPostModal from "./EditPostModal";

const PostInfo = ({ post, onEdit, status }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editablePost, setEditablePost] = useState(null);

  const handleEditClick = () => {
    setEditablePost(post); // Set the current post data
    setIsEditModalOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false); // Close the modal
    setEditablePost(null); // Clear the editable post data
  };

  return (
    <div className="post-header">
      {/* Edit Icon */}
      {status !== "visitor" && (
        <FaEdit
          className="edit-icon"
          onClick={handleEditClick}
          title="Edit Post"
        />
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
