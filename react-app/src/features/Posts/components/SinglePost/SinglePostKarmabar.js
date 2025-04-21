import React from "react";
import { PiArrowFatUpFill, PiArrowFatDownFill } from "react-icons/pi";
import { usePostVote } from "../../hooks/usePostVote";

export function SinglePostKarmabar({ post, format }) {
  const { vote, handleVoteClick } = usePostVote(post);

  return (
    <div
      className={`${
        format === "compact"
          ? " compact-post-karmabar-btns"
          : "single-post-karmabar"
      }`}
    >
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
        {post?.votes === 0 && vote !== null
          ? 0
          : vote === null && Object.values(post?.postVoters).length === 0
          ? "Vote"
          : post.votes}
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
