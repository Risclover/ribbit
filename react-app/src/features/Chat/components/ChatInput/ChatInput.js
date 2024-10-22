import { SelectedChatContext } from "context";
import { Emojis, Gifs } from "features/ChatWindow";
import { useAutosizeTextArea } from "@/hooks";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChatThread } from "store";
import { createChatMessage } from "store";
import { liveChatIcons } from "@/assets";
import { createChatThread } from "store";
import { useUserSearch } from "features/Chat/hooks/useUserSearch";

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
  useEffect(() => {
    console.log("Updated chatThreads:", chatThreads);
  }, [chatThreads]);
  const { selectedChat, setSelectedChat, setPendingReceiver, pendingReceiver } =
    useContext(SelectedChatContext);

  const [openGiphy, setOpenGiphy] = useState(false);
  const [gifIcon, setGifIcon] = useState(liveChatIcons.GifIcon);
  const [receiver, setReceiver] = useState(null);
  const [emojisOverlay, setEmojisOverlay] = useState(false);

  const chat = Object.values(chatThreads).find(
    (chat) => chat?.id === selectedChat?.id
  );

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
      chatThreadId = newChat.id; // Use the new thread's ID
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
    onInputChange("");
  };

  const handleOpenGiphy = () => {
    setEmojisOverlay(false);
    if (openGiphy) {
      setGifIcon(liveChatIcons.GifIcon);
    } else {
      setGifIcon(liveChatIcons.GifIconDark);
    }
    setOpenGiphy(!openGiphy);
  };

  const handleEnterPress = (e) => {
    if (e.key === "Enter" && inputText.trim().length > 0) {
      handleSubmit(e);
    }
  };

  const handleChange = (e) => {
    const val = e.target?.value;
    onInputChange(val); // Update input text in parent state
  };

  const handleCreateNewThread = async () => {
    const data = await dispatch(createChatThread(userFound?.id));
    setSelectedChat(data);
    setShowMessageInviteOverlay(false);
    setPendingReceiver(null);
    console.log("NEW CHAT::", data);
    console.log("SELECTED CHAT::", selectedChat);

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
          <button className="gif-btn" onClick={handleOpenGiphy}>
            <img src={gifIcon} alt="Gif" />
          </button>
          <button
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
