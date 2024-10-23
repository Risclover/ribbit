import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { ChatMessage } from "./ChatMessage";
import { formatDate } from "./formatDate";
import { SelectedChatContext } from "@/context/SelectedChat";
import { v4 as uuidv4 } from "uuid";

export function ChatMessages({
  messages,
  setDeleteOverlay,
  setMsgId,
  setSelectedReaction,
  selectedReaction,
}) {
  const { selectedChat } = useContext(SelectedChatContext);
  const containerRef = useRef(null);

  const [receiver, setReceiver] = useState(null);

  const currentUser = useSelector((state) => state.session.user);
  const chatThreads = useSelector((state) => state.chatThreads);

  useLayoutEffect(() => {
    scrollToBottom();
  }, [selectedChat, messages]);

  useEffect(() => {
    setReceiver(() =>
      selectedChat?.users?.find((user) => user.id !== currentUser?.id)
    );
  }, [selectedChat?.users, currentUser?.id, chatThreads]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="chat-thread-messages" ref={containerRef}>
      {/* User info space */}
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

      {/* Messages */}
      <div className="chat-messages">
        {messages.length > 0 &&
          messages.map((message, idx) => {
            const previousMessage = messages[idx - 1];
            const currentDate = new Date(message.createdAt).setHours(
              0,
              0,
              0,
              0
            );
            const previousDate =
              previousMessage &&
              new Date(previousMessage.createdAt).setHours(0, 0, 0, 0);

            const showDateBar =
              !previousMessage || currentDate !== previousDate;
            const formattedDate = formatDate(message.createdAt);

            return (
              <ChatMessage
                key={uuidv4()}
                formattedDate={formattedDate}
                showDateBar={showDateBar}
                previousMessage={previousMessage}
                message={message}
                setDeleteOverlay={setDeleteOverlay}
                setMsgId={setMsgId}
                selectedReaction={selectedReaction}
                setSelectedReaction={setSelectedReaction}
              />
            );
          })}
      </div>
      <div ref={messagesEndRef} />
    </div>
  );
}
