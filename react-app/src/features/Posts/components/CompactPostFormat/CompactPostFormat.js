import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useHistory } from "react-router-dom";
import { GoArrowUp, GoArrowDown } from "react-icons/go";
import { HiOutlineExternalLink } from "react-icons/hi";
import parse from "html-react-parser";
import moment from "moment";

import { Username } from "@/components";
import { sliceUrl } from "@/utils";
import "../SinglePost/SinglePost.css";
import "../ClassicPostFormat/ClassicPostFormat.css";
import "./CompactPostFormat.css";
import { usePostVote } from "../../hooks/usePostVote";
import { CompactPostMenu } from "./CompactPostMenu";
import { CompactPostTypeIcon } from "./CompactPostTypeIcon";
import { Tooltip } from "components/Tooltip/Tooltip";
import { UpvoteIcon } from "assets/icons/UpvoteIcon";
import { DownvoteIcon } from "assets/icons/DownvoteIcon";

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
                <UpvoteIcon />
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
                <DownvoteIcon />
              </button>
            </div>
          </div>
          <div className="compact-post-main">
            <div className="compact-post-left">
              <CompactPostTypeIcon
                post={post}
                setPostExpand={setPostExpand}
                postExpand={postExpand}
                rtrtw
              />
              <NavLink to={`/posts/${post.id}`}>
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
                    <span className="post-time">
                      {moment(post?.createdAt).fromNow()}
                      <span className="post-time-hover">
                        <Tooltip direction="down" text={post?.createdAt} />
                      </span>
                    </span>
                  </div>
                </div>
              </NavLink>
            </div>
            <div className="compact-post-btns">
              <Link to={`/posts/${post.id}/#all-comments`}>
                <button aria-label="Comments" className="compact-post-comments">
                  <i className="fa-regular fa-message"></i>
                  {commentNum}
                </button>
              </Link>
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
