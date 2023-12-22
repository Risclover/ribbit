import React from "react";
import FrogLogo from "../../../assets/images/ribbit-banners/frog-logo1.png";
import CreateChat from "../../../assets/images/create-chat-white.png";
import "./ChatWindowOverlay.css";

export function ChatWindowWelcomeOverlay({ setNewChatOverlay }) {
  return (
    <div className="overlay-container">
      <div className="welcome-overlay">
        <img src={FrogLogo} className="welcome-overlay-img" alt="Frog" />
        <h4 className="welcome-overlay-title">Welcome to chat!</h4>
        <div className="welcome-overlay-para">
          Start a chat with another ribbitor.
        </div>
        <button
          className="welcome-overlay-btn"
          onClick={() => setNewChatOverlay(true)}
        >
          <img src={CreateChat} alt="Chat" className="create-chat-white" />{" "}
          Start new chat
        </button>
      </div>
    </div>
  );
}
