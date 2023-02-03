import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GoArrowUp, GoArrowDown } from "react-icons/go";
import parse from "html-react-parser";
import { BsArrowsAngleExpand } from "react-icons/bs";
import moment from "moment";

import { getUsers } from "../../store/users";
import { addCommentVote, removeCommentVote } from "../../store/comments";
import { NavLink } from "react-router-dom";
import { Modal } from "../../context/Modal";
import DeleteConfirmation from "../../components/Modals/DeleteConfirmation";
import EditComment from "./EditComment";

import "./Comments.css";

moment.updateLocale("en", {
  relativeTime: {
    future: (diff) => (diff === "just now" ? diff : `in ${diff}`),
    past: (diff) => (diff === "just now" ? diff : `${diff} ago`),
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
  const words = String(parse(content)).split(" ");
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

  const [showEditCommentModal, setShowEditCommentModal] = useState(false);
  const [wasEdited, setWasEdited] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [commentPermission, setCommentPermission] = useState(false);
  const [upvote, setUpvote] = useState(false);
  const [downvote, setDownvote] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const comments = useSelector((state) => state.comments);
  const comment = useSelector((state) => state.comments[+commentId]);
  const user = useSelector((state) => state.session.user);
  const post = useSelector((state) => state.posts[postId]);

  useEffect(() => {
    if (comment.createdAt !== comment.updatedAt) {
      setWasEdited(true);
    } else {
      setWasEdited(false);
    }
  }, [dispatch, comment.createdAt, comment.updatedAt]);

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
  }, [user?.username, comment.commentVoters]);

  const handleUpvoteClick = async () => {
    if (user?.id in comment?.commentVoters) {
      if (!comment?.commentVoters[user?.id].isUpvote) {
        await dispatch(removeCommentVote(+commentId));
        await dispatch(addCommentVote(+commentId, "upvote"));
        dispatch(getUsers());
      } else if (upvote) {
        handleRemoveVote();
      } else {
        handleAddVote();
      }
    } else {
      handleAddVote();
    }
  };

  const handleDownvoteClick = async () => {
    if (user?.id in comment?.commentVoters) {
      if (comment?.commentVoters[user?.id].isUpvote) {
        await dispatch(removeCommentVote(+commentId));
        await dispatch(addCommentVote(+commentId, "downvote"));
        dispatch(getUsers());
      } else if (downvote) {
        handleRemoveVote();
      }
    } else {
      handleAddDownvote();
    }
  };

  const handleAddVote = async (e) => {
    await dispatch(addCommentVote(+commentId, "upvote"));
    setUpvote(true);
    dispatch(getUsers());
  };

  const handleAddDownvote = async () => {
    await dispatch(addCommentVote(+commentId, "downvote"));
    setDownvote(true);
    dispatch(getUsers());
  };

  const handleRemoveVote = async () => {
    await dispatch(removeCommentVote(+commentId));
    if (upvote) {
      setUpvote(false);
    }
    if (downvote) {
      setDownvote(false);
    }
    dispatch(getUsers());
  };

  useEffect(() => {
    if (comments && Object.values(comments).length > 0) {
      if (Object.values(comment?.commentVoters).length > 0) {
        for (let voter of Object.values(comment?.commentVoters)) {
          if (user?.id === voter?.userId) {
            if (voter.isUpvote) {
              setUpvote(true);
              setDownvote(false);
            } else if (!voter.isUpvote) {
              setUpvote(false);
              setDownvote(true);
            }
          }
        }
      }
    }
  }, [upvote, downvote, comment?.commentVoters]);

  const handleCollapse = (id) => {
    setCollapsed(!collapsed);
  };

  if (!post) return null;
  return (
    <div className="comment-system">
      <div
        className="the-actual-comment"
        id={comment.id}
        style={{ whiteSpace: "pre-line" }}
      >
        <div className="comment-left-side">
          <div className="comment-centered">
            {collapsed && (
              <BsArrowsAngleExpand
                className="testing"
                onClick={() => setCollapsed(false)}
              />
            )}
            <NavLink to={`/users/${comment.commentAuthor.id}/profile`}>
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
          </div>
          {collapsed === false && (
            <div
              className="threadline-wrapper"
              onClick={() => setCollapsed(true)}
            >
              <div
                className="comment-threadline"
                onClick={() => setCollapsed(true)}
              >
                &nbsp;
              </div>
            </div>
          )}
        </div>
        <div className="comment-right-col">
          <div className="comment-right-username">
            <NavLink to={`/users/${comment.commentAuthor.id}/profile`}>
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
          {collapsed === false && (
            <div className="comment-right-content">
              {parse(comment.content)}
            </div>
          )}
          {collapsed === false && (
            <div className="comment-owner-btns">
              <button
                className={upvote ? "vote-btn-red" : "upvote-btn-grey"}
                onClick={handleUpvoteClick}
              >
                <GoArrowUp />
              </button>

              <span className="karmabar-votes">{comment?.votes}</span>
              <button
                className={downvote ? "vote-btn-blue" : "downvote-btn-grey"}
                onClick={handleDownvoteClick}
              >
                <GoArrowDown />
              </button>
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
                  <button onClick={() => setShowDeleteModal(true)}>
                    Delete
                  </button>
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
          )}
        </div>
      </div>
    </div>
  );
}
