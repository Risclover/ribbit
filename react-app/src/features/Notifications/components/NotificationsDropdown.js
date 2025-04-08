import React from "react";
import { NavLink } from "react-router-dom";
import { VscMailRead } from "react-icons/vsc";
import { v4 as uuidv4 } from "uuid";
import { Notification } from "./Notification";
import { useNotificationsDropdown } from "../hooks/useNotificationsDropdown";
import { ribbitLogos } from "@/assets";

export function NotificationsDropdown({
  msgNum,
  setShowDropdown,
  showDropdown,
}) {
  const { notifications, markAllRead } = useNotificationsDropdown();

  if (!showDropdown) return null;

  return (
    <div className="notifications-dropdown">
      <div className="notifications-dropdown-head">
        <p>Notifications</p>
        <div className="notifications-dropdown-head-right">
          <div className="notifications-dropdown-head-msg-box">
            <NavLink
              className="notifications-dropdown-head-messages-btn"
              to={msgNum > 0 ? "/message/unread" : "/message/messages"}
              onClick={() => setShowDropdown(false)}
            >
              Messages{" "}
              {msgNum > 0 && (
                <div className="notification-number-messages">{msgNum}</div>
              )}
            </NavLink>
          </div>
          <button
            aria-label="Mark all as read"
            className="notifications-dropdown-head-btn"
            onClick={markAllRead}
          >
            <VscMailRead />
          </button>
        </div>
      </div>
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
            That's okay, maybe you just need the right inspiration. Try posting
            in r/CasualConversation, a popular community for discussion.
          </p>
          <NavLink
            to="/c/CasualConversation"
            className="blue-btn-filled no-notifications-btn"
            onClick={() => setShowDropdown(false)}
          >
            Visit r/CasualConversation
          </NavLink>
        </div>
      ) : (
        <>
          <div className="notifications-dropdown-main">
            {notifications
              .slice(0, 5) // only show the top 5
              .map((notification) => (
                <Notification
                  key={uuidv4()}
                  notification={notification}
                  onClick={() => setShowDropdown(false)}
                />
              ))}
          </div>
          <NavLink
            to="/notifications"
            className="notifications-dropdown-footer"
            onClick={() => setShowDropdown(false)}
          >
            SEE ALL
          </NavLink>
        </>
      )}
    </div>
  );
}
