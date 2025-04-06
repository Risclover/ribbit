import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useOutsideClick } from "@/hooks";
import { unreadNotification } from "store";

export function NotificationMenu({ notification, setNotificationMenu }) {
  const currentUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const wrapperRef = useRef(null);

  useOutsideClick(wrapperRef, () => setNotificationMenu(false));

  const markUnread = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(unreadNotification(notification.id));
  };

  return (
    <div className="notification-menu" ref={wrapperRef}>
      <button className="notification-menu-item" onClick={(e) => markUnread(e)}>
        Mark as unread
      </button>
    </div>
  );
}
