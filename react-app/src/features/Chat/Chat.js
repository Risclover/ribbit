import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
let socket;

const Chat = () => {
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([]);
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    // open socket connection
    // create websocket
    socket = io();

    socket.on("chat", (chat) => {
      setMessages((messages) => [...messages, chat]);
    });
    // when component unmounts, disconnect
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

  return (
    user && (
      <div>
        <div>
          {messages.map((message, ind) => (
            <div key={ind}>{`${message.user}: ${message.msg}`}</div>
          ))}
        </div>
        <form onSubmit={sendChat}>
          <input value={chatInput} onChange={updateChatInput} />
          <button type="submit">Send</button>
        </form>
      </div>
    )
  );
};

export default Chat;
