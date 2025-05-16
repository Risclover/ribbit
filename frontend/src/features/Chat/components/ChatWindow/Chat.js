import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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
import { receiveNewMessage } from "@/store";

export const OVERLAYS = {
  NONE: null,
  WELCOME: "WELCOME",
  CREATE: "CREATE",
  INVITE: "INVITE",
  DELETE: "DELETE",
};

export const Chat = ({ setMinimizeChat }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const chatThreads = useSelector((state) => state.chatThreads);

  const { selectedChat, setSelectedChat } = useContext(SelectedChatContext);
  const [activeOverlay, setActiveOverlay] = useState(OVERLAYS.NONE);
  const [msgIdToDelete, setMsgIdToDelete] = useState(null);
  const [username, setUsername] = useState("");
  const { userFound } = useUserSearch(username);
  const [pendingInputText, setPendingInputText] = useState("");

  const socketRef = useRef(null);

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
    onNewMessage: (messageData) => dispatch(receiveNewMessage(messageData)), // <-- This line
  });

  useEffect(() => {
    if (Object.keys(chatThreads).length === 0) {
      setActiveOverlay(OVERLAYS.WELCOME);
    }
  }, [chatThreads]);

  useEffect(() => {
    if (selectedChat?.id) {
      dispatch(getChatThread(selectedChat.id));
    }
  }, [dispatch, selectedChat?.id]);

  const currentThreadMessages = selectedChat
    ? chatThreads[selectedChat.id]?.messages || []
    : [];

  const handleDeleteMsg = (e) => {
    e.preventDefault();
    if (!selectedChat?.id || !msgIdToDelete) return;
    dispatch(fakeDeleteMessage(msgIdToDelete));
    dispatch(getChatThread(selectedChat.id));
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

      <div className="chat-window-right">
        <ChatTitleBar
          showCreateChatOverlay={activeOverlay === OVERLAYS.CREATE}
          showChatWelcomeOverlay={activeOverlay === OVERLAYS.WELCOME}
          setActiveOverlay={setActiveOverlay}
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
