import React from "react";
import useEditComment from "features/Comments/hooks/useEditComment";
import "@/assets/styles/Modals.css";

export function EditComment({
  comment,
  postId,
  setShowEditCommentModal,
  setCommentContent,
}) {
  const {
    content,
    setContent,
    isDisabled,
    handleEdit,
    handleCancel,
    textareaRef,
  } = useEditComment({
    comment,
    postId,
    setShowEditCommentModal,
    setCommentContent,
  });

  return (
    <div className="modal-container">
      <form onSubmit={handleEdit}>
        <div className="modal-content">
          <textarea
            ref={textareaRef}
            className="modal-content-input"
            onChange={(e) => setContent(e.target.value)}
            value={content}
            maxLength={10000}
            placeholder="What are your thoughts?"
          />
        </div>
        <div className="modal-buttons">
          <button
            className="blue-btn-unfilled-modal btn-short"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            disabled={isDisabled}
            className="blue-btn-filled btn-short"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
