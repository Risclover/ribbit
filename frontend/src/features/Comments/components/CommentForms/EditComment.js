import React from "react";
import useEditComment from "../../hooks/useEditComment";
import "@/assets/styles/Modals.css";

/**
 * The 'Edit Comment' form/modal, for editing an existing comment
 * - comment: The comment in question that is being edited
 * - postId: id of the post this comment is under
 * - setShowEditCommentModal: Setter for whether this modal is showing or not
 * - setCommentContent: Setter for the content of this comment (aka required to edit the comment)
 */
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
