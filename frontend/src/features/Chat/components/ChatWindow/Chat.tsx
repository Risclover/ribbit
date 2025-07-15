// src/features/Chat/components/Chat.tsx
import React, { useRef, useState, useEffect, MouseEvent } from "react";
import {
  useAppDispatch,
  useAppSelector,
  getChatThread,
  fakeDeleteMessage,
  addReaction,
  removeReaction,
  receiveNewMessage,
} from "@/store";

import { ChatNavMenu } from "../ChatNavMenu";
import { ChatTitleBar, ChatThread } from "../ChatThread";
import { ChatInput } from "../ChatInput";
import {
  DeleteMessageOverlay,
  CreateChatOverlay,
  ChatWelcomeOverlay,
  MessageInviteOverlay,
} from "../ChatWindowOverlays";

import { NewChatIcon } from "@/assets";
import { useSelectedChat } from "@/context";
import { useUserSearch } from "../../hooks";
import { useChatSocket } from "../../hooks/useChatSocket";

import "../../styles/index.css";

export const OVERLAYS = {
  NONE: null,
  WELCOME: "WELCOME",
  CREATE: "CREATE",
  INVITE: "INVITE",
  DELETE: "DELETE",
} as const;

/* -------------------------------------------------------------------- */
/*  Props & helpers                                                     */
/* -------------------------------------------------------------------- */

interface ChatProps {
  /** Optional when Chat lives on its own route */
  setMinimizeChat?: (v: boolean) => void;
  isPage?: boolean;
}

/* -------------------------------------------------------------------- */

export function Chat({
  setMinimizeChat = () => {
    return;
  }, // ←── default no-op
  isPage = false,
}: ChatProps) {
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.session.user);
  const chatThreads = useAppSelector((s) => s.chatThreads);

  const { selectedChat, setSelectedChat } = useSelectedChat();

  /* local state ------------------------------------------------------ */
  const [activeOverlay, setActiveOverlay] = useState<
    (typeof OVERLAYS)[keyof typeof OVERLAYS]
  >(OVERLAYS.NONE);
  const [msgIdToDelete, setMsgIdToDelete] = useState<number | null>(null);
  const [username, setUsername] = useState("");
  const [pendingInputText, setPendingInputText] = useState("");

  const { userFound } = useUserSearch(username);

  /* socket ----------------------------------------------------------- */
  const socketRef = useRef<any>(null);
  // useChatSocket({
  //   socketRef,
  //   user,
  //   chatThreads,
  //   selectedChat,
  //   dispatch,
  //   onDelete: () => {
  //     if (selectedChat?.id) {
  //       dispatch(getChatThread(selectedChat.id));
  //     }
  //   },
  //   onReactionAdd: (d) => dispatch(addReaction(d)),
  //   onReactionRemove: (d) => dispatch(removeReaction(d)),
  // });

  /* effects ---------------------------------------------------------- */
  useEffect(() => {
    if (Object.keys(chatThreads).length === 0) {
      setActiveOverlay(OVERLAYS.WELCOME);
    }
  }, [chatThreads]);

  useEffect(() => {
    if (selectedChat?.id) dispatch(getChatThread(selectedChat.id));
  }, [dispatch, selectedChat?.id]);

  /* helpers ---------------------------------------------------------- */
  const currentThreadMessages = selectedChat
    ? chatThreads[selectedChat.id]?.messages ?? []
    : [];

  const handleDeleteMsg = (e: MouseEvent) => {
    e.preventDefault();
    if (!selectedChat?.id || !msgIdToDelete) return;

    dispatch(fakeDeleteMessage(msgIdToDelete));
    dispatch(getChatThread(selectedChat.id));

    socketRef.current?.emit("delete", {
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

  /* render ----------------------------------------------------------- */
  return (
    <div className="chat-window-container">
      {/* left nav */}
      <div className="chat-window-left">
        <div className="chat-window-chatnav-title">
          Chats
          <button
            className="chat-window-create-chat-btn"
            onClick={openCreateChat}
          >
            <NewChatIcon height={16} width={16} />
          </button>
        </div>

        <ChatNavMenu setActiveOverlay={setActiveOverlay} OVERLAYS={OVERLAYS} />
      </div>

      {/* right pane */}
      <div className="chat-window-right">
        <ChatTitleBar
          showCreateChatOverlay={activeOverlay === OVERLAYS.CREATE}
          showChatWelcomeOverlay={activeOverlay === OVERLAYS.WELCOME}
          setActiveOverlay={setActiveOverlay}
          setMinimizeChat={setMinimizeChat}
          OVERLAYS={OVERLAYS}
          isPage={isPage}
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

      {/* overlays */}
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
}
