import { useAuthFlow } from "context";
import { useAutosizeTextArea } from "hooks";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "store";
import { createComment } from "store";

export default function useCommentForm({ onCancel, parentId, postId }) {
  const dispatch = useDispatch();
  const textareaRef = useRef();
  const { openLogin } = useAuthFlow();

  const user = useSelector((state) => state.session.user);

  const [content, setContent] = useState("");
  const [errors, setErrors] = useState([]);

  useAutosizeTextArea(textareaRef.current, content);

  const disabled = content.trim().length === 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    const payload = {
      content,
      parentId,
    };

    try {
      dispatch(createComment(payload, postId));
      dispatch(getPosts());
      setContent("");
      if (onCancel) onCancel();
    } catch (err) {
      setErrors(["There was an error creating your comment"]);
    }
  };
  return {
    content,
    setContent,
    openLogin,
    user,
    errors,
    disabled,
    handleSubmit,
    textareaRef,
  };
}
