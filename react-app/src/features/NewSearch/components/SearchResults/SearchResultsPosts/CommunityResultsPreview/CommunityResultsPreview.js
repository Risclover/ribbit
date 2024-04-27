import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Community } from "./Community";
import { getSubscriptions } from "../../../../../../store";

export const CommunityResultsPreview = () => {
  const dispatch = useDispatch();
  const communities = useSelector((state) =>
    Object.values(state.search.communities)
  );

  return (
    <div className="search-results-right-box">
      <h4>Communities</h4>
      {communities.map((community, idx) => {
        return idx < 5 && <Community community={community} />;
      })}

      {communities.length > 5 && (
        <div
          className="see-more-btn"
          onClick={() => setSearchPage("Communities")}
        >
          See more communities
        </div>
      )}
      {communities.length === 0 && <div className="no-results">No results</div>}
    </div>
  );
};
