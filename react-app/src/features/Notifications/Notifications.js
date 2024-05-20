import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { VscMailRead } from "react-icons/vsc";
import { VscSettingsGear } from "react-icons/vsc";
import { TfiBell } from "react-icons/tfi";
import moment from "moment";

import { getUserNotifications, readAllNotifications } from "@/store";
import { Notification } from "./Notification";
import SparklyFrog from "@/assets/images/ribbit-frog-sparkly.png";
import "./Notifications.css";
import { usePageSettings } from "@/hooks/usePageSettings";

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

export function Notifications() {
  const dispatch = useDispatch();
  const history = useHistory();

  const notifications = useSelector((state) =>
    Object.values(state.notifications)
  );
  const user = useSelector((state) => state.session.user);

  const notificationsList = notifications.filter(
    (notification) => notification.notificationType !== "message"
  );

  useEffect(() => {
    dispatch(getUserNotifications(user.id));
  }, []);

  const readNotifications = async () => {
    await dispatch(readAllNotifications());
    dispatch(getUserNotifications(user.id));
  };

  usePageSettings({
    documentTitle: "Notifications",
    icon: (
      <div className="nav-left-dropdown-item-icon">
        <TfiBell />
      </div>
    ),
    pageTitle: "Notifications",
  });

  const today = notificationsList.filter(
    (item) => new Date(item.createdAt).getDay() === new Date().getDay()
  );

  const earlier = notifications.filter(
    (item) => new Date(item.createdAt).getDay() !== new Date().getDay()
  );

  today.sort((a, b) => {
    let postA = new Date(a.createdAt);
    let postB = new Date(b.createdAt);
    return postB - postA;
  });

  return (
    <div className="notifications-page">
      <div className="notifications-header">
        <h1>Notifications</h1>
        <div className="notifications-button-bar">
          <ul className="notifications-button-bar-list">
            <li className="notifications-button-bar-item notifications-button-bar-active">
              Activity
            </li>
            <li
              className="notifications-button-bar-item notifications-button-bar-messages"
              onClick={() => history.push("/message/messages")}
            >
              Messages
            </li>
            <li
              className="notifications-button-bar-item"
              onClick={readNotifications}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21.75 9v.906a2.25 2.25 0 0 1-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 0 0 1.183 1.981l6.478 3.488m8.839 2.51-4.66-2.51m0 0-1.023-.55a2.25 2.25 0 0 0-2.134 0l-1.022.55m0 0-4.661 2.51m16.5 1.615a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V8.844a2.25 2.25 0 0 1 1.183-1.981l7.5-4.039a2.25 2.25 0 0 1 2.134 0l7.5 4.039a2.25 2.25 0 0 1 1.183 1.98V19.5Z"
                />
              </svg>
              Mark as read
            </li>
            <li className="notifications-button-bar-item">
              <VscSettingsGear /> Settings
            </li>
          </ul>
        </div>
      </div>
      <div className="notifications-main-wrapper">
        <div className="notifications-main">
          <div className="notifications-spacer"></div>
          <div className="notifications-content">
            {notificationsList.length === 0 ? (
              <div className="no-notifications">
                <img
                  src={SparklyFrog}
                  alt="Sparkly Frog"
                  className="sparkly-frog"
                />
                <h1 className="no-notifications-title">
                  You don't have any activity yet
                </h1>
                <p>
                  That's okay, maybe you just need the right inspiration. Try
                  posting in r/CasualConversation, a popular community for
                  discussion.
                </p>
                <button
                  className="blue-btn-filled no-notifications-btn"
                  onClick={() => {
                    history.push("/c/CasualConversation");
                  }}
                >
                  Visit r/CasualConversation
                </button>
              </div>
            ) : (
              ""
            )}
            {today.length > 0 && (
              <div className="notifications-today">
                <span className="notifications-content-header">Today</span>
                {today
                  .filter((item) => item.notificationType !== "message")
                  .map((notification) => (
                    <Notification notification={notification} />
                  ))}
              </div>
            )}
            {earlier.length > 0 && (
              <div className="notifications-earlier">
                <span className="notifications-content-header">Earlier</span>
                {earlier
                  .filter((item) => item.notificationType !== "message")
                  .map((notification) => (
                    <Notification notification={notification} />
                    // <div className="notification">
                    //   <div className="notification-img"></div>
                    //   <div className="notification-main">
                    //     <div className="notification-top">
                    //       <div className="notification-top-left">
                    //         {notification.message}
                    //       </div>
                    //       <div className="notification-top-right">
                    //         <IoIosMore />
                    //       </div>
                    //     </div>
                    //     <div className="notification-message">
                    //       {notification.content}
                    //     </div>
                    //   </div>
                    // </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
