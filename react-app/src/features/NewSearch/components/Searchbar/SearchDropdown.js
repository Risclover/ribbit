import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { getCommunities } from "@/store";
import { NavLink } from "react-router-dom";
import { useOutsideClick } from "hooks";
import { CommunityImg } from "components/CommunityImg";

export function SearchDropdown({
  searchQuery,
  setSearchQuery,
  setShowSearchDropdown,
}) {
  const wrapperRef = useRef(null);
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
    if (searchQuery.trim().length > 0) {
      setShowSearchDropdown(false);
      history.push(`/search/posts?q=${searchQuery.trim()}`);
    }
  };

  useOutsideClick(wrapperRef, () => setShowSearchDropdown(false));

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
    <div
      className="nav-search-dropdown"
      role="menu"
      ref={wrapperRef}
      onClick={(e) => {
        e.preventDefault();
        setShowSearchDropdown(false);
      }}
    >
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
                <CommunityImg
                  imgStyle={{
                    backgroundColor: `${
                      community?.communitySettings[community.id].baseColor
                    }`,
                  }}
                  imgSrc={
                    community?.communitySettings[community.id].communityIcon
                  }
                  imgClass="search-result-community-img"
                  imgAlt="Community"
                />
              </div>
              <div className="search-result-community-details">
                <div className="search-result-community-name">
                  c/{community.name}
                </div>
                <div className="search-result-community-members">
                  Community{" "}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 8">
                    <g fill="inherit" stroke="none">
                      <circle r="4" cy="4" cx="4"></circle>
                    </g>
                  </svg>{" "}
                  {community.members} members
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {filteredUsers.length > 0 && (
        <div className="nav-search-section">
          <p>People</p>
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
                  src={user.profileImg}
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
      <button
        type="submit"
        form="searchbar-form"
        className="search-for-query"
        onClick={handleQuery}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          height="15"
          viewBox="0 0 15 15"
          width="15"
        >
          <path
            d="m14.5 14.5-4-4m-4 2c-3.31371 0-6-2.68629-6-6s2.68629-6 6-6 6 2.68629 6 6-2.68629 6-6 6z"
            stroke="#878a8c"
          />
        </svg>{" "}
        Search for "{searchQuery}"
      </button>
    </div>
  );
}
