import { CommunityImg, Username } from "components";
import { Tooltip } from "components/Tooltip/Tooltip";
import moment from "moment";
import React from "react";
import { NavLink, useHistory } from "react-router-dom";

export default function SinglePostAuthorBar({
  communityPage,
  post,
  isPage,
  format,
}) {
  const history = useHistory();
  const handleNavClick = (e) => {
    e.stopPropagation();
    history.push(`/c/${post?.communityName}`);
  };
  return (
    <div
      className={`single-post-author-bar ${
        format === "Card" ? "author-padding" : ""
      }`}
    >
      {isPage !== "singlepage" && isPage !== "community" && (
        <div className="single-post-community-info">
          <div className="single-post-community-img">
            {format === "Card" && (
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
            )}
          </div>

          {(format === "Card" || format === "Compact") && (
            <span
              onClick={handleNavClick}
              className="single-post-community-name"
            >
              c/{post?.communityName}
            </span>
          )}

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
