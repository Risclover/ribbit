import React, { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import moment from "moment";
import MessageReply from "./MessageReply";
import { useSelector } from "react-redux";

export default function Message({ message, item, allExpanded }) {
  const history = useHistory();
  const [expanded, setExpanded] = useState(true);
  const currentUser = useSelector((state) => state.session.user);

  useEffect(() => {
    if (!currentUser) history.redirect("/login");
  }, [currentUser, history]);

  useEffect(() => {
    if (allExpanded === false) {
      setExpanded(false);
    } else {
      setExpanded(true);
    }
  }, [allExpanded]);

  return (
    <>
      <div className="messages-content-message">
        <div className="messages-content-message-author">
          <span className="expanded-btn" onClick={() => setExpanded(!expanded)}>
            {expanded ? "[–]" : "[+]"}
          </span>{" "}
          {currentUser.username === message.sender.username ? "to " : "from"}{" "}
          <NavLink to={`/users/${item.users[1].id}/profile`}>
            /u/{item.users[1].username}
          </NavLink>{" "}
          sent {moment(message.createdAt).fromNow()}
        </div>
        {expanded && (
          <div className="messages-content-message-body">{message.content}</div>
        )}
      </div>
      <MessageReply message={message} threadId={item.id} expanded={expanded} />
    </>
  );
}
