import React from "react";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { VscSettingsGear } from "react-icons/vsc";

export default function Notifications() {
  return (
    <div className="notifications-page">
      <div className="notifications-header">
        <h1>Notifications</h1>
        <nav className="notifications-button-bar">
          <ul className="notifications-button-bar-list">
            <li className="notifications-button-bar-item">Activity</li>
            <li className="notifications-button-bar-item">Messages</li>
            <li className="notifications-button-bar-item">
              <MdOutlineMarkEmailRead /> Mark as read
            </li>
            <li className="notifications-button-bar-item">
              <VscSettingsGear /> Settings
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
