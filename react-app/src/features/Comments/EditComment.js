import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateComment, getSingleComment, getPostComments } from "../../store";
import "../../assets/styles/Modals.css";

export function EditComment({ commentId, comment, setShowEditCommentModal }) {
  const dispatch = useDispatch();

  const [content, setContent] = useState(comment?.content);
  const [errors, setErrors] = useState([]);
  const [disabled, setDisabled] = useState(content.trim().length === 0);

  // useEffect(() => {
  //   if (content.trim().length === 0) {
  //     setDisabled(true);
  //   } else {
  //     setDisabled(false);
  //   }
  // }, [setDisabled, content]);

  const handleEdit = (e) => {
    e.preventDefault();
    let errors = [];

    if (content.length === 0) {
      errors.push("You must give your comment some content before posting!");
    }

    if (errors.length > 0) {
      setErrors(errors);
    } else {
      dispatch(updateComment({ content: content.trim() }, commentId));
      setErrors([]);
      setShowEditCommentModal(false);
      dispatch(getSingleComment(commentId));
      dispatch(getPostComments(comment?.postId));
    }
  };

  const handleClickCancel = () => {
    setShowEditCommentModal(false);
  };

  const handleTextareaChange = (e) => {
    setContent(e.target.value);
  };

  return (
    <div className="modal-container">
      {errors.map((error) => (
        <div>{error}</div>
      ))}
      <form onSubmit={handleEdit}>
        <div className="modal-content">
          <textarea
            className="modal-content-input"
            onChange={handleTextareaChange}
            value={content}
            maxLength={10000}
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
