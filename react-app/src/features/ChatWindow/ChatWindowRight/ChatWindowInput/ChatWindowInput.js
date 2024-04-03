import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createChatMessage,
  createChatThread,
  getChatThread,
} from "../../../../store";
import { useAutosizeTextArea, Gifs, Emojis } from "../../..";
import { liveChatIcons } from "../../../../assets";
import "./ChatWindowInput.css";
import { SelectedChatContext } from "../../../../context/SelectedChat";

export function ChatWindowInput({
  socket,
  messageInviteOverlay,
  setMessageInviteOverlay,
  userFound,
}) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  const textareaRef = useRef(null);

  const { selectedChat, setSelectedChat } = useContext(SelectedChatContext);

  const [openGiphy, setOpenGiphy] = useState(false);
  const [gifIcon, setGifIcon] = useState(GifIcon);
  const [content, setContent] = useState();
  const [receiver, setReceiver] = useState(null);
  const [emojisOverlay, setEmojisOverlay] = useState(false);

  useAutosizeTextArea(textareaRef.current, content);

  useEffect(() => {
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

  const handleCreateNewThread = () => {
    dispatch(createChatThread(userFound?.id));
    setMessageInviteOverlay(false);
    return newChat;
  };

  const handleSendChatMsg = async (e) => {
    e.preventDefault();
    setContent("");

    let newChat;

    if (messageInviteOverlay === true) {
      newChat = await handleCreateNewThread();
      setSelectedChat(newChat);

      setReceiver(() =>
        selectedChat?.users.find((user) => user.id !== currentUser.id)
      );

      const payload = {
        content: content,
        receiverId: receiver.id,
        chatThreadId: newChat ? newChat.id : selectedChat?.id,
      };

      const data = await dispatch(createChatMessage(payload));

      socket.emit("chat", data);
      socket.emit("last", data);

      dispatch(getChatThread(selectedChat?.id));
    } else {
      setReceiver(() =>
        selectedChat?.users.find((user) => user.id !== currentUser.id)
      );

      const payload = {
        content: content,
        receiverId: receiver.id,
        chatThreadId: newChat ? newChat.id : selectedChat?.id,
      };

      const data = await dispatch(createChatMessage(payload));

      socket.emit("chat", data);
      socket.emit("last", data);

      await dispatch(getChatThread(selectedChat?.id));
    }
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
          setEmojisOverlay={setEmojisOverlay}
          socket={socket}
        />
      )}
    </div>
  );
}
