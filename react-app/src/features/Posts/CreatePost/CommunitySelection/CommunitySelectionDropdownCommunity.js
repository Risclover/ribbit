import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import "./CommunitySelection.css";
import { CommunityImg } from "components/CommunityImg";

export function CommunitySelectionDropdownCommunity({
  subscription,
  setShowDropdown,
  setSearch,
  setCommunity,
  communityId,
  otherComms,
  setInputState,
  inputState,
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
  }, []);

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
    setInputState("search");
    for (let community of allCommunities) {
      if (community.name === name) {
        setCommunity(community);
        history.push(`/c/${community.name}/submit`);
        changeCommunity(community);
        setShowDropdown(false);
      }
    }
    setInputState("choose");
  };

  return (
    <NavLink to={`/c/${subscription?.name}/submit`}>
      <div
        className="community-selection-dropdown-community"
        onClick={(e) => handleClick(e, subscription?.name)}
      >
        {otherComms && (
          <CommunityImg
            imgClass="community-selection-community-img"
            imgStyle={{ backgroundColor: `${baseColor}` }}
            imgSrc={subscription.img}
            imgAlt="Community"
          />
        )}
        {!otherComms && (
          <CommunityImg
            imgClass="community-selection-community-img"
            imgStyle={{
              backgroundColor: `${
                subscription?.communitySettings?.[subscription?.id].baseColor
              }`,
            }}
            imgSrc={
              subscription.communitySettings[subscription?.id].communityIcon
            }
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
