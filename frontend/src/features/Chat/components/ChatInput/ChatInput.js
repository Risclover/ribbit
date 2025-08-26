import { ChatEmojis, ChatGifs } from "@/features";
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
    disabled,
    handleSubmit,
    textareaRef,
  } = useChatInput({
    inputText,
    setUsername,
    userFound,
    setActiveOverlay,
    showMessageInviteOverlay,
    setPendingInputText,
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
          setGifIcon={setGifIcon}
          GifIcon={liveChatIcons.GifIcon}
          setOpenGiphy={setOpenGiphy}
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
