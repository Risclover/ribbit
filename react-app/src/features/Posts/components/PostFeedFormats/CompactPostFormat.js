import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { GoArrowUp, GoArrowDown } from "react-icons/go";
import { HiOutlineExternalLink } from "react-icons/hi";
import {
  BsArrowsAngleExpand,
  BsArrowsAngleContract,
  BsThreeDots,
} from "react-icons/bs";
import { CgNotes } from "react-icons/cg";
import { RxImage } from "react-icons/rx";
import parse from "html-react-parser";
import moment from "moment";

import {
  addPostVote,
  removePostVote,
  getUsers,
  deletePost,
  getViewedPosts,
  getPosts,
} from "../../../../store";

import { DeleteConfirmationModal, Username } from "../../../../components";
import { Modal } from "../../../../context";
import { sliceUrl } from "../../../../utils";
import "../../SinglePost/SinglePost.css";
import "./ClassicPostFormat.css";
import "./CompactPostFormat.css";
import { usePostVote } from "../../hooks/usePostVote";
import { DeletePostModal } from "../../DeletePost";
import { useOutsideClick } from "../../../../hooks";
import { CompactPostMenu } from "./CompactPostMenu";
import { CompactPostTypeIcon } from "./CompactPostTypeIcon";

export function CompactPostFormat({ id, isPage, post }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const wrapperRef = useRef(null);

  const posts = useSelector((state) => state.posts);
  const user = useSelector((state) => state.session.user);

  const community = useSelector(
    (state) => state.communities[post?.communityId]
  );

  const [showLinkCopied, setShowLinkCopied] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postExpand, setPostExpand] = useState(false);
  const [commentNum, setCommentNum] = useState(0);

  const { vote, handleVoteClick } = usePostVote(post);

  useEffect(() => {
    if (showLinkCopied) {
      setTimeout(() => {
        setShowLinkCopied(false);
      }, 3000);
    }
    setCommentNum(post?.commentNum);
  }, [dispatch, id, showLinkCopied, commentNum, post?.commentNum]);

  const handleDelete = (e) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(deletePost(post?.id));
    setShowDeleteModal(false);
    dispatch(getUsers());
    dispatch(getViewedPosts());
    dispatch(getPosts());

    if (isPage === "community") {
      history.push(`/c/${post?.communityName}`);
    } else {
      history.push("/c/all");
    }
  };

  useOutsideClick(wrapperRef, () => setShowDeleteModal(false));

  return (
    <div className="post-compact-format">
      <div className="compact-post-container">
        <div className="compact-post-principle">
          <div className="compact-post-karmabar">
            <div className="compact-post-karmabar-btns">
              <button
                className={
                  vote === "upvote" ? "vote-btn-red" : "upvote-btn-grey"
                }
                onClick={(e) => handleVoteClick(e, "upvote")}
              >
                <GoArrowUp />
              </button>
              <span className="karmabar-votes">
                {post?.votes === 0 && vote !== null
                  ? 0
                  : post?.votes === 0 && vote === null
                  ? "Vote"
                  : post?.votes}
              </span>
              <button
                className={
                  vote === "downvote" ? "vote-btn-blue" : "downvote-btn-grey"
                }
                onClick={(e) => handleVoteClick(e, "downvote")}
              >
                <GoArrowDown />
              </button>
            </div>
          </div>
          <div className="compact-post-main">
            <div className="compact-post-left">
              <CompactPostTypeIcon
                post={post}
                setPostExpand={setPostExpand}
                postExpand={postExpand}
              />
              <div className="compact-post-details">
                <div className="compact-post-title">
                  {post?.title}{" "}
                  {post?.linkUrl && (
                    <div
                      className="classic-post-link"
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        window.open(post?.linkUrl);
                      }}
                    >
                      {sliceUrl(post?.linkUrl)} <HiOutlineExternalLink />
                    </div>
                  )}
                </div>
                <div className="compact-post-author-bar-alt">
                  {post?.votes === 1
                    ? post?.votes + " point"
                    : post?.votes + " points"}
                  <span className="single-post-dot-spacer">•</span>
                  {commentNum === 1
                    ? commentNum + " comment"
                    : commentNum + " comments"}
                  <span className="single-post-dot-spacer">•</span>
                  c/{post?.communityName} Posted by{" "}
                  <Username
                    community={community}
                    username={post?.postAuthor?.username}
                    user={post?.postAuthor}
                    source="singlepost"
                  />
                </div>
                <div className="compact-post-author-bar">
                  {isPage !== "community" && (
                    <>
                      <span
                        className="compact-post-community"
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          history.push(`/c/${post?.communityName}`);
                        }}
                      >
                        c/{post?.communityName}{" "}
                      </span>
                      <span className="single-post-dot-spacer">•</span>
                    </>
                  )}
                  Posted by
                  <Username
                    community={community}
                    username={post?.postAuthor?.username}
                    user={post?.postAuthor}
                    source="singlepost"
                  />
                  {moment(post?.createdAt).fromNow()}
                </div>
              </div>
            </div>
            {/* <div className="compact-post-btns-alt">
              <div className="compact-post-menu-wrapper">
                <button
                  className="compact-post-menu-face"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    setShowSubmenu(!showSubmenu);
                  }}
                >
                  <BsThreeDots />
                </button>
                <CompactPostMenu
                  user={user}
                  post={post}
                  isPage={isPage}
                  community={community}
                  setShowLinkCopied={setShowLinkCopied}
                  showLinkCopied={showLinkCopied}
                />
              </div>
              <CompactPostTypeIcon
                post={post}
                setPostExpand={setPostExpand}
                postExpand={postExpand}
              />
            </div> */}
            <div className="compact-post-btns">
              <button className="compact-post-comments">
                <i className="fa-regular fa-message"></i>
                {commentNum}
              </button>
              <CompactPostMenu
                post={post}
                community={community}
                isPage={isPage}
                user={user}
              />
            </div>
          </div>
        </div>
        {postExpand && (
          <div className="compact-post-expanded">
            {post?.imgUrl && <img src={post?.imgUrl} alt="Post" />}
            {post?.content && (
              <div
                className="compact-post-expanded-text"
                style={{ whiteSpace: "pre-line" }}
              >
                {parse(post?.content)}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
