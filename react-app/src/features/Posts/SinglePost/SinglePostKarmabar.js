import React from "react";
import { GoArrowUp, GoArrowDown } from "react-icons/go";
import { usePostVote } from "../hooks/usePostVote";

export function SinglePostKarmabar({ post }) {
  const { vote, handleVoteClick } = usePostVote(post);

  return (
    <div className="single-post-karmabar">
      <button
        className={vote === "upvote" ? "vote-btn-red" : "upvote-btn-grey"}
        onClick={(e) => handleVoteClick(e, "upvote")}
      >
        <GoArrowUp />
      </button>

      <span className="karmabar-votes">
        {post?.votes === 0 && vote !== null
          ? 0
          : post?.votes === 0 && vote === null
          ? "Vote"
          : post?.votes}
      </span>

      <button
        className={vote === "downvote" ? "vote-btn-blue" : "downvote-btn-grey"}
        onClick={(e) => handleVoteClick(e, "downvote")}
      >
        <GoArrowDown />
      </button>
    </div>
  );
}
