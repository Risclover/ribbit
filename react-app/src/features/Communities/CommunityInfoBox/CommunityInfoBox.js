import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import moment from "moment";
import Cake from "../../../images/misc/piece4.png";
import { useDispatch } from "react-redux";
import {
  addFavoriteCommunity,
  getFavoriteCommunities,
  removeFavoriteCommunity,
} from "../../../store/favorite_communities";

import { getSubscriptions } from "../../../store/subscriptions";
import LoginSignupModal from "../../../components/Modals/LoginSignupModal";
import { BiShieldAlt } from "react-icons/bi";
import getTextColor from "../../../utils/getTextColor";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import CommunityDescription from "./CommunityDescription";
import CommunityInfoMenu from "./CommunityInfoMenu";

export default function CommunityInfoBox({
  setFavorited,
  favoriteCommunities,
  community,
  user,
}) {
  const dispatch = useDispatch();
  const [members, setMembers] = useState(0);

  useEffect(() => {
    setMembers(community?.members);
  }, [community?.members]);

  const handleFavorite = async (e, community) => {
    e.preventDefault();
    if (favoriteCommunities[community.id]) {
      await dispatch(removeFavoriteCommunity(community.id));
      setFavorited(false);
    } else {
      await dispatch(addFavoriteCommunity(community.id));
      setFavorited(true);
    }
    dispatch(getFavoriteCommunities());
    dispatch(getSubscriptions());
  };

  const varColor = getComputedStyle(document.documentElement).getPropertyValue(
    "--community-base-color"
  );

  document.documentElement.style.setProperty(
    "--community-base-color-text",
    getTextColor(varColor)
  );

  document.documentElement.style.setProperty(
    "--community-base-color",
    community.baseColor
  );

  document.documentElement.style.setProperty(
    "--community-highlight",
    community.highlight
  );

  document.documentElement.style.setProperty(
    "--community-body-bg",
    community.bodyBg
  );

  return (
    <div className="community-page-community-info">
      <div className="community-page-box-header">
        <div className="community-page-box-header-left">
          <h3>About Community</h3>
        </div>
        <div className="community-page-box-header-right">
          {user.id === community?.userId && (
            <NavLink
              to={`/c/${community.id}/edit`}
              className="community-page-mod-tools"
            >
              <BiShieldAlt /> Mod Tools
            </NavLink>
          )}
          <CommunityInfoMenu />
        </div>
      </div>
      <div className="community-page-box-content">
        <CommunityDescription community={community} user={user} />
        <div className="community-page-box-date">
          <img src={Cake} className="community-cake-icon" alt="Cake" />
          Created {moment(new Date(community.createdAt)).format("MMM DD, YYYY")}
        </div>
        <div className="community-page-box-members">
          <h2>{members}</h2>
          <span>{members === 1 ? "Member" : "Members"}</span>
        </div>
        <div className="community-page-box-btn">
          {user && (
            <NavLink to={`/c/${community.id}/submit`}>
              <button className="blue-btn-filled btn-long community-btn-filled">
                Create Post
              </button>
            </NavLink>
          )}

          {!user && (
            <LoginSignupModal
              btnText="Log In/Sign Up"
              className="blue-btn-filled btn-long community-btn-filled"
            />
          )}
        </div>
      </div>
    </div>
  );
}
