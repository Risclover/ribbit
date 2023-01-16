import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getSingleComment } from "../../store/one_comment";
import { useDispatch, useSelector } from "react-redux";

export default function Comment({ commentId }) {
  const dispatch = useDispatch();
  const comment = useSelector((state) => state.singleComment);

  useEffect(() => {
    dispatch(getSingleComment(commentId));
  });

  return (
    <div className="single-comment">
      {comment.content} by {comment?.commentAuthor.username} -{" "}
      {moment(new Date(comment.createdAt)).fromNow()}
      {comment.commentAuthor.id === user?.id && (
        <div className="comment-author-btns">
          <button
            onClick={() => {
              console.log(comment.id);
              setShowEditCommentModal(true);
            }}
          >
            Edit
          </button>
          {showEditCommentModal && (
            <Modal onClose={() => setShowEditCommentModal(false)}>
              <EditComment
                commentId={comment.id}
                postId={postId}
                setShowEditCommentModal={setShowEditCommentModal}
                showEditCommentModal={showEditCommentModal}
              />
            </Modal>
          )}
          <button onClick={() => setShowDeleteModal(true)}>Delete</button>
          {showDeleteModal && (
            <Modal
              onClose={() => setShowDeleteModal(false)}
              title="Delete comment?"
            >
              <DeleteConfirmation
                setShowDeleteModal={setShowDeleteModal}
                showDeleteModal={showDeleteModal}
                postId={postId}
                commentId={comment.id}
                item="comment"
              />
            </Modal>
          )}
        </div>
      )}
    </div>
  );
}
