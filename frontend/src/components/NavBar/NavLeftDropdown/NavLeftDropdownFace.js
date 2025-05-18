import React, { useContext, useEffect, useRef, useState } from "react";
import { VscChevronDown } from "react-icons/vsc";
import { PageTitleContext } from "@/context";
import { BsReverseLayoutTextSidebarReverse } from "react-icons/bs";
import { useOutsideClick } from "@/hooks";
import { NavLeftDropdown } from "./NavLeftDropdown";
import "./NavLeftDropdown.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useWindowWidth } from "hooks";

export const NavLeftDropdownFace = ({
  screenWidth,
  setShowNavSidebar,
  showNavSidebar,
  showDropdown,
  setShowDropdown,
}) => {
  const { width, setWidth } = useWindowWidth();
  const dropdownRef = useRef(null);
  const { pageTitle, pageIcon } = useContext(PageTitleContext);
  const [showIcon, setShowIcon] = useState(false);

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
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
      <div
        className="nav-left-dropdown-wrapper"
        tabIndex={!showNavSidebar ? 0 : -1}
        ref={dropdownRef}
        onKeyDown={(e) =>
          e.key === "Enter" && !showNavSidebar && setShowDropdown(!showDropdown)
        }
      >
        {/* clickable face */}
        <div
          className={`nav-left-dropdown-face ${
            !showNavSidebar && showIcon
              ? " plus-border"
              : showNavSidebar && !showIcon
              ? " dropdown-disabled"
              : ""
          }`}
          onClick={() => {
            !showNavSidebar && setShowDropdown(!showDropdown);
          }}
        >
          {/* first 2/3rds is a button */}
          <button
            className="nav-left-dropdown-face-left"
            tabIndex={-1}
            style={{ cursor: showNavSidebar && !showIcon && "default" }}
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
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setShowNavSidebar(true)}
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
