import React from "react";
import { NavLink } from "react-router-dom";

export default function SearchResultsPeople({
  userList,
  searchQuery,
  SearchDude,
  setAdjustQuery,
}) {
  return (
    <div className="search-results-page-people">
      {userList
        .filter((user) =>
          user["username"].toLowerCase().includes(searchQuery.toLowerCase())
        )
        .map((user, idx) =>
          user["username"].toLowerCase().includes(searchQuery.toLowerCase()) ? (
            <NavLink key={idx} to={`/users/${user.id}/profile`}>
              <div className="search-results-page-person">
                <div className="search-results-page-community-left">
                  <img
                    src={user.profile_img}
                    className="search-results-page-community-img"
                    alt="User"
                  />
                  <div className="search-results-page-community-details">
                    <div className="search-results-page-community-details-top">
                      <span className="search-results-page-community-name">
                        u/{user.username}
                      </span>
                      <span className="search-results-page-community-dot">
                        •
                      </span>
                      <span className="search-results-page-community-members">
                        {user.karma} karma
                      </span>
                    </div>
                    <div className="search-results-page-community-details-bottom">
                      {user.about}
                    </div>
                  </div>
                </div>
                <div className="search-results-page-community-right">
                  {/* <button className="search-results-page-person-join">
                    Follow
                  </button> */}
                </div>
              </div>
            </NavLink>
          ) : (
            ""
          )
        )}
      {userList.filter((user) =>
        user["username"].toLowerCase().includes(searchQuery.toLowerCase())
      ).length === 0 && (
        <div className="no-search-results">
          <img src={SearchDude} alt="Search Dude" />
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
