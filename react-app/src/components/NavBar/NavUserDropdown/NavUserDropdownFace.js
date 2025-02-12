import KarmaIcon from "assets/icons/KarmaIcon";
import React from "react";
import { TbChevronDown } from "react-icons/tb";

export default function NavUserDropdownFace({ cuser }) {
  return (
    <div className="navbar-user-dropdown-face">
      <div className="navbar-user-info-box">
        <div className="navbar-user-info-details">
          <img className="navbar-user-img" src={cuser?.profileImg} alt="User" />
          <div className="navbar-user-info">
            {cuser?.username}
            <div className="user-karma-info">
              <KarmaIcon color="#67b54d" />
              {cuser.karma} karma
            </div>
          </div>
        </div>
        <TbChevronDown />
      </div>
    </div>
  );
}
