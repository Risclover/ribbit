import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateComment } from "../../store/comments";
import { useHistory } from "react-router-dom";
import "./Modals.css";

export default function EditComment() {
    const comments = useSelector(state => state.comments)
    const [content, setContent] = useState("");
  return (
    <>
      {showEditCommentModal && (
        <div className="modal-container">
          <div className="modal-content">
            <textarea className="edit-comment-input" onChange={(e) => setContent(e.target.value)} value={content}
          </div>
        </div>
      )}
    </>
  );
}
