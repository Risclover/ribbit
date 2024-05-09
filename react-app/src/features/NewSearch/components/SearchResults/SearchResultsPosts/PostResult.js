import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import moment from "moment";
import { sliceUrl } from "@/utils";
import { Link } from "react-router-dom";
import { FiLink } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import { Username } from "@/components";
import { useMetadata } from "@/context/Metadata";

export const PostResult = ({ post }) => {
  const history = useHistory();

  const { metadata, fetchMetadata } = useMetadata();

  useEffect(() => {
    if (post.linkUrl && !metadata[post.linkUrl]) {
      fetchMetadata(post.linkUrl);
    }
  }, [post]);

  const metadataResult = metadata[post.linkUrl];

  const handlePostClick = (e) => {
    e.preventDefault();
    history.push(`/posts/${post?.id}`);
  };

  const handleCommunityClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    history.push(`/c/${post?.communityName}`);
  };

  return (
    <div onClick={handlePostClick} className="search-results-post">
      <div className="search-results-post-topbar">
        <img
          className="search-results-post-topbar-img"
          style={{
            backgroundColor: `${
              post?.communitySettings[post?.communityId]?.baseColor
            }`,
          }}
          src={post?.communitySettings[post?.communityId]?.communityIcon}
          alt="Community"
          onClick={handleCommunityClick}
        />
        <div className="results-post-community" onClick={handleCommunityClick}>
          c/{post?.communityName}
        </div>{" "}
        <span className="topbar-dot">•</span>{" "}
        <span className="results-topbar-info">
          Posted by{" "}
          <Username
            username={post?.postAuthor.username}
            user={post.postAuthor}
            community={post.communityId}
            source="singlepost"
          />
          {/* <NavLink to={`/users/${post?.postAuthor.id}/profile`}>
            <span className="results-post-author">
              u/{post?.postAuthor.username}
            </span>
          </NavLink>{" "} */}
          {moment(new Date(post?.createdAt)).fromNow()}
        </span>
      </div>
      <div className="search-results-post-content">
        <div>
          <h3 className="search-results-post-title">{post?.title}</h3>
          <a
            href={post?.linkUrl}
            target="_blank"
            className="search-results-post-link"
          >
            {post?.linkUrl && sliceUrl(post?.linkUrl)}
          </a>
        </div>
        {post?.imgUrl !== null && (
          <img
            className="search-results-post-img"
            src={post?.imgUrl}
            alt={post?.title}
          />
        )}
        {post?.linkUrl !== null && metadataResult && (
          <div className="search-results-post-link-img">
            <img src={metadataResult} alt={post?.title} />

            <div class="type-link-icon">
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                aria-hidden="true"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                ></path>
              </svg>
            </div>
          </div>
        )}
      </div>
      <div className="search-results-post-stats">
        <span className="search-results-post-stat">
          {post?.votes} {post?.votes === 1 ? "upvote" : "upvotes"}
        </span>
        <span className="search-results-post-stat">
          {Object.values(post?.postComments).length}{" "}
          {Object.values(post?.postComments).length === 1
            ? "comment"
            : "comments"}
        </span>
      </div>
    </div>
  );
};
