import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAutosizeTextArea from "../ChatWindowMessages/useAutosizeTextArea";
import { createChatMessage, getChatThread } from "../../../../../store/chats";
import Emojis from "./Emojis";

export default function ChatWindowInput({ socket, selectedChat }) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  const textareaRef = useRef(null);

  const [content, setContent] = useState();
  const [receiver, setReceiver] = useState(null);
  const [emojisOverlay, setEmojisOverlay] = useState(false);

  useAutosizeTextArea(textareaRef.current, content);

  useEffect(() => {
    // ...

    setReceiver(() =>
      selectedChat?.users?.find((user) => user.id !== currentUser.id)
    );
  }, [selectedChat?.users, currentUser.id]);

  const handleEnterPress = (e) => {
    if (e.key === "Enter") {
      handleSendChatMsg(e);
    }
  };

  const handleChange = (e) => {
    const val = e.target?.value;
    setContent(val);
  };

  const handleSendChatMsg = async (e) => {
    e.preventDefault();
    setContent("");
    const payload = {
      content: content,
      receiverId: receiver.id,
      chatThreadId: selectedChat?.id,
    };

    console.log("payload:", payload);

    const data = await dispatch(createChatMessage(payload));
    console.log("data:", data);
    socket.emit("chat", data);
    socket.emit("last", data);
    await dispatch(getChatThread(selectedChat?.id));
  };

  return (
    <div className="chat-thread-window-input">
      <div className="chat-thread-window-input-box">
        <textarea
          onKeyPress={handleEnterPress}
          type="text"
          value={content}
          ref={textareaRef}
          onChange={handleChange}
          placeholder="Message"
          rows={(e) => calculateTextareaRows(e)}
        ></textarea>
        <button
          className="emojis-btn"
          onClick={() => setEmojisOverlay(!emojisOverlay)}
        >
          <span class="material-symbols-outlined">sentiment_satisfied</span>
        </button>
      </div>
      <div
        className={
          content ? "send-chat-msg-btn chat-msg-enabled" : "send-chat-msg-btn"
        }
        onClick={handleSendChatMsg}
      >
        <i
          className={
            content
              ? "zmdi-enabled zmdi zmdi-navigation"
              : "zmdi-disabled zmdi zmdi-navigation"
          }
        ></i>
      </div>
      {emojisOverlay && (
        <Emojis
          receiver={receiver}
          selectedChat={selectedChat}
          setEmojisOverlay={setEmojisOverlay}
          socket={socket}
        />
      )}
    </div>
  );
}
