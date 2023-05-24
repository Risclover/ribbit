import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MessageContentMenu from "../MessageContentMenu";
import MessageHead from "../MessageHead";
import { getMessages } from "../../../store/messages";
import "./Inbox.css";
import { getThreads } from "../../../store/threads";
import InboxMessage from "./InboxMessage";
import PostReply from "../PostReplies/PostReply";

export default function Inbox({ setPageTitle, setPageIcon }) {
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
    setPageIcon(
      <img
        src={currentUser?.profile_img}
        className="nav-left-dropdown-item-icon item-icon-circle"
        alt="User"
      />
    );
    setPageTitle(<span className="nav-left-dropdown-item">Messages</span>);
  }, [setPageTitle, setPageIcon, currentUser?.profile_img]);

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
