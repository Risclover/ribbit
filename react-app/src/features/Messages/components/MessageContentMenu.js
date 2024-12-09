import React from "react";
import { useHistory } from "react-router-dom";

export function MessageContentMenu({ active }) {
  const history = useHistory();

  return (
    <div className="messages-content-menu">
      <ul className="messages-content-menu-list">
        <li
          className={
            active === "Inbox"
              ? "messages-content-menu-list-item messages-menu-item-active"
              : "messages-content-menu-list-item"
          }
          onClick={() => history.push("/message/inbox")}
        >
          All
        </li>
        <li
          className={
            active === "Unread"
              ? "messages-content-menu-list-item messages-menu-item-active"
              : "messages-content-menu-list-item"
          }
          onClick={() => history.push("/message/unread")}
        >
          Unread
        </li>
        <li
          className={
            active === "Messages"
              ? "messages-content-menu-list-item messages-menu-item-active"
              : "messages-content-menu-list-item"
          }
          onClick={() => history.push("/message/messages")}
        >
          Messages
        </li>
        <li
          className={
            active === "Post Replies"
              ? "messages-content-menu-list-item messages-menu-item-active"
              : "messages-content-menu-list-item"
          }
          onClick={() => history.push("/message/selfreply")}
        >
          Post Replies
        </li>
      </ul>
    </div>
  );
}
