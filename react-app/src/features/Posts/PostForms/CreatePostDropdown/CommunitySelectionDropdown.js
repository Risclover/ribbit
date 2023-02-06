import React from "react";
import { NavLink } from "react-router-dom";
import "./CommunitySelection.css";
import CommunitySelectionDropdownCommunity from "./CommunitySelectionDropdownCommunity";

export default function CommunitySelectionDropdown({
  communities,
  subscriptions,
  community_id,
  setcommunity_id,
  setShowDropdown,
  showDropdown,
  search,
  setSearch,
  communityList,
  setName,
}) {
  console.log("subbies:", subscriptions);

  const list = subscriptions.map((subscription) => subscription.communityImg);
  console.log("list", list);
  return (
    <div className="community-selection-dropdown">
      <div className="community-selection-dropdown-topbar">
        <h5>Your Communities</h5>
        <button className="community-selection-dropdown-new-community">
          Create New
        </button>
      </div>
      {subscriptions.map((subscription) => (
        <CommunitySelectionDropdownCommunity
          communityList={communityList}
          search={search}
          setSearch={setSearch}
          setcommunity_id={setcommunity_id}
          subscription={subscription}
          community_id={community_id}
          setShowDropdown={setShowDropdown}
          showDropdown={showDropdown}
          setName={setName}
        />
      ))}
      <div className="community-selection-dropdown-topbar">
        <h5>Other Communities</h5>
        {/* <CommunitySelectionDropdownCommunity
          communityList={communityList}
          search={search}
          setSearch={setSearch}
          setcommunity_id={setcommunity_id}
          subscription={subscription}
          community_id={community_id}
          setShowDropdown={setShowDropdown}
          showDropdown={showDropdown}
          setName={setName}
        /> */}
        {/* {communityList.filter((community) =>
          community["name"].toLowerCase().includes(search.toLowerCase())
        ).length > 0 &&
          communityList.filter((community) =>
            community["name"]
              .toLowerCase()
              .includes(search.toLowerCase())
              .map((community) =>
                community["name"]
                  .toLowerCase()
                  .includes(search.toLowerCase()) ? (
                  <CommunitySelectionDropdownCommunity
                    communityList={communityList}
                    search={search}
                    setSearch={setSearch}
                    setcommunity_id={setcommunity_id}
                    community_id={community_id}
                    setShowDropdown={setShowDropdown}
                    showDropdown={showDropdown}
                    setName={setName}
                    subscription={community}
                  />
                ) : (
                  ""
                )
              )
          )} */}
      </div>
    </div>
  );
}
