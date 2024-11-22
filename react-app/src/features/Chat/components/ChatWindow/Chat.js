// Chat.js

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
import { getChatThread } from "store";

let socket;

const Chat = ({ setOpenChat }) => {
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([]);
  const chatThreads = useSelector((state) => state.chatThreads);

  const user = useSelector((state) => state.session.user);
  const [previousChat, setPreviousChat] = useState(null);
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
  const [inputTexts, setInputTexts] = useState({});

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

  useEffect(() => {
    if (selectedChat) {
      dispatch(getChatThread(selectedChat.id));
    }
  }, [dispatch, selectedChat]);

  return (
    <div className="chat-window-container">
      <div className="chat-window-left">
        <div className="chat-window-chatnav-title">
          Chats{" "}
          <button
            className="chat-window-create-chat-btn"
            onClick={() => setShowCreateChatOverlay(true)}
          >
            {/* SVG icon code */}
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
          onInputChange={
            selectedChat
              ? (text) => handleInputChange(selectedChat.id, text)
              : () => {} // No-op function if selectedChat is null
          }
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
