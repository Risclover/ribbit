import React from "react";
import { IoGridSharp } from "react-icons/io5";

export function BodyBgFormat({
  format,
  bgFormat,
  setBgFormat,
  backgroundImg,
  bodyBg,
}) {
  const handleBgFormat = (e) => {
    e.preventDefault();
    setBgFormat(format);
    document.documentElement.style.setProperty(
      "--preview-community-body-bg-img-format",
      format
    );

    document.documentElement.style.setProperty(
      "--preview-community-body-bg-img",
      `${bodyBg} url(${backgroundImg}) ${format}`
    );
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
