import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePopup } from "@/context";
import { removeComment, getPosts } from "@/store";
import { convertTime } from "../utils/convertTime";

/**
 * Custom logic for an individual Comment component.
 */
export function useComment(comment) {
  const dispatch = useDispatch();
  const { isPopupOpen, setIsPopupOpen } = usePopup();

  // Local UI states
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [commentContent, setCommentContent] = useState(comment?.content || "");
  const [showPopup, setShowPopup] = useState(false);
  const [hideTimeout, setHideTimeout] = useState(null);

  const currentUser = useSelector((state) => state.session.user);
  const post = useSelector((state) => state.posts[comment?.postId]);

  const editedTime = convertTime(comment, "edit");
  const commentTime = convertTime(comment);
  const wasEdited = comment?.createdAt !== comment?.updatedAt;

  const handleMouseEnter = () => {
    // If it's your own user, skip
    if (comment?.commentAuthor?.id === currentUser?.id) return;

    if (hideTimeout) clearTimeout(hideTimeout);

    if (!isPopupOpen) {
      setShowPopup(true);
      setIsPopupOpen(true);
    }
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setShowPopup(false);
      setIsPopupOpen(false);
    }, 200);
    setHideTimeout(timeout);
  };

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
    postId: comment?.postId,
    isEditModalOpen,
    setIsEditModalOpen,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    isCollapsed,
    setIsCollapsed,
    showReplyForm,
    setShowReplyForm,
    commentContent,
    setCommentContent,
    post,
    currentUser,
    editedTime,
    commentTime,
    wasEdited,
    handleMouseEnter,
    handleMouseLeave,
    handleDeleteClick,
    handleReplyClick,
    handleEditClick,
  };
}
