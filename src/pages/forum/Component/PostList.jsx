import React from 'react';
import { Link } from 'react-router-dom';
import { BiUpvote } from "react-icons/bi";
import { FaRegCommentAlt, FaRegShareSquare } from "react-icons/fa";
import './postList.scss';

const PostList = ({ posts }) => {
  return (
    <div className="post-list">
      {posts.map(post => (
        <div key={post._id} className="post">
          <div className="post-header">
            {post.profilePic && (
              <img src={post.profilePic} alt="Profile" className="profile-pic" />
            )}
            <div className="post-title-container">
              <h3 className="post-title">
                <Link to={`/post/${post._id}`} className="post-link">
                  {post.title}
                </Link>
              </h3>
              <span className="post-timestamp">
                {new Date(post.timestamp).toLocaleString()} {/* Optional: Add timestamp */}
              </span>
              <span className="post-author">Posted by u/{post.author || 'Anonymous'}</span>
            </div>
          </div>

          {/* Display post image if present */}
          {post.image && (
            <div className="post-image-container">
              <img src={post.image} alt="Post" className="post-image" />
            </div>
          )}

          <p className="post-body">{post.body}</p>

          <div className="post-meta">
            <span className="post-likes">
              <BiUpvote /> {post.votes} Likes
            </span>
            <span className="post-comments">
              <FaRegCommentAlt /> {post.comments.length} Comments
            </span>
            <span className="post-share" onClick={() => handleShare(post._id)}>
              <FaRegShareSquare/> Share
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;
