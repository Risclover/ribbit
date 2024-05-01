import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { getCommunities } from "../../../../store";
import { NavLink } from "react-router-dom";

export function SearchDropdown({
  searchQuery,
  setSearchQuery,
  setShowSearchDropdown,
}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const allCommunities = useSelector((state) => state.communities);
  const allUsers = useSelector((state) => state.users);
  const [searchValue, setSearchValue] = useState();

  useEffect(() => {
    setSearchValue(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    dispatch(getCommunities());
  }, [dispatch]);

  const handleQuery = (e) => {
    history.push(`/search/posts?q=${searchQuery}`);
  };

  const filteredCommunities = Object.values(allCommunities)
    .filter((community) =>
      community.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice(0, 5);

  const filteredUsers = Object.values(allUsers)
    .filter((user) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice(0, 5);

  return (
    <div className="nav-search-dropdown">
      {filteredCommunities.length > 0 && (
        <div className="nav-search-section">
          <p>Communities</p>
          {filteredCommunities.map((community) => (
            <div
              className="search-result-community"
              key={community.id}
              onClick={() => {
                setShowSearchDropdown(false);
                setSearchQuery("");
                history.push(`/c/${community.name}`);
              }}
            >
              <div className="search-result-community-img-box">
                <img
                  style={{
                    backgroundColor:
                      community?.communitySettings[community.id].bgColor,
                  }}
                  src={community?.communitySettings[community.id].communityIcon}
                  className="search-result-community-img"
                  alt="Community"
                />
              </div>
              <div className="search-result-community-details">
                <div className="search-result-community-name">
                  c/{community.name}
                </div>
                <div className="search-result-community-members">
                  Community • {community.members} members
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {filteredUsers.length > 0 && (
        <div className="nav-search-section">
          <p>Users</p>
          {filteredUsers.map((user) => (
            <div
              className="search-result-community"
              key={user.id}
              onClick={() => {
                setShowSearchDropdown(false);
                setSearchQuery("");
                history.push(`/users/${user.id}/profile`);
              }}
            >
              <div className="search-result-community-img-box">
                <img
                  src={user.profile_img}
                  className="search-result-community-img"
                  alt="User"
                />
              </div>
              <div className="search-result-community-details">
                <div className="search-result-community-name">
                  u/{user.username}
                </div>
                <div className="search-result-community-members">
                  User • {user.karma} karma
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <NavLink to={`/search/posts?q=${searchValue}`}>
        <div className="search-for-query">
          <BsSearch /> Search for "{searchQuery}"
        </div>
      </NavLink>
    </div>
  );
}
