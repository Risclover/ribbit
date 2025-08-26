import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
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
  const dispatch = useAppDispatch();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const currentUser = useAppSelector((state) => state.session.user);
  const post = useAppSelector((state) => state.posts.posts[postId]);
  const communities = useAppSelector((state) => state.communities.communities);
  const communityId = post.communityId;

  const isAuthor = comment?.commentAuthor?.id === currentUser?.id;
  const isCommunityOwner =
    communities[communityId].communityOwnerId === currentUser?.id;
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
