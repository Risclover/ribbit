import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { TfiClose } from "react-icons/tfi";

import {
  getFavoriteCommunities,
  getFavoriteUsers,
  getFollowers,
  getSubscriptions,
} from "@/store";

import { NavLeftDropdown } from "@/components";
import "./NavSidebar.css";
import {
  getSidebarState,
  setSidebarState,
} from "@/features/Communities/utils/localStorage";

export function NavSidebar({
  setShowNavSidebar,
  showNavSidebar,
  setShowDropdown,
}) {
  const dispatch = useDispatch();
  const [showIcon, setShowIcon] = useState();

  useEffect(() => {
    dispatch(getFavoriteCommunities());
    dispatch(getFavoriteUsers());
    dispatch(getFollowers());
    dispatch(getSubscriptions());
  }, [dispatch]);

  const sidebarState = getSidebarState();

  const setSidebar = setSidebarState(sidebarState);

  return (
    <>
      {showNavSidebar && (
        <div className="nav-sidebar-container">
          <div className="nav-sidebar-top">
            <button
              aria-label="Close nav sidebar"
              className="close-nav-sidebar-btn"
              onClick={() => {
                setShowNavSidebar(false);
                setShowIcon(false);
              }}
            >
              <TfiClose />
            </button>
          </div>
          <div className="nav-left-normal">
            <NavLeftDropdown
              mode="sidebar"
              showIcon={showIcon}
              setShowIcon={setShowIcon}
              setShowDropdown={setShowDropdown}
            />
          </div>
        </div>
      )}
    </>
  );
}
