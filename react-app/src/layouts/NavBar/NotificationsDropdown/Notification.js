import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { IoIosMore } from "react-icons/io";
import { BsArrowReturnRight } from "react-icons/bs";
import moment from "moment";

import {
  deleteNotification,
  getUserNotifications,
  readNotification,
} from "@/store";
import { NotificationMenu } from "@/features/Notifications/NotificationMenu";

export function Notification({ notification, setShowDropdown }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);

  const [notificationMenu, setNotificationMenu] = useState(false);
  const [hideNotification, setHideNotification] = useState(false);
  const [markedUnread, setMarkedUnread] = useState(false);

  const readANotification = async (notification) => {
    await dispatch(readNotification(notification?.id));
    dispatch(getUserNotifications(user?.id));
    if (notification?.type === "post-reply") {
      history.push(`/posts/${notification?.postId}`);
    } else if (notification?.type === "follower") {
      history.push(`/users/${notification?.senderId}/profile`);
    } else if (notification?.type === "welcome") {
      window.open(
        "https://github.com/Risclover/ribbit/wiki/How-to-Use-Ribbit-(User-Manual)",
        "_blank"
      );
    }
    setShowDropdown(false);
  };

  const hideANotification = async () => {
    await dispatch(deleteNotification(notification.id));
    dispatch(getUserNotifications(user.id));
  };

  return (
    <>
      {!hideNotification && (
        <div
          className={notification.read ? "notification" : "notification-unread"}
          onClick={() => readANotification(notification)}
        >
          <div className="notification-item-icon">
            <img src={notification.icon} />
          </div>
          <div className="notification-main">
            <div className="notification-message-head">
              <div className="notification-message-head-txt">
                <span className="notification-message">
                  {notification.message}
                </span>
                <span className="notification-message-head-dot">·</span>
                <span className="notification-date">
                  {moment(notification.createdAt).locale("en-notif").fromNow()}{" "}
                </span>
              </div>
              <button
                className="notification-menu-btn"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setNotificationMenu(!notificationMenu);
                }}
              >
                <IoIosMore />
              </button>
              {notificationMenu && (
                <NotificationMenu
                  type="dropdown"
                  setHideNotification={setHideNotification}
                  setMarkedUnread={setMarkedUnread}
                  notification={notification}
                  setNotificationMenu={setNotificationMenu}
                />
              )}
            </div>
            <div className="notification-content">{notification.content}</div>
            {notification.type === "post-reply" && (
              <button className="blue-btn-unfilled btn-long notification-reply-back">
                <BsArrowReturnRight />
                Reply Back
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
