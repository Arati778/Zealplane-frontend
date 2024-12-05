import React from "react";
import { Link } from "react-router-dom";
import { BiUpvote } from "react-icons/bi";
import { FaRegCommentAlt, FaRegShareSquare } from "react-icons/fa";
import "./postList.scss";

const PostList = ({ posts }) => {
  const handleShare = (postId) => {
    // Share logic
    console.log(`Shared post with ID: ${postId}`);
  };

  const handleUpvote = (postId) => {
    // Upvote logic
    console.log(`Upvoted post with ID: ${postId}`);
  };

  return (
    <div className="post-list">
      {posts.map((post) => (
        <Link to={`/post/${post._id}`} key={post._id} className="post-link">
          <div className="post">
            <div className="post-header">
              {post.profilePic && (
                <img
                  src={post.profilePic}
                  alt="Profile"
                  className="profile-pic"
                />
              )}
              <div className="post-title-container">
                <h3 className="post-title">
                  {post.title || "No title available"}
                </h3>
                <span className="post-author">
                  Posted by u/{post.author || "Anonymous"}
                </span>
                <span className="post-timestamp">
                  {post.timestamp
                    ? new Date(post.timestamp).toLocaleString()
                    : "Unknown time"}
                </span>
              </div>
            </div>

            {post.image && (
              <div className="post-image-container">
                <img src={post.image} alt="Post" className="post-image" />
              </div>
            )}
            <p
              className="post-body"
              dangerouslySetInnerHTML={{
                __html: post.body || "No content available",
              }}
              style={{ whiteSpace: "pre-wrap" }}
            ></p>

            <div className="post-meta">
              {/* Upvote Button with Vote Count */}
              <div
                className="post-upvote"
                onClick={(e) => {
                  e.preventDefault();
                  handleUpvote(post._id);
                }}
              >
                <BiUpvote className="upvote-icon" />
                <span className="vote-count">
                  {Array.isArray(post.votes) ? post.votes.length : 0}
                </span>
              </div>
              <span className="post-comments">
                <FaRegCommentAlt />{" "}
                {Array.isArray(post.comments) ? post.comments.length : 0}{" "}
                Comments
              </span>
              <span
                className="post-share"
                onClick={(e) => {
                  e.preventDefault();
                  handleShare(post._id);
                }}
              >
                <FaRegShareSquare /> Share
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PostList;
