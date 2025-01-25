import React from "react";
import { Community } from "./Community";

export default function CommunityResultType({ isLoading, communities }) {
  if (isLoading) {
    return (
      <div>
        {Array(5)
          .fill(null)
          .map((_, i) => (
            <Community.CommunitySkeleton key={i} />
          ))}
      </div>
    );
  } else if (communities.length === 0) {
    return <div className="no-results">No results</div>;
  } else {
    return communities
      .map((community) => (
        <Community key={community.id} community={community} />
      ))
      .slice(0, 5);
  }
}
