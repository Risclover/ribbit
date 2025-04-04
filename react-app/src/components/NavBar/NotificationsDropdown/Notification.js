import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { IoIosMore } from "react-icons/io";
import { BsArrowReturnRight } from "react-icons/bs";
import moment from "moment";

import { NotificationMenu } from "@/features/Notifications/NotificationMenu";
import { IoChatbox } from "react-icons/io5";

export function Notification({ notification, setShowDropdown }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const users = useSelector((state) => state.users);
  const posts = useSelector((state) => state.posts);
  const comments = useSelector((state) => state.comments);
  const actor = users[notification?.actorId];

  const [notificationMenu, setNotificationMenu] = useState(false);
  const [hideNotification, setHideNotification] = useState(false);

  const readANotification = async (notification) => {
    if (notification?.action === "post_reply") {
      history.push(`/posts/${notification?.resourceId}`);
    } else if (notification?.action === "follower") {
      history.push(`/users/${notification?.actorId}/profile`);
    } else if (notification?.action === "comment_reply") {
      history.push(`/posts/${notification?.resourceId}`);
      window.open(
        "https://github.com/Risclover/ribbit/wiki/How-to-Use-Ribbit-(User-Manual)",
        "_blank"
      );
    }
    setShowDropdown(false);
  };

  return (
    <>
      {!hideNotification && (
        <div
          className={
            notification.isRead ? "notification" : "notification-unread"
          }
          onClick={() => readANotification(notification)}
        >
          <div className="notification-item-icon">
            <img src={actor?.profileImg} />
            <span className="notification-icon-bubble">
              <IoChatbox />
            </span>
          </div>
          <div className="notification-main">
            <div className="notification-message-head">
              <div className="notification-message-head-txt">
                <div className="notification-text">
                  <span className="notification-message">
                    {notification.message}
                  </span>
                  <span className="notification-message-head-dot">·</span>
                  <span className="notification-date">
                    {moment(notification.createdAt)
                      .locale("en-notif")
                      .fromNow()}{" "}
                  </span>
                </div>
                <div className="notification-message-content">
                  {notification.resourceContent || ""}
                </div>
              </div>
              <button
                aria-label="Open/close notifications"
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
                  notification={notification}
                  setNotificationMenu={setNotificationMenu}
                />
              )}
            </div>
            <div className="notification-content">{notification.content}</div>
            {notification.action === "post_reply" && (
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
