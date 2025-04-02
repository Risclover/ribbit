import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { VscMailRead } from "react-icons/vsc";
import { VscSettingsGear } from "react-icons/vsc";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";

import { Notification } from "@/components";
import SparklyFrog from "@/assets/images/ribbit-frog-sparkly.png";
import { useOutsideClick } from "hooks";

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

export function NotificationsDropdown({
  msgNum,
  unread,
  setShowDropdown,
  showDropdown,
}) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [unreadMsgs, setUnreadMsgs] = useState(
    unread.filter((msg) => msg.notificationType === "message")
  );
  const [notMessages, setNotMessages] = useState();

  const user = useSelector((state) => state.session.user);
  const notifications = useSelector((state) =>
    Object.values(state.notifications)
  );

  useEffect(() => {
    setNotMessages(
      notifications.filter(
        (notification) => notification.notificationType !== "message"
      )
    );
  }, []);

  notifications.sort((a, b) => {
    let postA = new Date(a.createdAt);
    let postB = new Date(b.createdAt);

    return postB - postA;
  });

  return (
    <>
      {showDropdown && (
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
                aria-label="Mark all as 'read'"
                className="notifications-dropdown-head-btn"
              >
                <VscMailRead />
              </button>
              <button
                aria-label="Open notifications settings"
                className="notifications-dropdown-head-btn"
              >
                <VscSettingsGear />
              </button>
            </div>
          </div>
          {notMessages?.length === 0 && (
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
                  setShowDropdown(false);
                  history.push("/c/CasualConversation");
                }}
              >
                Visit r/CasualConversation
              </button>
            </div>
          )}
          <div className="notifications-dropdown-main">
            {notifications
              .slice(0, 5)
              .map(
                (notification) =>
                  notification.notificationType !== "message" && (
                    <Notification
                      key={uuidv4()}
                      notification={notification}
                      setShowDropdown={setShowDropdown}
                    />
                  )
              )}
          </div>
          {notMessages?.length > 0 && (
            <div
              className="notifications-dropdown-footer"
              onClick={() => {
                setShowDropdown(false);
                history.push("/notifications");
              }}
            >
              SEE ALL
            </div>
          )}
        </div>
      )}
    </>
  );
}
