import React from "react";
import { useHistory } from "react-router-dom";
import { TfiPlus } from "react-icons/tfi";
import { BsChatDots } from "react-icons/bs";
import { NotificationBell } from "@/features";
import { AllPostsIcon } from "@/assets";
import { useSelector } from "react-redux";

export function NavBarBtns({ showTooltip, setShowTooltip, handleOpenChat }) {
  const history = useHistory();
  const user = useSelector((state) => state.session.user);

  return (
    <div className="navbar-buttons">
      <button className="navbar-button" onClick={() => history.push("/all")}>
        <AllPostsIcon />
        {showTooltip && <span className="navbtn-tooltiptext">/c/All</span>}
      </button>
      <button
        className="navbar-button"
        onMouseEnter={() => setTimeout(() => setShowTooltip(true), 500)}
        onMouseLeave={() => setShowTooltip(false)}
        onClick={handleOpenChat}
      >
        <BsChatDots />
        {showTooltip && <span className="navbtn-tooltiptext">Chat</span>}
      </button>
      {user && (
        <div className="notification-wrapper">
          <NotificationBell />
        </div>
      )}
      <button
        className="navbar-button"
        onClick={() => history.push("/submit")}
        onMouseEnter={() => setTimeout(() => setShowTooltip(true), 500)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <TfiPlus />
        {showTooltip && (
          <span className="navbtn-tooltiptext text2">Create Post</span>
        )}
      </button>
    </div>
  );
}
