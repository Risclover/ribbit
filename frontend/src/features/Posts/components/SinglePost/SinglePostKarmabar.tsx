import { MouseEvent } from "react";
import { PiArrowFatUpFill, PiArrowFatDownFill } from "react-icons/pi";
import { usePostVote } from "../../hooks/usePostVote";
import type { Post } from "@/types";
interface SinglePostKarmabarProps {
  post: Post;
  /** Visual style of the bar; "single" is default. */
  format?: "compact" | "card" | "single" | string;
}

export function SinglePostKarmabar({
  post,
  format = "single",
}: SinglePostKarmabarProps) {
  const { vote, handleVoteClick } = usePostVote(post);

  const wrapperClass =
    format === "compact"
      ? "compact-post-karmabar-btns"
      : "single-post-karmabar";

  const handleClick =
    (dir: "upvote" | "downvote") => (e: MouseEvent<HTMLButtonElement>) =>
      handleVoteClick(e, dir);

  return (
    <div className={wrapperClass}>
      <button
        aria-label="Upvote"
        className={vote === "upvote" ? "vote-btn-red" : "upvote-btn-grey"}
        onClick={handleClick("upvote")}
      >
        <PiArrowFatUpFill />
      </button>

      <span
        className={
          "karmabar-votes" +
          (vote === "upvote"
            ? " vote-btn-red"
            : vote === "downvote"
            ? " vote-btn-blue"
            : "")
        }
      >
        {post.votes === 0 && vote !== null
          ? 0
          : vote === null && Object.keys(post.postVoterIds).length === 0
          ? "Vote"
          : post.votes}
      </span>

      <button
        aria-label="Downvote"
        className={vote === "downvote" ? "vote-btn-blue" : "downvote-btn-grey"}
        onClick={handleClick("downvote")}
      >
        <PiArrowFatDownFill />
      </button>
    </div>
  );
}
