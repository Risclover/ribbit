import { useEffect, MouseEvent, KeyboardEvent } from "react";
import { NavLink } from "react-router-dom";
import { VscMailRead } from "react-icons/vsc";
import { TfiBell } from "react-icons/tfi";
import { v4 as uuidv4 } from "uuid";

import { Notification, NoNotifications } from "@/features";
import { usePageSettings } from "@/hooks/usePageSettings";
import { useNotificationsDropdown } from "@/features/Notifications/hooks";
import { useAppDispatch } from "@/store";
import { readAllNotifications, markAllSeen } from "@/store";

/* ------------------------------------------------------------------ */
/*  Very loose shape for notifications – extend with real fields later */
type NotificationData = Record<string, unknown>;
/* ------------------------------------------------------------------ */

export function NotificationsPage(): JSX.Element {
  const dispatch = useAppDispatch();

  /* ----- <head> metadata ----- */
  usePageSettings({
    documentTitle: "Notifications",
    icon: (
      <div className="nav-left-dropdown-item-icon">
        <TfiBell />
      </div>
    ),
    pageTitle: "Notifications",
  });

  /* ----- mark all as “seen” on mount ----- */
  useEffect(() => {
    dispatch(markAllSeen());
  }, [dispatch]);

  /* ----- dropdown-hook ----- */
  const {
    markAllRead,
    notifications,
    today,
    earlier,
  }: {
    markAllRead: (e: MouseEvent | KeyboardEvent) => void;
    notifications: NotificationData[];
    today: NotificationData[];
    earlier: NotificationData[];
  } = useNotificationsDropdown();

  /* ----- render ----- */
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
              onClick={markAllRead}
              onKeyDown={(e) => (e.key === "Enter" ? markAllRead(e) : null)}
              tabIndex={0}
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
            {notifications.length === 0 && (
              <NoNotifications
                onClick={() => {
                  return;
                }}
              />
            )}

            {today.length > 0 && (
              <>
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
                <div className="notifications-spacer" />
              </>
            )}

            {earlier.length > 0 && (
              <>
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
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
