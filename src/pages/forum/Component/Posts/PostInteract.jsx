import React from "react";
import { BiUpvote } from "react-icons/bi";
import { FaRegCommentAlt } from "react-icons/fa";
import { RiShareForwardLine } from "react-icons/ri";
import { FaArrowUp } from "react-icons/fa";
import "./PostInteraction.scss";

const PostInteractions = ({
  post,
  userVote,
  handleVote,
  commentCount,
  votesCount,
}) => {
  // Function to handle share or copy link
  const handleShare = () => {
    const shareURL = window.location.href; // Use current page URL
    if (navigator.share) {
      navigator
        .share({
          title: post.title,
          text: post.body,
          url: shareURL,
        })
        .then(() => console.log("Shared successfully"))
        .catch((error) => console.error("Error sharing:", error));
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard
        .writeText(shareURL)
        .then(() => alert("Link copied to clipboard!"))
        .catch((error) =>
          console.error("Failed to copy the link to clipboard:", error)
        );
    }
  };

  return (
    <div className="post-votes">
      <button
        className={`vote-button upvote ${
          userVote === "upvote" ? "active" : ""
        }`}
        onClick={() => handleVote("upvote")}
      >
        {userVote === "upvote" ? <FaArrowUp /> : <BiUpvote />}
      </button>

      <span className="vote-count">{votesCount}</span>

      <button className="vote-button comment">
        <FaRegCommentAlt />
        <span className="comment-count">{commentCount}</span>
      </button>

      <button className="vote-button share" onClick={handleShare}>
        <RiShareForwardLine />
      </button>
    </div>
  );
};

export default PostInteractions;
