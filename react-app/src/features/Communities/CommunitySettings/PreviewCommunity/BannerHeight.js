import React from "react";
import { FaDotCircle, FaRegCircle } from "react-icons/fa";

export default function BannerHeight({ option, activeRadio, setActiveRadio }) {
  return (
    <div
      className={`preview-community-radio ${
        activeRadio !== option && "community-name-radio-gray"
      }`}
      onClick={() => setActiveRadio(option)}
    >
      {activeRadio === option ? <FaDotCircle /> : <FaRegCircle />}
      {option}
    </div>
  );
}
