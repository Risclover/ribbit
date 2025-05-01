import React from "react";
import { useSelector } from "react-redux";
import { Username, Tooltip } from "@/components";
import { convertTime } from "features/Comments/utils/convertTime";

/**
 * Renders the author's info for the comment
 * - comment: comment that this author bar is for
 */
export function CommentAuthorBar({ comment }) {
  const communities = useSelector((state) => Object.values(state.communities));
  const post = useSelector((state) => state.posts[comment?.postId]);

  const editedTime = convertTime(comment, "edit");
  const commentTime = convertTime(comment);
  const wasEdited = comment?.createdAt !== comment?.updatedAt;

  const isOP = post?.author?.username === comment?.commentAuthor?.username;
  const isMOD = comment?.userId === communities[post?.community.id]?.userId;

  return (
    <div className="comment-author-bar-container">
      <div className="comment-author-bar">
        {/* Author's username + username popup */}
        <Username
          community
          username={comment?.commentAuthor?.username}
          user={comment?.commentAuthor}
        />
        {/* Author labels */}
        {isOP && <span className="op-sign">OP</span>}
        {isMOD && <span className="mod-sign">MOD</span>}

        <span className="single-post-topbar-dot"> · </span>

        {/* Comment timestamp + tooltip */}
        <span className="comment-original-time">
          <span className="comment-time-hover">
            <Tooltip direction="down" text={comment?.createdAt} />
          </span>
          {commentTime}
        </span>

        {/* "Edited" label + edit timestamp */}
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
