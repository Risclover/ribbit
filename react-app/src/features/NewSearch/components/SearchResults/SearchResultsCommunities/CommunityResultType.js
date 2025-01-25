import React from "react";
import { CommunityResult } from "./CommunityResult";
import { NoResults } from "../NoResults";

export default function CommunityResultType({
  isLoading,
  communities,
  query,
  focusSearchBox,
}) {
  if (isLoading) {
    return (
      <div>
        {Array(18)
          .fill(null)
          .map((_, i) => (
            <CommunityResult.Skeleton key={i} />
          ))}
      </div>
    );
  } else if (communities.length === 0) {
    return <NoResults query={query} focusSearchBox={focusSearchBox} />;
  } else {
    return communities.map((community) => (
      <CommunityResult key={community.id} community={community} />
    ));
  }
}
