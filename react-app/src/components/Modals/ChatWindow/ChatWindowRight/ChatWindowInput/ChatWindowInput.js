import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAutosizeTextArea from "../ChatWindowMessages/useAutosizeTextArea";
import { createChatMessage, getChatThread } from "../../../../../store/chats";
import Emojis from "./Emojis";
import { GiphyFetch } from "@giphy/js-fetch-api";
import GifIcon from "../../../../../images/gif-icon.png";
import GifIconDark from "../../../../../images/gif-icon-dark.png";
import Gifs from "./Gifs";

const giphy = new GiphyFetch(process.env.REACT_APP_GIPHY_KEY);

export default function ChatWindowInput({ socket, selectedChat }) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  const textareaRef = useRef(null);

  const [openGiphy, setOpenGiphy] = useState(false);
  const [gifIcon, setGifIcon] = useState(GifIcon);
  const [content, setContent] = useState();
  const [receiver, setReceiver] = useState(null);
  const [emojisOverlay, setEmojisOverlay] = useState(false);

  useAutosizeTextArea(textareaRef.current, content);

  useEffect(() => {
    // ...

    setReceiver(() =>
      selectedChat?.users?.find((user) => user.id !== currentUser.id)
    );

    console.log("receiver:", receiver);
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

  const handleSendChatMsg = async (e) => {
    e.preventDefault();
    setContent("");
    const payload = {
      content: content,
      receiverId: receiver.id,
      chatThreadId: selectedChat?.id,
    };

    console.log("payload:", payload);

    const data = await dispatch(createChatMessage(payload));
    console.log("data:", data);
    socket.emit("chat", data);
    socket.emit("last", data);
    await dispatch(getChatThread(selectedChat?.id));
  };

  const handleOpenGiphy = () => {
    console.log("gif icon:", gifIcon);
    setEmojisOverlay(false);
    if (openGiphy) {
      setGifIcon(GifIcon);
    } else {
      setGifIcon(GifIconDark);
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
              setGifIcon(GifIcon);
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
          selectedChat={selectedChat}
          setGifIcon={setGifIcon}
          GifIcon={GifIcon}
          gifIcon={gifIcon}
          GifIconDark={GifIconDark}
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
          selectedChat={selectedChat}
          setEmojisOverlay={setEmojisOverlay}
          socket={socket}
        />
      )}
    </div>
  );
}
