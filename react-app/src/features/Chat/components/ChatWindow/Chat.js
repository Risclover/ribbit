import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { ChatNavMenu } from "../ChatNavMenu/ChatNavMenu";
import { ChatThread } from "../ChatThread/ChatThread";
import { ChatTitleBar } from "../ChatThread/ChatTitleBar";
import { ChatInput } from "../ChatInput/ChatInput";
let socket;

const Chat = () => {
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([]);
  const user = useSelector((state) => state.session.user);
  const [selectedChat, setSelectedChat] = useState(null);

  useEffect(() => {
    socket = io();

    socket.on("chat", (chat) => {
      setMessages((messages) => [...messages, chat]);
    });

    if (selectedChat) {
      socket.emit("join", {
        user: user.id,
        room: selectedChat.id,
      });
    }

    return () => {
      socket.disconnect();
    };
  }, []);

  const updateChatInput = (e) => {
    setChatInput(e.target.value);
  };

  const sendChat = (e) => {
    e.preventDefault();
    socket.emit("chat", { user: user.username, msg: chatInput });
    setChatInput("");
  };

  useEffect(() => {
    console.log(selectedChat);
  }, [selectedChat]);

  return (
    <div className="chat-container">
      <div className="chat-left">
        <ChatNavMenu setSelectedChat={setSelectedChat} />
      </div>
      <div className="chat-right">
        <ChatTitleBar />
        <ChatThread selectedChat={selectedChat} />
        <ChatInput socket={socket} selectedChat={selectedChat} />
      </div>
    </div>
  );
};

export default Chat;
