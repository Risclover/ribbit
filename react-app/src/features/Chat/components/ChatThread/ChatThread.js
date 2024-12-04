import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { getUserChatThreads } from "@/store";
import { SelectedChatContext } from "@/context";
import { ChatMessages } from "./ChatMessages";

export const ChatThread = ({
  setShowDeleteConfirmation,
  setMsgId,
  socket,
  messages,
  setMessages,
}) => {
  const containerRef = useRef(null);
  const prevScrollHeightRef = useRef(0);

  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  const reactions = useSelector((state) => state.reactions);

  const { selectedChat, setSelectedChat } = useContext(SelectedChatContext);
  const chatThreads = useSelector((state) => state.chatThreads);
  const user = useSelector((state) => state.session.user);

  const [receiver, setReceiver] = useState(null);

  useEffect(() => {
    setReceiver(() =>
      selectedChat?.users?.find((user) => user.id !== currentUser.id)
    );
  }, [selectedChat?.users, currentUser.id, chatThreads]);

  useEffect(() => {
    if (user) {
      dispatch(getUserChatThreads());
    }
  }, [user, dispatch]);

  useEffect(() => {
    const chat = Object.values(chatThreads).find(
      (chat) => chat?.id === selectedChat?.id
    );

    if (chat && chat.id !== selectedChat.id) {
      setSelectedChat(chat);
    }

    if (chat && JSON.stringify(chat.messages) !== JSON.stringify(messages)) {
      setMessages(chat.messages);
    }
  }, [selectedChat, chatThreads]);

  useEffect(() => {
    if (containerRef.current) {
      const containerElement = containerRef.current;

      const prevScrollHeight = prevScrollHeightRef.current || 0;
      const currentScrollHeight = containerElement.scrollHeight;

      // Determine if the user was at the bottom before the update
      const isScrolledToBottom =
        containerElement.scrollTop + containerElement.clientHeight >=
        prevScrollHeight - 1; // Small threshold

      if (isScrolledToBottom) {
        // Adjust scrollTop by the change in scrollHeight
        const scrollDifference = currentScrollHeight - prevScrollHeight;
        containerElement.scrollTop += scrollDifference;
      }

      // Update the previous scrollHeight
      prevScrollHeightRef.current = currentScrollHeight;
    }
  }, [messages, reactions]);

  return (
    <div className="chat-thread-messages" ref={containerRef}>
      <div className="chat-thread-messages-user-info">
        <div
          className="chat-thread-messages-user-info-link"
          onClick={() =>
            window.open(
              `/users/${receiver?.id}/profile`,
              "_blank",
              "noreferrer"
            )
          }
        >
          <div className="chat-thread-user-img">
            <img src={receiver?.profileImg} alt="User" />
          </div>
          <div className="chat-thread-title-bar">{receiver?.username}</div>
        </div>
        <div className="chat-thread-user-info">
          <div className="chat-thread-username"></div>
          <div className="chat-thread-user-stats">
            <span className="chat-thread-user-stat">
              Ribbitor for{" "}
              {moment(new Date(receiver?.createdAt))
                .locale("en-cust")
                .fromNow()}
            </span>
            &nbsp;&nbsp;·&nbsp;&nbsp;
            <span className="chat-thread-user-stat">
              {receiver?.karma} karma
            </span>
          </div>
        </div>
      </div>
      <ChatMessages
        setShowDeleteConfirmation={setShowDeleteConfirmation}
        messages={messages}
        setMsgId={setMsgId}
        socket={socket}
      />
      <div ref={containerRef}></div>
    </div>
  );
};
