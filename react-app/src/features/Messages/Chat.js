import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { io } from "socket.io-client";
import { getMessages } from "../../store/messages";

import "./Messages.css";

let socket;

const Chat = () => {
  const dispatch = useDispatch();

  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [month, setMonth] = useState("");
  const user = useSelector((state) => state.session.user);
  const [showTime, setShowTime] = useState(false);
  const monthNum = new Date().getMonth();
  const dayNum = new Date().getDate();
  const allMessages = useSelector((state) => state.messages);
  console.log("day:", dayNum);
  console.log("date:", monthNum);

  useEffect(() => {
    dispatch(getMessages());
  });
  useEffect(() => {
    switch (monthNum) {
      case 0:
        setMonth("January");
        break;
      case 1:
        setMonth("February");
        break;
      case 2:
        setMonth("March");
        break;
      case 3:
        setMonth("April");
        break;
      case 4:
        setMonth("May");
        break;
      case 5:
        setMonth("June");
        break;
      case 6:
        setMonth("July");
        break;
      case 7:
        setMonth("August");
        break;
      case 8:
        setMonth("September");
        break;
      case 9:
        setMonth("October");
        break;
      case 10:
        setMonth("November");
        break;
      case 11:
        setMonth("December");
        break;
      default:
        break;
    }

    console.log(month);
  }, [month, monthNum]);

  const fullDate = month + " " + dayNum;

  useEffect(() => {
    // open socket connection
    // create websocket
    socket = io();

    socket.on("chat", (chat) => {
      setMessages((messages) => [...messages, chat]);
      console.log("socket msgs:", messages);
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
    const date = new Date().toLocaleTimeString();

    socket.emit("chat", {
      user: user.username,
      msg: chatInput,
      sent: date,
    });
    setChatInput("");
  };
  console.log("socket msgs:", messages);
  return (
    user && (
      <div>
        <div className="date-header">{fullDate}</div>
        {messages.map((message, ind) => (
          <div>
            <div
              className="message"
              key={ind}
              onMouseEnter={() => setShowTime(true)}
            >
              {`${message.user}: ${message.msg}`}
            </div>
            {showTime && <div className="message-time">{message.sent}</div>}
          </div>
        ))}
        <form onSubmit={sendChat}>
          <input value={chatInput} onChange={updateChatInput} />
          <button type="submit">Send</button>
        </form>
      </div>
    )
  );
};

export default Chat;
