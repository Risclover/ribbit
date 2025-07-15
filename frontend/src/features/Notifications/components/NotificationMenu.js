import React, { useRef } from "react";
import { useAppDispatch } from "@/store";
import { useOutsideClick } from "@/hooks";
import { unreadNotification } from "@/store";

export function NotificationMenu({ notification, setNotificationMenu }) {
  const dispatch = useAppDispatch();
  const wrapperRef = useRef(null);

  useOutsideClick(wrapperRef, () => setNotificationMenu(false));

  const markUnread = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(unreadNotification(notification.id));
    setNotificationMenu(false);
  };

  return (
    <div className="notification-menu" ref={wrapperRef}>
      <button className="notification-menu-item" onClick={markUnread}>
        Mark as unread
      </button>
    </div>
  );
}
