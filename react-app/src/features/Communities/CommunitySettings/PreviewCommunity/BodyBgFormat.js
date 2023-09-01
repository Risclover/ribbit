import React from "react";
import { IoStopSharp, IoGridSharp } from "react-icons/io5";

export default function BodyBgFormat({
  format,
  bgFormat,
  setBgFormat,
  onClick,
}) {
  return (
    <div
      className={`body-bg-format ${
        format !== bgFormat ? "body-bg-format-selected" : ""
      }`}
      role="radio"
      onClick={onClick}
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
