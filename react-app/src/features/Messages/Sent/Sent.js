import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getThreads } from "@/store";
import { MessageHead, SentMessage } from "../..";
import "./Sent.css";
import { usePageSettings } from "@/hooks/usePageSettings";

export function Sent() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  const threads = useSelector((state) => Object.values(state.threads));

  useEffect(() => {
    dispatch(getThreads());
  }, [dispatch]);

  usePageSettings({
    documentTitle: "Messages: Sent",
    icon: (
      <img
        src={currentUser?.profileImg}
        className="nav-left-dropdown-item-icon item-icon-circle"
        alt="User"
      />
    ),
    pageTitle: "Messages",
  });

  let sentMessages = threads
    .map((thread) =>
      thread.messages.filter((message) => message.sender.id === currentUser.id)
    )
    .flat();

  return (
    <div className="messages-page">
      <MessageHead active="Sent" />
      <div className="messages-content">
        <div className="sent-messages">
          {threads.map((thread) =>
            thread.messages
              .filter((message) => message.sender.id === currentUser.id)
              .map((message, idx) => (
                <SentMessage
                  key={message.id}
                  message={message}
                  firstMessage={idx === 0}
                  recipient={thread.users[0]}
                  threadId={thread.id}
                />
              ))
              .sort((a, b) => {
                return new Date(b.createdAt) - new Date(a.createdAt);
              })
          )}
        </div>
        {sentMessages.length === 0 && (
          <div className="messages-content-nothing">
            there doesn't seem to be anything here
          </div>
        )}
      </div>
    </div>
  );
}
