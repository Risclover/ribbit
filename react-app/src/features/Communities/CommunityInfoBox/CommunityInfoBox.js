import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { BiShieldAlt } from "react-icons/bi";
import moment from "moment";
import {
  CommunityInfoMenu,
  CommunityDescription,
  CommunityOptions,
  LoginSignupModal,
  CommunityJoinBtn,
} from "../..";
import { getTextColor } from "@/utils";
import Cake from "@/assets/images/misc/piece4.png";
import { useHistory } from "react-router-dom";
import { CommunityImg } from "components/CommunityImg";

export function CommunityInfoBox({ community, user, isPage }) {
  const history = useHistory();
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
          <CommunityInfoMenu community={community} />
        </div>
      </div>
      <div className="community-page-box-content">
        {isPage === "singlepage" && (
          <div
            className="single-post-community-info-name"
            onClick={() => history.push(`/c/${community?.name}`)}
          >
            <CommunityImg
              imgSrc={
                community?.communitySettings?.[community?.id]?.communityIcon
              }
              imgAlt="Community"
              imgClass="single-post-community-info-img"
            />
            c/{community?.name}
          </div>
        )}
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
          {isPage === "singlepage" && (
            <CommunityJoinBtn community={community} isPage={isPage} />
          )}
          {user && (
            <button
              className="blue-btn-filled btn-long community-btn-filled"
              onClick={() => history.push(`/c/${community.name}/submit`)}
            >
              Create Post
            </button>
          )}

          {!user && (
            <LoginSignupModal
              btnText="Log In/Sign Up"
              className="blue-btn-filled btn-long community-btn-filled"
              formType="login"
            />
          )}
        </div>
        <CommunityOptions community={community} />
      </div>
    </div>
  );
}
