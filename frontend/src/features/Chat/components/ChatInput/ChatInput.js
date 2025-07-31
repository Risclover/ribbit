import React, { useRef, useState, useContext, useEffect } from "react";
import { getSocket } from "@/socket";
import { useSelectedChat } from "@/context";
import { useAutosizeTextArea } from "@/hooks";
import { ChatEmojis, ChatGifs } from "@/features";
import {
  useAppSelector,
  useAppDispatch,
  createChatThread,
  createChatMessage,
  getChatThread,
} from "@/store";
import { GifIcon, SendMessageIcon, liveChatIcons } from "@/assets";
import { useChatInput } from "../../hooks/useChatInput";

export const ChatInput = ({
  showMessageInviteOverlay,
  setActiveOverlay,
  OVERLAYS,
  userFound,
  username,
  setUsername,
  inputText,
  setPendingInputText,
}) => {
  const textareaRef = useRef(null);

  const {
    handleEnterPress,
    selectedChat,
    textValue,
    handleChange,
    handleOpenGiphy,
    setOpenGiphy,
    setOpenEmojis,
    openEmojis,
    setGifIcon,
    openGiphy,
    currentUser,
    socket,
    disabled,
    handleSubmit,
  } = useChatInput({
    inputText,
    setUsername,
    userFound,
    setActiveOverlay,
    showMessageInviteOverlay,
    setPendingInputText,
    textareaRef,
  });

  return (
    <div className="chat-thread-window-input">
      <div className="chat-thread-window-input-box">
        <textarea
          onKeyPress={handleEnterPress}
          type="text"
          value={selectedChat ? textValue : inputText}
          ref={textareaRef}
          onChange={handleChange}
          placeholder="Message"
          rows={1}
        />
        <div className="input-btns">
          <button
            aria-label="Gifs"
            className="gif-btn"
            onClick={handleOpenGiphy}
          >
            <GifIcon />
          </button>
          <button
            aria-label="Emojis"
            className="emojis-btn"
            onClick={() => {
              setOpenGiphy(false);
              setOpenEmojis((prev) => !prev);
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
        <ChatGifs
          receiver={
            selectedChat
              ? selectedChat.users.find((u) => u.id !== currentUser.id)
              : null
          }
          setGifIcon={setGifIcon}
          GifIcon={liveChatIcons.GifIcon}
          setOpenGiphy={setOpenGiphy}
          socket={socket}
        />
      )}

      <button
        disabled={disabled}
        className={
          (selectedChat ? textValue : inputText)?.trim()
            ? "send-chat-msg-btn chat-msg-enabled"
            : "send-chat-msg-btn"
        }
        onClick={handleSubmit}
      >
        <SendMessageIcon />
      </button>

      {openEmojis && (
        <ChatEmojis
          receiver={
            selectedChat
              ? selectedChat.users.find((u) => u.id !== currentUser.id)
              : null
          }
          setOpenEmojis={setOpenEmojis}
          openEmojis={openEmojis}
        />
      )}
    </div>
  );
};
