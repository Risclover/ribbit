import React, { useEffect, useState } from "react";
import "./NavLeftDropdown.css";
import Home from "../../../images/navbar/home-icon.png";
import { VscChevronDown } from "react-icons/vsc";
import { BsReverseLayoutTextSidebarReverse } from "react-icons/bs";
import NavLeftDropdown from "./NavLeftDropdown";

export default function NavLeftDropdownFace() {
  const [showIcon, setShowIcon] = useState(false);

  return (
    <div className="nav-left-dropdown-wrapper">
      <div
        className={
          showIcon ? "nav-left-dropdown-open" : "nav-left-dropdown-face"
        }
        onClick={() => {
          showIcon === true ? setShowIcon(false) : setShowIcon(true);
        }}
      >
        <button className="nav-left-dropdown-face-left">
          <img src={Home} className="nav-left-dropdown-face-icon" />
          <h1>Home</h1>
        </button>
        <VscChevronDown />
        {showIcon && (
          <div className="nav-left-dropdown-face-sidebar-icon">
            <BsReverseLayoutTextSidebarReverse />
          </div>
        )}
      </div>
      {showIcon && (
        <NavLeftDropdown showIcon={showIcon} setShowIcon={setShowIcon} />
      )}
    </div>
  );
}
