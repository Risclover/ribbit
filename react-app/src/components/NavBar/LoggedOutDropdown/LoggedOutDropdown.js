import { CommunityThemeToggle } from "features";
import { useDarkMode, useOutsideClick } from "hooks";
import React, { useRef } from "react";
import { IoPersonOutline } from "react-icons/io5";
import { SlLogin } from "react-icons/sl";
import { useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { logout } from "store";

export function LoggedOutDropdown() {
  const dispatch = useDispatch();
  const history = useHistory();

  const { toggleTheme, checked } = useDarkMode();

  const onLogout = async () => {
    await dispatch(logout());
    history.push("/");
  };
  return (
    <div className="logged-out-dropdown">
      <div className="nav-user-top-section">
        <NavLink to={`/directory`}>
          <div className="nav-user-dropdown-btn">Communities Directory</div>
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
        Log In / Sign Up
      </div>
    </div>
  );
}
