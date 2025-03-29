import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useOutsideClick } from "@/hooks";

export function NotificationMenu({ notification, setNotificationMenu }) {
  const currentUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const wrapperRef = useRef(null);



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
