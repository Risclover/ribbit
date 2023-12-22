import React from "react";
import { UserOwnedCommunity } from "./UserOwnedCommunity";

export function UserOwnedCommunities({ communitiesList, userId }) {
  return (
    <div className="user-profile-owned-communities">
      {communitiesList.length > 0 ? (
        <h2>You're the owner of these communities.</h2>
      ) : (
        <h2>You aren't the owner of any communities.</h2>
      )}
      <div className="user-profile-owned-communities-box">
        {communitiesList.map(
          (community) =>
            community.communityOwner.id === userId && (
              <UserOwnedCommunity community={community} />
            )
        )}
      </div>
    </div>
  );
}
