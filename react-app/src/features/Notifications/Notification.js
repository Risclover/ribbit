import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { IoIosMore } from "react-icons/io";
import { IoChatbox } from "react-icons/io5";
import moment from "moment";

import { NotificationMenu } from "./NotificationMenu";
import { useOutsideClick } from "@/hooks";
import { FollowerIcon } from "assets/icons/FollowerIcon";

export function Notification({ notification }) {
  const wrapperRef = useRef();
  const dispatch = useDispatch();
  const history = useHistory();
  const users = useSelector((state) => state.users);

  const actor = users[notification?.actorId];
  const [notificationMenu, setNotificationMenu] = useState(false);
  const [hideNotification, setHideNotification] = useState(false);

  const currentUser = useSelector((state) => state.session.user);

  useOutsideClick(wrapperRef, () => setNotificationMenu(false));

  const markNotificationRead = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (notification.notificationType === "follower") {
      history.push(`/users/${notification.senderId}/profile`);
    } else if (notification.notificationType === "post-reply") {
      history.push(`/posts/${notification.postId}`);
    } else if (notification.notificationType === "welcome") {
      window.open(
        "https://github.com/Risclover/ribbit/wiki/How-to-Use-Ribbit-(User-Manual)",
        "_blank"
      );
    }
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
            <img src={actor.profileImg} className="notification-icon" />
            <span className="notification-icon-bubble">
              <FollowerIcon />
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
                  aria-label="Notifications"
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
                    setHideNotification={setHideNotification}
                  />
                )}
              </div>
            </div>
            <div className="notification-bottom">
              {notification.resourceContent}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
