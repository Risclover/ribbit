import React from "react";
import { TbChevronDown } from "react-icons/tb";
import { UserIcon } from "assets/icons/UserIcon";
import "./LoggedOutDropdown.css";

export function LoggedOutDropdownWrapper() {
  return (
    <div className="logged-out-dropdown-wrapper">
      {/* <LoggedOutDropdownFace /> -- click to open LoggedOutDropdown */}
      {/* <LoggedOutDropdown */}
      <div className="user-icon">
        <UserIcon color="#868686" />
      </div>
      <span className="user-icon-chevron">
        <TbChevronDown />
      </span>
    </div>
  );
}
