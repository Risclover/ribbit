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

  useEffect(() => {
    console.log("selectedChat:", selectedChat);
  }, [selectedChat]);

  useEffect(() => {
    socket = io();

    socket.on("chat", (chat) => {
      setMessages((messages) => [...messages, chat]);
    });

    return () => {
      if (socket) socket.disconnect();
    };
  }, []); // Socket initialization effect should not depend on 'selectedChat'

  useEffect(() => {
    if (selectedChat && user) {
      socket.emit("join", {
        user: user.id,
        room: selectedChat,
      });
    }
  }, [selectedChat, user]); // Separate effect for joining rooms

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
