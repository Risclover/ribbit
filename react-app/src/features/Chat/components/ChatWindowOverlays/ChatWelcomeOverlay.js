import React from "react";
import { ribbitBanners } from "@/assets";
import { ChatWindowOverlayContainer } from "./ChatWindowOverlayContainer";
import { NewChatIcon } from "assets/icons/NewChatIcon";

export const ChatWelcomeOverlay = ({ setShowCreateChatOverlay }) => {
  return (
    <ChatWindowOverlayContainer>
      <div className="welcome-overlay">
        <img
          src={ribbitBanners.FrogLogo}
          className="welcome-overlay-img"
          alt="Frog"
        />
        <h4 className="welcome-overlay-title">Welcome to chat!</h4>
        <div className="welcome-overlay-para">
          Start a chat with another ribbitor.
        </div>
        <button
          className="welcome-overlay-btn"
          onClick={() => setShowCreateChatOverlay(true)}
        >
          <NewChatIcon height="24" width="24" />
          Start new chat
        </button>
      </div>
    </ChatWindowOverlayContainer>
  );
};
