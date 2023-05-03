import React, { useState } from "react";
import "./NavLeftDropdown.css";
import { VscChevronDown } from "react-icons/vsc";
import { BsReverseLayoutTextSidebarReverse } from "react-icons/bs";
import NavLeftDropdown from "./NavLeftDropdown";

export default function NavLeftDropdownFace({ pageTitle, setPageTitle }) {
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
          <h1>{pageTitle}</h1>
        </button>
        <VscChevronDown />
        {showIcon && (
          <div className="nav-left-dropdown-face-sidebar-icon">
            <BsReverseLayoutTextSidebarReverse />
          </div>
        )}
      </div>
      {showIcon && (
        <NavLeftDropdown
          setPageTitle={setPageTitle}
          showIcon={showIcon}
          setShowIcon={setShowIcon}
        />
      )}
    </div>
  );
}
