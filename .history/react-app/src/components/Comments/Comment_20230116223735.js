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
import { getSinglePost } from "../../store/one_post";
import { getPosts } from "../../store/posts";

moment.updateLocale("en", {
  relativeTime: {
    future: "in %s",
    past: "%s ago",
    // s: function (number, withoutSuffix) {
    //   return withoutSuffix ? "just now" : "a few seconds";
    // },
    m: "1 minute",
    mm: "%d minutes",
    h: "1 hour",
    hh: "%d hours",
    d: "1 day",
    dd: "%d days",
    M: "1 month",
    MM: "%d months",
    y: "1 year",
    yy: "%d years",
  },
});

export default function Comment({ commentId, postId }) {
  const dispatch = useDispatch();
  const comment = useSelector((state) => state.comments[+commentId]);
  const [showEditCommentModal, setShowEditCommentModal] = useState(false);
  const [wasEdited, setWasEdited] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const user = useSelector((state) => state.session.user);
  const post = useSelector((state) => state.posts[postId]);

  useEffect(() => {
    dispatch(getSingleComment(commentId));
    // dispatch(getSinglePost(postId));
    dispatch(getPosts());
    dispatch(getComments(postId));

    if (comment.createdAt !== comment.updatedAt) {
      setWasEdited(true);
    } else {
      setWasEdited(false);
    }
  }, [dispatch, commentId, postId]);

  console.log(wasEdited);
  if (!post) return null;
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
          {post.postAuthor.username === comment.commentAuthor.username ? (
            <span className="op-sign">OP</span>
          ) : (
            ""
          )}
          <span className="single-post-topbar-dot">•</span>
          <span className="comment-original-time">
            {moment(new Date(comment.createdAt)).fromNow()}
          </span>{" "}
          {wasEdited && (
            <span className="comment-was-edited">
              {" "}
              <span className="single-post-topbar-dot">•</span>
              edited {moment(new Date(comment.updatedAt)).fromNow()}
            </span>
          )}
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
                <Modal
                  onClose={() => setShowEditCommentModal(false)}
                  title="Edit comment"
                >
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
