import React from "react";
import { UserOwnedCommunity } from "./UserOwnedCommunity";

export function UserOwnedCommunities({ communitiesList, userId }) {
  const sortedCommunities = [...communitiesList].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <div className="user-profile-owned-communities">
      {sortedCommunities.length > 0 ? (
        <h2>You're the owner of these communities.</h2>
      ) : (
        <h2>You aren't the owner of any communities.</h2>
      )}
      <div className="user-profile-owned-communities-box">
        {sortedCommunities.map(
          (community) =>
            community.communityOwnerId === userId && (
              <UserOwnedCommunity key={community.id} community={community} />
            )
        )}
      </div>
    </div>
  );
}
