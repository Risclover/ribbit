import React, { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { useHistory } from "react-router-dom";
import { getCommunities } from "@/store";
import { useOutsideClick } from "@/hooks";
import { CommunityImg } from "@/components/CommunityImg";
import { SearchIcon, CircleSeparator } from "@/assets";

export function SearchDropdown({
  searchQuery,
  setSearchQuery,
  setShowSearchDropdown,
  setShowSearchScreen = () => {
    return null;
  },
}) {
  const wrapperRef = useRef(null);
  const dispatch = useAppDispatch();
  const history = useHistory();
  const allCommunities = useAppSelector(
    (state) => state.communities.communities
  );
  const allUsers = useAppSelector((state) => state.users);
  const communitiesLoaded = useAppSelector((state) => state.communities.loaded);

  useEffect(() => {
    if (!communitiesLoaded) dispatch(getCommunities());
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

  const handleResultClick = (url) => {
    setShowSearchDropdown(false);
    setShowSearchScreen(false);
    setSearchQuery("");
    history.push(url);
  };

  return (
    <div
      className="nav-search-dropdown"
      role="menu"
      ref={wrapperRef}
      onClick={(e) => {
        e.preventDefault();
        setShowSearchDropdown(false);
        setShowSearchScreen(false);
      }}
    >
      {filteredCommunities.length > 0 && (
        <div className="nav-search-section">
          <p>Communities</p>
          {filteredCommunities.map((community) => (
            <div
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleResultClick(`/c/${community.name}`);
                }
              }}
              className="search-result-community"
              key={community.id}
              onClick={() => handleResultClick(`/c/${community.name}`)}
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
                  Community <CircleSeparator />
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
              tabIndex={0}
              className="search-result-community"
              key={user.id}
              onClick={() => handleResultClick(`/users/${user.id}/profile`)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleResultClick(`/users/${user.id}/profile`);
                }
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
        <SearchIcon height="20" width="20" color="currentColor" />
        Search for "{searchQuery}"
      </button>
    </div>
  );
}
