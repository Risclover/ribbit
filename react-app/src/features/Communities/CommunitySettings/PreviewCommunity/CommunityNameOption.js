import React from "react";
import { FaDotCircle, FaRegCircle } from "react-icons/fa";

export default function CommunityNameOption({
  title,
  activeRadio,
  setActiveRadio,
  community,
}) {
  return (
    <div
      className={`preview-community-radio ${
        activeRadio !== title && "community-name-radio-gray"
      }`}
      onClick={() => setActiveRadio(title)}
    >
      {activeRadio === title ? <FaDotCircle /> : <FaRegCircle />}
      {title !== "Hide" ? title + community.name : "Hide"}
    </div>
  );
}
