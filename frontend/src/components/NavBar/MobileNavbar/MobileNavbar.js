import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { RandomLogo } from "@/layouts";
import { useScrollLock } from "@/hooks";
import { useAuthFlow } from "@/context";
import { LoggedOutDropdownFace } from "../LoggedOutDropdown/LoggedOutDropdownFace";
import { MobileNavbarBtns } from "./MobileNavbarBtns";
import "./MobileNavbar.css";

export function MobileNavBar({
  setOpenUserDropdown,
  openUserDropdown,
  setShowSearchScreen,
  setShowNavSidebar,
}) {
  const { openLogin } = useAuthFlow();

  const user = useSelector((state) => state.session.user);
  useScrollLock(openUserDropdown);
  const handleClick = () => {
    setOpenUserDropdown(true);
  };

  useEffect(() => {
    function handleEsc(e) {
      if (e.key === "Escape") setShowNavSidebar(false);
    }
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [setShowNavSidebar]);

  return (
    <div className="navbar-nav">
      <div className="logged-out-navbar">
        <div className="logged-out-navbar-left">
          <button
            className="navbar-button"
            onClick={() => setShowNavSidebar((prev) => !prev)}
          >
            <svg
              rpl=""
              fill="currentColor"
              height="20"
              icon-name="menu-outline"
              viewBox="0 0 20 20"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M18.25 4.7H1.75A.772.772 0 0 1 1 3.95c0-.399.352-.75.75-.75h16.5c.398 0 .75.351.75.75 0 .397-.352.75-.75.75ZM19 9.996a.772.772 0 0 0-.75-.75H1.75a.772.772 0 0 0-.75.75c0 .398.352.75.75.75h16.5c.398 0 .75-.352.75-.75Zm0 6.047a.772.772 0 0 0-.75-.75H1.75a.772.772 0 0 0-.75.75c0 .398.352.75.75.75h16.5c.398 0 .75-.352.75-.75Z"></path>
            </svg>
          </button>
          <NavLink to="/" exact={true}>
            <RandomLogo />
          </NavLink>
        </div>

        <div className="logged-out-navbar-right">
          <MobileNavbarBtns setShowSearchScreen={setShowSearchScreen} />

          {user && (
            <button
              className="open-logged-out-user-dropdown"
              onClick={() => setOpenUserDropdown((prev) => !prev)}
            >
              <img src={user?.profileImg} />
            </button>
          )}
          {!user && <LoggedOutDropdownFace onClick={handleClick} />}
        </div>
      </div>
    </div>
  );
}
