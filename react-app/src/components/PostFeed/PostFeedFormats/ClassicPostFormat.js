import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { HiOutlineExternalLink } from "react-icons/hi";
import { FiLink } from "react-icons/fi";
import { BsArrowsAngleExpand, BsArrowsAngleContract } from "react-icons/bs";
import { CgNotes } from "react-icons/cg";
import parse from "html-react-parser";
import moment from "moment";

import Bounce from "../../../assets/images/misc/curved-arrow.png";
import { DeleteConfirmationModal } from "../../../components";
import { Modal } from "../../../context";
import { SinglePostKarmabar } from "../../../features";
import { sliceUrl } from "../../../utils";
import "../../../features/Posts/SinglePost/SinglePost.css";
import "./ClassicPostFormat.css";
import { deletePost, getUsers, getViewedPosts } from "../../../store";

export function ClassicPostFormat({ isPage, id, post }) {
  const history = useHistory();
  const dispatch = useDispatch();

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
  const [voted, setVoted] = useState(
    post && Object.values(post?.postVoters)?.length > 0 ? true : false
  );

  useEffect(() => {
    if (showLinkCopied) {
      setTimeout(() => {
        setShowLinkCopied(false);
      }, 3000);
    }
    setCommentNum(post?.commentNum || 0);
  }, [dispatch, id, showLinkCopied, commentNum, post?.commentNum]);

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
  }, [upvote, downvote, voteTotal, post?.postVoters, user?.id, posts]);

  const handleDelete = (e) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(deletePost(post?.id));
    setShowDeleteModal(false);
    dispatch(getUsers());
    dispatch(getViewedPosts());
    if (isPage === "community") {
      history.push(`/c/${post?.communityName}`);
    } else {
      history.push("/c/all");
    }
  };

  return (
    <div className="post-classic-format">
      <div className="classic-post-container">
        <SinglePostKarmabar
          post={post}
          upvote={upvote}
          downvote={downvote}
          voted={voted}
          setUpvote={setUpvote}
          setDownvote={setDownvote}
        />
        <div className="classic-post-main">
          <div className="classic-post-content-box">
            <div className="classic-post-content-img">
              {post?.imgUrl !== null && <img src={post?.imgUrl} alt="Post" />}
              {!post?.imgUrl && !post?.linkUrl && (
                <div className="classic-post-img-placeholder">
                  <CgNotes />
                </div>
              )}
              {post?.linkUrl && (
                <div className="classic-post-img-placeholder">
                  <span
                    className={`placeholder-link ${
                      isPage === "community" && "community-post"
                    }`}
                  >
                    <FiLink />
                  </span>
                  <div
                    className={`placeholder-external ${
                      isPage === "community" && "community-post"
                    }`}
                  >
                    <HiOutlineExternalLink />
                  </div>
                </div>
              )}
            </div>
            <div className="classic-post-content-body">
              <div className="classic-post-content-body-top">
                <div className="classic-post-title">
                  {post?.title}
                  {post?.linkUrl && (
                    <div
                      className={`classic-post-link ${
                        isPage === "community" && "community-post"
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        window.open(post?.linkUrl);
                        if (e.target.classList.contains("community-post"))
                          e.target.classList.remove("community-post");
                      }}
                    >
                      {sliceUrl(post?.linkUrl)} <HiOutlineExternalLink />
                    </div>
                  )}
                </div>
              </div>
              <div className="classic-post-author-bar">
                <div
                  className="classic-post-community-info"
                  onClick={(e) => {
                    e.preventDefault();
                    history.push(`/c/${post?.communityName}`);
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
                <div className="post-btn-separator"></div>
                <div className="single-post-button">
                  <button
                    className="single-post-comments-btn"
                    onClick={() => history.push(`/posts/${post?.id}`)}
                  >
                    <i className="fa-regular fa-message"></i>{" "}
                    <span className="single-post-comments-num">
                      {commentNum}{" "}
                      {post && Object.values(post?.postComments).length === 1
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
                          open={() => setShowDeleteModal(true)}
                        >
                          <DeleteConfirmationModal
                            showDeleteModal={showDeleteModal}
                            setShowDeleteModal={setShowDeleteModal}
                            postId={post?.id}
                            communityId={community?.id}
                            item="post"
                            post={post}
                            isPage="singlepost"
                            handleDelete={handleDelete}
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
                <div className="classic-post-expanded-img">
                  <img src={post.imgUrl} alt="Post" />
                </div>
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
    </div>
  );
}
