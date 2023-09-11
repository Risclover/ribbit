import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { BsSearch } from "react-icons/bs";

import "./Searchbar.css";

export default function SearchDropdown({
  searchQuery,
  setSearchQuery,
  setShowSearchDropdown,
}) {
  const history = useHistory();

  const allCommunities = useSelector((state) => state.communities);
  const allUsers = useSelector((state) => state.users);

  const handleQuery = async (e) => {
    e.preventDefault();
    setShowSearchDropdown(false);
    history.push("/search/results");
  };

  let communityList = [];

  for (let i = 0; i < Object.values(allCommunities).length; i++) {
    communityList.push({
      img: Object.values(allCommunities)[i].communityImg,
      name: Object.values(allCommunities)[i].name,
      members: Object.values(allCommunities)[i].members,
      communityImg: Object.values(allCommunities)[i].communityImg,
      id: Object.values(allCommunities)[i].id,
      bgColor:
        Object.values(allCommunities)[i].communitySettings[
          Object.values(allCommunities)[i].id
        ].baseColor,
    });
  }

  let userList = [];

  for (let i = 0; i < Object.values(allUsers).length; i++) {
    userList.push({
      profile_img: Object.values(allUsers)[i].profile_img,
      username: Object.values(allUsers)[i].username,
      id: Object.values(allUsers)[i].id,
      karma: Object.values(allUsers)[i].karma,
    });
  }

  return (
    <div className="nav-search-dropdown">
      {communityList.filter((community) =>
        community["name"].toLowerCase().includes(searchQuery.toLowerCase())
      ).length > 0 && (
        <div className="nav-search-section">
          <p>Communities</p>
          {communityList
            .filter((community) =>
              community["name"]
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
            )
            .slice(0, 5)
            .map((community) =>
              community["name"]
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ? (
                <div
                  className="search-result-community"
                  onClick={() => {
                    setShowSearchDropdown(false);
                    setSearchQuery("");
                    history.push(`/c/${community.id}`);
                  }}
                >
                  <div className="search-result-community-img-box">
                    <img
                      style={{
                        backgroundColor: `${community.bgColor}`,
                      }}
                      src={community.communityImg}
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
              ) : (
                ""
              )
            )}
        </div>
      )}
      {userList.filter((user) =>
        user["username"].toLowerCase().includes(searchQuery.toLowerCase())
      ).length > 0 && (
        <div className="nav-search-section">
          <p>Users</p>
          {userList
            .filter((user) =>
              user["username"].toLowerCase().includes(searchQuery.toLowerCase())
            )
            .slice(0, 5)
            .map((user, idx) =>
              idx < 6 &&
              user["username"]
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ? (
                <div
                  className="search-result-community"
                  onClick={() => {
                    setShowSearchDropdown(false);
                    setSearchQuery("");
                    history.push(`/users/${user.id}/profile`);
                  }}
                >
                  {" "}
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
              ) : (
                ""
              )
            )}
        </div>
      )}

      <div className="search-for-query" onClick={handleQuery}>
        <BsSearch /> Search for "{searchQuery}"
      </div>
    </div>
  );
}
