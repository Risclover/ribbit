import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SelectedChatContext } from "@/context";
import { ChatEmojis, ChatGifs } from "@/features";
import { useAutosizeTextArea } from "@/hooks";
import { getChatThread, createChatMessage, createChatThread } from "@/store";
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
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  const textareaRef = useRef(null);

  const { selectedChat, setSelectedChat, setPendingReceiver } =
    useContext(SelectedChatContext);

  const [openGiphy, setOpenGiphy] = useState(false);
  const [gifIcon, setGifIcon] = useState(liveChatIcons.GifIcon);
  const [receiver, setReceiver] = useState(null);
  const [emojisOverlay, setEmojisOverlay] = useState(false);
  const [newlyCreatedChatId, setNewlyCreatedChatId] = useState(null);
  useAutosizeTextArea(textareaRef.current, inputText);

  useEffect(() => {
    setReceiver(() =>
      selectedChat?.users?.find((user) => user.id !== currentUser?.id)
    );
  }, [selectedChat?.users, currentUser?.id]);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   let chatThreadId = selectedChat?.id;

  //   if (showMessageInviteOverlay) {
  //     setShowMessageInviteOverlay(false);
  //     const newChat = await handleCreateNewThread();
  //     chatThreadId = newChat?.id;
  //     console.log("newChat:", newChat);
  //   }
  // };
  const sendMessage = async () => {
    if (!selectedChat) return;

    // Identify the "other user" in the thread
    const receiver = selectedChat?.users?.find((u) => u.id !== currentUser?.id);

    const payload = {
      content: inputText,
      receiverId: receiver?.id, // if you need this
      chatThreadId: selectedChat.id,
    };

    // Create the message via Redux
    const data = await dispatch(createChatMessage(payload));
    data.room = selectedChat.id;

    // Emit over socket
    socket.emit("chat", data);

    // Optionally fetch the thread again or do an optimistic update
    dispatch(getChatThread(selectedChat.id));

    clearInput(selectedChat.id);
  };

  // 3) The actual submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // If we’re currently in invite flow, create the new thread first
    if (showMessageInviteOverlay) {
      setShowMessageInviteOverlay(false);
      await handleCreateNewThread();
      // Note: We do NOT immediately call `sendMessage()` here
      // We'll let the `useEffect` below detect when selectedChat is updated
    } else {
      // For an existing thread, we just send a message right away
      sendMessage();
    }
  };

  // 4) Once `selectedChat` is updated to the newly created thread, THEN send the first message
  useEffect(() => {
    // If we've just turned off invite mode,
    // and selectedChat?.id now matches the newly created chat,
    // we know the new thread is "in state" and can safely send the message.
    if (
      !showMessageInviteOverlay &&
      selectedChat?.id === newlyCreatedChatId &&
      newlyCreatedChatId != null
    ) {
      sendMessage();
      // Clear it so we don't keep re-sending
      setNewlyCreatedChatId(null);
    }
  }, [showMessageInviteOverlay, selectedChat?.id, newlyCreatedChatId]);

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
    console.log("userFound in ChatInput:", userFound);
    const newChat = await dispatch(createChatThread(userFound?.id));
    setNewlyCreatedChatId(newChat.id);
    setSelectedChat(newChat);
    socket.emit("join", {
      user: currentUser?.id,
      room: newChat.id,
    });
    setPendingReceiver(null);
    setUsername("");
    return newChat;
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
