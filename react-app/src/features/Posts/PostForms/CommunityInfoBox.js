import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import moment from "moment";
import Cake from "../../../assets/images/misc/piece4.png";
import CommunityOptions from "../../Communities/CommunityInfoBox/CommunityOptions/CommunityOptions";
import "react-loading-skeleton/dist/skeleton.css";

export default function CommunityInfoBox({ community }) {
  const [members, setMembers] = useState(0);

  useEffect(() => {
    setMembers(community?.members);
  }, [community?.members]);

  return (
    <div className="community-page-community-info">
      <div className="community-page-box-header"></div>
      <div className="community-title-details">
        <img
          className="community-title-details-img"
          src={community?.communitySettings[community?.id].communityIcon}
          alt="Community"
        />
        <div className="community-title-details-name">
          <NavLink to={`/c/${community?.id}`}>c/{community?.name}</NavLink>
        </div>
      </div>
      <div className="community-page-box-content">
        <div className="community-page-box-description">
          <p>{community?.description}</p>
        </div>
        <div className="community-page-box-date">
          <img src={Cake} className="community-cake-icon" alt="Cake" />
          Created{" "}
          {moment(new Date(community?.createdAt)).format("MMM DD, YYYY")}
        </div>
        <div className="community-page-box-members">
          <h2>{members}</h2>
          <span>{members === 1 ? "Member" : "Members"}</span>
        </div>
        <CommunityOptions community={community} />
      </div>
    </div>
  );
}
