import { SearchIcon } from "@/assets";
import { NotificationBell } from "features";
import useCreatePostTarget from "hooks/useCreatePostTarget";
import React from "react";
import { TfiPlus } from "react-icons/tfi";
import { NavLink } from "react-router-dom";

export default function MobileNavbarBtns({ setShowSearchScreen }) {
  const target = useCreatePostTarget();

  return (
    <div className="navbar-buttons">
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
    </div>
  );
}
