import React from "react";
import { CommentKarmaBar } from "../../CommentKarmaBar";
import useComment from "features/Comments/hooks/useComment";
import { DeleteConfirmationModal } from "components";
import { EditComment } from "../../EditComment";
import { Modal } from "context";
import { CommentForm } from "../../CommentForms";
import { Comment } from "../Comment";
import CommentReplyForm from "../../CommentForms/CommentReplyForm";

export default function CommentBtnBar({
  comment,
  commentId,
  collapsed,
  handleReplyClick,
  handleDeleteClick,
  handleEditComment,
  currentUser,
  showEditCommentModal,
  setShowEditCommentModal,
  showDeleteModal,
  setShowDeleteModal,
  showReplyForm,
  postId,
  setShowReplyForm,
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="800px"
                    width="800px"
                    version="1.1"
                    fill="#878a8c"
                    id="_x32_"
                    viewBox="0 0 512 512"
                  >
                    <g>
                      <path
                        className="st0"
                        d="M392.052,0l-0.642,0.01c0,0,0,0,0.009,0c0,0,0-0.01,0.008,0L392.052,0z"
                      />
                      <path
                        className="st0"
                        d="M487.66,61.494l-0.037-0.037c-0.056-0.056-0.102-0.111-0.156-0.166h-0.01   c-0.064-0.056-0.092-0.092-0.193-0.183l-36.51-36.511c-0.009-0.018-0.028-0.027-0.046-0.046   C434.386,8.23,412.811-0.027,391.419,0.01c-21.392-0.037-42.968,8.211-59.308,24.56L297.75,58.931l-13.043,13.033L0,356.681V512   h155.327l284.708-284.698l13.042-13.042l34.362-34.37c16.34-16.332,24.588-37.916,24.56-59.299   c0.027-21.291-8.156-42.766-24.313-59.06L487.66,61.494z M136.572,466.736h-91.3v-91.299l271.445-271.455l91.299,91.3   L136.572,466.736z M455.429,147.878l-21.327,21.318l-91.29-91.299L364.13,56.58c7.578-7.569,17.35-11.279,27.289-11.306   c9.938,0.027,19.702,3.738,27.288,11.306l36.722,36.712c7.569,7.587,11.279,17.36,11.298,27.298   C466.708,130.528,462.998,140.292,455.429,147.878z"
                      />
                    </g>
                  </svg>
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-trash"
                  >
                    <path d="M3 6h18" />
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                  </svg>
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

          {/* {showReplyForm && (
            <div className="reply-form-container">
              <CommentForm
                postId={postId}
                parentId={comment.id}
                onCancel={() => setShowReplyForm(false)}
              />
            </div>
          )}

          {comment.children && comment.children.length > 0 && (
            <div className="nested-comments">
              {comment.children.map((childComment) => (
                <Comment
                  key={childComment.id}
                  commentId={childComment.id}
                  comment={childComment}
                />
              ))}
            </div>
          )} */}
        </div>
      )}
    </div>
  );
}
