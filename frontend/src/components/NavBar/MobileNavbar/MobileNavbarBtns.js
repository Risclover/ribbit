import React from "react";
import { SearchIcon } from "@/assets";
import { useAuthFlow } from "context";
import { NotificationBell } from "features";
import useCreatePostTarget from "hooks/useCreatePostTarget";
import { TfiPlus } from "react-icons/tfi";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export function MobileNavbarBtns({ setShowSearchScreen }) {
  const target = useCreatePostTarget();
  const user = useSelector((state) => state.session.user);
  const { openLogin } = useAuthFlow();

  return (
    <div className="navbar-buttons">
      {user ? (
        <>
          <button
            className="navbar-button"
            onClick={() => setShowSearchScreen((prev) => !prev)}
          >
            <SearchIcon height="20" width="20" />
          </button>
          <NavLink to={target} className="navbar-button">
            <TfiPlus />
          </NavLink>
          <NotificationBell />
        </>
      ) : (
        <>
          <button
            className="navbar-button"
            onClick={() => setShowSearchScreen((prev) => !prev)}
          >
            <SearchIcon height="20" width="20" />
          </button>
          <button className="navbar-login-btn" onClick={openLogin}>
            Log In
          </button>
        </>
      )}
    </div>
  );
}
