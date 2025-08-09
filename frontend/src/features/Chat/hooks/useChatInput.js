import { useContext, useEffect, useRef, useState } from "react";
import { useChat } from "@/context";
import {
  createChatMessage,
  getChatThread,
  createChatThread,
  useAppDispatch,
  useAppSelector,
} from "@/store";
import { liveChatIcons } from "@/assets";
import { getSocket } from "@/socket";
import { useAutosizeTextArea } from "@/hooks";

export function useChatInput({
  inputText,
  setUsername,
  userFound,
  setActiveOverlay,
  showMessageInviteOverlay,
  setPendingInputText,
  textareaRef,
}) {
  const socket = getSocket();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.session.user);
  const { selectedChat, setSelectedChat } = useChat();

  const [textValue, setTextValue] = useState("");

  // Giphy & Emojis
  const [openGiphy, setOpenGiphy] = useState(false);
  const [gifIcon, setGifIcon] = useState(liveChatIcons.GifIcon);
  const [openEmojis, setOpenEmojis] = useState(false);
  const [disabled, setDisabled] = useState(false);

  useAutosizeTextArea(textareaRef.current, textValue || inputText);

  const handleChange = (e) => {
    const value = e.target.value;
    if (selectedChat) {
      setTextValue(value);
    } else {
      setPendingInputText(value);
    }
  };

  const handleEnterPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  const sendMessage = async (threadId, messageContent, receiverId) => {
    const payload = {
      content: messageContent,
      receiverId,
      chatThreadId: threadId,
    };
    const data = await dispatch(createChatMessage(payload));
    data.room = threadId;
    socket.emit("chat", data);

    // (Optional) If you do not want to rely on re-fetching, you can remove this:
    // dispatch(getChatThread(threadId));
  };

  // If we are in the invite flow, we must first create the thread, then send the first message
  const handleSubmit = async () => {
    const contentToSend = selectedChat ? textValue : inputText;

    if (!contentToSend.trim()) return;

    // 1) If we are in invite mode, create a new chat
    if (showMessageInviteOverlay && userFound) {
      // close the overlay
      setActiveOverlay(null);

      // create new thread with userFound
      const newChat = await dispatch(createChatThread(userFound.id));
      setSelectedChat(newChat);

      // join the socket room
      socket.emit("join", { user: currentUser.id, room: newChat.id });

      // send first message
      await sendMessage(newChat.id, contentToSend, userFound.id);

      // reset states
      setUsername("");
      setPendingInputText("");
      setTextValue("");
      return;
    }

    // 2) Normal scenario: we already have a selectedChat
    if (selectedChat) {
      const otherUser = selectedChat.users.find((u) => u.id !== currentUser.id);
      if (!otherUser) return;

      await sendMessage(selectedChat.id, textValue, otherUser.id);
      setTextValue("");
    }
  };

  const handleOpenGiphy = () => {
    setOpenEmojis(false);
    setGifIcon(openGiphy ? liveChatIcons.GifIcon : liveChatIcons.GifIconDark);
    setOpenGiphy(!openGiphy);
  };

  useEffect(() => {
    setDisabled((selectedChat ? textValue : inputText)?.trim().length === 0);
  }, [inputText, textValue]);

  return {
    handleEnterPress,
    selectedChat,
    textValue,
    handleChange,
    handleOpenGiphy,
    setOpenGiphy,
    setOpenEmojis,
    openEmojis,
    setGifIcon,
    openGiphy,
    currentUser,
    socket,
    disabled,
    handleSubmit,
  };
}
