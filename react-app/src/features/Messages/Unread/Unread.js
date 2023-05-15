import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MessageHead from "../MessageHead";
import { useHistory } from "react-router-dom";
import MessageContentMenu from "../MessageContentMenu";
import MessageReply from "../MessageReply";
import { getThreads, readAllMessages } from "../../../store/threads";
import { readAllNotifications } from "../../../store/notifications";
import { getMessages } from "../../../store/messages";
import InboxMessage from "../Inbox/InboxMessage";
import "../Inbox/Inbox.css";

export default function Unread({ setPageTitle }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const currentUser = useSelector((state) => state.session.user);
  const threadsList = useSelector((state) => Object.values(state.threads));
  const messages = useSelector((state) => Object.values(state.messages));
  const unreadMsgs = messages.filter((message) => message.read === false);
  const notifications = useSelector((state) =>
    Object.values(state.notifications)
  );

  const [extended, setExtended] = useState(true);
  const [markUnread, setMarkUnread] = useState(false);

  useEffect(() => {
    dispatch(readAllMessages());
    // dispatch(getThreads());
  }, [dispatch]);

  useEffect(() => {
    document.title = "Messages: Unread";
    setPageTitle(
      <div className="nav-left-dropdown-face-title">
        <img
          src={currentUser?.profile_img}
          className="nav-left-dropdown-item-icon item-icon-circle"
          alt="User"
        />
        <span className="nav-left-dropdown-item">Messages</span>
      </div>
    );
  }, [setPageTitle, currentUser?.profile_img]);

  return (
    <div className="inbox-messages-page">
      <MessageHead />
      <div className="inbox-messages-content">
        <MessageContentMenu active="Unread" />
        <div className="inbox-messages">
          {unreadMsgs.length > 0 &&
            unreadMsgs.map((msg) => (
              <InboxMessage
                marked={true}
                message={msg}
                currentUser={currentUser}
                expanded={extended}
              />
            ))}
        </div>
        {unreadMsgs.length === 0 && (
          <div className="messages-content-nothing">
            there doesn't seem to be anything here
          </div>
        )}
      </div>
    </div>
  );
}
