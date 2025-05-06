import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { HiOutlineExternalLink } from "react-icons/hi";
import { FiLink } from "react-icons/fi";
import { BsArrowsAngleExpand, BsArrowsAngleContract } from "react-icons/bs";
import { CgNotes } from "react-icons/cg";
import parse from "html-react-parser";
import moment from "moment";

import { DeleteConfirmationModal, Username } from "@/components";
import { Modal, useMetadata, ScrollContext } from "@/context";
import { SinglePostKarmabar } from "../SinglePost";
import { sliceUrl } from "@/utils";
import { usePostButtonHandlers } from "@/features/Posts/hooks/usePostButtonHandlers";
import { Tooltip } from "@/components/Tooltip/Tooltip";
import { ShareIcon } from "@/assets/icons/ShareIcon";
import "../SinglePost/SinglePost.css";
import "./ClassicPostFormat.css";

export function ClassicPostFormat({ isPage, id, post }) {
  const { scrollToTarget } = useContext(ScrollContext);
  const { metadata, fetchMetadata } = useMetadata();
  const history = useHistory();
  const dispatch = useDispatch();

  const cuser = useSelector((state) => state.session.user);
  const user = useSelector((state) => state.users[cuser?.id]);
  const community = useSelector(
    (state) => state.communities[post?.community.id]
  );

  const [showLinkCopied, setShowLinkCopied] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postExpand, setPostExpand] = useState(false);
  const [commentNum, setCommentNum] = useState(post?.commentNum || 0);

  const { copyLink, editPost, handleDelete, isCommunityOwner } =
    usePostButtonHandlers({
      history,
      dispatch,
      post,
      setShowLinkCopied,
      isPage,
      setShowDeleteModal,
    });

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

  return (
    <div className="post-classic-format">
      <NavLink to={`/posts/${post?.id}`}>
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
                          history.push(`/c/${post?.community.name}`);
                        }}
                      >
                        c/{post?.community.name}{" "}
                      </span>
                      <span className="single-post-dot-spacer">•</span>
                    </div>
                  )}
                  <div className="classic-post-author-info">
                    Posted by{" "}
                    <Username
                      community={community}
                      username={post?.author?.username}
                      user={post?.author}
                      source="singlepost"
                    />
                    <span className="post-time">
                      {moment(post?.createdAt).fromNow()}
                      <span className="post-time-hover">
                        <Tooltip direction="down" text={post?.createdAt} />
                      </span>
                    </span>
                  </div>
                </div>
                <div className="classic-post-buttons">
                  {post?.linkUrl === null &&
                    post?.content !== "" &&
                    !postExpand && (
                      <button
                        aria-label="Expand post"
                        className="classic-post-button btn-expand"
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
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
                        e.preventDefault();
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
                      onClick={scrollToTarget}
                    >
                      <i className="fa-regular fa-message"></i>{" "}
                      <span className="single-post-comments-num">
                        {commentNum}{" "}
                        {post && Object.values(post?.commentNum) === 1
                          ? "Comment"
                          : "Comments"}
                      </span>
                    </button>
                  </div>
                  <div className="share-btn-stuff">
                    <div className="single-post-button">
                      <button
                        className="single-post-share-btn"
                        onClick={copyLink}
                      >
                        <ShareIcon />
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
                  {user && (user.id === post?.author.id || isCommunityOwner) ? (
                    <div className="logged-in-btns">
                      <div className="single-post-button">
                        {post?.imgUrl === null && post?.linkUrl === null && (
                          <button
                            className="single-post-edit-btn"
                            onClick={editPost}
                          >
                            <i className="fa-solid fa-pencil"></i>
                            Edit
                          </button>
                        )}
                      </div>
                      <div className="single-post-button">
                        <button
                          className="single-post-delete-btn"
                          onClick={handleDelete}
                        >
                          <i className="fa-regular fa-trash-can"></i>
                          Delete
                        </button>
                        {showDeleteModal && (
                          <Modal
                            close={showDeleteModal}
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
      </NavLink>
    </div>
  );
}
