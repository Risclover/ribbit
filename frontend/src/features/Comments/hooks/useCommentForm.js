import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuthFlow } from "@/context";
import { useAutosizeTextArea } from "@/hooks";
import { createComment, getCommentsForPost } from "@/store";

export function useCommentForm({ onCancel, parentId, postId, onNewComment }) {
  const dispatch = useDispatch();
  const textareaRef = useRef();
  const { openLogin } = useAuthFlow();

  const [content, setContent] = useState("");
  const [errors, setErrors] = useState([]);

  useAutosizeTextArea(textareaRef.current, content);

  const user = useSelector((state) => state.session.user);
  const disabled = content.trim().length === 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    const payload = { content, parentId };

    try {
      const newComment = await dispatch(createComment(payload, postId));
      if (onNewComment && newComment) onNewComment(newComment.id);

      setErrors([]); // 🟢 clear banner
      dispatch(getCommentsForPost(postId));
      setContent("");
      if (onCancel) onCancel();
    } catch {
      setErrors(["There was an error creating your comment"]);
    }
  };

  return {
    content,
    setContent: (val) => {
      if (errors.length) setErrors([]); // optional UX nicety
      setContent(val);
    },
    openLogin,
    user,
    errors,
    disabled,
    handleSubmit,
    textareaRef,
  };
}
