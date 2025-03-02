import React from "react";
import { Username } from "@/components";
import { Tooltip } from "@/components/Tooltip/Tooltip";
import "../../../../components/Tooltip/Tooltip.css";
import { useSelector } from "react-redux";

export function CommentAuthorBar({
  comment,
  post,
  commentTime,
  wasEdited,
  editedTime,
}) {
  const posts = useSelector((state) => Object.values(state.posts));
  const communities = useSelector((state) => Object.values(state.communities));

  const isOP = post?.postAuthor?.username === comment?.commentAuthor?.username;
  const isMOD = comment?.userId === communities[post?.communityId].userId;

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
