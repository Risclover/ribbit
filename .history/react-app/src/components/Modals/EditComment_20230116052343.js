import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateComment } from "../../store/comments";
import { useHistory } from "react-router-dom";
import "./Modals.css";

export default function EditComment() {
  return <>{showEditCommentModal && <div className="modal-container"></div>}</>;
}
