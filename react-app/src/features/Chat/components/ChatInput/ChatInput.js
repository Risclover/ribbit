import React, { useRef } from "react";
import { ChatEmojis, ChatGifs } from "@/features";
import { useAutosizeTextArea } from "@/hooks";
import { useChatInput } from "../../hooks/useChatInput";
import { liveChatIcons } from "@/assets";
import "../../styles/ChatInput.css";

export const ChatInput = ({
  setUsername,
  socket,
  setShowMessageInviteOverlay,
  showMessageInviteOverlay,
  userFound,
  inputText,
  onInputChange,
  clearInput,
}) => {
  const textareaRef = useRef(null);
  useAutosizeTextArea(textareaRef.current, inputText);

  const {
    handleChange,
    handleEnterPress,
    handleOpenGiphy,
    gifIcon,
    receiver,
    emojisOverlay,
    openGiphy,
    handleSubmit,
    setOpenGiphy,
    setEmojisOverlay,
    setGifIcon,
  } = useChatInput({
    setUsername,
    setShowMessageInviteOverlay,
    showMessageInviteOverlay,
    userFound,
    onInputChange,
    clearInput,
    inputText,
    socket,
  });

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
        <ChatGifs
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
        <ChatEmojis
          receiver={receiver}
          setEmojisOverlay={setEmojisOverlay}
          socket={socket}
        />
      )}
    </div>
  );
};
