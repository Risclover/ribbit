import React, { useState } from "react";
import { useSelector } from "react-redux";
import { TfiBell } from "react-icons/tfi";

import { NotificationsDropdown } from "./NotificationsDropdown";
import "../NavBar.css";
import "./NotificationsDropdown.css";

export function NotificationsDropdownWrapper({ msgNum, notificationNum }) {
  const notificationsList = useSelector((state) =>
    Object.values(state.notifications)
  );

  const [showTooltip, setShowTooltip] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleOpenDropdown = (e) => {
    e.preventDefault();
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="notifications-dropdown-wrapper">
      <button
        className="navbar-button"
        onClick={handleOpenDropdown}
        onMouseEnter={() => setTimeout(() => setShowTooltip(true), 500)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <TfiBell />
        {showTooltip && (
          <span className="navbtn-tooltiptext text2">Notifications</span>
        )}
        {notificationNum > 0 && (
          <div className="notification-number">{notificationNum}</div>
        )}
      </button>
      {showDropdown && (
        <NotificationsDropdown
          msgNum={msgNum}
          setShowDropdown={setShowDropdown}
          showDropdown={showDropdown}
          unread={notificationsList.filter(
            (notification) => notification.read === false
          )}
        />
      )}
    </div>
  );
}
