import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createComment } from "../../store/comments";

export default function CommentForm() {
    const [content, setContent] = useState("");
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault(((())))
    }
  return <div className="comment-form"></div>;
}
