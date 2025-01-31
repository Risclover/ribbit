// import React, { useState, useEffect, useContext, useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { io } from "socket.io-client";

// import { ChatNavMenu } from "../ChatNavMenu";
// import { ChatThread, ChatTitleBar } from "../ChatThread";
// import { ChatInput } from "../ChatInput";
// import {
//   DeleteMessageOverlay,
//   CreateChatOverlay,
//   ChatWelcomeOverlay,
//   MessageInviteOverlay,
// } from "../ChatWindowOverlays";
// import { useUserSearch } from "../../hooks";

// import { SelectedChatContext } from "@/context";
// import {
//   getUserChatThreads,
//   getChatThread,
//   fakeDeleteMessage,
//   addReaction,
//   removeReaction,
// } from "@/store";
// import { NewChatIcon } from "@/assets";
// import "../../styles/index.css";

// export const Chat = ({ setOpenChat, setMinimizeChat }) => {
//   const dispatch = useDispatch();
//   const [messages, setMessages] = useState([]);
//   const chatThreads = useSelector((state) => state.chatThreads);
//   const user = useSelector((state) => state.session.user);
//   const socketRef = useRef(null);

//   const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
//   const [showChatWelcomeOverlay, setShowChatWelcomeOverlay] = useState(
//     Object.keys(chatThreads)?.length === 0 || !chatThreads ? true : false
//   );
//   const [showCreateChatOverlay, setShowCreateChatOverlay] = useState(false);
//   const [showMessageInviteOverlay, setShowMessageInviteOverlay] =
//     useState(false);
//   const [username, setUsername] = useState("");
//   const { selectedChat, setSelectedChat } = useContext(SelectedChatContext);
//   const { userFound } = useUserSearch(username);
//   const [inputTexts, setInputTexts] = useState({});
//   const [msgId, setMsgId] = useState(null);
//   const [pendingInputText, setPendingInputText] = useState("");

//   useEffect(() => {
//     console.log("userFound:", userFound);
//   }, [userFound]);

//   // Function to handle updating input text for a specific thread
//   const handleInputChange = (threadId, text) => {
//     setInputTexts((prev) => ({ ...prev, [threadId]: text }));
//   };

//   const clearInput = (threadId) => {
//     setInputTexts((prev) => ({ ...prev, [threadId]: "" }));
//   };

//   // Get the current input text based on selectedChat
//   const currentInputText = selectedChat
//     ? inputTexts[selectedChat.id] || ""
//     : "";

//   useEffect(() => {
//     // Initialize socket only once
//     if (!socketRef.current) {
//       socketRef.current = io();

//       socketRef.current.on("connect", () => {
//         // Join all rooms after connecting
//         if (chatThreads && user) {
//           Object.values(chatThreads).forEach((thread) => {
//             socketRef.current.emit("join", {
//               user: user.id,
//               room: thread.id,
//             });
//           });
//         }
//       });

//       socketRef.current.on("chat", (chat) => {
//         if (chat.threadId === selectedChat?.id) {
//           setMessages((prevMessages) => {
//             // Check if the message already exists
//             const messageExists = prevMessages.some(
//               (msg) => msg.id === chat.id
//             );
//             if (!messageExists) {
//               return [...prevMessages, chat];
//             } else {
//               return prevMessages;
//             }
//           });
//         }
//         // Update chat threads to reflect new messages
//         dispatch(getUserChatThreads());
//       });

//       // Handle reactions added
//       socketRef.current.on("reaction_added", (data) => {
//         dispatch(addReaction(data));
//       });

//       // Handle reactions removed
//       socketRef.current.on("reaction_removed", (data) => {
//         dispatch(removeReaction(data));
//       });

//       // Handle deleted messages
//       socketRef.current.on("deleted", (data) => {
//         dispatch(getChatThread(selectedChat?.id));
//       });
//     }

//     return () => {
//       // Clean up socket connection when component unmounts
//       if (socketRef.current) {
//         socketRef.current.disconnect();
//         socketRef.current = null;
//       }
//     };
//   }, [dispatch, selectedChat?.id]);

//   useEffect(() => {
//     if (selectedChat) {
//       dispatch(getChatThread(selectedChat.id)).then((data) => {
//         if (data) {
//           setMessages(data.messages);
//         }
//       });
//     }
//   }, [dispatch, selectedChat]);

//   const handleDeleteMsg = (e) => {
//     e.preventDefault();
//     dispatch(fakeDeleteMessage(msgId));
//     dispatch(getChatThread(selectedChat.id));
//     socketRef.current.emit("delete", { id: msgId, room: selectedChat.id });
//     setShowDeleteConfirmation(false);
//   };

