import React from "react";
import { NavLink } from "react-router-dom";
import moment from "moment";
import Username from "../../../components/Username/Username";

moment.updateLocale("en-post", {
  relativeTime: {
    future: (diff) => (diff === "just now" ? diff : `in ${diff}`),
    past: (diff) => (diff === "just now" ? diff : `${diff} ago`),
    s: "just now",
    ss: "just now",
    m: "1 minute",
    mm: "%d minutes",
    h: "1 hour",
    hh: "%d hours",
    d: "1 day",
    dd: "%d days",
    M: "1 month",
    MM: "%d months",
    y: "1 year",
    yy: "%d years",
  },
});

export default function SinglePostAuthorBar({ community, post, isPage }) {
  return (
    <div className="single-post-author-bar">
      {isPage !== "community" && (
        <div className="single-post-community-info">
          <div className="single-post-community-img">
            <img src={community?.communityImg} alt="Community" />
          </div>

          <div className="single-post-community-name">
            <NavLink to={`/c/${community?.id}`}>c/{community?.name}</NavLink>
          </div>

          <span className="single-post-dot-spacer">•</span>
        </div>
      )}

      <div className="single-post-author-info">
        Posted by
        <Username username={post.postAuthor.username} user={post.postAuthor} source="singlepost" />
        {moment(new Date(post.createdAt)).locale("en-post").fromNow()}
      </div>
    </div>
  );
}
