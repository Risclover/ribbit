import React from "react";
import {
  MessageContentMenu,
  MessageHead,
  InboxMessage,
  PostReply,
} from "../..";
import "./Inbox.css";
import { v4 as uuidv4 } from "uuid";
import useInbox from "features/Messages/hooks/useInbox";

export function Inbox() {
  const { threads, expanded, setExpanded, messageList, messages } = useInbox();
  return (
    <div className="inbox-messages-page">
      <MessageHead />
      <div className="inbox-messages-content">
        <MessageContentMenu active="Inbox" />
        <div className="inbox-messages">
          {messageList.map((message) =>
            message.hasOwnProperty("threadId") ? (
              <InboxMessage
                key={uuidv4()}
                currentUser={currentUser}
                item={threads[message.threadId]}
                message={message}
                expanded={expanded}
              />
            ) : message.hasOwnProperty("title") ? (
              <PostReply key={uuidv4()} notification={message} />
            ) : (
              ""
            )
          )}
        </div>
        {messages.length === 0 && (
          <div className="inbox-messages-content-nothing">
            there doesn't seem to be anything here
          </div>
        )}
      </div>
    </div>
  );
}
