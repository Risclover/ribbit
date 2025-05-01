import { CommunityImg, Username } from "@/components";
import { Tooltip } from "@/components/Tooltip/Tooltip";
import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";

export default function SinglePostAuthorBar({
  communityPage,
  post,
  isPage,
  format,
}) {
  const history = useHistory();
  const community = useSelector(
    (state) => state.communities[post?.community?.id]
  );

  console.log("COMMUNITY:", community);
  const handleNavClick = (e) => {
    e.stopPropagation();
    history.push(`/c/${post?.community?.name}`);
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
                  community?.communitySettings[community?.id]?.communityIcon
                }
                imgAlt="Community"
                imgStyle={{
                  backgroundColor: `${
                    community?.communitySettings[community?.id]?.baseColor
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
              c/{post?.community?.name}
            </span>
          )}

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
