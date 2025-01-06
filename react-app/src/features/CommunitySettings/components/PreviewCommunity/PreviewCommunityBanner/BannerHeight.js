import React, { useEffect } from "react";
import { FaDotCircle, FaRegCircle } from "react-icons/fa";

export function BannerHeight({
  height,
  option,
  activeRadio,
  setActiveRadio,
  community,
}) {
  useEffect(() => {
    community.bannerHeight === "80px" && setActiveRadio("small");
    community.bannerHeight === "144px" && setActiveRadio("medium");
    community.bannerHeight === "208px" && setActiveRadio("large");
  }, [community]);

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