//   return (
//     <div className="chat-window-container">
//       <div className="chat-window-left">
//         <div className="chat-window-chatnav-title">
//           Chats{" "}
//           <button
//             className="chat-window-create-chat-btn"
//             onClick={() => {
//               setSelectedChat(null);
//               setShowCreateChatOverlay(true);
//             }}
//           >
//             <NewChatIcon height={16} width={16} />
//           </button>
//         </div>
//         <ChatNavMenu
//           socket={socketRef.current}
//           setShowCreateChatOverlay={setShowCreateChatOverlay}
//           setShowMessageInviteOverlay={setShowMessageInviteOverlay}
//           setShowChatWelcomeOverlay={setShowChatWelcomeOverlay}
//         />
//       </div>
//       <div className="chat-window-right">
//         <ChatTitleBar
//           showCreateChatOverlay={showCreateChatOverlay}
//           setShowChatWelcomeOverlay={setShowChatWelcomeOverlay}
//           showChatWelcomeOverlay={showChatWelcomeOverlay}
//           setOpenChat={setOpenChat}
//           setMinimizeChat={setMinimizeChat}
//         />
//         <ChatThread
//           setSelectedChat={setSelectedChat}
//           selectedChat={selectedChat}
//           setMessages={setMessages}
//           messages={messages}
//           setShowDeleteConfirmation={setShowDeleteConfirmation}
//           setMsgId={setMsgId}
//           socket={socketRef.current}
//         />
//         <ChatInput
//           setUsername={setUsername}
//           socket={socketRef.current}
//           selectedChat={selectedChat}
//           userFound={userFound}
//           showMessageInviteOverlay={showMessageInviteOverlay}
//           setShowMessageInviteOverlay={setShowMessageInviteOverlay}
//           onInputChange={(text) => {
//             if (selectedChat) {
//               handleInputChange(selectedChat.id, text);
//             } else {
//               setPendingInputText(text);
//             }
//           }}
//           inputText={selectedChat ? currentInputText : pendingInputText}
//           clearInput={clearInput}
//         />
//       </div>
//       {showDeleteConfirmation && (
//         <DeleteMessageOverlay
//           setShowDeleteConfirmation={setShowDeleteConfirmation}
//           selectedChat={selectedChat}
//           socket={socketRef.current}
//           handleDeleteMsg={handleDeleteMsg}
//         />
//       )}
//       {showChatWelcomeOverlay && (
//         <ChatWelcomeOverlay
//           setShowCreateChatOverlay={setShowCreateChatOverlay}
//           setShowChatWelcomeOverlay={setShowChatWelcomeOverlay}
//         />
//       )}
//       {showMessageInviteOverlay && <MessageInviteOverlay />}
//       {showCreateChatOverlay && (
//         <CreateChatOverlay
//           setShowCreateChatOverlay={setShowCreateChatOverlay}
//           setShowChatWelcomeOverlay={setShowChatWelcomeOverlay}
//           setShowMessageInviteOverlay={setShowMessageInviteOverlay}
//           showMessageInviteOverlay={showMessageInviteOverlay}
//           username={username}
//           setUsername={setUsername}
//           userFound={userFound}
//         />
//       )}
//     </div>
//   );
// };

// export default Chat;

// src/components/Chat/Chat.js
import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";

import { ChatNavMenu } from "../ChatNavMenu";
import { ChatThread, ChatTitleBar } from "../ChatThread";
import { ChatInput } from "../ChatInput";
import {
  DeleteMessageOverlay,
  CreateChatOverlay,
  ChatWelcomeOverlay,
  MessageInviteOverlay,
} from "../ChatWindowOverlays";

import { NewChatIcon } from "@/assets";
import { SelectedChatContext } from "@/context";
import { useUserSearch } from "../../hooks";

import {
  getUserChatThreads,
  getChatThread,
  fakeDeleteMessage,
  addReaction,
  removeReaction,
} from "@/store";

import "../../styles/index.css";
import { useChatSocket } from "@/features/Chat/hooks/useChatSocket";

// Overlays can be enumerated to avoid multiple booleans
const OVERLAYS = {
  NONE: null,
  WELCOME: "WELCOME",
  CREATE: "CREATE",
  INVITE: "INVITE",
  DELETE: "DELETE",
};

