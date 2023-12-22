import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { createChatMessage, getChatThread } from "../../../../store/chats";
import * as emojis from "./emojis";
// import Angel from "./emojis/angel.png";
// import Angry from "./emojis/angry.png";
// import Clown from "./emojis/clown.png";
// import Cold from "./emojis/cold.png";
// import Confounded from "./emojis/confounded.png";
// import Confused from "./emojis/confused.png";
// import CowboyRider from "./emojis/cowboy-rider.png";
// import Cowboy from "./emojis/cowboy.png";
// import CowboyTinyHat from "./emojis/cowboy-tiny-hat.png";
// import Crowned from "./emojis/crowned.png";
// import CryingLoud from "./emojis/crying-loud.png";
// import Crying from "./emojis/crying.png";
// import Cursing from "./emojis/cursing.png";
// import DemonAngry from "./emojis/demon-angry.png";
// import Demon from "./emojis/demon.png";
// import Determined from "./emojis/determined.png";
// import Dizzy from "./emojis/dizzy.png";
// import DollarEyes from "./emojis/dollar-eyes.png";
// import Drooling from "./emojis/drooling.png";
// import Expressionless from "./emojis/expressionless.png";
// import Eyeroll from "./emojis/eyeroll.png";
// import Fear from "./emojis/fear.png";
// import Flushed from "./emojis/flushed.png";
// import Frog from "./emojis/frog.png";
// import Ghost from "./emojis/ghost.png";
// import Grimacing from "./emojis/grimacing.png";
// import Grinning from "./emojis/grinning.png";
// import Gun from "./emojis/gun.png";
// import Halo from "./emojis/halo.png";
// import HeartEyes from "./emojis/heart-eyes.png";
// import Hearts from "./emojis/hearts.png";
// import Hot from "./emojis/hot.png";
// import Hugging from "./emojis/hugging.png";
// import Hushed from "./emojis/hushed.png";
// import JoyTears from "./emojis/joy-tears.png";
// import Kissing from "./emojis/kissing.png";
// import Kissy from "./emojis/kissy.png";
// import KittyFace from "./emojis/kittyface.png";
// import Nerdy from "./emojis/nerdy.png";
// import Party from "./emojis/party.png";
// import Pensive from "./emojis/pensive.png";
// import PoutingAngry from "./emojis/pouting-angry.png";
// import Pouting from "./emojis/pouting.png";
// import RaisedEyebrow from "./emojis/raised-eyebrow.png";
// import Relieved from "./emojis/relieved.png";
// import Santa from "./emojis/santa.png";
// import Sassy from "./emojis/sassy.png";
// import Shrug from "./emojis/shrug.png";
// import Sick from "./emojis/sick.png";
// import Sleepy from "./emojis/sleepy.png";
// import SmilingOpenMouth from "./emojis/smiling-open-mouth.png";
// import Smirking from "./emojis/smirking.png";
// import Sneezing from "./emojis/sneezing.png";
// import Sunglasses from "./emojis/sunglasses.png";
// import Sushing from "./emojis/sushing.png";
// import Thinking from "./emojis/thinking.png";
// import Tongue from "./emojis/tongue.png";
// import Unamused from "./emojis/unamused.png";
// import Vampire from "./emojis/vampire.png";
// import Weary from "./emojis/weary.png";
// import Weary2 from "./emojis/weary2.png";
// import Winking from "./emojis/winking.png";
// import Witch from "./emojis/witch.png";
// import Woozy from "./emojis/woozy.png";
// import Wry from "./emojis/wry.png";
// import ZippedLips from "./emojis/zipped-lips.png";
import "./ChatWindowInput.css";
import { SelectedChatContext } from "../../../../context/SelectedChat";

// const imagesList = [
//   Grinning,
//   SmilingOpenMouth,
//   JoyTears,
//   Relieved,
//   Halo,
//   Winking,
//   KittyFace,
//   HeartEyes,
//   Hearts,
//   Kissy,
//   Kissing,
//   Tongue,
//   RaisedEyebrow,
//   Nerdy,
//   Sunglasses,
//   Party,
//   Smirking,
//   Unamused,
//   Pensive,
//   Confused,
//   Confounded,
//   Weary,
//   Weary2,
//   Crying,
//   CryingLoud,
//   Determined,
//   emojis.Angry,
//   PoutingAngry,
//   Cursing,
//   Flushed,
//   Hot,
//   Cold,
//   Fear,
//   Hugging,
//   Thinking,
//   Sushing,
//   Expressionless,
//   Grimacing,
//   Eyeroll,
//   Hushed,
//   Pouting,
//   Sleepy,
//   Drooling,
//   Dizzy,
//   ZippedLips,
//   Woozy,
//   Sick,
//   Sneezing,
//   DollarEyes,
//   Wry,
//   Gun,
//   Cowboy,
//   CowboyTinyHat,
//   Demon,
//   DemonAngry,
//   Vampire,
//   Crowned,
//   Witch,
//   Santa,
//   Clown,
//   emojis.Angel,
//   CowboyRider,
//   Sassy,
//   Shrug,
//   Ghost,
//   Frog,
// ];

const imagesList = [emojis.Angry, emojis.Angel];

export function Emojis({ receiver, setEmojisOverlay, socket }) {
  const dispatch = useDispatch();

  const { selectedChat } = useContext(SelectedChatContext);

  const handleAddEmoji = async (e, image) => {
    e.preventDefault();
    const payload = {
      content: image,
      receiverId: receiver.id,
      chatThreadId: selectedChat.id,
    };

    const data = await dispatch(createChatMessage(payload));
    socket.emit("chat", data);
    socket.emit("last", data);
    dispatch(getChatThread(selectedChat.id));
    setEmojisOverlay(false);
  };
  return (
    <div className="emojis-container">
      <div className="images-list">
        {imagesList.map((image) => (
          <button onClick={(e) => handleAddEmoji(e, image)}>
            <img src={image} />
          </button>
        ))}
      </div>
      <div className="images-list-dropdown-tail"></div>
    </div>
  );
}
