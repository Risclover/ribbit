import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { readAllMessages } from "../../../store";
import { MessageHead, MessageContentMenu, InboxMessage } from "../..";
import "../Inbox/Inbox.css";
import { usePageSettings } from "../../../hooks/usePageSettings";

export function Unread() {
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.session.user);
  const messages = useSelector((state) => Object.values(state.messages));
  const unreadMsgs = messages.filter((message) => message.read === false);

  const [extended, setExtended] = useState(true);

  useEffect(() => {
    dispatch(readAllMessages());
  }, [dispatch]);

  usePageSettings({
    documentTitle: "Messages: Unread",
    icon: (
      <img
        src={currentUser?.profile_img}
        className="nav-left-dropdown-item-icon item-icon-circle"
        alt="User"
      />
    ),
    pageTitle: "Messages",
  });

  return (
    <div className="inbox-messages-page">
      <MessageHead />
      <div className="inbox-messages-content">
        <MessageContentMenu active="Unread" />
        <div className="inbox-messages">
          {unreadMsgs.length > 0 &&
            unreadMsgs.map((msg) => (
              <InboxMessage
                marked={true}
                message={msg}
                currentUser={currentUser}
                expanded={extended}
              />
            ))}
        </div>
        {unreadMsgs.length === 0 && (
          <div className="messages-content-nothing">
            there doesn't seem to be anything here
          </div>
        )}
      </div>
    </div>
  );
}
