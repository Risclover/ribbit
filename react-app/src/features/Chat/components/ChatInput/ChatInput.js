// import React, { useRef } from "react";
// import { ChatEmojis, ChatGifs } from "@/features";
// import { useAutosizeTextArea } from "@/hooks";
// import { useChatInput } from "../../hooks/useChatInput";
// import { liveChatIcons } from "@/assets";

// export const ChatInput = ({
//   setUsername,
//   socket,
//   setShowMessageInviteOverlay,
//   showMessageInviteOverlay,
//   userFound,
//   inputText,
//   onInputChange,
//   clearInput,
// }) => {
//   const textareaRef = useRef(null);
//   useAutosizeTextArea(textareaRef.current, inputText);

//   const {
//     handleChange,
//     handleEnterPress,
//     handleOpenGiphy,
//     gifIcon,
//     receiver,
//     emojisOverlay,
//     openGiphy,
//     handleSubmit,
//     setOpenGiphy,
//     setEmojisOverlay,
//     setGifIcon,
//   } = useChatInput({
//     setUsername,
//     setShowMessageInviteOverlay,
//     showMessageInviteOverlay,
//     userFound,
//     onInputChange,
//     clearInput,
//     inputText,
//     socket,
//   });

//   return (
//     <div className="chat-thread-window-input">
//       <div className="chat-thread-window-input-box">
//         <textarea
//           onKeyPress={handleEnterPress}
//           type="text"
//           value={inputText}
//           ref={textareaRef}
//           onChange={handleChange}
//           placeholder="Message"
//         ></textarea>
//         <div className="input-btns">
//           <button
//             aria-label="Gifs"
//             className="gif-btn"
//             onClick={handleOpenGiphy}
//           >
//             <img src={gifIcon} alt="Gif" />
//           </button>
//           <button
//             aria-label="Emojis"
//             className="emojis-btn"
//             onClick={() => {
//               setOpenGiphy(false);
//               setEmojisOverlay(!emojisOverlay);
//               setGifIcon(liveChatIcons.GifIcon);
//             }}
//           >
//             <span className="material-symbols-outlined">
//               sentiment_satisfied
//             </span>
//           </button>
//         </div>
//       </div>
//       {openGiphy && (
//         <ChatGifs
//           receiver={receiver}
//           setGifIcon={setGifIcon}
//           GifIcon={liveChatIcons.GifIcon}
//           gifIcon={gifIcon}
//           GifIconDark={liveChatIcons.GifIconDark}
//           setOpenGiphy={setOpenGiphy}
//           socket={socket}
//         />
//       )}
//       <div
//         className={
//           inputText ? "send-chat-msg-btn chat-msg-enabled" : "send-chat-msg-btn"
//         }
//         onClick={handleSubmit}
//       >
//         <i
//           className={
//             inputText
//               ? "zmdi-enabled zmdi zmdi-navigation"
//               : "zmdi-disabled zmdi zmdi-navigation"
//           }
//         ></i>
//       </div>
//       {emojisOverlay && (
//         <ChatEmojis
//           receiver={receiver}
//           setEmojisOverlay={setEmojisOverlay}
//           socket={socket}
//         />
//       )}
//     </div>
//   );
// };

import React, { useRef, useState, useContext } from "react";
import { ChatEmojis, ChatGifs } from "@/features";
import { useAutosizeTextArea } from "@/hooks";
import { useSelector, useDispatch } from "react-redux";
import { createChatThread, createChatMessage, getChatThread } from "@/store";
import { liveChatIcons } from "@/assets";
import { SelectedChatContext } from "@/context";

export const ChatInput = ({
  socket,
  showMessageInviteOverlay,
  setActiveOverlay,
  OVERLAYS,
  userFound,
  username,
  setUsername,
  inputText,
  setPendingInputText,
}) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  const { selectedChat, setSelectedChat } = useContext(SelectedChatContext);

  // If a chat is selected, store text in local state here for that particular chat
  const [textValue, setTextValue] = useState("");

  // Giphy & Emojis
  const [openGiphy, setOpenGiphy] = useState(false);
  const [gifIcon, setGifIcon] = useState(liveChatIcons.GifIcon);
  const [emojisOverlay, setEmojisOverlay] = useState(false);

  // Autosize text areas
  const textareaRef = useRef(null);
  useAutosizeTextArea(textareaRef.current, textValue || inputText);

  // On input change
  const handleChange = (e) => {
    const value = e.target.value;
    if (selectedChat) {
      setTextValue(value);
    } else {
      setPendingInputText(value);
    }
  };

  // “Enter” sends the message
  const handleEnterPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  // Actually sending the message (existing chat)
  const sendMessage = async (threadId, messageContent, receiverId) => {
    const payload = {
      content: messageContent,
      receiverId,
      chatThreadId: threadId,
    };

    const data = await dispatch(createChatMessage(payload));
    data.room = threadId;
    socket.emit("chat", data);
    dispatch(getChatThread(threadId));
  };

  // If we are in the invite flow, we must first create the thread, then send the first message
  const handleSubmit = async () => {
    const contentToSend = selectedChat ? textValue : inputText;

    if (!contentToSend.trim()) return;

    // 1) If we are in “invite mode”, create a new chat
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
    // 3) Or, no chat selected and no overlay => do nothing
  };

  const handleOpenGiphy = () => {
    setEmojisOverlay(false);
    setGifIcon(openGiphy ? liveChatIcons.GifIcon : liveChatIcons.GifIconDark);
    setOpenGiphy(!openGiphy);
  };

  return (
    <div className="chat-thread-window-input">
      <div className="chat-thread-window-input-box">
        <textarea
          onKeyPress={handleEnterPress}
          type="text"
          value={selectedChat ? textValue : inputText}
          ref={textareaRef}
          onChange={handleChange}
          placeholder="Message"
          rows={1}
        />
        <div className="input-btns">
          <button
            aria-label="Gifs"
            className="gif-btn"
            onClick={handleOpenGiphy}
          >
            <img src={gifIcon} alt="Gif" />
          </button>
          <button
            aria-label="Emojis"
            className="emojis-btn"
            onClick={() => {
              setOpenGiphy(false);
              setEmojisOverlay(!emojisOverlay);
              setGifIcon(liveChatIcons.GifIcon);
            }}
          >
            <span className="material-symbols-outlined">
              sentiment_satisfied
            </span>
          </button>
        </div>
      </div>

      {openGiphy && (
        <ChatGifs
          receiver={
            selectedChat
              ? selectedChat.users.find((u) => u.id !== currentUser.id)
              : null
          }
          setGifIcon={setGifIcon}
          GifIcon={liveChatIcons.GifIcon}
          GifIconDark={liveChatIcons.GifIconDark}
          setOpenGiphy={setOpenGiphy}
          socket={socket}
        />
      )}

      <div
        className={
          (selectedChat ? textValue : inputText)?.trim()
            ? "send-chat-msg-btn chat-msg-enabled"
            : "send-chat-msg-btn"
        }
        onClick={handleSubmit}
      >
        <i
          className={
            (selectedChat ? textValue : inputText)?.trim()
              ? "zmdi-enabled zmdi zmdi-navigation"
              : "zmdi-disabled zmdi zmdi-navigation"
          }
        ></i>
      </div>

      {emojisOverlay && (
        <ChatEmojis
          receiver={
            selectedChat
              ? selectedChat.users.find((u) => u.id !== currentUser.id)
              : null
          }
          setEmojisOverlay={setEmojisOverlay}
          socket={socket}
        />
      )}
    </div>
  );
};
