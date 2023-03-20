import React from "react";
import { NavLink } from "react-router-dom";

export default function SearchResultsCommunities({
  communities,
  searchQuery,
  SearchDude,
  setAdjustQuery,
}) {
  return (
    <div className="search-results-page-communities">
      {communities
        .filter((community) =>
          community["name"].toLowerCase().includes(searchQuery.toLowerCase())
        )
        .map((community) =>
          community["name"]
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ? (
            <NavLink to={`/c/${community.id}`}>
              <div className="search-results-page-community">
                <div className="search-results-page-community-left">
                  <img
                    src={community.communityImg}
                    className="search-results-page-community-img"
                  />
                  <div className="search-results-page-community-details">
                    <div className="search-results-page-community-details-top">
                      <span className="search-results-page-community-name">
                        c/{community.name}
                      </span>
                      <span className="search-results-page-community-dot">
                        •
                      </span>
                      <span className="search-results-page-community-members">
                        {community.members} members
                      </span>
                    </div>
                    <div className="search-results-page-community-details-bottom">
                      {community.description}
                    </div>
                  </div>
                </div>
                <div className="search-results-page-community-right">
                  {/* <button className="search-results-page-community-join">
                    Join
                  </button> */}
                </div>
              </div>
            </NavLink>
          ) : (
            ""
          )
        )}
      {communities.filter((community) =>
        community["name"].toLowerCase().includes(searchQuery.toLowerCase())
      ).length === 0 && (
        <div className="no-search-results">
          <img src={SearchDude} />
          <h2>Hm... we couldn't find any results for “{searchQuery}”</h2>
          <p>
            Double-check your spelling or try different keywords to{" "}
            <span onClick={() => setAdjustQuery(true)}>adjust your search</span>
          </p>
        </div>
      )}
    </div>
  );
}
