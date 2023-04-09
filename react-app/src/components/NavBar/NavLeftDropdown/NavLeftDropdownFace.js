import React, { useEffect, useState } from "react";
import "./NavLeftDropdown.css";
import Home from "../../../images/navbar/home-icon.png";
import { VscChevronDown } from "react-icons/vsc";
import { BsReverseLayoutTextSidebarReverse } from "react-icons/bs";
import NavLeftDropdown from "./NavLeftDropdown";
import { getSubscriptions } from "../../../store/subscriptions";
import { getFollowers, getUserFollowers } from "../../../store/followers";
import { getFavoriteCommunities } from "../../../store/favorite_communities";
import { getFavoriteUsers } from "../../../store/favorite_users";
import { useDispatch, useSelector } from "react-redux";

export default function NavLeftDropdownFace() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  const [showIcon, setShowIcon] = useState(false);

  useEffect(() => {
    dispatch(getSubscriptions());
    dispatch(getUserFollowers(currentUser?.id));
    dispatch(getFollowers());
    dispatch(getFavoriteCommunities());
    dispatch(getFavoriteUsers());
  }, [dispatch]);

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
