import React, { useEffect, useRef, useState } from "react";
import { VscMailRead } from "react-icons/vsc";
import { VscSettingsGear } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserNotifications,
  readAllNotifications,
  readNotification,
} from "../../../store/notifications";
import moment from "moment";
import { IoIosMore } from "react-icons/io";
import { BsArrowReturnRight } from "react-icons/bs";
import { NavLink, useHistory } from "react-router-dom";
import HandleClickOutside from "../../HandleClickOutside";

moment.updateLocale("en-notif", {
  relativeTime: {
    future: (diff) => (diff === "just now" ? diff : `in ${diff}`),
    past: (diff) => (diff === "just now" ? diff : `${diff}`),
    s: "just now",
    ss: "just now",
    m: "1m",
    mm: "%dm",
    h: "1h",
    hh: "%dh",
    d: "1d",
    dd: "%dd",
    M: "1mo",
    MM: "%dmo",
    y: "1y",
    yy: "%dy",
  },
});

export default function NotificationsDropdown({
  msgNum,
  unread,
  setShowDropdown,
  showDropdown,
}) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [unreadMsgs, setUnreadMsgs] = useState(
    unread.filter((msg) => msg.type === "message")
  );

  const user = useSelector((state) => state.session.user);
  const notifications = useSelector((state) =>
    Object.values(state.notifications)
  );

  useEffect(() => {
    dispatch(getUserNotifications(user?.id));
  }, [dispatch, user?.id]);

  const readANotification = async (notification) => {
    const data = await dispatch(readNotification(notification?.id));
    console.log("data", data);
    dispatch(getUserNotifications(user?.id));
    if (notification?.type === "post-reply") {
      history.push(`/posts/${notification?.postId}`);
    } else if (notification?.type === "follower") {
      history.push(`/users/${notification?.senderId}/profile`);
    }
    setShowDropdown(false);
  };

  const handleReadAll = async () => {
    const data = await dispatch(readAllNotifications());
    console.log("data", data);
    dispatch(getUserNotifications(user?.id));
  };

  notifications.sort((a, b) => {
    let postA = new Date(a.createdAt);
    let postB = new Date(b.createdAt);

    return postB - postA;
  });

  return (
    <div className="notifications-dropdown">
      <div className="notifications-dropdown-head">
        <p>Notifications</p>
        <div className="notifications-dropdown-head-right">
          <div className="notifications-dropdown-head-msg-box">
            <span
              className="notifications-dropdown-head-messages-btn"
              onClick={() => {
                setShowDropdown(false);
                msgNum > 0
                  ? history.push("/message/unread")
                  : history.push("/message/messages");
              }}
            >
              Messages{" "}
              {msgNum > 0 && (
                <div
                  className={
                    msgNum > 0
                      ? "notification-number-messages"
                      : "notification-number"
                  }
                >
                  {msgNum}
                </div>
              )}
            </span>
          </div>
          <button
            className="notifications-dropdown-head-btn"
            onClick={handleReadAll}
          >
            <VscMailRead />
          </button>
          <button className="notifications-dropdown-head-btn">
            <VscSettingsGear />
          </button>
        </div>
      </div>
      <div className="notifications-dropdown-main">
        {notifications.slice(0, 6).map(
          (notification) =>
            notification.type !== "message" && (
              <div
                className={
                  notification.read ? "notification" : "notification-unread"
                }
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
                        {moment(notification.createdAt)
                          .locale("en-notif")
                          .fromNow()}{" "}
                      </span>
                    </div>
                    <button className="notification-menu-btn">
                      <IoIosMore />
                    </button>
                  </div>
                  <div className="notification-content">
                    {notification.content}
                  </div>
                  {notification.type === "post-reply" && (
                    <button className="blue-btn-unfilled btn-long notification-reply-back">
                      <BsArrowReturnRight />
                      Reply Back
                    </button>
                  )}
                </div>
              </div>
            )
        )}
      </div>
      <div
        className="notifications-dropdown-footer"
        onClick={() => {
          setShowDropdown(false);
          history.push("/notifications");
        }}
      >
        SEE ALL
      </div>
    </div>
  );
}
