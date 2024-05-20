import React, { useContext, useEffect, useRef, useState } from "react";
import { NewNavLeftDropdown } from "./NewNavLeftDropdown";
import { VscChevronDown } from "react-icons/vsc";
import { PageTitleContext } from "@/context";
import { BsReverseLayoutTextSidebarReverse } from "react-icons/bs";
import { useOutsideClick } from "hooks";
import "./NavLeftDropdown.css";
import { NavLeftDropdown } from "./NavLeftDropdown";

export const NavLeftDropdownFace = ({
  screenWidth,
  setScreenWidth,
  setShowNavSidebar,
  showNavSidebar,
  showDropdown,
  setShowDropdown,
}) => {
  const dropdownRef = useRef(null);
  const { pageTitle, pageIcon } = useContext(PageTitleContext);
  const [showIcon, setShowIcon] = useState(false);

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
    console.log("showDropdown:", showDropdown);
    setShowIcon(showDropdown);
  }, [showDropdown]);

  useEffect(() => {
    if (showNavSidebar) {
      setShowIcon(false);
    }
  });

  useOutsideClick(dropdownRef, () => setShowDropdown(false));

  return (
    <>
      <div className="nav-left-dropdown-wrapper" ref={dropdownRef}>
        {/* clickable face */}
        <div
          className="nav-left-dropdown-face"
          onClick={() => {
            !showNavSidebar && setShowDropdown(!showDropdown);
            console.log("after toggle:", showDropdown);
          }}
        >
          {/* first 2/3rds is a button */}
          <button
            className={`nav-left-dropdown-face-left${
              !showNavSidebar && showIcon
                ? " plus-border"
                : showNavSidebar && !showIcon
                ? " dropdown-disabled"
                : ""
            }`}
          >
            {/* page icon and page title */}
            <div className="nav-left-dropdown-face-title">
              {pageIcon}
              {screenWidth > 996 && pageTitle}
            </div>

            {/* down chevron arrow */}
            {!showNavSidebar && (
              <span className="nav-left-dropdown-arrow">
                <VscChevronDown />
              </span>
            )}
          </button>
          {showIcon && (
            <div
              className="nav-left-dropdown-face-sidebar-icon"
              onClick={() => {
                setShowNavSidebar(true);
              }}
            >
              <BsReverseLayoutTextSidebarReverse />
            </div>
          )}
        </div>
        {/* dropdown component */}
        {showDropdown && (
          <div className="nav-left-dropdown">
            <NavLeftDropdown
              setShowDropdown={setShowDropdown}
              setShowIcon={setShowIcon}
              showDropdown={showDropdown}
            />
          </div>
        )}
      </div>
    </>
  );
};
