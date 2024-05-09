import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import moment from "moment";
import { readNotification, readMessage } from "@/store";
import { MessageReply } from "../MessageReply";

export function InboxMessage({ item, marked, message, currentUser, expanded }) {
  const dispatch = useDispatch();
  const [markedUnread, setMarkedUnread] = useState(marked || false);

  const handleRead = async () => {
    setMarkedUnread(false);
    await dispatch(readNotification(message.id));
    await dispatch(readMessage(message.id));
  };

  return (
    <div className="inbox-message" onClick={handleRead}>
      <div className="inbox-message-subject">{message.subject}:</div>
      <div
        className={
          markedUnread ? "inbox-message-main-unread" : "inbox-message-main"
        }
      >
        <div
          className={
            markedUnread
              ? "inbox-message-author-line-unread"
              : "inbox-message-author-line"
          }
        >
          {message.senderId !== currentUser.id ? "from" : "to"}{" "}
          <span className="inbox-message-sender">
            <NavLink to={`/users/${message.sender.id}/profile`}>
              /u/{message.sender.username}
            </NavLink>
          </span>{" "}
          sent {moment(message.createdAt).fromNow()}
        </div>
        <div className="inbox-message-content">{message.content}</div>
        {expanded && (
          <div className="inbox-message-buttonbar">
            <MessageReply
              item={item}
              pageType={markedUnread ? "Inbox-Unread" : "Inbox"}
              message={message}
              threadId={message.threadId}
              expanded={expanded}
              markedUnread={markedUnread}
              setMarkedUnread={setMarkedUnread}
            />
          </div>
        )}
      </div>
    </div>
  );
}
