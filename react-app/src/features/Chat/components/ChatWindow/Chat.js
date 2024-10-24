import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { ChatNavMenu } from "../ChatNavMenu/ChatNavMenu";
import { ChatThread } from "../ChatThread/ChatThread";
import { ChatTitleBar } from "../ChatThread/ChatTitleBar";
import { ChatInput } from "../ChatInput/ChatInput";
import { DeleteMessageOverlay } from "../ChatWindowOverlays/DeleteMessageOverlay";
import { SelectedChatContext } from "@/context";
import { getUserChatThreads } from "@/store";
import { CreateChatOverlay } from "../ChatWindowOverlays/CreateChatOverlay";
import {
  ChatWelcomeOverlay,
  MessageInviteOverlay,
} from "../ChatWindowOverlays";
import { useUserSearch } from "features/Chat/hooks/useUserSearch";
import "../../styles/chat.css";

let socket;

const Chat = ({ setOpenChat }) => {
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([]);
  const chatThreads = useSelector((state) => state.chatThreads);

  const user = useSelector((state) => state.session.user);
  const [previousChat, setPreviousChat] = useState(null); // New state to track the previous chat
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showChatWelcomeOverlay, setShowChatWelcomeOverlay] = useState(
    Object.keys(chatThreads)?.length === 0 || !chatThreads ? true : false
  );
  const [showCreateChatOverlay, setShowCreateChatOverlay] = useState(false);
  const [showMessageInviteOverlay, setShowMessageInviteOverlay] =
    useState(false);
  const [username, setUsername] = useState("");
  const { selectedChat, setSelectedChat } = useContext(SelectedChatContext);
  const { userFound } = useUserSearch(username);
  const [inputTexts, setInputTexts] = useState({}); // New state for input texts per thread

  // Function to handle updating input text for a specific thread
  const handleInputChange = (threadId, text) => {
    setInputTexts((prev) => ({ ...prev, [threadId]: text }));
  };

  // Get the current input text based on selectedChat
  const currentInputText = selectedChat
    ? inputTexts[selectedChat.id] || ""
    : "";

  useEffect(() => {
    socket = io();

    socket.on("chat", (chat) => {
      setMessages((messages) => [...messages, chat]);
      dispatch(getUserChatThreads());
    });

    if (selectedChat) {
      socket.emit("join", {
        user: user.id,
        room: selectedChat.id,
      });
    }

    if (selectedChat && user) {
      if (previousChat) {
        socket.emit("leave", {
          user: user.id,
          room: previousChat,
        });
      }

      socket.emit("join", {
        user: user.id,
        room: selectedChat.id,
      });

      setPreviousChat(selectedChat.id);
    }

    return () => {
      socket.disconnect();
    };
  }, [setMessages, selectedChat, user]);

  // useEffect(() => {
  //   if (selectedChat && user) {
  //     if (previousChat) {
  //       socket.emit("leave", {
  //         user: user.id,
  //         room: previousChat,
  //       });
  //     }

  //     socket.emit("join", {
  //       user: user.id,
  //       room: selectedChat.id,
  //     });

  //     setPreviousChat(selectedChat);
  //   }
  // }, [selectedChat, user]);

  return (
    <div className="chat-window-container">
      <div className="chat-window-left">
        <div className="chat-window-chatnav-title">
          Chats{" "}
          <button
            aria-label="Create chat"
            className="chat-window-create-chat-btn"
            onClick={() => setShowCreateChatOverlay(true)}
          >
            <svg
              rpl=""
              fill="currentColor"
              height="16"
              icon-name="chat-new-outline"
              viewBox="0 0 20 20"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.063 2.931A9.99 9.99 0 0 0 .123 8.444a9.883 9.883 0 0 0 1.195 6.49L.085 19.009a.729.729 0 0 0 .9.913l4.166-1.194a9.856 9.856 0 0 0 6.448 1.142 9.989 9.989 0 0 0 8.12-12.214 9.991 9.991 0 0 0-2.656-4.725Zm1.57 8.499a8.784 8.784 0 0 1-7.227 7.2 8.664 8.664 0 0 1-5.856-1.112l-.231-.139-3.762 1.078 1.118-3.691-.145-.238a8.655 8.655 0 0 1-1.172-5.893 8.751 8.751 0 1 1 17.275 2.8v-.005Zm-8.008-2.058h3.374v1.25h-3.375v3.379h-1.25v-3.376H6v-1.25h3.375V6.002h1.25v3.37Z"></path>
            </svg>
          </button>
        </div>
        <ChatNavMenu
          socket={socket}
          setShowCreateChatOverlay={setShowCreateChatOverlay}
          setShowMessageInviteOverlay={setShowMessageInviteOverlay}
        />
      </div>
      <div className="chat-window-right">
        <ChatTitleBar
          showCreateChatOverlay={showCreateChatOverlay}
          setOpenChat={setOpenChat}
        />
        <ChatThread
          setSelectedChat={setSelectedChat}
          selectedChat={selectedChat}
          setMessages={setMessages}
          messages={messages}
          setShowDeleteConfirmation={setShowDeleteConfirmation}
        />
        <ChatInput
          socket={socket}
          selectedChat={selectedChat}
          userFound={userFound}
          showMessageInviteOverlay={showMessageInviteOverlay}
          setShowMessageInviteOverlay={setShowMessageInviteOverlay}
          onInputChange={(text) => handleInputChange(selectedChat.id, text)}
          inputText={currentInputText}
        />
      </div>
      {showDeleteConfirmation && (
        <DeleteMessageOverlay
          setShowDeleteConfirmation={setShowDeleteConfirmation}
        />
      )}
      {showChatWelcomeOverlay && (
        <ChatWelcomeOverlay
          setShowCreateChatOverlay={setShowCreateChatOverlay}
        />
      )}
      {showMessageInviteOverlay && <MessageInviteOverlay />}
      {showCreateChatOverlay && (
        <CreateChatOverlay
          setShowCreateChatOverlay={setShowCreateChatOverlay}
          setShowChatWelcomeOverlay={setShowChatWelcomeOverlay}
          setShowMessageInviteOverlay={setShowMessageInviteOverlay}
          username={username}
          setUsername={setUsername}
          userFound={userFound}
        />
      )}
    </div>
  );
};

export default Chat;
