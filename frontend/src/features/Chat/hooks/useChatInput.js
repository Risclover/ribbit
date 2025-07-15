import { useContext, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { useSelectedChat } from "@/context";
import { createChatMessage, getChatThread, createChatThread } from "@/store";
import { liveChatIcons } from "@/assets";

export function useChatInput({
  setUsername,
  setShowMessageInviteOverlay,
  showMessageInviteOverlay,
  userFound,
  onInputChange,
  clearInput,
  inputText,
  socket,
}) {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.session.user);

  const { selectedChat, setSelectedChat, setPendingReceiver } =
    useSelectedChat();

  const [openGiphy, setOpenGiphy] = useState(false);
  const [gifIcon, setGifIcon] = useState(liveChatIcons.GifIcon);
  const [receiver, setReceiver] = useState(null);
  const [emojisOverlay, setEmojisOverlay] = useState(false);
  const [newlyCreatedChatId, setNewlyCreatedChatId] = useState(null);

  useEffect(() => {
    setReceiver(() =>
      selectedChat?.users?.find((user) => user.id !== currentUser?.id)
    );
  }, [selectedChat?.users, currentUser?.id]);

  const sendMessage = async () => {
    if (!selectedChat) return;

    // Identify the "other user" in the thread
    const receiver = selectedChat?.users?.find((u) => u.id !== currentUser?.id);

    const payload = {
      content: inputText,
      receiverId: receiver?.id, // if you need this
      chatThreadId: selectedChat.id,
    };

    // Create the message via Redux
    const data = await dispatch(createChatMessage(payload));
    data.room = selectedChat.id;

    // Emit over socket
    socket.emit("chat", data);

    // Optionally fetch the thread again or do an optimistic update
    dispatch(getChatThread(selectedChat.id));

    clearInput(selectedChat.id);
  };

  // 3) The actual submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // If we’re currently in invite flow, create the new thread first
    if (showMessageInviteOverlay) {
      setShowMessageInviteOverlay(false);
      await handleCreateNewThread();
      // Note: We do NOT immediately call `sendMessage()` here
      // We'll let the `useEffect` below detect when selectedChat is updated
    } else {
      // For an existing thread, we just send a message right away
      sendMessage();
    }
  };

  // 4) Once `selectedChat` is updated to the newly created thread, THEN send the first message
  useEffect(() => {
    // If we've just turned off invite mode,
    // and selectedChat?.id now matches the newly created chat,
    // we know the new thread is "in state" and can safely send the message.
    if (
      !showMessageInviteOverlay &&
      selectedChat?.id === newlyCreatedChatId &&
      newlyCreatedChatId != null
    ) {
      sendMessage();
      // Clear it so we don't keep re-sending
      setNewlyCreatedChatId(null);
    }
  }, [showMessageInviteOverlay, selectedChat?.id, newlyCreatedChatId]);

  const handleOpenGiphy = () => {
    setEmojisOverlay(false);
    setGifIcon(openGiphy ? liveChatIcons.GifIcon : liveChatIcons.GifIconDark);
    setOpenGiphy(!openGiphy);
  };

  const handleEnterPress = (e) => {
    if (e.key === "Enter" && inputText.trim().length > 0) {
      handleSubmit(e);
    }
  };

  const handleChange = (e) => {
    const val = e.target?.value;
    onInputChange(val);
  };

  const handleCreateNewThread = async () => {
    const newChat = await dispatch(createChatThread(userFound?.id));
    setNewlyCreatedChatId(newChat.id);
    setSelectedChat(newChat);
    socket.emit("join", {
      user: currentUser?.id,
      room: newChat.id,
    });
    setPendingReceiver(null);
    setUsername("");
    return newChat;
  };

  return {
    handleChange,
    handleEnterPress,
    handleOpenGiphy,
    gifIcon,
    receiver,
    emojisOverlay,
    setEmojisOverlay,
    openGiphy,
    handleSubmit,
    setOpenGiphy,
    setGifIcon,
  };
}
