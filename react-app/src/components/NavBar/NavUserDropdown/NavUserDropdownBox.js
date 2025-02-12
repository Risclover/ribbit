import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";

import { HiOutlineUserCircle } from "react-icons/hi";
import { SlLogin } from "react-icons/sl";

import { CommunityThemeToggle } from "@/features";
import { useOutsideClick, useDarkMode } from "@/hooks";
import { logout } from "@/store";

export default function NavUserDropdownBox({ cuser, setShowDropdown }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const wrapperRef = useRef(null);

  useOutsideClick(wrapperRef, () => setShowDropdown(false));

  const { toggleTheme, checked } = useDarkMode();

  const onLogout = async () => {
    await dispatch(logout());
    history.push("/");
  };

  return (
    <div className="nav-user-dropdown-box" ref={wrapperRef}>
      <div className="nav-user-top-section">
        <div className="nav-user-dropdown-btn-title">
          <HiOutlineUserCircle /> My Stuff
        </div>
        <NavLink to={`/users/${cuser.id}/profile`}>
          <div className="nav-user-dropdown-btn">Profile</div>
        </NavLink>
        <NavLink to={`/directory`}>
          <div className="nav-user-dropdown-btn">Communities Directory</div>
        </NavLink>
        <NavLink to={`/settings/profile`}>
          <div className="nav-user-dropdown-btn">User Settings</div>
        </NavLink>
        <div
          className="nav-user-dropdown-btn dark-mode-toggle"
          onClick={(e) => {
            e.stopPropagation();
            toggleTheme();
          }}
        >
          Dark Mode{" "}
          <CommunityThemeToggle
            checked={checked}
            handleThemeToggle={toggleTheme}
          />
        </div>
      </div>
      <div className="nav-user-dropdown-logout-btn" onClick={onLogout}>
        <div className="door-icon">
          <SlLogin />
        </div>
        Log Out
      </div>
    </div>
  );
}
