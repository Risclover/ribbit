import React from "react";
import "./PostFormatDropdown.css";
import { PostFormatDropdownBtn } from "./PostFormatDropdownBtn";

export function PostFormatDropdown({ setShowDropdown, formats }) {
  return (
    <div className="post-format-dropdown">
      {formats.map((item, idx) => (
        <PostFormatDropdownBtn
          key={idx}
          setShowDropdown={setShowDropdown}
          item={item}
        />
      ))}
    </div>
  );
}