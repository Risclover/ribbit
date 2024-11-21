import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { BsArrowsAngleExpand } from "react-icons/bs";
import parse from "html-react-parser";
import moment from "moment";
import { Modal } from "@/context";
import { EditComment } from "../..";
import { Username } from "@/components";
import { DeleteConfirmationModal, UsernamePopup } from "components";
import { convertTime } from "../utils/convertTime";
import { useCommentVote } from "../hooks/useCommentVote";
import { CommentKarmaBar } from "./CommentKarmaBar";
import { getComments, removeComment, getPosts } from "@/store";
import { useHistory } from "react-router-dom";
import { usePopup } from "context/Popup";
import "../styles/Comments.css";

import { CommentForm } from "./CommentForms/CommentForm";
import { PencilIcon } from "assets/icons/PencilIcon";
import { TrashIcon } from "assets/icons/TrashIcon";

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
            <a key={uuidv4()} href={word} rel="noreferrer" target="_blank">
              {word + " "}
            </a>
          ) : (
            word + " "
          );
        })}
      </p>
    );
  }
}

export function Comment({ commentId, comment, specificCommentActive }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { postId } = useParams();

  const wasEdited = comment?.createdAt !== comment?.updatedAt;

  const [showEditCommentModal, setShowEditCommentModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [commentContent, setCommentContent] = useState(comment?.content);
  const [showReplyForm, setShowReplyForm] = useState(false);

  const currentUser = useSelector((state) => state.session.user);
  const post = useSelector((state) => state.posts[postId]);
  const communities = useSelector((state) => state.communities);

  let editedTime = convertTime(comment, "edit");
  let commentTime = convertTime(comment);

  const users = useSelector((state) => Object.values(state.users));

  let foundUser = users.filter(
    (user) => user.username === comment.commentAuthor?.username
  );

  const [showPopup, setShowPopup] = useState(false);
  const [hideTimeout, setHideTimeout] = useState(null);

  const { isPopupOpen, setIsPopupOpen } = usePopup(); // Access the global popup state

  const handleMouseEnter = () => {
    if (foundUser[0]?.id === currentUser?.id) {
      return;
    }
    if (hideTimeout) {
      clearTimeout(hideTimeout);
    }
    if (!isPopupOpen) {
      // Check if another popup is open
      setShowPopup(true);
      setIsPopupOpen(true); // Set popup open state
    }
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setShowPopup(false);
      setIsPopupOpen(false); // Reset popup open state
    }, 200); // 1000ms = 1 second
    setHideTimeout(timeout);
  };

  const handleDeleteClick = async (e) => {
    e.preventDefault();
    setShowDeleteModal(false);
    dispatch(removeComment(commentId));
    dispatch(getPosts());
  };

  const handleUserImgClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    history.push(`/users/${comment?.commentAuthor?.id}/profile`);
  };

  const handleReplyClick = () => {
    setShowReplyForm(!showReplyForm);
  };

  return (
    <div className="comment-system" id={`comment-${comment?.id}`}>
      <div
        className={
          specificCommentActive
            ? "the-actual-comment active"
            : "the-actual-comment"
        }
        id={`commentnum-${comment?.id}`}
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
            <div
              className="comment-user-img-container"
              onClick={handleUserImgClick}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div
                className="comment-user-img"
                style={{
                  backgroundImage: `url(${comment?.commentAuthor?.profileImg})`,
                  backgroundRepeat: "no-repeat",
                }}
              >
                &nbsp;
              </div>
              {showPopup && (
                <UsernamePopup
                  community={communities[post.communityId]}
                  user={foundUser}
                />
              )}
            </div>
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
              username={comment?.commentAuthor?.username}
              user={comment?.commentAuthor}
            />
            {post.postAuthor?.username === comment?.commentAuthor?.username ? (
              <span className="op-sign">OP</span>
            ) : (
              ""
            )}
            <span className="single-post-topbar-dot"> · </span>
            <span className="comment-original-time">{commentTime}</span>{" "}
            {wasEdited && (
              <span className="comment-was-edited">
                {" "}
                <span className="single-post-topbar-dot"> · </span>
                edited {editedTime}
              </span>
            )}
          </div>

          {collapsed === false && (
            <div className="comment-right-content">
              {comment?.content && <Text content={commentContent} />}
            </div>
          )}
          {collapsed === false && (
            <div className="comment-btns">
              <CommentKarmaBar comment={comment} />
              <div className="comment-owner-btns">
                <button onClick={handleReplyClick}>Reply</button>

                {comment?.commentAuthor?.id === currentUser?.id && (
                  <>
                    <button
                      aria-label="Edit comment"
                      onClick={() => {
                        setShowEditCommentModal(true);
                      }}
                    >
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
              {/* Reply Form */}
              {showReplyForm && (
                <div className="reply-form-container">
                  <CommentForm
                    postId={postId}
                    parentId={comment.id}
                    onCancel={() => setShowReplyForm(false)}
                  />
                </div>
              )}

              {/* Render Nested Comments */}
              {comment.children && comment.children.length > 0 && (
                <div className="nested-comments">
                  {comment.children.map((childComment) => (
                    <Comment
                      key={childComment.id}
                      commentId={childComment.id}
                      comment={childComment}
                      specificCommentActive={specificCommentActive}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
