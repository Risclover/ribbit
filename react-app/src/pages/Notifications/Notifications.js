import React, { useEffect } from "react";
import { VscMailRead } from "react-icons/vsc";
import { VscSettingsGear } from "react-icons/vsc";
import { NavLink, useHistory } from "react-router-dom";
import { IoIosMore } from "react-icons/io";

import "./Notifications.css";
import { useDispatch, useSelector } from "react-redux";
import { getUserNotifications } from "../../store/notifications";

export default function Notifications() {
  const dispatch = useDispatch();
  const history = useHistory();

  const notifications = useSelector((state) =>
    Object.values(state.notifications)
  );
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getUserNotifications(user.id));
  }, []);

  console.log("notifications:", notifications);

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
            <li className="notifications-button-bar-item">
              <VscMailRead /> Mark as read
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
            <span className="notifications-content-header">Today</span>
            {notifications.map((notification) => (
              <div className="notification">
                <div className="notification-img"></div>
                <div className="notification-main">
                  <div className="notification-top">
                    <div className="notification-top-left">
                      {notification.message}
                    </div>
                    <div className="notification-top-right">
                      <IoIosMore />
                    </div>
                  </div>
                  <div className="notification-message">
                    {notification.content}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
