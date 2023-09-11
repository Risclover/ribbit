import React, { useEffect, useState } from "react";
import { FaDotCircle, FaRegCircle } from "react-icons/fa";

export default function BannerHeight({
  height,
  setHeight,
  option,
  activeRadio,
  setActiveRadio,
  bannerHeight,
}) {
  useEffect(() => {
    height === "80px" && setActiveRadio("small");
    height === "144px" && setActiveRadio("medium");
    height === "208px" && setActiveRadio("large");
  }, [height]);

  return (
    <div
      className={`preview-community-radio ${
        activeRadio.toLowerCase() !== option.toLowerCase() &&
        "community-name-radio-gray"
      }`}
      onClick={() => {
        setActiveRadio(option.toLowerCase());
        // if (activeRadio === "small") setHeight("80px");
        // if (activeRadio === "medium") setHeight("144px");
        // if (activeRadio === "large") setHeight("208px");
      }}
    >
      {activeRadio.toLowerCase() === option.toLowerCase() ? (
        <FaDotCircle />
      ) : (
        <FaRegCircle />
      )}
      {option}{" "}
      {option.toLowerCase() === "small"
        ? " • 64px"
        : option.toLowerCase() === "medium"
        ? " • 128px"
        : option.toLowerCase() === "large"
        ? " • 192px"
        : ""}
    </div>
  );
}
