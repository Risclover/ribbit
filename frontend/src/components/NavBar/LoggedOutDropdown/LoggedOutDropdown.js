import { CommunityThemeToggle, useLoginForm } from "@/features";
import { useDarkMode, useOutsideClick } from "@/hooks";
import React, { useEffect, useRef } from "react";
import { IoPersonOutline } from "react-icons/io5";
import { SlLogin } from "react-icons/sl";
import { useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { logout } from "@/store";

export function LoggedOutDropdown({ setShowDropdown }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const { toggleTheme, checked } = useDarkMode();

  const handleOpenLogin = () => {
    setShowDropdown(false);
    history.push("/login");
  };

  useEffect(() => {
    function handleEsc(e) {
      if (e.key === "Escape") setShowDropdown(false);
    }
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [setShowDropdown]);
  return (
    <div className="logged-out-dropdown">
      <div className="nav-user-top-section">
        <NavLink to={`/directory`} onClick={() => setShowDropdown(false)}>
          <div className="nav-user-dropdown-btn">Communities Directory</div>
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
        onClick={handleOpenLogin}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleOpenLogin();
          }
        }}
      >
        <div className="door-icon">
          <SlLogin />
        </div>
        Log In / Sign Up
      </div>
    </div>
  );
}
