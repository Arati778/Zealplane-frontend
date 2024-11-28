import React from "react";
import { FaEdit } from "react-icons/fa";
import "./PostInfo.scss";

const PostInfo = ({ post, onEdit, status }) => {
  return (
    <div className="post-header">
      {/* Edit Icon */}
      {status !== "visitor" && (
        <FaEdit className="edit-icon" onClick={onEdit} title="Edit Post" />
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
        <p>{post.body}</p>
        {post.image && (
          <div className="post-image">
            <img src={post.image} className="Post-Content" alt="Post content" />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostInfo;
