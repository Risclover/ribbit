// Chat.js

import React, { useState, useEffect, useContext, useRef } from "react";
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
import { getChatThread, fakeDeleteMessage } from "store";
import { addReaction, removeReaction } from "store/reactions";

const Chat = ({ setOpenChat }) => {
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([]);
  const chatThreads = useSelector((state) => state.chatThreads);
  const user = useSelector((state) => state.session.user);
  const socketRef = useRef(null);

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
  const [msgId, setMsgId] = useState(null);
  const [pendingInputText, setPendingInputText] = useState("");

  // Function to handle updating input text for a specific thread
  const handleInputChange = (threadId, text) => {
    setInputTexts((prev) => ({ ...prev, [threadId]: text }));
  };

  // Get the current input text based on selectedChat
  const currentInputText = selectedChat
    ? inputTexts[selectedChat.id] || ""
    : "";

  useEffect(() => {
    // Initialize socket only once
    if (!socketRef.current) {
      socketRef.current = io();

      // Handle incoming chat messages
      socketRef.current.on("chat", (chat) => {
        setMessages((messages) => [...messages, chat]);
        dispatch(getUserChatThreads());
      });

      // Handle reactions added
      socketRef.current.on("reaction_added", (data) => {
        dispatch(addReaction(data));
      });

      // Handle reactions removed
      socketRef.current.on("reaction_removed", (data) => {
        dispatch(removeReaction(data));
      });

      // Handle deleted messages
      socketRef.current.on("deleted", (data) => {
        dispatch(getChatThread(selectedChat?.id));
      });
    }

    return () => {
      // Clean up socket connection when component unmounts
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [dispatch, selectedChat?.id]);

  useEffect(() => {
    if (selectedChat && user) {
      // Leave the previous room
      if (previousChat) {
        socketRef.current.emit("leave", {
          user_id: user.id,
          room: previousChat,
        });
      }

      // Join the new room
      socketRef.current.emit("join", {
        user: user.id,
        room: selectedChat.id,
      });

      setPreviousChat(selectedChat.id);
    }
  }, [selectedChat, user, previousChat]);

  useEffect(() => {
    if (selectedChat) {
      dispatch(getChatThread(selectedChat.id));
    }
  }, [dispatch, selectedChat]);

  const handleDeleteMsg = (e) => {
    e.preventDefault();
    dispatch(fakeDeleteMessage(msgId));
    dispatch(getChatThread(selectedChat.id));
    socketRef.current.emit("delete", { id: msgId, room: selectedChat.id });
    setShowDeleteConfirmation(false);
  };

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
          socket={socketRef.current}
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
          setMsgId={setMsgId}
          socket={socketRef.current}
        />
        <ChatInput
          socket={socketRef.current}
          selectedChat={selectedChat}
          userFound={userFound}
          showMessageInviteOverlay={showMessageInviteOverlay}
          setShowMessageInviteOverlay={setShowMessageInviteOverlay}
          onInputChange={(text) => {
            if (selectedChat) {
              handleInputChange(selectedChat.id, text);
            } else {
              setPendingInputText(text);
            }
          }}
          inputText={selectedChat ? currentInputText : pendingInputText}
        />
      </div>
      {showDeleteConfirmation && (
        <DeleteMessageOverlay
          setShowDeleteConfirmation={setShowDeleteConfirmation}
          selectedChat={selectedChat}
          socket={socketRef.current}
          handleDeleteMsg={handleDeleteMsg}
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
