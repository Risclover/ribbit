import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { selectThreadsLoaded, useAppDispatch, useAppSelector } from "@/store";
import { getThreads } from "@/store";
import { Message } from "./Message";
import { v4 as uuidv4 } from "uuid";

export function MessageThread({ item }) {
  const [allExpanded, setAllExpanded] = useState(true);
  const dispatch = useAppDispatch();

  const currentUser = useAppSelector((state) => state.session.user);
  const loaded = useAppSelector((state) => state.threads.loaded);

  useEffect(() => {
    if (!loaded) dispatch(getThreads());
  }, [loaded, dispatch]);

  if (!item) return null;

  const users = item.users || [];

  return (
    <div className="messages-content-item">
      <div className="messages-content-top-box">
        <div className="messages-content-subject-box">
          <div className="messages-content-sender">
            <NavLink
              to={
                users[0]?.id === currentUser?.id
                  ? `/users/${parseInt(users[1]?.id)}/profile`
                  : `/users/${parseInt(users[0]?.id)}/profile`
              }
            >
              /u/
              {users[0]?.id === currentUser?.id
                ? item.users?.[1]?.username
                : item.users?.[0]?.username}
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
        {item.messages?.map((message) => (
          <Message
            key={uuidv4()}
            message={message}
            item={item}
            allExpanded={allExpanded}
          />
        ))}
      </div>
    </div>
  );
}
