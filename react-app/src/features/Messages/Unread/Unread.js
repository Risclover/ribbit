import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MessageHead from "../MessageHead";
import { useHistory } from "react-router-dom";
import MessageContentMenu from "../MessageContentMenu";
import MessageReply from "../MessageReply";

import "./Unread.css";
import { getThreads, readAllMessages } from "../../../store/threads";
import { readAllNotifications } from "../../../store/notifications";
import { getMessages } from "../../../store/messages";

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

  useEffect(() => {
    // dispatch(getThreads());
    dispatch(readAllMessages());
    dispatch(getMessages());
  }, []);

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
    <div className="messages-page">
      <MessageHead />
      <div className="messages-content">
        <MessageContentMenu active="Unread" />
        {unreadMsgs.length > 0 &&
          unreadMsgs.map((msg) => (
            <div className="unread-message-wrapper">
              <div className="unread-message">
                <div className="unread-message-author"></div>
                <div className="unread-message-content">{msg.content}</div>
                <MessageReply />
              </div>
            </div>
          ))}
        {unreadMsgs.length === 0 && (
          <div className="messages-content-nothing">
            there doesn't seem to be anything here
          </div>
        )}
      </div>
    </div>
  );
}
