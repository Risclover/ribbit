import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MessageContentMenu from "../MessageContentMenu";
import MessageHead from "../MessageHead";
import { getMessages } from "../../../store/messages";
import moment from "moment";
import MessageReply from "../MessageReply";
import "./Inbox.css";
import { getThreads } from "../../../store/threads";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import InboxMessage from "./InboxMessage";
import PostReply from "../PostReplies/PostReply";
import Message from "../Message";

export default function Inbox({ setPageTitle }) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  let messages = useSelector((state) => Object.values(state.messages));
  const threads = useSelector((state) => state.threads);
  const notifications = useSelector((state) =>
    Object.values(state.notifications)
  );

  const [expanded, setExpanded] = useState(true);

  const messageList = messages.concat(
    notifications.filter((item) => item.type !== "message")
  );

  useEffect(() => {
    dispatch(getThreads());
    dispatch(getMessages());
  }, [dispatch]);

  useEffect(() => {
    document.title = "inbox-messages: Inbox";
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

  messageList.sort((a, b) => {
    let msgA = new Date(a.createdAt);
    let msgB = new Date(b.createdAt);
    return msgB - msgA;
  });

  return (
    <div className="inbox-messages-page">
      <MessageHead />
      <div className="inbox-messages-content">
        <MessageContentMenu active="Inbox" />
        <div className="inbox-messages">
          {messageList.map((message) =>
            message.hasOwnProperty("threadId") ? (
              <InboxMessage
                currentUser={currentUser}
                item={threads[message.threadId]}
                message={message}
                expanded={expanded}
              />
            ) : message.hasOwnProperty("title") ? (
              <PostReply notification={message} />
            ) : (
              ""
            )
          )}
        </div>
        {messages.length === 0 && (
          <div className="inbox-messages-content-nothing">
            there doesn't seem to be anything here
          </div>
        )}
      </div>
    </div>
  );
}
