import React from 'react';

const PostInfo = ({ post }) => {
  return (
    <div className="post-header">
      <h2 className="post-title">{post.title}</h2>
      <div className="post-meta">
        <span className="subreddit">r/{post.subreddit}</span> • 
        <span className="author">Posted by u/{post.author || 'Anonymous'}</span> • 
        <span className="timestamp">{new Date(post.timestamp).toLocaleString()}</span>
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
