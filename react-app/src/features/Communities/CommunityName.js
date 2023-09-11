import React from "react";

export default function CommunityName({ community }) {
  return (
    <div className="community-header-info-details-left">
      <div className="community-header-info-display-name">
        <h1>
          {community.displayName.length === 0
            ? community.name
            : community.displayName}
        </h1>
      </div>
      <div className="community-header-info-name">
        <h2>
          {community.communitySettings[community.id].nameFormat !== "Hide" &&
            community.communitySettings[community.id].nameFormat}
          {community.communitySettings[community.id].nameFormat !== "Hide" &&
            community.name}
        </h2>
      </div>
    </div>
  );
}
