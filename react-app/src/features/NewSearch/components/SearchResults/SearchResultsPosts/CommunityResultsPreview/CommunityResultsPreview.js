import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Community } from "./Community";
import { useHistory } from "react-router-dom";
import CommunityResultType from "./CommunityResultType";
import { stripHtml } from "@/utils/stripHtml";
import { searchCommunities } from "@/store";

export const CommunityResultsPreview = ({ query, isLoading }) => {
  const history = useHistory();
  const communities = useSelector((state) =>
    Object.values(state.search.communities)
  );

  return (
    <div className="search-results-right-box">
      <h4>Communities</h4>
      <CommunityResultType isLoading={isLoading} communities={communities} />

      {query.trim().length > 0 && communities.length > 5 && !isLoading && (
        <div
          className="see-more-btn"
          onClick={() => history.push(`/search/communities?q=${query}`)}
        >
          See more communities
        </div>
      )}
    </div>
  );
};
