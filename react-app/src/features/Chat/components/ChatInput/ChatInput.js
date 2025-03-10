import React, { useRef, useState, useContext, useEffect } from "react";
import { ChatEmojis, ChatGifs } from "@/features";
import { useAutosizeTextArea } from "@/hooks";
import { useSelector, useDispatch } from "react-redux";
import { createChatThread, createChatMessage, getChatThread } from "@/store";
import { liveChatIcons } from "@/assets";
import { SelectedChatContext } from "@/context";

export const ChatInput = ({
  socket,
  showMessageInviteOverlay,
  setActiveOverlay,
  OVERLAYS,
  userFound,
  username,
  setUsername,
  inputText,
  setPendingInputText,
}) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  const { selectedChat, setSelectedChat } = useContext(SelectedChatContext);

  // If a chat is selected, store text in local state here for that particular chat
  const [textValue, setTextValue] = useState("");

  // Giphy & Emojis
  const [openGiphy, setOpenGiphy] = useState(false);
  const [gifIcon, setGifIcon] = useState(liveChatIcons.GifIcon);
  const [emojisOverlay, setEmojisOverlay] = useState(false);
  const [disabled, setDisabled] = useState(false);

  // Autosize text areas
  const textareaRef = useRef(null);
  useAutosizeTextArea(textareaRef.current, textValue || inputText);

  // On input change
  const handleChange = (e) => {
    const value = e.target.value;
    if (selectedChat) {
      setTextValue(value);
    } else {
      setPendingInputText(value);
    }
  };

  // “Enter” sends the message
  const handleEnterPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  // Actually sending the message (existing chat)
  const sendMessage = async (threadId, messageContent, receiverId) => {
    const payload = {
      content: messageContent,
      receiverId,
      chatThreadId: threadId,
    };

    const data = await dispatch(createChatMessage(payload));
    data.room = threadId;
    socket.emit("chat", data);
    dispatch(getChatThread(threadId));
  };

  // If we are in the invite flow, we must first create the thread, then send the first message
  const handleSubmit = async () => {
    const contentToSend = selectedChat ? textValue : inputText;

    if (!contentToSend.trim()) return;

    // 1) If we are in “invite mode”, create a new chat
    if (showMessageInviteOverlay && userFound) {
      // close the overlay
      setActiveOverlay(null);

      // create new thread with userFound
      const newChat = await dispatch(createChatThread(userFound.id));
      setSelectedChat(newChat);

      // join the socket room
      socket.emit("join", { user: currentUser.id, room: newChat.id });

      // send first message
      await sendMessage(newChat.id, contentToSend, userFound.id);

      // reset states
      setUsername("");
      setPendingInputText("");
      setTextValue("");
      return;
    }

    // 2) Normal scenario: we already have a selectedChat
    if (selectedChat) {
      const otherUser = selectedChat.users.find((u) => u.id !== currentUser.id);
      if (!otherUser) return;

      await sendMessage(selectedChat.id, textValue, otherUser.id);
      setTextValue("");
    }
    // 3) Or, no chat selected and no overlay => do nothing
  };

  const handleOpenGiphy = () => {
    setEmojisOverlay(false);
    setGifIcon(openGiphy ? liveChatIcons.GifIcon : liveChatIcons.GifIconDark);
    setOpenGiphy(!openGiphy);
  };

  useEffect(() => {
    setDisabled((selectedChat ? textValue : inputText)?.trim().length === 0);
  }, [inputText, textValue]);

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
            <svg
              rpl=""
              class="text-tone-2"
              fill="currentColor"
              height="20"
              icon-name="gif-post-outline"
              viewBox="0 0 20 20"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M4.711 12.664A2.8 2.8 0 0 1 3.6 11.583 3.108 3.108 0 0 1 3.2 10a3.052 3.052 0 0 1 .411-1.583c.267-.46.659-.834 1.129-1.082a3.37 3.37 0 0 1 1.616-.385c.333 0 .664.043.986.128.309.081.605.205.879.369l-.5 1.169a1.314 1.314 0 0 0-.563-.357 2.3 2.3 0 0 0-.754-.124 1.733 1.733 0 0 0-1.863 1.848c-.006.344.073.684.232.99a1.7 1.7 0 0 0 1.542.925c.258.004.513-.051.746-.162.209-.097.387-.25.513-.443.121-.185.185-.401.183-.622H6.124V9.619L9 9.6v.928a2.4 2.4 0 0 1-1.293 2.193 2.955 2.955 0 0 1-1.417.328 3.247 3.247 0 0 1-1.579-.385Zm5.471-5.648H11.5v5.968h-1.318V7.016Zm2.862 0H16.5v1.169h-2.138v1.392h1.79v1.169h-1.79v2.238h-1.318V7.016ZM10 20a18.04 18.04 0 0 1-6.369-1.162 4.226 4.226 0 0 1-2.469-2.47 18.033 18.033 0 0 1 0-12.737 4.228 4.228 0 0 1 2.469-2.469 18.116 18.116 0 0 1 12.738 0 4.228 4.228 0 0 1 2.469 2.469 18.035 18.035 0 0 1 0 12.738 4.225 4.225 0 0 1-2.469 2.469A18.04 18.04 0 0 1 10 20Zm0-18.75a16.8 16.8 0 0 0-5.929 1.082 2.978 2.978 0 0 0-1.739 1.739 16.783 16.783 0 0 0 0 11.857 2.98 2.98 0 0 0 1.739 1.74 16.858 16.858 0 0 0 11.858 0 2.978 2.978 0 0 0 1.739-1.739 16.785 16.785 0 0 0 0-11.858 2.978 2.978 0 0 0-1.739-1.739A16.8 16.8 0 0 0 10 1.25Z"></path>{" "}
            </svg>
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
          receiver={
            selectedChat
              ? selectedChat.users.find((u) => u.id !== currentUser.id)
              : null
          }
          setGifIcon={setGifIcon}
          GifIcon={liveChatIcons.GifIcon}
          GifIconDark={liveChatIcons.GifIconDark}
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
        <svg
          rpl=""
          fill="currentColor"
          height="20"
          viewBox="0 0 20 20"
          width="20"
          xmlns="http://www.w3.org/2000/svg"
        >
          {" "}
          <path d="M18.885 8.994 1.988.545a1.125 1.125 0 0 0-1.54 1.443L3.821 10 .448 18.012a1.128 1.128 0 0 0 1.034 1.563c.176 0 .349-.041.506-.12l16.9-8.449a1.125 1.125 0 0 0 0-2.012h-.003Z"></path>
        </svg>
      </button>

      {emojisOverlay && (
        <ChatEmojis
          receiver={
            selectedChat
              ? selectedChat.users.find((u) => u.id !== currentUser.id)
              : null
          }
          setEmojisOverlay={setEmojisOverlay}
          socket={socket}
        />
      )}
    </div>
  );
};
