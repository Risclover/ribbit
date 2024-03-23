import React from "react";
import { PostFormatDropdownBtn } from "./PostFormatDropdownBtn";
import "./PostFormatDropdown.css";

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
