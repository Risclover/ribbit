import React from "react";
import { NavLink } from "react-router-dom";
import "./CommunitySelection.css";

export default function CommunitySelectionDropdownCommunity({
  setcommunity_id,
  community_id,
  setInputState,
  subscription,
  setShowDropdown,
  showDropdown,
  search,
  setSearch,
  setName,
  communityList,
}) {
  const handleClick = (e, name) => {
    e.preventDefault();
    setShowDropdown(true);
    setcommunity_id(subscription.id);
    setName(name);
    console.log(community_id, search);
    setShowDropdown(false);
  };

  return (
    <NavLink to={`/c/${subscription.id}`}>
      <div
        className="community-selection-dropdown-community"
        onClick={(e) => handleClick(e, subscription.name)}
      >
        <img
          className="community-selection-community-img"
          src={subscription?.communityImg}
        />
        <div className="community-selection-dropdown-community-details">
          <div className="community-selection-community-name">
            c/{subscription?.name}
          </div>
          <div className="community-selection-community-members">
            {subscription?.members} members
          </div>
        </div>
      </div>
    </NavLink>
  );
}
