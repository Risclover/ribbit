import React from "react";
import { Username, Tooltip } from "@/components";
import { useCommentAuthorBar } from "../../hooks/useCommentAuthorBar";

/**
 * Renders the author's info for the comment
 * - comment: comment that this author bar is for
 */
export function CommentAuthorBar({ comment }) {
  const { editedTime, commentTime, wasEdited, isOP, isMOD } =
    useCommentAuthorBar({ comment });

  return (
    <div className="comment-author-bar-container">
      <div className="comment-author-bar">
        {/* Author's username + username popup */}
        <Username
          community
          username={comment?.commentAuthor?.username}
          user={comment?.commentAuthor}
          disabled={comment?.isDeleted}
        />

        {/* Author labels */}
        {isOP && !comment.isDeleted && <span className="op-sign">OP</span>}
        {isMOD && !comment.isDeleted && <span className="mod-sign">MOD</span>}

        <span className="single-post-topbar-dot"> · </span>

        {/* Comment timestamp + tooltip */}
        <span className="comment-original-time">
          <span className="comment-time-hover">
            <Tooltip direction="down" text={comment?.createdAt} />
          </span>
          {commentTime}
        </span>

        {/* "Edited" label + edit timestamp */}
        {wasEdited && !comment.isDeleted && (
          <span className="comment-was-edited">
            <span className="single-post-topbar-dot"> · </span>
            edited {editedTime}
          </span>
        )}
      </div>
    </div>
  );
}
