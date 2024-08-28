import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";

import { BsArrowsAngleExpand } from "react-icons/bs";
import parse from "html-react-parser";
import moment from "moment";
import { Modal } from "@/context";
import { EditComment } from "..";
import { Username } from "@/components";
import { DeleteConfirmationModal } from "components";
import { convertTime } from "./data/constants";
import { useCommentVote } from "./hooks/useCommentVote";
import { CommentKarmaBar } from "./CommentKarmaBar";
import { getComments, removeComment, getPosts } from "@/store";
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

export function Comment({ commentId, comment, specificCommentActive }) {
  const dispatch = useDispatch();
  const { postId } = useParams();

  const wasEdited = comment?.createdAt !== comment?.updatedAt;

  const [showEditCommentModal, setShowEditCommentModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [commentContent, setCommentContent] = useState(comment?.content);

  const user = useSelector((state) => state.session.user);
  const post = useSelector((state) => state.posts[postId]);

  let editedTime = convertTime(comment, "edit");
  let commentTime = convertTime(comment);

  console.log(post.postAuthor.username);
  console.log(comment.commentAuthor.username);

  useEffect(() => {
    dispatch(getComments(comment?.postId));
  }, []);

  const handleDeleteClick = async (e) => {
    e.preventDefault();
    setShowDeleteModal(false);
    dispatch(removeComment(commentId));
    dispatch(getPosts());
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
            <NavLink to={`/users/${comment?.commentAuthor?.id}/profile`}>
              <div
                className="comment-user-img"
                style={{
                  backgroundImage: `url(${comment?.commentAuthor?.profileImg})`,
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
              username={comment?.commentAuthor?.username}
              user={comment?.commentAuthor}
            />
            {post.postAuthor?.username === comment?.commentAuthor?.username ? (
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
              {comment?.content && <Text content={commentContent} />}
            </div>
          )}
          {collapsed === false && (
            <div className="comment-btns">
              <CommentKarmaBar comment={comment} />
              <div className="comment-owner-btns">
                {comment?.commentAuthor?.id === user?.id && (
                  <>
                    <button
                      onClick={() => {
                        setShowEditCommentModal(true);
                      }}
                    >
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
                    <button onClick={() => setShowDeleteModal(true)}>
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
