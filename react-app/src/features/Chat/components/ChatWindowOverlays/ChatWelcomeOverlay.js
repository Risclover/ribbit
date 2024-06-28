import React from "react";
import { ribbitBanners } from "@/assets";
import { ChatWindowOverlayContainer } from "./ChatWindowOverlayContainer";

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
          <svg
            rpl=""
            fill="currentColor"
            height="24"
            icon-name="chat-new-outline"
            viewBox="0 0 20 20"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.063 2.931A9.99 9.99 0 0 0 .123 8.444a9.883 9.883 0 0 0 1.195 6.49L.085 19.009a.729.729 0 0 0 .9.913l4.166-1.194a9.856 9.856 0 0 0 6.448 1.142 9.989 9.989 0 0 0 8.12-12.214 9.991 9.991 0 0 0-2.656-4.725Zm1.57 8.499a8.784 8.784 0 0 1-7.227 7.2 8.664 8.664 0 0 1-5.856-1.112l-.231-.139-3.762 1.078 1.118-3.691-.145-.238a8.655 8.655 0 0 1-1.172-5.893 8.751 8.751 0 1 1 17.275 2.8v-.005Zm-8.008-2.058h3.374v1.25h-3.375v3.379h-1.25v-3.376H6v-1.25h3.375V6.002h1.25v3.37Z"></path>
          </svg>
          Start new chat
        </button>
      </div>
    </ChatWindowOverlayContainer>
  );
};
