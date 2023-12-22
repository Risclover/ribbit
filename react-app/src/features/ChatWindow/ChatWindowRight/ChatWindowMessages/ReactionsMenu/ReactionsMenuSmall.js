import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { TfiPlus } from "react-icons/tfi";
import { getChatThread, createReaction } from "../../../../../store/chats";
import "./ReactionsMenu.css";

const reactions = [
  "/images/frog-reactions-cropped/1.gif",
  "/images/frog-reactions-cropped/2.gif",
  "/images/frog-reactions-cropped/3.gif",
  "/images/frog-reactions-cropped/4.gif",
  "/images/frog-reactions-cropped/5.gif",
  "/images/frog-reactions-cropped/6.gif",
  "/images/frog-reactions-cropped/7.gif",
  "/images/frog-reactions-cropped/8.gif",
  "/images/frog-reactions-cropped/9.gif",
  "/images/frog-reactions-cropped/10.gif",
  "/images/frog-reactions-cropped/11.gif",
  "/images/frog-reactions-cropped/12.gif",
  "/images/frog-reactions-cropped/13.gif",
  "/images/frog-reactions-cropped/14.gif",
  "/images/frog-reactions-cropped/15.gif",
  "/images/frog-reactions-cropped/16.gif",
  "/images/frog-reactions-cropped/17.gif",
  "/images/frog-reactions-cropped/18.gif",
  "/images/frog-reactions-cropped/19.gif",
  "/images/frog-reactions-cropped/20.gif",
  "/images/frog-reactions-cropped/21.gif",
  "/images/frog-reactions-cropped/22.gif",
  "/images/frog-reactions-cropped/23.gif",
  "/images/frog-reactions-cropped/24.gif",
  "/images/frog-reactions-cropped/25.gif",
  "/images/frog-reactions-cropped/26.gif",
  "/images/frog-reactions-cropped/27.gif",
  "/images/frog-reactions-cropped/28.gif",
  "/images/frog-reactions-cropped/29.gif",
  "/images/frog-reactions-cropped/30.gif",
  "/images/frog-reactions-cropped/31.gif",
  "/images/frog-reactions-cropped/32.gif",
  "/images/frog-reactions-cropped/33.gif",
  "/images/frog-reactions-cropped/34.gif",
  "/images/frog-reactions-cropped/36.gif",
  "/images/frog-reactions-cropped/37.gif",
  "/images/frog-reactions-cropped/38.gif",
  "/images/frog-reactions-cropped/39.gif",
  "/images/frog-reactions-cropped/40.gif",
  "/images/frog-reactions-cropped/41.gif",
  "/images/frog-reactions-cropped/42.gif",
  "/images/frog-reactions-cropped/43.gif",
  "/images/frog-reactions-cropped/44.gif",
  "/images/frog-reactions-cropped/45.gif",
  "/images/frog-reactions-cropped/46.gif",
  "/images/frog-reactions-cropped/47.gif",
  "/images/frog-reactions-cropped/48.gif",
  "/images/frog-reactions-cropped/49.gif",
  "/images/frog-reactions-cropped/50.gif",
  "/images/frog-reactions-cropped/51.gif",
  "/images/frog-reactions-cropped/52.gif",
  "/images/frog-reactions-cropped/53.gif",
  "/images/frog-reactions-cropped/54.gif",
  "/images/frog-reactions-cropped/55.gif",
  "/images/frog-reactions-cropped/56.gif",
  "/images/frog-reactions-cropped/57.gif",
  "/images/frog-reactions-cropped/58.gif",
  "/images/frog-reactions-cropped/59.gif",
  "/images/frog-reactions-cropped/60.gif",
  "/images/frog-reactions-cropped/61.gif",
  "/images/frog-reactions-cropped/62.gif",
  "/images/frog-reactions-cropped/63.gif",
  "/images/frog-reactions-cropped/64.gif",
  "/images/frog-reactions-cropped/65.gif",
  "/images/frog-reactions-cropped/66.gif",
  "/images/frog-reactions-cropped/67.gif",
  "/images/frog-reactions-cropped/68.gif",
  "/images/frog-reactions-cropped/69.gif",
  "/images/frog-reactions-cropped/70.gif",
  "/images/frog-reactions-cropped/71.gif",
];

export function ReactionsMenuSmall({ message }) {
  const dispatch = useDispatch();
  const [msgId, setMsgId] = useState(message?.id);
  const [openMenu, setOpenMenu] = useState(false);
  const [reactionType, setReactionType] = useState("");

  useEffect(() => {});

  const react = (e) => {
    e.preventDefault();

    const payload = {
      messageId: msgId,
      emoji: reactionType,
    };

    dispatch(createReaction(payload));
    dispatch(getChatThread(message?.threadId));
  };

  return (
    <div className="reactions-menu reaction-picker-animation">
      {!openMenu && (
        <div
          className={`${
            !openMenu && "reaction-preview-animation reactions-menu-small"
          } reactions-menu-small`}
        >
          {reactions.slice(0, 5).map((reaction) => (
            <div
              className="reactions-menu-square"
              onClick={(e) => {
                setReactionType(reaction);
                react(e);
              }}
            >
              <img src={reaction} />
            </div>
          ))}
          <div className="reactions-menu-square">
            <div
              className="reactions-menu-plus"
              onClick={() => setOpenMenu(!openMenu)}
            >
              <TfiPlus />
            </div>
          </div>
        </div>
      )}
      {openMenu && (
        <div className="reactions-menu-full">
          <div className="reactions-menu-full-grid">
            {reactions.map((reaction) => (
              <div className="reactions-menu-square">
                <img src={reaction} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
