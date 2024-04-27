import React from "react";
import { NavLink } from "react-router-dom";
import moment from "moment";

export const PostResult = ({ post }) => {
  return (
    <NavLink to={`/posts/${post?.id}`}>
      <div className="search-results-post">
        <div className="search-results-post-topbar">
          <img
            style={{
              backgroundColor: `${
                post?.communitySettings[post?.communityId]?.baseColor
              }`,
            }}
            src={post?.communitySettings[post?.communityId]?.communityIcon}
            alt="Community"
          />
          <NavLink
            className="results-post-community"
            to={`/c/${post?.communityName}`}
          >
            c/{post?.communityName}
          </NavLink>{" "}
          <span className="topbar-dot">•</span>{" "}
          <span className="results-topbar-info">
            Posted by{" "}
            <NavLink to={`/users/${post?.postAuthor.id}/profile`}>
              <span className="results-post-author">
                u/{post?.postAuthor.username}
              </span>
            </NavLink>{" "}
            {moment(new Date(post?.createdAt)).fromNow()}
          </span>
        </div>
        <div className="search-results-post-content">
          <h3 className="search-results-post-title">{post?.title}</h3>
          {post?.imgUrl !== null && (
            <img
              className="search-results-post-img"
              src={post?.imgUrl}
              alt="Post"
            />
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
    </NavLink>
  );
};
