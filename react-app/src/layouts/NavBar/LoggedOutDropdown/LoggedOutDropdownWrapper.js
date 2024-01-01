import React from "react";
import { IoPersonOutline } from "react-icons/io5";
import { TbChevronDown } from "react-icons/tb";
import "./LoggedOutDropdown.css";

export function LoggedOutDropdownWrapper() {
  return (
    <div className="loggedout-dropdown-wrapper">
      <IoPersonOutline />
      <TbChevronDown />
    </div>
  );
}
