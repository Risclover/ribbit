import React, { useContext, useState } from "react";
import { ChatWindowOverlayContainer } from "./ChatWindowOverlayContainer";
import { useUserSearch } from "features/Chat/hooks/useUserSearch";
import { useSelector } from "react-redux";
import { SelectedChatContext } from "context";

export const CreateChatOverlay = ({
  setShowCreateChatOverlay,
  setShowChatWelcomeOverlay,
  setShowMessageInviteOverlay,
  username,
  setUsername,
  userFound,
}) => {
  const { selectedChat, setSelectedChat, setPendingReceiver } =
    useContext(SelectedChatContext);

  const [isChosen, setIsChosen] = useState(false);

  const userChats = useSelector((state) => Object.values(state.chatThreads));
  const currentUser = useSelector((state) => state.session.user);

  // Get to point between message invitation and actually creating the thread
  const handleStartChat = async (e) => {
    e.preventDefault();

    const existingThread = userChats.find(
      (thread) =>
        thread.users?.some((user) => user.id === currentUser?.id) &&
        thread.users?.some((user) => user.id === userFound.id)
    );
    console.log("existingThread:", existingThread);
    // If the thread does not exist, close the overlays. If it does exist, set the selected chat to the existing thread and open it.
    if (existingThread === undefined) {
      setShowChatWelcomeOverlay(false);
      setShowMessageInviteOverlay(true);
      setPendingReceiver(username);
    } else {
      setSelectedChat(existingThread);
    }

    setShowCreateChatOverlay(false);
  };

  return (
    <ChatWindowOverlayContainer>
      <div className="new-chat-overlay">
        <div className="new-chat-overlay-main">
          <div className="new-chat-username-input">
            <div className="new-chat-input-bar">
              <input
                type="text"
                name="new-chat"
                id="new-chat"
                value={username}
                onChange={(e) => {
                  setIsChosen(false);
                  setUsername(e.target.value);
                }}
                placeholder=" "
                autoFocus
              />
              <label htmlFor="new-chat" className="new-chat-label-text">
                Type username
              </label>
            </div>
          </div>
          {!userFound && (
            <div className="new-chat-instructions">
              Search for people by username to chat with them.
            </div>
          )}
          {userFound && (
            <button
              className="new-chat-user-found"
              onClick={() => setIsChosen(!isChosen)}
            >
              <div className="new-chat-user-found-left">
                <img src={userFound?.profileImg} alt="User" />{" "}
                {userFound?.username}
              </div>
              <div
                className={
                  isChosen
                    ? "new-chat-user-found-right found-right"
                    : "new-chat-user-found-right"
                }
              >
                <span className="material-symbols-outlined">
                  {isChosen ? "check_box" : "check_box_outline_blank"}
                </span>
              </div>
            </button>
          )}
        </div>
        <div className="new-chat-overlay-btns-container">
          <button
            className="overlay-btn-left"
            onClick={() => {
              if (selectedChat === null) {
                setShowChatWelcomeOverlay(true);
              }
              setShowCreateChatOverlay(false);
            }}
          >
            Cancel
          </button>
          <button
            className="overlay-btn-right"
            disabled={!isChosen}
            onClick={handleStartChat}
          >
            Start Chat
          </button>
        </div>
      </div>
    </ChatWindowOverlayContainer>
  );
};
