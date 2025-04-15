import { useDispatch } from "react-redux";
import { getPosts, removeComment } from "@/store";

/**
 * Logic for DeleteCommentConfirmation component
 */
export function useDeleteCommentConfirmation({
  commentId,
  setShowDeleteModal,
}) {
  const dispatch = useDispatch();

  const handleDeleteClick = async (e) => {
    e.preventDefault();
    setShowDeleteModal(false);
    await dispatch(removeComment(commentId));
    dispatch(getPosts());
  };

  const handleKeepClick = (e) => {
    e.preventDefault();
    setShowDeleteModal(false);
  };
  return { handleDeleteClick, handleKeepClick };
}
