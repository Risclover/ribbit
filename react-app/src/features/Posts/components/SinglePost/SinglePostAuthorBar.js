import React, { useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import moment from "moment";
import { Username } from "@/components";
import { CommunityImg } from "@/components/CommunityImg";
import { Tooltip } from "@/components/Tooltip/Tooltip";

export function SinglePostAuthorBar({ communityPage, post, isPage }) {
  const handleNavClick = (e) => {
    e.stopPropagation();
  };
  return (
    <div className="single-post-author-bar">
      {isPage !== "singlepage" && isPage !== "community" && (
        <div className="single-post-community-info">
          <div className="single-post-community-img">
            <CommunityImg
              imgSrc={
                post?.communitySettings?.[post?.communityId]?.communityIcon
              }
              imgAlt="Community"
              imgStyle={{
                backgroundColor: `${
                  post?.communitySettings?.[post?.communityId]?.baseColor
                }`,
              }}
            />
          </div>

          <NavLink
            onClick={handleNavClick}
            to={`/c/${post?.communityName}`}
            className="single-post-community-name"
          >
            c/{post?.communityName}
          </NavLink>

          <span className="single-post-dot-spacer">•</span>
        </div>
      )}

      <div className="single-post-author-info">
        Posted by
        <Username
          community={communityPage}
          username={post?.postAuthor?.username}
          user={post?.postAuthor}
          source="singlepost"
        />
        <span className="post-time">
          {moment(new Date(post?.createdAt)).locale("en-post").fromNow()}
          <span className="post-time-hover">
            <Tooltip direction="down" text={post?.createdAt} />
          </span>
        </span>
      </div>
    </div>
  );
}
