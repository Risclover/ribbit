import React from "react";
import { CommentBtnBar } from "./CommentBtnBar/CommentBtnBar";
import { CommentAuthorBar } from "./CommentAuthorBar";
import useComment from "features/Comments/hooks/useComment";
import { CommentContent } from "./CommentContent";
import { CommentReplyForm } from "../CommentForms/CommentReplyForm";
import { BsArrowsAngleExpand } from "react-icons/bs";
import "./Comment.css";
import { NavLink } from "react-router-dom";

export function Comment({
  comment,
  commentId,
  specificCommentActive,
  level = 1,
}) {
  if (!comment) {
    console.error("Comment component: comment is undefined");
    return null; // Do not render the component
  }

  const {
    postId,
    showEditCommentModal,
    setShowEditCommentModal,
    showDeleteModal,
    setShowDeleteModal,
    collapsed,
    setCollapsed,
    showReplyForm,
    setShowReplyForm,
    commentContent,
    setCommentContent,
    showPopup,
    setShowPopup,
    hideTimeout,
    setHideTimeout,
    post,
    communities,
    currentUser,
    users,
    editedTime,
    commentTime,
    handleMouseEnter,
    handleMouseLeave,
    handleDeleteClick,
    handleUserImgClick,
    handleReplyClick,
    handleEditComment,
    wasEdited,
  } = useComment({ comment, commentId });

  const { children } = comment;

  const parentThreadlines = [...Array(level - 1)];

  const btnBarProps = {
    collapsed,
    handleReplyClick,
    handleDeleteClick,
    handleEditComment,
    currentUser,
    showEditCommentModal,
    setShowEditCommentModal,
    showDeleteModal,
    setShowDeleteModal,
    showReplyForm,
    postId,
    setCommentContent,
    setShowReplyForm,
  };

  return (
    <div
      className={`comment-container ${level === 1 ? "comment-topmargin" : ""}`}
    >
      {!collapsed && (
        <div className="all-threadlines" onClick={() => setCollapsed(true)}>
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
      {/* <CommentThreadlines setCollapsed={setCollapsed} /> */}
      <div className={`comment${!collapsed ? " expanded" : ""}`}>
        <button className={`comment-expand-btn`}>
          <BsArrowsAngleExpand onClick={() => setCollapsed(false)} />
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
          {!collapsed && (
            <CommentContent comment={comment} commentContent={commentContent} />
          )}
          {!collapsed && (
            <CommentBtnBar
              comment={comment}
              commentId={commentId}
              {...btnBarProps}
            />
          )}
          {showReplyForm && (
            <CommentReplyForm
              postId={postId}
              parentId={comment.id}
              onCancel={() => setShowReplyForm(false)}
            />
          )}
        </div>
      </div>
      {!collapsed &&
        children &&
        children.map((childComment) => (
          <Comment
            key={childComment.id}
            comment={childComment}
            commentId={childComment.id}
            level={level + 1}
          />
        ))}
    </div>
  );
}
