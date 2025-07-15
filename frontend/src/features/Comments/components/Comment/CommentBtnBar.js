import React from "react";
import { useAppSelector } from "@/store";
import { Modal } from "@/context";
import { DeleteConfirmationModal } from "@/components";
import { CommentKarmaBar } from "./CommentKarmaBar";
import { EditComment } from "../CommentForms/EditComment";
import { useCommentBtnBar } from "../../hooks/useCommentBtnBar";
import { PencilIcon, TrashIcon } from "@/assets";

/**
 * Renders the action buttons (Reply, Edit, Delete, etc.) for a Comment.
 * - comment: the comment that this is for
 * - collapsed: boolean, whether or not the comment is collapsed
 * - postId: id of the post this comment is under
 * - setCommentContent: setter for setting the comment content (for when the user is editing the comment)
 * - setShowReplyForm: setter (boolean) for whether the reply form is shown
 */
export function CommentBtnBar({
  comment,
  collapsed,
  postId,
  setCommentContent,
  setShowReplyForm,
}) {
  const {
    isEditModalOpen,
    setIsEditModalOpen,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    handleDeleteClick,
    handleReplyClick,
    handleEditClick,
    canEditOrDelete,
  } = useCommentBtnBar({
    comment,
    setShowReplyForm,
    setCommentContent,
    postId,
  });

  if (collapsed) {
    return null;
  }

  return (
    <div className="comment-btn-bar">
      <div className="comment-btns">
        {/* Comment's voting arrows */}
        <CommentKarmaBar comment={comment} />
        {!comment?.isDeleted && (
          <div className="comment-owner-btns">
            {/* Reply button */}
            <button onClick={handleReplyClick} disabled={comment?.isDeleted}>
              <i className="fa-regular fa-message"></i>
              Reply
            </button>
            {/* Only show buttons if user is a) the comment's author, or b) the community's owner */}
            {canEditOrDelete && (
              <>
                {/* Edit button */}
                <button aria-label="Edit comment" onClick={handleEditClick}>
                  <PencilIcon />
                  <span className="comment-owner-btn-text">Edit</span>
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

                {/* Delete button */}
                <button
                  aria-label="Delete"
                  onClick={() => setIsDeleteModalOpen(true)}
                  disabled={comment?.isDeleted}
                >
                  <TrashIcon />
                  <span className="comment-owner-btn-text">Delete</span>
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
        )}
      </div>
    </div>
  );
}
