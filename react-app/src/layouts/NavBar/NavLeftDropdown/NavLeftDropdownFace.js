import React, { useEffect, useState } from "react";
import { VscChevronDown } from "react-icons/vsc";
import { BsReverseLayoutTextSidebarReverse } from "react-icons/bs";
import { NavLeftDropdown } from "./NavLeftDropdown";
import "./NavLeftDropdown.css";

export function NavLeftDropdownFace({
  pageTitle,
  setPageTitle,
  pageIcon,
  setPageIcon,
  setShowNavSidebar,
  showNavSidebar,
  setNormalDropdown,
  normalDropdown,
}) {
  const [showIcon, setShowIcon] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (screenWidth <= 1250) {
      setShowNavSidebar(false);
      setNormalDropdown(true);
    }
  }, [screenWidth]);

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
            <button
              className={
                normalDropdown && showIcon
                  ? "nav-left-dropdown-face-left plus-border"
                  : normalDropdown && !showIcon
                  ? "nav-left-dropdown-face-left"
                  : "nav-left-dropdown-face-left dropdown-not-normal"
              }
            >
              <div className="nav-left-dropdown-face-title">
                {pageIcon}
                {screenWidth > 996 && pageTitle}
              </div>
            </button>
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
                setShowIcon={() => setShowIcon()}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
