import React from "react";
import { NavLink } from "react-router-dom";
import { BsArrowsAngleExpand } from "react-icons/bs";
import { CommentBtnBar } from "./CommentBtnBar";
import { CommentAuthorBar } from "./CommentAuthorBar";
import { CommentContent } from "./CommentContent";
import { CommentReplyForm } from "../CommentForms/CommentReplyForm";
import { useComment } from "../../hooks/useComment";
import { CommentThreadlines } from "./CommentThreadlines";
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

  // State from custom hook:
  const {
    postId,
    isCollapsed,
    setIsCollapsed,
    showReplyForm,
    setShowReplyForm,
    commentContent,
    setCommentContent,
    post,
    currentUser,
    editedTime,
    commentTime,
    wasEdited,
    highlight,
  } = useComment(comment);

  // Render child comments
  const { children = [] } = comment;

  return (
    <div
      className={`comment-container ${level === 1 ? "comment-topmargin" : ""}`}
    >
      {/* Threadlines */}
      {!isCollapsed && (
        <CommentThreadlines setIsCollapsed={setIsCollapsed} level={level} />
      )}

      {/* Actual comment card */}
      <div
        className={`comment${!isCollapsed ? " expanded" : ""}${
          highlight ? " comment-bg-blue" : ""
        }`}
      >
        <button
          className="comment-expand-btn"
          onClick={() => setIsCollapsed(false)}
          tabIndex={!isCollapsed ? -1 : 0}
        >
          <BsArrowsAngleExpand />
        </button>
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
          <CommentAuthorBar
            comment={comment}
            post={post}
            commentTime={commentTime}
            wasEdited={wasEdited}
            editedTime={editedTime}
          />
          {!isCollapsed && (
            <>
              <CommentContent
                comment={comment}
                commentContent={commentContent}
              />
              <CommentBtnBar
                comment={comment}
                collapsed={isCollapsed}
                currentUser={currentUser}
                postId={postId}
                setCommentContent={setCommentContent}
              />
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

      {/* Render children if not collapsed */}
      {!isCollapsed &&
        children.map((child) => (
          <Comment key={child.id} comment={child} level={level + 1} />
        ))}
    </div>
  );
}
