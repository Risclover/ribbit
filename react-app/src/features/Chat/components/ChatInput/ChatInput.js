import { SelectedChatContext } from "context";
import { Emojis, Gifs } from "features/ChatWindow";
import { useAutosizeTextArea } from "hooks";
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
}) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  const textareaRef = useRef(null);

  const chatThreads = useSelector((state) => state.chatThreads);

  const { selectedChat, setSelectedChat } = useContext(SelectedChatContext);

  const [openGiphy, setOpenGiphy] = useState(false);
  const [gifIcon, setGifIcon] = useState(liveChatIcons.GifIcon);
  const [content, setContent] = useState();
  const [receiver, setReceiver] = useState(null);
  const [emojisOverlay, setEmojisOverlay] = useState(false);

  const chat = Object.values(chatThreads).find(
    (chat) => chat?.id === selectedChat?.id
  );

  useEffect(() => {
    setReceiver(() =>
      selectedChat?.users?.find((user) => user.id !== currentUser.id)
    );
  }, [selectedChat?.users, currentUser.id]);

  const recipient = chat?.users[0];

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newChat;
    console.log("showMessageInviteOverlay", showMessageInviteOverlay);
    if (showMessageInviteOverlay) {
      let newChat = handleCreateNewThread();
      setSelectedChat(newChat);
    }

    console.log("newChat:", newChat);
    console.log("selectedChat:", selectedChat);

    const payload = {
      content: content,
      receiverId: receiver?.id,
      chatThreadId: selectedChat?.id,
    };

    const data = await dispatch(createChatMessage(payload));
    data.room = chat?.id;
    await socket.emit("chat", data);

    dispatch(getChatThread(chat?.id));
    setContent("");
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

  useAutosizeTextArea(textareaRef.current, content);

  const handleEnterPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  const handleChange = (e) => {
    const val = e.target?.value;
    setContent(val);
  };

  const handleCreateNewThread = () => {
    dispatch(createChatThread(userFound?.id));
    setShowMessageInviteOverlay(false);
  };

  console.log("userFound:", userFound);

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
          content ? "send-chat-msg-btn chat-msg-enabled" : "send-chat-msg-btn"
        }
        onClick={handleSubmit}
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
          setEmojisOverlay={setEmojisOverlay}
          socket={socket}
        />
      )}
    </div>
  );
};
