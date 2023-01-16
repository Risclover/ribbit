import React, { useEffect, useState } from "react";
import { getSingleComment } from "../../store/one_comment";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../../context/Modal";
import moment from "moment";
import DeleteConfirmation from "../Modals/DeleteConfirmation";
import EditComment from "../Modals/EditComment";
import { getComments } from "../../store/comments";
import "./Comments.css";

export default function Comment({ commentId, postId }) {
  const dispatch = useDispatch();
  const comment = useSelector((state) => state.comments[+commentId]);
  const [showEditCommentModal, setShowEditCommentModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getSingleComment(commentId));
    dispatch(getComments(postId));
  }, [dispatch, commentId, postId]);

  return (
    <div className="single-comment">
      {comment.content} by {comment.commentAuthor?.username} -{" "}
      {moment(new Date(comment.createdAt)).fromNow()}
      {comment.commentAuthor?.id === user?.id && (
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
