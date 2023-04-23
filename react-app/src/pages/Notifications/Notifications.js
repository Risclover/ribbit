import React from "react";
import { VscMailRead } from "react-icons/vsc";
import { VscSettingsGear } from "react-icons/vsc";
import { NavLink } from "react-router-dom";

import "./Notifications.css";

export default function Notifications() {
  return (
    <div className="notifications-page">
      <div className="notifications-header">
        <h1>Notifications</h1>
        <div className="notifications-button-bar">
          <ul className="notifications-button-bar-list">
            <li className="notifications-button-bar-item notifications-button-bar-active">
              Activity
            </li>
            <li className="notifications-button-bar-item notifications-button-bar-messages">
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
          </div>
        </div>
      </div>
    </div>
  );
}
