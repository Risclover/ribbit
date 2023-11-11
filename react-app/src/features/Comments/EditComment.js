import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { updateComment } from "../../store/comments";

import "../../assets/styles/Modals.css";

export default function EditComment({
  commentId,
  setShowEditCommentModal,
  showEditCommentModal,
}) {
  const dispatch = useDispatch();

  const comment = useSelector((state) => state.comments[commentId]);
  const [content, setContent] = useState(comment?.content);
  const [errors, setErrors] = useState([]);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (content.trim().length === 0) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [setDisabled, content]);

  const handleEdit = async (e) => {
    e.preventDefault();
    let errors = [];

    if (content.length === 0) {
      errors.push("You must give your comment some content before posting!");
    }

    if (errors.length > 0) {
      setErrors(errors);
    } else {
      await dispatch(updateComment({ content: content.trim() }, commentId));
      setErrors([]);
      setShowEditCommentModal(false);
    }
  };
  return (
    <>
      {showEditCommentModal && (
        <div className="modal-container">
          {errors.map((error) => (
            <div>{error}</div>
          ))}
          <form onSubmit={handleEdit}>
            <div className="modal-content">
              <textarea
                className="modal-content-input"
                onChange={(e) => setContent(e.target.value)}
                value={content}
                maxLength={10000}
              ></textarea>
            </div>
            <div className="modal-buttons">
              <button
                className="blue-btn-unfilled-modal btn-short"
                onClick={() => setShowEditCommentModal(false)}
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
      )}
    </>
  );
}
