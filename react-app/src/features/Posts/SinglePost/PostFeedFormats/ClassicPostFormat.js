import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import moment from "moment";
import parse from "html-react-parser";
import cutLink from "../SliceUrl";
import { GoArrowUp, GoArrowDown } from "react-icons/go";
import { HiOutlineExternalLink } from "react-icons/hi";
import { FiLink } from "react-icons/fi";
import {
  BsArrowsAngleExpand,
  BsArrowsAngleContract,
  BsPencilFill,
} from "react-icons/bs";
import { addPostVote, removePostVote } from "../../../../store/posts";
import { Modal } from "../../../../context/Modal";
import DeleteConfirmation from "../../../../components/Modals/DeleteConfirmation";
import Bounce from "../../../../images/misc/curved-arrow.png";
import { CgNotes } from "react-icons/cg";
import "../SinglePost.css";
import { getUsers } from "../../../../store/users";
import { getSinglePost } from "../../../../store/one_post";
import "./ClassicPostFormat.css";

export default function ClassicPostFormat({ isPage, id, userId }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const post = useSelector((state) => state.posts[id]);
  const posts = useSelector((state) => state.posts);
  const cuser = useSelector((state) => state.session.user);
  const user = useSelector((state) => state.users[cuser?.id]);
  const community = useSelector(
    (state) => state.communities[post?.communityId]
  );

  const [showLinkCopied, setShowLinkCopied] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [upvote, setUpvote] = useState(false);
  const [downvote, setDownvote] = useState(false);
  const [voteTotal, setVoteTotal] = useState(post?.votes);
  const [postExpand, setPostExpand] = useState(false);
  const [commentNum, setCommentNum] = useState(0);

  useEffect(() => {
    if (showLinkCopied) {
      setTimeout(() => {
        setShowLinkCopied(false);
      }, 3000);
    }
    setCommentNum(post?.commentNum);
  }, [dispatch, id, showLinkCopied, commentNum, post?.commentNum]);

  const handleUpvoteClick = async (e) => {
    e.preventDefault();
    if (user?.id in post?.postVoters) {
      if (!post?.postVoters[user?.id].isUpvote) {
        await dispatch(removePostVote(post.id));
        await dispatch(addPostVote(post.id, "upvote"));
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

  const handleDownvoteClick = async (e) => {
    e.preventDefault();
    if (user?.id in post?.postVoters) {
      if (post?.postVoters[user?.id].isUpvote) {
        await dispatch(removePostVote(post.id));
        await dispatch(addPostVote(post.id, "downvote"));
        dispatch(getUsers());
      } else if (downvote) {
        handleRemoveVote();
      }
    } else {
      handleAddDownvote();
    }
  };

  const handleAddVote = async (e) => {
    await dispatch(addPostVote(post.id, "upvote"));
    setUpvote(true);
    dispatch(getUsers());
  };

  const handleAddDownvote = async () => {
    await dispatch(addPostVote(post.id, "downvote"));
    setDownvote(true);
    dispatch(getUsers());
  };

  const handleRemoveVote = async () => {
    await dispatch(removePostVote(post.id));
    if (upvote) {
      setUpvote(false);
    }
    if (downvote) {
      setDownvote(false);
    }
    dispatch(getUsers());
  };

  useEffect(() => {
    if (
      Object.values(posts) &&
      post?.postVoters &&
      post?.postVoters !== undefined &&
      post?.postVoters !== null
    ) {
      if (Object.values(posts)?.length > 0) {
        if (Object.values(post?.postVoters)?.length > 0) {
          for (let voter of Object.values(post?.postVoters)) {
            if (user?.id === voter?.userID) {
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
  }, [upvote, downvote, voteTotal, post?.postVoters, user?.id]);

  return (
    <div className="classic-post-container">
      <div className="classic-post-karmabar">
        <button
          className={upvote ? "vote-btn-red" : "upvote-btn-grey"}
          onClick={(e) => {
            e.preventDefault();
            handleUpvoteClick(e);
          }}
        >
          <GoArrowUp />
        </button>

        <span className="karmabar-votes">
          {post?.votes === 0 ? "Vote" : post?.votes}
        </span>
        <button
          className={downvote ? "vote-btn-blue" : "downvote-btn-grey"}
          onClick={(e) => {
            e.preventDefault();
            handleDownvoteClick(e);
          }}
        >
          <GoArrowDown />
        </button>
      </div>
      <div className="classic-post-main">
        <div className="classic-post-content-box">
          <div className="classic-post-content-img">
            {post?.imgUrl !== null && <img src={post?.imgUrl} alt="Post" />}
            {!post?.imgUrl && (
              <div className="classic-post-img-placeholder">
                <CgNotes />
              </div>
            )}
          </div>
          <div className="classic-post-content-body">
            <div className="classic-post-content-body-top">
              <div className="classic-post-title">
                {post?.title}
                {post?.linkUrl && (
                  <div
                    className="classic-post-link"
                    onClick={(e) => {
                      e.preventDefault();
                      window.open(post?.linkUrl);
                    }}
                  >
                    {cutLink(post?.linkUrl)} <HiOutlineExternalLink />
                  </div>
                )}
              </div>
            </div>
            <div className="classic-post-author-bar">
              <div
                className="classic-post-community-info"
                onClick={(e) => {
                  e.preventDefault();
                  history.push(`/c/${post?.communityId}`);
                }}
              >
                {isPage !== "community" && (
                  <>
                    c/{post?.communityName}{" "}
                    <span className="single-post-dot-spacer">•</span>
                  </>
                )}
              </div>
              <div className="classic-post-author-info">
                Posted by{" "}
                <span
                  className="classic-post-author"
                  onClick={(e) => {
                    e.preventDefault();
                    history.push(`/users/${post?.postAuthor.id}/profile`);
                  }}
                >
                  u/{post?.postAuthor.username}
                </span>
                {moment(post?.createdAt).fromNow()}
              </div>
            </div>
            <div
              className="classic-post-buttons"
              onClick={(e) => e.preventDefault()}
            >
              {post?.linkUrl === null &&
                post?.content !== "" &&
                !postExpand && (
                  <button
                    className="classic-post-button btn-expand"
                    onClick={(e) => setPostExpand(true)}
                  >
                    <BsArrowsAngleExpand />
                  </button>
                )}
              {post?.linkUrl === null && postExpand && (
                <button
                  className="classic-post-button btn-expand"
                  onClick={(e) => setPostExpand(false)}
                >
                  <BsArrowsAngleContract />
                </button>
              )}
              {post?.linkUrl !== null && (
                <button
                  className="classic-post-button"
                  onClick={(e) => window.open(post?.linkUrl)}
                >
                  <HiOutlineExternalLink />
                </button>
              )}
              {post?.linkUrl === null &&
                post?.content === "" &&
                post?.imgUrl === null && (
                  <button
                    className="classic-post-button"
                    onClick={(e) => window.open(post?.linkUrl)}
                  >
                    <CgNotes />
                  </button>
                )}
              <div className="single-post-button">
                <button
                  className="single-post-comments-btn"
                  onClick={() => history.push(`/posts/${post.id}`)}
                >
                  <i className="fa-regular fa-message"></i>{" "}
                  <span className="single-post-comments-num">
                    {commentNum}{" "}
                    {Object.values(post?.postComments).length === 1
                      ? "Comment"
                      : "Comments"}
                  </span>
                </button>
              </div>
              <div className="share-btn-stuff">
                <div className="single-post-button">
                  <button
                    className="single-post-share-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowLinkCopied(true);
                      navigator.clipboard.writeText(
                        `https://ribbit-app.herokuapp.com/posts/${post?.id}`
                      );
                    }}
                  >
                    <img
                      src={Bounce}
                      alt="Share"
                      className="single-post-share-icon"
                    />
                    Share
                  </button>
                </div>

                {showLinkCopied && (
                  <div
                    className={
                      showLinkCopied
                        ? "animate-mount tooltiptext"
                        : "animate-unmount tooltiptext"
                    }
                  >
                    Link Copied to Clipboard
                  </div>
                )}
              </div>
              {user && user.id === post?.postAuthor.id ? (
                <div className="logged-in-btns">
                  <div className="single-post-button">
                    {post?.imgUrl === null && post?.linkUrl === null && (
                      <button
                        className="single-post-edit-btn"
                        onClick={(e) => {
                          e.preventDefault();
                          history.push(`/posts/${post?.id}/edit`);
                        }}
                      >
                        <i className="fa-solid fa-pencil"></i>
                        Edit
                      </button>
                    )}
                    {/* {showEditModal && (
                      <Modal
                        onClose={() => setShowEditModal(false)}
                        title="Edit post"
                      >
                        <UpdatePost
                          setShowEditModal={setShowEditModal}
                          showEditModal={showEditModal}
                        />
                      </Modal>
                    )} */}
                  </div>
                  <div className="single-post-button">
                    <button
                      className="single-post-delete-btn"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowDeleteModal(true);
                      }}
                    >
                      <i className="fa-regular fa-trash-can"></i>
                      Delete
                    </button>
                    {showDeleteModal && (
                      <Modal
                        onClose={() => setShowDeleteModal(false)}
                        title="Delete post?"
                      >
                        <DeleteConfirmation
                          showDeleteModal={showDeleteModal}
                          setShowDeleteModal={setShowDeleteModal}
                          postId={post?.id}
                          communityId={community?.id}
                          item="post"
                          post={post}
                          isPage={isPage}
                        />
                      </Modal>
                    )}
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        {postExpand && (
          <div className="classic-post-expanded">
            {post.imgUrl ? (
              <img src={post.imgUrl} />
            ) : (
              <div
                className="classic-post-expanded-text"
                style={{ whiteSpace: "pre-line" }}
              >
                {parse(post.content)}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
