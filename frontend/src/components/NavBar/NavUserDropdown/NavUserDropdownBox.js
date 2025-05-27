import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";

import { HiOutlineUserCircle } from "react-icons/hi";
import { SlLogin } from "react-icons/sl";

import { CommunityThemeToggle } from "@/features";
import { useOutsideClick, useDarkMode } from "@/hooks";
import { logout } from "@/store";
import { useSkipLocation } from "@/context/SkipLocationContext";

export function NavUserDropdownBox({ cuser, setShowDropdown }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const { toggleTheme, checked } = useDarkMode();

  const onLogout = async () => {
    await dispatch(logout());
    setShowDropdown(false);
    history.push("/");
  };

  const handleKeyDown = (e, link) => {
    e.stopPropagation();
    if (e.key === "Enter") {
      history.push(link);
    }
  };

  useEffect(() => {
    function handleEsc(e) {
      if (e.key === "Escape") setShowDropdown(false);
    }
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [setShowDropdown]);

  return (
    <div className="nav-user-dropdown-box">
      <div className="nav-user-top-section">
        <div className="nav-user-dropdown-btn-title">
          <HiOutlineUserCircle /> My Stuff
        </div>
        <NavLink
          to={`/users/${cuser?.id}/profile`}
          onKeyDown={(e) => handleKeyDown(e, `/users/${cuser?.id}/profile`)}
          onClick={() => setShowDropdown(false)}
        >
          <div className="nav-user-dropdown-btn">Profile</div>
        </NavLink>
        <NavLink
          to={`/directory`}
          onKeyDown={(e) => handleKeyDown(e, `/directory`)}
          onClick={() => setShowDropdown(false)}
        >
          <div className="nav-user-dropdown-btn">Communities Directory</div>
        </NavLink>
        <NavLink
          to={`/settings/profile`}
          onKeyDown={(e) => handleKeyDown(e, `/settings/profile`)}
          onClick={() => setShowDropdown(false)}
        >
          <div className="nav-user-dropdown-btn">User Settings</div>
        </NavLink>
        <div
          className="nav-user-dropdown-btn dark-mode-toggle"
          onClick={(e) => {
            e.stopPropagation();
            toggleTheme(e);
          }}
        >
          Dark Mode{" "}
          <CommunityThemeToggle
            checked={checked}
            handleThemeToggle={toggleTheme}
          />
        </div>
      </div>
      <div
        className="nav-user-dropdown-logout-btn"
        onClick={onLogout}
        tabIndex={0}
        onKeyDown={(e) => {
          e.stopPropagation();
          if (e.key === "Enter") {
            onLogout();
          }
        }}
      >
        <div className="door-icon">
          <SlLogin />
        </div>
        Log Out
      </div>
    </div>
  );
}
