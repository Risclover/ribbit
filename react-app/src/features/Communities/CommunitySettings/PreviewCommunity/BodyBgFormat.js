import React, { useEffect } from "react";
import { IoStopSharp, IoGridSharp } from "react-icons/io5";

export default function BodyBgFormat({
  format,
  bgFormat,
  setBgFormat,
  backgroundImg,
  bodyBg,
}) {
  const handleBgFormat = () => {
    setBgFormat(format);
    document.documentElement.style.setProperty(
      "--preview-community-body-bg-img-format",
      format
    );
    if (format === "fill") {
      document.documentElement.style.setProperty(
        "--preview-community-body-bg-img",
        `${bodyBg} url(${backgroundImg}) no-repeat center / cover`
      );
    } else if (format === "tile") {
      document.documentElement.style.setProperty(
        "--preview-community-body-bg-img",
        `${bodyBg} url(${backgroundImg}) repeat center top`
      );
    } else if (format === "center") {
      document.documentElement.style.setProperty(
        "--preview-community-body-bg-img",
        `${bodyBg} url(${backgroundImg}) no-repeat center top`
      );
    }
  };

  return (
    <div
      className={`body-bg-format ${
        format !== bgFormat ? "body-bg-format-selected" : ""
      }`}
      role="radio"
      onClick={handleBgFormat}
    >
      <div
        className={`body-bg-format-border ${
          format !== bgFormat && "body-bg-format-selected"
        }`}
      >
        {format === "tile" ? (
          <IoGridSharp />
        ) : format === "fill" ? (
          <div
            className={`square ${
              format !== bgFormat && "body-bg-format-selected"
            }`}
          ></div>
        ) : (
          <div
            className={`square square-sm ${
              format !== bgFormat && "body-bg-format-selected"
            }`}
          ></div>
        )}
      </div>
      {format.slice(0, 1).toUpperCase() + format.slice(1)}
    </div>
  );
}
