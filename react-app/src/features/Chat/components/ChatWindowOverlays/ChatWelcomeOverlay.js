// import React from "react";
// import { ChatWindowOverlayContainer } from "./ChatWindowOverlayContainer";
// import { ribbitBanners, NewChatIcon } from "@/assets";

// export const ChatWelcomeOverlay = ({
//   setShowCreateChatOverlay,
//   setShowChatWelcomeOverlay,
// }) => {
//   return (
//     <ChatWindowOverlayContainer>
//       <div className="welcome-overlay">
//         <img
//           src={ribbitBanners.FrogLogo}
//           className="welcome-overlay-img"
//           alt="Frog"
//         />
//         <h4 className="welcome-overlay-title">Welcome to chat!</h4>
//         <div className="welcome-overlay-para">
//           Start a chat with another ribbitor.
//         </div>
//         <button
//           className="welcome-overlay-btn"
//           onClick={() => {
//             setShowChatWelcomeOverlay(false);
//             setShowCreateChatOverlay(true);
//           }}
//         >
//           <NewChatIcon height="24" width="24" />
//           Start new chat
//         </button>
//       </div>
//     </ChatWindowOverlayContainer>
//   );
// };

import React from "react";
import { ChatWindowOverlayContainer } from "./ChatWindowOverlayContainer";
import { ribbitBanners, NewChatIcon } from "@/assets";

export const ChatWelcomeOverlay = ({ setActiveOverlay, OVERLAYS }) => {
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
          onClick={() => {
            setActiveOverlay(OVERLAYS.CREATE);
          }}
        >
          <NewChatIcon height="24" width="24" />
          Start new chat
        </button>
      </div>
    </ChatWindowOverlayContainer>
  );
};
