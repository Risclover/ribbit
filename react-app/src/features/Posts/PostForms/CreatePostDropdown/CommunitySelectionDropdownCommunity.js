import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import "./CommunitySelection.css";

export default function CommunitySelectionDropdownCommunity({
  subscription,
  setShowDropdown,
  setSearch,
}) {
  const history = useHistory();

  const handleClick = (e, name) => {
    e.preventDefault();
    setSearch(name);
    history.push(`/c/${subscription?.id}/submit`);
    setShowDropdown(false);
  };

  return (
    <NavLink to={`/c/${subscription?.id}/submit`}>
      <div
        className="community-selection-dropdown-community"
        onClick={(e) => handleClick(e, subscription?.name)}
      >
        <img
          className="community-selection-community-img"
          src={subscription?.communityImg}
          alt="Community"
        />
        <div className="community-selection-dropdown-community-details">
          <div className="community-selection-community-name">
            c/{subscription?.name}
          </div>
          <div className="community-selection-community-members">
            {subscription?.members}{" "}
            {subscription?.members === 1 ? "member" : "members"}
          </div>
        </div>
      </div>
    </NavLink>
  );
}
