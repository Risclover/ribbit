import React from "react";
import { CommunitySubscribeBtn } from "./CommunitySubscribeBtn";
import { useSelector } from "react-redux";
import { useIsMobile } from "hooks/useIsMobile";
import { CommunityInfoMenu } from "./CommunityInfoBox";
import { NavLink } from "react-router-dom";

export function CommunityName({ community }) {
  const user = useSelector((state) => state.session.user);
  const isMobile = useIsMobile();
  return (
    <div className="community-header-info-details-left">
      <div className="community-header-info-display-name">
        <h1>
          {community.displayName.length === 0
            ? "c/" + community.name
            : community.displayName}
        </h1>
        <h1>{`c/${community.name}`}</h1>
        <h2>
          {community.communitySettings[community.id]?.nameFormat !== "Hide" &&
            community.communitySettings[community.id]?.nameFormat}
          {community.communitySettings[community.id]?.nameFormat !== "Hide" &&
            community.name}
        </h2>
        <h3>{`${community.members} member${
          community.members !== 1 ? "s" : ""
        }`}</h3>
      </div>
      <div className="community-header-info-details-right-container">
        <NavLink
          to={`/c/${community.name}/submit`}
          className="blue-btn-filled btn-short join-btn community-btn-filled join"
        >
          Create Post
        </NavLink>
        <CommunitySubscribeBtn
          user={user}
          community={community}
          communityId={community.id}
        />
        <CommunityInfoMenu community={community} />
      </div>
    </div>
  );
}
