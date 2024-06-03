import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { ChatNavMenu } from "../ChatNavMenu/ChatNavMenu";
import { ChatThread } from "../ChatThread/ChatThread";
import { ChatTitleBar } from "../ChatThread/ChatTitleBar";
import { ChatInput } from "../ChatInput/ChatInput";
import "../../chat.css";

let socket;

const Chat = () => {
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([]);
  const user = useSelector((state) => state.session.user);
  const [selectedChat, setSelectedChat] = useState(null);
  const [previousChat, setPreviousChat] = useState(null); // New state to track the previous chat

  useEffect(() => {
    socket = io();

    socket.on("chat", (chat) => {
      setMessages((messages) => [...messages, chat]);
    });

    if (selectedChat) {
      socket.emit("join", {
        user: user.id,
        room: selectedChat,
      });
    }

    return () => {
      socket.disconnect();
    };
  }, [setMessages, selectedChat, user]);

  useEffect(() => {
    if (selectedChat && user) {
      if (previousChat) {
        // Emit leave event when switching chats
        socket.emit("leave", {
          user: user.id,
          room: previousChat,
        });
      }

      // Emit join event for the new chat
      socket.emit("join", {
        user: user.id,
        room: selectedChat,
      });

      // Update previousChat state to the current selectedChat
      setPreviousChat(selectedChat);
    }
  }, [selectedChat, user]);

  return (
    <div className="chat-container">
      <div className="chat-left">
        <ChatNavMenu setSelectedChat={setSelectedChat} />
      </div>
      <div className="chat-right">
        <ChatTitleBar />
        <ChatThread
          setSelectedChat={setSelectedChat}
          selectedChat={selectedChat}
          setMessages={setMessages}
          messages={messages}
        />
        <ChatInput socket={socket} selectedChat={selectedChat} />
      </div>
    </div>
  );
};

export default Chat;
