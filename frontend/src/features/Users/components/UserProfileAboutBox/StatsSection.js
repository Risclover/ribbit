import React from "react";
import moment from "moment";
import { SlArrowRight } from "react-icons/sl";
import { KarmaIcon } from "@/assets";

const CakeIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    viewBox="2.99 2 26.01 28"
  >
    {" "}
    <g data-name="Layer 2">
      {" "}
      <path d="M22.36,10.06A5.5,5.5,0,0,1,12,7.5a5.389,5.389,0,0,1,.59-2.47,4.755,4.755,0,0,0-1.19.03A10.321,10.321,0,0,0,6.41,7.17a8.981,8.981,0,0,0-3.35,5.67A9.029,9.029,0,0,0,2.99,14H28.32Z"></path>{" "}
      <path d="M17.5,11a3.486,3.486,0,0,0,2.155-6.237,4.715,4.715,0,0,1,1.611-.8,1,1,0,1,0-.532-1.928A6.722,6.722,0,0,0,18.387,3.21a6.572,6.572,0,0,0-.84.8c-.016,0-.031,0-.047,0a3.5,3.5,0,0,0,0,7Z"></path>{" "}
      <path d="M3,16v5.251a7.951,7.951,0,0,1,2.289,1.107A5.142,5.142,0,0,0,8.5,23.4a5.136,5.136,0,0,0,3.209-1.042A7.042,7.042,0,0,1,16,21a7.054,7.054,0,0,1,4.29,1.357,5.467,5.467,0,0,0,6.424,0A7.957,7.957,0,0,1,29,21.251V16Z"></path>{" "}
      <path d="M23.5,25.4a7.05,7.05,0,0,1-4.29-1.357A5.14,5.14,0,0,0,16,23a5.139,5.139,0,0,0-3.209,1.042A7.036,7.036,0,0,1,8.5,25.4,7.042,7.042,0,0,1,4.21,24.042,7.947,7.947,0,0,0,3,23.368V27a3,3,0,0,0,3,3H26a3,3,0,0,0,3-3V23.367a7.978,7.978,0,0,0-1.212.676A7.05,7.05,0,0,1,23.5,25.4Z"></path>{" "}
    </g>{" "}
  </svg>
);

function Stat({ icon, label, value, extraCls }) {
  return (
    <div className={`user-profile-stats ${extraCls ? extraCls : ""}`}>
      <h5>{label}</h5>
      <div className="stats-stats">
        {icon}
        <span className="stats-label">{value}</span>
      </div>
    </div>
  );
}

export function StatsSection({ about, user, showAbout }) {
  return (
    <div className={`user-profile-stats-box ${showAbout ? "show-about" : ""}`}>
      <Stat
        icon={<KarmaIcon />}
        label="Karma"
        value={about.karma}
        extraCls="stats-karma"
      />

      <Stat
        icon={CakeIcon}
        label="Cake day"
        value={moment(user?.createdAt).format("MMMM DD, YYYY")}
        extraCls="stats-cakeday"
      />

      {about.isMe && (
        <button
          className="user-profile-stats stats-followers"
          onClick={() => about.setShowFollowersModal(true)}
          tabIndex={0}
        >
          <h5>Followers</h5>
          <div className="stats-stats">
            <i className="fa-solid fa-user"></i>
            <span className="stats-label">{about.followersCount}</span>
            <SlArrowRight />
          </div>
        </button>
      )}
    </div>
  );
}
