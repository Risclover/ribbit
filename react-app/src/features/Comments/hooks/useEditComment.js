import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useAutosizeTextArea } from "@/hooks";
import { updateComment, getComments, getPosts } from "@/store";

export default function useEditComment({
  comment,
  postId,
  setShowEditCommentModal,
  setCommentContent,
}) {
  const dispatch = useDispatch();
  const textareaRef = useRef();

  const [content, setContent] = useState(comment?.content || "");

  const isDisabled = content.trim().length === 0;

  useAutosizeTextArea(textareaRef.current, content);

  const handleEdit = async (e) => {
    e.preventDefault();
    if (isDisabled) return;

    const data = await dispatch(
      updateComment({ content: content.trim() }, comment.id)
    );

    setShowEditCommentModal(false);
    dispatch(getPosts());
    dispatch(getComments(postId));

    if (data?.content) {
      setCommentContent(data.content);
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setShowEditCommentModal(false);
  };

  return {
    content,
    setContent,
    isDisabled,
    handleEdit,
    handleCancel,
    textareaRef,
  };
}
