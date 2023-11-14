import React from "react";
import "./PostFormatDropdown.css";
import { PostFormatDropdownBtn } from "./PostFormatDropdownBtn";

export function PostFormatDropdown({
  setShowDropdown,
  format,
  setFormat,
  formats,
}) {
  return (
    <div className="post-format-dropdown">
      {formats.map((item, idx) => (
        <PostFormatDropdownBtn
          key={idx}
          setFormat={setFormat}
          format={format}
          setShowDropdown={setShowDropdown}
          item={item}
        />
      ))}
    </div>
  );
}
