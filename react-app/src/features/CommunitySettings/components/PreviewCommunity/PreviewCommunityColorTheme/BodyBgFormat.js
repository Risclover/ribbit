import React from "react";
import { IoGridSharp } from "react-icons/io5";

export function BodyBgFormat({
  format,
  backgroundImgFormat,
  setBackgroundImgFormat,
  backgroundImg,
  bodyBgPreview,
  bgColor,
}) {
  const handleBgFormat = (e) => {
    e.preventDefault();
    setBackgroundImgFormat(format);
    document.documentElement.style.setProperty(
      "--preview-community-body-bg-img-format",
      format
    );

    document.documentElement.style.setProperty(
      "--preview-community-body-bg-img",
      `${bgColor} url(${backgroundImg}) ${format}`
    );
  };

  return (
    <div
      className={`body-bg-format ${
        format !== backgroundImgFormat ? "body-bg-format-selected" : ""
      }`}
      role="radio"
      onClick={handleBgFormat}
    >
      <div
        className={`body-bg-format-border ${
          format !== backgroundImgFormat && "body-bg-format-selected"
        }`}
      >
        {format === "tile" ? (
          <IoGridSharp />
        ) : format === "fill" ? (
          <div
            className={`square ${
              format !== backgroundImgFormat && "body-bg-format-selected"
            }`}
          ></div>
        ) : (
          <div
            className={`square square-sm ${
              format !== backgroundImgFormat && "body-bg-format-selected"
            }`}
          ></div>
        )}
      </div>
      {format.slice(0, 1).toUpperCase() + format.slice(1)}
    </div>
  );
}