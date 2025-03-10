import React from "react";
import { useSelector } from "react-redux";
import { ChatWindowOverlayContainer } from "./ChatWindowOverlayContainer";
import { useCreateChatOverlay } from "../../hooks/useCreateChatOverlay";

export const CreateChatOverlay = ({
  setActiveOverlay,
  OVERLAYS,
  username,
  setUsername,
  userFound,
}) => {
  const currentUser = useSelector((state) => state.session.user);

  const { isChosen, setIsChosen, error, setError, handleStartChat } =
    useCreateChatOverlay({
      username,
      userFound,
      setActiveOverlay,
      OVERLAYS,
    });

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
                  setError(false);
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

          <div className="new-chat-instructions">
            Search for people by username to chat with them.
          </div>

          {error && (
            <div className="new-chat-error">You can't talk to yourself.</div>
          )}
          {userFound && (
            <button
              className="new-chat-user-found"
              onClick={() =>
                userFound.id === currentUser?.id
                  ? setError(true)
                  : setIsChosen(!isChosen)
              }
            >
              <div className="new-chat-user-found-left">
                <img src={userFound?.profileImg} alt="User" />
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
            onClick={() => setActiveOverlay(null)}
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
