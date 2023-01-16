import React, { useState, useEffect } from "react";
import "./Modals.css";
import { useDispatch, useSelector } from "react-redux";
import { updateComment } from "../../store/comments";
import { useHistory } from "react-router-dom";

export default function EditComment() {
  return <>{showEditCommentModal && <div className="modal-container"></div>}</>;
}
