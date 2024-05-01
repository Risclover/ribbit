import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import "./CommunitySelection.css";

export function CommunitySelectionDropdownCommunity({
  subscription,
  setShowDropdown,
  setSearch,
  setCommunity,
  communityId,
  otherComms,
}) {
  const history = useHistory();
  const allCommunities = useSelector((state) =>
    Object.values(state.communities)
  );

  const thisCommunity = useSelector((state) => state.communities[communityId]);

  const [baseColor, setBaseColor] = useState();

  useEffect(() => {
    for (let community of allCommunities) {
      if (community.id === subscription.id) {
        setBaseColor(community.communitySettings[community?.id].baseColor);
      }
    }
  });

  const changeCommunity = (community) => {
    document.documentElement.style.setProperty(
      "--community-base-color",
      community?.communitySettings[community.id]?.baseColor
    );

    document.documentElement.style.setProperty(
      "--community-highlight",
      community?.communitySettings[community.id]?.highlight
    );

    document.documentElement.style.setProperty(
      "--community-body-bg",
      community?.communitySettings[community.id]?.bgColor
    );

    document.documentElement.style.setProperty(
      "--community-banner-height",
      community?.communitySettings[community.id]?.bannerHeight
    );

    document.documentElement.style.setProperty(
      "--community-banner-color",
      community?.communitySettings[community.id]?.customBannerColor
        ? community?.communitySettings[community.id]?.bannerColor
        : community?.communitySettings[community.id]?.baseColor
    );

    document.documentElement.style.setProperty(
      "--community-banner-img",
      `url(${community?.communitySettings[community.id]?.bannerImg})`
    );
  };

  const handleClick = (e, name) => {
    e.preventDefault();
    setSearch(name);
    for (let community of allCommunities) {
      if (community.name === name) {
        setCommunity(community);
        history.push(`/c/${community.name}/submit`);
        changeCommunity(community);
        setShowDropdown(false);
      }
    }
  };

  return (
    <NavLink to={`/c/${subscription?.name}/submit`}>
      <div
        className="community-selection-dropdown-community"
        onClick={(e) => handleClick(e, subscription?.name)}
      >
        {/* <img
          style={{
            backgroundColor: `${baseColor}`,
          }}
          className="community-selection-community-img"
          src={
            otherComms
              ? subscription.img
              : subscription.communitySettings?.[subscription?.id].communityIcon
          }
          alt="Community"
        /> */}
        {otherComms && (
          <img
            className="community-selection-community-img"
            src={subscription.img}
          />
        )}
        {!otherComms && (
          <img
            className="community-selection-community-img"
            src={subscription.communitySettings[subscription?.id].communityIcon}
          />
        )}
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
