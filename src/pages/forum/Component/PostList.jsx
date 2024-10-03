import React from 'react';
import { Link } from 'react-router-dom';

const PostList = ({ posts }) => {
  return (
    <div className="post-list">
      {posts.map(post => {
  console.log(post); // Check if `id` is defined
  return (
    <div key={post.id} className="post">
      <h3 className="post-title">
        <Link to={`/post/${post._id}`}>{post.title}</Link>
      </h3>
      <p className="post-body">{post.body}</p>
    </div>
  );
})}
    </div>
  );
};

export default PostList;