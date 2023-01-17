import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateComment } from "../../store/comments";
import "./Modals.css";

export default function EditComment({
  commentId,
  setShowEditCommentModal,
  showEditCommentModal,
}) {
  const comment = useSelector((state) => state.comments[commentId]);
  const [content, setContent] = useState(comment?.content);
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();

  const handleEdit = async (e) => {
    e.preventDefault();
    let errors = [];

    if (content.length === 0) {
      errors.push("You must give your comment some content before posting!");
    }

    if (errors.length > 0) {
      setErrors(errors);
    } else {
      await dispatch(updateComment(content, commentId));
      setErrors([]);
      setShowEditCommentModal(false);
    }
  };
  return (
    <>
      {showEditCommentModal && (
        <div className="modal-container">
          <form onSubmit={handleEdit}>
            <div className="modal-content">
              <textarea
                className="modal-content-input"
                onChange={(e) => setContent(e.target.value)}
                value={content}
                maxlength={10000}
              ></textarea>
            </div>
            <div className="modal-buttons">
              <button
                className="modal-buttons-left"
                onClick={() => setShowEditCommentModal(false)}
              >
                Cancel
              </button>
              <button className="modal-buttons-right" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
