import React, { useState } from "react";
import { useAppDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import moment from "moment";
import { MessageReply } from "../MessageReply";
import { useInbox } from "../../hooks/useInbox";
import useInboxMessage from "../../hooks/useInboxMessage";

export function InboxMessage({ item, message, currentUser, expanded }) {
  const { handleRead, markedUnread, setMarkedUnread } = useInboxMessage({
    message,
  });

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
          {message.senderId !== currentUser?.id ? "from" : "to"}{" "}
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
