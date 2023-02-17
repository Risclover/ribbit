import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import "./CommunitySelection.css";
import { getSingleCommunity } from "../../../../store/one_community";
import { getCommunities } from "../../../../store/communities";
import { getPosts } from "../../../../store/posts";

export default function CommunitySelectionDropdownCommunity({
  subscription,
  setShowDropdown,
  setSearch,
}) {
  const { communityId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCommunities());
    dispatch(getSingleCommunity(+communityId));
    dispatch(getPosts());
  }, []);

  const handleClick = (e, name) => {
    e.preventDefault();
    setSearch(name);
    history.push(`/c/${subscription?.id}/submit`);
    setShowDropdown(false);
    // dispatch(getSingleCommunity(+communityId));
    // dispatch(getSingleCommunity(+communityId));
    // dispatch(getCommunities());
    // dispatch(getPosts());
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
