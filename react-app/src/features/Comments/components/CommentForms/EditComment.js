import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { updateComment, getComments, getPosts } from "@/store";
import { useAutosizeTextArea } from "@/hooks";
import "@/assets/styles/Modals.css";

export function EditComment({
  comment,
  postId,
  setShowEditCommentModal,
  setCommentContent,
}) {
  const dispatch = useDispatch();
  const textareaRef = useRef();
  const [content, setContent] = useState(comment?.content || "");
  const [isDisabled, setIsDisabled] = useState(true);

  useAutosizeTextArea(textareaRef.current, content);

  useEffect(() => {
    setIsDisabled(content.trim().length === 0);
  }, [content]);

  const handleEdit = async (e) => {
    e.preventDefault();
    if (isDisabled) return;

    const data = await dispatch(
      updateComment({ content: content.trim() }, comment.id)
    );
    setShowEditCommentModal(false);

    // If you need to refresh both posts & comments
    dispatch(getPosts());
    dispatch(getComments(postId));

    if (data?.content) {
      setCommentContent(data.content);
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setShowEditCommentModal(false);
  };

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
