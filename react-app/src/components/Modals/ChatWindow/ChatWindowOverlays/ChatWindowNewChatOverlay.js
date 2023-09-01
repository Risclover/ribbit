import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../../../store/users";
import { RxBox } from "react-icons/rx";
import { createChatThread, getUserChatThreads } from "../../../../store/chats";

export default function ChatWindowNewChatOverlay({
  setMessageInviteOverlay,
  setNewChatOverlay,
  setSelectedChat,
  setWelcomeOverlay,
  setUserFound,
  userFound,
}) {
  const dispatch = useDispatch();

  const [username, setUsername] = useState();
  const [isChosen, setIsChosen] = useState(false);

  const users = useSelector((state) => Object.values(state.users));
  const userChats = useSelector((state) => Object.values(state.chatThreads));

  const currentUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    if (username && username.length > 0) {
      setUserFound(
        users.find(
          (user) => user.username.toLowerCase() === username.toLowerCase()
        )
      );
    }
  }, [username]);

  useEffect(() => {
    if (username !== userFound?.username) {
      setIsChosen(false);
    }
  }, [username]);

  const handleStartChat = async (e) => {
    e.preventDefault();
    const existingThread = userChats.find(
      (thread) =>
        thread.users?.some((user) => user.id === currentUser.id) &&
        thread.users?.some((user) => user.id === userFound.id)
    );

    if (!existingThread) {
      setNewChatOverlay(false);
      setWelcomeOverlay(false);
      setMessageInviteOverlay(true);
    } else {
      setSelectedChat(existingThread);
      setNewChatOverlay(false);
    }
  };

  return (
    <div className="overlay-container">
      <div className="new-chat-overlay">
        <div className="new-chat-overlay-main">
          <div className="new-chat-username-input">
            <div className={"new-chat-input-bar"}>
              <input
                type="text"
                name="new-chat"
                id="new-chat"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
                <img src={userFound?.profile_img} alt="User" />{" "}
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
            onClick={() => setNewChatOverlay(false)}
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
    </div>
  );
}
