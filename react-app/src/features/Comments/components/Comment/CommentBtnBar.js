import React from "react";
import { Modal } from "@/context";
import { DeleteConfirmationModal } from "@/components";
import { CommentKarmaBar } from "./CommentKarmaBar";
import { EditComment } from "../CommentForms/EditComment";
import { PencilIcon, TrashIcon } from "@/assets";
import { useCommentBtnBar } from "features/Comments/hooks/useCommentBtnBar";

/**
 * Renders the action buttons (Reply, Edit, Delete, etc.) for a Comment.
 * - comment: the comment that this is for
 * - collapsed: boolean, whether or not the comment is collapsed
 * - currentUser: the current user
 * - postId: id of the post this comment is under
 * - setCommentContent: setter for setting the comment content (for when the user is editing the comment)
 */
export function CommentBtnBar({
  comment,
  collapsed,
  currentUser,
  postId,
  setCommentContent,
  setShowReplyForm,
}) {
  const isAuthor = comment?.commentAuthor?.id === currentUser?.id;

  const isCommunityOwner = comment?.commentAuthor?.id === currentUser?.id;
  const canEditOrDelete = isAuthor || isCommunityOwner;

  const {
    isEditModalOpen,
    setIsEditModalOpen,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    handleDeleteClick,
    handleReplyClick,
    handleEditClick,
  } = useCommentBtnBar({ comment, setShowReplyForm });

  if (collapsed) {
    return null;
  }

  return (
    <div className="comment-btn-bar">
      <div className="comment-btns">
        <CommentKarmaBar comment={comment} />
        <div className="comment-owner-btns">
          <button onClick={handleReplyClick}>
            <i className="fa-regular fa-message"></i>
            Reply
          </button>

          {canEditOrDelete && (
            <>
              <button aria-label="Edit comment" onClick={handleEditClick}>
                <PencilIcon />
                Edit
              </button>

              {/* Edit Modal */}
              {isEditModalOpen && (
                <Modal
                  close={isEditModalOpen}
                  onClose={() => setIsEditModalOpen(false)}
                  title="Edit Comment"
                >
                  <EditComment
                    comment={comment}
                    postId={postId}
                    setShowEditCommentModal={setIsEditModalOpen}
                    showEditCommentModal={isEditModalOpen}
                    setCommentContent={setCommentContent}
                  />
                </Modal>
              )}

              <button
                aria-label="Delete"
                onClick={() => setIsDeleteModalOpen(true)}
              >
                <TrashIcon />
                Delete
              </button>

              {/* Delete Modal */}
              {isDeleteModalOpen && (
                <Modal
                  close={isDeleteModalOpen}
                  onClose={() => setIsDeleteModalOpen(false)}
                  title="Delete Comment"
                >
                  <DeleteConfirmationModal
                    setShowDeleteModal={setIsDeleteModalOpen}
                    showDeleteModal={isDeleteModalOpen}
                    commentId={comment?.id}
                    handleDelete={handleDeleteClick}
                    item="comment"
                  />
                </Modal>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
