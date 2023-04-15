import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import {
  getCommunities,
  getSingleCommunity,
} from "../../../../store/communities";
import "./CommunitySelection.css";

export default function CommunitySelectionDropdownCommunity({
  subscription,
  setShowDropdown,
  setSearch,
  setCommunity,
  search,
  community_id,
}) {
  const history = useHistory();
  const dispatch = useDispatch();
  const allCommunities = useSelector((state) =>
    Object.values(state.communities)
  );

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

    // if (subscription) {
    //   setCommunity(subscription);
    //   history.push(`/c/${subscription.id}/submit`);
    //   setShowDropdown(false);
    // } else {
    //   for (let community of allCommunities) {
    //     if (community.name === search) {
    //       setCommunity(community);
    //       history.push(`/c/${community.id}/submit`);
    //       setShowDropdown(false);
    //     }
    //   }
    // }
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
