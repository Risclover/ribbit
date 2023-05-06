import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Message from "./Message";

export default function MessageThread({ item }) {
  const [allExpanded, setAllExpanded] = useState(true);

  return (
    <div className="messages-content-item">
      <div className="messages-content-top-box">
        <div className="messages-content-subject-box">
          <div className="messages-content-sender">
            <NavLink to={`/users/${parseInt(item.users[0]?.id)}/profile`}>
              /u/{item.users[0]?.username}
            </NavLink>
          </div>
          <div className="messages-content-subject">{item.subject}:</div>
        </div>
        <div className="messages-content-expand-collapse">
          <button
            className="messages-content-expand-btn"
            onClick={() => setAllExpanded(true)}
          >
            expand all
          </button>
          <button
            className="messages-content-expand-btn"
            onClick={() => setAllExpanded(false)}
          >
            collapse all
          </button>
        </div>
      </div>
      <div className="messages-content-message-list">
        {item.messages.map((message) => (
          <Message message={message} item={item} allExpanded={allExpanded} />
        ))}
      </div>
    </div>
  );
}
