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
import { addCommentVote, removeCommentVote } from "../../store/comments";

moment.updateLocale("en", {
  relativeTime: {
    future: (diff) => (diff == "just now" ? diff : `in ${diff}`),
    past: (diff) => (diff == "just now" ? diff : `${diff} ago`),
    s: "just now",
    ss: "just now",
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

const URL_REGEX =
  /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm;

function Text({ content }) {
  const words = content.split(" ");
  return (
    <p>
      {words.map((word) => {
        return word.match(URL_REGEX) ? (
          <>
            <a href={word}>{word}</a>{" "}
          </>
        ) : (
          word + " "
        );
      })}
    </p>
  );
}

export default function Comment({ commentId, postId }) {
  const dispatch = useDispatch();
  const comment = useSelector((state) => state.comments[+commentId]);
  const [showEditCommentModal, setShowEditCommentModal] = useState(false);
  const [wasEdited, setWasEdited] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [commentPermission, setCommentPermission] = useState(false);
  const user = useSelector((state) => state.session.user);
  const post = useSelector((state) => state.posts[postId]);

  useEffect(() => {
    if (comment.createdAt !== comment.updatedAt) {
      setWasEdited(true);
    } else {
      setWasEdited(false);
    }
  }, [dispatch, commentId, postId]);

  useEffect(() => {
    for (let voter of Object.values(comment.commentVoters)) {
      if (voter?.username === user?.username) {
        setCommentPermission(false);
        break;
      }
    }
  });

  useEffect(() => {
    if (Object.values(comment.commentVoters).length === 0) {
      setCommentPermission(true);
    } else {
      for (let voter of Object.values(comment.commentVoters)) {
        if (voter?.username === user?.username) {
          setCommentPermission(false);
          break;
        } else {
          setCommentPermission(true);
          continue;
        }
      }
    }
  }, [commentPermission, comment.commentVoters]);

  if (!post) return null;
  return (
    <div className="the-actual-comment" style={{ whiteSpace: "pre-line" }}>
      <div className="comment-left-side">
        <NavLink to={`/users/${comment.commentAuthor.id}`}>
          <div
            className="comment-user-img"
            style={{
              backgroundImage: `url(${comment.commentAuthor.profile_img})`,
              backgroundRepeat: "no-repeat",
            }}
          >
            &nbsp;
          </div>
        </NavLink>
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
        <div className="comment-right-content">
          <Text content={comment.content} />
        </div>
        <div className="comment-owner-btns">
          {commentPermission && (
            <button
              className="comment-owner-btn-like"
              onClick={async (e) => {
                e.preventDefault();
                await dispatch(addCommentVote(comment.id));
                setCommentPermission(false);
              }}
            >
              <i className="fa-solid fa-thumbs-up"></i>
            </button>
          )}
          {!commentPermission && (
            <button
              className="comment-owner-btn-liked"
              onClick={async (e) => {
                e.preventDefault();
                await dispatch(removeCommentVote(comment.id));
                setCommentPermission(true);
              }}
            >
              <i className="fa-solid fa-thumbs-up"></i>
            </button>
          )}
          <div className="post-karma-number">{comment.votes}</div>
          {comment.commentAuthor?.id === user?.id && (
            <>
              <button
                onClick={() => {
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
