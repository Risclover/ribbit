import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChatThread } from "store";
import { createChatMessage } from "store";

export const ChatInput = ({ socket, selectedChat }) => {
  const dispatch = useDispatch();
  const [content, setContent] = useState("");

  const chatThreads = useSelector((state) => state.chatThreads);

  const chat = Object.values(chatThreads).find(
    (chat) => chat.id === selectedChat
  );

  const recipient = chat?.users[0];

  console.log("recipient:", recipient);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      content: content,
      receiverId: recipient?.id,
      chatThreadId: chat?.id,
    };

    console.log("payload:", payload);
    const data = await dispatch(createChatMessage(payload));
    console.log("data:", data);

    dispatch(getChatThread(chat?.id));

    setContent("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyPress={(e) => (e.key === "Enter" ? handleSubmit(e) : "")}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
