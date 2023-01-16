import React from "react";
import { useDispatch } from "react-redux";
import { updateComment } from "../../store/comments";
export default function UpdateComment() {
  return (
    <div className="update-comment-container">
      <form className="update-comment-form" onSubmit={handleSubmit}></form>
    </div>
  );
}
