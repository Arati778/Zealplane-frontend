import React from "react";
import { BiUpvote, BiDownvote } from "react-icons/bi";
import { FaRegCommentAlt } from "react-icons/fa";
import { RiShareForwardLine } from "react-icons/ri";

const PostInteractions = ({
  post,
  userVote,
  handleVote,
  commentCount,
  votesCount,
}) => {
  return (
    <div className="post-votes">
      {/* Upvote Button */}
      <button
        className={`vote-button upvote ${
          userVote === "upvote" ? "active" : ""
        }`}
        onClick={() => handleVote("upvote")} // Trigger handleVote with 'upvote' voteType
      >
        <BiUpvote />
      </button>

      {/* Vote Count */}
      <span className="vote-count">
        {/* Calculate the total vote count */}
        {votesCount}
      </span>

      {/* Downvote Button */}
      {/* <button
        className={`vote-button downvote ${
          userVote === "downvote" ? "active" : ""
        }`}
        onClick={() => handleVote("downvote")} // Trigger handleVote with 'downvote' voteType
      >
        <BiDownvote />
      </button> */}

      {/* Comment Button */}
      <button className="vote-button comment">
        <FaRegCommentAlt />
        <span className="comment-count">{commentCount}</span>
      </button>

      {/* Share Button */}
      <button className="vote-button share">
        <RiShareForwardLine />
      </button>
    </div>
  );
};

export default PostInteractions;
