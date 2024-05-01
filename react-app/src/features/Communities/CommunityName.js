import React from "react";
import { CommunitySubscribeBtn } from "./CommunitySubscribeBtn";
import { useSelector } from "react-redux";

export function CommunityName({ community }) {
  const user = useSelector((state) => state.session.user);
  return (
    <div className="community-header-info-details-left">
      <div className="community-header-info-display-name">
        <h1>
          {community.displayName.length === 0
            ? community.name
            : community.displayName}
        </h1>
        <h2>
          {community.communitySettings[community.id].nameFormat !== "Hide" &&
            community.communitySettings[community.id].nameFormat}
          {community.communitySettings[community.id].nameFormat !== "Hide" &&
            community.name}
        </h2>
      </div>
      <CommunitySubscribeBtn
        user={user}
        community={community}
        communityId={community.id}
      />
    </div>
  );
}
