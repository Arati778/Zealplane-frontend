import React from 'react';
import { BiUpvote, BiDownvote } from "react-icons/bi";
import { FaRegCommentAlt } from "react-icons/fa";
import { RiShareForwardLine } from "react-icons/ri";

const PostInteractions = ({ post, userVote, handleVote, isVoting, commentCount }) => {
  return (
    <div className="post-votes">
      <button
        className={`vote-button upvote ${userVote === 'upvote' ? 'active' : ''}`}
        onClick={() => handleVote('upvote')}
        disabled={isVoting}
      >
        <BiUpvote />
      </button>
      <span className="vote-count">{post.votes}</span>
      <button
        className={`vote-button downvote ${userVote === 'downvote' ? 'active' : ''}`}
        onClick={() => handleVote('downvote')}
        disabled={isVoting}
      >
        <BiDownvote />
      </button>
      <button className="vote-button comment">
        <FaRegCommentAlt /> 
        <span className="comment-count"> {commentCount}</span>
      </button>
      <button className="vote-button share"><RiShareForwardLine /></button>
    </div>
  );
};

export default PostInteractions;
