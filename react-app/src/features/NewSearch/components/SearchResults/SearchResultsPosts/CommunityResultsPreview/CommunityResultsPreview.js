import React from "react";
import { useSelector } from "react-redux";
import { Community } from "./Community";
import { useHistory } from "react-router-dom";

export const CommunityResultsPreview = ({ query }) => {
  const history = useHistory();
  const communities = useSelector((state) =>
    Object.values(state.search.communities)
  );

  return (
    <div className="search-results-right-box">
      <h4>Communities</h4>
      {communities
        .map((community) => <Community community={community} />)
        .slice(0, 5)}

      {communities.length > 5 && (
        <div
          className="see-more-btn"
          onClick={() => history.push(`/search/communities?q=${query}`)}
        >
          See more communities
        </div>
      )}
      {communities.length === 0 && <div className="no-results">No results</div>}
    </div>
  );
};
