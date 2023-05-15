import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteNotification,
  getUserNotifications,
  unreadNotification,
} from "../../store/notifications";
import HandleClickOutside from "../../components/HandleClickOutside";

export default function NotificationMenu({
  setHideNotification,
  setMarkedUnread,
  notification,
  notificationMenu,
  setNotificationMenu,
}) {
  const currentUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const wrapperRef = useRef(null);

  const markUnread = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    await dispatch(unreadNotification(notification.id));
    dispatch(getUserNotifications(currentUser.id));
    setNotificationMenu(false);
    setMarkedUnread(true);
  };

  const hideANotification = async () => {
    await dispatch(deleteNotification(notification.id));
    dispatch(getUserNotifications(currentUser.id));
  };

  useEffect(() => {
    document.addEventListener("mousedown", function (e) {
      HandleClickOutside(e, wrapperRef, notificationMenu, setNotificationMenu);
    });
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", function (e) {
        HandleClickOutside(
          e,
          wrapperRef,
          notificationMenu,
          setNotificationMenu
        );
      });
    };
  }, [wrapperRef, setNotificationMenu]);

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
