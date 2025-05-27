import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { TfiClose } from "react-icons/tfi";

import { NavLeftDropdown } from "@/components";
import { useOutsideClick } from "@/hooks";
import {
  getFavoriteCommunities,
  getFavoriteUsers,
  getFollowers,
  getSubscriptions,
} from "@/store";
import "./NavSidebar.css";
import { useIsMobile, useIsSmallScreen } from "hooks";

export function NavSidebar({
  setShowNavSidebar,
  showNavSidebar,
  setShowDropdown,
}) {
  const wrapperRef = useRef(null);
  const dispatch = useDispatch();
  const [showIcon, setShowIcon] = useState();

  const isSmall = useIsSmallScreen(768);
  const isMobile = useIsMobile();

  useEffect(() => {
    dispatch(getFavoriteCommunities());
    dispatch(getFavoriteUsers());
    dispatch(getFollowers());
    dispatch(getSubscriptions());
  }, [dispatch]);

  useOutsideClick(
    wrapperRef,
    () => setShowNavSidebar(false),
    isSmall // listeners only exist when `isSmall` is true
  );

  useEffect(() => {
    function handleEsc(e) {
      if (e.key === "Escape") setShowNavSidebar(false);
    }
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [setShowNavSidebar]);

  return (
    <>
      {showNavSidebar && (isSmall || isMobile) && (
        <div className="auth-modal-background"></div>
      )}
      {showNavSidebar && (
        <div className="nav-sidebar-container" ref={wrapperRef}>
          {!isSmall && (
            <div className="nav-sidebar-top">
              <button
                aria-label="Close nav sidebar"
                className="close-nav-sidebar-btn"
                id="side-navigation"
                onClick={() => {
                  setShowNavSidebar(false);
                  setShowIcon(false);
                }}
              >
                <TfiClose />
              </button>
            </div>
          )}
          <div className="nav-left-normal">
            <NavLeftDropdown
              mode="sidebar"
              showIcon={showIcon}
              setShowIcon={setShowIcon}
              setShowDropdown={setShowDropdown}
              setShowNavSidebar={setShowNavSidebar}
            />
          </div>
        </div>
      )}
    </>
  );
}
