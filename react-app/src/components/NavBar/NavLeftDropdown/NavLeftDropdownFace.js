import React, { useState } from "react";
import "./NavLeftDropdown.css";
import { VscChevronDown } from "react-icons/vsc";
import { BsReverseLayoutTextSidebarReverse } from "react-icons/bs";
import NavLeftDropdown from "./NavLeftDropdown";

export default function NavLeftDropdownFace({
  pageTitle,
  setPageTitle,
  setShowNavSidebar,
  showNavSidebar,
  setNormalDropdown,
  normalDropdown,
}) {
  const [showIcon, setShowIcon] = useState(false);

  return (
    <div className="nav-left-dropdown-wrapper">
      {!showNavSidebar && (
        <>
          <div
            className={
              normalDropdown
                ? "nav-left-dropdown-face"
                : "nav-left-dropdown-face dropdown-not-normal"
            }
            onClick={() => {
              normalDropdown && setShowIcon(true);
            }}
          >
            {!showNavSidebar && (
              <button
                className={
                  normalDropdown
                    ? "nav-left-dropdown-face-left"
                    : "nav-left-dropdown-face-left dropdown-not-normal"
                }
              >
                <h1>{pageTitle}</h1>
              </button>
            )}
            <span
              className={
                normalDropdown
                  ? "nav-left-dropdown-arrow"
                  : "nav-left-dropdown-arrow-hidden"
              }
            >
              <VscChevronDown />
            </span>
            {showIcon && !showNavSidebar && (
              <div
                className="nav-left-dropdown-face-sidebar-icon"
                onClick={() => {
                  setShowNavSidebar(true);
                  setNormalDropdown(false);
                }}
              >
                <BsReverseLayoutTextSidebarReverse />
              </div>
            )}
          </div>

          {showIcon && !showNavSidebar && (
            <div className="nav-left-dropdown">
              <NavLeftDropdown
                setPageTitle={setPageTitle}
                showIcon={showIcon}
                setShowIcon={setShowIcon}
              />
            </div>
          )}
        </>
      )}
      {/* {showNavSidebar && <div className=""} */}
    </div>
  );
}
