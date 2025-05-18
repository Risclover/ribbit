import React from "react";
import { PiArrowFatUpFill, PiArrowFatDownFill } from "react-icons/pi";
import { useCommentVote } from "../../hooks/useCommentVote";

/**
 * Renders upvote/downvote buttons plus the comment's net votes.
 * - comment: the comment itself
 */
export function CommentKarmaBar({ comment }) {
  const { vote, handleVoteClick } = useCommentVote(comment);

  return (
    <div className="comment-vote-btns">
      {/* Upvote btn */}
      <button
        aria-label="Upvote"
        className={vote === "upvote" ? "vote-btn-red" : "upvote-btn-grey"}
        onClick={(e) => handleVoteClick(e, "upvote")}
        disabled={comment?.isDeleted}
      >
        <PiArrowFatUpFill />
      </button>

      {/* Votes count */}
      <span
        className={`karmabar-votes${
          vote === "upvote"
            ? " vote-btn-red"
            : vote === "downvote"
            ? " vote-btn-blue"
            : ""
        }`}
      >
        {comment?.votes === 0 && vote === null ? "Vote" : comment?.votes ?? 0}
      </span>

      {/* Downvote btn */}
      <button
        aria-label="Downvote"
        className={vote === "downvote" ? "vote-btn-blue" : "downvote-btn-grey"}
        onClick={(e) => handleVoteClick(e, "downvote")}
        disabled={comment?.isDeleted}
      >
        <PiArrowFatDownFill />
      </button>
    </div>
  );
}
