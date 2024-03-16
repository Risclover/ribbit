import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { BiShieldAlt } from "react-icons/bi";
import moment from "moment";
import {
  CommunityInfoMenu,
  CommunityDescription,
  CommunityOptions,
  LoginSignupModal,
} from "../..";
import { getTextColor } from "../../../utils";
import Cake from "../../../assets/images/misc/piece4.png";

export function CommunityInfoBox({ community, user }) {
  const [members, setMembers] = useState(0);

  useEffect(() => {
    setMembers(community?.members);
  }, [community?.members]);

  const varColor = getComputedStyle(document.documentElement).getPropertyValue(
    "--community-base-color"
  );
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--community-base-color-text",
      getTextColor(varColor)
    );
  }, [community]);

  return (
    <div className="community-page-community-info">
      <div className="community-page-box-header">
        <div className="community-page-box-header-left">
          <h3>About Community</h3>
        </div>
        <div className="community-page-box-header-right">
          {user?.id === community?.userId && (
            <NavLink
              to={`/c/${community?.name}/edit`}
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
            <NavLink to={`/c/${community.name}/submit`}>
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
        <CommunityOptions community={community} />
      </div>
    </div>
  );
}
