import React, { useEffect, useRef, useState } from "react";
import { IoIosMore } from "react-icons/io";
import { IoChatbox } from "react-icons/io5";

import moment from "moment";
import NotificationMenu from "./NotificationMenu";
import HandleClickOutside from "../../components/HandleClickOutside";
import { useDispatch, useSelector } from "react-redux";
import { readNotification } from "../../store/notifications";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { getUserNotifications } from "../../store/notifications";

export default function Notification({ notification }) {
  const wrapperRef = useRef();
  const dispatch = useDispatch();
  const history = useHistory();

  const [notificationMenu, setNotificationMenu] = useState(false);
  const [hideNotification, setHideNotification] = useState(false);
  const [markedUnread, setMarkedUnread] = useState(!notification.read);
  const [readAll, setReadAll] = useState(false);

  const currentUser = useSelector((state) => state.session.user);

  useEffect(() => {
    setMarkedUnread(!notification.read);
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", function (e) {
      HandleClickOutside(e, wrapperRef, notificationMenu, setNotificationMenu);
    });
    return () => {
      document.removeEventListener("mousedown", function (e) {
        HandleClickOutside(
          e,
          wrapperRef,
          notificationMenu,
          setNotificationMenu
        );
      });
    };
  }, [wrapperRef, setNotificationMenu, notificationMenu]);

  const markNotificationRead = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    await dispatch(readNotification(notification.id));
    if (notification.type === "follower") {
      history.push(`/users/${notification.senderId}/profile`);
    } else if (notification.type === "post-reply") {
      history.push(`/posts/${notification.postId}`);
    } else if (notification.type === "welcome") {
      window.open(
        "https://github.com/Risclover/ribbit/wiki/How-to-Use-Ribbit-(User-Manual)",
        "_blank"
      );
    }
    dispatch(getUserNotifications(currentUser.id));
  };

  return (
    <>
      {!hideNotification && (
        <div
          className={
            !notification.read
              ? "notification unread-notification"
              : "notification"
          }
          ref={wrapperRef}
          onClick={(e) => markNotificationRead(e)}
        >
          <div className="notification-img">
            <img src={notification.icon} className="notification-icon" />
            <span className="notification-icon-bubble">
              <IoChatbox />
            </span>
          </div>
          <div className="notification-content">
            <div className="notification-top">
              <div className="notification-top-msg">
                {notification.message}{" "}
                <span className="notification-topbar-dot"> · </span>{" "}
                <span className="notification-date">
                  {moment(notification.createdAt).locale("en-notif").fromNow()}
                </span>
              </div>
              <div className="notification-top-right">
                <button
                  className="notification-top-right-menu-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setNotificationMenu(!notificationMenu);
                  }}
                >
                  <IoIosMore />
                </button>
                {notificationMenu && (
                  <NotificationMenu
                    setNotificationMenu={setNotificationMenu}
                    notificationMenu={notificationMenu}
                    notification={notification}
                    setMarkedUnread={setMarkedUnread}
                    setHideNotification={setHideNotification}
                  />
                )}
              </div>
            </div>
            <div className="notification-bottom">{notification.content}</div>
          </div>
        </div>
      )}
    </>
  );
}
