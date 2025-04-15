import { useState } from "react";
import { useDispatch } from "react-redux";
import { getPosts, removeComment } from "@/store";

export function useCommentBtnBar({ comment, setShowReplyForm }) {
  const dispatch = useDispatch();

  // Local UI states
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDeleteClick = async (e) => {
    e.preventDefault();
    setIsDeleteModalOpen(false);
    await dispatch(removeComment(comment.id));
    dispatch(getPosts());
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
