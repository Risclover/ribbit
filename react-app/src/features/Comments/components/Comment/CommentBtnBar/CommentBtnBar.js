import React from "react";
import { CommentKarmaBar } from "../../CommentKarmaBar";
import { DeleteConfirmationModal } from "components";
import { EditComment } from "../../EditComment";
import { Modal } from "context";
import { PencilIcon } from "assets/icons/PencilIcon";
import { TrashIcon } from "assets/icons/TrashIcon";

export function CommentBtnBar({
  comment,
  collapsed,
  handleReplyClick,
  handleDeleteClick,
  handleEditComment,
  currentUser,
  showEditCommentModal,
  setShowEditCommentModal,
  showDeleteModal,
  setShowDeleteModal,
  postId,
  setCommentContent,
}) {
  return (
    <div className="comment-btn-bar">
      {collapsed === false && (
        <div className="comment-btns">
          <CommentKarmaBar comment={comment} />
          <div className="comment-owner-btns">
            <button onClick={handleReplyClick}>
              {" "}
              <i className="fa-regular fa-message"></i>
              Reply
            </button>

            {comment?.commentAuthor?.id === currentUser?.id && (
              <>
                <button aria-label="Edit comment" onClick={handleEditComment}>
                  <PencilIcon />
                  Edit
                </button>

                {showEditCommentModal && (
                  <Modal
                    onClose={() => setShowEditCommentModal(false)}
                    title="Edit comment"
                    open={() => setShowEditCommentModal(true)}
                  >
                    <EditComment
                      comment={comment}
                      postId={postId}
                      setShowEditCommentModal={setShowEditCommentModal}
                      showEditCommentModal={showEditCommentModal}
                      setCommentContent={setCommentContent}
                    />
                  </Modal>
                )}
                <button
                  aria-label="Delete"
                  onClick={() => setShowDeleteModal(true)}
                >
                  <TrashIcon />
                  Delete
                </button>

                {showDeleteModal && (
                  <Modal
                    onClose={() => setShowDeleteModal(false)}
                    title="Delete comment"
                    open={() => setShowDeleteModal(true)}
                  >
                    <DeleteConfirmationModal
                      setShowDeleteModal={setShowDeleteModal}
                      showDeleteModal={showDeleteModal}
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
      )}
    </div>
  );
}
