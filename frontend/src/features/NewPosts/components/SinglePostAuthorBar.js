import { CommunityImg, Username } from "@/components";
import { Tooltip } from "@/components/Tooltip/Tooltip";
import moment from "moment";
import React from "react";
import { useAppSelector } from "@/store";
import { NavLink, useHistory } from "react-router-dom";
import { fromNowLocal } from "@/utils/fromNowLocal";

export default function SinglePostAuthorBar({
  communityPage,
  post,
  isPage,
  format,
}) {
  const history = useHistory();
  const community = useAppSelector(
    (state) => state.communities.communities[post?.communityId]
  );
  const postAuthor = useAppSelector(
    (state) => state.users.users[post?.authorId]
  );
  const handleCommunityClick = (e) => {
    e.stopPropagation();
    history.push(`/c/${community.name}`);
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
                imgSrc={post?.communityIcon}
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
            <div
              onClick={handleCommunityClick}
              className="single-post-community-name"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleCommunityClick(e);
                }
              }}
            >
              c/{community.name}
            </div>
          )}

          <span className="single-post-dot-spacer">•</span>
        </div>
      )}

      <div className="single-post-author-info">
        Posted by
        <Username
          community={communityPage}
          username={postAuthor.username}
          user={postAuthor}
          source="singlepost"
        />
        <span className="post-time">
          {fromNowLocal(post?.createdAt, "en-post")}
          <span className="post-time-hover">
            <Tooltip direction="down" text={post?.createdAt} />
          </span>
        </span>
      </div>
    </div>
  );
}
