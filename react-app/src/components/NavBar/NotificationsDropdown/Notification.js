import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { IoIosMore } from "react-icons/io";
import { BsArrowReturnRight } from "react-icons/bs";
import moment from "moment";

import { NotificationMenu } from "@/features/Notifications/NotificationMenu";
import { IoChatbox } from "react-icons/io5";
import { getComments } from "store";
import { getAllComments } from "store";
import { markNotificationRead } from "store";
import { FollowerIcon } from "assets/icons/FollowerIcon";
import { CommentReplyIcon } from "assets/icons/CommentReplyIcon";

export function Notification({ notification, onClick }) {
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
    await dispatch(markNotificationRead(notification.id));
  };

  return (
    <>
      {!hideNotification && (
        <NavLink
          to={
            notification?.action === "follow"
              ? `/users/${notification?.actorId}/profile`
              : `/posts/${notification?.resourceId}`
          }
          className={
            notification.isRead ? "notification" : "notification-unread"
          }
          onClick={() => {
            readANotification(notification);
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
                    {moment(notification.createdAt)
                      .locale("en-notif")
                      .fromNow()}{" "}
                  </span>
                </div>
                <div className="notification-message-content"></div>
              </div>
              <button
                aria-label="Open/close notifications"
                className="notification-menu-btn"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setNotificationMenu((prev) => !prev);
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
      )}
    </>
  );
}
