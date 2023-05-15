import React from "react";
import { IoPerson, IoPersonOutline } from "react-icons/io5";
import { TbChevronDown } from "react-icons/tb";
import "./LoggedOutDropdown.css";

export default function LoggedOutDropdownWrapper() {
  return (
    <div className="loggedout-dropdown-wrapper">
      <IoPersonOutline />
      <TbChevronDown />
    </div>
  );
}
