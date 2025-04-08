import React from "react";
import { NavLink } from "react-router-dom";
import { VscMailRead } from "react-icons/vsc";
import { TfiBell } from "react-icons/tfi";
import { v4 as uuidv4 } from "uuid";

import { Notification } from "@/features";
import { usePageSettings } from "@/hooks/usePageSettings";
import { useNotificationsDropdown } from "@/features/Notifications/hooks";
import { groupAndSortNotifications } from "@/features/Notifications/utils";
import { ribbitLogos } from "@/assets";

export function NotificationsPage() {
  usePageSettings({
    documentTitle: "Notifications",
    icon: (
      <div className="nav-left-dropdown-item-icon">
        <TfiBell />
      </div>
    ),
    pageTitle: "Notifications",
  });

  const { markAllRead, notifications, today, earlier } =
    useNotificationsDropdown();

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
              <NavLink to="/message/messages">Messages</NavLink>
            </li>
            <li
              className="notifications-button-bar-item"
              onClick={(e) => markAllRead(e)}
            >
              <VscMailRead />
              Mark as read
            </li>
          </ul>
        </div>
      </div>
      <div className="notifications-main-wrapper">
        <div className="notifications-main">
          <div className="notifications-content">
            {notifications.length === 0 ? (
              <div className="no-notifications">
                <img
                  src={ribbitLogos.sparkle}
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
                <NavLink
                  to="/c/CasualConversation"
                  className="blue-btn-filled no-notifications-btn"
                >
                  Visit r/CasualConversation
                </NavLink>
              </div>
            ) : (
              ""
            )}
            {today.length > 0 && (
              <div>
                <span className="notifications-content-header">Today</span>
                {today.map((notification) => (
                  <Notification
                    key={uuidv4()}
                    notification={notification}
                    onClick={() => {
                      return;
                    }}
                  />
                ))}

                <div className="notifications-spacer"></div>
              </div>
            )}
            {earlier.length > 0 && (
              <div>
                <span className="notifications-content-header">Earlier</span>
                {earlier.map((notification) => (
                  <Notification
                    key={uuidv4()}
                    notification={notification}
                    onClick={() => {
                      return;
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
