import React, { useEffect, useState } from "react";
import { getSingleComment } from "../../store/one_comment";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
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
  const post = useSelector((state) => state.singlePost);

  useEffect(() => {
    dispatch(getSingleComment(commentId));
    dispatch(getComments(postId));
  }, [dispatch, commentId, postId]);

  return (
    <div className="the-actual-comment">
      <div className="comment-left-side">
        <div
          className="comment-user-img"
          style={{
            backgroundImage: `url(${comment.commentAuthor.profile_img})`,
            backgroundRepeat: "no-repeat",
          }}
        >
          &nbsp;
        </div>
        <div className="comment-threadline">&nbsp;</div>
      </div>
      <div className="comment-right-col">
        <div className="comment-right-username">
          <NavLink to={`/users/${comment.commentAuthor.id}`}>
            {comment.commentAuthor.username}
          </NavLink>{" "}
          {post.postAuthor?.username === comment.commentAuthor.username ? (
            <span className="op-sign">OP</span>
          ) : (
            ""
          )}
          <span className="single-post-topbar-dot">•</span>
          {moment(new Date(comment.createdAt)).fromNow()}
        </div>
        <div className="comment-right-content">{comment.content}</div>
        <div className="comment-owner-btns">
          <button className="post-karma-upvote">🡅</button>
          <div className="post-karma-number">0</div>
          <button className="post-karma-downvote">🡇</button>
          {comment.commentAuthor?.id === user?.id && (
            <>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}
