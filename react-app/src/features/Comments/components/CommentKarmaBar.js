import React from "react";
import { PiArrowFatUpFill, PiArrowFatDownFill } from "react-icons/pi";
import { useCommentVote } from "./CommentForms/hooks/useCommentVote";

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
        {comment?.votes === 0 && vote !== null
          ? 0
          : comment?.votes === 0 && vote === null
          ? "Vote"
          : comment.votes}
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
