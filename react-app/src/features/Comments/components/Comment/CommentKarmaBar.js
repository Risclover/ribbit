import React from "react";
import { PiArrowFatUpFill, PiArrowFatDownFill } from "react-icons/pi";
import { useCommentVote } from "../../hooks/useCommentVote";

/**
 * Renders upvote/downvote buttons plus the comment's net votes.
 */
export function CommentKarmaBar({ comment }) {
  const { vote, handleVoteClick } = useCommentVote(comment);

  return (
    <div className="comment-vote-btns">
      <button
        aria-label="Upvote"
        className={vote === "upvote" ? "vote-btn-red" : "upvote-btn-grey"}
        onClick={(e) => handleVoteClick(e, "upvote")}
      >
        <PiArrowFatUpFill />
      </button>

      <span
        className={`karmabar-votes${
          vote === "upvote"
            ? " vote-btn-red"
            : vote === "downvote"
            ? " vote-btn-blue"
            : ""
        }`}
      >
        {/* If you need special logic for zero votes, do it here */}
        {comment?.votes === 0 && vote === null ? "Vote" : comment?.votes ?? 0}
      </span>

      <button
        aria-label="Downvote"
        className={vote === "downvote" ? "vote-btn-blue" : "downvote-btn-grey"}
        onClick={(e) => handleVoteClick(e, "downvote")}
      >
        <PiArrowFatDownFill />
      </button>
    </div>
  );
}
