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
  const community = useAppSelector(
    (state) => state.communities[post?.community?.id]
  );
  return (
    <div className="single-post-author-bar">
      {isPage !== "singlepage" && isPage !== "community" && (
        <div className="single-post-community-info">
          <div className="single-post-community-img">
            <CommunityImg
              imgSrc={community?.communitySettings?.communityIcon}
              imgAlt="Community"
              imgStyle={{
                backgroundColor: `${community?.communitySettings?.baseColor}`,
              }}
            />
          </div>

          <NavLink
            onClick={handleNavClick}
            to={`/c/${post?.community?.name}`}
            className="single-post-community-name"
          >
            c/{post?.community?.name}
          </NavLink>

          <span className="single-post-dot-spacer">•</span>
        </div>
      )}

      <div className="single-post-author-info">
        Posted by
        <Username
          community={communityPage}
          username={post?.author?.username}
          user={post?.author}
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