export const Chat = ({ setOpenChat, setMinimizeChat }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const chatThreads = useSelector((state) => state.chatThreads);

  const { selectedChat, setSelectedChat } = useContext(SelectedChatContext);

  // We only need to store which overlay is active, and maybe which msg is pending deletion.
  const [activeOverlay, setActiveOverlay] = useState(OVERLAYS.NONE);
  const [msgIdToDelete, setMsgIdToDelete] = useState(null);

  // Searching for user in the "create chat" overlay
  const [username, setUsername] = useState("");
  const { userFound } = useUserSearch(username);

  // This “pending input text” is used if no chat is selected yet
  const [pendingInputText, setPendingInputText] = useState("");

  // Socket ref
  const socketRef = useRef(null);

  // Initialize / join rooms on mount
  useChatSocket({
    socketRef,
    user,
    chatThreads,
    selectedChat,
    dispatch,
    onDelete: () => {
      if (selectedChat?.id) {
        dispatch(getChatThread(selectedChat.id));
      }
    },
    onReactionAdd: (data) => dispatch(addReaction(data)),
    onReactionRemove: (data) => dispatch(removeReaction(data)),
    onNewMessage: () => dispatch(getUserChatThreads()),
  });

  // If no threads exist, show the welcome overlay by default.
  useEffect(() => {
    if (Object.keys(chatThreads).length === 0) {
      setActiveOverlay(OVERLAYS.WELCOME);
    }
  }, [chatThreads]);

  // Each time selectedChat changes, fetch fresh messages.
  useEffect(() => {
    if (selectedChat?.id) {
      dispatch(getChatThread(selectedChat.id));
    }
  }, [dispatch, selectedChat?.id]);

  // Current messages for the selected thread, from Redux:
  const currentThreadMessages = selectedChat
    ? chatThreads[selectedChat.id]?.messages || []
    : [];

  // Called by the delete overlay’s “Confirm” button
  const handleDeleteMsg = (e) => {
    e.preventDefault();
    if (!selectedChat?.id || !msgIdToDelete) return;
    dispatch(fakeDeleteMessage(msgIdToDelete));
    dispatch(getChatThread(selectedChat.id));
    // Emit the deletion event
    socketRef.current.emit("delete", {
      id: msgIdToDelete,
      room: selectedChat.id,
    });
    setActiveOverlay(OVERLAYS.NONE);
    setMsgIdToDelete(null);
  };

  const openCreateChat = () => {
    setSelectedChat(null);
    setActiveOverlay(OVERLAYS.CREATE);
  };

  return (
    <div className="chat-window-container">
      {/* Left side: Chat nav + "Create new chat" button */}
      <div className="chat-window-left">
        <div className="chat-window-chatnav-title">
          Chats{" "}
          <button
            className="chat-window-create-chat-btn"
            onClick={openCreateChat}
          >
            <NewChatIcon height={16} width={16} />
          </button>
        </div>
        <ChatNavMenu setActiveOverlay={setActiveOverlay} OVERLAYS={OVERLAYS} />
      </div>

      {/* Right side: Title bar, Thread, Input */}
      <div className="chat-window-right">
        <ChatTitleBar
          showCreateChatOverlay={activeOverlay === OVERLAYS.CREATE}
          showChatWelcomeOverlay={activeOverlay === OVERLAYS.WELCOME}
          setActiveOverlay={setActiveOverlay}
          setOpenChat={setOpenChat}
          setMinimizeChat={setMinimizeChat}
          OVERLAYS={OVERLAYS}
        />

        <ChatThread
          messages={currentThreadMessages}
          setActiveOverlay={setActiveOverlay}
          setMsgIdToDelete={setMsgIdToDelete}
          OVERLAYS={OVERLAYS}
          socket={socketRef.current}
        />

        <ChatInput
          socket={socketRef.current}
          showMessageInviteOverlay={activeOverlay === OVERLAYS.INVITE}
          setActiveOverlay={setActiveOverlay}
          OVERLAYS={OVERLAYS}
          userFound={userFound}
          username={username}
          setUsername={setUsername}
          inputText={selectedChat ? undefined : pendingInputText}
          setPendingInputText={setPendingInputText}
        />
      </div>

      {/* Overlays */}
      {activeOverlay === OVERLAYS.DELETE && (
        <DeleteMessageOverlay
          setActiveOverlay={setActiveOverlay}
          handleDeleteMsg={handleDeleteMsg}
        />
      )}
      {activeOverlay === OVERLAYS.WELCOME && (
        <ChatWelcomeOverlay
          setActiveOverlay={setActiveOverlay}
          OVERLAYS={OVERLAYS}
        />
      )}
      {activeOverlay === OVERLAYS.INVITE && <MessageInviteOverlay />}
      {activeOverlay === OVERLAYS.CREATE && (
        <CreateChatOverlay
          setActiveOverlay={setActiveOverlay}
          OVERLAYS={OVERLAYS}
          username={username}
          setUsername={setUsername}
          userFound={userFound}
        />
      )}
    </div>
  );
};
