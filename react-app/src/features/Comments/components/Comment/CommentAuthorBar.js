import React from "react";
import { Username } from "@/components";
import { Tooltip } from "@/components/Tooltip/Tooltip";
import "../../../../components/Tooltip/Tooltip.css";

export function CommentAuthorBar({
  comment,
  post,
  commentTime,
  wasEdited,
  editedTime,
}) {
  const isOP = post?.postAuthor?.username === comment?.commentAuthor?.username;

  return (
    <div className="comment-author-bar-container">
      <div className="comment-author-bar">
        <Username
          community
          username={comment?.commentAuthor?.username}
          user={comment?.commentAuthor}
        />
        {isOP && <span className="op-sign">OP</span>}

        <span className="single-post-topbar-dot"> · </span>
        <span className="comment-original-time">
          <span className="comment-time-hover">
            <Tooltip direction="down" text={comment?.createdAt} />
          </span>
          {commentTime}
        </span>

        {wasEdited && (
          <span className="comment-was-edited">
            <span className="single-post-topbar-dot"> · </span>
            edited {editedTime}
          </span>
        )}
      </div>
    </div>
  );
}
