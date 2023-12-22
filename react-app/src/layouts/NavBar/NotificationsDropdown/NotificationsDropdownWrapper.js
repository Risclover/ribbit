import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { TfiBell } from "react-icons/tfi";

import { NotificationsDropdown } from "./NotificationsDropdown";
import { HandleClickOutside } from "../../../utils/HandleClickOutside";
import "../NavBar.css";
import "./NotificationsDropdown.css";

export function NotificationsDropdownWrapper({ msgNum, notificationNum }) {
  const wrapperRef = useRef(null);

  const notificationsList = useSelector((state) =>
    Object.values(state.notifications)
  );

  const [showTooltip, setShowTooltip] = useState(false);
  const [notifications, setNotifications] = useState(
    notificationsList.filter((notification) => notification.read === false)
  );
  const [showDropdown, setShowDropdown] = useState(false);

  // useEffect(() => {
  //   document.addEventListener("mousedown", function (e) {
  //     HandleClickOutside(e, wrapperRef, showDropdown, setShowDropdown);
  //   });
  //   return () => {
  //     document.removeEventListener("mousedown", function (e) {
  //       HandleClickOutside(e, wrapperRef, showDropdown, setShowDropdown);
  //     });
  //   };
  // }, [wrapperRef, showDropdown]);

  const handleOpenDropdown = (e) => {
    e.preventDefault();
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="notifications-dropdown-wrapper">
      <span
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
      </span>
      {showDropdown && (
        <NotificationsDropdown
          msgNum={msgNum}
          setShowDropdown={setShowDropdown}
          showDropdown={showDropdown}
          unread={notifications}
        />
      )}
    </div>
  );
}
