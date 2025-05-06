import { CompactPostTypeIcon, SinglePostKarmabar } from "@/features/Posts";
import { usePostVote } from "@/features/Posts/hooks/usePostVote";
import React, { useEffect, useRef, useState } from "react";
import { HiOutlineExternalLink } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import CompactPostMenu from "./CompactPostMenu";
import { Tooltip } from "@mui/material";
import { Username } from "@/components";
import parse from "html-react-parser";
import moment from "moment";
import { sliceUrl } from "@/utils";
import SinglePostAuthorBar from "./SinglePostAuthorBar";
import SinglePostVotingBtns from "./SinglePostVotingBtns";

export default function CompactPostFormat({ id, isPage, post }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const wrapperRef = useRef(null);

  const user = useSelector((state) => state.session.user);

  const community = useSelector(
    (state) => state.communities[post?.community.id]
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
    <div className="compact-post-format">
      <div
        className="compact-post-container"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            history.push(`/posts/${post.id}`);
          }
        }}
      >
        <div className="compact-post-principle">
          <div className="compact-post-karmabar">
            <SinglePostVotingBtns post={post} format="compact" />
          </div>
          <div className="compact-post-main">
            <div className="compact-post-left">
              <CompactPostTypeIcon
                post={post}
                setPostExpand={setPostExpand}
                postExpand={postExpand}
                rtrtw
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
                  {isPage !== "community" && (
                    <>{`c/${post?.community.name}`}</>
                  )}{" "}
                  Posted by{" "}
                  <Username
                    community={community}
                    username={post?.author?.username}
                    user={post?.author}
                    source="singlepost"
                  />
                </div>
                <div className="compact-post-author-bar">
                  <div className="compact-post-author-bar">
                    <SinglePostAuthorBar
                      communityPage={community}
                      isPage={isPage}
                      post={post}
                      format="Compact"
                    />
                  </div>
                </div>
              </div>
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
