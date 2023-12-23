import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { GoArrowUp, GoArrowDown } from "react-icons/go";
import { BsArrowsAngleExpand } from "react-icons/bs";
import parse from "html-react-parser";
import moment from "moment";
import { Modal } from "../../context";
import { getUsers, addCommentVote, removeCommentVote } from "../../store";
import { EditComment } from "../../features";
import { Username, DeleteConfirmationModal } from "../../components";
import "./Comments.css";

moment.updateLocale("en-comment", {
  relativeTime: {
    future: (diff) => (diff === "just now" ? diff : `in ${diff}`),
    past: (diff) => (diff === "just now" ? diff : `${diff} ago`),
    s: "just now",
    ss: "just now",
    m: "1 min.",
    mm: "%d min.",
    h: "1 hr.",
    hh: "%d hr.",
    d: "1 day",
    dd: "%d days",
    M: "1 mo.",
    MM: "%d mo.",
    y: "1 yr.",
    yy: "%d yr.",
  },
});

const URL_REGEX =
  /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm;

function Text({ content }) {
  if (typeof parse(content) !== "string") {
    return content;
  } else if (typeof parse(content) === "string") {
    const words = String(parse(content)).split(" ");
    return (
      <p>
        {words.map((word) => {
          return word.match(URL_REGEX) ? (
            <>
              <a href={word} rel="noreferrer" target="_blank">
                {word}
              </a>{" "}
            </>
          ) : (
            word + " "
          );
        })}
      </p>
    );
  }
}

export function Comment({ commentId, comment }) {
  const dispatch = useDispatch();

  const { postId } = useParams();

  const [showEditCommentModal, setShowEditCommentModal] = useState(false);
  const [wasEdited, setWasEdited] = useState(
    comment?.createdAt !== comment?.updatedAt
  );
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [upvote, setUpvote] = useState(false);
  const [downvote, setDownvote] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const comments = useSelector((state) => state.comments);
  const user = useSelector((state) => state.session.user);
  const post = useSelector((state) => state.singlePost);
  const url = window.location.href;

  let editedTime = moment(new Date(comment?.updatedAt))
    .locale("en-comment")
    .fromNow();
  let commentTime = moment(new Date(comment?.createdAt))
    .locale("en-comment")
    .fromNow();

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
      if (
        comment?.commentVoters &&
        Object.values(comment.commentVoters).length > 0
      ) {
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
    }
  }, [upvote, downvote, comment?.commentVoters, user?.id, comments]);

  return (
    <div className="comment-system" id={`comment-${comment?.id}`}>
      <div
        className={
          url.slice(-15).endsWith("comment-" + comment?.id)
            ? "the-actual-comment active"
            : "the-actual-comment"
        }
        id={comment?.id}
        style={{ whiteSpace: "pre-line" }}
      >
        <div className="comment-left-side">
          <div className="comment-centered">
            {collapsed && (
              <span
                className={`comment-moving-btn${
                  collapsed ? " btn-unmoved" : " btn-moved"
                }`}
              >
                <BsArrowsAngleExpand
                  className="testing"
                  onClick={() => setCollapsed(false)}
                />
              </span>
            )}
            <NavLink to={`/users/${comment?.commentAuthor?.id}/profile`}>
              <div
                className="comment-user-img"
                style={{
                  backgroundImage: `url(${comment?.commentAuthor.profile_img})`,
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
            <Username
              community={true}
              username={comment.commentAuthor?.username}
              user={comment?.commentAuthor}
            />
            {post[postId]?.postAuthor?.username ===
            comment.commentAuthor?.username ? (
              <span className="op-sign">OP</span>
            ) : (
              ""
            )}
            <span className="single-post-topbar-dot">•</span>
            <span className="comment-original-time">{commentTime}</span>{" "}
            {wasEdited && (
              <span className="comment-was-edited">
                {" "}
                <span className="single-post-topbar-dot">•</span>
                edited {editedTime}
              </span>
            )}
          </div>

          {collapsed === false && (
            <div className="comment-right-content">
              {comment?.content && <Text content={comment?.content} />}
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
              {comment?.commentAuthor?.id === user?.id && (
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
                        commentId={comment?.id}
                        comment={comment}
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
                      <DeleteConfirmationModal
                        setShowDeleteModal={setShowDeleteModal}
                        showDeleteModal={showDeleteModal}
                        postId={postId}
                        commentId={comment?.id}
                        item="comment"
                        isPage="singlepost"
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
