import { Username } from "components";
import { Tooltip } from "components/Tooltip/Tooltip";
import "../../../../components/Tooltip/Tooltip.css";
import React from "react";

export default function CommentAuthorBar({
  comment,
  post,
  commentTime,
  wasEdited,
  editedTime,
}) {
  return (
    <div className="comment-author-bar-container">
      <div className="comment-author-bar">
        <Username
          community={true}
          username={comment?.commentAuthor?.username}
          user={comment?.commentAuthor}
        />
        {post.postAuthor?.username === comment?.commentAuthor?.username && (
          <span className="op-sign">OP</span>
        )}
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
