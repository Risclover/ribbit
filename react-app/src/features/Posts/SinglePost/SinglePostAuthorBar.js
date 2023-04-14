import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import moment from "moment";
import { useDispatch } from "react-redux";
import { getCommunities } from "../../../store/communities";

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
        Posted by{" "}
        <NavLink to={`/users/${post.postAuthor.id}/profile`}>
          u/{post.postAuthor.username}
        </NavLink>{" "}
        {moment(new Date(post.createdAt)).fromNow()}
      </div>
    </div>
  );
}
