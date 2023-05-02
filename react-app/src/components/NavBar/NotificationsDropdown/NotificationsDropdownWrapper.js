import React, { useEffect, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";

import "./NotificationsDropdown.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserNotifications,
  readAllNotifications,
  readNotification,
} from "../../../store/notifications";
import NotificationsDropdown from "./NotificationsDropdown";

export default function NotificationsDropdownWrapper() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const notificationsList = useSelector((state) =>
    Object.values(state.notifications)
  );

  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  console.log("notificationsList:", notificationsList);
  useEffect(() => {
    let list = [];
    for (let notification of notificationsList) {
      console.log(notification.id);
      if (!notification.read) {
        list.push(notification.id);
      }
    }

    setNotifications(list);
  }, []);

  console.log("notifications!:", notifications);

  const handleOpenDropdown = (e) => {
    e.preventDefault();

    setShowDropdown(!showDropdown);
    dispatch(readNotification(notificationsList[0].id));
  };

  return (
    <div className="notifications-dropdown-wrapper">
      <span className="notification-icon" onClick={handleOpenDropdown}>
        <IoMdNotificationsOutline />
        <div className="notification-number">{notifications.length}</div>
      </span>
      {showDropdown && <NotificationsDropdown />}
    </div>
  );
}
