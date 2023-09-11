import React from "react";
import "./CommunityOptions.css";

export default function ToggleSwitch({
  checked,
  setChecked,
  handleThemeToggle,
}) {
  return (
    <div className="community-options-switch">
      <input
        type="checkbox"
        checked={checked}
        name="switch"
        onChange={handleThemeToggle}
      />
      <span class="community-options-slider round"></span>
    </div>
  );
}
