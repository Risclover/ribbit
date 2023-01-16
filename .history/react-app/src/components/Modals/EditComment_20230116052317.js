import React from "react";
import "./Modals.css";
import { useDispatch, useSelector } from "react-redux";
import { updateComment } from "../../store/comments";

export default function EditComment() {
  return <>{showEditCommentModal && <div className="modal-container"></div>}</>;
}
