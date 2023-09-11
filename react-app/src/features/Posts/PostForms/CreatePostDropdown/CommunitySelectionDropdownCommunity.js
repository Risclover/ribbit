import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";

import "./CommunitySelection.css";

export default function CommunitySelectionDropdownCommunity({
  subscription,
  setShowDropdown,
  setSearch,
  setCommunity,
  community_id,
}) {
  const history = useHistory();
  const allCommunities = useSelector((state) =>
    Object.values(state.communities)
  );

  const [baseColor, setBaseColor] = useState();

  useEffect(() => {
    for (let community of allCommunities) {
      if (community.id === subscription.id) {
        setBaseColor(community.communitySettings[community.id].baseColor);
      }
    }
  });

  const handleClick = (e, name) => {
    e.preventDefault();
    setSearch(name);
    for (let community of allCommunities) {
      if (community.name === name) {
        setCommunity(community);
        history.push(`/c/${community.id}/submit`);
        setShowDropdown(false);
      }
    }
  };

  return (
    <NavLink to={`/c/${subscription?.id}/submit`}>
      <div
        className="community-selection-dropdown-community"
        onClick={(e) => handleClick(e, subscription?.name)}
      >
        <img
          style={{
            backgroundColor: `${baseColor}`,
          }}
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
