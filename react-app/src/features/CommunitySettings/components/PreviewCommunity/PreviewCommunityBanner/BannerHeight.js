// src/features/CommunitySettings/components/BannerHeight.jsx
import React from "react";
import { FaDotCircle, FaRegCircle } from "react-icons/fa";

export function BannerHeight({ height, option, activeRadio, setActiveRadio }) {
  return (
    <div
      className={`preview-community-radio ${
        activeRadio?.toLowerCase() !== option?.toLowerCase() &&
        "community-name-radio-gray"
      }`}
      onClick={() => setActiveRadio(option.toLowerCase())}
    >
      {activeRadio?.toLowerCase() === option?.toLowerCase() ? (
        <FaDotCircle />
      ) : (
        <FaRegCircle />
      )}
      {option}{" "}
      {option?.toLowerCase() === "small"
        ? " • 80px"
        : option?.toLowerCase() === "medium"
        ? " • 144px"
        : option?.toLowerCase() === "large"
        ? " • 208px"
        : ""}
    </div>
  );
}
