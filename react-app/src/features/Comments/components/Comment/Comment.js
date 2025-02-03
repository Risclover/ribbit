import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { CommentBtnBar } from "./CommentBtnBar";
import { CommentAuthorBar } from "./CommentAuthorBar";
import { CommentContent } from "./CommentContent";
import { CommentReplyForm } from "../CommentForms/CommentReplyForm";
import { BsArrowsAngleExpand } from "react-icons/bs";
import { useComment } from "../../hooks/useComment";
import "./Comment.css";

export function Comment({ comment, level = 1 }) {
  if (!comment) {
    console.error("Comment component: comment is undefined");
    return null;
  }

  const [highlight, setHighlight] = useState(false);

  // State from custom hook:
  const {
    postId,
    isEditModalOpen,
    setIsEditModalOpen,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
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
    handleMouseEnter,
    handleMouseLeave,
    handleDeleteClick,
    handleReplyClick,
    handleEditClick,
    wasEdited,
  } = useComment(comment);

  // Check the URL for #comment-xxx to highlight
  useEffect(() => {
    const currentUrl = window.location.href;
    const match = currentUrl.match(/#comment-(\d+)/);
    if (match) {
      const commentIdFromUrl = parseInt(match[1], 10);
      if (commentIdFromUrl === comment.id) {
        setHighlight(true);
      }
    }
  }, [comment.id]);

  // Render child comments
  const { children = [] } = comment;

  // Just a small helper array for threadlines
  const parentThreadlines = Array.from({ length: level - 1 });

  return (
    <div
      className={`comment-container ${level === 1 ? "comment-topmargin" : ""}`}
    >
      {/* Threadlines (collapsing logic) */}
      {!isCollapsed && (
        <div className="all-threadlines" onClick={() => setIsCollapsed(true)}>
          {parentThreadlines.map((_, index) => (
            <div className="this-levels-threadline" key={index}>
              <div className="threadline-container">
                <div className="threadline"></div>
              </div>
            </div>
          ))}
          <div className="this-levels-threadline">
            <div className="threadline-container">
              <div className="threadline"></div>
            </div>
          </div>
        </div>
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
        >
          <BsArrowsAngleExpand />
        </button>
        <NavLink
          className="comment-user-img-container"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
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
                handleReplyClick={handleReplyClick}
                handleDeleteClick={handleDeleteClick}
                handleEditClick={handleEditClick}
                currentUser={currentUser}
                isEditModalOpen={isEditModalOpen}
                setIsEditModalOpen={setIsEditModalOpen}
                isDeleteModalOpen={isDeleteModalOpen}
                setIsDeleteModalOpen={setIsDeleteModalOpen}
                postId={postId}
                setCommentContent={setCommentContent}
                post={post}
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
