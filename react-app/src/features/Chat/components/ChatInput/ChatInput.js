// ChatInput.js

import { SelectedChatContext } from "context";
import { Emojis, Gifs } from "features/ChatWindow";
import { useAutosizeTextArea } from "@/hooks";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChatThread, createChatMessage, createChatThread } from "store";
import { liveChatIcons } from "@/assets";

export const ChatInput = ({
  socket,
  setShowMessageInviteOverlay,
  showMessageInviteOverlay,
  userFound,
  inputText,
  onInputChange,
}) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  const textareaRef = useRef(null);

  const chatThreads = useSelector((state) => state.chatThreads);
  const { selectedChat, setSelectedChat, setPendingReceiver } =
    useContext(SelectedChatContext);

  const [openGiphy, setOpenGiphy] = useState(false);
  const [gifIcon, setGifIcon] = useState(liveChatIcons.GifIcon);
  const [receiver, setReceiver] = useState(null);
  const [emojisOverlay, setEmojisOverlay] = useState(false);

  useAutosizeTextArea(textareaRef.current, inputText);

  useEffect(() => {
    setReceiver(() =>
      selectedChat?.users?.find((user) => user.id !== currentUser?.id)
    );
  }, [selectedChat?.users, currentUser?.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let chatThreadId = selectedChat?.id;

    if (showMessageInviteOverlay) {
      const newChat = await handleCreateNewThread();
      chatThreadId = newChat.id;
    }

    const payload = {
      content: inputText,
      receiverId: receiver?.id,
      chatThreadId: chatThreadId,
    };

    const data = await dispatch(createChatMessage(payload));
    data.room = chatThreadId;
    await socket.emit("chat", data);

    dispatch(getChatThread(chatThreadId));
    onInputChange(""); // Clear input text
  };

  const handleOpenGiphy = () => {
    setEmojisOverlay(false);
    setGifIcon(openGiphy ? liveChatIcons.GifIcon : liveChatIcons.GifIconDark);
    setOpenGiphy(!openGiphy);
  };

  const handleEnterPress = (e) => {
    if (e.key === "Enter" && inputText.trim().length > 0) {
      handleSubmit(e);
    }
  };

  const handleChange = (e) => {
    const val = e.target?.value;
    onInputChange(val);
  };

  const handleCreateNewThread = async () => {
    const data = await dispatch(createChatThread(userFound?.id));
    setSelectedChat(data);
    setShowMessageInviteOverlay(false);
    setPendingReceiver(null);
    onInputChange(""); // Clear pending input text
    return data;
  };

  return (
    <div className="chat-thread-window-input">
      <div className="chat-thread-window-input-box">
        <textarea
          onKeyPress={handleEnterPress}
          type="text"
          value={inputText}
          ref={textareaRef}
          onChange={handleChange}
          placeholder="Message"
        ></textarea>
        <div className="input-btns">
          <button
            aria-label="Gifs"
            className="gif-btn"
            onClick={handleOpenGiphy}
          >
            <img src={gifIcon} alt="Gif" />
          </button>
          <button
            aria-label="Emojis"
            className="emojis-btn"
            onClick={() => {
              setOpenGiphy(false);
              setEmojisOverlay(!emojisOverlay);
              setGifIcon(liveChatIcons.GifIcon);
            }}
          >
            <span className="material-symbols-outlined">
              sentiment_satisfied
            </span>
          </button>
        </div>
      </div>
      {openGiphy && (
        <Gifs
          receiver={receiver}
          setGifIcon={setGifIcon}
          GifIcon={liveChatIcons.GifIcon}
          gifIcon={gifIcon}
          GifIconDark={liveChatIcons.GifIconDark}
          setOpenGiphy={setOpenGiphy}
          socket={socket}
        />
      )}
      <div
        className={
          inputText ? "send-chat-msg-btn chat-msg-enabled" : "send-chat-msg-btn"
        }
        onClick={handleSubmit}
      >
        <i
          className={
            inputText
              ? "zmdi-enabled zmdi zmdi-navigation"
              : "zmdi-disabled zmdi zmdi-navigation"
          }
        ></i>
      </div>
      {emojisOverlay && (
        <Emojis
          receiver={receiver}
          setEmojisOverlay={setEmojisOverlay}
          socket={socket}
        />
      )}
    </div>
  );
};
