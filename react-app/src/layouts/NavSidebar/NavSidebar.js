import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { TfiClose } from "react-icons/tfi";

import {
  getFavoriteCommunities,
  getFavoriteUsers,
  getFollowers,
  getSubscriptions,
} from "@/store";

import { NavLeftDropdown } from "@/layouts";
import "./NavSidebar.css";
import { NewNavLeftDropdown } from "layouts/NavBar";

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

  return (
    <>
      {showNavSidebar && (
        <div className="nav-sidebar-container">
          <div className="nav-sidebar-top">
            <button
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
