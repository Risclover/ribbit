import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChatMessages } from "./ChatMessages";
import { getUserChatThreads } from "store";
import { SelectedChatContext } from "context";
import moment from "moment";

export const ChatThread = ({
  messages,
  setMessages,
  setShowDeleteConfirmation,
}) => {
  const containerRef = useRef(null);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);

  const { selectedChat, setSelectedChat } = useContext(SelectedChatContext);
  const chatThreads = useSelector((state) => state.chatThreads);
  const user = useSelector((state) => state.session.user);
  const chat = Object.values(chatThreads).find(
    (chat) => chat.id === selectedChat.id
  );
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

  // Update selected chat and messages when selectedChat or chatThreads changes
  useEffect(() => {
    const chat = Object.values(chatThreads).find(
      (chat) => chat.id === selectedChat.id
    );

    if (chat && chat.id !== selectedChat.id) {
      setSelectedChat(chat);
    }

    // Check if messages are different before setting them
    if (chat && JSON.stringify(chat.messages) !== JSON.stringify(messages)) {
      setMessages(chat.messages);
    }
  }, [selectedChat, chatThreads]); // Remove 'messages' from the dependencies

  useLayoutEffect(() => {
    if (containerRef.current) {
      const containerElement = containerRef.current;
      const isScrolledToBottom =
        containerElement.scrollHeight - containerElement.scrollTop ===
        containerElement.clientHeight;
      containerElement.scrollTop = containerElement.scrollHeight;

      // Delay scrolling to the bottom if not already at the bottom (fixes problem where doesn't scroll to bottom when sending multiple messages or when sending emoji stickers)
      if (!isScrolledToBottom) {
        setTimeout(() => {
          containerElement.scrollTop = containerElement.scrollHeight;
        }, 100);
      }
    }
  }, [messages]);

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
            <img src={receiver?.profile_img} alt="User" />
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
      />
    </div>
  );
};
