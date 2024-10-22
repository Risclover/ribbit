import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  deleteNotification,
  getUserNotifications,
  unreadNotification,
} from "@/store";
import { useOutsideClick } from "hooks";

export function NotificationMenu({ notification, setNotificationMenu }) {
  const currentUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const wrapperRef = useRef(null);

  const markUnread = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    await dispatch(unreadNotification(notification.id));
    dispatch(getUserNotifications(currentUser?.id));
    setNotificationMenu(false);
  };

  const hideANotification = async () => {
    await dispatch(deleteNotification(notification.id));
    dispatch(getUserNotifications(currentUser?.id));
  };

  useOutsideClick(wrapperRef, () => setNotificationMenu(false));

  return (
    <div className="notification-menu" ref={wrapperRef}>
      <div
        className="notification-menu-item"
        onClick={(e) => {
          e.stopPropagation();
          setNotificationMenu(false);
          hideANotification();
        }}
      >
        Hide this notification
      </div>
      <div className="notification-menu-item" onClick={(e) => markUnread(e)}>
        Mark as unread
      </div>
    </div>
  );
}
