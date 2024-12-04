import React from "react";

export function CommentEditBtn({ showEditCommentModal, handleEditComment }) {
  return (
    <div className="comment-edit-btn">
      {" "}
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
    </div>
  );
}
