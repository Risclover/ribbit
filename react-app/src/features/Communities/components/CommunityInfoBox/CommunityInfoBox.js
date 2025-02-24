import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { BiShieldAlt } from "react-icons/bi";
import moment from "moment";
import {
  CommunityInfoMenu,
  CommunityDescription,
  CommunityOptions,
  CommunityJoinBtn,
} from "@/features";
import { getTextColor } from "@/utils";
import Cake from "@/assets/images/misc/piece4.png";
import DarkModeCake from "@/assets/images/misc/piece4-darkmode.png";
import { useHistory } from "react-router-dom";
import { CommunityImg } from "@/components/CommunityImg";
import { useCommunitySettings } from "@/features/Posts/hooks/useCommunitySettings";
import { useSelector } from "react-redux";
import { useAuthFlow } from "@/context/AuthFlowContext";
import CakeIcon from "assets/icons/CakeIcon";

export function CommunityInfoBox({ community, user, isPage }) {
  const { checked, setChecked } = useCommunitySettings(community);
  const { openLogin } = useAuthFlow();
  const history = useHistory();
  const [members, setMembers] = useState(0);
  const [darkCake, setDarkCake] = useState(false);

  const currentUser = useSelector((state) => state.session.user);

  let currentTheme = localStorage.getItem("theme");

  useEffect(() => {
    if (currentTheme === "dark") {
      setDarkCake(true);
    } else {
      setDarkCake(false);
    }
  }, [currentTheme]);

  useEffect(() => {
    setMembers(community?.members);
  }, [community?.members]);

  useEffect(() => {
    const varColor = getComputedStyle(
      document.documentElement
    ).getPropertyValue("--community-base-color");

    document.documentElement.style.setProperty(
      "--community-base-color-text",
      getTextColor(varColor)
    );
  }, [community, localStorage, checked]);

  return (
    <div className="community-page-community-info">
      <div className="community-page-box-header">
        <div className="community-page-box-header-left">
          <h3>About Community</h3>
        </div>
        <div className="community-page-box-header-right">
          {user?.id === community?.userId && (
            <button
              className="community-page-mod-tools"
              onClick={() => history.push(`/c/${community?.name}/edit`)}
            >
              <BiShieldAlt /> Mod Tools
            </button>
          )}
          {currentUser && <CommunityInfoMenu community={community} />}
        </div>
      </div>
      <div className="community-page-box-content">
        {isPage === "singlepage" && (
          <div className="single-post-community-info-name">
            <CommunityImg
              imgSrc={
                community?.communitySettings?.[community?.id]?.communityIcon
              }
              imgAlt="Community"
              imgClass="single-post-community-info-img"
            />
            <NavLink to={`/c/${community?.name}`}>c/{community?.name}</NavLink>
          </div>
        )}
        <CommunityDescription
          isPage={isPage}
          community={community}
          user={user}
        />
        <div className="community-page-box-date">
          <span className="community-cake-icon">
            <CakeIcon />
          </span>
          Created {moment(new Date(community.createdAt)).format("MMM DD, YYYY")}
        </div>
        <div className="community-page-box-members">
          <h2>{members}</h2>
          <span>{members === 1 ? "Member" : "Members"}</span>
        </div>
        <div className="community-page-box-btn">
          {user && isPage === "singlepage" && (
            <CommunityJoinBtn community={community} isPage={isPage} />
          )}
          {user && (
            <NavLink
              className="blue-btn-filled btn-long community-btn-filled"
              to={`/c/${community.name}/submit`}
            >
              Create Post
            </NavLink>
          )}
          {!user && (
            <button
              className="blue-btn-filled btn-long community-btn-filled"
              onClick={openLogin}
            >
              Log In/Sign Up
            </button>
          )}
        </div>
        <CommunityOptions
          checked={checked}
          setChecked={setChecked}
          community={community}
        />
      </div>
    </div>
  );
}
