import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateComment } from "../../store/comments";
import { useHistory } from "react-router-dom";
import "./Modals.css";

export default function EditComment({
  commentId,
  postId,
  setShowEditCommentModal,
  showEditCommentModal,
}) {
  const comment = useSelector((state) => state.comments[commentId]);
  const [content, setContent] = useState(comment?.content);
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();
  const handleEdit = (e) => {
    e.preventDefault();
    let errors = [];

    if (content.length === 0) {
      errors.push("You must give your comment some content before posting!");
    }

    if (errors.length > 0) {
      setErrors(errors);
    } else {
      const data = dispatch(updateComment(content, commentId));
      if (data) {
        setErrors(data.errors);
      } else {
        history.push(`/posts/${postId}`);
        setShowEditCommentModal(false);
      }
    }
  };
  return (
    <>
      {showEditCommentModal && (
        <div className="modal-container">
          <div className="modal-content">
            <textarea
              className="edit-comment-input"
              onChange={(e) => setContent(e.target.value)}
              value={content}
            ></textarea>
          </div>
        </div>
      )}
    </>
  );
}
