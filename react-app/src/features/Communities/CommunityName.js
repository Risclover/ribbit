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
          {community.nameFormat !== "Hide" && community.nameFormat}
          {community.nameFormat !== "Hide" && community.name}
        </h2>
      </div>
    </div>
  );
}
