import React from "react";
import { NavLink } from "react-router-dom";
import { BsArrowsAngleExpand } from "react-icons/bs";
import { CommentAuthorBar } from "./CommentAuthorBar";
import { CommentBtnBar } from "./CommentBtnBar";
import { CommentContent } from "./CommentContent";
import { CommentThreadlines } from "./CommentThreadlines";
import { CommentReplyForm } from "../CommentForms/CommentReplyForm";
import { useComment } from "../../hooks/useComment";
import "./Comment.css";

/**
 * A single comment
 * - comment: this comment
 * - level: this comment's comment tree level (1 = parentmost comment)
 */
export function Comment({ comment, level = 1 }) {
  if (!comment) {
    console.error("Comment component: comment is undefined");
    return null;
  }

  const {
    postId,
    isCollapsed,
    setIsCollapsed,
    showReplyForm,
    setShowReplyForm,
    commentContent,
    setCommentContent,
    highlight,
  } = useComment(comment);

  // Render child comments
  const { children = [] } = comment;

  return (
    <div
      className={`comment-container ${level === 1 ? "comment-topmargin" : ""}`}
    >
      {/* Threadlines (vertical lines on the left of each comment) */}
      {!isCollapsed && (
        <CommentThreadlines setIsCollapsed={setIsCollapsed} level={level} />
      )}

      {/* Actual comment */}
      <div
        className={`comment${!isCollapsed ? " expanded" : ""}${
          highlight ? " comment-bg-blue" : ""
        }`}
      >
        {/* Expand comment button */}
        <button
          className="comment-expand-btn"
          onClick={() => setIsCollapsed(false)}
          tabIndex={!isCollapsed ? -1 : 0}
          aria-label={`expand-${comment.id}`}
        >
          <BsArrowsAngleExpand />
        </button>
        {/* User image */}
        <NavLink
          className="comment-user-img-container"
          to={`/users/${comment?.commentAuthor?.id}/profile`}
        >
          <div
            className="comment-user-img"
            style={{
              backgroundImage: `url(${comment?.commentAuthor?.profileImg})`,
              backgroundRepeat: "no-repeat",
            }}
          >
            &nbsp;
          </div>
        </NavLink>

        <div className="comment-right">
          {/* Comment's author + timestamp */}
          <CommentAuthorBar comment={comment} />
          {!isCollapsed && (
            <>
              {/* Comment's content */}
              <CommentContent
                comment={comment}
                commentContent={commentContent}
              />
              {/* Comment's buttons (Reply, Edit, Delete) */}
              <CommentBtnBar
                comment={comment}
                collapsed={isCollapsed}
                postId={postId}
                setCommentContent={setCommentContent}
                setShowReplyForm={setShowReplyForm}
              />
              {/* Comment's reply form */}
              {showReplyForm && (
                <CommentReplyForm
                  postId={postId}
                  parentId={comment.id}
                  onCancel={() => setShowReplyForm(false)}
                />
              )}
            </>
          )}
        </div>
      </div>

      {/* Render children (comment replies) if not collapsed */}
      {!isCollapsed &&
        children.map((child) => (
          <Comment key={child.id} comment={child} level={level + 1} />
        ))}
    </div>
  );
}
