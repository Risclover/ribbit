import React from "react";
import { useSelector } from "react-redux";
import { Username, Tooltip } from "@/components";
import "../../../../components/Tooltip/Tooltip.css";

/**
 * Renders the author's info for the comment
 * - comment: comment that this author bar is for
 * - post: post that this comment is under
 * - commentTime: comment's timestamp
 * - wasEdited: whether or not this comment has been edited after posting
 * - editedTime: the comment's "Edited at" timestamp
 */
export function CommentAuthorBar({
  comment,
  post,
  commentTime,
  wasEdited,
  editedTime,
}) {
  const communities = useSelector((state) => Object.values(state.communities));

  const isOP = post?.postAuthor?.username === comment?.commentAuthor?.username;
  const isMOD = comment?.userId === communities[post?.communityId]?.userId;

  return (
    <div className="comment-author-bar-container">
      <div className="comment-author-bar">
        <Username
          community
          username={comment?.commentAuthor?.username}
          user={comment?.commentAuthor}
        />
        {isOP && <span className="op-sign">OP</span>}
        {isMOD && <span className="mod-sign">MOD</span>}

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
