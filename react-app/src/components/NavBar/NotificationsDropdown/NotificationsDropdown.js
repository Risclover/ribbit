import React, { useEffect, useRef, useState } from "react";
import { VscMailRead } from "react-icons/vsc";
import { VscSettingsGear } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserNotifications,
  readAllNotifications,
} from "../../../store/notifications";
import moment from "moment";
import { useHistory } from "react-router-dom";
import HandleClickOutside from "../../HandleClickOutside";
import SparklyFrog from "../../../images/ribbit-frog-sparkly.png";
import Notification from "./Notification";

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
  const wrapperRef = useRef(null);

  const [unreadMsgs, setUnreadMsgs] = useState(
    unread.filter((msg) => msg.type === "message")
  );
  const [notMessages, setNotMessages] = useState();

  const user = useSelector((state) => state.session.user);
  const notifications = useSelector((state) =>
    Object.values(state.notifications)
  );

  useEffect(() => {
    dispatch(getUserNotifications(user?.id));
  }, [dispatch, user?.id]);

  useEffect(() => {
    setNotMessages(
      notifications.filter((notification) => notification.type !== "message")
    );
  }, []);

  const handleReadAll = async () => {
    await dispatch(readAllNotifications());
    dispatch(getUserNotifications(user?.id));
  };

  useEffect(() => {
    document.addEventListener("mousedown", function (e) {
      HandleClickOutside(e, wrapperRef, showDropdown, setShowDropdown);
    });
    return () => {
      document.removeEventListener("mousedown", function (e) {
        HandleClickOutside(e, wrapperRef, showDropdown, setShowDropdown);
      });
    };
  }, [wrapperRef, showDropdown]);

  notifications.sort((a, b) => {
    let postA = new Date(a.createdAt);
    let postB = new Date(b.createdAt);

    return postB - postA;
  });

  return (
    <>
      {showDropdown && (
        <div className="notifications-dropdown" ref={wrapperRef}>
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
                  history.push(`/c/22`);
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
                  notification.type !== "message" && (
                    <Notification
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
