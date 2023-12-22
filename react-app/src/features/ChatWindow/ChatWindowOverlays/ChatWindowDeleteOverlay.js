import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { fakeDeleteMessage, getChatThread } from "../../../store/chats";
import "./ChatWindowOverlay.css";
import { SelectedChatContext } from "../../../context/SelectedChat";

export function ChatWindowDeleteOverlay({ socket, msgId, setDeleteOverlay }) {
  const dispatch = useDispatch();
  const { selectedChat } = useContext(SelectedChatContext);

  const handleDeleteMsg = (e) => {
    e.preventDefault();
    dispatch(fakeDeleteMessage(msgId));
    dispatch(getChatThread(selectedChat.id));
    socket.emit("delete", { id: msgId, room: selectedChat.id });
    setDeleteOverlay(false);
  };

  return (
    <div className="overlay-container">
      <div className="delete-overlay">
        <div></div>
        <div className="delete-overlay-text">
          <div className="delete-overlay-title">Delete this message?</div>
          <div className="delete-overlay-para">
            It will be removed for everyone in this chat. You can't undo this.
          </div>
        </div>
        <div className="delete-overlay-btns">
          <button
            className="overlay-btn-left"
            onClick={() => setDeleteOverlay(false)}
          >
            Cancel
          </button>
          <button className="overlay-btn-right" onClick={handleDeleteMsg}>
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
}
