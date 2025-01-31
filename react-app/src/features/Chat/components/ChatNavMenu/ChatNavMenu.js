// import React from "react";
// import { ChatNavBtn } from "./ChatNavBtn";
// import { useSortedChatThreads } from "../../hooks";

// export function ChatNavMenu({
//   selectedChat,
//   setSelectedChat,
//   setShowMessageInviteOverlay,
//   setShowChatWelcomeOverlay,
//   setShowCreateChatOverlay,
// }) {
//   const sortedChatThreads = useSortedChatThreads();

//   return (
//     <div className="chat-window-chatnav-container">
//       {sortedChatThreads.length > 0 &&
//         sortedChatThreads.map((chatThread) => (
//           <ChatNavBtn
//             key={chatThread.id}
//             chatThread={chatThread}
//             setSelectedChat={setSelectedChat}
//             selectedChat={selectedChat}
//             setShowMessageInviteOverlay={setShowMessageInviteOverlay}
//             setShowChatWelcomeOverlay={setShowChatWelcomeOverlay}
//             setShowCreateChatOverlay={setShowCreateChatOverlay}
//           />
//         ))}
//     </div>
//   );
// }

import React, { useContext } from "react";
import { ChatNavBtn } from "./ChatNavBtn";
import { useSortedChatThreads } from "../../hooks";
import { SelectedChatContext } from "@/context";

export function ChatNavMenu({ setActiveOverlay, OVERLAYS }) {
  const sortedChatThreads = useSortedChatThreads();
  const { selectedChat, setSelectedChat } = useContext(SelectedChatContext);

  return (
    <div className="chat-window-chatnav-container">
      {sortedChatThreads.map((chatThread) => (
        <ChatNavBtn
          key={chatThread.id}
          chatThread={chatThread}
          selectedChat={selectedChat}
          setSelectedChat={setSelectedChat}
          setActiveOverlay={setActiveOverlay}
          OVERLAYS={OVERLAYS}
        />
      ))}
    </div>
  );
}
