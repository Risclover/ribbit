import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import moment from "moment";
import parse from "html-react-parser";
import cutLink from "./SliceUrl";
import { GoArrowUp, GoArrowDown } from "react-icons/go";
import { HiOutlineExternalLink } from "react-icons/hi";
import { FiLink } from "react-icons/fi";

import { addPostVote, getPosts, removePostVote } from "../../../store/posts";
import { Modal } from "../../../context/Modal";
import DeleteConfirmation from "../../../components/Modals/DeleteConfirmation";
import Bounce from "../../../images/misc/curved-arrow.png";

import "./SinglePost.css";
import { getUsers } from "../../../store/users";
import { getSinglePost } from "../../../store/one_post";
import ClassicPostFormat from "../PostFeedFormats/ClassicPostFormat";
import CompactPostFormat from "../PostFeedFormats/CompactPostFormat";
import LoginForm from "../../auth/AuthModal/LoginForm";
import SignUpForm from "../../auth/AuthModal/SignUpForm";

export default function SinglePost({ id, isPage, userId, format, postList }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.session.user);
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
  const [commentNum, setCommentNum] = useState(0);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [voted, setVoted] = useState();

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
    if (!currentUser) {
      setShowLoginForm(true);
    } else {
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
    }
  };

  useEffect(() => {
    if (post?.postVoters[currentUser?.id]) {
      setVoted(true);
    } else {
      setVoted(false);
    }
  });

  const handleDownvoteClick = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      setShowLoginForm(true);
    } else {
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
    <>
      {format === "Card" && (
        <div className="post-card-format">
          {post && (
            <div className="single-post-container">
              <div className="single-post-karmabar">
                {currentUser && (
                  <button
                    className={upvote ? "vote-btn-red" : "upvote-btn-grey"}
                    onClick={handleUpvoteClick}
                  >
                    <GoArrowUp />
                  </button>
                )}
                {!currentUser && (
                  <button
                    className={upvote ? "vote-btn-red" : "upvote-btn-grey"}
                    onClick={(e) => {
                      e.preventDefault();
                      history.push("/login");
                    }}
                  >
                    <GoArrowUp />
                  </button>
                )}
                <span className="karmabar-votes">
                  {post?.votes === 0 && voted
                    ? 0
                    : post?.votes === 0 && !voted
                    ? "Vote"
                    : post?.votes}
                </span>

                {currentUser && (
                  <button
                    className={downvote ? "vote-btn-blue" : "downvote-btn-grey"}
                    onClick={handleDownvoteClick}
                  >
                    <GoArrowDown />
                  </button>
                )}
                {!currentUser && (
                  <button
                    className={downvote ? "vote-btn-blue" : "downvote-btn-grey"}
                    onClick={(e) => {
                      e.preventDefault();
                      history.push("/login");
                    }}
                  >
                    <GoArrowDown />
                  </button>
                )}
              </div>
              <div className="single-post-main">
                <div className="single-post-author-bar">
                  {isPage !== "community" && (
                    <div className="single-post-community-info">
                      <div className="single-post-community-img">
                        <img src={community?.communityImg} alt="Community" />
                      </div>
                      <div className="single-post-community-name">
                        <NavLink to={`/c/${community?.id}`}>
                          c/{community?.name}
                        </NavLink>
                      </div>
                      <span className="single-post-dot-spacer">•</span>
                    </div>
                  )}

                  <div className="single-post-author-info">
                    Posted by{" "}
                    <NavLink to={`/users/${post.postAuthor.id}/profile`}>
                      u/{post.postAuthor.username}
                    </NavLink>{" "}
                    {moment(new Date(post.createdAt)).fromNow()}
                  </div>
                </div>
                <div className="single-post-content-box">
                  <div className="single-post-content-box-left">
                    <div className="single-post-title-bar">{post.title}</div>
                    {post.imgUrl !== null ? (
                      <div className="single-post-content-image">
                        <img
                          className="image-post-img"
                          src={post.imgUrl}
                          alt="Post"
                        />
                      </div>
                    ) : post.linkUrl !== null ? (
                      <div
                        className="single-page-content-link"
                        onClick={(e) => {
                          e.preventDefault();
                          window.open(post.linkUrl);
                        }}
                      >
                        {cutLink(post.linkUrl)}
                        <HiOutlineExternalLink />
                      </div>
                    ) : (
                      <>
                        {isPage === "singlepage" ? (
                          <div
                            className="single-page-content"
                            style={{ whiteSpace: "pre-line" }}
                          >
                            {parse(post.content)}
                          </div>
                        ) : (
                          <div
                            className="single-post-content"
                            style={{ whiteSpace: "pre-line" }}
                          >
                            {parse(post.content)}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                  {post.linkUrl && (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        window.open(post.linkUrl);
                      }}
                      className="single-post-content-box-right"
                    >
                      <FiLink />
                      <div className="single-post-external-link-box">
                        <HiOutlineExternalLink />
                      </div>
                    </button>
                  )}
                </div>
                <div className="single-post-button-bar">
                  <div className="single-post-button">
                    <button className="single-post-comments-btn">
                      <i className="fa-regular fa-message"></i>{" "}
                      <span className="single-post-comments-num">
                        {commentNum}{" "}
                        {Object.values(post.postComments).length === 1
                          ? "Comment"
                          : "Comments"}
                      </span>
                    </button>
                  </div>
                  <div className="share-btn-stuff">
                    <div
                      className="single-post-button"
                      onClick={(e) => e.preventDefault()}
                    >
                      <button
                        className="single-post-share-btn"
                        onClick={(e) => {
                          e.preventDefault();
                          setShowLinkCopied(true);
                          navigator.clipboard.writeText(
                            `https://ribbit-app.herokuapp.com/posts/${post.id}`
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
                  {user && user.id === post.postAuthor.id ? (
                    <div className="logged-in-btns">
                      <div
                        className="single-post-button"
                        onClick={(e) => e.preventDefault()}
                      >
                        {post?.imgUrl === null && post?.linkUrl === null && (
                          <button
                            className="single-post-edit-btn"
                            onClick={(e) => {
                              e.preventDefault();
                              history.push(`/posts/${post.id}/edit`);
                            }}
                          >
                            <i className="fa-solid fa-pencil"></i>
                            Edit
                          </button>
                        )}
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
                              postId={post.id}
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
          )}
        </div>
      )}
      {format === "Classic" && (
        <div className="post-classic-format">
          <ClassicPostFormat
            id={id}
            isPage={isPage}
            userId={userId}
            post={post}
          />
        </div>
      )}
      {format === "Compact" && (
        <div className="post-compact-format">
          <CompactPostFormat
            id={id}
            isPage={isPage}
            userId={userId}
            post={post}
          />
        </div>
      )}
      {showLoginForm && (
        <Modal title="Log In" onClose={() => setShowLoginForm(false)}>
          <LoginForm
            setShowLoginForm={setShowLoginForm}
            showLoginForm={showLoginForm}
            showSignupForm={showSignupForm}
            setShowSignupForm={setShowSignupForm}
          />
        </Modal>
      )}
      {showSignupForm && (
        <Modal title="Sign Up" onClose={() => setShowSignupForm(false)}>
          <SignUpForm
            setShowLoginForm={setShowLoginForm}
            showLoginForm={showLoginForm}
            showSignupForm={showSignupForm}
            setShowSignupForm={setShowSignupForm}
          />
        </Modal>
      )}
    </>
  );
}
