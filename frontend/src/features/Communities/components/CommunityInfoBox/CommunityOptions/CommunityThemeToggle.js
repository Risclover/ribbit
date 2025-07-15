import React from "react";
import "./CommunityOptions.css";

export function CommunityThemeToggle({ checked, handleThemeToggle }) {
  return (
    <div
      className="community-options-switch"
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleThemeToggle(e);
        }
      }}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={handleThemeToggle}
        tabIndex={-1}
      />
      <span className="community-options-slider round"></span>
    </div>
  );
}
