import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { NavLink } from "react-router-dom";
import { IoIosMore } from "react-icons/io";
import { IoChatbox } from "react-icons/io5";
import { BsArrowReturnRight } from "react-icons/bs";
import moment from "moment";

import { NotificationMenu } from "@/features";
import { markNotificationRead } from "@/store";
import { FollowerIcon, CommentReplyIcon } from "@/assets";

/**
 * A single notification item in the Notifications menu/page.
 * - notification: a single notification object from state
 * - onClick: Either an empty function that returns, or setShowDropdown(false) (to close the Notifications dropdown menu)
 */
export function Notification({ notification, onClick }) {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.users);
  const actor = users[notification?.actorId];

  const [notificationMenu, setNotificationMenu] = useState(false);

  const handleReadNotification = async (notification) => {
    await dispatch(markNotificationRead(notification.id));
  };

  const handleOpenNotificationMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setNotificationMenu((prev) => !prev);
  };

  return (
    <NavLink
      to={
        notification?.action === "follow"
          ? `/users/${notification?.actorId}/profile`
          : `/posts/${notification?.resourceId}`
      }
      className={notification.isRead ? "notification" : "notification-unread"}
      onClick={() => {
        handleReadNotification(notification);
        onClick();
      }}
    >
      <div className="notification-item-icon">
        <img src={actor?.profileImg} />
        <span className="notification-icon-bubble">
          {notification?.action === "post_reply" ? (
            <IoChatbox />
          ) : notification?.action === "comment_reply" ? (
            <CommentReplyIcon />
          ) : (
            <FollowerIcon />
          )}
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
                {moment
                  .utc(notification.createdAt)
                  .local()
                  .locale("en-notif")
                  .fromNow()}{" "}
              </span>
            </div>
            <div className="notification-message-content"></div>
          </div>
          <button
            aria-label="Open/close notifications"
            className="notification-menu-btn"
            onClick={handleOpenNotificationMenu}
          >
            <IoIosMore />
          </button>
          {notificationMenu && (
            <NotificationMenu
              notification={notification}
              setNotificationMenu={setNotificationMenu}
            />
          )}
        </div>
        <div className="notification-content">
          {notification.resourceContent}
        </div>
        {notification.action === "post_reply" && (
          <button className="blue-btn-unfilled btn-long notification-reply-back">
            <BsArrowReturnRight />
            Reply Back
          </button>
        )}
      </div>
    </NavLink>
  );
}
