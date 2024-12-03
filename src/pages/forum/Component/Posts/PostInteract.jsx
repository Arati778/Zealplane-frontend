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
  hasVoted,
}) => {
  // Function to handle share functionality
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: post.title,
          text: post.body,
          url: window.location.href, // You can customize the URL you want to share
        })
        .then(() => console.log("Shared successfully"))
        .catch((error) => console.error("Error sharing:", error));
    } else {
      // Fallback for browsers that do not support the share API
      alert("Your browser does not support the share feature.");
    }
  };

  return (
    <div className="post-votes">
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

      {/* Comment Button */}
      <button className="vote-button comment">
        <FaRegCommentAlt />
        <span className="comment-count">{commentCount}</span>
      </button>

      {/* Share Button */}
      <button className="vote-button share" onClick={handleShare}>
        <RiShareForwardLine />
      </button>
    </div>
  );
};

export default PostInteractions;
