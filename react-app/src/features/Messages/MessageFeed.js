import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./Messages.css";

import Send from "../../images/send-arrow.png";
import { useParams } from "react-router-dom";
import { getMessages, sendMessage } from "../../store/messages";
import { getUsers } from "../../store/users";

export default function MessageFeed() {
  const dispatch = useDispatch();
  const { recipientId } = useParams();

  const [sender, setSender] = useState("");
  const [recipient, setRecipient] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [body, setBody] = useState("");

  const messages = useSelector((state) => Object.values(state.messages));
  const users = useSelector((state) => Object.values(state.users));
  const user = useSelector((state) => state.session.user);

  console.log("USERS:", users);

  let received = Object.values(user?.messagesReceived);
  let sent = Object.values(user?.messagesSent);
  //   let messages = [];

  useEffect(() => {
    for (let msg of messages) {
      if (msg.senderId === sender?.id) {
        sent.push(msg);
      }

      if (msg.recipientId === recipient?.id) {
        received.push(msg);
      }
    }

    if (received.length > 0 && received !== null && received !== undefined) {
      messages.concat(received);
      console.log("messages2", messages);
    }
  }, [messages, body]);

  if (sent.length > 0 && sent !== null && sent !== undefined) {
    sent.concat(received);
  }

  if (received.length > 0 && received !== null && received !== undefined) {
    messages.concat(received);
  }

  const handleClick = (e) => {
    e.preventDefault();

    dispatch(sendMessage({ body }, +recipientId));
    dispatch(getMessages(+recipientId));
    dispatch(getUsers());
  };

  useEffect(() => {
    dispatch(getMessages(+recipientId));
    dispatch(getUsers());
  }, []);

  useEffect(() => {
    if (body.length === 0) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
    setSender(users[0]);
    console.log("sender:", sender);

    setRecipient(users[+recipientId - 1]);
    console.log("recipient:", recipient);
  }, [sender, recipient, disabled, body, users]);

  //   if (!user.messagesSent || !user.messagesReceived) return null;

  return (
    <div className="message-feed">
      <div className="message-feed-messages">
        <div className="message-feed-participants">
          <div className="message-feed-participants-recipient">
            <img src={recipient?.profile_img} />
            {recipient?.username},
          </div>
          <div className="message-feed-participants-sender">
            <img src={sender?.profile_img} />
            {sender?.username}
          </div>
        </div>
        <div className="message-feed-message-wrapper">
          {sent.map((message) => (
            <div className="message-feed-message">{message.body}</div>
          ))}
        </div>
      </div>
      <form className="message-form">
        <input
          type="text"
          placeholder="Message"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        {!disabled && (
          <button className="send-msg-btn" onClick={handleClick}>
            <img src={Send} />
          </button>
        )}
        {disabled && (
          <button disabled className="send-msg-btn">
            <img src={Send} />
          </button>
        )}
      </form>
    </div>
  );
}
