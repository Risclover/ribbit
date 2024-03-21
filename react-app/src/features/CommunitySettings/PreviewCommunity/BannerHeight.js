import React, { useEffect } from "react";
import { FaDotCircle, FaRegCircle } from "react-icons/fa";

export function BannerHeight({ height, option, activeRadio, setActiveRadio }) {
  useEffect(() => {
    height === "80px" && setActiveRadio("small");
    height === "144px" && setActiveRadio("medium");
    height === "208px" && setActiveRadio("large");
  }, [height]);

  return (
    <div
      className={`preview-community-radio ${
        activeRadio?.toLowerCase() !== option?.toLowerCase() &&
        "community-name-radio-gray"
      }`}
      onClick={() => {
        setActiveRadio(option?.toLowerCase());
      }}
    >
      {activeRadio?.toLowerCase() === option?.toLowerCase() ? (
        <FaDotCircle />
      ) : (
        <FaRegCircle />
      )}
      {option}{" "}
      {option?.toLowerCase() === "small"
        ? " • 64px"
        : option?.toLowerCase() === "medium"
        ? " • 128px"
        : option?.toLowerCase() === "large"
        ? " • 192px"
        : ""}
    </div>
  );
}
