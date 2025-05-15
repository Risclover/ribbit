import { SearchIcon } from "@/assets";
import { NotificationBell } from "features";
import React from "react";
import { TfiBell, TfiPlus } from "react-icons/tfi";
import { NavLink } from "react-router-dom";

export default function MobileNavbarBtns({ setShowSearchScreen }) {
  return (
    <div className="navbar-buttons">
      <button
        className="navbar-button"
        onClick={() => setShowSearchScreen((prev) => !prev)}
      >
        <SearchIcon height="20" width="20" />
      </button>
      <button className="navbar-button">
        <TfiPlus />
      </button>
      <NotificationBell />
    </div>
  );
}
