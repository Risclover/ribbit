import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { GoArrowUp, GoArrowDown } from "react-icons/go";
import { HiOutlineExternalLink } from "react-icons/hi";
import parse from "html-react-parser";
import moment from "moment";

import { Username } from "@/components";
import { sliceUrl } from "@/utils";
import "../../SinglePost/SinglePost.css";
import "../ClassicPostFormat/ClassicPostFormat.css";
import "./CompactPostFormat.css";
import { usePostVote } from "../../hooks/usePostVote";
import { CompactPostMenu } from "./CompactPostMenu";
import { CompactPostTypeIcon } from "./CompactPostTypeIcon";

export function CompactPostFormat({ id, isPage, post }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const wrapperRef = useRef(null);

  const user = useSelector((state) => state.session.user);

  const community = useSelector(
    (state) => state.communities[post?.communityId]
  );

  const [showLinkCopied, setShowLinkCopied] = useState(false);
  const [postExpand, setPostExpand] = useState(false);
  const [commentNum, setCommentNum] = useState(post?.commentNum || 0);

  const { vote, handleVoteClick } = usePostVote(post);

  useEffect(() => {
    if (showLinkCopied) {
      setTimeout(() => {
        setShowLinkCopied(false);
      }, 3000);
    }
  }, [dispatch, id, showLinkCopied, commentNum, post?.commentNum]);

  return (
    <div className="post-compact-format">
      <div className="compact-post-container">
        <div className="compact-post-principle">
          <div className="compact-post-karmabar">
            <div className="compact-post-karmabar-btns">
              <button
                aria-label="Upvote"
                className={
                  vote === "upvote" ? "vote-btn-red" : "upvote-btn-grey"
                }
                onClick={(e) => handleVoteClick(e, "upvote")}
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 256 256"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M231.39,123.06A8,8,0,0,1,224,128H184v80a16,16,0,0,1-16,16H88a16,16,0,0,1-16-16V128H32a8,8,0,0,1-5.66-13.66l96-96a8,8,0,0,1,11.32,0l96,96A8,8,0,0,1,231.39,123.06Z"></path>
                </svg>
              </button>
              <span className="karmabar-votes">
                {post?.votes === 0 && vote !== null
                  ? 0
                  : post?.votes === 0 && vote === null
                  ? "Vote"
                  : post?.votes}
              </span>
              <button
                aria-label="Downvote"
                className={
                  vote === "downvote" ? "vote-btn-blue" : "downvote-btn-grey"
                }
                onClick={(e) => handleVoteClick(e, "downvote")}
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 256 256"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M229.66,141.66l-96,96a8,8,0,0,1-11.32,0l-96-96A8,8,0,0,1,32,128H72V48A16,16,0,0,1,88,32h80a16,16,0,0,1,16,16v80h40a8,8,0,0,1,5.66,13.66Z"></path>
                </svg>
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
            <div className="compact-post-btns">
              <button aria-label="Comments" className="compact-post-comments">
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
