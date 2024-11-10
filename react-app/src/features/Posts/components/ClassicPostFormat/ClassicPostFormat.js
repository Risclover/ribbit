import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { HiOutlineExternalLink } from "react-icons/hi";
import { FiLink } from "react-icons/fi";
import { BsArrowsAngleExpand, BsArrowsAngleContract } from "react-icons/bs";
import { CgNotes } from "react-icons/cg";
import parse from "html-react-parser";
import moment from "moment";

import Bounce from "@/assets/images/misc/curved-arrow.png";
import { DeleteConfirmationModal, Username } from "@/components";
import { Modal, useMetadata } from "@/context";
import { SinglePostKarmabar } from "../../SinglePost";
import { sliceUrl } from "@/utils";
import "../../SinglePost/SinglePost.css";
import "./ClassicPostFormat.css";
import { deletePost, getUsers } from "@/store";

export function ClassicPostFormat({ isPage, id, post }) {
  const { metadata, fetchMetadata } = useMetadata();
  const history = useHistory();
  const dispatch = useDispatch();

  const cuser = useSelector((state) => state.session.user);
  const user = useSelector((state) => state.users[cuser?.id]);
  const community = useSelector(
    (state) => state.communities[post?.communityId]
  );

  const [showLinkCopied, setShowLinkCopied] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postExpand, setPostExpand] = useState(false);
  const [commentNum, setCommentNum] = useState(post?.commentNum || 0);

  useEffect(() => {
    if (post.linkUrl && !metadata[post.linkUrl]) {
      fetchMetadata(post.linkUrl);
    }
  }, [post]);

  const metadataResult = metadata[post.linkUrl];

  useEffect(() => {
    if (showLinkCopied) {
      setTimeout(() => {
        setShowLinkCopied(false);
      }, 3000);
    }
  }, [dispatch, id, showLinkCopied, commentNum, post?.commentNum]);

  const handleDelete = (e) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(deletePost(post?.id));
    setShowDeleteModal(false);
    dispatch(getUsers());
    if (isPage === "community") {
      history.push(`/c/${post?.communityName}`);
    } else {
      history.push("/c/all");
    }
  };

  return (
    <div className="post-classic-format">
      <div className="classic-post-container">
        <SinglePostKarmabar post={post} />
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
                  {metadataResult && (
                    <img
                      className="link-url-img"
                      src={metadataResult}
                      alt="Link preview"
                    />
                  )}
                  {!metadataResult && (
                    <span
                      className={`placeholder-link ${
                        isPage === "community" && "community-post"
                      }`}
                    >
                      <FiLink />
                    </span>
                  )}
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
                  <h3>{post?.title}</h3>
                  {post?.linkUrl && (
                    <div
                      className={`classic-post-link ${
                        isPage === "community" && "community-post"
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
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
                {isPage !== "community" && (
                  <div className="classic-post-community-info">
                    <span
                      className="classic-post-community"
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        history.push(`/c/${post?.communityName}`);
                      }}
                    >
                      c/{post?.communityName}{" "}
                    </span>
                    <span className="single-post-dot-spacer">•</span>
                  </div>
                )}
                <div className="classic-post-author-info">
                  Posted by{" "}
                  <Username
                    community={community}
                    username={post?.postAuthor?.username}
                    user={post?.postAuthor}
                    source="singlepost"
                  />
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
                      aria-label="Expand post"
                      className="classic-post-button btn-expand"
                      onClick={(e) => {
                        e.stopPropagation();
                        setPostExpand(true);
                      }}
                    >
                      <BsArrowsAngleExpand />
                    </button>
                  )}
                {post?.linkUrl === null && postExpand && (
                  <button
                    aria-label="Close expanded post"
                    className="classic-post-button btn-expand"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPostExpand(false);
                    }}
                  >
                    <BsArrowsAngleContract />
                  </button>
                )}
                {post?.linkUrl !== null && (
                  <button
                    aria-label="Open external link"
                    className="classic-post-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(post?.linkUrl);
                    }}
                  >
                    <HiOutlineExternalLink />
                  </button>
                )}
                {post?.linkUrl === null &&
                  post?.content === "" &&
                  post?.imgUrl === null && (
                    <button
                      aria-label="Open text post"
                      className="classic-post-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(post?.linkUrl);
                      }}
                    >
                      <CgNotes />
                    </button>
                  )}
                <div className="post-btn-separator"></div>
                <div className="single-post-button">
                  <button
                    aria-label="Comments"
                    className="single-post-comments-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      history.push(`/posts/${post?.id}`);
                    }}
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
                        e.stopPropagation();
                        e.preventDefault();
                        setShowLinkCopied(true);
                        navigator.clipboard.writeText(
                          `https://ribbit-app.herokuapp.com/posts/${post?.id}`
                        );
                      }}
                    >
                      <svg
                        fill="currentColor"
                        width="20px"
                        height="20px"
                        viewBox="0 0 1920.00 1920.00"
                        xmlns="http://www.w3.org/2000/svg"
                        stroke="currentColor"
                        stroke-width="0.019200000000000002"
                      >
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke="#CCCCCC"
                          stroke-width="7.68"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          {" "}
                          <path
                            d="m1246.246 64-90.496 90.496 477.952 477.952h-590.848C467.878 632.448.038 1100.416.038 1675.392v109.056h128v-109.056c0-504.576 410.368-914.944 914.816-914.944h590.848l-477.952 478.08 90.496 90.496 632.448-632.576L1246.246 64Z"
                            fill-rule="evenodd"
                          ></path>{" "}
                        </g>
                      </svg>
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
                            e.stopPropagation();
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
                          e.stopPropagation();
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
