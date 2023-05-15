import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import "./Sent.css";
import { NavLink } from "react-router-dom";

export default function SentMessage({
  message,
  firstMessage,
  recipient,
  threadId,
}) {
  console.log(recipient);

  return (
    <div className="sent-message">
      <div className="sent-message-subject">
        {!firstMessage ? "re: " + message.subject + ":" : message.subject + ":"}
      </div>
      <div className="sent-message-main">
        <div className="sent-message-author">
          to{" "}
          <NavLink to={`/users/${recipient.id}/profile`}>
            /u/{recipient.username}
          </NavLink>{" "}
          sent {moment(message.createdAt).fromNow()}
        </div>
        <div className="sent-message-content">{message.content}</div>
        <div className="sent-message-btn">
          <NavLink to={`/message/messages/${threadId}`}>Permalink</NavLink>
        </div>
      </div>
    </div>
  );
}