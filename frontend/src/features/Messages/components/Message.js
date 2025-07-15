import React, { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store";
import moment from "moment";
import { readMessage, getMessages } from "@/store";
import { MessageReply } from "./MessageReply";

export function Message({ message, item, allExpanded }) {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [expanded, setExpanded] = useState(true);
  const [markedUnread, setMarkedUnread] = useState(false);
  const currentUser = useAppSelector((state) => state.session.user);

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

  const handleRead = () => {
    dispatch(readMessage(message.id));
    dispatch(getMessages());
    setMarkedUnread(false);
  };

  return (
    <div
      className={markedUnread ? "message message-unread" : "message"}
      onClick={handleRead}
    >
      <div className="messages-content-message">
        <div className="messages-content-message-author">
          <span className="expanded-btn" onClick={() => setExpanded(!expanded)}>
            {expanded ? "[–]" : "[+]"}
          </span>{" "}
          <div
            className={
              message.sender.id !== currentUser?.id
                ? "sender-line sender-me"
                : "sender-line"
            }
          >
            {currentUser.username === message.sender.username ? "to " : "from"}{" "}
            <NavLink
              to={
                currentUser?.id === item?.users[0].id
                  ? `/users/${item?.users[1]?.id}/profile`
                  : `/users/${item?.users[0]?.id}/profile`
              }
            >
              /u/
              {currentUser.username === item.users[1].username
                ? item.users[0].username
                : item.users[1].username}
            </NavLink>{" "}
            sent {moment(message.createdAt).locale("en-post").fromNow()}
          </div>
        </div>
        {expanded && (
          <div
            className={
              message.sender.id === currentUser?.id
                ? "messages-content-message-body message-from-me"
                : "messages-content-message-body"
            }
          >
            {message.content}
          </div>
        )}
      </div>
      <MessageReply
        item={item}
        message={message}
        threadId={item.id}
        expanded={expanded}
        setMarkedUnread={setMarkedUnread}
      />
    </div>
  );
}
