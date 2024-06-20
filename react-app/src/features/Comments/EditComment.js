import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useAutosizeTextArea } from "@/hooks";
import { getPosts, getComments, updateComment } from "@/store";
import "@/assets/styles/Modals.css";

export function EditComment({
  setCommentContent,
  comment,
  postId,
  setShowEditCommentModal,
}) {
  const dispatch = useDispatch();

  const textareaRef = useRef();

  const [content, setContent] = useState(comment?.content);
  const [disabled, setDisabled] = useState(content.trim().length === 0);

  useAutosizeTextArea(textareaRef.current, content);

  useEffect(() => {
    if (content.trim().length === 0) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [setDisabled, content]);

  const handleEdit = async (e) => {
    e.preventDefault();

    const data = await dispatch(
      updateComment({ content: content.trim() }, comment.id)
    );
    console.log("data:", data);
    setShowEditCommentModal(false);
    await dispatch(getPosts());
    await dispatch(getComments(postId));
    setCommentContent(data.content);
  };

  const handleClickCancel = () => {
    setShowEditCommentModal(false);
  };

  const handleTextareaChange = (e) => {
    setContent(e.target.value);
  };

  return (
    <div className="modal-container">
      <form onSubmit={handleEdit}>
        <div className="modal-content">
          <textarea
            ref={textareaRef}
            className="modal-content-input"
            onChange={handleTextareaChange}
            value={content}
            maxLength={10000}
            placeholder="What are your thoughts?"
          ></textarea>
        </div>
        <div className="modal-buttons">
          <button
            className="blue-btn-unfilled-modal btn-short"
            onClick={handleClickCancel}
          >
            Cancel
          </button>
          <button
            disabled={disabled}
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
