import React from "react";
import { Link } from "react-router-dom";
import { FaArrowUp, FaArrowDown, FaCommentAlt } from "react-icons/fa";

const Post = ({ post }) => {
  return (
    <div className="post">
      <div className="post-header">
        <span className="subreddit">
          <Link to={`/r/${post.subreddit}`}>r/{post.subreddit}</Link>
        </span>
        • <span className="author"> Posted by u/{post.author}</span> •
        <span className="timestamp">{post.timestamp}</span>
      </div>
      <h3 className="post-title">
        <Link to={`/post/${post.id}`}>{post.title}</Link>
      </h3>
      <p className="post-body">{post.body}</p>
      <div className="post-footer">
        <button className="vote-button">
          <FaArrowUp /> Upvote
        </button>
        <span>{post.votes}</span>
        <button className="vote-button">
          <FaArrowDown /> Downvote
        </button>
        <Link to={`/post/${post.id}`} className="comments-link">
          <FaCommentAlt /> {post.comments.length} Comments
        </Link>
      </div>
    </div>
  );
};

export default Post;
