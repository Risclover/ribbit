import { useState } from "react";
import { useDispatch } from "react-redux";
import { getPosts, removeComment, getCommentsForPost } from "@/store";

/**
 * Logic for CommentBtnBar component
 */
export function useCommentBtnBar({
  comment,
  setShowReplyForm,
  post,
  setCommentContent,
}) {
  const dispatch = useDispatch();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDeleteClick = async (e) => {
    e.preventDefault();
    setIsDeleteModalOpen(false);
    await dispatch(removeComment(comment.id));
    dispatch(getCommentsForPost(post.id));
    dispatch(getPosts());
    setCommentContent("[deleted]");
  };

  const handleReplyClick = () => {
    setShowReplyForm((prev) => !prev);
  };

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };
  return {
    isEditModalOpen,
    setIsEditModalOpen,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    handleDeleteClick,
    handleReplyClick,
    handleEditClick,
  };
}
