import React, { useEffect, useState } from "react";
import "./NavSidebar.css";
import { TfiClose } from "react-icons/tfi";
import NavLeftDropdown from "../../components/NavBar/NavLeftDropdown/NavLeftDropdown";
import { useDispatch } from "react-redux";
import { getFavoriteCommunities } from "../../store/favorite_communities";
import { getFavoriteUsers } from "../../store/favorite_users";
import { getFollowers } from "../../store/followers";
import { getSubscriptions } from "../../store/subscriptions";

export default function NavSidebar({
  setShowNavSidebar,
  showNavSidebar,
  setNormalDropdown,
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
                setNormalDropdown(true);
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
            />
          </div>
        </div>
      )}
    </>
  );
}
