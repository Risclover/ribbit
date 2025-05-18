import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, removeComment, getCommentsForPost } from "@/store";

/**
 * Logic for CommentBtnBar component
 */
export function useCommentBtnBar({
  comment,
  setShowReplyForm,
  setCommentContent,
  postId,
}) {
  const dispatch = useDispatch();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const currentUser = useSelector((state) => state.session.user);
  const post = useSelector((state) => state.posts[postId]);
  const communities = useSelector((state) => state.communities);
  const communityId = post.community.id;

  const isAuthor = comment?.commentAuthor?.id === currentUser?.id;
  const isCommunityOwner =
    communities[communityId].communityOwner.id === currentUser?.id;
  const canEditOrDelete = isAuthor || isCommunityOwner;

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
    canEditOrDelete,
  };
}
